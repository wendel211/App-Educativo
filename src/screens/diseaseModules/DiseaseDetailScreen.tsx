import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Platform,
  StatusBar,
  ActivityIndicator
} from 'react-native';
import { useRoute, useNavigation, useFocusEffect } from '@react-navigation/native';
import { colors } from '../../styles/colors';
import { diseaseModules } from '../../data/diseaseModules';
import { getUserProgress } from '../../services/progressService';
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
    navigation.navigate('DiseaseModuleScreen', { diseaseId, moduleIndex: index });
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <StatusBar backgroundColor={colors.primary} barStyle="light-content" />
        <View style={styles.centeredContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={styles.loadingText}>Carregando progresso...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (!disease) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <StatusBar backgroundColor={colors.primary} barStyle="light-content" />
        <View style={styles.centeredContainer}>
          <Text style={styles.loadingText}>Doença não encontrada.</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor={colors.primary} barStyle="light-content" />
      {/* HEADER BONITO */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton} accessibilityRole="button" accessibilityLabel="Voltar">
          <Ionicons name="arrow-back" size={26} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{disease.name}</Text>
      </View>

      {/* DESCRIÇÃO DA DOENÇA */}
      <View style={styles.introBox}>
        <Text style={styles.introText}>{disease.description}</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionTitle}>Módulos Educativos</Text>

        {disease.modules.map((mod, index) => {
          const unlocked = isModuleUnlocked(index);
          const completed = completedModules.includes(index);

          return (
            <View key={index} style={[
              styles.moduleCard,
              completed && styles.moduleCardCompleted,
              !unlocked && styles.moduleCardLocked,
            ]}>
              <View style={styles.moduleHeader}>
                <Text style={styles.moduleTitle}>{mod.title}</Text>
                {completed && (
                  <View style={styles.statusBadge}>
                    <Ionicons name="checkmark-circle" size={18} color={colors.primary} />
                    <Text style={styles.statusBadgeText}>Concluído</Text>
                  </View>
                )}
              </View>
              <Text style={styles.moduleDescription}>{mod.description}</Text>
              {unlocked ? (
                <TouchableOpacity
                  style={[styles.moduleButton, completed && styles.moduleButtonCompleted]}
                  onPress={() => handleModulePress(index)}
                  activeOpacity={0.8}
                  accessibilityRole="button"
                  accessibilityLabel={completed ? "Revisar módulo" : "Iniciar módulo"}
                >
                  <Text style={styles.buttonText}>
                    {completed ? 'Revisar Módulo' : 'Iniciar Módulo'}
                  </Text>
                  <Ionicons name="chevron-forward" size={18} color="#fff" style={{ marginLeft: 6 }} />
                </TouchableOpacity>
              ) : (
                <View style={styles.lockedBox}>
                  <Ionicons name="lock-closed" size={18} color="#999" style={{ marginRight: 5 }} />
                  <Text style={styles.lockedText}>Bloqueado — Conclua o anterior</Text>
                </View>
              )}
            </View>
          );
        })}
        <View style={{ height: 30 }} />
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
    backgroundColor: colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'ios' ? 52 : 36,
    paddingBottom: 18,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 3 },
    elevation: 4,
  },
  backButton: {
    marginRight: 10,
    padding: 6,
    backgroundColor: 'rgba(255,255,255,0.13)',
    borderRadius: 30,
  },
  headerTitle: {
    fontSize: 22,
    fontFamily: 'Poppins-Bold',
    color: '#fff',
    flex: 1,
    textAlign: 'left',
    marginLeft: 2,
  },
  introBox: {
    marginTop: 18,
    marginHorizontal: 24,
    backgroundColor: '#FFF8E1',
    borderRadius: 12,
    padding: 14,
    borderLeftWidth: 5,
    borderLeftColor: colors.primary,
    marginBottom: 8,
    elevation: 2,
  },
  introText: {
    color: colors.text,
    fontFamily: 'Poppins-Regular',
    fontSize: 15,
    lineHeight: 22,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  sectionTitle: {
    fontSize: 19,
    color: colors.text,
    fontFamily: 'Poppins-Bold',
    marginTop: 18,
    marginBottom: 16,
    marginLeft: 2,
  },
  moduleCard: {
    backgroundColor: '#fff',
    padding: 18,
    marginBottom: 18,
    borderRadius: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.10,
    shadowRadius: 8,
    elevation: 3,
    borderLeftWidth: 4,
    borderLeftColor: colors.primary,
    opacity: 1,
  },
  moduleCardLocked: {
    borderLeftColor: '#999',
    opacity: 0.72,
  },
  moduleCardCompleted: {
    backgroundColor: '#e7fbe5',
    borderLeftColor: colors.success || '#49b870',
  },
  moduleHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 7,
    justifyContent: 'space-between',
  },
  moduleTitle: {
    fontSize: 16.5,
    fontFamily: 'Poppins-Bold',
    color: colors.text,
    flex: 1,
    marginRight: 10,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e7fbe5',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
    marginLeft: 6,
  },
  statusBadgeText: {
    color: colors.success || '#49b870',
    fontFamily: 'Poppins-Medium',
    fontSize: 13,
    marginLeft: 3,
  },
  moduleDescription: {
    fontSize: 14,
    color: colors.secondary,
    fontFamily: 'Poppins-Regular',
    marginBottom: 10,
  },
  moduleButton: {
    backgroundColor: colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 8,
    marginTop: 6,
    shadowColor: colors.primary,
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  moduleButtonCompleted: {
    backgroundColor: colors.success || '#49b870',
  },
  buttonText: {
    color: '#fff',
    fontFamily: 'Poppins-Bold',
    fontSize: 15.5,
  },
  lockedBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 9,
    backgroundColor: '#f5f5f5',
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 5,
    alignSelf: 'flex-start',
  },
  lockedText: {
    color: '#999',
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
  },
  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: colors.background,
  },
  loadingText: {
    fontSize: 17,
    fontFamily: 'Poppins-Regular',
    color: colors.text,
    marginTop: 14,
    textAlign: 'center',
  },
});

export default DiseaseDetailScreen;
