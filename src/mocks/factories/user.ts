import { faker } from '@faker-js/faker/locale/pt_BR';
import { CargoUsuario } from '@/types/enums';
import { IMockUser } from '../types';

const CARGOS = Object.values(CargoUsuario);

export function createMockUser(override: Partial<IMockUser> = {}): IMockUser {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const now = new Date().toISOString();
  
  return {
    id: override.id || faker.string.uuid(),
    email: override.email || faker.internet.email({ firstName, lastName }).toLowerCase(),
    nome: override.nome || `${firstName} ${lastName}`,
    cargo: override.cargo || faker.helpers.arrayElement(CARGOS),
    avatar: override.avatar || faker.image.avatar(),
    criadoEm: override.criadoEm || now,
    atualizadoEm: override.atualizadoEm || now,
  };
}

export function createMockUsers(count: number): IMockUser[] {
  return Array.from({ length: count }).map(() => createMockUser());
} 