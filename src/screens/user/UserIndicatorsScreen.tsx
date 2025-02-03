// src/screens/user/UserIndicatorsScreen.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const UserIndicatorsScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Indicadores do Usuário</Text>
      <Text>Aqui você verá os indicadores de saúde do usuário.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
});