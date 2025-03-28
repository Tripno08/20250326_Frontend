import { faker } from '@faker-js/faker/locale/pt_BR';
import { Status, AreaIntervencao } from '@/types/enums';
import { IMockIntervention } from '../types';

const INTERVENTION_TYPES = [
  'Reforço de Leitura',
  'Suporte Matemático',
  'Apoio Comportamental',
  'Desenvolvimento de Linguagem',
  'Treino de Habilidades Sociais',
  'Intervenção em Atenção',
  'Suporte à Escrita',
  'Desenvolvimento Motor',
  'Orientação para Organização',
  'Apoio Emocional'
];

const STATUS_VALUES = Object.values(Status);
const AREAS = Object.values(AreaIntervencao);

export function createMockIntervention(override: Partial<IMockIntervention> = {}): IMockIntervention {
  const now = new Date();
  const startDate = faker.date.past({ years: 1, refDate: now }).toISOString();
  // 30% de chance de ter uma data de fim
  const hasEndDate = faker.datatype.boolean(0.3);
  const endDate = hasEndDate 
    ? faker.date.between({ from: new Date(startDate), to: now }).toISOString()
    : undefined;
  
  const created = faker.date.past({ years: 1, refDate: new Date(startDate) }).toISOString();
  const updated = faker.date.between({ from: new Date(created), to: now }).toISOString();
  
  const area = faker.helpers.arrayElement(AREAS);
  const tipo = override.tipo || faker.helpers.arrayElement(INTERVENTION_TYPES);
  
  return {
    id: override.id || faker.string.uuid(),
    dataInicio: override.dataInicio || startDate,
    dataFim: override.dataFim || endDate,
    tipo,
    descricao: override.descricao || `Intervenção em ${area.toLowerCase()} para desenvolvimento de habilidades específicas`,
    status: override.status || faker.helpers.arrayElement(STATUS_VALUES),
    observacoes: override.observacoes || faker.helpers.maybe(() => faker.lorem.paragraph(), { probability: 0.7 }),
    estudanteId: override.estudanteId || faker.string.uuid(),
    intervencaoBaseId: override.intervencaoBaseId || faker.helpers.maybe(() => faker.string.uuid(), { probability: 0.5 }),
    criadoEm: override.criadoEm || created,
    atualizadoEm: override.atualizadoEm || updated,
  };
}

export function createMockInterventions(count: number, estudanteId?: string): IMockIntervention[] {
  return Array.from({ length: count }).map(() => 
    createMockIntervention({ 
      estudanteId: estudanteId || faker.string.uuid()
    })
  );
} 