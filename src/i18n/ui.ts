import type { Locale } from "./config";

export type UiStrings = {
  latestFromBlog: string;
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
