// src/navigation/TabNavigator.tsx
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { HomeStackNavigator } from './HomeStackNavigator'; // Usando o stack da Home
import { TopicsScreen } from '../screens/education/TopicsScreen';
import { UserIndicatorsScreen } from '../screens/user/UserIndicatorsScreen';

const Tab = createBottomTabNavigator();

export const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveBackgroundColor: '#FFF',
        tabBarActiveTintColor: '#1F8E8A',
        tabBarInactiveTintColor: '#767676',
        tabBarStyle: { backgroundColor: '#FFF' },
      }}
    >
      {/* Renomeie a aba "Home" para "HomeTab" para evitar duplicidade */}
      <Tab.Screen
        name="HomeTab"
        component={HomeStackNavigator}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Feather name="home" size={size} color={color} />
          ),
          tabBarLabel: 'Início',
        }}
      />

      <Tab.Screen
        name="Topics"
        component={TopicsScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="book-open-outline" size={size} color={color} />
          ),
          tabBarLabel: 'Tópicos',
        }}
      />

      <Tab.Screen
        name="UserIndicators"
        component={UserIndicatorsScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Feather name="users" size={size} color={color} />
          ),
          tabBarLabel: 'Indicadores',
        }}
      />
    </Tab.Navigator>
  );
};
