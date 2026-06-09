import type { About, Blog, Gallery, Home, Newsletter, Person, Social, Work } from "@/types";
import { Line, Row, Text } from "@once-ui-system/core";

import type { LocaleContent } from "./types";

export function createPolishContent(): LocaleContent {
  const person: Person = {
    firstName: "Krystian",
    lastName: "",
    name: "Krystian",
    role: "Full-Stack Developer",
    avatar: "/images/avatar.svg",
    email: "kontakt@1choc.dev",
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
    title: `Portfolio – ${person.name}`,
    description: `Portfolio full-stack developera z backgroundiem TFS/myAAC — Next.js, React, TypeScript i Open Tibia`,
    headline: <>Od serwerów OT do produkcyjnych aplikacji webowych</>,
    featured: {
      display: true,
      title: (
        <Row gap="12" vertical="center">
          <strong className="ml-4">TFS & myAAC</strong>{" "}
          <Line background="brand-alpha-strong" vert height="20" />
          <Text marginRight="4" onBackground="brand-medium">
            Wyróżniony projekt
          </Text>
        </Row>
      ),
      href: "/work/serwer-ot-tfs-myAAC",
    },
    subline: (
      <>
        Jestem full-stack developerem z 6 lat doświadczenia w ekosystemie{" "}
        <Text as="span" size="xl" weight="strong">
          TFS
        </Text>
        {" "}i{" "}
        <Text as="span" size="xl" weight="strong">
          myAAC
        </Text>
        . Dziś buduję szybkie aplikacje w Next.js, React i TypeScript — łącząc pasję do
        community gaming z profesjonalnym podejściem do architektury i UX.
      </>
    ),
  };

  const about: About = {
    path: "/about",
    label: "O mnie",
    title: `O mnie – ${person.name}`,
    description: `Poznaj ${person.name}, ${person.role} z unikalnym backgroundiem Open Tibia i TFS`,
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
          Zaczynałem w świecie Open Tibia — przez 6 lat rozwijałem serwery na{" "}
          <strong>The Forgotten Server (TFS)</strong> i customizowałem{" "}
          <strong>myAAC</strong>, popularne CMS dla community OT. To nauczyło mnie Lua,
          PHP, MySQL i pracy blisko produktu: od skryptów questów po panele gracza i
          strony rejestracji. Dziś przenoszę tę samą determinację na nowoczesny stack —
          React, TypeScript, Next.js i Node.js — budując aplikacje SaaS, e-commerce i API
          gotowe na produkcję.
        </>
      ),
    },
    work: {
      display: true,
      title: "Doświadczenie zawodowe",
      experiences: [
        {
          company: "Ekosystem Open Tibia (TFS + myAAC)",
          timeframe: "2019 – obecnie",
          role: "Server Developer & CMS Customizer",
          achievements: [
            <>
              6 lat pracy z <strong>The Forgotten Server</strong> — custom systemy gry,
              questy, balans, eventy i rozszerzenia core w <strong>Lua</strong>.
            </>,
            <>
              Pełna customizacja <strong>myAAC</strong> w PHP — szablony, moduły
              rejestracji, rankingi, shop i integracje z bazą serwera w{" "}
              <strong>MySQL</strong>.
            </>,
            <>
              Frontend community: landing pages, panele gracza i responsywne UI w{" "}
              <strong>HTML, CSS i JavaScript</strong> — od prototypu po wdrożenie na
              produkcji.
            </>,
          ],
          images: [
            {
              src: "/images/projects/ot/cover-01.svg",
              alt: "Serwer OT — TFS i myAAC",
              width: 16,
              height: 9,
            },
          ],
        },
        {
          company: "Projekty webowe (freelance)",
          timeframe: "2022 – obecnie",
          role: "Full-Stack Developer",
          achievements: [
            <>
              Migracja umiejętności na <strong>React, TypeScript i Next.js</strong> —
              portfolio, platformy e-commerce i panele analityczne SaaS.
            </>,
            <>
              Architektura API w <strong>Node.js</strong>, integracje płatności, optymalizacja
              wydajności (Core Web Vitals, ISR, edge caching).
            </>,
            <>
              Wdrożenia na <strong>Vercel</strong> z preview deployments, SEO i
              wielojęzyczność (i18n PL/EN).
            </>,
          ],
          images: [
            {
              src: "/images/projects/portfolio/cover-01.svg",
              alt: "Projekty full-stack Next.js",
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
          name: "Open Tibia Community & TFS",
          description: (
            <>
              6 lat praktyki w ekosystemie OT — Lua (TFS scripting), PHP (myAAC), MySQL,
              administracja serwerów Linux i prowadzenie community gaming od zera.
            </>
          ),
        },
        {
          name: "Samodzielna nauka — nowoczesny web",
          description: (
            <>
              React, TypeScript, Next.js App Router, Node.js, REST API, Docker i chmura
              (Vercel/AWS) — ciągły rozwój od community dev do profesjonalnego full-stack.
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
          title: "OT / TFS & myAAC",
          description: (
            <>
              Lua scripting w TFS, custom systemy gry, myAAC w PHP, schematy MySQL pod
              serwery OT i community tooling od questów po panele administracyjne.
            </>
          ),
          tags: [
            { name: "PHP", icon: "php" },
            { name: "JavaScript", icon: "javascript" },
            { name: "MySQL", icon: "mysql" },
          ],
          images: [
            {
              src: "/images/projects/ot/cover-01.svg",
              alt: "TFS i myAAC",
              width: 16,
              height: 9,
            },
          ],
        },
        {
          title: "Frontend (nowoczesny stack)",
          description: (
            <>
              Aplikacje React i Next.js z App Router, SSR/SSG, TypeScript, animacje,
              dostępność i optymalizacja wydajności.
            </>
          ),
          tags: [
            { name: "TypeScript", icon: "typescript" },
            { name: "React", icon: "react" },
            { name: "Next.js", icon: "nextjs" },
          ],
          images: [
            {
              src: "/images/projects/portfolio/cover-01.svg",
              alt: "Projekt frontend Next.js",
              width: 16,
              height: 9,
            },
          ],
        },
        {
          title: "Backend & DevOps",
          description: (
            <>
              REST API w Node.js, PostgreSQL/MySQL, Redis, Docker, mikroserwisy i
              wdrożenia na Vercel z CI/CD i monitoringiem.
            </>
          ),
          tags: [
            { name: "Node.js", icon: "nodejs" },
            { name: "Next.js", icon: "nextjs" },
            { name: "Supabase", icon: "supabase" },
          ],
          images: [
            {
              src: "/images/projects/api/cover-01.svg",
              alt: "Architektura API",
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
    label: "Projekty",
    title: `Projekty – ${person.name}`,
    description: `Case studies — od TFS/myAAC po aplikacje Next.js i API autorstwa ${person.name}`,
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
