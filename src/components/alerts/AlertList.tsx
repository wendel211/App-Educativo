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
        <View style={styles.card}>
          <Text style={styles.emptyText}>Nenhum alerta cadastrado.</Text>
        </View>
      ) : (
        alerts.map((alert: any) => (
          <View key={alert.id} style={styles.card}>
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
                <Ionicons name="trash" size={24} color={colors.primary} />
              </TouchableOpacity>
            </View>
          </View>
        ))
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    marginTop: 32,
    paddingHorizontal: 8,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 21,
    fontFamily: 'Poppins-Bold',
    color: colors.primary,
    letterSpacing: 0.5,
  },
  addButton: {
    padding: 4,
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
  alertContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  alertTitle: {
    fontSize: 18,
    fontFamily: 'Poppins-Bold',
    color: colors.text,
    marginBottom: 4,
  },
  alertSubtitle: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: colors.text,
    opacity: 0.7,
  },
  emptyText: {
    fontSize: 16,
    color: colors.text,
    fontFamily: 'Poppins-Regular',
    textAlign: 'center',
    opacity: 0.7,
  }
});