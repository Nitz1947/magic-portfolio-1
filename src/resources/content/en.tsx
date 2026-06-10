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
    description: `Custom websites and web apps — individual approach, needs analysis, and delivery tailored to your industry. Next.js, React, TypeScript.`,
    headline: <>Websites and apps built to fit — for businesses that need more than a template</>,
    featured: {
      display: true,
      items: [
        {
          title: (
            <Row gap="8" vertical="center">
              <strong className="ml-4">Custom development</strong>
              <Line background="brand-alpha-strong" vert height="16" />
              <Text marginRight="4" onBackground="brand-medium">
                Tailored quote
              </Text>
            </Row>
          ),
          href: "/quote",
        },
      ],
    },
    subline: (
      <>
        Individual approach, needs analysis, and a solution tailored to your industry and
        business goals. From the first conversation through design, build, and launch — plus
        post-launch support. Built with{" "}
        <Text as="span" size="xl" weight="strong">Next.js, React, and TypeScript</Text>.
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
          project is a <strong>solution shaped around your needs</strong> — your
          business, audience, and budget.
          <br />
          <br />
          <strong>How I work:</strong> I start with a conversation and business goals,
          then shape structure and UX, ship iteratively with preview deploys at every
          stage, and stay available after launch. Corporate sites, apps, community
          platforms, stores, admin panels, and multilingual products — always against
          a real brief, never a prefab theme.
          <br />
          <br />
          <strong>Why work with me:</strong> a modern stack (Next.js, React, TypeScript)
          means speed, performance, and reliable delivery. You get a transparent
          process, clear communication, and a technical partner who explains decisions
          in business terms.
          <br />
          <br />
          <strong>Who it's for:</strong> companies without an in-house IT team,
          entrepreneurs, and brands that want a professional online presence without
          compromise. See live examples in the <strong>Portfolio</strong> section.
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
    label: "Portfolio",
    title: `Portfolio – ${person.name}`,
    description: `Project presentations by ${person.name} — production deployments for business, marketing, and community. Custom Next.js websites and apps.`,
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
