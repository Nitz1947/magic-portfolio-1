import { NextResponse } from "next/server";

type ContactPayload = {
  name: string;
  email: string;
  message: string;
  locale?: string;
};

function validatePayload(raw: unknown): { ok: true; data: ContactPayload } | { ok: false; error: string } {
  if (!raw || typeof raw !== "object") {
    return { ok: false, error: "Invalid payload" };
  }

  const body = raw as Record<string, unknown>;
  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const message = typeof body.message === "string" ? body.message.trim() : "";
  const locale = typeof body.locale === "string" ? body.locale : "pl";

  if (!name || !email || !message) {
    return { ok: false, error: "Missing required fields" };
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { ok: false, error: "Invalid email" };
  }

  return { ok: true, data: { name, email, message, locale } };
}

function buildEmailHtml(data: ContactPayload): string {
  return `
    <div style="font-family: system-ui, sans-serif; line-height: 1.5;">
      <h2 style="font-size: 18px;">Contact message</h2>
      <ul>
        <li><strong>Name:</strong> ${data.name}</li>
        <li><strong>Email:</strong> <a href="mailto:${data.email}">${data.email}</a></li>
        <li><strong>Locale:</strong> ${data.locale}</li>
      </ul>
      <h3 style="font-size: 16px;">Message</h3>
      <p style="white-space: pre-wrap;">${data.message}</p>
    </div>
  `;
}

async function sendViaResend(html: string, subject: string, replyTo: string) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return { sent: false as const, reason: "missing_resend_key" };

  const from = process.env.FROM_EMAIL || "onboarding@resend.dev";
  const to = process.env.TO_EMAIL || "kgdev@biuro.net";

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: replyTo,
      subject,
      html,
    }),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`Resend error: ${errorBody}`);
  }

  return { sent: true as const, provider: "resend" };
}

async function sendViaFormspree(data: ContactPayload, html: string) {
  const endpoint = process.env.FORMSPREE_ENDPOINT;
  if (!endpoint) return { sent: false as const, reason: "missing_formspree" };

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      _subject: `Contact — ${data.name}`,
      _replyto: data.email,
      message: html,
      payload: data,
    }),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`Formspree error: ${errorBody}`);
  }

  return { sent: true as const, provider: "formspree" };
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validation = validatePayload(body);

    if (!validation.ok) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }

    const data = validation.data;
    const html = buildEmailHtml(data);
    const subject = `Kontakt: ${data.name}`;

    let delivery: { sent: boolean; provider?: string; reason?: string } = { sent: false };

    try {
      delivery = await sendViaResend(html, subject, data.email);
    } catch (error) {
      console.error("[contact] Resend failed:", error);
    }

    if (!delivery.sent) {
      try {
        delivery = await sendViaFormspree(data, html);
      } catch (error) {
        console.error("[contact] Formspree failed:", error);
      }
    }

    console.info("[contact] Message received:", {
      name: data.name,
      email: data.email,
      locale: data.locale,
      delivery,
    });

    if (!delivery.sent) {
      return NextResponse.json(
        {
          error:
            "Email delivery is not configured. Set RESEND_API_KEY or FORMSPREE_ENDPOINT in environment variables.",
          logged: true,
        },
        { status: 503 },
      );
    }

    return NextResponse.json({ ok: true, provider: delivery.provider });
  } catch (error) {
    console.error("[contact] Unexpected error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
