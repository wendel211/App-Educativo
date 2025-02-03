// src/navigation/TabNavigator.tsx
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons'; // Importe os ícones
import { HomeScreen } from '../screens/home/HomeScreen';
import  { TopicsScreen } from '../screens/education/TopicsScreen';
import { UserIndicatorsScreen } from '../screens/user/UserIndicatorsScreen'; // Crie essa tela se ainda não existir

const Tab = createBottomTabNavigator();

export const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false, // Oculta o header
        tabBarActiveBackgroundColor: '#7d7d7d', // Cor de fundo do ícone ativo
        tabBarActiveTintColor: '#ffffff', // Cor do ícone ativo
        tabBarInactiveTintColor: '#cccccc', // Cor do ícone inativo
        tabBarStyle: {
          backgroundColor: '#4f4f4f', // Cor de fundo da barra de navegação
        },
      }}
    >
      {/* Tela Home */}
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Feather name="home" size={size} color={color} />
          ),
          tabBarLabel: 'Início',
        }}
      />

      {/* Tela Topics */}
      <Tab.Screen
        name="Topics"
        component={TopicsScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="book-open-outline"
              size={size}
              color={color}
            />
          ),
          tabBarLabel: 'Tópicos',
        }}
      />

      {/* Tela UserIndicators */}
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