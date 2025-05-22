import React, { useState } from 'react';
import { View, Text, Modal, TextInput, StyleSheet, TouchableOpacity, Platform, ScrollView, FlatList } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../styles/colors';
import { createAlert } from '../../services/alertService';
import { scheduleNotification } from '../../services/notificationService';
// Remove Picker import if you're not using it anymore
// import { Picker } from '@react-native-picker/picker';

interface AddAlertModalProps {
  visible: boolean;
  onClose: () => void;
  onSaved: () => void;
}

export const AddAlertModal: React.FC<AddAlertModalProps> = ({ visible, onClose, onSaved }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [time, setTime] = useState(new Date());
  const [date, setDate] = useState(new Date());
  const [repeat, setRepeat] = useState<'once' | 'daily' | 'weekly'>('daily');
  const [daysOfWeek, setDaysOfWeek] = useState<string[]>([]);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  // Add new state for custom dropdown
  const [showRepeatOptions, setShowRepeatOptions] = useState(false);

  const toggleDay = (day: string) => {
    setDaysOfWeek(prev =>
      prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]
    );
  };

  const handleSave = async () => {
    const hour = time.getHours();
    const minute = time.getMinutes();

    const alertData = {
      title,
      description,
      time: `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`,
      date: repeat === 'once' ? date.toISOString().split('T')[0] : '',
      repeat,
      daysOfWeek: repeat === 'weekly' ? daysOfWeek : [],
    };

    await createAlert(alertData);
    await scheduleNotification(alertData.title, alertData.description, hour, minute);

    onSaved();
    onClose();
  };

  // Get display text for repeat option
  const getRepeatText = (value: 'once' | 'daily' | 'weekly') => {
    switch(value) {
      case 'daily': return 'Diário';
      case 'weekly': return 'Semanal';
      case 'once': return 'Único';
      default: return 'Diário';
    }
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.modalContainer}>
        <ScrollView contentContainerStyle={styles.modalContent}>
          <Text style={styles.modalTitle}>Novo Alerta</Text>

          <TextInput
            style={styles.input}
            placeholder="Título"
            value={title}
            onChangeText={setTitle}
          />

          <TextInput
            style={styles.input}
            placeholder="Descrição (opcional)"
            value={description}
            onChangeText={setDescription}
          />

          {/* Replace Picker with custom dropdown */}
          <View style={styles.pickerContainer}>
            <Text style={styles.label}>Frequência:</Text>
            <TouchableOpacity 
              style={styles.dropdownButton}
              onPress={() => setShowRepeatOptions(!showRepeatOptions)}
            >
              <Text style={styles.dropdownButtonText}>{getRepeatText(repeat)}</Text>
              <Ionicons name="chevron-down" size={20} color={colors.primary} />
            </TouchableOpacity>
            
            {showRepeatOptions && (
              <View style={styles.optionsContainer}>
                <TouchableOpacity 
                  style={[styles.optionItem, repeat === 'daily' && styles.selectedOption]} 
                  onPress={() => {
                    setRepeat('daily');
                    setShowRepeatOptions(false);
                  }}
                >
                  <Text style={styles.optionText}>Diário</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={[styles.optionItem, repeat === 'weekly' && styles.selectedOption]} 
                  onPress={() => {
                    setRepeat('weekly');
                    setShowRepeatOptions(false);
                  }}
                >
                  <Text style={styles.optionText}>Semanal</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={[styles.optionItem, repeat === 'once' && styles.selectedOption]} 
                  onPress={() => {
                    setRepeat('once');
                    setShowRepeatOptions(false);
                  }}
                >
                  <Text style={styles.optionText}>Único</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>

          {repeat === 'once' && (
            <View>
              <Text style={styles.label}>Selecione a Data:</Text>
              <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.timeButton}>
                <Ionicons name="calendar" size={20} color={colors.primary} />
                <Text style={styles.timeText}>
                  {date.getDate().toString().padStart(2, '0')}/{(date.getMonth() + 1).toString().padStart(2, '0')}/{date.getFullYear()}
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
            </View>
          )}

          {repeat === 'weekly' && (
            <View>
              <Text style={styles.label}>Dias da Semana:</Text>
              <View style={styles.daysContainer}>
                {['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map(day => (
                  <TouchableOpacity
                    key={day}
                    style={[styles.dayButton, daysOfWeek.includes(day) && styles.dayButtonSelected]}
                    onPress={() => toggleDay(day)}
                  >
                    <Text style={[styles.dayButtonText, daysOfWeek.includes(day) && styles.dayButtonTextSelected]}>
                      {day.slice(0, 3)}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}

          <TouchableOpacity onPress={() => setShowTimePicker(true)} style={styles.timeButton}>
            <Ionicons name="time" size={20} color={colors.primary} />
            <Text style={styles.timeText}>
              {time.getHours().toString().padStart(2, '0')}:{time.getMinutes().toString().padStart(2, '0')}
            </Text>
          </TouchableOpacity>

          {showTimePicker && (
            <DateTimePicker
              value={time}
              mode="time"
              is24Hour
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              onChange={(event, selectedDate) => {
                const currentDate = selectedDate || time;
                setShowTimePicker(Platform.OS === 'ios');
                setTime(currentDate);
              }}
            />
          )}

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
  modalContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' },
  modalContent: { backgroundColor: '#fff', padding: 24, borderRadius: 8, width: '85%' },
  modalTitle: { fontSize: 20, fontFamily: 'Poppins-Bold', marginBottom: 16, textAlign: 'center' },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 12, marginBottom: 12, fontFamily: 'Poppins-Regular' },
  label: { fontSize: 14, fontFamily: 'Poppins-Bold', color: colors.text, marginBottom: 6 },
  
  // Replace picker styles with custom dropdown styles
  pickerContainer: { 
    marginBottom: 12,
    position: 'relative',
  },
  dropdownButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 8,
    padding: 12,
    backgroundColor: '#fff',
  },
  dropdownButtonText: {
    color: colors.text,
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
  },
  optionsContainer: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 8,
    marginTop: 4,
    zIndex: 1000,
    elevation: 5, // Important for Android
  },
  optionItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  selectedOption: {
    backgroundColor: '#f0f8ff',
  },
  optionText: {
    fontFamily: 'Poppins-Regular',
    color: colors.text,
    fontSize: 16,
  },
  
  // Keep other existing styles
  daysContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 12 },
  dayButton: { padding: 8, borderWidth: 1, borderColor: colors.primary, borderRadius: 8 },
  dayButtonSelected: { backgroundColor: colors.primary },
  dayButtonText: { color: colors.text, fontFamily: 'Poppins-Regular' },
  dayButtonTextSelected: { color: '#fff' },
  timeButton: { flexDirection: 'row', alignItems: 'center', padding: 12, borderWidth: 1, borderColor: colors.primary, borderRadius: 8, marginBottom: 16 },
  timeText: { marginLeft: 8, fontSize: 16, fontFamily: 'Poppins-Regular', color: colors.primary },
  buttonContainer: { flexDirection: 'row', justifyContent: 'space-between' },
  cancelButton: { padding: 10 },
  saveButton: { backgroundColor: colors.primary, padding: 10, borderRadius: 8 },
  cancelText: { color: colors.primary, fontFamily: 'Poppins-Bold' },
  saveText: { color: '#fff', fontFamily: 'Poppins-Bold' }
});

export default AddAlertModal;
