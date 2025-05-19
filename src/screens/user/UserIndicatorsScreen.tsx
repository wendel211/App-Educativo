import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Alert,
  FlatList,
  Modal,
  Platform,
  TouchableOpacity,
  Dimensions
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Card, Button, Divider, IconButton } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import { colors } from '../../styles/colors';

const { width } = Dimensions.get('window');
const CARD_WIDTH = 250;

export const UserIndicatorsScreen = () => {
  // Estados para indicadores
  const [weight, setWeight] = useState('');
  const [glucose, setGlucose] = useState('');
  const [heartRate, setHeartRate] = useState('');
  const [records, setRecords] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [activeRecordIndex, setActiveRecordIndex] = useState(0);

  // Estados para metas
  const [goals, setGoals] = useState([]);
  const [goalModalVisible, setGoalModalVisible] = useState(false);
  const [newGoalTitle, setNewGoalTitle] = useState('');
  const [newGoalTarget, setNewGoalTarget] = useState('');
  const [newGoalCurrent, setNewGoalCurrent] = useState('');
  const [editingGoal, setEditingGoal] = useState(null);

  useEffect(() => {
    loadRecords();
  }, []);

  // Salva novo registro de indicador
  const saveRecord = async () => {
    if (!selectedDate || !weight || !glucose || !heartRate) {
      Alert.alert('Erro', 'Todos os campos são obrigatórios!');
      return;
    }

    const newRecord = {
      id: Date.now(),
      date: selectedDate.toISOString(),
      weight,
      glucose,
      heartRate,
    };

    const updatedRecords = [newRecord, ...records];

    try {
      await AsyncStorage.setItem('userIndicators', JSON.stringify(updatedRecords));
      setRecords(updatedRecords);
      setWeight('');
      setGlucose('');
      setHeartRate('');
      setModalVisible(false);
    } catch (error) {
      console.error('Erro ao salvar:', error);
    }
  };

  // Carrega registros
  const loadRecords = async () => {
    try {
      const storedRecords = await AsyncStorage.getItem('userIndicators');
      if (storedRecords) {
        const parsedRecords = JSON.parse(storedRecords);
        setRecords(Array.isArray(parsedRecords) ? parsedRecords : []);
      }
    } catch (error) {
      console.error('Erro ao carregar registros:', error);
      setRecords([]);
    }
  };

  const deleteRecord = async (id) => {
    const updatedRecords = records.filter((item) => item.id !== id);
    try {
      await AsyncStorage.setItem('userIndicators', JSON.stringify(updatedRecords));
      setRecords(updatedRecords);
    } catch (error) {
      console.error('Erro ao excluir:', error);
    }
  };

  // Funções para metas
  const addOrUpdateGoal = () => {
    if (!newGoalTitle || !newGoalTarget) {
      Alert.alert('Erro', 'Preencha título e meta');
      return;
    }
    if (editingGoal) {
      // Atualiza meta existente
      const updatedGoals = goals.map(goal => {
        if (goal.id === editingGoal) {
          return {
            ...goal,
            title: newGoalTitle,
            target: parseFloat(newGoalTarget),
            current: parseFloat(newGoalCurrent) || 0,
          };
        }
        return goal;
      });
      setGoals(updatedGoals);
    } else {
      // Adiciona nova meta
      const goal = {
        id: Date.now(),
        title: newGoalTitle,
        target: parseFloat(newGoalTarget),
        current: parseFloat(newGoalCurrent) || 0,
      };
      setGoals([...goals, goal]);
    }
    setNewGoalTitle('');
    setNewGoalTarget('');
    setNewGoalCurrent('');
    setEditingGoal(null);
    setGoalModalVisible(false);
  };

  const getProgressBarColor = (percentage) => {
    if (percentage < 0.5) return '#FF5C5C';
    if (percentage < 0.8) return '#F7B801';
    return '#4CAF50';
  };

  // Atualiza o índice ativo conforme a rolagem
  const handleRecordScroll = (event) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / CARD_WIDTH);
    setActiveRecordIndex(index);
  };

  // Pontos de paginação para os registros
  const renderPagination = () => (
    <View style={styles.paginationContainer}>
      {records.map((_, index) => (
        <View
          key={index}
          style={[
            styles.dot,
            activeRecordIndex === index && styles.activeDot,
          ]}
        />
      ))}
    </View>
  );

  // Renderiza cada meta com barra de progresso; permite edição ao tocar
  const renderGoal = ({ item }) => {
    const percentage = Math.min(item.current / item.target, 1);
    return (
      <Card 
        style={styles.goalCard}
        onPress={() => {
          setNewGoalTitle(item.title);
          setNewGoalTarget(item.target.toString());
          setNewGoalCurrent(item.current.toString());
          setEditingGoal(item.id);
          setGoalModalVisible(true);
        }}
      >
        <Card.Content>
          <Text style={styles.goalTitle}>{item.title}</Text>
          <View style={styles.progressBarContainer}>
            <View
              style={[
                styles.progressBar,
                { width: `${percentage * 100}%`, backgroundColor: getProgressBarColor(percentage) },
              ]}
            />
          </View>
          <Text style={styles.goalPercentage}>{Math.round(percentage * 100)}%</Text>
        </Card.Content>
      </Card>
    );
  };

  return (
    <View style={styles.screenContainer}>
      {/* Header customizado */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Meus Indicadores</Text>
        <View style={styles.headerButtons}>
          <TouchableOpacity
            onPress={() => setModalVisible(true)}
            style={styles.headerIconButton}
          >
            <IconButton icon="plus" color="#fff" size={28} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Seção de Registros */}
      <View style={styles.contentContainer}>
        <Text style={styles.sectionTitle}>Histórico de Registros</Text>
        <FlatList
          data={records}
          keyExtractor={(item) => item.id.toString()}
          horizontal
          pagingEnabled
          snapToInterval={CARD_WIDTH}
          decelerationRate="fast"
          onMomentumScrollEnd={handleRecordScroll}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.recordsContainer}
          renderItem={({ item }) => (
            <Card style={styles.recordCard}>
              <Card.Title
                title={` ${new Date(item.date).toLocaleDateString()}`}
                titleStyle={styles.recordDate}
                left={(props) => <IconButton {...props} icon="calendar" size={20} />}
                right={(props) => (
                  <IconButton {...props} icon="delete" onPress={() => deleteRecord(item.id)} />
                )}
              />
              <Card.Content>
                <Text style={styles.recordText}>Peso: {item.weight} kg</Text>
                <Text style={styles.recordText}>Glicose: {item.glucose} mg/dL</Text>
                <Text style={styles.recordText}>Batimentos: {item.heartRate} bpm</Text>
              </Card.Content>
            </Card>
          )}
        />
        {renderPagination()}
      </View>

      {/* Seção de Metas Gamificadas */}
      <View style={styles.goalsContainer}>
        <View style={styles.goalsHeader}>
          <Text style={styles.sectionTitle}>Minhas Metas</Text>
          <TouchableOpacity onPress={() => {
            setNewGoalTitle('');
            setNewGoalTarget('');
            setNewGoalCurrent('');
            setEditingGoal(null);
            setGoalModalVisible(true);
          }}>
            <IconButton icon="plus-circle" size={28} color={colors.primary} />
          </TouchableOpacity>
        </View>
        {goals.length > 0 ? (
          <FlatList
            data={goals}
            keyExtractor={(item) => item.id.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.goalsList}
            renderItem={renderGoal}
          />
        ) : (
          <Text style={styles.noGoalsText}>
          Crie uma meta, por exemplo: "Correr 10km semanais"</Text>
          
        )}
      </View>

      {/* Modal para novo registro de indicador */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Registro</Text>
              <IconButton icon="close" onPress={() => setModalVisible(false)} />
            </View>
            <Divider />
            <View style={styles.modalContent}>
              <Button
                mode="outlined"
                icon="calendar"
                onPress={() => setShowDatePicker(true)}
                style={styles.dateButton}
              >
                {selectedDate.toLocaleDateString()}
              </Button>
              {showDatePicker && (
                <DateTimePicker
                  value={selectedDate}
                  mode="date"
                  display="default"
                  onChange={(event, date) => {
                    if (date) setSelectedDate(date);
                    setShowDatePicker(false);
                  }}
                />
              )}
              <TextInput
                style={styles.input}
                placeholder="Peso (kg)"
                keyboardType="numeric"
                value={weight}
                onChangeText={setWeight}
              />
              <TextInput
                style={styles.input}
                placeholder="Glicose (mg/dL)"
                keyboardType="numeric"
                value={glucose}
                onChangeText={setGlucose}
              />
              <TextInput
                style={styles.input}
                placeholder="Batimentos Cardíacos (bpm)"
                keyboardType="numeric"
                value={heartRate}
                onChangeText={setHeartRate}
              />
              <Button mode="contained" onPress={saveRecord} style={styles.saveButton}>
                Salvar Indicadores
              </Button>
            </View>
          </View>
        </View>
      </Modal>

      {/* Modal para adicionar/editar meta */}
      <Modal
        visible={goalModalVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setGoalModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>
                {editingGoal ? "Editar Meta" : "Nova Meta"}
              </Text>
              <IconButton icon="close" onPress={() => {
                setEditingGoal(null);
                setGoalModalVisible(false);
              }} />
            </View>
            <Divider />
            <View style={styles.modalContent}>
              <TextInput
                style={styles.input}
                placeholder="Título da meta"
                value={newGoalTitle}
                onChangeText={setNewGoalTitle}
              />
              <TextInput
                style={styles.input}
                placeholder="Meta (valor alvo)"
                keyboardType="numeric"
                value={newGoalTarget}
                onChangeText={setNewGoalTarget}
              />
              <TextInput
                style={styles.input}
                placeholder="Valor atual (opcional)"
                keyboardType="numeric"
                value={newGoalCurrent}
                onChangeText={setNewGoalCurrent}
              />
              <Button mode="contained" onPress={addOrUpdateGoal} style={styles.saveButton}>
                {editingGoal ? "Atualizar Meta" : "Adicionar Meta"}
              </Button>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    height: 180,
    backgroundColor: colors.primary,
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'ios' ? 50 : 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontFamily: 'Poppins-Bold',
    color: 'black',
  },
  headerButtons: {
    flexDirection: 'row',
  },
  headerIconButton: {
    marginLeft: 10,
  },
  contentContainer: {
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontFamily: 'Poppins-Bold',
    color: '#000',
    marginBottom: 10,
  },
  recordsContainer: {
    paddingVertical: 10,
  },
  recordCard: {
    width: CARD_WIDTH,
    marginRight: 15,
    backgroundColor: '#FFF',
    borderRadius: 10,
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  recordDate: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  recordText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#444',
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ccc',
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: colors.primary,
  },
  goalsContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  goalsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  goalsList: {
    paddingVertical: 10,
  },
  goalCard: {
    width: 180,
    marginRight: 15,
    backgroundColor: '#FFF',
    borderRadius: 10,
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  goalTitle: {
    fontSize: 16,
    fontFamily: 'Poppins-Bold',
    marginBottom: 5,
  },
  progressBarContainer: {
    width: '100%',
    height: 10,
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
    overflow: 'hidden',
    marginBottom: 5,
  },
  progressBar: {
    height: '100%',
    borderRadius: 5,
  },
  goalPercentage: {
    fontSize: 14,
    fontWeight: '500',
    color: '#444',
    textAlign: 'right',
  },
  noGoalsText: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
    marginTop: 10,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '90%',
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 10,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontFamily: 'Poppins-Bold',
    color: '#333',
  },
  modalContent: {
    marginTop: 10,
  },
  dateButton: {
    marginBottom: 10,
  },
  input: {
    backgroundColor: '#f5f5f5',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  saveButton: {
    backgroundColor: '#1F8E8A',
    marginTop: 10,
  },
});

export default UserIndicatorsScreen;
