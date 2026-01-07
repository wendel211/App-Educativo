

/**
 * Calcula a nova pontuação do usuário respeitando o limite máximo.
 * @param currentPoints Pontuação atual do usuário na doença
 * @param pointsToAward Pontos a serem adicionados (ex: 10)
 * @param maxCap Limite máximo permitido (ex: 30)
 */
export const calculateScore = (currentPoints: number, pointsToAward: number, maxCap: number = 30): number => {
  if (currentPoints >= maxCap) return maxCap;
  return Math.min(currentPoints + pointsToAward, maxCap);
};

export const canEarnPoints = (completedModules: number[], moduleIndex: number): boolean => {
  return !completedModules.includes(moduleIndex);
};

export const isModuleUnlocked = (completedModules: number[], moduleIndex: number): boolean => {
  if (moduleIndex === 0) return true;
  return completedModules.includes(moduleIndex - 1);
};

export const calculateProgressPercentage = (completedCount: number, totalModules: number): number => {
  if (totalModules === 0) return 0;
  return Math.round((completedCount / totalModules) * 100);
};