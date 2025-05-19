// src/screens/HomeScreen.tsx

import React, { useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Image,
  ImageSourcePropType,
  Platform,
  TouchableOpacity
} from 'react-native';
import {
  useNavigation,
  DrawerActions,
  useFocusEffect
} from '@react-navigation/native';
import { TopicCard } from '../../components/education/TopicCard';
import { AwarenessCard } from '../../components/common/AwarenessCard';
import { colors } from '../../styles/colors';
import { usePoints } from '../../contexts/PointsContext';

interface AwarenessData {
  id: string;
  title: string;
  image: ImageSourcePropType;
}

const awarenessTopics: AwarenessData[] = [
  {
    id: '1',
    title:
      'Por que é tão importante rever os cuidados referente aos nossos hábitos sendo portador de doenças cardiovasculares?',
    image: require('../../assets/images/cardiovas.jpg'),
  },
  {
    id: '2',
    title:
      'Por que é tão importante rever os cuidados referente aos nossos hábitos sendo portador de diabetes tipo 2?',
    image: require('../../assets/images/diabetes.jpg'),
  },
  {
    id: '3',
    title:
      'Por que é tão importante rever os cuidados referente aos nossos hábitos sendo portador de doenças cardiovasculares e diabetes tipo 2?',
    image: require('../../assets/images/paciente.jpg'),
  },
];

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

export const HomeScreen: React.FC = () => {
  const navigation = useNavigation();
  const userName = 'Wendel';
  const { totalPoints, refreshPoints } = usePoints();

  // Atualiza pontos sempre que a tela volta a ganhar foco
  useFocusEffect(
    useCallback(() => {
      refreshPoints();
    }, [refreshPoints])
  );

  const progressPercent = Math.min((totalPoints / 180) * 100, 100);

  const handleProfilePress = () => {
    navigation.dispatch(DrawerActions.openDrawer());
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        {/* Cabeçalho */}
        <View style={styles.header}>
          <TouchableOpacity onPress={handleProfilePress} style={styles.profileContainer}>
            <Image
              source={require('../../assets/images/user.png')}
              style={styles.profileImage}
            />
            <View>
              <Text style={styles.greeting}>Olá, {userName}</Text>
              <View style={styles.progressWrapper}>
                <View
                  style={[styles.progressBar, { width: `${progressPercent}%` }]}
                />
              </View>
              <Text style={styles.progressLabel}>
                {totalPoints} / 180 pontos
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Boas-vindas */}
        <View style={styles.welcomeSection}>
          <Text style={styles.initialTitle}>
            Aprenda a cuidar da sua saúde sendo portador de doenças
            cardiovasculares e diabetes!
          </Text>
          <View style={styles.divider} />
        </View>

        {/* Cards de awareness */}
        <View style={styles.awarenessSection}>
          {awarenessTopics.map((topic) => (
            <AwarenessCard
              key={topic.id}
              title={topic.title}
              image={topic.image}
              onPress={() =>
                navigation.navigate('ArticleDetailScreen', { topicId: topic.id })
              }
            />
          ))}
        </View>

        {/* Tópicos educativos */}
        <View style={styles.topicsSection}>
          <Text style={styles.sectionTitle}>Tópicos Educativos</Text>
          <Text style={styles.initialTitle}>
            Explore nossos tópicos educativos e cuide melhor da sua saúde.
          </Text>
          {topics.map((topic) => (
            <TopicCard
              key={topic.id}
              title={topic.title}
              description={topic.description}
              icon={topic.icon}
              onPress={() =>
                navigation.navigate('Topics', {
                  category: topic.id,
                  title: topic.title,
                })
              }
            />
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
    paddingBottom: 20,
  },
  header: {
    height: 200,
    justifyContent: 'center',
    backgroundColor: colors.primary,
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'ios' ? 50 : 30,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#fff',
    marginRight: 10,
  },
  greeting: {
    fontSize: 22,
    color: '#fff',
    fontFamily: 'Poppins-Bold',
  },
  progressWrapper: {
    height: 8,
    width: 160,
    backgroundColor: '#ddd',
    borderRadius: 5,
    marginTop: 6,
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#4CAF50',
    borderRadius: 5,
  },
  progressLabel: {
    fontSize: 12,
    color: '#fff',
    fontFamily: 'Poppins-Regular',
    marginTop: 4,
  },
  welcomeSection: {
    marginTop: 20,
    paddingHorizontal: 16,
  },
  initialTitle: {
    fontSize: 14,
    color: colors.text,
    marginBottom: 10,
    lineHeight: 22,
    padding: 4,
    fontFamily: 'Poppins-Regular',
  },
  divider: {
    height: 1,
    backgroundColor: colors.text,
    width: '100%',
    marginBottom: 10,
  },
  awarenessSection: {
    marginTop: 20,
    paddingHorizontal: 16,
  },
  topicsSection: {
    marginTop: 20,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 22,
    color: colors.text,
    marginBottom: 10,
    fontFamily: 'Poppins-Bold',
  },
});

export default HomeScreen;
