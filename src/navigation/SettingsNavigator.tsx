import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SettingsScreen } from '../screens/settings/SettingsScreen';
import { PrivacyPolicyScreen } from '../screens/settings/PrivacyPolicyScreen'; // Certifique-se de ter criado este arquivo
import { colors } from '../styles/colors'; // Importe suas cores

const Stack = createNativeStackNavigator();

export const SettingsNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="SettingsMain"
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.primary,
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontFamily: 'Poppins-Bold',
        },
        headerBackTitleVisible: false, 
      }}
    >
      <Stack.Screen 
        name="SettingsMain" 
        component={SettingsScreen} 
        options={{ 
          headerShown: false 
        }} 
      />
      
      <Stack.Screen 
        name="PrivacyPolicy" 
        component={PrivacyPolicyScreen} 
        options={{ 
          title: 'Política de Privacidade',
          headerShown: true 
        }} 
      />
    </Stack.Navigator>
  );
};