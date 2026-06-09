import type { About, Blog, Gallery, Home, Newsletter, Person, Social, Work } from "@/types";
import { Line, Row, Text } from "@once-ui-system/core";

import type { LocaleContent } from "./types";

export function createEnglishContent(): LocaleContent {
  const person: Person = {
    firstName: "Michał",
    lastName: "Ch.",
    name: "Michał Ch.",
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
    description: `Full-stack developer portfolio focused on Next.js, React, and TypeScript`,
    headline: <>I build fast, scalable web applications</>,
    featured: {
      display: true,
      title: (
        <Row gap="12" vertical="center">
          <strong className="ml-4">E-commerce Next.js</strong>{" "}
          <Line background="brand-alpha-strong" vert height="20" />
          <Text marginRight="4" onBackground="brand-medium">
            Featured project
          </Text>
        </Row>
      ),
      href: "/work/platforma-ecommerce-nextjs",
    },
    subline: (
      <>
        I'm a full-stack developer shipping production apps with{" "}
        <Text as="span" size="xl" weight="strong">
          Next.js
        </Text>
        , React, and TypeScript — from backend architecture to polished UX.
      </>
    ),
  };

  const about: About = {
    path: "/about",
    label: "About",
    title: `About – ${person.name}`,
    description: `Meet ${person.name}, a ${person.role} based in Warsaw`,
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
          Full-stack developer with experience building SaaS products, e-commerce platforms, and
          APIs from concept to production. I focus on performance, clean architecture, and
          iterative delivery of business value across the JavaScript stack — from UI to server
          layer and cloud infrastructure.
        </>
      ),
    },
    work: {
      display: true,
      title: "Work Experience",
      experiences: [
        {
          company: "TechFlow Studio",
          timeframe: "2022 – Present",
          role: "Senior Full-Stack Developer",
          achievements: [
            <>
              Designed and shipped an e-commerce platform handling 12,000+ monthly transactions,
              reducing product page load time by 40%.
            </>,
            <>
              Introduced a microservices architecture for the payments module, cutting production
              incidents by 60%.
            </>,
          ],
          images: [
            {
              src: "/images/projects/ecommerce/cover-01.svg",
              alt: "E-commerce platform",
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
              Built a React design system that reduced time-to-ship for new views by 35%.
            </>,
            <>
              Optimized Core Web Vitals on key pages — LCP dropped from 4.2s to 1.8s.
            </>,
          ],
          images: [],
        },
      ],
    },
    studies: {
      display: true,
      title: "Education",
      institutions: [
        {
          name: "Warsaw University of Technology",
          description: <>Computer Science — web systems specialization.</>,
        },
        {
          name: "Certifications",
          description: <>AWS Cloud Practitioner, Meta Front-End Developer Professional.</>,
        },
      ],
    },
    technical: {
      display: true,
      title: "Technical skills",
      skills: [
        {
          title: "Frontend",
          description: (
            <>
              React and Next.js apps with App Router, SSR/SSG, performance tuning, and
              accessibility.
            </>
          ),
          tags: [
            { name: "JavaScript", icon: "javascript" },
            { name: "Next.js", icon: "nextjs" },
          ],
          images: [
            {
              src: "/images/projects/portfolio/cover-01.svg",
              alt: "Frontend project",
              width: 16,
              height: 9,
            },
          ],
        },
        {
          title: "Backend & DevOps",
          description: (
            <>REST and GraphQL APIs in Node.js, PostgreSQL, Redis, Docker, and Vercel/AWS deploys.</>
          ),
          tags: [
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
    description: `Web application and API case studies by ${person.name}`,
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
