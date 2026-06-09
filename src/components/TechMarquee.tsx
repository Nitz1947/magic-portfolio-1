"use client";

import styles from "./TechMarquee.module.scss";

const TECH_STACK = [
  "Next.js",
  "React",
  "TypeScript",
  "Node.js",
  "Discord OAuth",
  "Vercel",
  "PostgreSQL",
  "Tailwind CSS",
  "i18n",
  "App Router",
  "MDX",
  "Sass",
];

export function TechMarquee() {
  const items = [...TECH_STACK, ...TECH_STACK];

  return (
    <div className={styles.wrapper} aria-hidden="true">
      <div className={styles.track}>
        {items.map((tech, index) => (
          <span key={`${tech}-${index}`} className={styles.item}>
            {tech}
          </span>
        ))}
      </div>
    </div>
  );
}
