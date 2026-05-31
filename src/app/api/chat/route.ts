import { google } from "@ai-sdk/google";
import { streamText, convertToModelMessages, type UIMessage } from "ai";

/**
 * Tempo máximo (em segundos) que a função de streaming pode executar.
 * Necessário em ambientes serverless (ex.: Vercel) para respostas longas.
 */
export const maxDuration = 30;

/**
 * Prompt de sistema que define a persona e o conhecimento do assistente.
 * Mantém o bot focado no contexto do portfólio do Lucas.
 */
const SYSTEM_PROMPT = `Você é o "LuksAI", o assistente virtual do portfólio de Lucas Dickmann,
um desenvolvedor de software full stack com foco em Inteligência Artificial e LLMs.

Diretrizes:
- Responda SEMPRE em português do Brasil, de forma amigável, concisa e profissional.
- Seu objetivo é ajudar visitantes a conhecerem o trabalho do Lucas.
- Conhecimento sobre o Lucas:
  • Stack principal: Next.js, React, TypeScript, Tailwind CSS, Node.js, Python, FastAPI, LangChain.
  • Projetos em destaque: "Belz Agent" (ecossistema de agentes autônomos de IA),
    "Belezuura" (e-commerce headless com Next.js) e "E-ReceitaSUS" (app de saúde pública).
  • Formação: Análise e Desenvolvimento de Sistemas na UNIVALI (conclusão em 2026).
  • Contato: ldickmann12@gmail.com e LinkedIn.
  • Está aberto a novas oportunidades para 2026.
- Se perguntarem algo fora do contexto do portfólio, redirecione gentilmente para temas
  sobre o trabalho, projetos, stack ou contato do Lucas.
- Seja breve: respostas curtas e diretas funcionam melhor neste chat.`;

/**
 * Endpoint de chat com streaming.
 *
 * Recebe o histórico de mensagens da UI, converte para o formato do modelo,
 * invoca o Gemini Flash via Vercel AI SDK e devolve um stream compatível com
 * o hook `useChat` do front-end.
 */
export async function POST(req: Request) {
  // Extrai o histórico de mensagens no formato de UI enviado pelo cliente.
  const { messages }: { messages: UIMessage[] } = await req.json();

  // Inicia a geração de texto em streaming com o modelo Gemini Flash.
  const result = streamText({
    model: google("gemini-1.5-flash"),
    system: SYSTEM_PROMPT,
    messages: await convertToModelMessages(messages),
  });

  // Retorna a resposta como stream consumível pelo `useChat`.
  return result.toUIMessageStreamResponse();
}
