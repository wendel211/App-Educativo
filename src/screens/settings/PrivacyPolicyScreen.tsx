import React from 'react';
import { ScrollView, Text, StyleSheet, View } from 'react-native';
import { colors } from '../../styles/colors';

export const PrivacyPolicyScreen = () => {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Política de Privacidade</Text>
      
      <Text style={styles.paragraph}>
        Última atualização: {new Date().toLocaleDateString()}
      </Text>

      <Text style={styles.sectionTitle}>1. Coleta de Dados</Text>
      <Text style={styles.paragraph}>
        Este aplicativo coleta dados de saúde (passos, batimentos cardíacos, sono) através da integração com o Health Connect do Google, apenas com o seu consentimento explícito.
      </Text>

      <Text style={styles.sectionTitle}>2. Uso das Informações</Text>
      <Text style={styles.paragraph}>
        Os dados são utilizados exclusivamente para gerar gráficos e insights educacionais sobre sua saúde cardiovascular e controle de diabetes. Seus dados não são vendidos para terceiros.
      </Text>

      <Text style={styles.sectionTitle}>3. Exclusão de Dados</Text>
      <Text style={styles.paragraph}>
        Você tem o direito de solicitar a exclusão completa de sua conta e de todos os dados associados a qualquer momento através das configurações do aplicativo.
      </Text>
      
      <View style={{ height: 50 }} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: 20 },
  title: { fontSize: 24, fontFamily: 'Poppins-Bold', color: colors.primary, marginBottom: 10 },
  sectionTitle: { fontSize: 18, fontFamily: 'Poppins-Bold', color: colors.text, marginTop: 15, marginBottom: 5 },
  paragraph: { fontSize: 14, fontFamily: 'Poppins-Regular', color: '#555', lineHeight: 22, textAlign: 'justify' },
});