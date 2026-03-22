import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather, MaterialIcons } from '@expo/vector-icons';

export function AlertBox() {
  return (
    <View style={styles.alertBox}>
      <View style={styles.alertTitleContainer}>
        <MaterialIcons name="error-outline" size={24} color="#991B1B" />
        <Text style={styles.alertTitle}>O dia foi muito cansativo?</Text>
      </View>
      
      <Text style={styles.alertText}>
        Sem problemas. Se não conseguir cumprir a meta hoje, o sistema reorganiza seu calendário automaticamente.
      </Text>
      
      <TouchableOpacity style={styles.secondaryButton}>
        <Feather name="refresh-cw" size={16} color="#991B1B" />
        <Text style={styles.secondaryButtonText}>Recalcular a Rota</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  alertBox: {
    backgroundColor: '#FEF2F2',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#FEE2E2',
  },
  alertTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  alertTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#991B1B',
    marginLeft: 8,
  },
  alertText: {
    fontSize: 14,
    color: '#B91C1C',
    marginBottom: 16,
    lineHeight: 20,
  },
  secondaryButton: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#FCA5A5',
    paddingVertical: 12,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryButtonText: {
    color: '#991B1B',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  }
});