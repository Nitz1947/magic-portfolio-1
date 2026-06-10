"use client";

import { useEffect, useMemo, useState } from "react";
import Particles, {
  ParticlesProvider,
  useParticlesProvider,
} from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { ISourceOptions } from "@tsparticles/engine";
import { useReducedEffects } from "./performance";
import { getCssVar, onThemeChange, resolveCssColor } from "./themeColors";
import styles from "./ParticlesHero.module.scss";

function useParticlesEnabled() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mobileQuery = window.matchMedia("(max-width: 768px)");

    const update = () => {
      setEnabled(!motionQuery.matches && !mobileQuery.matches);
    };

    update();
    motionQuery.addEventListener("change", update);
    mobileQuery.addEventListener("change", update);
    return () => {
      motionQuery.removeEventListener("change", update);
      mobileQuery.removeEventListener("change", update);
    };
  }, []);

  return enabled;
}

function readParticleColors(): { colors: string[]; linkColor: string; opacityMin: number; opacityMax: number } {
  const isDark = document.documentElement.getAttribute("data-theme") === "dark";
  const weak = resolveCssColor("var(--brand-on-background-weak)");
  const medium = resolveCssColor("var(--brand-on-background-medium)");
  const strong = resolveCssColor("var(--brand-on-background-strong)");
  const solid = resolveCssColor("var(--brand-solid-strong)");

  return {
    colors: [strong, weak, medium, solid],
    linkColor: weak,
    opacityMin: isDark ? 0.18 : 0.12,
    opacityMax: isDark ? 0.42 : 0.28,
  };
}

function useParticleOptions(reducedEffects: boolean): ISourceOptions {
  const [themeKey, setThemeKey] = useState(0);

  useEffect(() => {
    return onThemeChange(() => setThemeKey((k) => k + 1));
  }, []);

  return useMemo(() => {
    void themeKey;
    const { colors, linkColor, opacityMin, opacityMax } = readParticleColors();
    const wrapperOpacity = Number.parseFloat(getCssVar("--effect-canvas-opacity")) || 0.72;
    const particleCount = reducedEffects ? 28 : 38;

    return {
      fullScreen: false,
      fpsLimit: reducedEffects ? 45 : 60,
      detectRetina: true,
      background: {
        color: { value: "transparent" },
      },
      particles: {
        number: {
          value: particleCount,
          density: { enable: true, width: 900, height: 700 },
        },
        color: { value: colors },
        links: {
          enable: true,
          color: linkColor,
          opacity: wrapperOpacity * 0.28,
          distance: reducedEffects ? 110 : 130,
          width: 1,
        },
        move: {
          enable: true,
          speed: reducedEffects ? 0.45 : 0.6,
          direction: "none",
          random: true,
          outModes: { default: "out" },
        },
        opacity: {
          value: { min: opacityMin, max: opacityMax },
        },
        size: {
          value: { min: 1, max: 2.5 },
        },
      },
      interactivity: {
        detectsOn: "canvas",
        events: {
          onHover: { enable: !reducedEffects, mode: "grab" },
          resize: { enable: true },
        },
        modes: {
          grab: {
            distance: 120,
            links: { opacity: wrapperOpacity * 0.45 },
          },
        },
      },
    };
  }, [themeKey, reducedEffects]);
}

function ParticlesCanvas({ reducedEffects }: { reducedEffects: boolean }) {
  const { loaded } = useParticlesProvider();
  const options = useParticleOptions(reducedEffects);

  if (!loaded) return null;

  return (
    <div className={styles.wrapper} aria-hidden="true">
      <Particles id="hero-particles" className={styles.canvas} options={options} />
    </div>
  );
}

export function ParticlesHero() {
  const enabled = useParticlesEnabled();
  const reducedEffects = useReducedEffects();

  if (!enabled) return null;

  return (
    <ParticlesProvider init={loadSlim}>
      <ParticlesCanvas reducedEffects={reducedEffects} />
    </ParticlesProvider>
  );
}
