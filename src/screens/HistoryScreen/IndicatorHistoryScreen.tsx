import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../styles/colors';
import { getAllIndicators, deleteIndicator } from '../../services/indicatorService';
import { useNavigation } from '@react-navigation/native';

const IndicatorHistoryScreen: React.FC = () => {
  const [indicators, setIndicators] = useState<any[]>([]);
  const navigation = useNavigation();

  const loadIndicators = async () => {
    const data = await getAllIndicators();
    setIndicators(data);
  };

  const handleDelete = async (id: string) => {
    await deleteIndicator(id);
    loadIndicators();
  };

  useEffect(() => {
    loadIndicators();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Histórico de Indicadores</Text>
        <Text style={styles.headerSubtitle}>Veja todos os seus registros de saúde</Text>
      </View>

      <View style={styles.section}>
        {indicators.length === 0 ? (
          <Text style={styles.emptyText}>Nenhum indicador registrado.</Text>
        ) : (
          indicators.map(item => (
            <View key={item.id} style={styles.card}>
              <View style={styles.cardContent}>
                <View>
                  <Text style={styles.cardTitle}>Data: {item.date}</Text>
                  <Text style={styles.cardSubtitle}>Glicemia: {item.glucose} mg/dL</Text>
                  <Text style={styles.cardSubtitle}>Batimentos: {item.heartRate} bpm</Text>
                  <Text style={styles.cardSubtitle}>Peso: {item.weight} kg</Text>
                </View>
                <TouchableOpacity onPress={() => handleDelete(item.id)}>
                  <Ionicons name="trash" size={24} color="#1F8E8A" />
                </TouchableOpacity>
              </View>
            </View>
          ))
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
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
  backButton: {
    position: 'absolute',
    left: 24,
    top: Platform.OS === 'ios' ? 50 : 40,
    padding: 4,
    zIndex: 10,
  },
  headerTitle: { fontSize: 24, fontFamily: 'Poppins-Bold', color: '#fff', marginBottom: 4, textAlign: 'center' },
  headerSubtitle: { fontSize: 14, fontFamily: 'Poppins-Regular', color: '#fff', textAlign: 'center' },
  section: { padding: 24 },
  card: { backgroundColor: '#fff', padding: 12, borderRadius: 12, elevation: 2, marginBottom: 8 },
  cardContent: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  cardTitle: { fontSize: 16, fontFamily: 'Poppins-Bold', color: colors.text },
  cardSubtitle: { fontSize: 14, fontFamily: 'Poppins-Regular', color: colors.text },
  emptyText: { fontSize: 14, color: colors.text, fontFamily: 'Poppins-Regular', textAlign: 'center', marginTop: 24 }
});

export default IndicatorHistoryScreen;
