import React, { useState } from 'react';
import { 
  View, Text, Modal, TextInput, 
  StyleSheet, TouchableOpacity, ScrollView, Platform 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { colors } from '../../styles/colors';
import { addIndicator } from '../../services/indicatorService';

interface AddIndicatorModalProps {
  visible: boolean;
  onClose: () => void;
  onSaved: () => void;
}

export const AddIndicatorModal: React.FC<AddIndicatorModalProps> = ({
  visible,
  onClose,
  onSaved
}) => {
  const [glucose, setGlucose] = useState('');
  const [heartRate, setHeartRate] = useState('');
  const [weight, setWeight] = useState('');
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleSave = async () => {
    if (!glucose || !heartRate || !weight) {
      alert('Preencha todos os campos');
      return;
    }

    try {
      await addIndicator({
        date: date.toISOString().split('T')[0],
        glucose: parseFloat(glucose),
        heartRate: parseInt(heartRate, 10),
        weight: parseFloat(weight),
      });

      onSaved();
      onClose();
      setGlucose('');
      setHeartRate('');
      setWeight('');
      setDate(new Date());
    } catch (error) {
      console.error('Erro ao salvar indicador:', error);
      alert('Erro ao salvar indicador.');
    }
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.modalContainer}>
        <ScrollView contentContainerStyle={styles.modalContent}>
          <Text style={styles.modalTitle}>Registrar Indicadores</Text>

          <TouchableOpacity 
            onPress={() => setShowDatePicker(true)} 
            style={styles.dateButton}
          >
            <Ionicons name="calendar" size={20} color={colors.primary} />
            <Text style={styles.dateText}>
              {date.getDate().toString().padStart(2, '0')}/
              {(date.getMonth() + 1).toString().padStart(2, '0')}/
              {date.getFullYear()}
            </Text>
          </TouchableOpacity>

          {showDatePicker && (
            <DateTimePicker
              value={date}
              mode="date"
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              onChange={(event, selectedDate) => {
                const currentDate = selectedDate || date;
                setShowDatePicker(Platform.OS === 'ios');
                setDate(currentDate);
              }}
            />
          )}

          <TextInput
            style={styles.input}
            placeholder="Glicemia (mg/dL)"
            keyboardType="numeric"
            value={glucose}
            onChangeText={setGlucose}
          />
          <TextInput
            style={styles.input}
            placeholder="Batimentos (bpm)"
            keyboardType="numeric"
            value={heartRate}
            onChangeText={setHeartRate}
          />
          <TextInput
            style={styles.input}
            placeholder="Peso (kg)"
            keyboardType="numeric"
            value={weight}
            onChangeText={setWeight}
          />

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
              <Text style={styles.cancelText}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
              <Text style={styles.saveText}>Salvar</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: { 
    flex: 1, justifyContent: 'center', alignItems: 'center', 
    backgroundColor: 'rgba(0,0,0,0.5)' 
  },
  modalContent: { 
    backgroundColor: '#fff', padding: 24, borderRadius: 8, width: '85%' 
  },
  modalTitle: { 
    fontSize: 20, fontFamily: 'Poppins-Bold', marginBottom: 16, textAlign: 'center' 
  },
  dateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 8,
    marginBottom: 16
  },
  dateText: {
    marginLeft: 8,
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: colors.primary
  },
  input: { 
    borderWidth: 1, borderColor: '#ccc', borderRadius: 8, 
    padding: 12, marginBottom: 12, fontFamily: 'Poppins-Regular' 
  },
  buttonContainer: { 
    flexDirection: 'row', justifyContent: 'space-between' 
  },
  cancelButton: { padding: 10 },
  saveButton: { 
    backgroundColor: colors.primary, padding: 10, borderRadius: 8 
  },
  cancelText: { 
    color: colors.primary, fontFamily: 'Poppins-Bold' 
  },
  saveText: { 
    color: '#fff', fontFamily: 'Poppins-Bold' 
  }
});

export default AddIndicatorModal;
