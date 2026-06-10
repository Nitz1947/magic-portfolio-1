import type { About, Blog, Gallery, Home, Newsletter, Person, Social, Work } from "@/types";
import { Line, Row, Text } from "@once-ui-system/core";

import type { LocaleContent } from "./types";

export function createEnglishContent(): LocaleContent {
  const person: Person = {
    firstName: "Krystian",
    lastName: "G.",
    name: "Krystian G.",
    role: "Full-Stack Developer & Web Designer",
    avatar: "/images/avatar.svg",
    email: "kgdev@biuro.net",
    location: "Europe/Warsaw",
    languages: ["Polish", "English"],
  };

  const newsletter: Newsletter = {
    display: false,
    title: <>Subscribe to {person.firstName}'s Newsletter</>,
    description: <>A weekly newsletter about web development and application architecture</>,
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
    label: "Home",
    title: `${person.name}'s Portfolio`,
    description: `Custom websites and web apps for businesses, gaming communities, and private game servers. Next.js, React, TypeScript — from idea to deploy.`,
    headline: <>Custom websites and apps for businesses, communities, and game servers</>,
    featured: {
      display: true,
      items: [
        {
          title: (
            <Row gap="8" vertical="center">
              <strong className="ml-4">Strefa Kibica</strong>
              <Line background="brand-alpha-strong" vert height="16" />
              <Text marginRight="4" onBackground="brand-medium">
                Featured
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
                Featured
              </Text>
            </Row>
          ),
          href: "/work/bjtrade",
        },
      ],
    },
    subline: (
      <>
        I design and ship <Text as="span" size="xl" weight="strong">professional websites and apps</Text>{" "}
        without off-the-shelf templates — fast, responsive, and obsessively polished.
        From Discord platforms and multi-gaming communities to B2B sites for businesses
        without an in-house tech team.
      </>
    ),
  };

  const about: About = {
    path: "/about",
    label: "About",
    title: `About – ${person.name}`,
    description: `Meet ${person.name} — full-stack developer building custom websites for businesses, gaming communities, and private game servers`,
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
      title: "Introduction",
      description: (
        <>
          Have a product vision but no technical team? I help business owners, gaming
          communities, and private server operators turn ideas into live websites and
          apps — <strong>custom-built for your brand</strong>.
          <br />
          <br />
          Every project starts with understanding business goals and users, not picking a
          template. I deliver the full cycle: UX, code, deploy, and post-launch support
          — from Discord platforms to B2B corporate sites.
          <br />
          <br />
          <strong>Why me?</strong> Over 6 years as a freelance contractor in the Open
          Tibia ecosystem taught me to jump into existing codebases fast, communicate
          with non-technical clients, and ship to production. I built game systems,{" "}
          <strong>client ↔ server</strong> integrations, and sites in{" "}
          <strong>PHP, HTML, and CSS</strong> (myAAC and custom). Today I combine that
          with React, TypeScript, Next.js, and Vercel.
        </>
      ),
    },
    work: {
      display: true,
      title: "Work Experience",
      experiences: [
        {
          company: "Open Tibia — contractor for OT community",
          timeframe: "2019 – Present",
          role: "OT Developer, Integrator & CMS",
          achievements: [
            <>
              6+ years of contract work for <strong>multiple server owners</strong> — game
              systems, quests, events, and extensions in <strong>Lua</strong>,{" "}
              <strong>C++</strong>, and <strong>C#</strong> on TFS.
            </>,
            <>
              <strong>Game client ↔ server</strong> integrations — data sync, player
              panels, rankings, and modules tailored per client.
            </>,
            <>
              Community sites in <strong>myAAC</strong> and custom builds — updates in{" "}
              <strong>PHP, HTML, and CSS</strong>; <strong>MariaDB</strong> and{" "}
              <strong>MySQL</strong> on <strong>Ubuntu</strong> and <strong>Debian</strong>.
            </>,
          ],
          images: [
            {
              src: "/images/projects/ot/cover-01.svg",
              alt: "Open Tibia — TFS and myAAC",
              width: 16,
              height: 9,
            },
          ],
        },
        {
          company: "Web Projects (Freelance)",
          timeframe: "2022 – Present",
          role: "Full-Stack Developer & Web Designer",
          achievements: [
            <>
              <strong>Strefa Kibica</strong> — virtual betting platform for a Discord
              community (Next.js, OAuth, leaderboard).
            </>,
            <>
              <strong>BJ Trade</strong> — B2B corporate site for a herbs and spices
              producer with quality certifications and Polish locale.
            </>,
            <>
              <strong>Custom</strong> websites for multi-gaming, private servers, and
              businesses — Next.js, TypeScript, i18n, Vercel deployments.
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
              alt: "BJ Trade — corporate website",
              width: 16,
              height: 9,
            },
          ],
        },
      ],
    },
    studies: {
      display: true,
      title: "Education",
      institutions: [
        {
          name: "Open Tibia Community & TFS",
          description: (
            <>
              6+ years of contract practice — Lua, C++, C#, PHP (myAAC), MariaDB/MySQL,
              Ubuntu/Debian administration, and web ↔ game server integrations for OT
              communities.
            </>
          ),
        },
        {
          name: "Self-directed — modern web",
          description: (
            <>
              React, TypeScript, Next.js App Router, Node.js, REST APIs, Docker, and Vercel
              — continuous growth from community dev to professional full-stack and web
              design.
            </>
          ),
        },
      ],
    },
    technical: {
      display: true,
      title: "Technical skills",
      skills: [
        {
          title: "OT / TFS & myAAC",
          description: (
            <>
              Lua, C++, and C# on TFS; client ↔ server integrations; myAAC and custom
              PHP/HTML/CSS; MariaDB/MySQL; Ubuntu/Debian hosting — contract work for
              multiple owners.
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
              alt: "TFS and myAAC",
              width: 16,
              height: 9,
            },
          ],
        },
        {
          title: "Web design & Frontend",
          description: (
            <>
              Custom professional sites for gaming and business — React, Next.js,
              TypeScript, responsive layouts, accessibility, and performance.
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
              alt: "Next.js web project",
              width: 16,
              height: 9,
            },
          ],
        },
        {
          title: "Backend & DevOps",
          description: (
            <>
              REST APIs, Node.js, PostgreSQL/MySQL/MariaDB, OAuth integrations, Docker,
              and Vercel deploys with CI/CD.
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
              alt: "B2B corporate website",
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
    title: "Notes on code and architecture",
    description: `Technical articles by ${person.name} about Next.js, TypeScript, and web development`,
  };

  const work: Work = {
    path: "/work",
    label: "Work",
    title: `Projects – ${person.name}`,
    description: `Work by ${person.name} — Strefa Kibica, BJ Trade, TFS/myAAC, and Next.js portfolio. Custom sites for gaming and business.`,
  };

  const gallery: Gallery = {
    path: "/gallery",
    label: "Gallery",
    title: `Gallery – ${person.name}`,
    description: `Screenshots and visual materials from projects`,
    images: [],
  };

  return { person, social, newsletter, home, about, blog, work, gallery };
}
