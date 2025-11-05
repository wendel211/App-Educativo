import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Alert,
  Image,
  Dimensions,
  TouchableOpacity,
  Text,
} from 'react-native';
import { Input } from '../../components/common/Input';
import { Button } from '../../components/common/Button';
import { colors } from '../../styles/colors';
import { register } from '../../services/auth';

const { width } = Dimensions.get('window');
const logo = require('../../assets/images/LOGO.png');
const logoName = require('../../assets/images/NomeLOGO.png');

type RegisterScreenProps = {
  navigation: any;
};

export const RegisterScreen: React.FC<RegisterScreenProps> = ({ navigation }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    confirmEmail: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    confirmEmail: '',
    password: '',
    confirmPassword: '',
  });

  const [loading, setLoading] = useState(false);

  const validateForm = (): boolean => {
    const newErrors = {
      name: '',
      email: '',
      confirmEmail: '',
      password: '',
      confirmPassword: '',
    };

    if (!formData.name.trim()) {
      newErrors.name = 'Nome é obrigatório';
    } else if (formData.name.trim().length > 12) {
      newErrors.name = 'Máximo de 12 caracteres';
    }

    if (!formData.email) {
      newErrors.email = 'E-mail é obrigatório';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'E-mail inválido';
    }

    if (!formData.confirmEmail) {
      newErrors.confirmEmail = 'Confirme seu e-mail';
    } else if (formData.confirmEmail !== formData.email) {
      newErrors.confirmEmail = 'E-mails não coincidem';
    }

    if (!formData.password) {
      newErrors.password = 'Senha é obrigatória';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Senha deve ter no mínimo 6 caracteres';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Confirme sua senha';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Senhas não coincidem';
    }

    setErrors(newErrors);
    return !Object.values(newErrors).some(err => !!err);
  };

  const handleRegister = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      await register(
        formData.email.trim(),
        formData.password,
        formData.name.trim()
      );
      Alert.alert('Sucesso', 'Cadastro realizado com sucesso!');
      navigation.navigate('Login');
    } catch (error: any) {
      let errorMessage = 'Erro ao realizar cadastro';

      if (error.code === 'auth/email-already-in-use') {
        errorMessage = 'Esse e-mail já está em uso.';
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = 'E-mail inválido.';
      } else if (error.code === 'auth/weak-password') {
        errorMessage = 'Senha fraca. Use 6 ou mais caracteres.';
      }

      Alert.alert('Erro', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Logo */}
      <View style={styles.logoContainer}>
        <Image source={logo} style={styles.logo} resizeMode="contain" />
        <Image source={logoName} style={styles.logoName} resizeMode="contain" />
      </View>

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        {/* Inputs */}
        <Input
          label="Nome de usuário"
          value={formData.name}
          onChangeText={text => setFormData({ ...formData, name: text })}
          placeholder="Digite seu nome"
          error={errors.name}
          autoCapitalize="words"
          maxLength={12}
          style={styles.input}
        />

        <Input
          label="E-mail"
          value={formData.email}
          onChangeText={text => setFormData({ ...formData, email: text })}
          placeholder="Digite seu e-mail"
          error={errors.email}
          autoCapitalize="none"
          keyboardType="email-address"
          style={styles.input}
        />

        <Input
          label="Confirmar E-mail"
          value={formData.confirmEmail}
          onChangeText={text => setFormData({ ...formData, confirmEmail: text })}
          placeholder="Repita seu e-mail"
          error={errors.confirmEmail}
          autoCapitalize="none"
          keyboardType="email-address"
          style={styles.input}
        />

        <Input
          label="Senha"
          value={formData.password}
          onChangeText={text => setFormData({ ...formData, password: text })}
          placeholder="Digite sua senha"
          secureTextEntry
          error={errors.password}
          style={styles.input}
        />

        <Input
          label="Confirmar Senha"
          value={formData.confirmPassword}
          onChangeText={text => setFormData({ ...formData, confirmPassword: text })}
          placeholder="Repita sua senha"
          secureTextEntry
          error={errors.confirmPassword}
          style={styles.input}
        />

        {/* Botão Criar Conta */}
        <Button title="Criar conta" onPress={handleRegister} loading={loading} />

        {/* Botão Já tem uma conta */}
        <TouchableOpacity
          onPress={() => navigation.navigate('Login')}
          style={styles.loginButton}
          activeOpacity={0.7}
        >
          <Text style={styles.loginText}>
            Já tem uma conta? <Text style={styles.loginLink}>Entrar</Text>
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingTop: 50,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  logo: {
    width: width * 0.32,
    height: width * 0.20,
    marginBottom: 2,
  },
  logoName: {
    width: width * 0.32,
    height: width * 0.20,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  input: {
    marginBottom: 12,
  },
  loginButton: {
    alignItems: 'center',
    marginTop: 10,
  },
  loginText: {
    fontSize: 15,
    color: '#666',
  },
  loginLink: {
    color: colors.primary,
    fontWeight: '600',
  },
});
