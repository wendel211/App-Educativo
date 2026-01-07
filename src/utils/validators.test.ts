import { isValidEmail, isStrongPassword } from './validators';

describe('Módulo de Validação (Segurança)', () => {
  
  test('Deve validar e-mails corretamente', () => {
    expect(isValidEmail('teste@email.com')).toBe(true);
    expect(isValidEmail('email-invalido')).toBe(false);
  });

  test('Deve validar força da senha (min 6 caracteres)', () => {
    expect(isStrongPassword('123')).toBe(false);
    expect(isStrongPassword('123456')).toBe(true);
  });

});