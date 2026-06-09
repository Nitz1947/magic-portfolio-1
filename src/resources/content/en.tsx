import type { About, Blog, Gallery, Home, Newsletter, Person, Social, Work } from "@/types";
import { Line, Row, Text } from "@once-ui-system/core";

import type { LocaleContent } from "./types";

export function createEnglishContent(): LocaleContent {
  const person: Person = {
    firstName: "Krystian",
    lastName: "",
    name: "Krystian",
    role: "Full-Stack Developer",
    avatar: "/images/avatar.svg",
    email: "kontakt@1choc.dev",
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
    description: `Full-stack developer portfolio with TFS/myAAC background — Next.js, React, TypeScript, and Open Tibia`,
    headline: <>From OT servers to production web applications</>,
    featured: {
      display: true,
      title: (
        <Row gap="12" vertical="center">
          <strong className="ml-4">TFS & myAAC</strong>{" "}
          <Line background="brand-alpha-strong" vert height="20" />
          <Text marginRight="4" onBackground="brand-medium">
            Featured project
          </Text>
        </Row>
      ),
      href: "/work/serwer-ot-tfs-myAAC",
    },
    subline: (
      <>
        I'm a full-stack developer with 6 years in the{" "}
        <Text as="span" size="xl" weight="strong">
          TFS
        </Text>
        {" "}and{" "}
        <Text as="span" size="xl" weight="strong">
          myAAC
        </Text>
        {" "}ecosystem. Today I ship fast apps with Next.js, React, and TypeScript — bridging
        community gaming passion with professional architecture and UX.
      </>
    ),
  };

  const about: About = {
    path: "/about",
    label: "About",
    title: `About – ${person.name}`,
    description: `Meet ${person.name}, a ${person.role} with a unique Open Tibia and TFS background`,
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
          I started in the Open Tibia world — for 6 years I ran servers on{" "}
          <strong>The Forgotten Server (TFS)</strong> and customized{" "}
          <strong>myAAC</strong>, the popular CMS for OT communities. That taught me Lua,
          PHP, MySQL, and product-minded work: from quest scripts to player panels and
          registration sites. Today I bring the same drive to the modern stack — React,
          TypeScript, Next.js, and Node.js — building SaaS, e-commerce, and APIs ready for
          production.
        </>
      ),
    },
    work: {
      display: true,
      title: "Work Experience",
      experiences: [
        {
          company: "Open Tibia Ecosystem (TFS + myAAC)",
          timeframe: "2019 – Present",
          role: "Server Developer & CMS Customizer",
          achievements: [
            <>
              6 years with <strong>The Forgotten Server</strong> — custom game systems,
              quests, balancing, events, and core extensions in <strong>Lua</strong>.
            </>,
            <>
              Full <strong>myAAC</strong> customization in PHP — templates, registration
              modules, rankings, shops, and server database integrations in{" "}
              <strong>MySQL</strong>.
            </>,
            <>
              Community frontend: landing pages, player panels, and responsive UI in{" "}
              <strong>HTML, CSS, and JavaScript</strong> — from prototype to production.
            </>,
          ],
          images: [
            {
              src: "/images/projects/ot/cover-01.svg",
              alt: "OT server — TFS and myAAC",
              width: 16,
              height: 9,
            },
          ],
        },
        {
          company: "Web Projects (Freelance)",
          timeframe: "2022 – Present",
          role: "Full-Stack Developer",
          achievements: [
            <>
              Skill migration to <strong>React, TypeScript, and Next.js</strong> — portfolios,
              e-commerce platforms, and SaaS analytics dashboards.
            </>,
            <>
              <strong>Node.js</strong> API architecture, payment integrations, and performance
              tuning (Core Web Vitals, ISR, edge caching).
            </>,
            <>
              <strong>Vercel</strong> deployments with preview URLs, SEO, and i18n (PL/EN).
            </>,
          ],
          images: [
            {
              src: "/images/projects/portfolio/cover-01.svg",
              alt: "Full-stack Next.js projects",
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
              6 years of hands-on practice — Lua (TFS scripting), PHP (myAAC), MySQL, Linux
              server administration, and running gaming communities from scratch.
            </>
          ),
        },
        {
          name: "Self-directed — modern web",
          description: (
            <>
              React, TypeScript, Next.js App Router, Node.js, REST APIs, Docker, and cloud
              (Vercel/AWS) — continuous growth from community dev to professional full-stack.
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
              Lua scripting in TFS, custom game systems, myAAC in PHP, MySQL schemas for OT
              servers, and community tooling from quests to admin panels.
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
          title: "Frontend (modern stack)",
          description: (
            <>
              React and Next.js apps with App Router, SSR/SSG, TypeScript, animations,
              accessibility, and performance optimization.
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
              alt: "Next.js frontend project",
              width: 16,
              height: 9,
            },
          ],
        },
        {
          title: "Backend & DevOps",
          description: (
            <>
              REST APIs in Node.js, PostgreSQL/MySQL, Redis, Docker, microservices, and
              Vercel deploys with CI/CD and monitoring.
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
              alt: "API architecture",
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
    description: `Case studies — from TFS/myAAC to Next.js apps and APIs by ${person.name}`,
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
