import React from 'react';
import { View, StyleSheet, Image, Dimensions } from 'react-native';
import { Button } from '../../components/common/Button';

const { width } = Dimensions.get('window'); // Obtém a largura da tela

const logo = require('../../assets/images/LOGO.png');
const logoName = require('../../assets/images/NomeLOGO.png');

type PreLoginProps = {
  navigation: any;
};

export const PreLogin: React.FC<PreLoginProps> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* Container do Logo e Nome */}
      <View style={styles.logoContainer}>
        <Image source={logo} style={styles.logo} resizeMode="contain" />
        <Image source={logoName} style={styles.logoName} resizeMode="contain" />
      </View>

      {/* Botões de navegação */}
      <View style={styles.buttonContainer}>
        <Button title="Entrar" onPress={() => navigation.navigate('Login')} />
        <Button title="Criar conta" onPress={() => navigation.navigate('Register')} variant="secondary" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fefefe',
    padding: 16,
    paddingTop: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logo: {
    width: width * 0.32,
    height: width * 0.20,
  },
  logoName: {
    width: width * 0.32,
    height: width * 0.20,
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    gap: 10,
  },
});
