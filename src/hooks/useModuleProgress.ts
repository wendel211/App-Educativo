import { useEffect, useState } from 'react';
import { getUserProgress, markModuleComplete } from '../services/progressService';
import { usePoints } from '../contexts/PointsContext';

type ProgressMap = {
  [diseaseId: string]: number[];
};

export const useModuleProgress = () => {
  const [completedModules, setCompletedModules] = useState<ProgressMap>({});
  const { refreshPoints } = usePoints();

  const isCompleted = (diseaseId: string, moduleIndex: number) => {
    return completedModules[diseaseId]?.includes(moduleIndex);
  };

  const markAsCompleted = async (diseaseId: string, moduleIndex: number) => {
    await markModuleComplete(diseaseId, moduleIndex);
    setCompletedModules(prev => {
      const current = prev[diseaseId] || [];
      if (current.includes(moduleIndex)) return prev;
      return {
        ...prev,
        [diseaseId]: [...current, moduleIndex],
      };
    });
    // atualiza o contexto de pontos
    await refreshPoints();
  };

  useEffect(() => {
    const fetchInitialProgress = async () => {
      const diseaseIds = ['1','2','3','4','5','6'];
      const progressData: ProgressMap = {};

      for (const id of diseaseIds) {
        const data = await getUserProgress(id);
        progressData[id] = data.completedModules || [];
      }

      setCompletedModules(progressData);
      // também puxa o total inicial
      await refreshPoints();
    };

    fetchInitialProgress();
  }, []);

  return {
    completedModules,
    isCompleted,
    markAsCompleted,
  };
};
