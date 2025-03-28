import { authHandlers } from './auth';
import { studentHandlers } from './students';

export const handlers = [
  ...authHandlers,
  ...studentHandlers,
]; 