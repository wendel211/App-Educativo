import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking, Alert } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { colors } from '../../styles/colors';
import { diseaseModules } from '../../data/diseaseModules';

interface RouteParams {
  diseaseId: string;
  moduleIndex: number;
}

const DiseaseModuleScreen: React.FC = () => {
  const route = useRoute();
  const { diseaseId, moduleIndex } = route.params as RouteParams;
  const module = diseaseModules[diseaseId]?.modules[moduleIndex];

  if (!module) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Conteúdo não encontrado.</Text>
      </View>
    );
  }

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
});

export default DiseaseModuleScreen;
