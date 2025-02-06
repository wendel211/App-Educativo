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
import { AwarenessCard } from '../../components/common/AwarenessCard'; // Importe o novo componente


interface AwarenessData {
  id: string;
  title: string;
  image: ImageSourcePropType;
}

const awarenessTopics: AwarenessData[] = [
  {
    id: '1',
    title: 'Por que é tão importante rever os cuidados referente aos nossos hábitos sendo portador de doenças cardiovasculares?',
    image: require('../../assets/images/cardiovas.jpg'), // Adicione a imagem no diretório assets
  },
  {
    id: '2',
    title: 'Por que é tão importante rever os cuidados referente aos nossos hábitos sendo portador de diabetes tipo 2?',
    image: require('../../assets/images/diabetes.jpg'), // Adicione a imagem no diretório assets
  },
  {
    id: '3',
    title: 'Por que é tão importante rever os cuidados referente aos nossos hábitos sendo portador de doenças cardiovasculares e diabetes tipo 2?',
    image: require('../../assets/images/paciente.jpg'), // Adicione a imagem no diretório assets
  },
];

  const handleCardPress = (topicId: string) => {
    // Redireciona para a tela específica com base no ID do card
    navigation.navigate('AwarenessDetail', { topicId });
  };



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

      <ScrollView style={styles.content}>

        <View style={styles.welcomeSection}>
          <Text style={styles.sectionTitle}>Bem-vindo, {userName}!</Text>
          <Text style={styles.initialTitle}>Aprenda cuidar da saúde sendo portador de doenças cardiovascular e diabetes!</Text>
        </View>

        <View style={styles.awarenessSection}>
          {awarenessTopics.map((topic) => (
            <AwarenessCard
              key={topic.id}
              title={topic.title}
              image={topic.image}
              onPress={() => handleCardPress(topic.id)}
            />
          ))}
        </View>

        <View style={styles.topicsSection}>
          <Text style={styles.sectionTitle}>Tópicos Educativos</Text>

          <Text style={styles.initialTitle}>
            Explore nossos tópicos educativos e cuide melhor da sua saúde
          </Text>

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

  initialTitle : {
    fontSize: 15,
    color: colors.text,
    marginBottom: 1,
    lineHeight: 22,
    padding: 16,
  },
  
  welcomeTitle: {
    fontSize: 16,
    color: colors.text,
    marginBottom: 8,
    paddingBottom: 8, 
  },
  welcomeSubtitle: {
    fontSize: 14,
    color: '#666',
    lineHeight: 22,
    marginBottom: 16,
  },
  topicsSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 2,
    padding:16,
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

  awarenessSection: {
    marginBottom: 24,
  },

  

});
