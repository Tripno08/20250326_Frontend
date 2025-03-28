import { setupWorker } from 'msw/browser';
import { handlers } from './handlers';

// Apenas inicialize o worker se estivermos em desenvolvimento
const isDevelopment = process.env.NODE_ENV === 'development';

export async function initMocks() {
  if (isDevelopment) {
    const worker = setupWorker(...handlers);
    await worker.start({
      onUnhandledRequest: 'bypass', // não logue requests não tratados
    });
    
    console.info('%c[MSW] Mock Service Worker inicializado', 'color: #6147ff; font-weight: bold;');
    
    // Adicionar à window para fácil acesso no console (apenas em dev)
    // @ts-ignore
    window.__mswWorker = worker;
  }
} 