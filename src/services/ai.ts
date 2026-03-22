// 1. O Expo lê automaticamente do .env se começar com EXPO_PUBLIC_
const API_KEY = process.env.EXPO_PUBLIC_GEMINI_API_KEY || ""; 

const BASE_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`;

export async function gerarCronogramaIA(config: any) {
  try {
    // Verificação de segurança para você não tentar gerar sem a chave configurada
    if (!API_KEY) {
      throw new Error("API Key não configurada no arquivo .env");
    }

    const prompt = `
      Atue como um Mentor de Estudos Pessoal.
      Objetivo: ${config.objetivo}.
      Matérias: ${config.materias}.
      Nível: ${config.nivel}.
      Disponibilidade: ${config.horas}h/dia por 7 dias.

      Retorne APENAS um array JSON puro.
      Formato: [{"dia": 1, "disciplina": "Nome", "topico": "Assunto", "tempo": 60}]
    `;

    const response = await fetch(BASE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
    });

    const data = await response.json();
    if (data.error) throw new Error(data.error.message);

    const responseText = data.candidates[0].content.parts[0].text;
    const jsonMatch = responseText.match(/\[[\s\S]*\]/);
    
    return jsonMatch ? JSON.parse(jsonMatch[0]) : null;
  } catch (error: any) {
    console.error("Erro na IA:", error.message);
    throw error;
  }
}