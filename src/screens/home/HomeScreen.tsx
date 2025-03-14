import React from 'react';
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
import { useNavigation, DrawerActions } from '@react-navigation/native';
import { TopicCard } from '../../components/education/TopicCard';
import { colors } from '../../styles/colors';
import { AwarenessCard } from '../../components/common/AwarenessCard';

interface AwarenessData {
  id: string;
  title: string;
  image: ImageSourcePropType;
}

const awarenessTopics: AwarenessData[] = [
  {
    id: '1',
    title: 'Por que é tão importante rever os cuidados referente aos nossos hábitos sendo portador de doenças cardiovasculares?',
    image: require('../../assets/images/cardiovas.jpg'),
  },
  {
    id: '2',
    title: 'Por que é tão importante rever os cuidados referente aos nossos hábitos sendo portador de diabetes tipo 2?',
    image: require('../../assets/images/diabetes.jpg'),
  },
  {
    id: '3',
    title: 'Por que é tão importante rever os cuidados referente aos nossos hábitos sendo portador de doenças cardiovasculares e diabetes tipo 2?',
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
  const navigation = useNavigation(); // Hook para abrir o Drawer
  const userName = "Wendel"; // Simulando o nome do usuário

  const handleProfilePress = () => {
    navigation.dispatch(DrawerActions.openDrawer()); // Abre o Drawer ao clicar na imagem de perfil
  };

  return (
    <SafeAreaView style={styles.container}>

      <ScrollView contentContainerStyle={styles.content}>
        
        {/* Cabeçalho */}
        <View style={styles.header}>
          <TouchableOpacity onPress={handleProfilePress} style={styles.profileContainer}>
            <Image 
              source={require('../../assets/images/user.png')} // Imagem simulada
              style={styles.profileImage}
            />
            <Text style={styles.greeting}>Olá, {userName} </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.welcomeSection}>
          <Text style={styles.initialTitle}>
            Aprenda a cuidar da sua saúde sendo portador de doenças cardiovasculares e diabetes!
          </Text>
          <View style={styles.divider} />
        </View>

        <View style={styles.awarenessSection}>
          {awarenessTopics.map((topic) => (
            <AwarenessCard
              key={topic.id}
              title={topic.title}
              image={topic.image}
              onPress={() => navigation.navigate('ArticleDetailScreen', { topicId: topic.id })}
            />
          ))}
        </View>

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
              onPress={() => navigation.navigate('Topics', { category: topic.id, title: topic.title })}
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
    paddingBottom: 20, // Evita corte no final da tela
  },
  header: {
    height: 180,
    justifyContent: 'center',
    backgroundColor: colors.primary,
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'ios' ? 50 : 30, // Ajuste para iOS e Android
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  profileContainer: {
    flexDirection: 'row', // Alinha imagem e texto na mesma linha
    alignItems: 'center',
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#fff',
    marginRight: 10, // Espaço entre a imagem e o texto
  },
  greeting: {
    fontSize: 22,
    fontWeight: 'bold',  
    color: 'black',
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
    fontWeight: 'bold',
    padding: 4,

  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 10,
  },
  topicsSection: {
    marginTop: 20,
    paddingHorizontal: 16,
  },
  awarenessSection: {
    marginTop: 20,
    paddingHorizontal: 16,
  },
  divider: {
    height: 1,
    backgroundColor: colors.text,
    width: 364,
    marginBottom: 10,
  },

});

export default HomeScreen;
