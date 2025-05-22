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
