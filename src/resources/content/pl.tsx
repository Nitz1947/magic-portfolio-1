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
    title: `Portfolio – ${person.name}`,
    description: `Custom strony i aplikacje webowe dla firm i społeczności gamingowych. Next.js, React, TypeScript — od pomysłu po deploy.`,
    headline: <>Custom strony i aplikacje dla firm i community gamingowych</>,
    featured: {
      display: true,
      items: [
        {
          title: (
            <Row gap="8" vertical="center">
              <strong className="ml-4">SEO Opt One</strong>
              <Line background="brand-alpha-strong" vert height="16" />
              <Text marginRight="4" onBackground="brand-medium">
                Wyróżniony
              </Text>
            </Row>
          ),
          href: "/work/seo-opt-one",
        },
        {
          title: (
            <Row gap="8" vertical="center">
              <strong className="ml-4">Strefa Kibica</strong>
              <Line background="brand-alpha-strong" vert height="16" />
              <Text marginRight="4" onBackground="brand-medium">
                Wyróżniony
              </Text>
            </Row>
          ),
          href: "/work/strefa-kibica",
        },
        {
          title: (
            <Row gap="8" vertical="center">
              <strong className="ml-4">BJ Trade</strong>
              <Line background="brand-alpha-strong" vert height="16" />
              <Text marginRight="4" onBackground="brand-medium">
                Wyróżniony
              </Text>
            </Row>
          ),
          href: "/work/bjtrade",
        },
      ],
    },
    subline: (
      <>
        Projektuję i wdrażam <Text as="span" size="xl" weight="strong">profesjonalne strony i aplikacje</Text>{" "}
        bez gotowych szablonów — szybko, responsywnie i z dbałością o detale.
        Od platform Discord po strony B2B dla firm bez własnego
        zespołu technicznego.
      </>
    ),
  };

  const about: About = {
    path: "/about",
    label: "O mnie",
    title: `O mnie – ${person.name}`,
    description: `Poznaj ${person.name} — full-stack developer budujący custom strony dla firm i community gamingowych`,
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
          Masz wizję produktu, ale brakuje Ci zespołu technicznego? Pomagam
          właścicielom firm i społecznościom gamingowym zamienić pomysł w
          działającą stronę lub aplikację —{" "}
          <strong>custom, pod Twoją markę</strong>.
          <br />
          <br />
          Każdy projekt zaczynam od zrozumienia celu biznesowego i użytkowników,
          nie od wyboru gotowego szablonu. Dostarczam pełny cykl: UX, kod, deploy
          i wsparcie po wdrożeniu — od platform Discord po strony B2B.
          <br />
          <br />
          <strong>Dlaczego ja?</strong> Ponad 6 lat pracy kontraktorskiej nauczyło
          mnie szybkiego wejścia w istniejący projekt, komunikacji z
          nietechnicznymi klientami i dowozienia na produkcję. Dziś buduję w{" "}
          <strong>React, TypeScript, Next.js i Vercel</strong> — od narzędzi SEO
          po platformy community i strony korporacyjne.
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
              <strong>SEO Opt One</strong> — platforma audytu SEO z generatorami kodów,
              planami strategii i modułami marketingowymi (Next.js, Vercel).
            </>,
            <>
              <strong>Strefa Kibica</strong> — platforma wirtualnych zakładów dla społeczności
              Discord (Next.js, OAuth, ranking).
            </>,
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
              src: "/images/projects/seo-opt-one/cover-01.svg",
              alt: "SEO Opt One — narzędzie SEO",
              width: 16,
              height: 9,
            },
            {
              src: "/images/projects/strefa-kibica/cover-01.svg",
              alt: "Strefa Kibica — Discord community",
              width: 16,
              height: 9,
            },
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
              src: "/images/projects/strefa-kibica/cover-01.svg",
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
    label: "Projekty",
    title: `Projekty – ${person.name}`,
    description: `Realizacje ${person.name} — SEO Opt One, Strefa Kibica, BJ Trade i portfolio Next.js. Custom strony dla gamingu i biznesu.`,
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
