import React from 'react';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer';
import { Feather } from '@expo/vector-icons';
import { View, StyleSheet, Text, Image, Dimensions } from 'react-native';
import { TabNavigator } from './TabNavigator';
import { SettingsScreen } from '../screens/settings/SettingsScreen';
import { useAuth } from '../contexts/AuthContext';

const Drawer = createDrawerNavigator();

const logoName = require('../assets/images/NomeLOGO.png');

const { width } = Dimensions.get('window');

export const DrawerNavigator = () => {
  const { logout } = useAuth();

  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} logout={logout} />}
      screenOptions={{
        title: '',
        drawerActiveBackgroundColor: '#146D6A',
        drawerActiveTintColor: '#ffffff',
        drawerInactiveTintColor: 'black',
        drawerStyle: {
          backgroundColor: '#fff',
          width: 250,
        },
        headerStyle: {
          backgroundColor: '#1F8E8A',
        },
        headerTintColor: '#ffffff',
      }}
      initialRouteName="Home"
    >
      <Drawer.Screen
        name="Home"
        component={TabNavigator}
        options={{
          drawerIcon: ({ color, size }) => <Feather name="home" size={size} color={color} />,
          drawerLabel: 'Página Inicial',
        }}
      />
      <Drawer.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          drawerIcon: ({ color, size }) => <Feather name="settings" size={size} color={color} />,
          drawerLabel: 'Configurações',
        }}
      />
    </Drawer.Navigator>
  );
};

// Componente Customizado do Drawer
const CustomDrawerContent = (props: any) => {
  return (
    <DrawerContentScrollView {...props} contentContainerStyle={styles.drawerContainer}>
      {/* Logo Centralizada */}
      <View style={styles.logoContainer}>
        <Image source={logoName} style={styles.logoName} resizeMode="contain" />
      </View>

      <View style={styles.drawerContent}>
        <DrawerItemList {...props} />
      </View>

      {/* Botão "Sair" fixado no rodapé */}
      <View style={styles.logoutContainer}>
        <DrawerItem
          label="Sair"
          icon={({ color, size }) => <Feather name="log-out" size={size} color={color} />}
          onPress={() => props.logout()}
          labelStyle={styles.logoutLabel}
        />
      </View>
    </DrawerContentScrollView>
  );
};

// Estilos customizados para Drawer
const styles = StyleSheet.create({
  drawerContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  drawerContent: {
    flex: 1,
  },
  logoutContainer: {
    borderTopWidth: 1,
    borderTopColor: '#146D6A',
    paddingVertical: 10,
  },
  logoutLabel: {
    fontSize: 14,
    color: 'black',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 20,
    paddingTop: 30, // Adiciona espaço no topo do drawer
  },
  logoName: {
    width: width * 0.32, // Ajustado para um tamanho adequado
    height: width * 0.2,
  },
});

