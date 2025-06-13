import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Image,
  Platform,
  TouchableOpacity,
  AccessibilityInfo,
  StatusBar,
  Modal
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
  const [screenReaderEnabled, setScreenReaderEnabled] = useState<boolean>(false);

  const maxPoints = 150;

  const levelUpMessages = [
    'Você está indo muito bem! Continue aprendendo e crescendo!',
    'Impressionante! Você está se tornando um especialista em saúde!',
    'Incrível progresso! Sua dedicação está fazendo diferença!',
    'Você é inspirador! Continue nesse caminho de autocuidado!',
    'Extraordinário! Você alcançou o nível máximo de conhecimento!'
  ];
  const welcomeMessage =
    'Bem-vindo! Este app ajuda você a aprender sobre saúde cardiovascular e diabetes. Ganhe pontos completando módulos e suba de nível para acompanhar seu progresso!';
  const [showLevelUp, setShowLevelUp] = useState(false);
  const [levelUpMessage, setLevelUpMessage] = useState('');
  const previousLevelRef = useRef<number>(0);

  // Verificar acessibilidade
  useEffect(() => {
    const checkScreenReader = async () => {
      const isEnabled = await AccessibilityInfo.isScreenReaderEnabled();
      setScreenReaderEnabled(isEnabled);
    };
    checkScreenReader();
    const listener = AccessibilityInfo.addEventListener(
      'screenReaderChanged',
      setScreenReaderEnabled
    );
    return () => listener?.remove();
  }, []);

  // Buscar nome do usuário
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

  // Definir medalhas e níveis
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
  const currentLevel = levelIndex + 1;
  const badgeSource = badges[levelIndex];

  // Exibir boas-vindas apenas na primeira vez
  useEffect(() => {
    (async () => {
      const hasSeenWelcome = await AsyncStorage.getItem('hasSeenWelcome');
      if (!hasSeenWelcome) {
        setLevelUpMessage(welcomeMessage);
        setShowLevelUp(true);
        await AsyncStorage.setItem('hasSeenWelcome', 'true');
      }
      previousLevelRef.current = currentLevel;
    })();
  }, [currentLevel]);

  // Detectar aumento de nível (>1)
  useEffect(() => {
    const prevLevel = previousLevelRef.current;
    if (currentLevel > prevLevel && prevLevel > 0) {
      const message = levelUpMessages[prevLevel - 1] || '';
      setLevelUpMessage(message);
      setShowLevelUp(true);
    }
    previousLevelRef.current = currentLevel;
  }, [currentLevel]);

  // Atualizar pontos ao focar na tela
  useFocusEffect(
    useCallback(() => {
      refreshPoints();
    }, [refreshPoints])
  );

  // Cálculo de progresso e cor dinâmica
  const progressPercent = Math.min((totalPoints / maxPoints) * 100, 100);
  const isMax = totalPoints >= maxPoints;
  const barColor = isMax ? '#FFD700' : '#4CAF50';
  const pointsRemaining = Math.max(maxPoints - totalPoints, 0);

  const handleProfilePress = () => navigation.dispatch(DrawerActions.openDrawer());

  return (
    <SafeAreaView style={styles.container} accessible={false}>
      <StatusBar backgroundColor={colors.primary} barStyle="light-content" />

      {/* Modal de Boas-vindas / Level Up */}
      <Modal
        visible={showLevelUp}
        transparent
        animationType="fade"
        onRequestClose={() => setShowLevelUp(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle} accessibilityRole="header">
              {previousLevelRef.current === currentLevel ? 'Parabéns!' : 'Você subiu de nível!'}
            </Text>
            <Text style={styles.modalMessage}>{levelUpMessage}</Text>
            <TouchableOpacity onPress={() => setShowLevelUp(false)} style={styles.modalButton} accessibilityRole="button">
              <Text style={styles.modalButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator>
        {/* Cabeçalho */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={handleProfilePress}
            style={styles.profileContainer}
            accessible
            accessibilityLabel={`Abrir perfil. Olá ${userName}. Você está no nível ${currentLevel} com ${totalPoints} de ${maxPoints} pontos.`}
            accessibilityRole="button"
            accessibilityHint="Toque para abrir o menu lateral"
          >
            <Image
              source={badgeSource}
              style={styles.badgeImage}
              accessible
              accessibilityLabel={`Medalha de nível ${currentLevel}`}
              accessibilityRole="image"
            />
            <View style={styles.userInfoContainer}>
              <Text style={styles.greeting}>Olá, {userName}</Text>
              <View
                style={styles.progressContainer}
                accessible
                accessibilityLabel={`Progresso: ${totalPoints} de ${maxPoints} pontos. Faltam ${pointsRemaining} pontos.`}
              >
                <View style={styles.progressWrapper}>
                  <View style={[styles.progressBar, { width: `${progressPercent}%`, backgroundColor: barColor }]} />
                </View>
                <Text style={styles.progressLabel}>{totalPoints} / {maxPoints} pontos</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>

        {/* Boas-vindas */}
        <View style={styles.welcomeSection} accessible accessibilityRole="text" accessibilityLabel="Seção de boas-vindas">
          <Text style={styles.initialText} accessibilityRole="header">
            Aprenda a como cuidar da saúde sendo portador de doenças cardiovasculares e diabetes. Ganhe pontos e aumente seu nível ao concluir os módulos!
          </Text>
          <View style={styles.divider} />
        </View>

        {/* Artigos de conscientização */}
        <View style={styles.awarenessSection} accessible accessibilityRole="text" accessibilityLabel="Seção de dicas de saúde importantes">
          <Text style={styles.sectionTitle}>Dicas Importantes</Text>
          <View style={styles.awarenessCardContainer}>
            {awarenessTopics.map(topic => (
              <AwarenessCard
                key={topic.id}
                title={topic.title}
                image={topic.image}
                onPress={() => navigation.navigate('ArticleDetailScreen', { topicId: topic.id })}
              />
            ))}
          </View>
        </View>

        {/* Tópicos educativos */}
        <View style={styles.topicsSection} accessible accessibilityRole="text" accessibilityLabel="Seção de tópicos educativos sobre saúde">
          <Text style={styles.sectionTitle}>Tópicos Educativos</Text>
          <Text style={styles.initialText}>
            Explore nossos tópicos educativos e cuide melhor da sua saúde.
          </Text>
          <View style={styles.topicsCardContainer}>
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
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { paddingBottom: 32 },
  header: {
    minHeight: 180,
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
    shadowOffset: { width: 0, height: 5 }
  },
  profileContainer: { flexDirection: 'row', alignItems: 'center', paddingVertical: 8 },
  badgeImage: { width: 64, height: 64, marginRight: 16, borderRadius: 32 },
  userInfoContainer: { flex: 1 },
  greeting: { fontSize: 22, color: '#FFFFFF', fontFamily: 'Poppins-Bold', marginBottom: 8 },
  progressContainer: { marginTop: 4 },
  progressWrapper: {
    height: 12,
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 6,
    overflow: 'hidden'
  },
  progressBar: { height: '100%' },
  progressLabel: { fontSize: 14, color: '#FFFFFF', fontFamily: 'Poppins-Medium', marginTop: 6 },
  welcomeSection: { marginTop: 24, paddingHorizontal: 24, marginBottom: 12 },
  initialText: { fontSize: 16, color: colors.text, marginBottom: 16, lineHeight: 24, fontFamily: 'Poppins-Regular' },
  divider: { height: 1, backgroundColor: 'rgba(0, 0, 0, 0.1)', width: '100%', marginVertical: 8 },
  awarenessSection: { marginTop: 24, paddingHorizontal: 24 },
  awarenessCardContainer: { marginTop: 16, gap: 16 },
  topicsSection: { marginTop: 32, paddingHorizontal: 24 },
  topicsCardContainer: { marginTop: 16, gap: 20 },
  sectionTitle: { fontSize: 22, color: colors.text, marginBottom: 8, fontFamily: 'Poppins-Bold', letterSpacing: 0.25 },
  modalContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' },
  modalContent: { backgroundColor: '#FFFFFF', padding: 24, borderRadius: 8, alignItems: 'center', marginHorizontal: 32 },
  modalTitle: { fontSize: 20, fontFamily: 'Poppins-Bold', marginBottom: 12, textAlign: 'center' },
  modalMessage: { fontSize: 16, fontFamily: 'Poppins-Regular', marginBottom: 20, textAlign: 'center' },
  modalButton: { paddingVertical: 8, paddingHorizontal: 24, borderRadius: 4, backgroundColor: colors.primary },
  modalButtonText: { color: '#FFFFFF', fontSize: 16, fontFamily: 'Poppins-Medium' }
});
