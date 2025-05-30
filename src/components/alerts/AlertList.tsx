import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../styles/colors';

export default function AlertList({ alerts, onAdd, onDelete }: any) {
  return (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Meus Alertas</Text>
        <TouchableOpacity style={styles.addButton} onPress={onAdd}>
          <Ionicons name="add-circle" size={28} color={colors.primary} />
        </TouchableOpacity>
      </View>
      {alerts.length === 0 ? (
        <Text style={styles.emptyText}>Nenhum alerta cadastrado.</Text>
      ) : (
        alerts.map((alert: any) => (
          <View key={alert.id} style={styles.alertCard}>
            <View style={styles.alertContent}>
              <View style={{ flex: 1 }}>
                <Text style={styles.alertTitle}>{alert.title}</Text>
                <Text style={styles.alertSubtitle}>
                  {alert.repeat === 'daily'
                    ? `Todos os dias às ${alert.time}`
                    : alert.repeat === 'once'
                      ? `Em ${alert.date} às ${alert.time}`
                      : `Às ${alert.time} nos dias ${alert.daysOfWeek?.join(', ') || 'N/A'}`}
                </Text>
              </View>
              <TouchableOpacity onPress={() => onDelete(alert.id)}>
                <Ionicons name="trash" size={24} color="#1F8E8A" />
              </TouchableOpacity>
            </View>
          </View>
        ))
      )}
    </View>
  );
}

// Reuse seus estilos (exemplo)
const styles = StyleSheet.create({
  section: { marginTop: 24, paddingHorizontal: 24 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  sectionTitle: { fontSize: 20, fontFamily: 'Poppins-Bold', color: colors.text, marginBottom: 8 },
  addButton: { padding: 4 },
  alertCard: { backgroundColor: '#fff', padding: 12, borderRadius: 12, elevation: 2, marginBottom: 8 },
  alertContent: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  alertTitle: { fontSize: 16, fontFamily: 'Poppins-Bold', color: colors.text },
  alertSubtitle: { fontSize: 14, fontFamily: 'Poppins-Regular', color: colors.text },
  emptyText: { fontSize: 14, color: colors.text, fontFamily: 'Poppins-Regular' }
});
