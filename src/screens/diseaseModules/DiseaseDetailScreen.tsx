// src/screens/diseaseModules/DiseaseDetailScreen.tsx
import React from 'react';
import { ScrollView, Text, StyleSheet, View, TouchableOpacity } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { colors } from '../../styles/colors';

interface RouteParams {
  diseaseId: string;
}

const DiseaseDetailScreen: React.FC = () => {
  // Obtenha os parâmetros da rota
  const route = useRoute();
  const { diseaseId } = route.params as RouteParams;

  // Dados de exemplo – esses dados podem vir de uma API ou arquivo local
  const moduleData = {
    title: `Detalhes sobre ${diseaseId}`,
    progress: 0.7, // 70% de progresso
    content: `Aqui estão informações importantes sobre como lidar com ${diseaseId}.
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse potenti.
Praesent at ligula nec lacus ullamcorper dictum eu vitae libero.`,
    quizQuestions: [
      {
        question: 'Qual destas práticas é recomendada?',
        options: ['Prática A', 'Prática B', 'Prática C'],
        correctAnswer: 'Prática B',
      },
      {
        question: 'Qual o percentual ideal de controle?',
        options: ['70%', '80%', '90%'],
        correctAnswer: '80%',
      },
    ],
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Título do módulo */}
      <Text style={styles.title}>{moduleData.title}</Text>

      {/* Barra de Progresso */}
      <View style={styles.progressContainer}>
        <View style={[styles.progressBar, { width: `${moduleData.progress * 100}%` }]} />
      </View>

      {/* Seção de Conteúdo */}
      <View style={styles.contentSection}>
        <Text style={styles.contentText}>{moduleData.content}</Text>
      </View>

      {/* Seção de Quiz */}
      <View style={styles.quizSection}>
        <Text style={styles.quizHeading}>Quiz</Text>
        {moduleData.quizQuestions.map((q, index) => (
          <View key={index} style={styles.questionContainer}>
            <Text style={styles.questionText}>{q.question}</Text>
            {q.options.map((option, idx) => (
              <TouchableOpacity key={idx} style={styles.optionButton}>
                <Text style={styles.optionText}>{option}</Text>
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </View>
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
    marginBottom: 10,
  },
  progressContainer: {
    height: 10,
    backgroundColor: '#ddd',
    borderRadius: 5,
    marginBottom: 20,
  },
  progressBar: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: 5,
  },
  contentSection: {
    marginBottom: 20,
  },
  contentText: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    lineHeight: 24,
    color: colors.text,
  },
  quizSection: {
    marginBottom: 20,
  },
  quizHeading: {
    fontSize: 20,
    fontFamily: 'Poppins-Bold',
    color: colors.text,
    marginBottom: 10,
  },
  questionContainer: {
    marginBottom: 15,
  },
  questionText: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: colors.text,
    marginBottom: 8,
  },
  optionButton: {
    padding: 10,
    backgroundColor: '#eee',
    borderRadius: 8,
    marginBottom: 5,
  },
  optionText: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: colors.text,
  },
});

export default DiseaseDetailScreen;
