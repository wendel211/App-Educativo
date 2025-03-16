// src/components/gamification/ContentSection.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../../styles/colors';

interface ContentSectionProps {
  content: string;
}

const ContentSection: React.FC<ContentSectionProps> = ({ content }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.contentText}>{content}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  contentText: {
    fontSize: 16,
    lineHeight: 24,
    color: colors.text,
    fontFamily: 'Poppins-Regular',
  },
});

export default ContentSection;
