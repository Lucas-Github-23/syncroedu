import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export function Timer() {
  const navigation = useNavigation();
  const [segundos, setSegundos] = useState(25 * 60);
  const [ativo, setAtivo] = useState(false);

  useEffect(() => {
    let intervalo: any;
    if (ativo && segundos > 0) {
      intervalo = setInterval(() => {
        setSegundos((seg) => seg - 1);
      }, 1000);
    } else if (segundos === 0) {
      setAtivo(false);
      Alert.alert("Tempo Esgotado!", "Hora de um pequeno descanso.");
    }
    return () => clearInterval(intervalo);
  }, [ativo, segundos]);

  const formatarTempo = (seg: number) => {
    const min = Math.floor(seg / 60);
    const s = seg % 60;
    return `${min.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const resetTimer = (minutos: number) => {
    setAtivo(false);
    setSegundos(minutos * 60);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
        <Feather name="arrow-left" size={28} color="#1F2937" />
      </TouchableOpacity>

      <Text style={styles.title}>Foco Total</Text>
      
      <View style={styles.timerCircle}>
        <Text style={styles.timerText}>{formatarTempo(segundos)}</Text>
      </View>

      <View style={styles.controls}>
        <TouchableOpacity style={styles.resetBtn} onPress={() => resetTimer(25)}>
          <Feather name="rotate-ccw" size={24} color="#6B7280" />
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.mainBtn, { backgroundColor: ativo ? '#EF4444' : '#2563EB' }]} 
          onPress={() => setAtivo(!ativo)}
        >
          <Feather name={ativo ? "pause" : "play"} size={32} color="#FFF" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.resetBtn} onPress={() => resetTimer(5)}>
          <Text style={styles.breakText}>5m</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFB', alignItems: 'center', justifyContent: 'center' },
  backBtn: { position: 'absolute', top: 60, left: 20 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#1F2937', marginBottom: 40 },
  timerCircle: { 
    width: 250, height: 250, borderRadius: 125, borderWidth: 8, borderColor: '#2563EB',
    alignItems: 'center', justifyContent: 'center', backgroundColor: '#FFF', elevation: 10
  },
  timerText: { fontSize: 64, fontWeight: 'bold', color: '#1F2937' },
  controls: { flexDirection: 'row', alignItems: 'center', marginTop: 50 },
  mainBtn: { width: 80, height: 80, borderRadius: 40, alignItems: 'center', justifyContent: 'center', marginHorizontal: 30, elevation: 5 },
  resetBtn: { padding: 10 },
  breakText: { fontSize: 18, fontWeight: 'bold', color: '#2563EB' }
});