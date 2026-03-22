# SyncroEdu

Mentor de estudos inteligente que utiliza IA para gerar cronogramas semanais personalizados e adaptativos.

## Funcionalidades
- **Cronograma com IA:** Planejamento de 7 dias via Gemini 2.5 Flash.
- **IA Adaptativa:** Sugere novos temas baseados no seu histórico de conclusão.
- **Agenda:** Visualização diária em carrossel.
- **Timer de Foco:** Cronômetro integrado para produtividade.
- **Dark Mode:** Suporte nativo ao tema do sistema.
- **Nuvem:** Sincronização em tempo real com Supabase.

## Tecnologias
- React Native / Expo
- TypeScript
- Google Gemini 2.5 API
- Supabase (PostgreSQL)

## Instalação

1. Clone o repositório:
```bash
git clone [https://github.com/SEU_USUARIO/syncroedu.git](https://github.com/SEU_USUARIO/syncroedu.git)
```

2. Instale as dependências:
```bash
npm install
```

3. Configure o arquivo `.env` na raiz do projeto:
```env
EXPO_PUBLIC_GEMINI_API_KEY=sua_chave_aqui
EXPO_PUBLIC_SUPABASE_URL=sua_url_aqui
EXPO_PUBLIC_SUPABASE_ANON_KEY=sua_key_aqui
```

4. Inicie o projeto:
```bash
npx expo start -c
```

## Autor
Desenvolvido por Lucas Gabriel de Oliveira.
