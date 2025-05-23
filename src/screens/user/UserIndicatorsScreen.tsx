import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform } from 'react-native';
import { colors } from '../../styles/colors';
import { Ionicons } from '@expo/vector-icons';
import AddAlertModal from '../../components/alerts/AddAlertModal';
import { getUserAlerts, deleteAlert } from '../../services/alertService';
import { getRecentIndicators, deleteIndicator } from '../../services/indicatorService';
import AddIndicatorModal from '../../components/health/AddIndicatorModal';
import { useNavigation } from '@react-navigation/native';

export const UserIndicatorsScreen: React.FC = () => {
  const navigation = useNavigation();
  const [showAddAlertModal, setShowAddAlertModal] = useState(false);
  const [showAddIndicatorModal, setShowAddIndicatorModal] = useState(false);
  const [alerts, setAlerts] = useState<any[]>([]);
  const [indicators, setIndicators] = useState<any[]>([]);

  const loadAlerts = async () => {
    const data = await getUserAlerts();
    setAlerts(data);
  };

  const loadIndicators = async () => {
    const data = await getRecentIndicators();
    setIndicators(data);
  };

  const handleDeleteAlert = async (alertId: string) => {
    await deleteAlert(alertId);
    loadAlerts();
  };

  const handleDeleteIndicator = async (indicatorId: string) => {
    await deleteIndicator(indicatorId);
    loadIndicators();
  };

  useEffect(() => {
    loadAlerts();
    loadIndicators();
  }, []);

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Meus Alertas & Saúde</Text>
        <Text style={styles.headerSubtitle}>Gerencie seus lembretes e dados de saúde</Text>
      </View>

      {/* Dados de Saúde Simulados */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Dados de Saúde</Text>
        <View style={styles.cardContainer}>
          <View style={styles.dataCard}>
            <Ionicons name="walk" size={32} color={colors.primary} />
            <Text style={styles.dataValue}>5.432</Text>
            <Text style={styles.dataLabel}>Passos</Text>
          </View>
          <View style={styles.dataCard}>
            <Ionicons name="heart" size={32} color={colors.primary} />
            <Text style={styles.dataValue}>76 bpm</Text>
            <Text style={styles.dataLabel}>Batimentos</Text>
          </View>
          <View style={styles.dataCard}>
            <Ionicons name="moon" size={32} color={colors.primary} />
            <Text style={styles.dataValue}>7h 15m</Text>
            <Text style={styles.dataLabel}>Sono</Text>
          </View>
        </View>
      </View>

      {/* Seção de Alertas */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Meus Alertas</Text>
          <TouchableOpacity style={styles.addButton} onPress={() => setShowAddAlertModal(true)}>
            <Ionicons name="add-circle" size={28} color={colors.primary} />
          </TouchableOpacity>
        </View>
        {alerts.length === 0 ? (
          <Text style={styles.emptyText}>Nenhum alerta cadastrado.</Text>
        ) : (
          alerts.map(alert => (
            <View key={alert.id} style={styles.alertCard}>
              <View style={styles.alertContent}>
                <View>
                  <Text style={styles.alertTitle}>{alert.title}</Text>
                  <Text style={styles.alertSubtitle}>
                    {alert.repeat === 'daily'
                      ? `Todos os dias às ${alert.time}`
                      : alert.repeat === 'once'
                      ? `Em ${alert.date} às ${alert.time}`
                      : `Às ${alert.time} nos dias ${alert.daysOfWeek.join(', ')}`}
                  </Text>
                </View>
                <TouchableOpacity onPress={() => handleDeleteAlert(alert.id)}>
                  <Ionicons name="trash" size={24} color="#1F8E8A" />
                </TouchableOpacity>
              </View>
            </View>
          ))
        )}
      </View>

      {/* Seção de Indicadores */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Meus Indicadores</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TouchableOpacity style={{ marginRight: 12 }} onPress={() => navigation.navigate('IndicatorHistoryScreen')}>
              <Ionicons name="list" size={24} color={colors.primary} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.addButton} onPress={() => setShowAddIndicatorModal(true)}>
              <Ionicons name="add-circle" size={28} color={colors.primary} />
            </TouchableOpacity>
          </View>
        </View>
        {indicators.length === 0 ? (
          <Text style={styles.emptyText}>Nenhum indicador registrado.</Text>
        ) : (
          indicators.map((item) => (
            <View key={item.id} style={styles.alertCard}>
              <View style={styles.alertContent}>
                <View>
                  <Text style={styles.alertTitle}>Data: {item.date}</Text>
                  <Text style={styles.alertSubtitle}>Glicemia: {item.glucose} mg/dL</Text>
                  <Text style={styles.alertSubtitle}>Batimentos: {item.heartRate} bpm</Text>
                  <Text style={styles.alertSubtitle}>Peso: {item.weight} kg</Text>
                </View>
                <TouchableOpacity onPress={() => handleDeleteIndicator(item.id)}>
                  <Ionicons name="trash" size={24} color="#1F8E8A" />
                </TouchableOpacity>
              </View>
            </View>
          ))
        )}
      </View>

      {/* Modais */}
      <AddAlertModal 
        visible={showAddAlertModal} 
        onClose={() => setShowAddAlertModal(false)} 
        onSaved={loadAlerts}
      />
      <AddIndicatorModal
        visible={showAddIndicatorModal}
        onClose={() => setShowAddIndicatorModal(false)}
        onSaved={loadIndicators}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, padding: 0 },
  header: {
    justifyContent: 'center',
    backgroundColor: colors.primary,
    paddingHorizontal: 24,
    paddingTop: Platform.OS === 'ios' ? 50 : 40,
    paddingBottom: 24,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 5 },
  },
  headerTitle: { fontSize: 24, fontFamily: 'Poppins-Bold', color: '#fff', marginBottom: 4 },
  headerSubtitle: { fontSize: 14, fontFamily: 'Poppins-Regular', color: '#fff' },
  section: { marginTop: 24, paddingHorizontal: 24 },
  sectionTitle: { fontSize: 20, fontFamily: 'Poppins-Bold', color: colors.text, marginBottom: 8 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  addButton: { padding: 4 },
  cardContainer: { flexDirection: 'row', justifyContent: 'space-between' },
  dataCard: { width: '30%', backgroundColor: '#fff', borderRadius: 12, padding: 12, alignItems: 'center', elevation: 3 },
  dataValue: { fontSize: 18, fontFamily: 'Poppins-Bold', color: colors.text, marginTop: 6 },
  dataLabel: { fontSize: 14, color: colors.text, fontFamily: 'Poppins-Regular' },
  alertCard: { backgroundColor: '#fff', padding: 12, borderRadius: 12, elevation: 2, marginBottom: 8 },
  alertContent: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  alertTitle: { fontSize: 16, fontFamily: 'Poppins-Bold', color: colors.text },
  alertSubtitle: { fontSize: 14, fontFamily: 'Poppins-Regular', color: colors.text },
  emptyText: { fontSize: 14, color: colors.text, fontFamily: 'Poppins-Regular' }
});

export default UserIndicatorsScreen;
