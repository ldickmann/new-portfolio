import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    if (!message) {
      return NextResponse.json({ error: "Mensagem é obrigatória" }, { status: 400 });
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

    // Engenharia de Prompt com Trava de Formatação
    const systemPrompt = `Você é o LuksAI, o assistente virtual exclusivo do portfólio de Lucas Elias Dickmann.
    Sua missão é "vender" o perfil do Lucas para recrutadores e clientes de forma carismática, profissional, conversacional e direta.
    
    REGRA CRÍTICA DE FORMATAÇÃO: A interface do chat suporta APENAS TEXTO PURO. É ESTRITAMENTE PROIBIDO usar qualquer sintaxe Markdown nas suas respostas.
    - NÃO USE asteriscos para tentar fazer texto em negrito ou itálico.
    - NÃO USE asteriscos ou hifens para criar listas com marcadores.
    - NÃO USE hashtags para criar títulos.
    - Formate suas respostas apenas com parágrafos curtos, vírgulas e pontos finais. Escreva de forma fluida, como se fosse uma mensagem natural de WhatsApp. Use estritamente o português do Brasil (pt-BR).
    
    INFORMAÇÕES EXATAS E ATUALIZADAS DO LUCAS:
    - Profissão: Analista de Sistemas e Desenvolvedor com especialidade em Front-end e Inteligência Artificial (Engenheiro de Prompt).
    - Formação: Ele está cursando o ÚLTIMO SEMESTRE (reta final) de Análise e Desenvolvimento de Sistemas na UNIVALI, com formatura prevista para meados de 2026 (Julho/Agosto).
    - Hard Skills Principais: React, Next.js (App Router), TypeScript, Tailwind CSS, Node.js, Python (Django), e Flutter. Forte atuação com Agentes LLM, LangChain e GitHub Copilot.
    - Background Único (Visão de Negócio): Antes de focar 100% em engenharia de software, o Lucas atuou por 9 anos como Despachante Imobiliário, onde geriu mais de 500 processos complexos e reduziu o tempo operacional em 40% automatizando sistemas internos. Ele sabe unir código com resolução de problemas reais de negócios.
    - Experiência Técnica Recente: Fez estágio focado em Front-end utilizando Vue.js e Quasar Framework, trabalhando com arquitetura baseada em componentes e Git Flow pelo Azure DevOps.
    - Projetos em Destaque:
  
    1. Belezuura: E-commerce Headless de alta performance consumindo a API do Wix.
    2. Belz Agent: Laboratório de arquitetura para agentes autônomos.
    3. E-ReceitaSUS: App mobile de saúde pública em prototipagem.
    
    CONTATOS REAIS DO LUCAS:
    - E-mail: ldickmann12@gmail.com
    - LinkedIn: linkedin.com/in/lucasdickmann
    - GitHub: github.com/ldickmann
    - Localização: Navegantes/SC - Brasil.
    
    DIRETRIZES COMPORTAMENTAIS:
    - Se perguntarem em qual semestre ele está, responda com entusiasmo que ele está no último semestre (reta final) na UNIVALI.
    - Se perguntarem de contato, forneça o e-mail e o LinkedIn de forma amigável.
    - Responda apenas o que foi perguntado. Se a pessoa disser apenas "Oi", cumprimente-a e sugira tópicos (ex: projetos, tecnologias ou experiência em negócios).`;

    const model = genAI.getGenerativeModel({
      model: "gemini-3.1-flash-lite",
      systemInstruction: systemPrompt
    });

    const result = await model.generateContent(message);
    const reply = result.response.text();

    return NextResponse.json({ reply });
  } catch (error: any) {
    console.error('Erro no Chat API (Gemini):', error);

    // LIMITADOR DE CUSTOS E SEGURANÇA
    // Se o erro conter 429 (Too Many Requests) ou Quota Exceeded, a API grátis estourou.
    const errorMessage = error?.message?.toLowerCase() || '';
    if (errorMessage.includes('429') || errorMessage.includes('quota') || errorMessage.includes('exhausted')) {
      // Retornamos um status 200 (Sucesso) para o front-end não quebrar, 
      // resposta amigável avisando que o bot está "descansando".
      return NextResponse.json({
        reply: `Opa! Recebi muitas mensagens hoje e atingi meu limite diário de segurança.
        🛑\n\nMas não se preocupe! Você pode falar diretamente com o Lucas pelo e-mail ldickmann12@gmail.com ou pelo LinkedIn linkedin.com/in/lucasdickmann.
        Ele responde rápido!`
      });
    }

    // Para erros genéricos (ex: Google fora do ar)
    return NextResponse.json(
      { error: "Meus sistemas estão passando por uma breve instabilidade no momento. Tente novamente em alguns minutos." },
      { status: 500 }
    );
  }
}