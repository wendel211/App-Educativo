import * as Notifications from 'expo-notifications';

export const scheduleNotification = async (title: string, body: string, hour: number, minute: number) => {
  await Notifications.scheduleNotificationAsync({
    content: {
      title,
      body,
      sound: 'default',
    },
    trigger: {
      hour,
      minute,
      repeats: true,
    },
  });
};


export const scheduleDailyRegisterReminder = async () => {
  await Notifications.cancelScheduledNotificationAsync('daily-register');

  await Notifications.scheduleNotificationAsync({
    content: {
      title: '🩺 Registro de Indicadores',
      body: 'Lembre-se de registrar sua glicemia, peso e batimentos hoje!',
      sound: 'default',
    },
    trigger: {
      hour: 19, 
      minute: 0,
      repeats: true,
    },
    identifier: 'daily-register',
  });
};


export const scheduleMotivationNotification = async () => {
  await Notifications.cancelScheduledNotificationAsync('motivation');

  await Notifications.scheduleNotificationAsync({
    content: {
      title: '💙 Cuide da sua Saúde!',
      body: 'Seu futuro agradece os cuidados que você tem hoje. Continue firme!',
      sound: 'default',
    },
    trigger: {
      seconds: 86400 * 3, 
      repeats: true,
    },
    identifier: 'motivation',
  });
};
