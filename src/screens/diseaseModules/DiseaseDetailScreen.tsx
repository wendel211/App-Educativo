import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRoute, useNavigation, useFocusEffect } from '@react-navigation/native';
import { colors } from '../../styles/colors';
import { diseaseModules } from '../../data/diseaseModules';
import { getUserProgress } from '../../services/progressService';
import { useCallback } from 'react';

interface RouteParams {
  diseaseId: string;
}

const DiseaseDetailScreen: React.FC = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { diseaseId } = route.params as RouteParams;

  const disease = diseaseModules[diseaseId];
  const [completedModules, setCompletedModules] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      const fetchProgress = async () => {
        try {
          const progress = await getUserProgress(diseaseId);
          setCompletedModules(progress.completedModules || []);
        } catch (err) {
          console.error('Erro ao carregar progresso:', err);
          setCompletedModules([]);
        } finally {
          setLoading(false);
        }
      };
      fetchProgress();
    }, [diseaseId])
  );

  const isModuleUnlocked = (index: number): boolean => {
    if (index === 0) return true;
    return completedModules.includes(index - 1);
  };

  const handleModulePress = (index: number) => {
    if (!isModuleUnlocked(index)) return;

    navigation.navigate('DiseaseModuleScreen', {
      diseaseId,
      moduleIndex: index
    });
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Carregando progresso...</Text>
      </View>
    );
  }

  if (!disease) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Doença não encontrada.</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Módulo Educacional: {disease.name}</Text>

      {disease.modules.map((mod, index) => (
        <View key={index} style={styles.moduleCard}>
          <Text style={styles.moduleTitle}>{mod.title}</Text>

          {isModuleUnlocked(index) ? (
            <TouchableOpacity
              style={styles.moduleButton}
              onPress={() => handleModulePress(index)}
            >
              <Text style={styles.buttonText}>
                {completedModules.includes(index) ? 'Concluído ✓' : 'Iniciar Módulo'}
              </Text>
            </TouchableOpacity>
          ) : (
            <Text style={styles.lockedText}>Bloqueado - Complete o módulo anterior</Text>
          )}
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#F7F7F7',
  },
  title: {
    fontSize: 24,
    fontFamily: 'Poppins-Bold',
    color: colors.text,
    marginBottom: 20,
    textAlign: 'center',
  },
  moduleCard: {
    backgroundColor: '#fff',
    padding: 20,
    marginBottom: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  moduleTitle: {
    fontSize: 18,
    fontFamily: 'Poppins-Bold',
    color: colors.text,
    marginBottom: 10,
  },
  moduleButton: {
    backgroundColor: colors.primary,
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontFamily: 'Poppins-Bold',
  },
  lockedText: {
    color: '#999',
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
  },
});

export default DiseaseDetailScreen;
