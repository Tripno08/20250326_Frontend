import { faker } from '@faker-js/faker/locale/pt_BR';
import { IMockAssessment } from '../types';

const ASSESSMENT_TYPES = [
  'TRIAGEM_LEITURA',
  'TRIAGEM_MATEMATICA',
  'AVALIACAO_COMPORTAMENTAL',
  'AVALIACAO_COGNITIVA',
  'DIAGNOSTICO_PEDAGOGICO',
  'TESTE_FLUENCIA',
  'AVALIACAO_FORMATIVA',
  'AVALIACAO_SOMATIVA',
  'TESTE_COMPREENSAO',
  'PERFIL_SOCIOEMOCIONAL'
];

export function createMockAssessment(override: Partial<IMockAssessment> = {}): IMockAssessment {
  const now = new Date();
  const assessmentDate = faker.date.past({ years: 1, refDate: now }).toISOString();
  const created = faker.date.past({ years: 1, refDate: new Date(assessmentDate) }).toISOString();
  const updated = faker.date.between({ from: new Date(created), to: now }).toISOString();
  
  const tipo = override.tipo || faker.helpers.arrayElement(ASSESSMENT_TYPES);
  
  // Metadados específicos para cada tipo de avaliação
  let metadados: Record<string, any> = {};
  
  if (tipo.includes('LEITURA') || tipo.includes('FLUENCIA')) {
    metadados = {
      palavrasPorMinuto: faker.number.int({ min: 10, max: 150 }),
      compreensao: faker.number.int({ min: 1, max: 10 }),
      precisao: faker.number.float({ min: 0.5, max: 1.0, precision: 0.01 }),
    };
  } else if (tipo.includes('MATEMATICA')) {
    metadados = {
      operacoesBasicas: faker.number.int({ min: 1, max: 10 }),
      resolucaoProblemas: faker.number.int({ min: 1, max: 10 }),
      raciocinio: faker.number.int({ min: 1, max: 10 }),
    };
  } else if (tipo.includes('COMPORTAMENTAL') || tipo.includes('SOCIOEMOCIONAL')) {
    metadados = {
      atencao: faker.number.int({ min: 1, max: 10 }),
      participacao: faker.number.int({ min: 1, max: 10 }),
      relacionamento: faker.number.int({ min: 1, max: 10 }),
      autocontrole: faker.number.int({ min: 1, max: 10 }),
    };
  }
  
  return {
    id: override.id || faker.string.uuid(),
    data: override.data || assessmentDate,
    tipo,
    pontuacao: override.pontuacao || faker.number.float({ min: 0, max: 100, precision: 0.1 }),
    observacoes: override.observacoes || faker.helpers.maybe(() => faker.lorem.paragraph(), { probability: 0.7 }),
    metadados: override.metadados || metadados,
    estudanteId: override.estudanteId || faker.string.uuid(),
    criadoEm: override.criadoEm || created,
    atualizadoEm: override.atualizadoEm || updated,
  };
}

export function createMockAssessments(count: number, estudanteId?: string): IMockAssessment[] {
  return Array.from({ length: count }).map(() => 
    createMockAssessment({ 
      estudanteId: estudanteId || faker.string.uuid()
    })
  );
} 