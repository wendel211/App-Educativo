import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking, Alert } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { colors } from '../../styles/colors';
import { diseaseModules } from '../../data/diseaseModules';
import { useModuleProgress } from '../../hooks/useModuleProgress';

interface RouteParams {
  diseaseId: string;
  moduleIndex: number;
}

const DiseaseModuleScreen: React.FC = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { diseaseId, moduleIndex } = route.params as RouteParams;
  const module = diseaseModules[diseaseId]?.modules[moduleIndex];

  const { isCompleted, markAsCompleted } = useModuleProgress();

  if (!module) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Conteúdo não encontrado.</Text>
      </View>
    );
  }

  const handleComplete = async () => {
    try {
      await markAsCompleted(diseaseId, moduleIndex);
      Alert.alert('Parabéns!', 'Você concluiu este módulo e desbloqueou o próximo.', [
        {
          text: 'OK',
          onPress: () => navigation.goBack(),
        },
      ]);
    } catch (err) {
      Alert.alert('Erro', 'Não foi possível salvar o progresso.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{module.title}</Text>

      {module.type === 'learn' && (
        <>
          <Text style={styles.content}>{module.content}</Text>
          {module.videoUrl && (
            <TouchableOpacity onPress={() => Linking.openURL(module.videoUrl)}>
              <Text style={styles.link}>📺 Assistir vídeo</Text>
            </TouchableOpacity>
          )}
          {module.references?.length > 0 && (
            <View style={styles.referencesSection}>
              <Text style={styles.sectionTitle}>Referências:</Text>
              {module.references.map((ref, index) => (
                <TouchableOpacity key={index} onPress={() => Linking.openURL(ref)}>
                  <Text style={styles.link}>• {ref}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
          {!isCompleted(diseaseId, moduleIndex) && (
            <TouchableOpacity style={styles.completeButton} onPress={handleComplete}>
              <Text style={styles.buttonText}>Marcar como concluído</Text>
            </TouchableOpacity>
          )}
        </>
      )}

      {module.type === 'quiz' && module.questions?.map((q, qi) => (
        <View key={qi} style={styles.questionContainer}>
          <Text style={styles.questionText}>{q.question}</Text>
          {q.options.map((option, oi) => (
            <TouchableOpacity
              key={oi}
              style={styles.optionButton}
              onPress={() => {
                if (option === q.correctAnswer) {
                  handleComplete();
                  Alert.alert('Correto!', 'Você respondeu corretamente.');
                } else {
                  Alert.alert('Incorreto', 'Tente novamente.');
                }
              }}
            >
              <Text style={styles.optionText}>{option}</Text>
            </TouchableOpacity>
          ))}
        </View>
      ))}

      {module.type === 'habits' && module.checklist?.map((habit, hi) => (
        <View key={hi} style={styles.habitItem}>
          <Text style={styles.habitText}>✓ {habit}</Text>
        </View>
      ))}

      {module.type === 'habits' && !isCompleted(diseaseId, moduleIndex) && (
        <TouchableOpacity style={styles.completeButton} onPress={handleComplete}>
          <Text style={styles.buttonText}>Marcar como concluído</Text>
        </TouchableOpacity>
      )}

      {isCompleted(diseaseId, moduleIndex) && (
        <Text style={styles.completedText}>✓ Módulo Concluído</Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#F7F7F7',
  },
  title: {
    fontSize: 22,
    fontFamily: 'Poppins-Bold',
    color: colors.text,
    marginBottom: 20,
  },
  content: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: colors.text,
    marginBottom: 15,
  },
  link: {
    color: colors.primary,
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    marginBottom: 10,
  },
  referencesSection: {
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: 'Poppins-Bold',
    marginBottom: 5,
    color: colors.text,
  },
  questionContainer: {
    marginBottom: 20,
  },
  questionText: {
    fontSize: 16,
    fontFamily: 'Poppins-Bold',
    marginBottom: 10,
    color: colors.text,
  },
  optionButton: {
    padding: 12,
    backgroundColor: '#eee',
    borderRadius: 8,
    marginBottom: 8,
  },
  optionText: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: colors.text,
  },
  habitItem: {
    padding: 10,
    backgroundColor: '#e6f5ec',
    borderRadius: 6,
    marginBottom: 8,
  },
  habitText: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: colors.text,
  },
  completeButton: {
    marginTop: 20,
    backgroundColor: colors.primary,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontFamily: 'Poppins-Bold',
  },
  completedText: {
    marginTop: 20,
    color: 'green',
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default DiseaseModuleScreen;
