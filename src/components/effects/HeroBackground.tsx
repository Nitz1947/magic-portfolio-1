"use client";

import dynamic from "next/dynamic";
import { BackgroundTerminal } from "./BackgroundTerminal";
import { CodeRain } from "./CodeRain";
import { FloatingSymbols } from "./FloatingSymbols";
import { useReducedEffects } from "./performance";
import styles from "./HeroBackground.module.scss";

const ParticlesHero = dynamic(
  () => import("./ParticlesHero").then((m) => ({ default: m.ParticlesHero })),
  { ssr: false },
);

export function HeroBackground() {
  const reducedEffects = useReducedEffects();

  return (
    <div className={styles.layers} aria-hidden="true">
      <ParticlesHero />
      <CodeRain />
      <BackgroundTerminal />
      <FloatingSymbols density={reducedEffects ? "sparse" : "sparse"} />
    </div>
  );
}
