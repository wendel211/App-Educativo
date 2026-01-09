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
      
      // Alerta de sucesso
      Alert.alert(
        'E-mail enviado',
        'Verifique sua caixa de entrada (ou a pasta de spam) para redefinir sua senha.',
        [
            { text: "OK", onPress: () => navigation.navigate('Login') }
        ]
      );
      
    } catch (err: any) {
      console.error(err);
      let message = 'Não foi possível enviar o e-mail. Tente novamente.';
      
      if (err.code === 'auth/user-not-found') {
        message = 'E-mail não cadastrado no sistema.';
      } else if (err.code === 'auth/invalid-email') {
        message = 'Formato de e-mail inválido.';
      } else if (err.code === 'auth/network-request-failed') {
        message = 'Falha na rede. Verifique sua conexão com a internet.';
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
        <View style={styles.textContainer}>
            <Text style={styles.instructions}>
                Digite o e-mail associado à sua conta e enviaremos um link para redefinir sua senha.
            </Text>
        </View>

        <Input
          label="E-mail"
          value={email}
          onChangeText={setEmail}
          placeholder="Digite seu e-mail"
          error={error}
          autoCapitalize="none"
          keyboardType="email-address"
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
          <Text style={styles.backText}>Voltar para o Login</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fefefe', // Fundo branco padrão
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
  textContainer: {
    marginBottom: 25,
    alignItems: 'center',
    paddingHorizontal: 10
  },
  instructions: {
    fontSize: 15,
    color: '#666',
    textAlign: 'center',
    lineHeight: 22,

  },
  backContainer: {
    marginTop: 20,
    alignItems: 'center',
    padding: 10
  },
  backText: {
    color: colors.primary || '#005A57',
    fontSize: 15,
    fontWeight: '600',
    textDecorationLine: 'underline'
  }
});

