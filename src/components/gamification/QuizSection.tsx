// src/components/gamification/QuizSection.tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors } from '../../styles/colors';

interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: string;
}

interface QuizSectionProps {
  questions: QuizQuestion[];
}

const QuizSection: React.FC<QuizSectionProps> = ({ questions }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Quiz</Text>
      {questions.map((q, index) => (
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
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  heading: {
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

export default QuizSection;
