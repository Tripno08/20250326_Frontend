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
  DPO = 'DPO' // Responsável pela proteção de dados pessoais
}

export enum Status {
  PENDENTE = 'PENDENTE',
  AGENDADO = 'AGENDADO',
  ATIVO = 'ATIVO',
  EM_ANDAMENTO = 'EM_ANDAMENTO',
  CONCLUIDO = 'CONCLUIDO',
  CANCELADO = 'CANCELADO'
}

export enum CargoEquipe {
  COORDENADOR = 'COORDENADOR',
  ESPECIALISTA = 'ESPECIALISTA',
  PROFESSOR = 'PROFESSOR',
  CONSELHEIRO = 'CONSELHEIRO',
  PSICOLOGO = 'PSICOLOGO',
  OUTRO = 'OUTRO'
}

export enum TipoComunicacao {
  EMAIL = 'EMAIL',
  TELEFONE = 'TELEFONE',
  PRESENCIAL = 'PRESENCIAL',
  CARTA = 'CARTA',
  OUTRO = 'OUTRO'
}

export enum StatusComunicacao {
  RASCUNHO = 'RASCUNHO',
  ENVIADO = 'ENVIADO',
  ENTREGUE = 'ENTREGUE',
  LIDO = 'LIDO',
  RESPONDIDO = 'RESPONDIDO',
  FALHA = 'FALHA'
}

export enum Prioridade {
  BAIXA = 'BAIXA',
  MEDIA = 'MEDIA',
  ALTA = 'ALTA',
  URGENTE = 'URGENTE'
}

export enum TipoNotificacao {
  REUNIAO_AGENDADA = 'REUNIAO_AGENDADA',
  LEMBRETE_REUNIAO = 'LEMBRETE_REUNIAO',
  ENCAMINHAMENTO_ATRIBUIDO = 'ENCAMINHAMENTO_ATRIBUIDO',
  PRAZO_PROXIMO = 'PRAZO_PROXIMO',
  PRAZO_VENCIDO = 'PRAZO_VENCIDO',
  MENSAGEM_RECEBIDA = 'MENSAGEM_RECEBIDA',
  ESTUDANTE_ATUALIZADO = 'ESTUDANTE_ATUALIZADO',
  AVALIACAO_ADICIONADA = 'AVALIACAO_ADICIONADA',
  INTERVENCAO_ATUALIZADA = 'INTERVENCAO_ATUALIZADA',
  CONVITE_EQUIPE = 'CONVITE_EQUIPE'
}

export enum Nivel {
  BAIXO = 'BAIXO',
  MODERADO = 'MODERADO',
  ALTO = 'ALTO',
  MUITO_ALTO = 'MUITO_ALTO'
}

export enum NivelIntervencao {
  UNIVERSAL = 'UNIVERSAL',
  SELETIVO = 'SELETIVO',
  INTENSIVO = 'INTENSIVO'
}

export enum AreaIntervencao {
  LEITURA = 'LEITURA',
  ESCRITA = 'ESCRITA',
  MATEMATICA = 'MATEMATICA',
  COMPORTAMENTO = 'COMPORTAMENTO',
  ATENCAO = 'ATENCAO',
  SOCIOEMOCIONAL = 'SOCIOEMOCIONAL',
  LINGUAGEM = 'LINGUAGEM',
  OUTRO = 'OUTRO'
} 