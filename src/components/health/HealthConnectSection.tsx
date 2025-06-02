import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, ActivityIndicator, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../styles/colors';
import {
  getSteps,
  getHeartRate,
  getSleepSessions,
  checkPermissions,
  ensureHealthConnectInitialized
} from '../../services/healthConnectService';

export default function HealthConnectSection() {
  const [loading, setLoading] = useState(false);
  const [healthData, setHealthData] = useState({ steps: null, heartRate: null, sleep: null });
  const [healthError, setHealthError] = useState<string | null>(null);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [permissionChecked, setPermissionChecked] = useState(false);

  // Função para sincronizar dados
  async function handleSync() {
    setLoading(true);
    setHealthError(null);
    try {
      await ensureHealthConnectInitialized();
      const permissions = await checkPermissions();
      setPermissionChecked(true);
      if (!permissions.length) {
        setHasPermission(false);
        setHealthError(
          "Permissão não concedida. Para visualizar seus dados, conceda permissão ao app pelo Health Connect."
        );
        setLoading(false);
        return;
      }
      setHasPermission(true);
      const [stepsResult, heartRateResult, sleepResult] = await Promise.all([
        getSteps(),
        getHeartRate(),
        getSleepSessions()
      ]);
      setHealthData({
        steps: sumSteps(stepsResult),
        heartRate: avgHeartRate(heartRateResult),
        sleep: formatSleep(sleepResult),
      });
      setHealthError(null);
    } catch {
      setHealthError('Erro ao buscar dados de saúde.');
      setHealthData({ steps: null, heartRate: null, sleep: null });
    }
    setLoading(false);
  }

  // Helpers para cálculo dos dados
  function sumSteps(result: any) {
    if (result?.records?.length) return result.records.reduce((acc: number, r: any) => acc + (r.count || 0), 0);
    return null;
  }
  function avgHeartRate(result: any) {
    if (result?.records?.length) {
      const total = result.records.reduce((acc: number, r: any) => acc + (r.beatsPerMinute || r.bpm || 0), 0);
      return Math.round(total / result.records.length);
    }
    return null;
  }
  function formatSleep(result: any) {
    if (result?.records?.length) {
      const totalMs = result.records.reduce((acc: number, r: any) => acc + (new Date(r.endTime).getTime() - new Date(r.startTime).getTime()), 0);
      const h = Math.floor(totalMs / (1000 * 60 * 60));
      const m = Math.floor((totalMs % (1000 * 60 * 60)) / (1000 * 60));
      return `${h}h ${m}m`;
    }
    return null;
  }

  // Botão para abrir o app Health Connect
  function openHealthConnectApp() {
    Linking.openURL('https://play.google.com/store/apps/details?id=com.google.android.apps.healthdata');
  }

  // Renderização
  return (
    <View style={styles.section}>
      <View style={styles.card}>
        {/* Header com logo e título */}
        <View style={styles.cardHeader}>
          <Image
            source={require('../../assets/images/logo_Health_Connect.png')}
            style={styles.logo}
            accessibilityLabel="Health Connect"
          />
          <Text style={styles.title}>Dados de Saúde</Text>
        </View>
        {/* Caso sem permissão */}
        {hasPermission === false ? (
          <View style={styles.permissionBox}>
            <Ionicons name="lock-closed" size={22} color={colors.primary} style={{ marginRight: 6 }} />
            <View style={{ flex: 1 }}>
              <Text style={styles.permissionText}>
                Para visualizar seus dados, conceda permissão ao app pelo Health Connect.
                {'\n'}
                <Text style={{ color: colors.primary }}>
                  Depois de permitir, volte para este app e toque em <Text style={{ fontWeight: 'bold' }}>"Tentar novamente"</Text>.
                </Text>
              </Text>
              <View style={styles.buttonRowPermission}>
                <TouchableOpacity style={styles.openButton} onPress={openHealthConnectApp}>
                  <Ionicons name="open-outline" size={18} color="#fff" style={{ marginRight: 5 }} />
                  <Text style={styles.openButtonText}>Abrir Health Connect</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.tryAgainButton} onPress={handleSync} disabled={loading}>
                  <Ionicons name="refresh" size={18} color={colors.primary} style={{ marginRight: 5 }} />
                  <Text style={styles.tryAgainButtonText}>Tentar novamente</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ) : (
          <>
            {/* Métricas */}
            <View style={styles.metricsRow}>
              <Metric
                icon="walk"
                value={healthData.steps !== null && healthData.steps > 0 ? healthData.steps.toLocaleString() : '—'}
                label="Passos"
              />
              <Metric
                icon="heart"
                value={healthData.heartRate !== null ? `${healthData.heartRate} bpm` : '—'}
                label="Batimentos"
              />
              <Metric
                icon="moon"
                value={healthData.sleep || '—'}
                label="Sono"
              />
            </View>
            {/* Loading/Error */}
            {loading ? (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="small" color={colors.primary} />
                <Text style={styles.loadingText}>Sincronizando...</Text>
              </View>
            ) : healthError && permissionChecked ? (
              <Text style={styles.errorText}>{healthError}</Text>
            ) : null}
            {/* Botão de sincronizar */}
            <TouchableOpacity
              style={styles.syncButton}
              onPress={handleSync}
              disabled={loading}
            >
              <Ionicons name="refresh" size={20} color="#fff" style={{ marginRight: 6 }} />
              <Text style={styles.syncButtonText}>
                {loading ? 'Sincronizando...' : 'Sincronizar Dados'}
              </Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );
}

// Componente para exibir uma métrica (ícone, valor e label)
function Metric({ icon, value, label }: { icon: any, value: string, label: string }) {
  return (
    <View style={styles.metric}>
      <Ionicons name={icon} size={30} color={colors.primary} style={{ marginBottom: 4 }} />
      <Text style={styles.metricValue}>{value}</Text>
      <Text style={styles.metricLabel}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    marginTop: 32,
    paddingHorizontal: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 20,
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 16,
    elevation: 4,
    padding: 22,
    marginBottom: 12,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    gap: 10,
  },
  logo: {
    width: 32,
    height: 32,
    borderRadius: 7,
    backgroundColor: '#fff'
  },
  title: {
    fontSize: 21,
    fontFamily: 'Poppins-Bold',
    color: 'black',
    letterSpacing: 0.5,
  },
  metricsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 14,
    marginTop: 5,
  },
  metric: {
    alignItems: 'center',
    flex: 1,
  },
  metricValue: {
    fontSize: 23,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 2,
  },
  metricLabel: {
    fontSize: 13,
    color: colors.text,
    opacity: 0.7,
  },
  loadingContainer: {
    alignItems: 'center',
    marginVertical: 6,
  },
  loadingText: {
    color: colors.primary,
    marginTop: 4,
    fontSize: 13,
  },
  errorText: {
    color: '#c62828',
    fontSize: 13,
    marginTop: 4,
    textAlign: 'center',
    fontFamily: 'Poppins-Regular',
  },
  syncButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary,
    borderRadius: 18,
    paddingVertical: 9,
    paddingHorizontal: 18,
    marginTop: 8,
    alignSelf: 'center'
  },
  syncButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  permissionBox: {
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 10,
    marginBottom: 10,
    marginTop: 10,
    borderColor: colors.primary,
    borderWidth: 1,
    gap: 8,
  },
  permissionText: {
    color: colors.text,
    fontSize: 14,
    marginBottom: 5,
    fontFamily: 'Poppins-Regular',
  },
  buttonRowPermission: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 12,
    marginTop: 10,
  },
  openButton: {
    flexDirection: 'row',
    backgroundColor: colors.primary,
    borderRadius: 16,
    alignItems: 'center',
    paddingVertical: 7,
    paddingHorizontal: 14,
    marginBottom: 6,
    alignSelf: 'auto',
    minWidth: 150,
    justifyContent: 'center',
  },
  openButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  tryAgainButton: {
    flexDirection: 'row',
    backgroundColor: '#f1f5f9',
    borderRadius: 16,
    alignItems: 'center',
    paddingVertical: 7,
    paddingHorizontal: 14,
    marginBottom: 6,
    borderWidth: 1,
    borderColor: colors.primary,
    minWidth: 150,
    justifyContent: 'center',
  },
  tryAgainButtonText: {
    color: colors.primary,
    fontWeight: 'bold',
    fontSize: 14,
  },
});
