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
    viewProjects: "View projects",
    contactMe: "Contact",
    featuredProject: "Featured project",
    featuredProjects: "Selected work",
    featuredProjectsSubline: "Live previews of recent projects — click to explore or open the deployed site.",
    process: {
      title: "How I work",
      steps: [
        {
          number: "01",
          title: "Discovery",
          description: "Understanding goals, users, and constraints before writing code.",
        },
        {
          number: "02",
          title: "Architecture",
          description: "Designing scalable structure — data models, API contracts, and UX flows.",
        },
        {
          number: "03",
          title: "Build & iterate",
          description: "Shipping in small increments with tests, reviews, and preview deploys.",
        },
        {
          number: "04",
          title: "Launch & measure",
          description: "Monitoring performance, gathering feedback, and continuous improvement.",
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
    viewProjects: "Zobacz projekty",
    contactMe: "Kontakt",
    featuredProject: "Wyróżniony projekt",
    featuredProjects: "Wybrane projekty",
    featuredProjectsSubline: "Podgląd na żywo ostatnich realizacji — kliknij, aby zobaczyć szczegóły lub otworzyć stronę.",
    process: {
      title: "Jak pracuję",
      steps: [
        {
          number: "01",
          title: "Discovery",
          description: "Poznanie celów, użytkowników i ograniczeń zanim napiszę kod.",
        },
        {
          number: "02",
          title: "Architektura",
          description: "Projekt skalowalnej struktury — modele danych, kontrakty API i flow UX.",
        },
        {
          number: "03",
          title: "Build & iteracja",
          description: "Dostarczanie w małych krokach z testami, review i preview deployami.",
        },
        {
          number: "04",
          title: "Launch & pomiar",
          description: "Monitoring wydajności, feedback użytkowników i ciągłe usprawnienia.",
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
