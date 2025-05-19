import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, Platform } from 'react-native';
import { useRoute, useNavigation, useFocusEffect } from '@react-navigation/native';
import { colors } from '../../styles/colors';
import { diseaseModules } from '../../data/diseaseModules';
import { getUserProgress } from '../../services/progressService';
import { useCallback } from 'react';
import { Ionicons } from '@expo/vector-icons';

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
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.centeredContainer}>
          <Text style={styles.title}>Carregando progresso...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (!disease) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.centeredContainer}>
          <Text style={styles.title}>Doença não encontrada.</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{disease.name}</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>

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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingTop: Platform.OS === 'android' ? 40 : 20,
    paddingBottom: 10,
    backgroundColor: colors.background,
  },
  backButton: {
    marginRight: 10,
    padding: 6,
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: 'Poppins-Bold',
    color: colors.text,
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: colors.background,
  },
  title: {
    fontSize: 22,
    fontFamily: 'Poppins-Bold',
    color: colors.text,
    marginBottom: 20,
    textAlign: 'center',
  },
  moduleCard: {
    backgroundColor: '#fff',
    padding: 20,
    marginBottom: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  moduleTitle: {
    fontSize: 18,
    fontFamily: 'Poppins-Bold',
    color: colors.text,
    marginBottom: 12,
  },
  moduleButton: {
    backgroundColor: colors.primary,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
  },
  lockedText: {
    color: '#999',
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
  },
});

export default DiseaseDetailScreen;
