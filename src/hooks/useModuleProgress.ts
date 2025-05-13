import { useEffect, useState } from 'react';
import { getUserProgress, markModuleComplete } from '../services/progressService';
import { auth } from '../services/firebaseConfig';

type ProgressMap = {
  [diseaseId: string]: number[];
};

export const useModuleProgress = () => {
  const [completedModules, setCompletedModules] = useState<ProgressMap>({});

  const isCompleted = (diseaseId: string, moduleIndex: number) => {
    return completedModules[diseaseId]?.includes(moduleIndex);
  };

  const markAsCompleted = async (diseaseId: string, moduleIndex: number) => {
    await markModuleComplete(diseaseId, moduleIndex);
    setCompletedModules((prev) => {
      const current = prev[diseaseId] || [];
      if (current.includes(moduleIndex)) return prev;
      return {
        ...prev,
        [diseaseId]: [...current, moduleIndex],
      };
    });
  };

  useEffect(() => {
    const fetchInitialProgress = async () => {
      if (!auth.currentUser?.uid) return;

      const diseaseIds = ['1', '2', '3', '4', '5', '6'];
      const progressData: ProgressMap = {};

      for (const id of diseaseIds) {
        const data = await getUserProgress(id);
        progressData[id] = data.completedModules || [];
      }

      setCompletedModules(progressData);
    };

    fetchInitialProgress();
  }, []);

  return {
    completedModules,
    isCompleted,
    markAsCompleted,
  };
};
