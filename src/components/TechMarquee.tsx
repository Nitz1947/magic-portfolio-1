"use client";

import {
  SiDiscord,
  SiMdx,
  SiNextdotjs,
  SiNodedotjs,
  SiReact,
  SiTypescript,
  SiVercel,
} from "react-icons/si";
import styles from "./TechMarquee.module.scss";

const TECH_STACK = [
  { label: "Next.js", Icon: SiNextdotjs },
  { label: "React", Icon: SiReact },
  { label: "TypeScript", Icon: SiTypescript },
  { label: "Node.js", Icon: SiNodedotjs },
  { label: "Vercel", Icon: SiVercel },
  { label: "Discord OAuth", Icon: SiDiscord },
  { label: "MDX", Icon: SiMdx },
  { label: "App Router", Icon: SiNextdotjs },
  { label: "PostgreSQL", Icon: null },
  { label: "Tailwind CSS", Icon: null },
  { label: "i18n", Icon: null },
  { label: "Sass", Icon: null },
] as const;

export function TechMarquee() {
  const items = [...TECH_STACK, ...TECH_STACK];

  return (
    <div className={styles.wrapper} aria-hidden="true">
      <div className={styles.track}>
        {items.map((tech, index) => (
          <span key={`${tech.label}-${index}`} className={styles.item}>
            {tech.Icon && <tech.Icon className={styles.icon} aria-hidden="true" />}
            <span className={styles.label}>{tech.label}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
