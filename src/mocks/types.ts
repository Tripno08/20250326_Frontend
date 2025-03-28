import { CargoUsuario, Status } from '@/types/enums';

// Tipos para mocks
export interface IMockUser {
  id: string;
  email: string;
  nome: string;
  cargo: CargoUsuario;
  avatar?: string;
  criadoEm: string;
  atualizadoEm: string;
}

export interface IMockStudent {
  id: string;
  nome: string;
  serie: string;
  dataNascimento: string;
  usuarioId: string;
  instituicaoId?: string;
  criadoEm: string;
  atualizadoEm: string;
}

export interface IMockIntervention {
  id: string;
  dataInicio: string;
  dataFim?: string;
  tipo: string;
  descricao: string;
  status: Status;
  observacoes?: string;
  estudanteId: string;
  intervencaoBaseId?: string;
  criadoEm: string;
  atualizadoEm: string;
}

export interface IMockAssessment {
  id: string;
  data: string;
  tipo: string;
  pontuacao: number;
  observacoes?: string;
  metadados?: Record<string, any>;
  estudanteId: string;
  criadoEm: string;
  atualizadoEm: string;
}

export interface IMockTeam {
  id: string;
  nome: string;
  descricao?: string;
  ativo: boolean;
  criadoEm: string;
  atualizadoEm: string;
  membros: IMockTeamMember[];
}

export interface IMockTeamMember {
  id: string;
  usuarioId: string;
  usuario: IMockUser;
  cargo: string;
  dataEntrada: string;
  dataSaida?: string;
  ativo: boolean;
}

export interface IMockApiResponse<T> {
  success: boolean;
  data: T | null;
  meta?: {
    totalCount?: number;
    page?: number;
    perPage?: number;
  };
  error?: {
    code: string;
    message: string;
    details?: any;
  };
} 