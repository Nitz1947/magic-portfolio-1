import type { Locale } from "./config";

export type UiStrings = {
  latestFromBlog: string;
  viewProjects: string;
  contactMe: string;
  featuredProject: string;
  featuredProjects: string;
  featuredProjectsSubline: string;
  process: {
    title: string;
    steps: Array<{ number: string; title: string; description: string }>;
  };
  notFound: {
    title: string;
    description: string;
  };
  routeGuard: {
    protectedTitle: string;
    passwordLabel: string;
    submit: string;
    incorrectPassword: string;
  };
  mailchimp: {
    emailPlaceholder: string;
    subscribe: string;
    invalidEmail: string;
  };
  footer: {
    buildWith: string;
    ctaTitle: string;
    ctaDescription: string;
  };
  socialProof: {
    ariaLabel: string;
    available: string;
    items: Array<{ value: string; label: string }>;
  };
  homeCta: {
    title: string;
    description: string;
  };
  about: {
    scheduleCall: string;
  };
  blog: {
    label: string;
    recentPosts: string;
  };
  work: {
    label: string;
    relatedProjects: string;
    readCaseStudy: string;
    viewProject: string;
    preview: string;
    openLive: string;
    closePreview: string;
    previewLoading: string;
    previewBlocked: string;
    previewPlaceholder: string;
  };
  slideshow: {
    label: string;
    prev: string;
    next: string;
  };
  quote: {
    navLabel: string;
    pageTitle: string;
    pageDescription: string;
    contactNav: string;
  };
  services: {
    title: string;
    subline: string;
    cta: string;
    items: Array<{
      id: string;
      title: string;
      description: string;
      icon: string;
    }>;
  };
  offerBuilder: {
    title: string;
    subline: string;
    steps: string[];
    stepLabel: string;
    stepHints: {
      projectType: string;
      features: string;
      design: string;
      integrations: string;
    };
    sections: {
      projectType: string;
      features: string;
      design: string;
      integrations: string;
      budget: string;
      timeline: string;
      vision: string;
      contact: string;
    };
    projectTypes: Array<{ id: string; label: string }>;
    features: Array<{ id: string; label: string }>;
    designStyles: Array<{ id: string; label: string; description: string }>;
    integrations: Array<{ id: string; label: string }>;
    budgets: Array<{ id: string; label: string }>;
    timelines: Array<{ id: string; label: string }>;
    summary: {
      title: string;
    };
    fields: {
      name: string;
      email: string;
      phone: string;
      company: string;
      visionPlaceholder: string;
    };
    placeholders: {
      select: string;
    };
    next: string;
    prev: string;
    backHome: string;
    submit: string;
    submitting: string;
    submitAnother: string;
    success: {
      title: string;
      description: string;
    };
    errors: {
      required: string;
      email: string;
      projectType: string;
      generic: string;
    };
  };
  relativeTime: {
    justNow: string;
    minutes: string;
    hours: string;
    days: string;
    months: string;
    years: string;
  };
};

const uiStrings: Record<Locale, UiStrings> = {
  en: {
    latestFromBlog: "Latest from the blog",
    viewProjects: "View work",
    contactMe: "Get in touch",
    featuredProject: "Featured project",
    featuredProjects: "Selected work",
    featuredProjectsSubline:
      "Three live Vercel projects — browse the slideshow, open the site, or read the case study.",
    process: {
      title: "How I work",
      steps: [
        {
          number: "01",
          title: "Brief",
          description:
            "We align on goals, target audience, and scope — so the site solves a real business problem.",
        },
        {
          number: "02",
          title: "Design",
          description:
            "Structure, user flow, and visual direction tailored to your brand — no generic templates.",
        },
        {
          number: "03",
          title: "Build",
          description:
            "Iterative development with preview deploys — you see progress before launch day.",
        },
        {
          number: "04",
          title: "Launch",
          description:
            "Vercel deploy, performance tuning, and handover — ready to use from day one.",
        },
      ],
    },
    notFound: {
      title: "Page Not Found",
      description: "The page you are looking for does not exist.",
    },
    routeGuard: {
      protectedTitle: "This page is password protected",
      passwordLabel: "Password",
      submit: "Submit",
      incorrectPassword: "Incorrect password",
    },
    mailchimp: {
      emailPlaceholder: "Email",
      subscribe: "Subscribe",
      invalidEmail: "Please enter a valid email address.",
    },
    footer: {
      buildWith: "Build your portfolio with",
      ctaTitle: "Have a project in mind?",
      ctaDescription:
        "Tell me about your goals — I'll reply with a clear scope, timeline, and quote within 1–2 business days.",
    },
    socialProof: {
      ariaLabel: "Portfolio highlights",
      available: "Available for new projects",
      items: [
        { value: "100% Custom", label: "No templates" },
        { value: "Next.js + React", label: "Modern stack" },
        { value: "Brief → Deploy", label: "Full process" },
        { value: "24–48h reply", label: "Fast quote" },
      ],
    },
    homeCta: {
      title: "Ready to build something real?",
      description:
        "From brief to Vercel deploy — custom Next.js sites and apps with preview deploys at every stage.",
    },
    about: {
      scheduleCall: "Schedule a call",
    },
    blog: {
      label: "Blog",
      recentPosts: "Recent posts",
    },
    work: {
      label: "Projects",
      relatedProjects: "Related projects",
      readCaseStudy: "Read case study",
      viewProject: "View project",
      preview: "Preview",
      openLive: "Open live",
      closePreview: "Close",
      previewLoading: "Loading preview…",
      previewBlocked: "Live embed unavailable — open the site directly",
      previewPlaceholder: "Click to open the live site",
    },
    slideshow: {
      label: "Project slideshow",
      prev: "Previous project",
      next: "Next project",
    },
    quote: {
      navLabel: "Quote",
      pageTitle: "Build your quote",
      pageDescription:
        "Configure your project step by step — project type, modules, design, integrations, budget, and contact. I'll reply with a clear proposal.",
      contactNav: "Contact",
    },
    services: {
      title: "Services",
      subline:
        "From corporate sites to gaming communities — I build fast, maintainable Next.js products deployed on Vercel.",
      cta: "Build your quote",
      items: [
        {
          id: "corporate",
          title: "Corporate website",
          description:
            "Brand-aligned company sites with CMS, contact flows, and SEO foundations — built to convert visitors into leads.",
          icon: "building",
        },
        {
          id: "gaming",
          title: "Gaming & community",
          description:
            "Discord integrations, fan hubs, and community portals with live data, auth, and engagement features.",
          icon: "discord",
        },
        {
          id: "shop",
          title: "E-commerce",
          description:
            "Product catalogs, checkout flows, and payment integrations — performant storefronts ready to scale.",
          icon: "cart",
        },
        {
          id: "landing",
          title: "Landing pages",
          description:
            "High-converting campaign pages with premium motion, A/B-ready structure, and analytics hooks.",
          icon: "mobile",
        },
        {
          id: "seo",
          title: "SEO & audits",
          description:
            "Technical SEO reviews, Core Web Vitals fixes, schema markup, and content structure improvements.",
          icon: "search",
        },
        {
          id: "admin",
          title: "Admin panels",
          description:
            "Internal dashboards, role-based access, and workflow tools tailored to how your team actually operates.",
          icon: "grid",
        },
      ],
    },
    offerBuilder: {
      title: "Build your quote",
      subline:
        "Six-step configurator — pick what you need and I'll reply with scope, timeline, and a clear proposal.",
      steps: [
        "Project type",
        "Modules",
        "Design & style",
        "Integrations",
        "Budget & timeline",
        "Contact",
      ],
      stepLabel: "Step {current} of {total}",
      stepHints: {
        projectType: "Select one or more project types that match your goal.",
        features: "Choose modules and features you need in the product.",
        design: "Pick a visual direction — I'll tailor UI and motion to your brand.",
        integrations: "Optional third-party services to connect at launch.",
      },
      sections: {
        projectType: "Project type",
        features: "Modules",
        design: "Design style",
        integrations: "Integrations",
        budget: "Budget range",
        timeline: "Timeline",
        vision: "Your vision",
        contact: "Contact details",
      },
      projectTypes: [
        { id: "corporate", label: "Corporate website" },
        { id: "shop", label: "E-commerce store" },
        { id: "landing", label: "Landing page" },
        { id: "gaming", label: "Community / gaming" },
        { id: "admin", label: "Admin panel" },
        { id: "discord", label: "Discord integration" },
        { id: "seo", label: "SEO / audit" },
        { id: "redesign", label: "Redesign" },
        { id: "other", label: "Other" },
      ],
      features: [
        { id: "cms", label: "CMS" },
        { id: "i18n", label: "i18n PL/EN" },
        { id: "contactForm", label: "Contact form" },
        { id: "payments", label: "Payments" },
        { id: "oauth", label: "OAuth login" },
        { id: "blog", label: "Blog" },
        { id: "gallery", label: "Gallery" },
        { id: "animations", label: "Premium animations" },
        { id: "seo", label: "SEO" },
        { id: "hosting", label: "Hosting setup" },
        { id: "maintenance", label: "Maintenance" },
      ],
      designStyles: [
        {
          id: "minimalist",
          label: "Minimalist",
          description: "Clean layout, generous whitespace, focused typography.",
        },
        {
          id: "corporate",
          label: "Corporate",
          description: "Trust-first B2B look with structured sections and clarity.",
        },
        {
          id: "gaming",
          label: "Gaming",
          description: "Bold accents, energy, and community-driven UI patterns.",
        },
        {
          id: "dark-premium",
          label: "Dark premium",
          description: "Deep surfaces, cyan accents, cinematic depth.",
        },
        {
          id: "light-clean",
          label: "Light clean",
          description: "Bright, accessible interface with subtle brand color.",
        },
      ],
      integrations: [
        { id: "discord", label: "Discord" },
        { id: "stripe", label: "Stripe" },
        { id: "oauth-google", label: "OAuth Google" },
        { id: "oauth-discord", label: "OAuth Discord" },
        { id: "cms", label: "Headless CMS" },
        { id: "analytics", label: "Analytics (GA / Plausible)" },
      ],
      summary: {
        title: "Your quote at a glance",
      },
      budgets: [
        { id: "up-to-3k", label: "Up to PLN 3,000" },
        { id: "3k-8k", label: "PLN 3,000 – 8,000" },
        { id: "8k-15k", label: "PLN 8,000 – 15,000" },
        { id: "15k-plus", label: "PLN 15,000+" },
        { id: "tbd", label: "To be discussed" },
      ],
      timelines: [
        { id: "asap", label: "ASAP" },
        { id: "1-month", label: "1 month" },
        { id: "2-3-months", label: "2–3 months" },
        { id: "flexible", label: "Flexible" },
      ],
      fields: {
        name: "Full name",
        email: "Email",
        phone: "Phone (optional)",
        company: "Company (optional)",
        visionPlaceholder: "Describe goals, audience, references, and must-have features…",
      },
      placeholders: {
        select: "Select…",
      },
      next: "Next step",
      prev: "Back",
      backHome: "Back to home",
      submit: "Send quote request",
      submitting: "Sending…",
      submitAnother: "Send another request",
      success: {
        title: "Request sent",
        description: "Thanks — I'll review your brief and get back to you within 1–2 business days.",
      },
      errors: {
        required: "This field is required",
        email: "Enter a valid email address",
        projectType: "Select at least one project type",
        generic: "Something went wrong. Please try again or email kgdev@biuro.net directly.",
      },
    },
    relativeTime: {
      justNow: "just now",
      minutes: "m ago",
      hours: "h ago",
      days: "d ago",
      months: "mo ago",
      years: "y ago",
    },
  },
  pl: {
    latestFromBlog: "Najnowsze wpisy na blogu",
    viewProjects: "Zobacz realizacje",
    contactMe: "Napisz do mnie",
    featuredProject: "Wyróżniony projekt",
    featuredProjects: "Wybrane realizacje",
    featuredProjectsSubline:
      "Trzy projekty live na Vercel — przełączaj slajdy, otwórz stronę lub czytaj case study.",
    process: {
      title: "Jak pracuję",
      steps: [
        {
          number: "01",
          title: "Brief",
          description:
            "Ustalamy cele, grupę docelową i zakres — żeby strona rozwiązywała realny problem biznesowy.",
        },
        {
          number: "02",
          title: "Projekt",
          description:
            "Struktura, flow użytkownika i kierunek wizualny dopasowany do marki — bez gotowych szablonów.",
        },
        {
          number: "03",
          title: "Wdrożenie",
          description:
            "Iteracyjne kodowanie z preview deployami — widzisz postęp przed dniem launchu.",
        },
        {
          number: "04",
          title: "Launch",
          description:
            "Deploy na Vercel, optymalizacja i przekazanie — gotowe do użytku od pierwszego dnia.",
        },
      ],
    },
    notFound: {
      title: "Nie znaleziono strony",
      description: "Strona, której szukasz, nie istnieje.",
    },
    routeGuard: {
      protectedTitle: "Ta strona jest chroniona hasłem",
      passwordLabel: "Hasło",
      submit: "Zaloguj",
      incorrectPassword: "Nieprawidłowe hasło",
    },
    mailchimp: {
      emailPlaceholder: "E-mail",
      subscribe: "Zapisz się",
      invalidEmail: "Podaj prawidłowy adres e-mail.",
    },
    footer: {
      buildWith: "Zbuduj portfolio z",
      ctaTitle: "Masz projekt do zrealizowania?",
      ctaDescription:
        "Opowiedz o celach — odpowiem z jasnym zakresem, harmonogramem i wyceną w ciągu 1–2 dni roboczych.",
    },
    socialProof: {
      ariaLabel: "Najważniejsze informacje o portfolio",
      available: "Dostępny do współpracy",
      items: [
        { value: "100% Custom", label: "Bez szablonów" },
        { value: "Next.js + React", label: "Nowoczesny stack" },
        { value: "Od briefu po deploy", label: "Pełny proces" },
        { value: "Odpowiedź 24–48h", label: "Szybka wycena" },
      ],
    },
    homeCta: {
      title: "Gotowy zbudować coś konkretnego?",
      description:
        "Od briefu po deploy na Vercel — custom strony i aplikacje Next.js z preview deployami na każdym etapie.",
    },
    about: {
      scheduleCall: "Umów rozmowę",
    },
    blog: {
      label: "Blog",
      recentPosts: "Najnowsze wpisy",
    },
    work: {
      label: "Projekty",
      relatedProjects: "Powiązane projekty",
      readCaseStudy: "Czytaj case study",
      viewProject: "Zobacz projekt",
      preview: "Podgląd",
      openLive: "Otwórz live",
      closePreview: "Zamknij",
      previewLoading: "Ładowanie podglądu…",
      previewBlocked: "Podgląd niedostępny — otwórz stronę bezpośrednio",
      previewPlaceholder: "Kliknij, aby otworzyć stronę na żywo",
    },
    slideshow: {
      label: "Slideshow projektów",
      prev: "Poprzedni projekt",
      next: "Następny projekt",
    },
    quote: {
      navLabel: "Oferta",
      pageTitle: "Konfigurator oferty",
      pageDescription:
        "Skonfiguruj projekt krok po kroku — typ, moduły, design, integracje, budżet i kontakt. Odpowiem z jasną propozycją.",
      contactNav: "Kontakt",
    },
    services: {
      title: "Usługi",
      subline:
        "Od stron firmowych po community gamingowe — buduję szybkie, utrzymywalne produkty Next.js z deployem na Vercel.",
      cta: "Zbuduj swoją ofertę",
      items: [
        {
          id: "corporate",
          title: "Strona firmowa",
          description:
            "Serwisy dopasowane do marki z CMS, formularzami i fundamentem SEO — zaprojektowane, by zamieniać odwiedzających w leady.",
          icon: "building",
        },
        {
          id: "gaming",
          title: "Gaming i community",
          description:
            "Integracje Discord, huby fanowskie i portale społeczności z danymi live, autoryzacją i funkcjami angażującymi.",
          icon: "discord",
        },
        {
          id: "shop",
          title: "Sklep internetowy",
          description:
            "Katalogi produktów, checkout i płatności — wydajne sklepy gotowe do skalowania.",
          icon: "cart",
        },
        {
          id: "landing",
          title: "Landing page",
          description:
            "Strony kampanijne z premium animacjami, strukturą pod A/B i hookami analitycznymi.",
          icon: "mobile",
        },
        {
          id: "seo",
          title: "SEO i audyty",
          description:
            "Przeglądy techniczne SEO, poprawki Core Web Vitals, schema markup i struktura treści.",
          icon: "search",
        },
        {
          id: "admin",
          title: "Panele administracyjne",
          description:
            "Dashboardy wewnętrzne, role i narzędzia workflow dopasowane do pracy Twojego zespołu.",
          icon: "grid",
        },
      ],
    },
    offerBuilder: {
      title: "Konfigurator oferty",
      subline:
        "Sześć kroków — wybierz, czego potrzebujesz, a przejrzę brief i odpowiem z zakresem, terminem i jasną propozycją.",
      steps: [
        "Typ projektu",
        "Moduły",
        "Design i styl",
        "Integracje",
        "Budżet i termin",
        "Kontakt",
      ],
      stepLabel: "Krok {current} z {total}",
      stepHints: {
        projectType: "Wybierz jeden lub więcej typów projektu pasujących do celu.",
        features: "Zaznacz moduły i funkcje, które mają znaleźć się w produkcie.",
        design: "Wybierz kierunek wizualny — dopasuję UI i animacje do marki.",
        integrations: "Opcjonalne usługi zewnętrzne do podłączenia przy starcie.",
      },
      sections: {
        projectType: "Typ projektu",
        features: "Moduły",
        design: "Styl designu",
        integrations: "Integracje",
        budget: "Zakres budżetu",
        timeline: "Termin realizacji",
        vision: "Twoja wizja",
        contact: "Dane kontaktowe",
      },
      projectTypes: [
        { id: "corporate", label: "Strona firmowa" },
        { id: "shop", label: "Sklep internetowy" },
        { id: "landing", label: "Landing page" },
        { id: "gaming", label: "Community / gaming" },
        { id: "admin", label: "Panel administracyjny" },
        { id: "discord", label: "Integracja Discord" },
        { id: "seo", label: "SEO / audyt" },
        { id: "redesign", label: "Redesign" },
        { id: "other", label: "Inne" },
      ],
      features: [
        { id: "cms", label: "CMS" },
        { id: "i18n", label: "i18n PL/EN" },
        { id: "contactForm", label: "Formularz kontaktowy" },
        { id: "payments", label: "Płatności" },
        { id: "oauth", label: "Logowanie OAuth" },
        { id: "blog", label: "Blog" },
        { id: "gallery", label: "Galeria" },
        { id: "animations", label: "Animacje premium" },
        { id: "seo", label: "SEO" },
        { id: "hosting", label: "Hosting setup" },
        { id: "maintenance", label: "Maintenance" },
      ],
      designStyles: [
        {
          id: "minimalist",
          label: "Minimalistyczny",
          description: "Czysty layout, dużo przestrzeni, czytelna typografia.",
        },
        {
          id: "corporate",
          label: "Corporate",
          description: "Profesjonalny wygląd B2B ze strukturą i przejrzystością.",
        },
        {
          id: "gaming",
          label: "Gaming",
          description: "Odważne akcenty, energia i wzorce UI dla społeczności.",
        },
        {
          id: "dark-premium",
          label: "Dark premium",
          description: "Ciemne powierzchnie, cyanowe akcenty, głębia wizualna.",
        },
        {
          id: "light-clean",
          label: "Light clean",
          description: "Jasny, dostępny interfejs z subtelnym kolorem marki.",
        },
      ],
      integrations: [
        { id: "discord", label: "Discord" },
        { id: "stripe", label: "Stripe" },
        { id: "oauth-google", label: "OAuth Google" },
        { id: "oauth-discord", label: "OAuth Discord" },
        { id: "cms", label: "Headless CMS" },
        { id: "analytics", label: "Analityka (GA / Plausible)" },
      ],
      summary: {
        title: "Twoja oferta w skrócie",
      },
      budgets: [
        { id: "up-to-3k", label: "Do 3 000 PLN" },
        { id: "3k-8k", label: "3 000 – 8 000 PLN" },
        { id: "8k-15k", label: "8 000 – 15 000 PLN" },
        { id: "15k-plus", label: "15 000+ PLN" },
        { id: "tbd", label: "Do ustalenia" },
      ],
      timelines: [
        { id: "asap", label: "ASAP" },
        { id: "1-month", label: "1 miesiąc" },
        { id: "2-3-months", label: "2–3 miesiące" },
        { id: "flexible", label: "Elastycznie" },
      ],
      fields: {
        name: "Imię i nazwisko",
        email: "E-mail",
        phone: "Telefon (opcjonalnie)",
        company: "Firma (opcjonalnie)",
        visionPlaceholder: "Opisz cele, grupę docelową, referencje i must-have funkcje…",
      },
      placeholders: {
        select: "Wybierz…",
      },
      next: "Dalej",
      prev: "Wstecz",
      backHome: "Strona główna",
      submit: "Wyślij zapytanie ofertowe",
      submitting: "Wysyłanie…",
      submitAnother: "Wyślij kolejne zapytanie",
      success: {
        title: "Zapytanie wysłane",
        description: "Dziękuję — przejrzę brief i odezwę się w ciągu 1–2 dni roboczych.",
      },
      errors: {
        required: "To pole jest wymagane",
        email: "Podaj prawidłowy adres e-mail",
        projectType: "Wybierz co najmniej jeden typ projektu",
        generic: "Coś poszło nie tak. Spróbuj ponownie lub napisz na kgdev@biuro.net.",
      },
    },
    relativeTime: {
      justNow: "przed chwilą",
      minutes: " min temu",
      hours: " godz. temu",
      days: " dni temu",
      months: " mies. temu",
      years: " lat temu",
    },
  },
};

export function getUi(locale: Locale): UiStrings {
  return uiStrings[locale];
}
