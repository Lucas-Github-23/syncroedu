import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';

interface FocusCardProps {
  subject: string;
  time: string;
  topic: string;
}

export function FocusCard({ subject, time, topic }: FocusCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardLabel}>SUA META DE HOJE</Text>
        <Feather name="target" size={20} color="#3B82F6" />
      </View>
      
      <View style={styles.subjectHeader}>
        <Text style={styles.subjectName}>{subject}</Text>
        <View style={styles.timeBadgeContainer}>
          <Feather name="clock" size={14} color="#2563EB" />
          <Text style={styles.timeBadge}>{time}</Text>
        </View>
      </View>
      
      <Text style={styles.topicDetails}>{topic}</Text>
      
      <TouchableOpacity style={styles.primaryButton}>
        <Text style={styles.primaryButtonText}>Começar Agora</Text>
        <Feather name="arrow-right" size={18} color="#FFFFFF" style={{ marginLeft: 8 }} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
    marginBottom: 24,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  cardLabel: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#3B82F6',
    letterSpacing: 1,
  },
  subjectHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  subjectName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  timeBadgeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
  },
  timeBadge: {
    color: '#2563EB',
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 4,
  },
  topicDetails: {
    fontSize: 16,
    color: '#4B5563',
    marginBottom: 24,
  },
  primaryButton: {
    backgroundColor: '#2563EB',
    paddingVertical: 14,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});