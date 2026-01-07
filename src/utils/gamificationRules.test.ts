import { 
  calculateScore, 
  canEarnPoints, 
  isModuleUnlocked, 
  calculateProgressPercentage 
} from './gamificationRules';

describe('Core Gamification Logic (Coração do Tema)', () => {

  describe('Sistema de Pontuação e Limites', () => {
    test('Deve adicionar pontos corretamente para um iniciante', () => {
      expect(calculateScore(0, 10)).toBe(10);
    });

    test('Deve acumular pontos corretamente', () => {
      expect(calculateScore(10, 10)).toBe(20);
    });

    test('NÃO deve ultrapassar o limite máximo (Regra de Cap)', () => {
      expect(calculateScore(25, 10, 30)).toBe(30);
    });

    test('Deve ignorar pontos se já estiver no máximo', () => {
      expect(calculateScore(30, 10, 30)).toBe(30);
    });
  });

  describe('Regras de Conclusão de Módulos', () => {
    test('Deve permitir pontuar em módulos novos', () => {
      const completed = [0, 1];
      expect(canEarnPoints(completed, 2)).toBe(true);
    });

    test('NÃO deve pontuar em módulos repetidos (Anti-Farm)', () => {
      const completed = [0, 1];
      expect(canEarnPoints(completed, 1)).toBe(false);
    });
  });

  describe('Lógica de Desbloqueio (Trilha Educativa)', () => {
    test('Módulo 1 (índice 0) deve estar sempre desbloqueado', () => {
      expect(isModuleUnlocked([], 0)).toBe(true);
    });

    test('Módulo seguinte só desbloqueia se o anterior foi feito', () => {
      const completed = [0]; 
      
      expect(isModuleUnlocked(completed, 1)).toBe(true);
      expect(isModuleUnlocked(completed, 2)).toBe(false); 
    });
  });

  describe('Métricas de Progresso', () => {
    test('Deve calcular porcentagem correta', () => {

      expect(calculateProgressPercentage(2, 4)).toBe(50);
      
      expect(calculateProgressPercentage(1, 3)).toBe(33);
    });
  });

});