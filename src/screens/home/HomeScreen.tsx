import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Image,
  ImageSourcePropType,
  Platform,
  TouchableOpacity
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  useNavigation,
  DrawerActions,
  useFocusEffect
} from '@react-navigation/native';
import { TopicCard } from '../../components/education/TopicCard';
import { AwarenessCard } from '../../components/common/AwarenessCard';
import { colors } from '../../styles/colors';
import { usePoints } from '../../contexts/PointsContext';
import { useAuth } from '../../contexts/AuthContext';
import { awarenessTopics, topics } from '../../data/homeData';

export const HomeScreen: React.FC = () => {
  const navigation = useNavigation();
  const { user } = useAuth();
  const { totalPoints, refreshPoints } = usePoints();

 
  const [userName, setUserName] = useState<string>('Usuário');
  useEffect(() => {
    (async () => {
      if (user?.uid) {
        try {
          const { doc, getDoc } = await import('firebase/firestore');
          const { db } = await import('../../services/firebaseConfig');
          const ref = doc(db, 'users', user.uid);
          const snap = await getDoc(ref);
          const data = snap.exists() ? snap.data() : {};
          const nameFromDB = data.name as string | undefined;
          const storedName = await AsyncStorage.getItem('userName');
          const nameToUse = nameFromDB ?? user.displayName ?? storedName ?? 'Usuário';
          setUserName(nameToUse);
          await AsyncStorage.setItem('userName', nameToUse);
        } catch (e) {
          console.warn('Erro ao buscar nome do usuário:', e);
          const stored = await AsyncStorage.getItem('userName');
          setUserName(stored ?? user.displayName ?? 'Usuário');
        }
      }
    })();
  }, [user]);

  const badges = [
    require('../../assets/medalhas/Medalha_1.png'),
    require('../../assets/medalhas/Medalha_2.png'),
    require('../../assets/medalhas/Medalha_3.png'),
    require('../../assets/medalhas/Medalha_4.png'),
    require('../../assets/medalhas/Medalha_5.png'),
    require('../../assets/medalhas/Medalha_6.png'),
  ];
  const levelThreshold = 30; 
  const levelIndex = Math.min(Math.floor(totalPoints / levelThreshold), badges.length - 1);
  const badgeSource = badges[levelIndex];

  // --- Refresh Points on Focus ---
  useFocusEffect(
    useCallback(() => {
      refreshPoints();
    }, [refreshPoints])
  );

  const progressPercent = Math.min((totalPoints / 180) * 100, 100);

  const handleProfilePress = () => {
    navigation.dispatch(DrawerActions.openDrawer());
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        {/* Cabeçalho */}
        <View style={styles.header}>
          <TouchableOpacity onPress={handleProfilePress} style={styles.profileContainer}>
            <Image source={badgeSource} style={styles.badgeImage} />
            <View>
              <Text style={styles.greeting}>Olá, {userName}</Text>
              <View style={styles.progressWrapper}>
                <View style={[styles.progressBar, { width: `${progressPercent}%` }]} />
              </View>
              <Text style={styles.progressLabel}>{totalPoints} / 180 pontos</Text>
              {/* Texto Motivacional no header */}
     
            </View>
          </TouchableOpacity>
        </View>

        {/* Boas-vindas */}
        <View style={styles.welcomeSection}>
          <Text style={styles.initialTitle}>
            Aprenda a cuidar da saúde sendo portador de doenças cardiovasculares e diabetes. Ganhe pontos e aumente seu nível ao concluir os módulos!
          </Text>
          <View style={styles.divider} />
        </View>

        {/* Cards de awareness */}
        <View style={styles.awarenessSection}>
          {awarenessTopics.map(topic => (
            <AwarenessCard
              key={topic.id}
              title={topic.title}
              image={topic.image}
              onPress={() => navigation.navigate('ArticleDetailScreen', { topicId: topic.id })}
            />
          ))}
        </View>

        {/* Tópicos educativos */}
        <View style={styles.topicsSection}>
          <Text style={styles.sectionTitle}>Tópicos Educativos</Text>
          <Text style={styles.initialTitle}>
            Explore nossos tópicos educativos e cuide melhor da sua saúde.
          </Text>
          {topics.map(topic => (
            <TopicCard
              key={topic.id}
              title={topic.title}
              description={topic.description}
              icon={topic.icon}
              onPress={() => navigation.navigate('Topics', { category: topic.id, title: topic.title })}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { paddingBottom: 20 },
  header: {
    height: 200,
    justifyContent: 'center',
    backgroundColor: colors.primary,
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'ios' ? 50 : 30,
    paddingBottom: 16,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  profileContainer: { flexDirection: 'row', alignItems: 'center' },
  badgeImage: { width: 50, height: 50, marginRight: 10 },
  greeting: { fontSize: 22, color: '#fff', fontFamily: 'Poppins-Bold' },
  progressWrapper: { height: 8, width: 160, backgroundColor: '#ddd', borderRadius: 5, overflow: 'hidden', marginTop: 6 },
  progressBar: { height: '100%', backgroundColor: '#4CAF50' },
  progressLabel: { fontSize: 12, color: '#fff', fontFamily: 'Poppins-Regular', marginTop: 4 },
  motivationHeader: { fontSize: 14, color: '#E0F7FA', fontFamily: 'Poppins-Regular', marginTop: 8 },
  welcomeSection: { marginTop: 20, paddingHorizontal: 16 },
  initialTitle: { fontSize: 14, color: colors.text, marginBottom: 10, lineHeight: 22, fontFamily: 'Poppins-Regular' },
  divider: { height: 1, backgroundColor: colors.text, width: '100%', marginBottom: 10 },
  awarenessSection: { marginTop: 20, paddingHorizontal: 16 },
  topicsSection: { marginTop: 20, paddingHorizontal: 16 },
  sectionTitle: { fontSize: 22, color: colors.text, marginBottom: 10, fontFamily: 'Poppins-Bold' },
});
