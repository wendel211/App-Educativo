// src/components/gamification/ProgressBar.tsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { colors } from '../../styles/colors';

interface ProgressBarProps {
  progress: number; // valor entre 0 e 1
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
  return (
    <View style={styles.container}>
      <View style={[styles.bar, { width: `${progress * 100}%` }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 10,
    backgroundColor: '#ddd',
    borderRadius: 5,
    marginBottom: 20,
  },
  bar: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: 5,
  },
});

export default ProgressBar;
