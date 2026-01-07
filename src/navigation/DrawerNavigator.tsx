import React from 'react';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer';
import { Feather } from '@expo/vector-icons';
import { View, StyleSheet, Image, Dimensions } from 'react-native';
import { TabNavigator } from './TabNavigator';
// REMOVA ou COMENTE a importação direta da SettingsScreen
// import { SettingsScreen } from '../screens/settings/SettingsScreen'; 

// ADICIONE esta importação
import { SettingsNavigator } from './SettingsNavigator'; 

import { useAuth } from '../contexts/AuthContext';
import IndicatorHistoryScreen from '../screens/HistoryScreen/IndicatorHistoryScreen';

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
        drawerLabelStyle: { 
          fontFamily: 'Poppins-Regular',
          fontSize: 13,  
        },
        drawerStyle: {
          backgroundColor: '#fff',
          width: 250,
        },
        headerShown: false,
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
        name="IndicatorHistoryScreen"
        component={IndicatorHistoryScreen}
        options={{
          drawerIcon: ({ color, size }) => <Feather name="activity" size={size} color={color} />,
          drawerLabel: 'Histórico de Indicadores',
        }}
      />
      
      {/* AQUI ESTÁ A MUDANÇA: Trocamos SettingsScreen por SettingsNavigator */}
      <Drawer.Screen
        name="Settings"
        component={SettingsNavigator} 
        options={{
          drawerIcon: ({ color, size }) => <Feather name="settings" size={size} color={color} />,
          drawerLabel: 'Configurações',
        }}
      />
    </Drawer.Navigator>
  );
};

const CustomDrawerContent = (props: any) => {
  return (
    <DrawerContentScrollView {...props} contentContainerStyle={styles.drawerContainer}>
      <View style={styles.logoContainer}>
        <Image source={logoName} style={styles.logoName} resizeMode="contain" />
      </View>
      <View style={styles.drawerContent}>
        <DrawerItemList {...props} />
      </View>
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

const styles = StyleSheet.create({
  drawerContainer: {
    flex: 1,
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
    fontFamily: 'Poppins-Bold',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 20,
    paddingVertical: 10,
  },
  logoName: {
    width: width * 0.32,
    height: width * 0.2,
  },
});

export default DrawerNavigator;