// Verifica se estamos no lado do cliente antes de importar os mocks
const isClient = typeof window !== 'undefined';

export async function initializeMocks() {
  // Se estiver no lado do cliente, inicializa os mocks
  if (isClient) {
    // Carrega o módulo browser dinamicamente
    const { initMocks } = await import('./browser');
    await initMocks();
  }
} 