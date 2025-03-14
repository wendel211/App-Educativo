  // src/navigation/TabNavigator.tsx
  import React from 'react';
  import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
  import { Feather, MaterialCommunityIcons } from '@expo/vector-icons'; // Importe os ícones
  import { HomeScreen } from '../screens/home/HomeScreen';
  import  { TopicsScreen } from '../screens/education/TopicsScreen';
  import { UserIndicatorsScreen } from '../screens/user/UserIndicatorsScreen'; // Crie essa tela se ainda não existir
  import { HomeStackNavigator } from './HomeStackNavigator'; // Importe o HomeStackNavigator

  const Tab = createBottomTabNavigator();

  export const TabNavigator = () => {
    return (
      <Tab.Navigator
        screenOptions={{
          headerShown: false, // Oculta o header
          tabBarActiveBackgroundColor: '#FFF', // Cor de fundo do ícone ativo
          tabBarActiveTintColor: '#1F8E8A', // Cor do ícone ativo
          tabBarInactiveTintColor: '#767676', // Cor do ícone inativo
          tabBarStyle: {
            backgroundColor: '#FFF', // Cor de fundo da barra de navegação
          },
        }}
      >
        {/* Tela Home */}
        <Tab.Screen
          name="Home"
          component={HomeStackNavigator}
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