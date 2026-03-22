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
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { supabase } from '../services/supabase';

export function Dashboard() {
  const navigation = useNavigation();
  const deviceTheme = useColorScheme();
  const isDark = deviceTheme === 'dark';

  const [metas, setMetas] = useState<any[]>([]);
  const [carregando, setCarregando] = useState(true);

  async function buscarMetasDeHoje() {
    try {
      setCarregando(true);
      const hoje = new Date().toISOString().split('T')[0];
      const { data, error } = await supabase.from('metas_estudo').select('*').eq('data', hoje);
      if (error) throw error;
      setMetas(data || []);
    } catch (error: any) {
      console.error(error.message);
    } finally {
      setCarregando(false);
    }
  }

  async function toggleMeta(id: number, statusAtual: boolean) {
    const { error } = await supabase.from('metas_estudo').update({ concluida: !statusAtual }).eq('id', id);
    if (!error) {
      setMetas(prev => prev.map(m => m.id === id ? { ...m, concluida: !statusAtual } : m));
    }
  }

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', buscarMetasDeHoje);
    return unsubscribe;
  }, [navigation]);

  const concluidas = metas.filter(m => m.concluida).length;
  const progresso = metas.length > 0 ? (concluidas / metas.length) * 100 : 0;

  // Paleta de cores dinâmica
  const theme = {
    bg: isDark ? '#111827' : '#F9FAFB',
    card: isDark ? '#1F2937' : '#FFFFFF',
    text: isDark ? '#F9FAFB' : '#1F2937',
    subText: isDark ? '#9CA3AF' : '#6B7280',
    border: isDark ? '#374151' : '#F3F4F6'
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.bg }]}>
      <View style={styles.header}>
        <View>
          <Text style={[styles.greeting, { color: theme.text }]}>Olá, Lucas!</Text>
          <Text style={[styles.subtitle, { color: theme.subText }]}>Foco total nos estudos hoje.</Text>
        </View>
        <TouchableOpacity style={[styles.profileBtn, { backgroundColor: isDark ? '#374151' : '#DBEAFE' }]} onPress={() => navigation.navigate('Profile' as never)}>
          <Feather name="user" size={24} color="#2563EB" />
        </TouchableOpacity>
      </View>

      <View style={styles.progressCard}>
        <Text style={styles.progressTitle}>Progresso de Hoje</Text>
        <View style={styles.progressBarBg}>
          <View style={[styles.progressBarFill, { width: `${progresso}%` }]} />
        </View>
        <Text style={styles.progressText}>{concluidas} de {metas.length} concluidas</Text>
      </View>

      <View style={styles.sectionHeader}>
        <Text style={[styles.sectionTitle, { color: theme.text }]}>Metas de Hoje</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
        {carregando ? <ActivityIndicator color="#2563EB" /> : (
          metas.map((item) => (
            <View key={item.id} style={[styles.taskCard, { backgroundColor: theme.card, borderColor: theme.border }, item.concluida && styles.taskCardDone]}>
              <View style={{ flex: 1 }}>
                <Text style={[styles.taskSubject, { color: theme.text }, item.concluida && styles.taskTextDone]}>{item.disciplina}</Text>
                <Text style={[styles.taskTopic, { color: theme.subText }]}>{item.topico}</Text>
              </View>
              <TouchableOpacity onPress={() => toggleMeta(item.id, item.concluida)}>
                <Feather name={item.concluida ? "check-circle" : "circle"} size={26} color={item.concluida ? "#10B981" : isDark ? "#4B5563" : "#D1D5DB"} />
              </TouchableOpacity>
            </View>
          ))
        )}
        {metas.length === 0 && !carregando && <Text style={[styles.empty, { color: theme.subText }]}>Tudo limpo por hoje!</Text>}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 20, paddingTop: 60 },
  header: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 25 },
  greeting: { fontSize: 22, fontWeight: 'bold' },
  subtitle: { fontSize: 14 },
  profileBtn: { width: 45, height: 45, borderRadius: 22, justifyContent: 'center', alignItems: 'center' },
  progressCard: { backgroundColor: '#2563EB', padding: 20, borderRadius: 20, marginBottom: 25, elevation: 5 },
  progressTitle: { color: '#FFF', fontWeight: 'bold', fontSize: 16 },
  progressBarBg: { height: 6, backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 3, marginTop: 15 },
  progressBarFill: { height: 6, backgroundColor: '#FFF', borderRadius: 3 },
  progressText: { color: '#FFF', fontSize: 12, marginTop: 10 },
  sectionHeader: { marginBottom: 15 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold' },
  taskCard: { padding: 16, borderRadius: 15, flexDirection: 'row', alignItems: 'center', marginBottom: 12, borderWidth: 1 },
  taskCardDone: { opacity: 0.5 },
  taskSubject: { fontSize: 16, fontWeight: 'bold' },
  taskTextDone: { textDecorationLine: 'line-through' },
  taskTopic: { fontSize: 13, marginTop: 2 },
  empty: { textAlign: 'center', marginTop: 30 }
});