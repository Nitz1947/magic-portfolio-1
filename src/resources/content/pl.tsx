import type { About, Blog, Gallery, Home, Newsletter, Person, Social, Work } from "@/types";
import { Line, Row, Text } from "@once-ui-system/core";

import type { LocaleContent } from "./types";

export function createPolishContent(): LocaleContent {
  const person: Person = {
    firstName: "Selene",
    lastName: "Yu",
    name: "Selene Yu",
    role: "Design Engineer",
    avatar: "/images/avatar.jpg",
    email: "example@gmail.com",
    location: "Asia/Jakarta",
    languages: ["Angielski", "Bahasa"],
  };

  const newsletter: Newsletter = {
    display: true,
    title: <>Zapisz się do newslettera {person.firstName}</>,
    description: <>Cotygodniowy newsletter o kreatywności i inżynierii</>,
  };

  const social: Social = [
    {
      name: "GitHub",
      icon: "github",
      link: "https://github.com/once-ui-system",
      essential: true,
    },
    {
      name: "LinkedIn",
      icon: "linkedin",
      link: "https://www.linkedin.com/company/once-ui/",
      essential: true,
    },
    {
      name: "Instagram",
      icon: "instagram",
      link: "https://www.instagram.com/once_ui/",
      essential: false,
    },
    {
      name: "Threads",
      icon: "threads",
      link: "https://www.threads.com/@once_ui",
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
    image: "/images/og/home.jpg",
    label: "Strona główna",
    title: `Portfolio – ${person.name}`,
    description: `Strona portfolio prezentująca moją pracę jako ${person.role}`,
    headline: <>Mosty między designem a kodem</>,
    featured: {
      display: true,
      title: (
        <Row gap="12" vertical="center">
          <strong className="ml-4">Once UI</strong>{" "}
          <Line background="brand-alpha-strong" vert height="20" />
          <Text marginRight="4" onBackground="brand-medium">
            Wyróżniony projekt
          </Text>
        </Row>
      ),
      href: "/work/building-once-ui-a-customizable-design-system",
    },
    subline: (
      <>
        Jestem Selene, design engineer w{" "}
        <Text as="span" size="xl" weight="strong">
          ONCE UI
        </Text>
        , gdzie tworzę intuicyjne <br /> doświadczenia użytkownika. Po godzinach rozwijam własne
        projekty.
      </>
    ),
  };

  const about: About = {
    path: "/about",
    label: "O mnie",
    title: `O mnie – ${person.name}`,
    description: `Poznaj ${person.name}, ${person.role} z ${person.location}`,
    tableOfContent: {
      display: true,
      subItems: false,
    },
    avatar: {
      display: true,
    },
    calendar: {
      display: true,
      link: "https://cal.com",
    },
    intro: {
      display: true,
      title: "Wprowadzenie",
      description: (
        <>
          Selene to design engineer z Dżakarty, która z pasją przekształca złożone wyzwania w proste,
          eleganckie rozwiązania projektowe. Jej praca obejmuje interfejsy cyfrowe, interaktywne
          doświadczenia oraz połączenie designu z technologią.
        </>
      ),
    },
    work: {
      display: true,
      title: "Doświadczenie zawodowe",
      experiences: [
        {
          company: "FLY",
          timeframe: "2022 – obecnie",
          role: "Senior Design Engineer",
          achievements: [
            <>
              Przeprojektowała UI/UX platformy FLY, co przełożyło się na 20% wzrost zaangażowania
              użytkowników i 30% szybsze ładowanie.
            </>,
            <>
              Poprowadziła integrację narzędzi AI w procesach projektowych, skracając iteracje
              designerów o 50%.
            </>,
          ],
          images: [
            {
              src: "/images/projects/project-01/cover-01.jpg",
              alt: "Projekt Once UI",
              width: 16,
              height: 9,
            },
          ],
        },
        {
          company: "Creativ3",
          timeframe: "2018 – 2022",
          role: "Lead Designer",
          achievements: [
            <>
              Stworzyła system designu ujednolicający markę na wielu platformach, poprawiając
              spójność o 40%.
            </>,
            <>
              Poprowadziła zespół międzyfunkcyjny przy wdrożeniu nowej linii produktów, co
              przyczyniło się do 15% wzrostu przychodów firmy.
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
          name: "University of Jakarta",
          description: <>Studia z inżynierii oprogramowania.</>,
        },
        {
          name: "Build the Future",
          description: <>Studia z marketingu online i personal branding.</>,
        },
      ],
    },
    technical: {
      display: true,
      title: "Umiejętności techniczne",
      skills: [
        {
          title: "Figma",
          description: <>Prototypowanie w Figmie z Once UI w rekordowym tempie.</>,
          tags: [{ name: "Figma", icon: "figma" }],
          images: [
            {
              src: "/images/projects/project-01/cover-02.jpg",
              alt: "Obraz projektu",
              width: 16,
              height: 9,
            },
            {
              src: "/images/projects/project-01/cover-03.jpg",
              alt: "Obraz projektu",
              width: 16,
              height: 9,
            },
          ],
        },
        {
          title: "Next.js",
          description: <>Budowanie nowoczesnych aplikacji z Next.js + Once UI + Supabase.</>,
          tags: [
            { name: "JavaScript", icon: "javascript" },
            { name: "Next.js", icon: "nextjs" },
            { name: "Supabase", icon: "supabase" },
          ],
          images: [
            {
              src: "/images/projects/project-01/cover-04.jpg",
              alt: "Obraz projektu",
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
    title: "Piszę o designie i technologii...",
    description: `Zobacz, czym ostatnio zajmowała się ${person.name}`,
  };

  const work: Work = {
    path: "/work",
    label: "Projekty",
    title: `Projekty – ${person.name}`,
    description: `Projekty designu i developmentu autorstwa ${person.name}`,
  };

  const gallery: Gallery = {
    path: "/gallery",
    label: "Galeria",
    title: `Galeria zdjęć – ${person.name}`,
    description: `Kolekcja zdjęć autorstwa ${person.name}`,
    images: [
      { src: "/images/gallery/horizontal-1.jpg", alt: "zdjęcie", orientation: "horizontal" },
      { src: "/images/gallery/vertical-4.jpg", alt: "zdjęcie", orientation: "vertical" },
      { src: "/images/gallery/horizontal-3.jpg", alt: "zdjęcie", orientation: "horizontal" },
      { src: "/images/gallery/vertical-1.jpg", alt: "zdjęcie", orientation: "vertical" },
      { src: "/images/gallery/vertical-2.jpg", alt: "zdjęcie", orientation: "vertical" },
      { src: "/images/gallery/horizontal-2.jpg", alt: "zdjęcie", orientation: "horizontal" },
      { src: "/images/gallery/horizontal-4.jpg", alt: "zdjęcie", orientation: "horizontal" },
      { src: "/images/gallery/vertical-3.jpg", alt: "zdjęcie", orientation: "vertical" },
    ],
  };

  return { person, social, newsletter, home, about, blog, work, gallery };
}
