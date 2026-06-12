import type { About, Blog, Gallery, Home, Newsletter, Person, Social, Work } from "@/types";
import { Line, Row, Text } from "@once-ui-system/core";

import type { LocaleContent } from "./types";

export function createPolishContent(): LocaleContent {
  const person: Person = {
    firstName: "Krystian",
    lastName: "G.",
    name: "Krystian G.",
    role: "Full-Stack Developer & Web Designer",
    avatar: "/images/avatar.svg",
    email: "kgdev@biuro.net",
    location: "Europe/Warsaw",
    languages: ["Polski", "Angielski"],
  };

  const newsletter: Newsletter = {
    display: false,
    title: <>Zapisz się do newslettera {person.firstName}</>,
    description: <>Cotygodniowy newsletter o web developmencie i architekturze aplikacji</>,
  };

  const social: Social = [
    {
      name: "GitHub",
      icon: "github",
      link: "https://github.com/1choc",
      essential: true,
    },
    {
      name: "LinkedIn",
      icon: "linkedin",
      link: "https://www.linkedin.com/in/1choc",
      essential: true,
    },
    {
      name: "Email",
      icon: "email",
      link: `mailto:${person.email}`,
      essential: true,
    },
  ];

  const home: Home = {
    path: "/",
    image: "/images/og/home.svg",
    label: "Strona główna",
    title: `Portfolio web developera Next.js — ${person.name}`,
    description: `Strony internetowe dla firm i aplikacje webowe — Next.js, React, TypeScript. Indywidualne podejście, SEO i wdrożenie dopasowane do branży.`,
    headline: <>Strony i aplikacje szyte na miarę — dla firm, które chcą więcej niż szablon</>,
    featured: {
      display: true,
      items: [
        {
          title: (
            <Row gap="8" vertical="center">
              <strong className="ml-4">Custom development</strong>
              <Line background="brand-alpha-strong" vert height="16" />
              <Text marginRight="4" onBackground="brand-medium">
                Indywidualna wycena
              </Text>
            </Row>
          ),
          href: "/quote",
        },
      ],
    },
    subline: (
      <>
        Indywidualne podejście, analiza potrzeb i projekt dopasowany do branży oraz celów
        biznesowych. Od pierwszej rozmowy przez projekt i wdrożenie — po wsparcie po starcie.
        Technologia: <Text as="span" size="xl" weight="strong">Next.js, React i TypeScript</Text>.
      </>
    ),
  };

  const about: About = {
    path: "/about",
    label: "O mnie",
    title: `O mnie — web developer Next.js | ${person.name}`,
    description: `Poznaj ${person.name} — full-stack developer tworzący strony internetowe dla firm, sklepy i aplikacje Next.js z optymalizacją SEO i wdrożeniem na Vercel.`,
    tableOfContent: {
      display: true,
      subItems: false,
    },
    avatar: {
      display: true,
    },
    calendar: {
      display: false,
      link: "https://cal.com",
    },
    intro: {
      display: true,
      title: "Wprowadzenie",
      description: (
        <>
          Jestem <strong>Krystian G.</strong> — freelancer full-stack, który projektuje
          i wdraża strony oraz aplikacje webowe od zera. Nie sprzedaję szablonów:
          każdy projekt to <strong>rozwiązanie dopasowane do potrzeb</strong> Twojej
          firmy, grupy docelowej i budżetu.
          <br />
          <br />
          <strong>Jak pracuję:</strong> zaczynam od rozmowy i analizy celów biznesowych,
          potem projektuję strukturę i UX, wdrażam iteracyjnie z podglądem na każdym
          etapie i pomagam po starcie. Strony firmowe, aplikacje, platformy
          community, sklepy, panele administracyjne i serwisy wielojęzyczne — zawsze
          pod konkretny brief, nie pod gotowy motyw.
          <br />
          <br />
          <strong>Dlaczego warto:</strong> nowoczesny stack (Next.js, React, TypeScript)
          oznacza szybkość, wydajność i stabilne wdrożenie. Dostajesz przejrzysty
          proces, jasną komunikację i partnera technicznego, który tłumaczy decyzje
          w języku biznesu.
          <br />
          <br />
          <strong>Dla kogo:</strong> firmy bez własnego działu IT, przedsiębiorcy
          i marki, które chcą profesjonalnej obecności online bez kompromisów.
          Przykłady wdrożeń zobaczysz w sekcji <strong>Realizacje</strong>.
        </>
      ),
    },
    work: {
      display: true,
      title: "Doświadczenie zawodowe",
      experiences: [
        {
          company: "Projekty webowe (freelance)",
          timeframe: "2022 – obecnie",
          role: "Full-Stack Developer & Web Designer",
          achievements: [
            <>
              <strong>BJ Trade</strong> — strona firmowa B2B dla hurtowni ziół i przypraw
              z certyfikatami jakości, i18n PL/EN i wersją live na Vercel.
            </>,
            <>
              Strony <strong>custom</strong> dla community gamingowych i firm —
              Next.js, TypeScript, i18n, wdrożenia na Vercel.
            </>,
          ],
          images: [
            {
              src: "/images/projects/bjtrade/cover-01.svg",
              alt: "BJ Trade — strona firmowa",
              width: 16,
              height: 9,
            },
          ],
        },
      ],
    },
    studies: {
      display: true,
      title: "Edukacja",
      institutions: [
        {
          name: "Samodzielna nauka — nowoczesny web",
          description: (
            <>
              React, TypeScript, Next.js App Router, Node.js, REST API, Docker i Vercel —
              ciągły rozwój od community dev do profesjonalnego full-stack i web designu.
            </>
          ),
        },
      ],
    },
    technical: {
      display: true,
      title: "Umiejętności techniczne",
      skills: [
        {
          title: "Web design & Frontend",
          description: (
            <>
              Profesjonalne strony custom dla gamingu i firm — React, Next.js, TypeScript,
              responsywność, dostępność i optymalizacja wydajności.
            </>
          ),
          tags: [
            { name: "TypeScript", icon: "typescript" },
            { name: "React", icon: "react" },
            { name: "Next.js", icon: "nextjs" },
          ],
          images: [
            {
              src: "/images/projects/bjtrade/cover-01.svg",
              alt: "Projekt webowy Next.js",
              width: 16,
              height: 9,
            },
          ],
        },
        {
          title: "Backend & DevOps",
          description: (
            <>
              REST API, Node.js, PostgreSQL/MySQL/MariaDB, integracje OAuth, Docker i
              wdrożenia na Vercel z CI/CD.
            </>
          ),
          tags: [
            { name: "Node.js", icon: "nodejs" },
            { name: "Next.js", icon: "nextjs" },
            { name: "Supabase", icon: "supabase" },
          ],
          images: [
            {
              src: "/images/projects/bjtrade/cover-01.svg",
              alt: "Strona firmowa B2B",
              width: 16,
              height: 9,
            },
          ],
        },
      ],
    },
  };

  const blog: Blog = {
    path: "/blog",
    label: "Blog",
    title: "Notatki z kodu i architektury",
    description: `Artykuły techniczne autorstwa ${person.name} o Next.js, TypeScript i web dev`,
  };

  const work: Work = {
    path: "/work",
    label: "Realizacje",
    title: `Realizacje – ${person.name}`,
    description: `Prezentacja projektów ${person.name} — wdrożenia produkcyjne dla biznesu, marketingu i społeczności. Strony i aplikacje Next.js na zamówienie.`,
  };

  const gallery: Gallery = {
    path: "/gallery",
    label: "Galeria",
    title: `Galeria – ${person.name}`,
    description: `Zrzuty ekranu i materiały wizualne z projektów`,
    images: [],
  };

  return { person, social, newsletter, home, about, blog, work, gallery };
}
