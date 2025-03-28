import { Nivel } from './student';

export interface Assessment {
  id: string;
  data: Date;
  tipo: string;
  pontuacao: number;
  observacoes?: string;
  metadados?: Record<string, unknown>;
  estudanteId: string;
  criadoEm: Date;
  atualizadoEm: Date;
}

export interface ScreeningInstrument {
  id: string;
  nome: string;
  descricao: string;
  categoria: CategoriaInstrumento;
  faixaEtaria: string;
  tempoAplicacao: number;
  instrucoes: string;
  ativo: boolean;
  indicadores?: ScreeningIndicator[];
  criadoEm: Date;
  atualizadoEm: Date;
}

export enum CategoriaInstrumento {
  ACADEMICO = 'ACADEMICO',
  COMPORTAMENTAL = 'COMPORTAMENTAL',
  SOCIOEMOCIONAL = 'SOCIOEMOCIONAL',
  COGNITIVO = 'COGNITIVO',
  LINGUAGEM = 'LINGUAGEM',
  MOTOR = 'MOTOR',
  ATENCAO = 'ATENCAO',
  OUTRO = 'OUTRO',
}

export interface ScreeningIndicator {
  id: string;
  nome: string;
  descricao: string;
  tipo: TipoIndicador;
  valorMinimo: number;
  valorMaximo: number;
  pontoCorte: number;
  instrumentoId: string;
  criadoEm: Date;
  atualizadoEm: Date;
}

export enum TipoIndicador {
  ESCALA_LIKERT = 'ESCALA_LIKERT',
  SIM_NAO = 'SIM_NAO',
  NUMERICO = 'NUMERICO',
  MULTIPLA_ESCOLHA = 'MULTIPLA_ESCOLHA',
  TEXTO_LIVRE = 'TEXTO_LIVRE',
}

export interface Screening {
  id: string;
  dataAplicacao: Date;
  observacoes?: string;
  status: string;
  estudanteId: string;
  aplicadorId: string;
  instrumentoId: string;
  resultados?: ScreeningResult[];
  criadoEm: Date;
  atualizadoEm: Date;
}

export interface ScreeningResult {
  id: string;
  valor: number;
  nivelRisco?: Nivel;
  observacoes?: string;
  rastreioId: string;
  indicadorId: string;
  criadoEm: Date;
  atualizadoEm: Date;
} 