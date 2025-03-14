// src/components/common/AwarenessCard.tsx
import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ImageSourcePropType } from 'react-native';
import { colors } from '../../styles/colors';

interface AwarenessCardProps {
  title: string;
  image: ImageSourcePropType;
  onPress: () => void;
}

export const AwarenessCard: React.FC<AwarenessCardProps> = ({ title, image, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.card}>
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <Image source={image} style={styles.image} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
    overflow: 'hidden',
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 16,
    color: colors.text,
    marginBottom: 8,
    textAlign: 'left',
    fontFamily: 'Poppins-Bold',
  },
  
  image: {
    width: '100%',
    height: 160,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
});
