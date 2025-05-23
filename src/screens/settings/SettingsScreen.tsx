import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Switch, Platform, Linking, Alert, TouchableOpacity } from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { scheduleDailyRegisterReminder, scheduleMotivationNotification } from '../../services/notificationService';
import * as Notifications from 'expo-notifications';
import { colors } from '../../styles/colors';

export const SettingsScreen: React.FC = () => {
  const [registerReminder, setRegisterReminder] = useState(false);
  const [motivationReminder, setMotivationReminder] = useState(false);

  useEffect(() => {
    (async () => {
      const reg = await AsyncStorage.getItem('registerReminder');
      const mot = await AsyncStorage.getItem('motivationReminder');
      setRegisterReminder(reg === 'true');
      setMotivationReminder(mot === 'true');
    })();
  }, []);

  const handleToggleRegister = async (value: boolean) => {
    setRegisterReminder(value);
    await AsyncStorage.setItem('registerReminder', value.toString());
    if (value) {
      await scheduleDailyRegisterReminder();
    } else {
      const ids = await Notifications.getAllScheduledNotificationsAsync();
      ids.forEach(item => {
        if (item.identifier === 'daily-register') {
          Notifications.cancelScheduledNotificationAsync(item.identifier);
        }
      });
    }
  };

  const handleToggleMotivation = async (value: boolean) => {
    setMotivationReminder(value);
    await AsyncStorage.setItem('motivationReminder', value.toString());
    if (value) {
      await scheduleMotivationNotification();
    } else {
      const ids = await Notifications.getAllScheduledNotificationsAsync();
      ids.forEach(item => {
        if (item.identifier === 'motivation') {
          Notifications.cancelScheduledNotificationAsync(item.identifier);
        }
      });
    }
  };

  const handleFeedback = () => {
    const url = 'https://wa.me/5599999999999?text=Olá! Preciso de ajuda com o app.';
    Linking.openURL(url).catch(() => {
      Alert.alert('Erro', 'Não foi possível abrir o WhatsApp');
    });
  };

  const handleEmail = () => {
    const email = 'mailto:suporte@app.com?subject=Suporte%20App&body=Olá,%20preciso%20de%20ajuda%20com%20o%20aplicativo.';
    Linking.openURL(email).catch(() => {
      Alert.alert('Erro', 'Não foi possível abrir o cliente de e-mail');
    });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Configurações</Text>
        <Text style={styles.headerSubtitle}>Personalize sua experiência no aplicativo</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Notificações</Text>

        <View style={styles.settingItem}>
          <Ionicons name="notifications-outline" size={24} color={colors.primary} />
          <View style={styles.textContainer}>
            <Text style={styles.title}>Lembrete de Registro Diário</Text>
            <Text style={styles.subtitle}>Receba notificações diárias para registrar seus indicadores</Text>
          </View>
          <Switch
            value={registerReminder}
            onValueChange={handleToggleRegister}
            thumbColor={registerReminder ? colors.primary : '#f4f3f4'}
            trackColor={{ false: '#767577', true: colors.primary }}
          />
        </View>

        <View style={styles.settingItem}>
          <Ionicons name="heart-outline" size={24} color={colors.primary} />
          <View style={styles.textContainer}>
            <Text style={styles.title}>Notificações Motivacionais</Text>
            <Text style={styles.subtitle}>Receba mensagens de incentivo para cuidar da sua saúde</Text>
          </View>
          <Switch
            value={motivationReminder}
            onValueChange={handleToggleMotivation}
            thumbColor={motivationReminder ? colors.primary : '#f4f3f4'}
            trackColor={{ false: '#767577', true: colors.primary }}
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Suporte e Feedback</Text>
        <TouchableOpacity style={styles.supportButton} onPress={handleFeedback}>
          <Feather name="message-circle" size={20} color="#fff" />
          <Text style={styles.supportText}>Fale conosco no WhatsApp</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.supportButton} onPress={handleEmail}>
          <Feather name="mail" size={20} color="#fff" />
          <Text style={styles.supportText}>Enviar e-mail para suporte</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: {
    justifyContent: 'center',
    backgroundColor: colors.primary,
    paddingHorizontal: 24,
    paddingTop: Platform.OS === 'ios' ? 50 : 40,
    paddingBottom: 24,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 5 },
  },
  headerTitle: { fontSize: 24, fontFamily: 'Poppins-Bold', color: '#fff', marginBottom: 4 },
  headerSubtitle: { fontSize: 14, fontFamily: 'Poppins-Regular', color: '#fff' },
  section: { marginTop: 24, paddingHorizontal: 24 },
  sectionTitle: { fontSize: 20, fontFamily: 'Poppins-Bold', color: colors.text, marginBottom: 16 },

  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    elevation: 2,
    marginBottom: 16,
  },
  textContainer: { flex: 1, marginHorizontal: 12 },
  title: { fontSize: 16, fontFamily: 'Poppins-Bold', color: colors.text, marginBottom: 4 },
  subtitle: { fontSize: 13, fontFamily: 'Poppins-Regular', color: colors.text },

  supportButton: {
    flexDirection: 'row',
    backgroundColor: colors.primary,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 12,
  },
  supportText: {
    color: '#fff',
    fontFamily: 'Poppins-Bold',
    marginLeft: 10,
    fontSize: 14,
  },
});

export default SettingsScreen;
