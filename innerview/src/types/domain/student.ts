export interface Student {
  id: string;
  nome: string;
  identifier?: string;
  dataNascimento: Date;
  serie: string;
  instituicaoId?: string;
  ativo?: boolean;
  usuarioId: string;
  guardians?: Guardian[];
  tags?: string[];
  criadoEm: Date;
  atualizadoEm: Date;
}

export interface Guardian {
  id: string;
  name: string;
  relationship: string;
  email: string;
  phone: string;
}

export enum CategoriaDificuldade {
  LEITURA = 'LEITURA',
  ESCRITA = 'ESCRITA',
  MATEMATICA = 'MATEMATICA',
  ATENCAO = 'ATENCAO',
  COMPORTAMENTO = 'COMPORTAMENTO',
  COMUNICACAO = 'COMUNICACAO',
  COORDENACAO_MOTORA = 'COORDENACAO_MOTORA',
  MEMORIA = 'MEMORIA',
  ORGANIZACAO = 'ORGANIZACAO',
  OUTRO = 'OUTRO',
}

export enum Nivel {
  BAIXO = 'BAIXO',
  MODERADO = 'MODERADO',
  ALTO = 'ALTO',
  MUITO_ALTO = 'MUITO_ALTO',
}

export interface StudentDifficulty {
  id: string;
  nivel: Nivel;
  dataIdentificacao: Date;
  observacoes?: string;
  estudanteId: string;
  dificuldadeId: string;
  dificuldade?: LearningDifficulty;
  criadoEm: Date;
  atualizadoEm: Date;
}

export interface LearningDifficulty {
  id: string;
  nome: string;
  descricao: string;
  sintomas: string;
  categoria: CategoriaDificuldade;
  status: Status;
  metadados?: Record<string, unknown>;
  criadoEm: Date;
  atualizadoEm: Date;
}

export enum Status {
  PENDENTE = 'PENDENTE',
  AGENDADO = 'AGENDADO',
  ATIVO = 'ATIVO',
  EM_ANDAMENTO = 'EM_ANDAMENTO',
  CONCLUIDO = 'CONCLUIDO',
  CANCELADO = 'CANCELADO',
} 