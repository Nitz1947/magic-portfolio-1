"use client";

import { useEffect, useState } from "react";
import styles from "./BackgroundTerminal.module.scss";

const COMMANDS = [
  "npm run build",
  "git commit -m \"feat: deploy\"",
  "pnpm dev --turbo",
  "vercel --prod",
  "npx tsc --noEmit",
  "git push origin main",
];

function useTypingAnimation(enabled: boolean, offset: number) {
  const [commandIndex, setCommandIndex] = useState(offset % COMMANDS.length);
  const [displayed, setDisplayed] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (!enabled) {
      setDisplayed(COMMANDS[offset % COMMANDS.length]);
      return;
    }

    const current = COMMANDS[commandIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!isDeleting && displayed.length < current.length) {
      timeout = setTimeout(() => {
        setDisplayed(current.slice(0, displayed.length + 1));
      }, 45);
    } else if (!isDeleting && displayed.length === current.length) {
      timeout = setTimeout(() => setIsDeleting(true), 2200);
    } else if (isDeleting && displayed.length > 0) {
      timeout = setTimeout(() => {
        setDisplayed(displayed.slice(0, -1));
      }, 24);
    } else {
      setIsDeleting(false);
      setCommandIndex((i) => (i + 1) % COMMANDS.length);
    }

    return () => clearTimeout(timeout);
  }, [displayed, isDeleting, commandIndex, enabled, offset]);

  return displayed;
}

type TerminalPaneProps = {
  variant: "primary" | "secondary";
  offset: number;
  reducedMotion: boolean;
};

function TerminalPane({ variant, offset, reducedMotion }: TerminalPaneProps) {
  const displayed = useTypingAnimation(!reducedMotion, offset);

  return (
    <div className={`${styles.terminal} ${styles[variant]}`}>
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
  );
}

export function BackgroundTerminal() {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  return (
    <div className={styles.wrapper} aria-hidden="true">
      <TerminalPane variant="primary" offset={0} reducedMotion={reducedMotion} />
      <TerminalPane variant="secondary" offset={2} reducedMotion={reducedMotion} />
    </div>
  );
}
