import React, { createContext, useContext, useEffect, useState } from 'react';
import { getTotalPoints } from '../services/progressService';

interface PointsContextType {
  totalPoints: number;
  refreshPoints: () => Promise<void>;
}

const PointsContext = createContext<PointsContextType | undefined>(undefined);

export const PointsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [totalPoints, setTotalPoints] = useState(0);

  const refreshPoints = async () => {
    const points = await getTotalPoints();
    setTotalPoints(points);
  };

  useEffect(() => {
    refreshPoints();
  }, []);

  return (
    <PointsContext.Provider value={{ totalPoints, refreshPoints }}>
      {children}
    </PointsContext.Provider>
  );
};

export const usePoints = () => {
  const context = useContext(PointsContext);
  if (!context) {
    throw new Error('usePoints deve ser usado dentro de PointsProvider');
  }
  return context;
};
