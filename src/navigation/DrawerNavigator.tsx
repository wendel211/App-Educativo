// src/navigation/DrawerNavigator.tsx
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Feather } from '@expo/vector-icons';
import { TabNavigator } from './TabNavigator';
import { SettingsScreen } from '../screens/settings/SettingsScreen';
import { useAuth } from '../contexts/AuthContext';
import { LoginScreen } from '../screens/auth/LoginScreen';

const Drawer = createDrawerNavigator();

export const DrawerNavigator = () => {
    const { logout } = useAuth();
    

  return (
    <Drawer.Navigator
      screenOptions={{
        title: '',
        drawerActiveBackgroundColor: '#333333',
        drawerActiveTintColor: '#00b300',
        drawerInactiveTintColor: '#cccccc',
        drawerStyle: {
          backgroundColor: '#4f4f4f',
        },
        headerStyle: {
          backgroundColor: '#00b300',
        },
        headerTintColor: '#ffffff',
      }}
      initialRouteName="Home"
    >
      {/* Tab Navigator (Home, Topics, UserIndicators) */}
      <Drawer.Screen
        name="Home"
        component={TabNavigator}
        options={{
          drawerIcon: ({ color, size }) => (
            <Feather name="home" size={size} color={color} />
          ),
          drawerLabel: 'Página Inicial',
        }}
      />

      {/* Tela Configurações */}
      <Drawer.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <Feather name="settings" size={size} color={color} />
          ),
          drawerLabel: 'Configurações',
        }}
      />

      {/* Opção de Sair */}
      <Drawer.Screen
        name="Login"
        component={LoginScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <Feather name="log-out" size={size} color={color} />
          ),
          drawerLabel: 'Sair',
        }}
        listeners={{
          drawerItemPress: () => {
            logout();
          },
        }}
      />
    </Drawer.Navigator>
  );
};