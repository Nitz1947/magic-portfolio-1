import { BackgroundTerminal } from "./BackgroundTerminal";
import { CodeRain } from "./CodeRain";
import { FloatingSymbols } from "./FloatingSymbols";
import { ParticlesHero } from "./ParticlesHero";
import styles from "./HeroBackground.module.scss";

export function HeroBackground() {
  return (
    <div className={styles.layers} aria-hidden="true">
      <ParticlesHero />
      <CodeRain />
      <BackgroundTerminal />
      <FloatingSymbols density="sparse" />
    </div>
  );
}
