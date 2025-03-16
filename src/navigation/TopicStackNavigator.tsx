import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TopicsScreen from '../screens/education/TopicsScreen';
import DiseaseDetailScreen from '../screens/diseaseModules/DiseaseDetailScreen';


export type TopicStackParamList = {
  TopicsScreen: undefined;
  DiseaseDetailScreen: { diseaseId: string };
};

const TopicStack = createNativeStackNavigator<TopicStackParamList>();

export const TopicStackNavigator = () => {
  return (
    <TopicStack.Navigator initialRouteName="TopicsScreen" screenOptions={{ headerShown: false }}>
      <TopicStack.Screen name="TopicsScreen" component={TopicsScreen} />
      <TopicStack.Screen name="DiseaseDetailScreen" component={DiseaseDetailScreen} />
    </TopicStack.Navigator>
  );
};
