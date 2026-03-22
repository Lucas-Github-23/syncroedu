import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation, CommonActions } from '@react-navigation/native';
import { gerarCronogramaIA } from '../services/ai';
import { supabase } from '../services/supabase';

export function GenerateSchedule() {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    materias: '',
    horas: '',
    objetivo: '',
    nivel: 'Intermediário'
  });

  async function handleGerar() {
    if (!form.materias || !form.horas) {
      Alert.alert("Campos Vazios", "Por favor, digite as matérias e as horas.");
      return;
    }
    
    setLoading(true);
    try {
      const roteiro = await gerarCronogramaIA(form);

      if (roteiro && Array.isArray(roteiro)) {
        const metasParaInserir = roteiro.map((item: any) => ({
          disciplina: item.disciplina,
          topico: item.topico,
          tempo: `${item.tempo} min`,
          concluida: false,
          data: new Date(Date.now() + (item.dia - 1) * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
        }));

        const { error } = await supabase.from('metas_estudo').insert(metasParaInserir);
        if (error) throw error;

        Alert.alert("Sucesso!", "Seu plano semanal foi gerado.");
        
        // CORREÇÃO DA NAVEGAÇÃO: Reseta a rota para o Início dentro das Tabs
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: 'MainTabs' }],
          })
        );
      }
    } catch (error: any) {
      Alert.alert("Erro na Geração", error.message || "Verifique sua conexão.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}><Feather name="arrow-left" size={28} color="#1F2937" /></TouchableOpacity>
        <Text style={styles.title}>Configuração IA</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.label}>O que você quer estudar?</Text>
        <TextInput style={styles.input} placeholder="Ex: React, Node, Inglês" value={form.materias} onChangeText={t => setForm({...form, materias: t})} />

        <Text style={styles.label}>Horas por dia</Text>
        <TextInput style={styles.input} keyboardType="numeric" placeholder="Ex: 3" value={form.horas} onChangeText={t => setForm({...form, horas: t})} />

        <Text style={styles.label}>Nível</Text>
        <View style={styles.row}>
          {['Iniciante', 'Intermediário', 'Avançado'].map(n => (
            <TouchableOpacity key={n} style={[styles.chip, form.nivel === n && styles.chipActive]} onPress={() => setForm({...form, nivel: n})}>
              <Text style={[styles.chipText, form.nivel === n && styles.chipTextActive]}>{n}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={styles.btn} onPress={handleGerar} disabled={loading}>
          {loading ? <ActivityIndicator color="#FFF" /> : <Text style={styles.btnText}>Gerar 7 Dias</Text>}
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF' },
  header: { marginTop: 60, paddingHorizontal: 20, flexDirection: 'row', alignItems: 'center' },
  title: { fontSize: 20, fontWeight: 'bold', marginLeft: 15, color: '#1F2937' },
  content: { padding: 20 },
  label: { fontSize: 16, fontWeight: '600', marginTop: 25, marginBottom: 8, color: '#4B5563' },
  input: { backgroundColor: '#F9FAFB', borderRadius: 12, padding: 15, fontSize: 16, borderWidth: 1, borderColor: '#E5E7EB' },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 },
  chip: { paddingVertical: 10, paddingHorizontal: 15, borderRadius: 20, backgroundColor: '#F3F4F6', flex: 1, marginHorizontal: 4, alignItems: 'center' },
  chipActive: { backgroundColor: '#2563EB' },
  chipText: { color: '#6B7280', fontSize: 12 },
  chipTextActive: { color: '#FFF', fontWeight: 'bold' },
  btn: { backgroundColor: '#2563EB', height: 60, borderRadius: 16, justifyContent: 'center', alignItems: 'center', marginTop: 40 },
  btnText: { color: '#FFF', fontSize: 18, fontWeight: 'bold' }
});