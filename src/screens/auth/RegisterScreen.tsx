import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Alert, Image, Dimensions } from 'react-native';
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
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    const newErrors = { name: '', email: '', password: '', confirmPassword: '' };

    if (!formData.name.trim()) {
      newErrors.name = 'Nome é obrigatório';
    }

    if (!formData.email) {
      newErrors.email = 'E-mail é obrigatório';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'E-mail inválido';
    }

    if (!formData.password) {
      newErrors.password = 'Senha é obrigatória';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Senha deve ter no mínimo 6 caracteres';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'As senhas não coincidem';
    }

    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error !== '');
  };

  const handleRegister = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      // Passa o name para a função de registro
      await register(formData.email.trim(), formData.password, formData.name.trim());
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
      <View style={styles.logoContainer}>
        <Image source={logo} style={styles.logo} resizeMode="contain" />
        <Image source={logoName} style={styles.logoName} resizeMode="contain" />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Input
          label="Nome de usuário"
          value={formData.name}
          onChangeText={text => setFormData({ ...formData, name: text })}
          placeholder="Digite seu nome"
          error={errors.name}
          autoCapitalize="words"
        />

        <Input
          label="E-mail"
          value={formData.email}
          onChangeText={text => setFormData({ ...formData, email: text })}
          placeholder="Digite seu e-mail"
          error={errors.email}
          autoCapitalize="none"
          keyboardType="email-address"
        />

        <Input
          label="Senha"
          value={formData.password}
          onChangeText={text => setFormData({ ...formData, password: text })}
          placeholder="Digite sua senha"
          secureTextEntry
          error={errors.password}
        />

        <Input
          label="Confirmar Senha"
          value={formData.confirmPassword}
          onChangeText={text => setFormData({ ...formData, confirmPassword: text })}
          placeholder="Confirme sua senha"
          secureTextEntry
          error={errors.confirmPassword}
        />

        <Button title="Criar conta" onPress={handleRegister} loading={loading} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingTop: 50,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 20,
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
    padding: 20,
  },
});

export default RegisterScreen;
