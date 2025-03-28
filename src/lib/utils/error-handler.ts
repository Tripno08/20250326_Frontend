import { toast } from 'react-toastify';

export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, any>;
}

/**
 * Tratar erros da API de forma centralizada
 * @param error Erro capturado
 * @param customMessage Mensagem personalizada opcional
 * @returns Erro formatado
 */
export function handleApiError(error: unknown, customMessage?: string): ApiError {
  console.error('API Error:', error);
  
  // Se já for um ApiError, apenas retorna
  if (error && typeof error === 'object' && 'code' in error && 'message' in error) {
    toast.error(customMessage || (error as ApiError).message);
    return error as ApiError;
  }
  
  // Se for um erro do Axios ou fetch
  if (error && typeof error === 'object' && 'response' in error) {
    const responseError = (error as any).response?.data?.error;
    if (responseError) {
      toast.error(customMessage || responseError.message);
      return responseError;
    }
  }
  
  // Se for um erro genérico
  let message = customMessage || 'Ocorreu um erro inesperado';
  if (error instanceof Error) {
    message = customMessage || error.message;
  }
  
  toast.error(message);
  
  return {
    code: 'UNKNOWN_ERROR',
    message
  };
}

/**
 * Verificar se um objeto é uma resposta de erro da API
 * @param response Resposta da API
 * @returns Verdadeiro se for uma resposta com erro
 */
export function isApiError<T>(response: any): response is { success: false; error: ApiError; data: null } {
  return (
    response &&
    typeof response === 'object' &&
    response.success === false &&
    response.error &&
    typeof response.error === 'object' &&
    'code' in response.error &&
    'message' in response.error
  );
}

/**
 * Extrair mensagem de erro de forma amigável
 * @param error Erro da API
 * @returns Mensagem para exibição ao usuário
 */
export function getErrorMessage(error: ApiError | unknown): string {
  if (!error) return 'Ocorreu um erro inesperado';
  
  if (typeof error === 'string') return error;
  
  if (error && typeof error === 'object') {
    if ('message' in error && typeof error.message === 'string') {
      return error.message;
    }
    
    if ('code' in error && typeof error.code === 'string') {
      // Mapear códigos para mensagens amigáveis
      const errorMessages: Record<string, string> = {
        'INVALID_CREDENTIALS': 'Email ou senha inválidos',
        'UNAUTHORIZED': 'Não autorizado. Faça login novamente',
        'VALIDATION_ERROR': 'Existem campos inválidos no formulário',
        'NOT_FOUND': 'Recurso não encontrado',
        'SERVER_ERROR': 'Erro interno do servidor',
        'NETWORK_ERROR': 'Erro de conexão com o servidor',
      };
      
      return errorMessages[error.code as string] || 'Ocorreu um erro inesperado';
    }
  }
  
  return 'Ocorreu um erro inesperado';
} 