export interface Institution {
  id: string;
  nome: string;
  tipo: string;
  endereco?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  phone?: string;
  email?: string;
  website?: string;
  configuracoes?: Record<string, unknown>;
  ativo: boolean;
  criadoEm: Date;
  atualizadoEm: Date;
}

export interface UserInstitution {
  id: string;
  usuarioId: string;
  instituicaoId: string;
  cargo?: string;
  ativo: boolean;
  criadoEm: Date;
  atualizadoEm: Date;
}

export interface RetentionPolicy {
  id: string;
  tipoRegistro: string;
  periodoRetencaoMeses: number;
  descricao: string;
  instituicaoId: string;
  aplicacoesRealizadas: number;
  proximaAplicacao?: Date;
  ativo: boolean;
  criadoEm: Date;
  atualizadoEm: Date;
} 