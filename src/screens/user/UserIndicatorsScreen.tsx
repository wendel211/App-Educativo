import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Platform } from 'react-native';
import { colors } from '../../styles/colors';
import { Ionicons } from '@expo/vector-icons';
import AddAlertModal from '../../components/alerts/AddAlertModal';
import { getUserAlerts, deleteAlert } from '../../services/alertService';

export const UserIndicatorsScreen: React.FC = () => {
  const [showAddAlertModal, setShowAddAlertModal] = useState(false);
  const [alerts, setAlerts] = useState<any[]>([]);

  const loadAlerts = async () => {
    const data = await getUserAlerts();
    setAlerts(data);
  };

  const handleDeleteAlert = async (alertId: string) => {
    try {
      await deleteAlert(alertId);
      loadAlerts();
    } catch (error) {
      console.error('Erro ao deletar alerta:', error);
    }
  };

  useEffect(() => {
    loadAlerts();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Meus Alertas & Saúde</Text>
        <Text style={styles.headerSubtitle}>Gerencie seus lembretes e dados de saúde</Text>
      </View>

      {/* Seção de Dados de Saúde */}
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
          <Text style={{ fontSize: 14, color: colors.text, fontFamily: 'Poppins-Regular' }}>
            Nenhum alerta cadastrado.
          </Text>
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

      {/* Seção de Registro Manual */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Registrar Indicadores</Text>
          <TouchableOpacity style={styles.addButton}>
            <Ionicons name="add-circle" size={28} color={colors.primary} />
          </TouchableOpacity>
        </View>
        <Text style={styles.recordHint}>Registre seu peso, glicemia e batimentos de hoje.</Text>
      </View>

      <AddAlertModal 
        visible={showAddAlertModal} 
        onClose={() => setShowAddAlertModal(false)} 
        onSaved={loadAlerts}
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
  recordHint: { fontSize: 14, color: colors.text, fontFamily: 'Poppins-Regular' }
});

export default UserIndicatorsScreen;
