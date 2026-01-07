import React, { useState, useCallback } from 'react';
import { ScrollView, View, Text, StyleSheet, Platform, StatusBar } from 'react-native';
import { colors } from '../../styles/colors';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { initialize, readRecords } from 'react-native-health-connect';

// Importa os serviços que você já tinha (ajuste o caminho se necessário)
import { 
  checkPermissions, 
  ensureHealthConnectInitialized,
  getSleepSessions 
} from '../../services/healthConnectService'; // <--- Seus serviços originais

import AddAlertModal from '../../components/alerts/AddAlertModal';
import AddIndicatorModal from '../../components/health/AddIndicatorModal';

import HealthConnectSection from '../../components/health/HealthConnectSection'; 
import AlertList from '../../components/alerts/AlertList';
import IndicatorList from '../../components/health/IndicatorList';

import { getUserAlerts, deleteAlert } from '../../services/alertService';
import { getRecentIndicators, deleteIndicator } from '../../services/indicatorService';

// Importa a lógica segura validada pelo Jest
import { aggregateDailySteps, calculateAverageHeartRate } from '../../utils/healthDataProcessing';

export const UserIndicatorsScreen: React.FC = () => {
  const navigation = useNavigation();

  const [showAddAlertModal, setShowAddAlertModal] = useState(false);
  const [showAddIndicatorModal, setShowAddIndicatorModal] = useState(false);

  const [alerts, setAlerts] = useState<any[]>([]);
  const [indicators, setIndicators] = useState<any[]>([]);

  // === ESTADOS DO HEALTH CONNECT (Movidos do filho para cá) ===
  const [loadingHealth, setLoadingHealth] = useState(false);
  const [healthError, setHealthError] = useState<string | null>(null);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [permissionChecked, setPermissionChecked] = useState(false);
  
  const [hcSteps, setHcSteps] = useState<number | null>(null);
  const [hcHeartRate, setHcHeartRate] = useState<number | null>(null);
  const [hcSleep, setHcSleep] = useState<string | null>(null);

  const loadAlerts = useCallback(async () => {
    try { setAlerts(await getUserAlerts()); } catch (e) { /* log */ }
  }, []);
  
  const loadIndicators = useCallback(async () => {
    try { setIndicators(await getRecentIndicators()); } catch (e) { /* log */ }
  }, []);

  // === LÓGICA DE SINCRONIZAÇÃO (INTEGRADA COM JEST E SEUS SERVIÇOS) ===
  const handleSyncHealth = useCallback(async () => {
    if (Platform.OS !== 'android') return;
    
    setLoadingHealth(true);
    setHealthError(null);

    try {
      await ensureHealthConnectInitialized();
      const permissions = await checkPermissions();
      setPermissionChecked(true);

      if (!permissions.length) {
        setHasPermission(false);
        setHealthError("Permissão não concedida. Para visualizar seus dados, conceda permissão ao app pelo Health Connect.");
        setLoadingHealth(false);
        return;
      }
      setHasPermission(true);

      // Definindo intervalo (Hoje)
      const startTime = new Date(new Date().setHours(0, 0, 0, 0)).toISOString();
      const endTime = new Date().toISOString();

      // 1. Busca Passos (usando readRecords nativo para usar nossa lógica segura)
      const stepsResult = await readRecords('Steps', {
        timeRangeFilter: { operator: 'between', startTime, endTime },
      });
      // 2. Busca Coração
      const heartResult = await readRecords('HeartRate', {
        timeRangeFilter: { operator: 'between', startTime, endTime },
      });
      // 3. Busca Sono (usando seu serviço existente pois ele já formata, ou podemos adaptar)
      const sleepResult = await getSleepSessions(); // Assumindo que seu serviço retorna o objeto bruto

      // === APLICANDO A LÓGICA SEGURA (TESTADA) ===
      const rawSteps = stepsResult.records.map(r => ({ value: r.count, startDate: r.startTime }));
      const rawHeart = heartResult.records.map(r => ({ 
        value: r.samples[0]?.beatsPerMinute || 0, 
        startDate: r.startTime 
      }));

      const safeSteps = aggregateDailySteps(rawSteps);
      const safeHeart = calculateAverageHeartRate(rawHeart);
      const formattedSleep = formatSleep(sleepResult); // Função auxiliar abaixo

      setHcSteps(safeSteps);
      setHcHeartRate(safeHeart);
      setHcSleep(formattedSleep);
      setHealthError(null);

    } catch (error) {
      console.error(error);
      setHealthError('Erro ao buscar dados de saúde.');
      setHcSteps(null); setHcHeartRate(null); setHcSleep(null);
    } finally {
      setLoadingHealth(false);
    }
  }, []);

  // Auxiliar para formatar sono (Mantendo sua lógica original)
  function formatSleep(result: any) {
    if (result?.records?.length) {
      const totalMs = result.records.reduce((acc: number, r: any) => acc + (new Date(r.endTime).getTime() - new Date(r.startTime).getTime()), 0);
      const h = Math.floor(totalMs / (1000 * 60 * 60));
      const m = Math.floor((totalMs % (1000 * 60 * 60)) / (1000 * 60));
      return `${h}h ${m}m`;
    }
    return null;
  }
  
  useFocusEffect(
    useCallback(() => {
      loadAlerts(); 
      loadIndicators(); 
      // Opcional: Auto-sync ao entrar
      // handleSyncHealth(); 
    }, [loadAlerts, loadIndicators])
  );

  const handleDeleteAlert = async (id: string) => { await deleteAlert(id); loadAlerts(); };
  const handleDeleteIndicator = async (id: string) => { await deleteIndicator(id); loadIndicators(); };

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor={colors.primary} />
      <View style={styles.container}>
        <View style={styles.header}>
           {/* ... Header igual ... */}
           <View style={styles.headerContent}>
            <View style={styles.headerTextContainer}>
              <Text style={styles.headerTitle}>Saúde & Bem-estar</Text>
              <Text style={styles.headerSubtitle}>Acompanhe seus dados de saúde e lembretes importantes</Text>
            </View>
            <View style={styles.headerDecoration}>
              <View style={styles.decorationCircle1} />
              <View style={styles.decorationCircle2} />
              <View style={styles.decorationCircle3} />
            </View>
          </View>
        </View>

        <ScrollView 
          style={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {Platform.OS === 'android' && (
            // AQUI ESTÁ A MÁGICA: Passamos todos os estados e funções para o seu componente rico
            <HealthConnectSection 
              steps={hcSteps}
              heartRate={hcHeartRate}
              sleep={hcSleep}
              loading={loadingHealth}
              error={healthError}
              hasPermission={hasPermission}
              permissionChecked={permissionChecked}
              onSync={handleSyncHealth}
            />
          )}

          <View style={styles.sectionsContainer}>
            <View style={styles.sectionWrapper}>
              <AlertList alerts={alerts} onAdd={() => setShowAddAlertModal(true)} onDelete={handleDeleteAlert} />
            </View>
            <View style={styles.sectionWrapper}>
              <IndicatorList indicators={indicators} onAdd={() => setShowAddIndicatorModal(true)} onShowHistory={() => navigation.navigate('IndicatorHistoryScreen' as never)} onDelete={handleDeleteIndicator} />
            </View>
          </View>
          <View style={styles.bottomSpacer} />
        </ScrollView>

        <AddAlertModal visible={showAddAlertModal} onClose={() => setShowAddAlertModal(false)} onSaved={loadAlerts} />
        <AddIndicatorModal visible={showAddIndicatorModal} onClose={() => setShowAddIndicatorModal(false)} onSaved={loadIndicators} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: { backgroundColor: colors.primary, paddingTop: Platform.OS === 'ios' ? 60 : 50, paddingBottom: 32, paddingHorizontal: 24, borderBottomLeftRadius: 24, borderBottomRightRadius: 24, elevation: 8, shadowColor: '#000', shadowOpacity: 0.2, shadowRadius: 16, shadowOffset: { width: 0, height: 8 }, position: 'relative', overflow: 'hidden' },
  headerContent: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  headerTextContainer: { flex: 1 },
  headerTitle: { fontSize: 28, fontFamily: 'Poppins-Bold', color: '#fff', marginBottom: 6, letterSpacing: -0.5 },
  headerSubtitle: { fontSize: 15, fontFamily: 'Poppins-Regular', color: 'rgba(255, 255, 255, 0.85)', lineHeight: 22, maxWidth: '85%' },
  headerDecoration: { position: 'absolute', right: -20, top: -10, opacity: 0.1 },
  decorationCircle1: { width: 120, height: 120, borderRadius: 60, backgroundColor: '#fff', position: 'absolute' },
  decorationCircle2: { width: 80, height: 80, borderRadius: 40, backgroundColor: '#fff', position: 'absolute', top: 40, right: 30 },
  decorationCircle3: { width: 50, height: 50, borderRadius: 25, backgroundColor: '#fff', position: 'absolute', top: 80, right: -10 },
  scrollContainer: { flex: 1 },
  scrollContent: { flexGrow: 1 },
  sectionsContainer: { paddingHorizontal: 20, marginTop: 8 },
  sectionWrapper: { marginBottom: 24 },
  bottomSpacer: { height: 32 },
});