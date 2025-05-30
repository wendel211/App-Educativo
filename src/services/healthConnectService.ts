// src/services/healthConnectService.ts

import {
  initialize,
  getSdkStatus,
  getGrantedPermissions,
  readRecords,
  SdkAvailabilityStatus,
  Permission
} from 'react-native-health-connect';

// Permissões necessárias para leitura dos dados
const permissions: Permission[] = [
  { accessType: 'read', recordType: 'Steps' },
  { accessType: 'read', recordType: 'HeartRate' },
  { accessType: 'read', recordType: 'SleepSession' },
];

// Inicializa o Health Connect apenas uma vez
let _healthConnectInitialized = false;

export async function ensureHealthConnectInitialized(): Promise<boolean> {
  if (_healthConnectInitialized) return true;
  try {
    const sdkStatus = await getSdkStatus();
    if (sdkStatus === SdkAvailabilityStatus.SDK_AVAILABLE) {
      const isInitialized = await initialize();
      _healthConnectInitialized = isInitialized;
      return isInitialized;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
}

// Verifica se as permissões já foram concedidas
export async function checkPermissions(): Promise<Permission[]> {
  try {
    return await getGrantedPermissions();
  } catch (error) {
    return [];
  }
}

// Utilitário para pegar intervalo do início do dia até agora
function getTodayRange() {
  const now = new Date();
  const start = new Date();
  start.setHours(0, 0, 0, 0); // 00:00:00 de hoje
  return { startTime: start, endTime: now };
}

// Buscar passos de hoje
export async function getSteps() {
  await ensureHealthConnectInitialized();
  const { startTime, endTime } = getTodayRange();
  try {
    const result = await readRecords('Steps', {
      timeRangeFilter: {
        operator: 'between',
        startTime: startTime.toISOString(),
        endTime: endTime.toISOString(),
      },
    });
    return result;
  } catch (error) {
    return { records: [] };
  }
}

// Buscar frequência cardíaca de hoje
export async function getHeartRate() {
  await ensureHealthConnectInitialized();
  const { startTime, endTime } = getTodayRange();
  try {
    const result = await readRecords('HeartRate', {
      timeRangeFilter: {
        operator: 'between',
        startTime: startTime.toISOString(),
        endTime: endTime.toISOString(),
      },
    });
    return result;
  } catch (error) {
    return { records: [] };
  }
}

// Buscar sessões de sono de hoje
export async function getSleepSessions() {
  await ensureHealthConnectInitialized();
  const { startTime, endTime } = getTodayRange();
  try {
    const result = await readRecords('SleepSession', {
      timeRangeFilter: {
        operator: 'between',
        startTime: startTime.toISOString(),
        endTime: endTime.toISOString(),
      },
    });
    return result;
  } catch (error) {
    return { records: [] };
  }
}
