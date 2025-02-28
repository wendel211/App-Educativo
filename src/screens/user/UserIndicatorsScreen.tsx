import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Alert,
  ScrollView,
  FlatList,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Card, Button, Divider, IconButton, Badge } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';

export const UserIndicatorsScreen = () => {
  const [weight, setWeight] = useState('');
  const [glucose, setGlucose] = useState('');
  const [heartRate, setHeartRate] = useState('');
  const [records, setRecords] = useState<{ id: number; date: string; weight: string; glucose: string; heartRate: string }[]>([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  // Carregar registros salvos ao iniciar
  useEffect(() => {
    loadRecords();
  }, []);

  // Salvar novo registro
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
      Alert.alert('Sucesso', 'Indicadores salvos!');
      setWeight('');
      setGlucose('');
      setHeartRate('');
    } catch (error) {
      console.error('Erro ao salvar:', error);
    }
  };

  // Carregar registros salvos
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

  // Excluir um registro
  const deleteRecord = async (id: number) => {
    const updatedRecords = records.filter((item) => item.id !== id);
    try {
      await AsyncStorage.setItem('userIndicators', JSON.stringify(updatedRecords));
      setRecords(updatedRecords);
      Alert.alert('Sucesso', 'Registro excluído!');
    } catch (error) {
      console.error('Erro ao excluir:', error);
    }
  };

  // Contadores por mês
  const getMonthlyCounts = () => {
    const currentMonth = new Date().getMonth();
    return records.filter((r) => new Date(r.date).getMonth() === currentMonth).length;
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Registro de Indicadores</Text>

      {/* Formulário de Entrada */}
      <View style={styles.inputCard}>
        <Text style={styles.formTitle}>Novo Registro</Text>

        {/* Selecionar Data */}
        <View style={styles.datePickerContainer}>
          <Button
            mode="outlined"
            icon="calendar"
            onPress={() => setShowDatePicker(true)}
            labelStyle={{ color: '#000' }} // Texto preto
            style={styles.datePickerButton} // Fundo branco
          >
            {selectedDate.toLocaleDateString()}
          </Button>
        </View>

        {showDatePicker && (
          <DateTimePicker
            value={selectedDate}
            mode="date"
            display="default"
            onChange={(event, date) => {
              if (date) {
                setSelectedDate(date);
              }
              setShowDatePicker(false);
            }}
          />
        )}

        {/* Inputs */}
        <TextInput style={styles.input} placeholder="Peso (kg)" keyboardType="numeric" value={weight} onChangeText={setWeight} />
        <TextInput style={styles.input} placeholder="Glicose (mg/dL)" keyboardType="numeric" value={glucose} onChangeText={setGlucose} />
        <TextInput style={styles.input} placeholder="Batimentos Cardíacos (bpm)" keyboardType="numeric" value={heartRate} onChangeText={setHeartRate} />

        <Button mode="contained" onPress={saveRecord} style={styles.saveButton} icon="check">
          Salvar Indicadores
        </Button>
      </View>

      <Divider style={styles.divider} />

      {/* Lista de Registros */}
      <FlatList
        data={records}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Card style={styles.card}>
            <Card.Title
              title={`Data: ${new Date(item.date).toLocaleDateString()} | Hora: ${new Date(item.date).toLocaleTimeString()}`}
              left={(props) => <IconButton {...props} icon="clipboard-text" />}
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

      <Divider style={styles.divider} />

      {/* Contadores Mensais */}
      <View style={styles.counterContainer}>
        <View style={styles.counterBox}>
          <Text style={styles.counterText}>Registros no Mês</Text>
          <View style={styles.counterBadge}>
            <Badge size={28} style={styles.greenDot} />
            <Text style={styles.counterNumber}>{getMonthlyCounts()}</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

// Estilos
const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#F5F5F5' },
  title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', color: '#1F8E8A', marginBottom: 20 },
  datePickerContainer: { marginBottom: 10 },
  label: { fontSize: 16, fontWeight: 'bold', color: '#000', marginBottom: 5 },
  datePickerButton: { backgroundColor: '#FFF', borderColor: '#ccc', borderWidth: 1 },
  inputCard: { backgroundColor: '#FFF', padding: 20, borderRadius: 10, shadowOpacity: 0.1, marginBottom: 20 },
  formTitle: { fontSize: 18, fontWeight: 'bold', color: '#005A57', marginBottom: 10 },
  input: { backgroundColor: '#FFF', borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 10, marginBottom: 10 },
  saveButton: { marginTop: 10, backgroundColor: '#1F8E8A' },
  card: { marginTop: 10, backgroundColor: '#FFF', padding: 10, borderRadius: 10 },
  recordText: { fontSize: 16, fontWeight: '500', color: '#808080' },
  counterContainer: { flexDirection: 'row', justifyContent: 'center', marginVertical: 20 },
  counterBox: { backgroundColor: '#FFF', padding: 15, borderRadius: 10, alignItems: 'center', shadowOpacity: 0.1 },
  counterText: { fontSize: 16, fontWeight: 'bold', color: '#005A57' },
  counterBadge: { flexDirection: 'row', alignItems: 'center', marginTop: 5 },
  greenDot: { backgroundColor: 'green', marginRight: 10 },
  counterNumber: { fontSize: 20, fontWeight: 'bold', color: '#1F8E8A' },
  divider: { marginVertical: 20, backgroundColor: '#CCCCCC' },
});
