export enum CargoUsuario {
  ADMIN = 'ADMIN',
  PROFESSOR = 'PROFESSOR',
  ESPECIALISTA = 'ESPECIALISTA',
  COORDENADOR = 'COORDENADOR',
  DIRETOR = 'DIRETOR',
  ADMINISTRADOR = 'ADMINISTRADOR',
  SECRETARIA = 'SECRETARIA',
  RESPONSAVEL = 'RESPONSAVEL',
  PSICOLOGO = 'PSICOLOGO',
  ORIENTADOR = 'ORIENTADOR',
  OUTRO = 'OUTRO',
  DPO = 'DPO',
}

export interface User {
  id: string;
  email: string;
  nome: string;
  cargo: CargoUsuario;
  avatar?: string;
  phone?: string;
  lastLogin?: Date;
  criadoEm: Date;
  atualizadoEm: Date;
}

export enum CargoEquipe {
  COORDENADOR = 'COORDENADOR',
  ESPECIALISTA = 'ESPECIALISTA',
  PROFESSOR = 'PROFESSOR',
  CONSELHEIRO = 'CONSELHEIRO',
  PSICOLOGO = 'PSICOLOGO',
  OUTRO = 'OUTRO',
}

export interface MembroEquipe {
  id: string;
  cargo: CargoEquipe;
  dataEntrada: Date;
  dataSaida?: Date;
  ativo: boolean;
  usuarioId: string;
  equipeId: string;
  usuario?: User;
  criadoEm: Date;
  atualizadoEm: Date;
}

export interface UserAuth {
  user: User;
  token: string;
  refreshToken: string;
} 