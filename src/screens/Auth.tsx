import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { supabase } from '../services/supabase';

export function Auth() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [carregando, setCarregando] = useState(false);
  // Controla se a tela está no modo Login ou Cadastro
  const [modoLogin, setModoLogin] = useState(true);

  async function handleAutenticacao() {
    if (!email || !senha) {
      Alert.alert('Atenção', 'Preencha o e-mail e a senha!');
      return;
    }

    setCarregando(true);

    if (modoLogin) {
      // Tenta fazer o Login
      const { error } = await supabase.auth.signInWithPassword({
        email: email,
        password: senha,
      });
      if (error) Alert.alert('Erro ao entrar', error.message);
    } else {
      // Tenta criar uma conta nova
      const { error } = await supabase.auth.signUp({
        email: email,
        password: senha,
      });
      if (error) Alert.alert('Erro ao criar conta', error.message);
      else Alert.alert('Sucesso!', 'Conta criada. Você já pode fazer login.');
    }

    setCarregando(false);
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Feather name="book-open" size={48} color="#2563EB" />
        <Text style={styles.title}>SyncroEdu</Text>
        <Text style={styles.subtitle}>Sua rotina de estudos inteligente.</Text>
      </View>

      <View style={styles.form}>
        <View style={styles.inputContainer}>
          <Feather name="mail" size={20} color="#6B7280" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Seu e-mail"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
          />
        </View>

        <View style={styles.inputContainer}>
          <Feather name="lock" size={20} color="#6B7280" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Sua senha"
            value={senha}
            onChangeText={setSenha}
            secureTextEntry
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={handleAutenticacao} disabled={carregando}>
          {carregando ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text style={styles.buttonText}>{modoLogin ? 'Entrar' : 'Criar Conta'}</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setModoLogin(!modoLogin)} style={styles.toggleButton}>
          <Text style={styles.toggleText}>
            {modoLogin ? 'Ainda não tem conta? Cadastre-se' : 'Já tem conta? Faça login'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFB', justifyContent: 'center', paddingHorizontal: 24 },
  header: { alignItems: 'center', marginBottom: 40 },
  title: { fontSize: 32, fontWeight: 'bold', color: '#1F2937', marginTop: 16 },
  subtitle: { fontSize: 16, color: '#6B7280', marginTop: 8, textAlign: 'center' },
  form: { width: '100%' },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 16,
    paddingHorizontal: 16,
    height: 56,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  icon: { marginRight: 12 },
  input: { flex: 1, fontSize: 16, color: '#1F2937' },
  button: {
    backgroundColor: '#2563EB',
    height: 56,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: { color: '#FFFFFF', fontSize: 16, fontWeight: 'bold' },
  toggleButton: { marginTop: 24, alignItems: 'center' },
  toggleText: { color: '#4B5563', fontSize: 14, fontWeight: '500' }
});