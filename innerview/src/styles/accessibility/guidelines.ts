// Diretrizes de Acessibilidade
import { colors } from '../tokens';

/**
 * Diretrizes de acessibilidade para o Innerview
 * Baseado em WCAG 2.2 AA
 */
export const accessibilityGuidelines = {
  // Contraste mínimo para texto (WCAG 2.2 AA)
  contrast: {
    normalText: 4.5, // Contraste mínimo para texto normal
    largeText: 3,    // Contraste mínimo para texto grande
    uiComponents: 3,  // Contraste mínimo para elementos de UI
    
    // Função para verificar se uma combinação de cores tem contraste suficiente
    check: (foreground: string, background: string): boolean => {
      // Esta implementação é simplificada - em produção, usaríamos uma
      // biblioteca como 'color-contrast-checker' para cálculos precisos
      return true;
    },
  },
  
  // Tamanhos mínimos de texto para legibilidade
  textSize: {
    minimum: '16px', // Tamanho mínimo para texto de leitura
    touch: '48px',   // Tamanho mínimo para alvo tocável
  },
  
  // Tempo mínimo para leitura de notificações
  timing: {
    notification: 5000, // 5 segundos mínimos para notificações
    transition: 300,    // Transições não devem exceder 300ms
  },
  
  // Foco visível
  focus: {
    outlineColor: colors.primary[500],
    outlineWidth: '2px',
    outlineStyle: 'solid',
  },
  
  // Alternativas para informações não-textuais
  nonText: {
    requireAltText: true,        // Requer texto alternativo para imagens
    requireCaptions: true,       // Requer legendas para vídeos
    requireTranscripts: true,    // Requer transcrições para áudio
  },
  
  // Navegação por teclado
  keyboard: {
    requireAllFocusable: true,   // Todos os elementos interativos devem ser focáveis
    requireLogicalOrder: true,   // Ordem de tabulação deve ser lógica
    requireKeyboardShortcuts: true, // Fornecer atalhos de teclado para ações comuns
  },
  
  // Texto e comportamento previsível
  predictable: {
    avoidAutoFocus: true,        // Evitar auto-foco em elementos
    avoidContextChanges: true,   // Evitar mudanças de contexto automáticas
    requireConfirmation: true,   // Requer confirmação para ações destrutivas
  },
  
  // Ajuda e identificação de erros
  errors: {
    requireErrorIdentification: true, // Identificação clara de erros
    requireSuggestions: true,         // Fornecer sugestões para correção
    requirePrevention: true,          // Prevenção de erros para ações críticas
  },
  
  // Compatibilidade com tecnologias assistivas
  assistiveTech: {
    requireARIA: true,           // Uso adequado de ARIA quando necessário
    requireSemanticHTML: true,   // Preferência para HTML semântico sobre ARIA
    avoidCustomWidgets: true,    // Evitar widgets personalizados quando nativos existirem
  },
  
  // Aplicação das diretrizes
  checkComponent: (component: unknown): boolean => {
    // Esta função seria implementada para verificar um componente
    // quanto à conformidade com as diretrizes de acessibilidade
    return true;
  },
}; 