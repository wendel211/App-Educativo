import React from 'react';
import { render, waitFor, act } from '@testing-library/react-native';
import { UserIndicatorsScreen } from './UserIndicatorsScreen';

// 1. IMPORTAMOS AS FUNÇÕES REAIS PARA ESPIONAR
import * as HealthProcessing from '../../utils/healthDataProcessing';
import { readRecords } from 'react-native-health-connect';

// 2. MOCKS (Simulações)
// Fingimos ser o Health Connect (pois Jest roda no PC, não no Android)
jest.mock('react-native-health-connect', () => ({
  initialize: jest.fn().mockResolvedValue(true),
  requestPermission: jest.fn().mockResolvedValue(true),
  readRecords: jest.fn(),
}));

// Mock da Navegação
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({ navigate: jest.fn() }),
  useFocusEffect: (cb: Function) => cb(), // Executa o efeito imediatamente
}));

// Mock dos Serviços (para não quebrar o teste chamando Firebase real)
jest.mock('../../services/alertService', () => ({ getUserAlerts: jest.fn().mockResolvedValue([]) }));
jest.mock('../../services/indicatorService', () => ({ getRecentIndicators: jest.fn().mockResolvedValue([]) }));

// Mock dos Componentes Filhos (Focamos na tela pai)
jest.mock('../../components/health/HealthConnectSection', () => 'HealthConnectSection');
jest.mock('../../components/alerts/AlertList', () => 'AlertList');
jest.mock('../../components/health/IndicatorList', () => 'IndicatorList');
jest.mock('../../components/alerts/AddAlertModal', () => 'AddAlertModal');
jest.mock('../../components/health/AddIndicatorModal', () => 'AddIndicatorModal');

describe('UserIndicatorsScreen - Integração Segura', () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Deve buscar dados brutos e OBRIGATORIAMENTE passar pela função de segurança', async () => {
    (readRecords as jest.Mock).mockResolvedValueOnce({
      records: [
        { count: 100, startTime: '2023-01-01T08:00:00Z' },
        { count: 50, startTime: '2023-01-01T09:00:00Z' }
      ]
    }).mockResolvedValueOnce({ 
      records: [] 
    });
    const spySeguranca = jest.spyOn(HealthProcessing, 'aggregateDailySteps');

    // B. AÇÃO (Act)
    await act(async () => {
      render(<UserIndicatorsScreen />);
    });

    await waitFor(() => {

      expect(readRecords).toHaveBeenCalled();

      expect(spySeguranca).toHaveBeenCalled();

      expect(spySeguranca).toHaveBeenCalledWith(
        expect.arrayContaining([
          expect.objectContaining({ value: 100 }),
          expect.objectContaining({ value: 50 })
        ])
      );
    });
  });
});