import React, { useState } from 'react';
import { View, StyleSheet, Image, Dimensions } from 'react-native';
import { Input } from '../../components/common/Input';
import { Button } from '../../components/common/Button';
import { useAuth } from '../../contexts/AuthContext';

const { width } = Dimensions.get('window'); // Obtém a largura da tela

const logo = require('../../assets/images/LOGO.png');
const logoName = require('../../assets/images/NomeLOGO.png');

type LoginScreenProps = {
  navigation: any;
};

export const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({ email: '', password: '' });

  const { login } = useAuth();

  const validateForm = () => {
    const newErrors = { email: '', password: '' };

    if (!email) {
      newErrors.email = 'E-mail é obrigatório';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'E-mail inválido';
    }

    if (!password) {
      newErrors.password = 'Senha é obrigatória';
    } else if (password.length < 6) {
      newErrors.password = 'Senha deve ter no mínimo 6 caracteres';
    }

    setErrors(newErrors);
    return !newErrors.email && !newErrors.password;
  };

  const handleLogin = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      await login(email, password);
      navigation.navigate('Home');
    } catch (error) {
      console.error('Login error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Container do Logo e Nome */}
      <View style={styles.logoContainer}>
        <Image source={logo} style={styles.logo} resizeMode="contain" />
        <Image source={logoName} style={styles.logoName} resizeMode="contain" />
      </View>

      {/* Formulário */}
      <View style={styles.content}>
        <Input
          label="E-mail"
          value={email}
          onChangeText={setEmail}
          placeholder="Seu e-mail"
          error={errors.email}
          autoCapitalize="none"
        />

        <Input
          label="Senha"
          value={password}
          onChangeText={setPassword}
          placeholder="Sua senha"
          secureTextEntry
          error={errors.password}
        />

        <Button title="Entrar" onPress={handleLogin} loading={loading} />
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
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 20, // Espaço entre logo e formulário
  },
  logo: {
    width: width * 0.32, // 40% da largura da tela
    height: width * 0.20, // Mantém proporção quadrada
  },
  logoName: {
    width: width * 0.32, // Nome do logo mais largo que o logo principal
    height: width * 0.20, // Mantém proporção menor para evitar distorção
  },
  content: {
    width: '100%',
    alignItems: 'center',
    marginTop: 20,
  },
});
