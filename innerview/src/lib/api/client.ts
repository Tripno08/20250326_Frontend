import { QueryClient } from '@tanstack/react-query';
import { env } from '@/config/env';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutos
      gcTime: 1000 * 60 * 60, // 1 hora
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

export const apiBaseUrl = env.NEXT_PUBLIC_API_URL;

interface FetchOptions extends RequestInit {
  params?: Record<string, string | number | boolean | undefined | null>;
}

/**
 * Função para realizar requisições à API
 */
export async function fetchApi<T>(
  endpoint: string,
  options: FetchOptions = {}
): Promise<T> {
  const { params, ...fetchOptions } = options;
  
  let url = `${apiBaseUrl}${endpoint}`;
  
  // Adicionar query params
  if (params) {
    const queryParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        queryParams.append(key, String(value));
      }
    });
    
    const queryString = queryParams.toString();
    if (queryString) {
      url = `${url}${url.includes('?') ? '&' : '?'}${queryString}`;
    }
  }
  
  const response = await fetch(url, {
    ...fetchOptions,
    headers: {
      'Content-Type': 'application/json',
      ...fetchOptions.headers,
    },
  });
  
  const data = await response.json();
  
  if (!response.ok) {
    throw data.error || { message: 'Erro desconhecido' };
  }
  
  return data;
} 