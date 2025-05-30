import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../styles/colors';

export default function IndicatorList({ indicators, onAdd, onShowHistory, onDelete }: any) {
  return (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Meus Indicadores</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TouchableOpacity style={{ marginRight: 12 }} onPress={onShowHistory}>
            <Ionicons name="list" size={24} color={colors.primary} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.addButton} onPress={onAdd}>
            <Ionicons name="add-circle" size={28} color={colors.primary} />
          </TouchableOpacity>
        </View>
      </View>
      {indicators.length === 0 ? (
        <Text style={styles.emptyText}>Nenhum indicador registrado.</Text>
      ) : (
        indicators.map((item: any) => (
          <View key={item.id} style={styles.alertCard}>
            <View style={styles.alertContent}>
              <View style={{ flex: 1 }}>
                <Text style={styles.alertTitle}>Data: {item.date}</Text>
                <Text style={styles.alertSubtitle}>Glicemia: {item.glucose} mg/dL</Text>
                <Text style={styles.alertSubtitle}>Batimentos: {item.heartRate} bpm</Text>
                <Text style={styles.alertSubtitle}>Peso: {item.weight} kg</Text>
              </View>
              <TouchableOpacity onPress={() => onDelete(item.id)}>
                <Ionicons name="trash" size={24} color="#1F8E8A" />
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
    marginTop: 20,
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
  alertCard: {
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
    marginBottom: 2,
  },
  emptyText: {
    fontSize: 16,
    color: colors.text,
    fontFamily: 'Poppins-Regular',
    textAlign: 'center',
    opacity: 0.7,
    backgroundColor: '#fff',
    borderRadius: 20,
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 16,
    elevation: 4,
    padding: 22,
    marginBottom: 12,
  }
});