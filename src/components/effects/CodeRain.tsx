"use client";

import { useMemo } from "react";
import styles from "./CodeRain.module.scss";

const SNIPPETS = [
  "const app = createApp();",
  "export default function Page()",
  "await fetch('/api/bets')",
  "type Props = { locale: Locale }",
  "return <Column gap='xl'>",
  "useEffect(() => {}, [])",
  "import { NextResponse }",
  "pnpm build && deploy",
  "interface Project { slug }",
  "async function getData()",
  "<RevealFx delay={0.2}>",
  "npm run dev --turbo",
  "const { data } = await res",
  "export const metadata = {}",
];

type Column = {
  id: number;
  left: number;
  duration: number;
  delay: number;
  text: string;
};

function buildColumns(count: number): Column[] {
  return Array.from({ length: count }, (_, i) => {
    const lines = Array.from(
      { length: 6 + (i % 4) },
      (_, j) => SNIPPETS[(i + j) % SNIPPETS.length],
    ).join("\n");

    return {
      id: i,
      left: 4 + (i * 92) / count,
      duration: 14 + (i % 5) * 3,
      delay: -(i * 1.7),
      text: lines,
    };
  });
}

export function CodeRain() {
  const columns = useMemo(() => buildColumns(12), []);

  return (
    <div className={styles.wrapper} aria-hidden="true">
      {columns.map((col) => (
        <span
          key={col.id}
          className={styles.column}
          style={{
            left: `${col.left}%`,
            animationDuration: `${col.duration}s`,
            animationDelay: `${col.delay}s`,
          }}
        >
          {col.text}
        </span>
      ))}
    </div>
  );
}
