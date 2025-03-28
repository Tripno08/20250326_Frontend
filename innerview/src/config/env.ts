type EnvType = {
  NEXT_PUBLIC_API_URL: string;
  NEXT_PUBLIC_APP_ENV: 'development' | 'staging' | 'production';
  NEXT_PUBLIC_ENABLE_MOCKS: boolean;
};

/**
 * Acesso tipado às variáveis de ambiente
 */
export const env: EnvType = {
  NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api/v1',
  NEXT_PUBLIC_APP_ENV: (process.env.NEXT_PUBLIC_APP_ENV as EnvType['NEXT_PUBLIC_APP_ENV']) || 'development',
  NEXT_PUBLIC_ENABLE_MOCKS: process.env.NEXT_PUBLIC_ENABLE_MOCKS === 'true',
}; 