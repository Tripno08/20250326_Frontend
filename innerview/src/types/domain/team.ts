import { Status } from './student';
import { CargoEquipe } from './user';

export interface Team {
  id: string;
  nome: string;
  descricao?: string;
  ativo: boolean;
  membros?: TeamMember[];
  estudantes?: TeamStudent[];
  reunioes?: Meeting[];
  criadoEm: Date;
  atualizadoEm: Date;
}

export interface TeamMember {
  id: string;
  cargo: CargoEquipe;
  dataEntrada: Date;
  dataSaida?: Date;
  ativo: boolean;
  usuarioId: string;
  equipeId: string;
  criadoEm: Date;
  atualizadoEm: Date;
}

export interface TeamStudent {
  id: string;
  dataAtribuicao: Date;
  dataRemocao?: Date;
  ativo: boolean;
  estudanteId: string;
  equipeId: string;
  criadoEm: Date;
  atualizadoEm: Date;
}

export interface Meeting {
  id: string;
  titulo: string;
  data: Date;
  local?: string;
  status: Status;
  observacoes?: string;
  resumo?: string;
  equipeId: string;
  pauta?: string;
  participantes?: MeetingParticipant[];
  encaminhamentos?: Referral[];
  criadoEm: Date;
  atualizadoEm: Date;
}

export interface MeetingParticipant {
  id: string;
  presente: boolean;
  cargo?: string;
  confirmado: boolean;
  usuarioId: string;
  reuniaoId: string;
  criadoEm: Date;
  atualizadoEm: Date;
}

export enum Prioridade {
  BAIXA = 'BAIXA',
  MEDIA = 'MEDIA',
  ALTA = 'ALTA',
  URGENTE = 'URGENTE',
}

export interface Referral {
  id: string;
  titulo: string;
  descricao: string;
  dataPrazo?: Date;
  status: Status;
  prioridade: Prioridade;
  dataConclusao?: Date;
  observacoes?: string;
  estudanteId: string;
  atribuidoPara: string;
  criadoPor: string;
  equipeId?: string;
  reuniaoId?: string;
  criadoEm: Date;
  atualizadoEm: Date;
} 