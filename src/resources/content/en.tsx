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
    description: `Next.js websites and apps deployed on Vercel — SEO platform, Discord community with OAuth, multilingual B2B site. React, TypeScript.`,
    headline: <>Next.js websites and apps — shipped on Vercel, not from a template</>,
    featured: {
      display: true,
      items: [
        {
          title: (
            <Row gap="8" vertical="center">
              <strong className="ml-4">SEO Opt One</strong>
              <Line background="brand-alpha-strong" vert height="16" />
              <Text marginRight="4" onBackground="brand-medium">
                SEO audit
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
                Discord OAuth
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
                B2B PL/EN
              </Text>
            </Row>
          ),
          href: "/work/bjtrade",
        },
      ],
    },
    subline: (
      <>
        I build with <Text as="span" size="xl" weight="strong">Next.js and React</Text> — from an SEO
        audit platform with strategy plans and code generators, through a Discord app with
        virtual betting and leaderboards, to a multilingual B2B wholesaler site with GMP/HACCP
        certifications. From brief to Vercel deploy.
      </>
    ),
  };

  const about: About = {
    path: "/about",
    label: "About",
    title: `About – ${person.name}`,
    description: `Meet ${person.name} — full-stack developer building Next.js websites and apps with live Vercel deployments`,
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
          I'm <strong>Krystian G.</strong> — a full-stack freelancer who designs and
          ships websites and web apps from scratch. I don't sell templates: every
          project is a <strong>custom build</strong> aligned with your business,
          audience, and budget.
          <br />
          <br />
          <strong>What I build for clients:</strong> B2B corporate sites, community
          and Discord platforms, SEO landing pages, e-commerce stores, admin panels,
          SEO audits, and multi-language products (PL/EN and beyond).
          <br />
          <br />
          <strong>Why work with me:</strong> Next.js and Vercel mean speed,
          performance, and reliable hosting. You get a transparent process, preview
          deploys at every stage, and post-launch support — you're not left alone
          with the tech.
          <br />
          <br />
          <strong>Who it's for:</strong> companies without an in-house IT team,
          gaming communities, entrepreneurs, and brands that want a professional
          online presence without compromise. Proof in production:{" "}
          <strong>SEO Opt One</strong>, <strong>Strefa Kibica</strong>, and{" "}
          <strong>BJ Trade</strong>.
        </>
      ),
    },
    work: {
      display: true,
      title: "Work Experience",
      experiences: [
        {
          company: "Web Projects (Freelance)",
          timeframe: "2022 – Present",
          role: "Full-Stack Developer & Web Designer",
          achievements: [
            <>
              <strong>SEO Opt One</strong> — SEO audit platform with code generators,
              strategy plans, and marketing modules (Next.js, Vercel).
            </>,
            <>
              <strong>Strefa Kibica</strong> — virtual betting platform for a Discord
              community (Next.js, OAuth, leaderboard).
            </>,
            <>
              <strong>BJ Trade</strong> — B2B corporate site for a herbs and spices
              wholesaler with quality certifications, i18n PL/EN, and live Vercel deploy.
            </>,
            <>
              <strong>Custom</strong> websites for gaming communities and businesses —
              Next.js, TypeScript, i18n, Vercel deployments.
            </>,
          ],
          images: [
            {
              src: "/images/projects/seo-opt-one/cover-01.svg",
              alt: "SEO Opt One — SEO tool",
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
    description: `Work by ${person.name} — SEO Opt One, Strefa Kibica, BJ Trade, and Next.js portfolio. Custom sites for gaming and business.`,
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
