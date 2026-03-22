import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  ActivityIndicator, 
  useColorScheme 
} from 'react-native';
import { supabase } from '../services/supabase';
import { Feather } from '@expo/vector-icons';

export function Calendar() {
  const deviceTheme = useColorScheme();
  const isDark = deviceTheme === 'dark';

  const [metas, setMetas] = useState<any[]>([]);
  const [datasDisponiveis, setDatasDisponiveis] = useState<string[]>([]);
  const [dataSelecionada, setDataSelecionada] = useState('');
  const [loading, setLoading] = useState(true);

  async function fetchAgenda() {
    setLoading(true);
    const { data } = await supabase.from('metas_estudo').select('*').order('data', { ascending: true });
    if (data) {
      setMetas(data);
      const datasUnicas: string[] = Array.from(new Set(data.map((item: any) => item.data)));
      setDatasDisponiveis(datasUnicas);
      if (datasUnicas.length > 0 && !dataSelecionada) setDataSelecionada(datasUnicas[0]);
    }
    setLoading(false);
  }

  useEffect(() => { fetchAgenda(); }, []);

  const metasFiltradas = metas.filter(m => m.data === dataSelecionada);

  const theme = {
    bg: isDark ? '#111827' : '#F9FAFB',
    card: isDark ? '#1F2937' : '#FFFFFF',
    text: isDark ? '#F9FAFB' : '#1F2937',
    subText: isDark ? '#9CA3AF' : '#6B7280',
    border: isDark ? '#374151' : '#E5E7EB'
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.bg }]}>
      <Text style={[styles.title, { color: theme.text }]}>Minha Agenda</Text>

      <View style={{ height: 100 }}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.carousel}>
          {datasDisponiveis.map((dt) => (
            <TouchableOpacity 
              key={dt} 
              onPress={() => setDataSelecionada(dt)}
              style={[
                styles.dayCard, 
                { backgroundColor: theme.card, borderColor: theme.border },
                dataSelecionada === dt && styles.dayCardActive
              ]}
            >
              <Text style={[styles.dayNum, { color: theme.text }, dataSelecionada === dt && styles.textWhite]}>
                {new Date(dt + 'T12:00:00').getDate()}
              </Text>
              <Text style={[styles.dayMonth, { color: theme.subText }, dataSelecionada === dt && styles.textWhite]}>
                {new Date(dt + 'T12:00:00').toLocaleDateString('pt-BR', { month: 'short' }).replace('.', '')}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {loading ? <ActivityIndicator color="#2563EB" style={{ marginTop: 20 }} /> : (
        <ScrollView style={{ marginTop: 10 }} showsVerticalScrollIndicator={false}>
          {metasFiltradas.map((item) => (
            <View key={item.id} style={[styles.taskCard, { backgroundColor: theme.card, borderColor: theme.border }]}>
              <View style={styles.taskInfo}>
                <Text style={[styles.subject, { color: theme.text }]}>{item.disciplina}</Text>
                <Text style={[styles.topic, { color: theme.subText }]}>{item.topico}</Text>
                <Text style={styles.time}>{item.tempo}</Text>
              </View>
              {item.concluida && <Feather name="check-circle" size={20} color="#10B981" />}
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 20, paddingTop: 60 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  carousel: { paddingRight: 20, height: 80, alignItems: 'center' },
  dayCard: { width: 60, height: 75, borderRadius: 15, alignItems: 'center', justifyContent: 'center', marginRight: 12, borderWidth: 1 },
  dayCardActive: { backgroundColor: '#2563EB', borderColor: '#2563EB' },
  dayNum: { fontSize: 18, fontWeight: 'bold' },
  dayMonth: { fontSize: 12, textTransform: 'uppercase' },
  textWhite: { color: '#FFF' },
  taskCard: { padding: 16, borderRadius: 15, marginBottom: 12, flexDirection: 'row', alignItems: 'center', borderWidth: 1 },
  taskInfo: { flex: 1 },
  subject: { fontSize: 16, fontWeight: 'bold' },
  topic: { fontSize: 13 },
  time: { fontSize: 12, color: '#2563EB', fontWeight: 'bold', marginTop: 5 },
});