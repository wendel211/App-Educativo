// src/screens/education/TopicsScreen.tsx
import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  SafeAreaView,
  TouchableOpacity 
} from 'react-native';
import { Header } from '../../components/common/Header';
import { colors } from '../../styles/colors';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';

type TopicsScreenProps = BottomTabScreenProps<any, 'Topics'>;

const topicsData: Record<string, { id: string; title: string; duration: string; level: string }[]> = {
  '1': [
    { id: '1-1', title: 'O que é Diabetes?', duration: '5 min', level: 'Básico' },
    { id: '1-2', title: 'Tipos de Diabetes', duration: '8 min', level: 'Intermediário' },
    { id: '1-3', title: 'Controle Glicêmico', duration: '10 min', level: 'Avançado' },
  ],
  '2': [
    { id: '2-1', title: 'Anatomia do Coração', duration: '7 min', level: 'Básico' },
    { id: '2-2', title: 'Pressão Arterial', duration: '6 min', level: 'Intermediário' },
    { id: '2-3', title: 'Prevenção de Doenças Cardíacas', duration: '12 min', level: 'Avançado' },
  ],
  '3': [
    { id: '3-1', title: 'Benefícios do Exercício', duration: '5 min', level: 'Básico' },
    { id: '3-2', title: 'Exercícios Recomendados', duration: '8 min', level: 'Intermediário' },
    { id: '3-3', title: 'Monitoramento Durante Exercícios', duration: '10 min', level: 'Avançado' },
  ],
  '4': [
    { id: '4-1', title: 'Princípios da Boa Alimentação', duration: '6 min', level: 'Básico' },
    { id: '4-2', title: 'Dietas Específicas', duration: '9 min', level: 'Intermediário' },
    { id: '4-3', title: 'Planejamento de Refeições', duration: '11 min', level: 'Avançado' },
  ],
  '5': [
    { id: '5-1', title: 'Importância da Hidratação', duration: '5 min', level: 'Básico' },
    { id: '5-2', title: 'Quantidade Ideal de Água', duration: '7 min', level: 'Intermediário' },
    { id: '5-3', title: 'Impacto da Hidratação na Saúde', duration: '9 min', level: 'Avançado' },
  ],
  '6': [
    { id: '6-1', title: 'Sono e Saúde', duration: '6 min', level: 'Básico' },
    { id: '6-2', title: 'Dicas para Melhorar o Sono', duration: '8 min', level: 'Intermediário' },
    { id: '6-3', title: 'Relação entre Sono e Doenças Crônicas', duration: '10 min', level: 'Avançado' },
  ],
  '7': [
    { id: '7-1', title: 'Gestão do Estresse', duration: '5 min', level: 'Básico' },
    { id: '7-2', title: 'Técnicas de Relaxamento', duration: '8 min', level: 'Intermediário' },
    { id: '7-3', title: 'Impacto do Estresse na Saúde', duration: '10 min', level: 'Avançado' },
  ],
};

export const TopicsScreen: React.FC<TopicsScreenProps> = ({ navigation, route }) => {
  const category = route?.params?.category ?? '1'; 
  const title = route?.params?.title ?? 'Tópicos';

  const topics = topicsData[category] || [];

  return (
    <SafeAreaView style={styles.container}>
      <Header title={title} showBack onBackPress={() => navigation.goBack()} />
      <ScrollView style={styles.content}>
        <Text style={styles.description}>
          Explore os tópicos disponíveis e aprenda mais sobre {title.toLowerCase()}.
        </Text>
        <View style={styles.topicsList}>
          {topics.map((topic) => (
            <TouchableOpacity key={topic.id} style={styles.topicCard} onPress={() => {}}>
              <View style={styles.topicHeader}>
                <Text style={styles.topicTitle}>{topic.title}</Text>
                <Text style={styles.topicLevel}>{topic.level}</Text>
              </View>
              <View style={styles.topicFooter}>
                <Text style={styles.topicDuration}>Duração: {topic.duration}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  description: {
    fontSize: 16,
    color: '#666',
    marginBottom: 24,
    lineHeight: 22,
  },
  topicsList: {
    gap: 12,
  },
  topicCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  topicHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  topicTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    flex: 1,
  },
  topicLevel: {
    fontSize: 12,
    color: colors.primary,
    backgroundColor: `${colors.primary}20`,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  topicFooter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  topicDuration: {
    fontSize: 12,
    color: '#666',
  },
});
