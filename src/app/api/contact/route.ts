import { NextResponse } from "next/server";

import { contactSchema } from "@/lib/contact-schema";

/**
 * Endpoint do formulário de contato.
 *
 * Encaminha a mensagem para o Web3Forms, que entrega por e-mail. A chave de
 * acesso fica no servidor (sem prefixo `NEXT_PUBLIC_`), então nunca chega ao
 * navegador.
 *
 * Para trocar de provedor (Formspree, Resend...), basta alterar o `fetch`
 * abaixo — o contrato com o cliente não muda.
 */
const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";

export async function POST(req: Request) {
  const accessKey = process.env.WEB3FORMS_ACCESS_KEY;

  if (!accessKey) {
    // Falha de configuração, não do visitante: não faz sentido pedir para ele
    // tentar de novo, então direcionamos para um canal que funciona.
    console.error("[contact] WEB3FORMS_ACCESS_KEY não está configurada.");
    return NextResponse.json(
      {
        error:
          "O formulário está fora do ar no momento. Me chame no e-mail ldickmann12@gmail.com que eu respondo rápido.",
      },
      { status: 503 }
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { error: "Requisição inválida." },
      { status: 400 }
    );
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      {
        error: "Confira os campos e tente novamente.",
        issues: parsed.error.flatten().fieldErrors,
      },
      { status: 400 }
    );
  }

  const { name, email, message, website } = parsed.data;

  // Honeypot preenchido: é bot. Responde 200 para não sinalizar a detecção,
  // mas descarta silenciosamente.
  if (website) {
    return NextResponse.json({ ok: true });
  }

  try {
    const response = await fetch(WEB3FORMS_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        access_key: accessKey,
        subject: `Portfólio — nova mensagem de ${name}`,
        from_name: "Portfólio Lucas Dickmann",
        name,
        email,
        message,
      }),
    });

    if (!response.ok) {
      const detail = await response.text();
      console.error("[contact] Web3Forms respondeu", response.status, detail);
      return NextResponse.json(
        {
          error:
            "Não consegui enviar sua mensagem agora. Tente pelo WhatsApp ou pelo e-mail ldickmann12@gmail.com.",
        },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[contact] Falha ao contatar o Web3Forms:", error);
    return NextResponse.json(
      {
        error:
          "Não consegui enviar sua mensagem agora. Tente pelo WhatsApp ou pelo e-mail ldickmann12@gmail.com.",
      },
      { status: 502 }
    );
  }
}
