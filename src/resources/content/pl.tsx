import type { About, Blog, Gallery, Home, Newsletter, Person, Social, Work } from "@/types";
import { Line, Row, Text } from "@once-ui-system/core";

import type { LocaleContent } from "./types";

export function createPolishContent(): LocaleContent {
  const person: Person = {
    firstName: "Michał",
    lastName: "Ch.",
    name: "Michał Ch.",
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
    description: `Portfolio full-stack developera specjalizującego się w Next.js, React i TypeScript`,
    headline: <>Buduję szybkie, skalowalne aplikacje webowe</>,
    featured: {
      display: true,
      title: (
        <Row gap="12" vertical="center">
          <strong className="ml-4">E-commerce Next.js</strong>{" "}
          <Line background="brand-alpha-strong" vert height="20" />
          <Text marginRight="4" onBackground="brand-medium">
            Wyróżniony projekt
          </Text>
        </Row>
      ),
      href: "/work/platforma-ecommerce-nextjs",
    },
    subline: (
      <>
        Jestem full-stack developerem tworzącym produkcyjne aplikacje w{" "}
        <Text as="span" size="xl" weight="strong">
          Next.js
        </Text>
        , React i TypeScript. Łączę solidną architekturę backendu z dopracowanym UX.
      </>
    ),
  };

  const about: About = {
    path: "/about",
    label: "O mnie",
    title: `O mnie – ${person.name}`,
    description: `Poznaj ${person.name}, ${person.role} z Warszawy`,
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
          Full-stack developer z doświadczeniem w budowaniu aplikacji SaaS, platform e-commerce i
          API od projektu po wdrożenie. Skupiam się na wydajności, czytelnej architekturze i
          iteracyjnym dostarczaniu wartości biznesowej. Pracuję głównie w ekosystemie JavaScript —
          od interfejsu po warstwę serwerową i infrastrukturę chmurową.
        </>
      ),
    },
    work: {
      display: true,
      title: "Doświadczenie zawodowe",
      experiences: [
        {
          company: "TechFlow Studio",
          timeframe: "2022 – obecnie",
          role: "Senior Full-Stack Developer",
          achievements: [
            <>
              Zaprojektowałem i wdrożyłem platformę e-commerce obsługującą 12 000+ transakcji
              miesięcznie, skracając czas ładowania strony produktu o 40%.
            </>,
            <>
              Wprowadziłem architekturę mikroserwisów dla modułu płatności, co zmniejszyło liczbę
              incydentów produkcyjnych o 60%.
            </>,
          ],
          images: [
            {
              src: "/images/projects/ecommerce/cover-01.svg",
              alt: "Platforma e-commerce",
              width: 16,
              height: 9,
            },
          ],
        },
        {
          company: "DevBridge",
          timeframe: "2019 – 2022",
          role: "Frontend Developer",
          achievements: [
            <>
              Zbudowałem design system w React, który skrócił czas tworzenia nowych widoków o 35%.
            </>,
            <>
              Zoptymalizowałem Core Web Vitals kluczowych stron — LCP spadł z 4,2 s do 1,8 s.
            </>,
          ],
          images: [],
        },
      ],
    },
    studies: {
      display: true,
      title: "Edukacja",
      institutions: [
        {
          name: "Politechnika Warszawska",
          description: <>Inżynieria informatyki — specjalizacja systemy webowe.</>,
        },
        {
          name: "Certyfikaty",
          description: <>AWS Cloud Practitioner, Meta Front-End Developer Professional.</>,
        },
      ],
    },
    technical: {
      display: true,
      title: "Umiejętności techniczne",
      skills: [
        {
          title: "Frontend",
          description: (
            <>
              Aplikacje React i Next.js z App Router, SSR/SSG, optymalizacja wydajności i
              dostępności.
            </>
          ),
          tags: [
            { name: "JavaScript", icon: "javascript" },
            { name: "Next.js", icon: "nextjs" },
          ],
          images: [
            {
              src: "/images/projects/portfolio/cover-01.svg",
              alt: "Projekt frontend",
              width: 16,
              height: 9,
            },
          ],
        },
        {
          title: "Backend & DevOps",
          description: (
            <>
              REST i GraphQL API w Node.js, PostgreSQL, Redis, Docker i wdrożenia na Vercel/AWS.
            </>
          ),
          tags: [
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
    description: `Case studies aplikacji webowych i API autorstwa ${person.name}`,
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
