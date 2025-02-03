// src/screens/home/HomeScreen.tsx
import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  SafeAreaView,
  ImageSourcePropType 
} from 'react-native';
import { Header } from '../../components/common/Header';
import { TopicCard } from '../../components/education/TopicCard';
import { colors } from '../../styles/colors';

interface TopicData {
  id: string;
  title: string;
  description: string;
  icon: ImageSourcePropType;
}

const topics: TopicData[] = [
  {
    id: '1',
    title: 'Diabetes',
    description: 'Aprenda sobre tipos de diabetes, controle glicêmico e hábitos saudáveis.',
    icon: require('../../assets/images/diabetes-icon.png'),
  },
  {
    id: '2',
    title: 'Saúde do Coração',
    description: 'Informações sobre prevenção e cuidados com doenças cardiovasculares.',
    icon: require('../../assets/images/heart-icon.png'),
  },
  {
    id: '3',
    title: 'Atividade Física',
    description: 'Exercícios recomendados e seus benefícios para sua condição.',
    icon: require('../../assets/images/exercise-icon.png'),
  },
  {
    id: '4',
    title: 'Alimentação Saudável',
    description: 'Dicas de nutrição e dietas específicas para cada condição.',
    icon: require('../../assets/images/nutrition-icon.png'),
  },
];

export const HomeScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const userName = "Usuário"; // Isso virá do contexto de autenticação depois

  const handleTopicPress = (topicId: string, title: string) => {
    navigation.navigate('Topics', { 
      category: topicId,
      title: title 
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header 
        title={`Olá, ${userName}`}
        rightComponent={
          <Text style={styles.logoutText} onPress={() => {}}>Sair</Text>
        }
      />
      
      <ScrollView style={styles.content}>
        <View style={styles.welcomeSection}>
          <Text style={styles.welcomeTitle}>
            Aprenda algo novo sobre sua saúde hoje!
          </Text>
          <Text style={styles.welcomeSubtitle}>
            Explore nossos tópicos educativos e cuide melhor da sua saúde
          </Text>
        </View>

        <View style={styles.topicsSection}>
          <Text style={styles.sectionTitle}>Tópicos Educativos</Text>
          {topics.map((topic) => (
            <TopicCard
              key={topic.id}
              title={topic.title}
              description={topic.description}
              icon={topic.icon}
              onPress={() => handleTopicPress(topic.id, topic.title)}
            />
          ))}
        </View>

        <View style={styles.quickAccessSection}>
          <Text style={styles.sectionTitle}>Acesso Rápido</Text>
          <View style={styles.quickAccessGrid}>
            {/* Aqui você pode adicionar botões de acesso rápido para
                funcionalidades importantes */}
          </View>
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
  welcomeSection: {
    marginBottom: 24,
  },
  welcomeTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 8,
  },
  welcomeSubtitle: {
    fontSize: 16,
    color: '#666',
    lineHeight: 22,
  },
  topicsSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 16,
  },
  quickAccessSection: {
    marginBottom: 24,
  },
  quickAccessGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  logoutText: {
    color: colors.primary,
    fontSize: 16,
  },
});