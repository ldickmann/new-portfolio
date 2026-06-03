import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    if (!message) {
      return NextResponse.json({ error: "Mensagem é obrigatória" }, { status: 400 });
    }

    // Engenharia de Prompt embutida de forma segura no servidor
    const systemPrompt = `Você é o LuksAI, o assistente virtual do portfólio de Lucas Dickmann.
Seja conciso, profissional e amigável.
Diretrizes sobre o Lucas:
- Analista de Sistemas e Desenvolvedor Full-Stack (Next.js, Python, TypeScript, Tailwind).
- Especialista em Engenharia de Prompt e integração de Agentes Inteligentes (LLMs, LangChain).
- Formação: Cursando Análise e Desenvolvimento de Sistemas na UNIVALI (formatura em meados de 2026).
- Projetos principais: Belz Agent (Sistema Multi-agente autônomo) e Belezuura (E-commerce Headless consumindo a API do Wix).
Se o usuário perguntar sobre contato, informe que ele pode usar o formulário da página ou o LinkedIn.`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini', // Modelo rápido e de baixo custo
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: message }
        ],
        temperature: 0.7,
        max_tokens: 150,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error?.message || 'Erro na API da OpenAI');
    }

    const reply = data.choices[0].message.content;

    return NextResponse.json({ reply });
  } catch (error) {
    console.error('Erro no Chat API:', error);
    return NextResponse.json(
      { error: "Falha ao processar a resposta da IA." },
      { status: 500 }
    );
  }
}