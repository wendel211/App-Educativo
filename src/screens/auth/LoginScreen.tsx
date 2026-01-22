import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  Text,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { Input } from '../../components/common/Input';
import { Button } from '../../components/common/Button';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../../styles/colors'; 

import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';

WebBrowser.maybeCompleteAuthSession();

const { width } = Dimensions.get('window');

const logo = require('../../assets/images/LOGO.png');
const logoName = require('../../assets/images/NomeLOGO.png');
const googleLogo = require('../../assets/images/google_logo.png'); // logo do Google (PNG)

export const LoginScreen: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loadingEmail, setLoadingEmail] = useState(false);
  const [loadingGoogle, setLoadingGoogle] = useState(false);
  const [errors, setErrors] = useState({ email: '', password: '' });

  const { login: authLogin, loginWithGoogle } = useAuth();
  const navigation = useNavigation();

  // Auth Google
const [request, response, promptAsync] = Google.useAuthRequest({

    clientId: '197529378592-tgsdr8cefah6ij3sv4fb0vubgu45pao0.apps.googleusercontent.com',
    
    androidClientId: '197529378592-tgsdr8cefah6ij3sv4fb0vubgu45pao0.apps.googleusercontent.com',
  });

  useEffect(() => {
    if (response?.type === 'success' && response.authentication?.idToken) {
      handleGoogleLogin(response.authentication.idToken);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response]);

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
    setLoadingEmail(true);
    try {
      await authLogin(email, password);
    } catch (error: any) {
      Alert.alert('Erro', 'Não foi possível fazer login.');
    } finally {
      setLoadingEmail(false);
    }
  };

  // Login com Google
  const handleGoogleLogin = async (idToken: string) => {
    setLoadingGoogle(true);
    try {
      await loginWithGoogle(idToken);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível fazer login com Google.');
    } finally {
      setLoadingGoogle(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={logo} style={styles.logo} resizeMode="contain" />
        <Image source={logoName} style={styles.logoName} resizeMode="contain" />
      </View>

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

        <Button title="Entrar" onPress={handleLogin} loading={loadingEmail} />

        {/* Google Login Customizado */}
        <TouchableOpacity
          onPress={() => promptAsync()}
          disabled={!request || loadingGoogle}
          style={styles.googleButton}
          activeOpacity={0.7}
        >
          {loadingGoogle ? (
            <ActivityIndicator size="small" color="#4285F4" />
          ) : (
            <View style={styles.googleContent}>
              <Image source={googleLogo} style={styles.googleLogo} />
              <Text style={styles.googleButtonText}>Entrar com Google</Text>
            </View>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate('ForgotPassword' as never)}
          style={styles.forgotPasswordContainer}
        >
          <Text style={styles.forgotPasswordText}>Esqueceu a senha?</Text>
        </TouchableOpacity>
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
    marginBottom: 20,
  },
  logo: {
    width: width * 0.32,
    height: width * 0.20,
  },
  logoName: {
    width: width * 0.32,
    height: width * 0.20,
  },
  content: {
    width: '100%',
    alignItems: 'center',
    marginTop: 20,
  },
  googleButton: {
    marginTop: 18,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderColor: '#7B7583',
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 24,
    width: '100%',
    justifyContent: 'center',
    elevation: 1,
    shadowColor: '#7B7583',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 1,
  },
  googleContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  googleLogo: {
    width: 22,
    height: 22,
    marginRight: 12,
    resizeMode: 'contain',
  },
  googleButtonText: {
    color: '#005A57',
    fontWeight: 'bold',
    fontSize: 16,
    fontFamily: 'Roboto',
  },
  forgotPasswordContainer: {
    marginTop: 15,
  },
  forgotPasswordText: {
    top: 3,
    fontSize: 14,
    fontFamily: 'Poppins-Bold',
     color: colors.primary,
    fontWeight: '600',
  },
});

export default LoginScreen;
