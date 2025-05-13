import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { colors } from '../../styles/colors';
import { diseaseModules } from '../../data/diseaseModules';

interface RouteParams {
  diseaseId: string;
}

const DiseaseDetailScreen: React.FC = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { diseaseId } = route.params as RouteParams;

  const disease = diseaseModules[diseaseId];
  const [unlockedModules, setUnlockedModules] = useState<number[]>([0]);
  const [completedModules, setCompletedModules] = useState<number[]>([]);

  const handleModulePress = (index: number) => {
    if (!unlockedModules.includes(index)) return;

    navigation.navigate('DiseaseModuleScreen', {
      diseaseId,
      moduleIndex: index
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Módulo Educacional: {disease?.name}</Text>

      {disease?.modules.map((mod, index) => (
        <View key={index} style={styles.moduleCard}>
          <Text style={styles.moduleTitle}>{mod.title}</Text>

          {unlockedModules.includes(index) ? (
            <TouchableOpacity
              style={styles.moduleButton}
              onPress={() => handleModulePress(index)}
            >
              <Text style={styles.buttonText}>Iniciar Módulo</Text>
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
