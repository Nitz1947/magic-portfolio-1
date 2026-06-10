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
    description: `Custom strony i aplikacje webowe dla firm, społeczności gamingowych i serwerów prywatnych. Next.js, React, TypeScript — od pomysłu po deploy.`,
    headline: <>Custom strony i aplikacje dla firm, community i serwerów gier</>,
    featured: {
      display: true,
      items: [
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
        Od platform Discord i multi gamingów po strony B2B dla firm bez własnego
        zespołu technicznego.
      </>
    ),
  };

  const about: About = {
    path: "/about",
    label: "O mnie",
    title: `O mnie – ${person.name}`,
    description: `Poznaj ${person.name} — full-stack developer budujący custom strony dla firm, community gamingowych i serwerów prywatnych`,
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
          właścicielom firm, społecznościom gamingowym i operatorom prywatnych
          serwerów zamienić pomysł w działającą stronę lub aplikację —{" "}
          <strong>custom, pod Twoją markę</strong>.
          <br />
          <br />
          Każdy projekt zaczynam od zrozumienia celu biznesowego i użytkowników,
          nie od wyboru gotowego szablonu. Dostarczam pełny cykl: UX, kod, deploy
          i wsparcie po wdrożeniu — od platform Discord po strony B2B.
          <br />
          <br />
          <strong>Dlaczego ja?</strong> Ponad 6 lat pracy kontraktorskiej w
          ekosystemie Open Tibia nauczyło mnie szybkiego wejścia w istniejący
          projekt, komunikacji z nietechnicznymi klientami i dowozienia na
          produkcję. Tworzyłem systemy gry, integracje <strong>klient ↔ serwer</strong>{" "}
          i strony w <strong>PHP, HTML i CSS</strong> (myAAC i custom). Dziś łączę
          to z React, TypeScript, Next.js i Vercel.
        </>
      ),
    },
    work: {
      display: true,
      title: "Doświadczenie zawodowe",
      experiences: [
        {
          company: "Open Tibia — contractor dla społeczności OT",
          timeframe: "2019 – obecnie",
          role: "OT Developer, Integrator & CMS",
          achievements: [
            <>
              6+ lat pracy kontraktorskiej dla <strong>różnych właścicieli serwerów</strong> —
              systemy gry, questy, eventy i rozszerzenia w <strong>Lua</strong>,{" "}
              <strong>C++</strong> i <strong>C#</strong> na TFS.
            </>,
            <>
              Integracje <strong>klient gry ↔ serwer</strong> — synchronizacja danych,
              panele gracza, rankingi i moduły pod konkretnych klientów.
            </>,
            <>
              Strony community w <strong>myAAC</strong> i custom — aktualizacje w{" "}
              <strong>PHP, HTML i CSS</strong>; bazy <strong>MariaDB</strong> i{" "}
              <strong>MySQL</strong> na <strong>Ubuntu</strong> i <strong>Debian</strong>.
            </>,
          ],
          images: [
            {
              src: "/images/projects/ot/cover-01.svg",
              alt: "Open Tibia — TFS i myAAC",
              width: 16,
              height: 9,
            },
          ],
        },
        {
          company: "Projekty webowe (freelance)",
          timeframe: "2022 – obecnie",
          role: "Full-Stack Developer & Web Designer",
          achievements: [
            <>
              <strong>Strefa Kibica</strong> — platforma wirtualnych zakładów dla społeczności
              Discord (Next.js, OAuth, ranking).
            </>,
            <>
              <strong>BJ Trade</strong> — strona firmowa B2B dla producenta ziół i przypraw
              z certyfikatami jakości i wersją PL.
            </>,
            <>
              Strony <strong>custom</strong> dla multi gamingów, serwerów prywatnych i firm —
              Next.js, TypeScript, i18n, wdrożenia na Vercel.
            </>,
          ],
          images: [
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
          name: "Open Tibia Community & TFS",
          description: (
            <>
              6+ lat praktyki kontraktorskiej — Lua, C++, C#, PHP (myAAC), MariaDB/MySQL,
              administracja Ubuntu/Debian i integracje web ↔ game server dla społeczności OT.
            </>
          ),
        },
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
          title: "OT / TFS & myAAC",
          description: (
            <>
              Lua, C++ i C# w TFS; integracje klient ↔ serwer; myAAC i custom w PHP/HTML/CSS;
              MariaDB/MySQL; hosting Ubuntu/Debian — praca dla wielu ownerów jako contractor.
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
    description: `Realizacje ${person.name} — Strefa Kibica, BJ Trade, TFS/myAAC i portfolio Next.js. Custom strony dla gamingu i biznesu.`,
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
