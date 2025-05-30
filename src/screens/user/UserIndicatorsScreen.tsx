import React, { useState, useEffect, useCallback } from 'react';
import { ScrollView, View, Text, StyleSheet, Platform, StatusBar } from 'react-native';
import { colors } from '../../styles/colors';
import { useNavigation } from '@react-navigation/native';

import AddAlertModal from '../../components/alerts/AddAlertModal';
import AddIndicatorModal from '../../components/health/AddIndicatorModal';

import HealthConnectSection from '../../components/health/HealthConnectSection'; 
import AlertList from '../../components/alerts/AlertList';
import IndicatorList from '../../components/health/IndicatorList';

import { getUserAlerts, deleteAlert } from '../../services/alertService';
import { getRecentIndicators, deleteIndicator } from '../../services/indicatorService';

export const UserIndicatorsScreen: React.FC = () => {
  const navigation = useNavigation();

  // States for Modals
  const [showAddAlertModal, setShowAddAlertModal] = useState(false);
  const [showAddIndicatorModal, setShowAddIndicatorModal] = useState(false);

  // Alert & Indicator states
  const [alerts, setAlerts] = useState<any[]>([]);
  const [indicators, setIndicators] = useState<any[]>([]);

  // Loaders
  const loadAlerts = useCallback(async () => {
    try {
      setAlerts(await getUserAlerts());
    } catch (e) { /* error log */ }
  }, []);
  
  const loadIndicators = useCallback(async () => {
    try {
      setIndicators(await getRecentIndicators());
    } catch (e) { /* error log */ }
  }, []);
  
  useEffect(() => { 
    loadAlerts(); 
    loadIndicators(); 
  }, [loadAlerts, loadIndicators]);

  // Handlers
  const handleDeleteAlert = async (id: string) => { 
    await deleteAlert(id); 
    loadAlerts(); 
  };
  
  const handleDeleteIndicator = async (id: string) => { 
    await deleteIndicator(id); 
    loadIndicators(); 
  };

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor={colors.primary} />
      <View style={styles.container}>
        {/* Header Melhorado */}
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <View style={styles.headerTextContainer}>
              <Text style={styles.headerTitle}>Saúde & Bem-estar</Text>
              <Text style={styles.headerSubtitle}>
                Acompanhe seus dados de saúde e lembretes importantes
              </Text>
            </View>
            {/* Decoração do header */}
            <View style={styles.headerDecoration}>
              <View style={styles.decorationCircle1} />
              <View style={styles.decorationCircle2} />
              <View style={styles.decorationCircle3} />
            </View>
          </View>
        </View>

        <ScrollView 
          style={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Saúde via Health Connect - Seção principal */}
          {Platform.OS === 'android' && (
            <View style={styles.healthSection}>
              <HealthConnectSection />
            </View>
          )}

          {/* Container para Alertas e Indicadores */}
          <View style={styles.sectionsContainer}>
            {/* Alertas */}
            <View style={styles.sectionWrapper}>
              <AlertList
                alerts={alerts}
                onAdd={() => setShowAddAlertModal(true)}
                onDelete={handleDeleteAlert}
              />
            </View>

            {/* Indicadores */}
            <View style={styles.sectionWrapper}>
              <IndicatorList
                indicators={indicators}
                onAdd={() => setShowAddIndicatorModal(true)}
                onShowHistory={() => navigation.navigate('IndicatorHistoryScreen' as never)}
                onDelete={handleDeleteIndicator}
              />
            </View>
          </View>

          {/* Espaçamento inferior */}
          <View style={styles.bottomSpacer} />
        </ScrollView>

        {/* Modais */}
        <AddAlertModal 
          visible={showAddAlertModal} 
          onClose={() => setShowAddAlertModal(false)} 
          onSaved={loadAlerts} 
        />
        <AddIndicatorModal 
          visible={showAddIndicatorModal} 
          onClose={() => setShowAddIndicatorModal(false)} 
          onSaved={loadIndicators} 
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    backgroundColor: colors.primary,
    paddingTop: Platform.OS === 'ios' ? 60 : 50,
    paddingBottom: 32,
    paddingHorizontal: 24,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    elevation: 8,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 16,
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
    color: 'rgba(255, 255, 255, 0.85)',
    lineHeight: 22,
    maxWidth: '85%',
  },
  headerDecoration: {
    position: 'absolute',
    right: -20,
    top: -10,
    opacity: 0.1,
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
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  healthSection: {
    marginTop: -12, 
    zIndex: 1,
  },
  sectionsContainer: {
    paddingHorizontal: 20,
    marginTop: 8,
  },
  sectionWrapper: {
    marginBottom: 24,
  },
  bottomSpacer: {
    height: 32,
  },
});