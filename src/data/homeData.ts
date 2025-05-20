// src/data/homeData.ts
import { ImageSourcePropType } from 'react-native';

export interface AwarenessData {
  id: string;
  title: string;
  image: ImageSourcePropType;
}

export const awarenessTopics: AwarenessData[] = [
  {
    id: '1',
    title: 'Por que é tão importante rever os cuidados referente aos nossos hábitos sendo portador de doenças cardiovasculares?',
    image: require('../assets/images/cardiovas.jpg'),
  },
  {
    id: '2',
    title: 'Por que é tão importante rever os cuidados referente aos nossos hábitos sendo portador de diabetes tipo 2?',
    image: require('../assets/images/diabetes.jpg'),
  },
  {
    id: '3',
    title: 'Por que é tão importante rever os cuidados referente aos nossos hábitos sendo portador de doenças cardiovasculares e diabetes tipo 2?',
    image: require('../assets/images/paciente.jpg'),
  },
];

export interface TopicData {
  id: string;
  title: string;
  description: string;
  icon: ImageSourcePropType;
}

export const topics: TopicData[] = [
  {
    id: '1',
    title: 'Diabetes',
    description: 'Aprenda sobre tipos de diabetes, controle glicêmico e hábitos saudáveis.',
    icon: require('../assets/images/diabetes-icon.png'),
  },
  {
    id: '2',
    title: 'Saúde do Coração',
    description: 'Informações sobre prevenção e cuidados com doenças cardiovasculares.',
    icon: require('../assets/images/heart-icon.png'),
  },
  {
    id: '3',
    title: 'Atividade Física',
    description: 'Exercícios recomendados e seus benefícios para sua condição.',
    icon: require('../assets/images/exercise-icon.png'),
  },
  {
    id: '4',
    title: 'Alimentação Saudável',
    description: 'Dicas de nutrição e dietas específicas para cada condição.',
    icon: require('../assets/images/nutrition-icon.png'),
  },
];
