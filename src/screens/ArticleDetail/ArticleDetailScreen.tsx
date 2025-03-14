// src/screens/ArticleDetail/ArticleDetailScreen.tsx
import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, SafeAreaView } from 'react-native';
import { colors } from '../../styles/colors';
import { RouteProp } from '@react-navigation/native';

type ArticleDetailScreenRouteProp = RouteProp<{ params: { topicId: string } }, 'params'>;

const ArticleDetailScreen = ({ route }: { route: ArticleDetailScreenRouteProp }) => {
  const { topicId } = route.params;

  // Define diferentes artigos com base no topicId
  let article;
  switch (topicId) {
    case '1':
      article = {
        image: require('../../assets/images/diabetes-icon.png'),
        title: 'Cuidados com Doenças Cardiovasculares',
        content: 'Conteúdo detalhado sobre cuidados, prevenção e tratamentos para doenças cardiovasculares...'
      };
      break;
    case '2':
      article = {
        image: require('../../assets/images/diabetes-icon.png'),
        title: 'Gerenciamento do Diabetes Tipo 2',
        content: 'Conteúdo detalhado sobre controle glicêmico, hábitos saudáveis e tratamento do diabetes tipo 2...'
      };
      break;
    case '3':
      article = {
        image: require('../../assets/images/diabetes-icon.png'),
        title: 'Desafios da Convivência: Diabetes e Doenças Cardiovasculares',
        content: 'Conteúdo detalhado sobre como lidar com a coexistência de diabetes e doenças cardiovasculares...'
      };
      break;
    default:
      article = {
        image: require('../../assets/images/diabetes-icon.png'),
        title: 'Artigo Padrão',
        content: 'Conteúdo padrão do artigo, sem informação específica.'
      };
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Image source={article.image} style={styles.headerImage} />
        <View style={styles.contentContainer}>
          <Text style={styles.title}>{article.title}</Text>
          <Text style={styles.content}>{article.content}</Text>
          {/* Você pode incluir outras seções, como quizzes ou referências */}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#fff' 
  },
  headerImage: {
    width: '100%',
    height: 200,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    overflow: 'hidden'
  },
  contentContainer: {
    padding: 16,
    marginTop: -20,
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  content: {
    fontSize: 16,
    lineHeight: 24,
  },
});

export default ArticleDetailScreen;
