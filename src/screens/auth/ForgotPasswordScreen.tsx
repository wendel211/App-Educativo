import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Alert, Image, Dimensions, TouchableOpacity, Text } from 'react-native';
import { Input } from '../../components/common/Input';
import { Button } from '../../components/common/Button';
import { colors } from '../../styles/colors';

const { width } = Dimensions.get('window');
const logo = require('../../assets/images/LOGO.png');
const logoName = require('../../assets/images/NomeLOGO.png');

type ForgotPasswordScreenProps = {
  navigation: any;
};

export const ForgotPasswordScreen: React.FC<ForgotPasswordScreenProps> = ({ navigation }) => {
  const [formData, setFormData] = useState({
    email: '',
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    if (!formData.email) {
      setError('E-mail é obrigatório');
      return false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
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
      console.log('Forgot Password:', formData);
      // Aqui você pode implementar a lógica de recuperação de senha
      Alert.alert('Sucesso', 'E-mail de recuperação enviado!');
      navigation.navigate('Login');
    } catch (error) {
      Alert.alert('Erro', 'Erro ao enviar e-mail de recuperação');
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

      <ScrollView 
        style={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Input
          label="E-mail"
          value={formData.email}
          onChangeText={(text) => setFormData({ ...formData, email: text })}
          placeholder="Digite seu e-mail"
          error={error}
          autoCapitalize="none"
        />

        <Button
          title="Recuperar Senha"
          onPress={handleForgotPassword}
          loading={loading}
        />

        {/* Opção de voltar */}
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backContainer}>
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
  backContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  backText: {
    color: colors.primary || '#007bff',
    textDecorationLine: 'underline',
  },
});
