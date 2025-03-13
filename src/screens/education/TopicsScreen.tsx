import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity 
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Header } from '../../components/common/Header';
import { colors } from '../../styles/colors';
import { FontAwesome5 } from '@expo/vector-icons';

const diseases = [
  { id: '1', title: 'Insuficiência Cardíaca', icon: 'heart' },
  { id: '2', title: 'Doenças Cardíacas Congênitas', icon: 'heart' },
  { id: '3', title: 'Doenças das Valvas Cardíacas', icon: 'heart' },
  { id: '4', title: 'Doenças do Miocárdio', icon: 'heart' },
  { id: '5', title: 'Diabetes tipo 1', icon: 'syringe' },
  { id: '6', title: 'Diabetes tipo 2', icon: 'syringe' },
];

export const TopicsScreen: React.FC = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Header title=""/>
      <Text style={styles.title}>Tópicos Educacionais</Text>
      <View style={styles.gridContainer}>
        {diseases.map((disease) => (
          <TouchableOpacity
            key={disease.id}
            style={styles.card}
            onPress={() => navigation.navigate('DiseaseDetail', { disease: disease.title })}
          >
            <FontAwesome5 name={disease.icon} size={32} color="#fff" style={styles.icon} />
            <Text style={styles.cardText}>{disease.title}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.text,
    textAlign: 'center',
    marginBottom: 20,
  },
  gridContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  card: {
    width: '47%',
    height: '30%',
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  icon: {
    marginBottom: 10,
  },
  cardText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
});

export default TopicsScreen;