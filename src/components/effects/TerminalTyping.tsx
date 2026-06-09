"use client";

import { useEffect, useState } from "react";
import styles from "./TerminalTyping.module.scss";

const COMMANDS = [
  "npm run build",
  "git commit -m \"feat: deploy\"",
  "pnpm dev --turbo",
  "vercel --prod",
  "npx tsc --noEmit",
  "git push origin main",
];

export function TerminalTyping() {
  const [commandIndex, setCommandIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      setDisplayed(COMMANDS[0]);
      return;
    }

    const current = COMMANDS[commandIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!isDeleting && displayed.length < current.length) {
      timeout = setTimeout(() => {
        setDisplayed(current.slice(0, displayed.length + 1));
      }, 55);
    } else if (!isDeleting && displayed.length === current.length) {
      timeout = setTimeout(() => setIsDeleting(true), 1800);
    } else if (isDeleting && displayed.length > 0) {
      timeout = setTimeout(() => {
        setDisplayed(displayed.slice(0, -1));
      }, 30);
    } else {
      setIsDeleting(false);
      setCommandIndex((i) => (i + 1) % COMMANDS.length);
    }

    return () => clearTimeout(timeout);
  }, [displayed, isDeleting, commandIndex]);

  return (
    <div className={styles.wrapper} aria-hidden="true">
      <div className={styles.terminal}>
        <div className={styles.titlebar}>
          <span className={styles.dot} />
          <span className={styles.dot} />
          <span className={styles.dot} />
        </div>
        <div className={styles.body}>
          <span className={styles.prompt}>$ </span>
          {displayed}
          <span className={styles.cursor} />
        </div>
      </div>
    </div>
  );
}
