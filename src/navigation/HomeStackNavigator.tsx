import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from '../screens/home/HomeScreen';
import  ArticleDetailScreen  from '../screens/ArticleDetail/ArticleDetailScreen';

export type HomeStackParamList = {
  HomeScreen: undefined;
  ArticleDetailScreen: { topicId: string };
};

const HomeStack = createNativeStackNavigator<HomeStackParamList>();

export const HomeStackNavigator = () => {
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <HomeStack.Screen
        name="HomeScreen"
        component={HomeScreen}
      />
      <HomeStack.Screen
        name="ArticleDetailScreen"
        component={ArticleDetailScreen}
      />
    </HomeStack.Navigator>
  );
};
