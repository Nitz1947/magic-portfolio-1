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
