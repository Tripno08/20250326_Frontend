// Design Tokens: Colors

export const colors = {
  // Cores primárias (azul)
  primary: {
    50: '#e3f2fd',
    100: '#bbdefb',
    200: '#90caf9',
    300: '#64b5f6',
    400: '#42a5f5',
    500: '#2196f3', // Cor principal
    600: '#1e88e5',
    700: '#1976d2',
    800: '#1565c0',
    900: '#0d47a1',
  },
  
  // Cores secundárias (roxo)
  secondary: {
    50: '#f3e5f5',
    100: '#e1bee7',
    200: '#ce93d8',
    300: '#ba68c8',
    400: '#ab47bc',
    500: '#9c27b0', // Cor secundária principal
    600: '#8e24aa',
    700: '#7b1fa2',
    800: '#6a1b9a',
    900: '#4a148c',
  },
  
  // Cores para níveis RTI/MTSS
  tier: {
    1: {
      light: '#a5d6a7', // Verde claro
      main: '#4caf50', // Verde
      dark: '#2e7d32', // Verde escuro
    },
    2: {
      light: '#ffcc80', // Laranja claro
      main: '#ff9800', // Laranja
      dark: '#ef6c00', // Laranja escuro
    },
    3: {
      light: '#ef9a9a', // Vermelho claro
      main: '#f44336', // Vermelho
      dark: '#c62828', // Vermelho escuro
    },
  },
  
  // Cores de feedback
  success: {
    light: '#a5d6a7',
    main: '#4caf50',
    dark: '#2e7d32',
  },
  warning: {
    light: '#ffecb3',
    main: '#ffc107',
    dark: '#ff8f00',
  },
  error: {
    light: '#ef9a9a',
    main: '#f44336',
    dark: '#c62828',
  },
  info: {
    light: '#b3e5fc',
    main: '#03a9f4',
    dark: '#0288d1',
  },
  
  // Tons de cinza
  grey: {
    50: '#fafafa',
    100: '#f5f5f5',
    200: '#eeeeee',
    300: '#e0e0e0',
    400: '#bdbdbd',
    500: '#9e9e9e',
    600: '#757575',
    700: '#616161',
    800: '#424242',
    900: '#212121',
  },
  
  // Preto e branco
  common: {
    black: '#000000',
    white: '#ffffff',
  },
  
  // Cores de texto
  text: {
    primary: 'rgba(0, 0, 0, 0.87)',
    secondary: 'rgba(0, 0, 0, 0.6)',
    disabled: 'rgba(0, 0, 0, 0.38)',
  },
  
  // Cores de fundo
  background: {
    default: '#f5f5f5',
    paper: '#ffffff',
  },
  
  // Cores específicas para o domínio educacional
  domain: {
    literacy: '#5c6bc0', // Indigo para literacia
    math: '#26a69a', // Verde azulado para matemática
    behavior: '#7e57c2', // Roxo para comportamento
    socialEmotional: '#ec407a', // Rosa para socioemocional
    language: '#26c6da', // Azul claro para linguagem
    attention: '#ffca28', // Âmbar para atenção
  },
}; 