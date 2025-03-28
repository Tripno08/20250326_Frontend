import { http, HttpResponse, delay } from 'msw';
import { createMockUser } from '../factories';
import { IMockApiResponse, IMockUser } from '../types';
import { CargoUsuario } from '@/types/enums';

// Usuário fixo para login simulado
const MOCK_ADMIN_USER: IMockUser = {
  id: '1',
  email: 'admin@innerview.com',
  nome: 'Administrador',
  cargo: CargoUsuario.ADMIN,
  avatar: 'https://i.pravatar.cc/150?u=admin',
  criadoEm: new Date().toISOString(),
  atualizadoEm: new Date().toISOString(),
};

// Usuário atual simulado (pode ser usado para testes de persistência)
let currentUser: IMockUser | null = null;

export const authHandlers = [
  // Login
  http.post('/api/v1/auth/login', async ({ request }) => {
    await delay();
    
    const { email, password } = await request.json();
    
    // Credenciais válidas para teste
    if (email === MOCK_ADMIN_USER.email && password === 'password') {
      currentUser = MOCK_ADMIN_USER;
      
      const response: IMockApiResponse<{ user: IMockUser; token: string }> = {
        success: true,
        data: {
          user: MOCK_ADMIN_USER,
          token: 'mock-jwt-token-' + Date.now(),
        },
      };
      
      return HttpResponse.json(response);
    }
    
    // Credenciais inválidas
    return new HttpResponse(
      JSON.stringify({
        success: false,
        data: null,
        error: {
          code: 'INVALID_CREDENTIALS',
          message: 'Email ou senha inválidos',
        },
      }),
      { status: 401 }
    );
  }),
  
  // Logout
  http.post('/api/v1/auth/logout', async () => {
    await delay();
    
    currentUser = null;
    
    return HttpResponse.json({
      success: true,
      data: null,
    });
  }),
  
  // Obter usuário atual
  http.get('/api/v1/auth/me', async ({ request }) => {
    await delay();
    
    const authHeader = request.headers.get('Authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return new HttpResponse(
        JSON.stringify({
          success: false,
          data: null,
          error: {
            code: 'UNAUTHORIZED',
            message: 'Usuário não autenticado',
          },
        }),
        { status: 401 }
      );
    }
    
    // Para fins de teste, sempre retornamos o usuário admin
    // Em uma implementação real, verificaríamos o token
    const response: IMockApiResponse<IMockUser> = {
      success: true,
      data: currentUser || MOCK_ADMIN_USER,
    };
    
    return HttpResponse.json(response);
  }),
  
  // Registrar novo usuário
  http.post('/api/v1/auth/register', async ({ request }) => {
    await delay();
    
    const userData = await request.json();
    
    // Simular alguma validação
    if (!userData.email || !userData.password || !userData.nome) {
      return new HttpResponse(
        JSON.stringify({
          success: false,
          data: null,
          error: {
            code: 'VALIDATION_ERROR',
            message: 'Dados de usuário incompletos',
            details: {
              fields: ['email', 'password', 'nome'],
            },
          },
        }),
        { status: 422 }
      );
    }
    
    // Criar um novo usuário mock
    const newUser = createMockUser({
      email: userData.email,
      nome: userData.nome,
      cargo: userData.cargo || CargoUsuario.PROFESSOR,
    });
    
    currentUser = newUser;
    
    const response: IMockApiResponse<{ user: IMockUser; token: string }> = {
      success: true,
      data: {
        user: newUser,
        token: 'mock-jwt-token-' + Date.now(),
      },
    };
    
    return HttpResponse.json(response);
  })
]; 