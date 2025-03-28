import { Status } from './student';

export interface Intervention {
  id: string;
  dataInicio: Date;
  dataFim?: Date;
  tipo: string;
  descricao: string;
  status: Status;
  observacoes?: string;
  estudanteId: string;
  intervencaoBaseId?: string;
  metas?: Goal[];
  progressos?: InterventionProgress[];
  sessoes?: InterventionSession[];
  criadoEm: Date;
  atualizadoEm: Date;
}

export interface InterventionBase {
  id: string;
  nome: string;
  descricao: string;
  objetivo: string;
  nivel: NivelIntervencao;
  area: AreaIntervencao;
  tempoEstimado: number;
  frequencia: FrequenciaAplicacao;
  materiaisNecessarios?: string;
  evidenciaCientifica?: string;
  fonteEvidencia?: string;
  ativo: boolean;
  criadoEm: Date;
  atualizadoEm: Date;
}

export enum NivelIntervencao {
  UNIVERSAL = 'UNIVERSAL',
  SELETIVO = 'SELETIVO',
  INTENSIVO = 'INTENSIVO',
}

export enum AreaIntervencao {
  LEITURA = 'LEITURA',
  ESCRITA = 'ESCRITA',
  MATEMATICA = 'MATEMATICA',
  COMPORTAMENTO = 'COMPORTAMENTO',
  ATENCAO = 'ATENCAO',
  SOCIOEMOCIONAL = 'SOCIOEMOCIONAL',
  LINGUAGEM = 'LINGUAGEM',
  OUTRO = 'OUTRO',
}

export enum FrequenciaAplicacao {
  DIARIA = 'DIARIA',
  SEMANAL = 'SEMANAL',
  QUINZENAL = 'QUINZENAL',
  MENSAL = 'MENSAL',
  PERSONALIZADA = 'PERSONALIZADA',
}

export interface InterventionProgress {
  id: string;
  intervencaoId: string;
  data: Date;
  pontuacao: number;
  observacoes: string;
  dificuldades?: string;
  proximosPassos?: string;
  registradoPor: string;
  criadoEm: Date;
  atualizadoEm: Date;
}

export interface InterventionSession {
  id: string;
  data: Date;
  duracao: number;
  status: Status;
  observacoes?: string;
  materiaisUtilizados?: string;
  desafiosEncontrados?: string;
  proximosPassos?: string;
  intervencaoId: string;
  aplicadorId: string;
  resultadosKpi?: ResultadoKpi[];
  criadoEm: Date;
  atualizadoEm: Date;
}

export interface ResultadoKpi {
  id: string;
  valor: number;
  observacoes?: string;
  sessaoId: string;
  kpiId: string;
  criadoEm: Date;
  atualizadoEm: Date;
}

export interface Goal {
  id: string;
  titulo: string;
  descricao: string;
  tipo: TipoMeta;
  especifico: string;
  mensuravel: string;
  atingivel: string;
  relevante: string;
  temporal: string;
  dataInicio: Date;
  dataFim: Date;
  status: StatusMeta;
  observacoes?: string;
  intervencaoId: string;
  criadoEm: Date;
  atualizadoEm: Date;
}

export enum TipoMeta {
  ACADEMICA = 'ACADEMICA',
  COMPORTAMENTAL = 'COMPORTAMENTAL',
  SOCIAL = 'SOCIAL',
  EMOCIONAL = 'EMOCIONAL',
}

export enum StatusMeta {
  NAO_INICIADA = 'NAO_INICIADA',
  EM_ANDAMENTO = 'EM_ANDAMENTO',
  CONCLUIDA = 'CONCLUIDA',
  CANCELADA = 'CANCELADA',
} 