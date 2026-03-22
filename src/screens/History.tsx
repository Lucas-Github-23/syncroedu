import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { supabase } from '../services/supabase';
import { Feather } from '@expo/vector-icons';

export function History() {
  const [concluidas, setConcluidas] = useState<any[]>([]);

  async function buscarHistorico() {
    const { data } = await supabase.from('metas_estudo').select('*').eq('concluida', true);
    if (data) setConcluidas(data);
  }

  useEffect(() => { buscarHistorico(); }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Histórico de Estudos</Text>
      <ScrollView>
        {concluidas.length === 0 ? (
          <Text style={styles.empty}>Nenhuma meta concluída ainda. Mãos à obra!</Text>
        ) : (
          concluidas.map((item) => (
            <View key={item.id} style={styles.card}>
              <Feather name="check-circle" size={20} color="#10B981" />
              <View style={{ marginLeft: 12 }}>
                <Text style={styles.subject}>{item.disciplina}</Text>
                <Text style={styles.topic}>{item.topico}</Text>
              </View>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFB', paddingHorizontal: 20, paddingTop: 60 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#111827', marginBottom: 20 },
  card: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFF', padding: 16, borderRadius: 12, marginBottom: 10 },
  subject: { fontSize: 16, fontWeight: 'bold' },
  topic: { fontSize: 14, color: '#6B7280' },
  empty: { textAlign: 'center', marginTop: 40, color: '#9CA3AF' }
});