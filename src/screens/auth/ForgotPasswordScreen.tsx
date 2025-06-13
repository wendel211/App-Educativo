// src/screens/ForgotPasswordScreen.tsx

import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Alert,
  Image,
  Dimensions,
  TouchableOpacity,
  Text
} from 'react-native';
import { Input } from '../../components/common/Input';
import { Button } from '../../components/common/Button';
import { colors } from '../../styles/colors';
import { forgotPassword } from '../../services/auth';

const { width } = Dimensions.get('window');
const logo = require('../../assets/images/LOGO.png');
const logoName = require('../../assets/images/NomeLOGO.png');

type ForgotPasswordScreenProps = {
  navigation: any;
};

export const ForgotPasswordScreen: React.FC<ForgotPasswordScreenProps> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const validateForm = (): boolean => {
    if (!email) {
      setError('E-mail é obrigatório');
      return false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setError('E-mail inválido');
      return false;
    }
    setError('');
    return true;
  };

  const handleForgotPassword = async () => {
    if (!validateForm()) return;
    setLoading(true);

    try {
      await forgotPassword(email);
      Alert.alert(
        'E-mail enviado',
        'Verifique sua caixa de entrada (ou spam) para redefinir sua senha.'
      );
      navigation.navigate('Login');
    } catch (err: any) {
      console.error(err);
      let message = 'Não foi possível enviar o e-mail. Tente novamente.';
      if (err.code === 'auth/user-not-found') {
        message = 'E-mail não cadastrado.';
      } else if (err.code === 'auth/invalid-email') {
        message = 'Formato de e-mail inválido.';
      } else if (err.code === 'auth/network-request-failed') {
        message = 'Falha na rede. Verifique sua conexão.';
      }
      Alert.alert('Erro', message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={logo} style={styles.logo} resizeMode="contain" />
        <Image source={logoName} style={styles.logoName} resizeMode="contain" />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Input
          label="E-mail"
          value={email}
          onChangeText={setEmail}
          placeholder="Digite seu e-mail"
          error={error}
          autoCapitalize="none"
        />

        <Button
          title="Recuperar Senha"
          onPress={handleForgotPassword}
          loading={loading}
        />

        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backContainer}
        >
          <Text style={styles.backText}>Voltar</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingTop: 50
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 20
  },
  logo: {
    width: width * 0.32,
    height: width * 0.20,
    marginBottom: 2
  },
  logoName: {
    width: width * 0.32,
    height: width * 0.20
  },
  content: {
    flex: 1,
    padding: 20
  },
  backContainer: {
    marginTop: 20,
    alignItems: 'center'
  },
  backText: {
    color: colors.primary || '#007bff',
    textDecorationLine: 'underline'
  }
});
