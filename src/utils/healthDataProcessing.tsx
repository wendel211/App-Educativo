export interface HealthSample {
  value: number;
  startDate: string; 
}

export const aggregateDailySteps = (samples: HealthSample[]): number => {
  if (!samples || samples.length === 0) return 0;

  return samples.reduce((acc, current) => {
    const val = current.value > 0 ? current.value : 0;
    return acc + val;
  }, 0);
};


export const calculateAverageHeartRate = (samples: HealthSample[]): number => {
  if (!samples || samples.length === 0) return 0;

  const validSamples = samples.filter(s => s.value > 0);
  
  if (validSamples.length === 0) return 0;

  const total = validSamples.reduce((acc, curr) => acc + curr.value, 0);
  
  return Math.round(total / validSamples.length);
};