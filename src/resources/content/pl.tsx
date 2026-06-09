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
    description: `Portfolio full-stack developera — strony custom dla gamingu, serwerów OT i firm. TFS/myAAC, Next.js, React, TypeScript.`,
    headline: <>Profesjonalne strony — od OT po każdą branżę</>,
    featured: {
      display: true,
      title: (
        <Row gap="12" vertical="center">
          <strong className="ml-4">Strefa Kibica</strong>{" "}
          <Line background="brand-alpha-strong" vert height="20" />
          <Text marginRight="4" onBackground="brand-medium">
            Wyróżniony projekt
          </Text>
        </Row>
      ),
      href: "/work/strefa-kibica",
    },
    subline: (
      <>
        Tworzę <Text as="span" size="xl" weight="strong">profesjonalne strony</Text>{" "}
        — dla multi gamingów, prywatnych serwerów gier i firm ze wszystkich branż.
        Każdy projekt jest <Text as="span" size="xl" weight="strong">custom</Text>{" "}
        i dopasowany indywidualnie do klienta. Mam 6+ lat doświadczenia kontraktorskiego
        w ekosystemie{" "}
        <Text as="span" size="xl" weight="strong">TFS</Text>
        {" "}i{" "}
        <Text as="span" size="xl" weight="strong">myAAC</Text>
        , a dziś buduję nowoczesne aplikacje w Next.js, React i TypeScript.
      </>
    ),
  };

  const about: About = {
    path: "/about",
    label: "O mnie",
    title: `O mnie – ${person.name}`,
    description: `Poznaj ${person.name} — full-stack developer i web designer z doświadczeniem OT/TFS i projektami dla firm`,
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
          Jestem full-stack developerem i web designerem. Potrafię tworzyć{" "}
          <strong>profesjonalne strony internetowe</strong> — dla multi gamingów,
          prywatnych serwerów gier oraz firm ze wszystkich branż. Każdy projekt
          realizuję <strong>custom, indywidualnie pod klienta</strong>.
          <br />
          <br />
          Przez ponad 6 lat pracowałem jako <strong>freelance contractor</strong> w
          ekosystemie Open Tibia — nie jako właściciel jednego serwera, lecz wykonując
          zlecenia dla różnych ownerów. Tworzyłem systemy gry, skrypty serwerowe, moduły
          i integracje <strong>klient ↔ serwer</strong> (sync), a także aktualizowałem
          strony w <strong>PHP, HTML i CSS</strong> (myAAC i custom). Dziś łączę to
          doświadczenie z nowoczesnym stackiem — React, TypeScript, Next.js i Vercel.
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
    description: `Case studies — Strefa Kibica, BJ Trade, TFS/myAAC i portfolio Next.js autorstwa ${person.name}`,
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
