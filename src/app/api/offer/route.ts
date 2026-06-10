import { NextResponse } from "next/server";

/**
 * Email delivery:
 * 1. Resend (recommended on Vercel) — set RESEND_API_KEY, FROM_EMAIL, TO_EMAIL in env.
 *    Get API key: https://resend.com/api-keys
 *    FROM_EMAIL must be a verified domain or use onboarding@resend.dev for testing.
 * 2. Formspree fallback — set FORMSPREE_ENDPOINT (e.g. https://formspree.io/f/xxxxxxxx).
 */

type OfferContact = {
  name: string;
  email: string;
  phone?: string;
  company?: string;
};

type OfferPayload = {
  locale: string;
  projectTypes: string[];
  features: string[];
  designStyle: string;
  integrations: string[];
  budget: string;
  timeline: string;
  vision: string;
  contact: OfferContact;
};

const LABELS = {
  pl: {
    projectTypes: {
      corporate: "Strona firmowa",
      shop: "Sklep internetowy",
      landing: "Landing page",
      gaming: "Community / gaming",
      admin: "Panel administracyjny",
      discord: "Integracja Discord",
      seo: "SEO / audyt",
      redesign: "Redesign",
      other: "Inne",
    },
    features: {
      cms: "CMS",
      i18n: "i18n PL/EN",
      contactForm: "Formularz kontaktowy",
      payments: "Płatności",
      oauth: "Logowanie OAuth",
      blog: "Blog",
      gallery: "Galeria",
      animations: "Animacje premium",
      seo: "SEO",
      hosting: "Hosting setup",
      maintenance: "Maintenance",
    },
    budgets: {
      "up-to-3k": "Do 3 000 PLN",
      "3k-8k": "3 000 – 8 000 PLN",
      "8k-15k": "8 000 – 15 000 PLN",
      "15k-plus": "15 000+ PLN",
      tbd: "Do ustalenia",
    },
    timelines: {
      asap: "ASAP",
      "1-month": "1 miesiąc",
      "2-3-months": "2–3 miesiące",
      flexible: "Elastycznie",
    },
    designStyles: {
      minimalist: "Minimalistyczny",
      corporate: "Corporate",
      gaming: "Gaming",
      "dark-premium": "Dark premium",
      "light-clean": "Light clean",
    },
    integrations: {
      discord: "Discord",
      stripe: "Stripe",
      "oauth-google": "OAuth Google",
      "oauth-discord": "OAuth Discord",
      cms: "Headless CMS",
      analytics: "Analityka",
    },
    headings: {
      projectTypes: "Typ projektu",
      features: "Wybrane moduły",
      design: "Styl designu",
      integrations: "Integracje",
      budget: "Budżet",
      timeline: "Termin",
      vision: "Wizja klienta",
      contact: "Dane kontaktowe",
    },
  },
  en: {
    projectTypes: {
      corporate: "Corporate website",
      shop: "E-commerce store",
      landing: "Landing page",
      gaming: "Community / gaming",
      admin: "Admin panel",
      discord: "Discord integration",
      seo: "SEO / audit",
      redesign: "Redesign",
      other: "Other",
    },
    features: {
      cms: "CMS",
      i18n: "i18n PL/EN",
      contactForm: "Contact form",
      payments: "Payments",
      oauth: "OAuth login",
      blog: "Blog",
      gallery: "Gallery",
      animations: "Premium animations",
      seo: "SEO",
      hosting: "Hosting setup",
      maintenance: "Maintenance",
    },
    budgets: {
      "up-to-3k": "Up to PLN 3,000",
      "3k-8k": "PLN 3,000 – 8,000",
      "8k-15k": "PLN 8,000 – 15,000",
      "15k-plus": "PLN 15,000+",
      tbd: "To be discussed",
    },
    timelines: {
      asap: "ASAP",
      "1-month": "1 month",
      "2-3-months": "2–3 months",
      flexible: "Flexible",
    },
    designStyles: {
      minimalist: "Minimalist",
      corporate: "Corporate",
      gaming: "Gaming",
      "dark-premium": "Dark premium",
      "light-clean": "Light clean",
    },
    integrations: {
      discord: "Discord",
      stripe: "Stripe",
      "oauth-google": "OAuth Google",
      "oauth-discord": "OAuth Discord",
      cms: "Headless CMS",
      analytics: "Analytics",
    },
    headings: {
      projectTypes: "Project type",
      features: "Selected modules",
      design: "Design style",
      integrations: "Integrations",
      budget: "Budget",
      timeline: "Timeline",
      vision: "Client vision",
      contact: "Contact details",
    },
  },
} as const;

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validatePayload(body: unknown): { ok: true; data: OfferPayload } | { ok: false; error: string } {
  if (!body || typeof body !== "object") {
    return { ok: false, error: "Invalid request body" };
  }

  const raw = body as Record<string, unknown>;
  const contactRaw = raw.contact as Record<string, unknown> | undefined;

  const projectTypes = Array.isArray(raw.projectTypes)
    ? raw.projectTypes.filter((item): item is string => typeof item === "string")
    : [];
  const features = Array.isArray(raw.features)
    ? raw.features.filter((item): item is string => typeof item === "string")
    : [];
  const designStyle = typeof raw.designStyle === "string" ? raw.designStyle : "";
  const integrations = Array.isArray(raw.integrations)
    ? raw.integrations.filter((item): item is string => typeof item === "string")
    : [];
  const budget = typeof raw.budget === "string" ? raw.budget : "";
  const timeline = typeof raw.timeline === "string" ? raw.timeline : "";
  const vision = typeof raw.vision === "string" ? raw.vision.trim() : "";
  const locale = typeof raw.locale === "string" ? raw.locale : "pl";

  const name = typeof contactRaw?.name === "string" ? contactRaw.name.trim() : "";
  const email = typeof contactRaw?.email === "string" ? contactRaw.email.trim() : "";
  const phone = typeof contactRaw?.phone === "string" ? contactRaw.phone.trim() : undefined;
  const company = typeof contactRaw?.company === "string" ? contactRaw.company.trim() : undefined;

  if (projectTypes.length === 0) return { ok: false, error: "Select at least one project type" };
  if (!budget) return { ok: false, error: "Budget is required" };
  if (!timeline) return { ok: false, error: "Timeline is required" };
  if (!vision) return { ok: false, error: "Vision description is required" };
  if (!name) return { ok: false, error: "Name is required" };
  if (!email || !isValidEmail(email)) return { ok: false, error: "Valid email is required" };

  return {
    ok: true,
    data: {
      locale,
      projectTypes,
      features,
      designStyle,
      integrations,
      budget,
      timeline,
      vision,
      contact: { name, email, phone, company },
    },
  };
}

function resolveLabel<T extends Record<string, string>>(map: T, key: string) {
  return map[key as keyof T] ?? key;
}

function buildEmailHtml(data: OfferPayload) {
  const lang = data.locale === "en" ? LABELS.en : LABELS.pl;
  const list = (items: string[], map: Record<string, string>) =>
    items.length > 0
      ? `<ul>${items.map((item) => `<li>${resolveLabel(map, item)}</li>`).join("")}</ul>`
      : "<p><em>—</em></p>";

  return `
    <div style="font-family: system-ui, sans-serif; color: #111; line-height: 1.5; max-width: 640px;">
      <h1 style="font-size: 20px; margin-bottom: 8px;">Nowe zapytanie ofertowe / New quote request</h1>
      <p style="color: #555; margin-top: 0;">Locale: <strong>${data.locale}</strong></p>
      <hr style="border: none; border-top: 1px solid #e5e5e5; margin: 24px 0;" />
      <h2 style="font-size: 16px;">${lang.headings.projectTypes}</h2>
      ${list(data.projectTypes, lang.projectTypes)}
      <h2 style="font-size: 16px;">${lang.headings.features}</h2>
      ${list(data.features, lang.features)}
      <h2 style="font-size: 16px;">${lang.headings.design}</h2>
      <p><strong>${data.designStyle ? resolveLabel(lang.designStyles, data.designStyle) : "—"}</strong></p>
      <h2 style="font-size: 16px;">${lang.headings.integrations}</h2>
      ${list(data.integrations, lang.integrations)}
      <h2 style="font-size: 16px;">${lang.headings.budget}</h2>
      <p><strong>${resolveLabel(lang.budgets, data.budget)}</strong></p>
      <h2 style="font-size: 16px;">${lang.headings.timeline}</h2>
      <p><strong>${resolveLabel(lang.timelines, data.timeline)}</strong></p>
      <h2 style="font-size: 16px;">${lang.headings.vision}</h2>
      <p style="white-space: pre-wrap; background: #f7f7f7; padding: 12px; border-radius: 8px;">${data.vision}</p>
      <h2 style="font-size: 16px;">${lang.headings.contact}</h2>
      <ul>
        <li><strong>Imię / Name:</strong> ${data.contact.name}</li>
        <li><strong>Email:</strong> <a href="mailto:${data.contact.email}">${data.contact.email}</a></li>
        ${data.contact.phone ? `<li><strong>Tel.:</strong> ${data.contact.phone}</li>` : ""}
        ${data.contact.company ? `<li><strong>Firma / Company:</strong> ${data.contact.company}</li>` : ""}
      </ul>
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

async function sendViaFormspree(data: OfferPayload, html: string) {
  const endpoint = process.env.FORMSPREE_ENDPOINT;
  if (!endpoint) return { sent: false as const, reason: "missing_formspree" };

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      _subject: `Quote request — ${data.contact.name}`,
      _replyto: data.contact.email,
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
    const subject = `Oferta: ${data.contact.name} — ${data.projectTypes.join(", ")}`;

    let delivery: { sent: boolean; provider?: string; reason?: string } = { sent: false };

    try {
      delivery = await sendViaResend(html, subject, data.contact.email);
    } catch (error) {
      console.error("[offer] Resend failed:", error);
    }

    if (!delivery.sent) {
      try {
        delivery = await sendViaFormspree(data, html);
      } catch (error) {
        console.error("[offer] Formspree failed:", error);
      }
    }

    console.info("[offer] Quote request received:", {
      name: data.contact.name,
      email: data.contact.email,
      projectTypes: data.projectTypes,
      features: data.features,
      designStyle: data.designStyle,
      integrations: data.integrations,
      budget: data.budget,
      timeline: data.timeline,
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
    console.error("[offer] Unexpected error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
