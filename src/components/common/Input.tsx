// src/components/common/Input.tsx
import React from 'react';
import { View, TextInput, Text, StyleSheet, TextInputProps } from 'react-native';
import { colors } from '../../styles/colors';

// Alteração 1: Estendemos TextInputProps para aceitar style, cursorColor, etc.
interface InputProps extends TextInputProps {
  value: string;
  onChangeText: (text: string) => void;
  error?: string;
  label?: string;
}

export const Input: React.FC<InputProps> = ({
  value,
  onChangeText,
  error,
  label,
  style,
  ...props // Captura todas as outras propriedades (secureTextEntry, placeholder, etc.)
}) => {
  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        // Alteração 2: Mesclamos o style recebido e forçamos a cor preta no styles.input abaixo
        style={[styles.input, !!error && styles.inputError, style]}
        value={value}
        onChangeText={onChangeText}
        placeholderTextColor="#999"
        {...props} // Repassa as props para o componente nativo
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    width: '100%',
  },
  label: {
    fontSize: 14,
    marginBottom: 8,
    color: colors.text,
  },
  input: {
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#fdfdfdff',
    color: '#000000', 
  },
  inputError: {
    borderColor: colors.error,
  },
  errorText: {
    color: colors.error,
    fontSize: 12,
    marginTop: 4,
  },
});