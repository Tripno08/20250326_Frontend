import { faker } from '@faker-js/faker/locale/pt_BR';
import { IMockStudent } from '../types';

// Series escolares do Brasil
const SERIES = [
  '1º ano - Ensino Fundamental',
  '2º ano - Ensino Fundamental',
  '3º ano - Ensino Fundamental',
  '4º ano - Ensino Fundamental',
  '5º ano - Ensino Fundamental',
  '6º ano - Ensino Fundamental',
  '7º ano - Ensino Fundamental',
  '8º ano - Ensino Fundamental',
  '9º ano - Ensino Fundamental',
  '1º ano - Ensino Médio',
  '2º ano - Ensino Médio',
  '3º ano - Ensino Médio',
];

export function createMockStudent(override: Partial<IMockStudent> = {}): IMockStudent {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const now = new Date().toISOString();
  
  // Gerar data de nascimento entre 6 e 18 anos atrás
  const birthYear = new Date().getFullYear() - faker.number.int({ min: 6, max: 18 });
  const birthDate = faker.date.between({ 
    from: new Date(birthYear, 0, 1), 
    to: new Date(birthYear, 11, 31) 
  }).toISOString();
  
  return {
    id: override.id || faker.string.uuid(),
    nome: override.nome || `${firstName} ${lastName}`,
    serie: override.serie || faker.helpers.arrayElement(SERIES),
    dataNascimento: override.dataNascimento || birthDate,
    usuarioId: override.usuarioId || faker.string.uuid(),
    instituicaoId: override.instituicaoId || faker.string.uuid(),
    criadoEm: override.criadoEm || now,
    atualizadoEm: override.atualizadoEm || now,
  };
}

export function createMockStudents(count: number, usuarioId?: string, instituicaoId?: string): IMockStudent[] {
  return Array.from({ length: count }).map(() => 
    createMockStudent({ 
      usuarioId: usuarioId || faker.string.uuid(),
      instituicaoId: instituicaoId || faker.string.uuid()
    })
  );
} 