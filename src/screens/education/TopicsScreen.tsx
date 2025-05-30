// src/screens/education/TopicsScreen.tsx
import React, { useState, useEffect } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, ScrollView,
  StatusBar, SafeAreaView, Platform, AccessibilityInfo
} from 'react-native';
import { colors } from '../../styles/colors';
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const diseases = [
  { id: '1', title: 'Insuficiência Cardíaca', icon: 'heart', color: '#FF6B6B', description: 'Aprenda sobre prevenção e cuidados' },
  { id: '2', title: 'Doenças Cardíacas Congênitas', icon: 'heartbeat', color: '#4ECDC4', description: 'Entenda as condições desde o nascimento' },
  { id: '3', title: 'Doenças das Valvas Cardíacas', icon: 'heart', color: '#45B7D1', description: 'Conheça os cuidados específicos' },
  { id: '4', title: 'Doenças do Miocárdio', icon: 'stethoscope', color: '#96CEB4', description: 'Saiba mais sobre o músculo cardíaco' },
  { id: '5', title: 'Diabetes Tipo 1', icon: 'syringe', color: '#FECA57', description: 'Controle e monitoramento diário' },
  { id: '6', title: 'Diabetes Tipo 2', icon: 'tablets', color: '#FF9FF3', description: 'Prevenção e estilo de vida saudável' },
];

export const TopicsScreen: React.FC = () => {
  const navigation = useNavigation();
  const [screenReaderEnabled, setScreenReaderEnabled] = useState(false);

  useEffect(() => {
    AccessibilityInfo.isScreenReaderEnabled().then(setScreenReaderEnabled);
    const listener = AccessibilityInfo.addEventListener('screenReaderChanged', setScreenReaderEnabled);
    return () => listener?.remove();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={colors.primary} barStyle="light-content" />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        
        {/* HEADER */}
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <View style={styles.headerTextContainer}>
              <Text style={styles.headerTitle}>Tópicos Educacionais</Text>
              <Text style={styles.headerSubtitle}>
                Complete módulos para evoluir seu nível!
              </Text>
            </View>
            <View style={styles.headerDecoration}>
              <View style={styles.decorationCircle1} />
              <View style={styles.decorationCircle2} />
              <View style={styles.decorationCircle3} />
            </View>
          </View>
        </View>

        {/* INTRO */}
        <View style={styles.welcomeSection}>
          <Text style={styles.initialText}>
            Escolha um módulo, avance no seu aprendizado e ganhe <Text style={styles.highlightText}>10 pontos</Text> por conclusão.
          </Text>
          <View style={styles.divider} />
        </View>

        {/* LISTA DE TÓPICOS */}
        <View style={styles.topicsSection}>
          <Text style={styles.sectionTitle}>Condições de Saúde</Text>
          <Text style={styles.initialText}>
            Toque para acessar módulos e acumular pontos.
          </Text>
          <View style={styles.topicsContainer}>
            {diseases.map(disease => (
              <TouchableOpacity
                key={disease.id}
                style={styles.topicCard}
                onPress={() => navigation.navigate('DiseaseDetailScreen', { diseaseId: disease.id })}
                activeOpacity={0.8}
                accessibilityLabel={`${disease.title}. ${disease.description}. Toque para saber mais.`}
                accessibilityRole="button"
              >
                <View style={styles.cardContent}>
                  <View style={[styles.iconContainer, { backgroundColor: disease.color }]}>
                    <FontAwesome5 name={disease.icon} size={24} color="#FFF" />
                  </View>
                  <View style={styles.textContainer}>
                    <Text style={styles.cardTitle}>{disease.title}</Text>
                    <Text style={styles.cardDescription}>{disease.description}</Text>
                    <View style={styles.pointsContainer}>
                      <FontAwesome5 name="trophy" size={12} color={colors.primary} />
                      <Text style={styles.pointsText}>até 30 pontos</Text>
                    </View>
                  </View>
                  <View style={styles.arrowContainer}>
                    <FontAwesome5 name="chevron-right" size={16} color={colors.secondary} />
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* DICA FINAL */}
        <View style={styles.tipSection}>
          <View style={styles.tipCard}>
            <FontAwesome5 name="lightbulb" size={16} color="#FFA726" style={styles.tipIcon} />
            <Text style={styles.tipText}>
              Acesse a tela inicial para ver seu progresso!
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { paddingBottom: 32 },
  header: {
    backgroundColor: colors.primary,
    paddingTop: Platform.OS === 'ios' ? 60 : 50,
    paddingBottom: 32,
    paddingHorizontal: 24,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    elevation: 8,
    shadowColor: '#000',
    shadowOpacity: 0.18,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 8 },
    position: 'relative',
    overflow: 'hidden',
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTextContainer: {
    flex: 1,
    zIndex: 2,
  },
  headerTitle: {
    fontSize: 28,
    fontFamily: 'Poppins-Bold',
    color: '#fff',
    marginBottom: 6,
    letterSpacing: -0.5,
  },
  headerSubtitle: {
    fontSize: 15,
    fontFamily: 'Poppins-Regular',
    color: 'rgba(255,255,255,0.9)',
    lineHeight: 22,
    maxWidth: '85%',
  },
  headerDecoration: {
    position: 'absolute',
    right: -24,
    top: -12,
    opacity: 0.08,
  },
  decorationCircle1: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#fff',
    position: 'absolute',
  },
  decorationCircle2: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#fff',
    position: 'absolute',
    top: 40,
    right: 30,
  },
  decorationCircle3: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#fff',
    position: 'absolute',
    top: 80,
    right: -10,
  },

  title: {
    fontSize: 26,
    color: '#FFF',
    textAlign: 'center',
    marginBottom: 8,
    fontFamily: 'Poppins-Bold',
  },
  subtitle: {
    fontSize: 15,
    color: '#FFF',
    textAlign: 'center',
    opacity: 0.88,
    fontFamily: 'Poppins-Regular',
    lineHeight: 20,
    paddingHorizontal: 8,
  },
  welcomeSection: { marginTop: 22, paddingHorizontal: 24, marginBottom: 10 },
  initialText: { fontSize: 15, color: colors.text, marginBottom: 12, lineHeight: 22, fontFamily: 'Poppins-Regular' },
  highlightText: { color: colors.primary, fontFamily: 'Poppins-Bold' },
  divider: { height: 1, backgroundColor: 'rgba(0,0,0,0.07)', width: '100%', marginVertical: 7 },
  topicsSection: { marginTop: 20, paddingHorizontal: 24 },
  sectionTitle: { fontSize: 20, color: colors.text, marginBottom: 7, fontFamily: 'Poppins-Bold' },
  topicsContainer: { marginTop: 14, gap: 14 },
  topicCard: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 18,
    marginBottom: 2,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.07,
    shadowRadius: 7,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.03)',
  },
  cardContent: { flexDirection: 'row', alignItems: 'center' },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 13,
  },
  textContainer: { flex: 1, marginRight: 8 },
  cardTitle: { fontSize: 17, color: colors.text, fontFamily: 'Poppins-Bold', marginBottom: 3 },
  cardDescription: { fontSize: 13, color: colors.textSecondary, fontFamily: 'Poppins-Regular', lineHeight: 18, marginBottom: 7 },
  pointsContainer: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  pointsText: { fontSize: 11, color: colors.primary, fontFamily: 'Poppins-Medium' },
  arrowContainer: { justifyContent: 'center', alignItems: 'center', width: 22, height: 22 },
  tipSection: { marginTop: 25, paddingHorizontal: 24 },
  tipCard: {
    backgroundColor: '#FFF8E1',
    borderRadius: 12,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    borderLeftWidth: 4,
    borderLeftColor: '#FFA726',
  },
  tipIcon: { marginRight: 10 },
  tipText: { flex: 1, fontSize: 12, color: '#E65100', fontFamily: 'Poppins-Regular', lineHeight: 16 },
});

export default TopicsScreen;
