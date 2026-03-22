import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Session } from '@supabase/supabase-js';
import { LogBox } from 'react-native'; // <-- 1. Adicione este import

import { AppRoutes } from './src/routes/app.routes';
import { Auth } from './src/screens/Auth';
import { supabase } from './src/services/supabase';

// 2. Cole esta linha para silenciar os avisos chatos do Supabase/Navegação
LogBox.ignoreLogs([
  'Cannot update a component', 
  'AsyncStorage has been extracted',
  'Non-serializable values',
  'Warning:'
]);

export default function App() {
  const [sessao, setSessao] = useState<Session | null>(null);

  useEffect(() => {
    // Verifica se já existe uma sessão salva no celular ao abrir o app
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSessao(session);
    });

    // Fica escutando mudanças (quando o usuário faz login ou sai)
    supabase.auth.onAuthStateChange((_event, session) => {
      setSessao(session);
    });
  }, []);

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        {/* Se tiver sessão (logado), mostra o App. Se não, mostra o Login */}
        {sessao && sessao.user ? <AppRoutes /> : <Auth />}
      </NavigationContainer>
    </SafeAreaProvider>
  );
}