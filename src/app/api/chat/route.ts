import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    if (!message) {
      return NextResponse.json({ error: "Mensagem é obrigatória" }, { status: 400 });
    }

    // Inicializa o SDK do Gemini com a sua chave
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

    // Engenharia de Prompt: Instruções de sistema para o modelo
    const systemPrompt = `Você é o LuksAI, o assistente virtual do portfólio de Lucas Dickmann.
    Seja conciso, profissional, amigável e focado em tecnologia.
    Diretrizes sobre o Lucas:
    - Analista de Sistemas e Desenvolvedor Full-Stack (Next.js, Python, TypeScript, Tailwind).
    - Especialista em Engenharia de Prompt e integração de Agentes Inteligentes (LLMs, LangChain).
    - Formação: Concluindo Análise e Desenvolvimento de Sistemas na UNIVALI (2026).
    - Projetos principais: Belz Agent (Sistema Multi-agente autônomo) e Belezuura (E-commerce Headless consumindo a API do Wix).
    Se o usuário perguntar sobre contato, informe que ele pode usar o LinkedIn ou acessar a seção de contato da página.`;
    // Seleciona o modelo e injeta o contexto
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      systemInstruction: systemPrompt
    });

    // Envia a mensagem do usuário
    const result = await model.generateContent(message);
    const reply = result.response.text();

    return NextResponse.json({ reply });
  } catch (error) {
    console.error('Erro no Chat API (Gemini):', error);
    return NextResponse.json(
      { error: "Falha ao processar a resposta da IA." },
      { status: 500 }
    );
  }
}
