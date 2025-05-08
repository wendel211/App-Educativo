// src/screens/ArticleDetail/ArticleDetailScreen.tsx
import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import { RouteProp } from '@react-navigation/native';


type ArticleDetailScreenRouteProp = RouteProp<{ params: { topicId: string } }, 'params'>;

type Section = {
  heading: string;
  text: string;
};

interface Article {
  image: any;
  title: string;
  sections: Section[];
}

const ArticleDetailScreen = ({ route }: { route: ArticleDetailScreenRouteProp }) => {
  const { topicId } = route.params;

  // Definição dos artigos com seções e textos Lorem Ipsum
  let article: Article;
  switch (topicId) {
    case '1':
      article = {
        image: require('../../assets/images/topo_article1.jpg'),
        title: 'Cuidados com Doenças Cardiovasculares',
        sections: [
          {
            heading: 'Introdução',
            text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac erat in quam facilisis tempor. Cras blandit mi a orci commodo, eget hendrerit dui blandit.',
          },
          {
            heading: 'Prevenção',
            text: 'Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Integer euismod nisl et lorem ultrices, quis commodo nunc semper.',
          },
          {
            heading: 'Tratamento',
            text: 'Mauris commodo urna et sapien sollicitudin, in ultricies sem ullamcorper. Sed tincidunt, nibh non convallis tempus, metus libero dapibus magna, id faucibus sem.',
          },
          {
            heading: 'Conclusão',
            text: 'Cras in purus ac neque dignissim lobortis. Duis vitae eros vel orci dignissim dictum a sed mauris. Vivamus ac turpis a urna tincidunt gravida.',
          },
        ],
      };
      break;
    case '2':
      article = {
        image: require('../../assets/images/topo_article2.png'),
        title: 'Gerenciamento do Diabetes Tipo 2',
        sections: [
          {
            heading: 'Introdução',
            text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. Praesent in justo nec lorem fermentum pellentesque.',
          },
          {
            heading: 'Controle Glicêmico',
            text: 'In venenatis eros eget turpis molestie, et consequat ipsum consequat. Donec ut purus a turpis vulputate bibendum. Fusce vel semper lectus.',
          },
          {
            heading: 'Hábitos Saudáveis',
            text: 'Phasellus auctor, odio nec fringilla pharetra, tortor neque dignissim velit, at sodales ex libero et libero. Quisque imperdiet libero ut felis auctor.',
          },
          {
            heading: 'Conclusão',
            text: 'Sed dictum dui a metus fermentum, at pulvinar est ullamcorper. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.',
          },
        ],
      };
      break;
    case '3':
      article = {
        image: require('../../assets/images/topo_article3.png'),
        title: 'Desafios da Convivência: Diabetes e Doenças Cardiovasculares',
        sections: [
          {
            heading: 'Introdução',
            text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sollicitudin dui eget justo efficitur, vitae auctor lorem fermentum.',
          },
          {
            heading: 'Desafios Cotidianos',
            text: 'Suspendisse potenti. Quisque vitae turpis hendrerit, placerat urna ac, blandit lorem. Aliquam erat volutpat. Integer at cursus ligula.',
          },
          {
            heading: 'Estratégias de Gestão',
            text: 'Aenean vel turpis id metus malesuada luctus. Fusce sed mauris sit amet elit tristique convallis. Nulla facilisi. In hac habitasse platea dictumst.',
          },
          {
            heading: 'Conclusão',
            text: 'Nam feugiat dolor et magna dignissim, vitae aliquam sem sagittis. Donec nec turpis at ligula fermentum consectetur. Integer vel tortor a velit laoreet convallis.',
          },
        ],
      };
      break;
    default:
      article = {
        image: require('../../assets/images/diabetes-icon.png'),
        title: 'Artigo Padrão',
        sections: [
          {
            heading: 'Introdução',
            text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut at lorem ac dolor tempor tempus.',
          },
          {
            heading: 'Conteúdo',
            text: 'Proin pharetra risus in sapien molestie, in suscipit metus tristique. Sed a justo vitae nisl elementum blandit.',
          },
          {
            heading: 'Conclusão',
            text: 'Curabitur sit amet mi et quam sodales fermentum. Mauris in libero non odio consequat convallis.',
          },
        ],
      };
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Image source={article.image} style={styles.headerImage} />
        <View style={styles.contentContainer}>
          <Text style={styles.title}>{article.title}</Text>
          {article.sections.map((section, index) => (
            <View key={index} style={styles.sectionContainer}>
              <Text style={styles.sectionHeading}>{section.heading}</Text>
              <Text style={styles.sectionText}>{section.text}</Text>
            </View>
          ))}
          {/* Seção de Gamificação */}
          <View style={styles.gamificationContainer}>
            <Text style={styles.gamificationTitle}>Desafios e Recompensas</Text>
            <Text style={styles.gamificationText}>
              Complete este artigo e quizzes para ganhar pontos e desbloquear novas conquistas!
            </Text>
            <TouchableOpacity style={styles.gamificationButton}>
              <Text style={styles.gamificationButtonText}>Ver Desafios</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F7', // Fundo claro
  },
  headerImage: {
    width: '100%',
    height: 200,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    overflow: 'hidden',
  },
  contentContainer: {
    padding: 16,
    marginTop: -20,
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 30,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#1F8E8A',
  },
  sectionContainer: {
    marginBottom: 20,
  },
  sectionHeading: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
  },
  sectionText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#555',
  },
  gamificationContainer: {
    backgroundColor: '#E6F7F5',
    borderRadius: 15,
    padding: 16,
    marginTop: 30,
    alignItems: 'center',
  },
  gamificationTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1F8E8A',
    marginBottom: 10,
  },
  gamificationText: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    marginBottom: 15,
  },
  gamificationButton: {
    backgroundColor: '#1F8E8A',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  gamificationButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ArticleDetailScreen;
