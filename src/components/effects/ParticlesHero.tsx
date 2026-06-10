"use client";

import { useEffect, useMemo, useState } from "react";
import Particles, {
  ParticlesProvider,
  useParticlesProvider,
} from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { ISourceOptions } from "@tsparticles/engine";
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

const particleOptions: ISourceOptions = {
  fullScreen: false,
  fpsLimit: 60,
  detectRetina: true,
  background: {
    color: {
      value: "transparent",
    },
  },
  particles: {
    number: {
      value: 55,
      density: {
        enable: true,
        width: 900,
        height: 700,
      },
    },
    color: {
      value: ["#22d3ee", "#06b6d4", "#0891b2", "#2dd4bf"],
    },
    links: {
      enable: true,
      color: "#0891b2",
      opacity: 0.22,
      distance: 130,
      width: 1,
    },
    move: {
      enable: true,
      speed: 0.6,
      direction: "none",
      random: true,
      outModes: {
        default: "out",
      },
    },
    opacity: {
      value: { min: 0.15, max: 0.45 },
    },
    size: {
      value: { min: 1, max: 2.5 },
    },
  },
  interactivity: {
    detectsOn: "canvas",
    events: {
      onHover: {
        enable: true,
        mode: "grab",
      },
      resize: {
        enable: true,
      },
    },
    modes: {
      grab: {
        distance: 120,
        links: {
          opacity: 0.35,
        },
      },
    },
  },
};

function ParticlesCanvas() {
  const { loaded } = useParticlesProvider();
  const options = useMemo(() => particleOptions, []);

  if (!loaded) return null;

  return (
    <div className={styles.wrapper} aria-hidden="true">
      <Particles id="hero-particles" className={styles.canvas} options={options} />
    </div>
  );
}

export function ParticlesHero() {
  const enabled = useParticlesEnabled();

  if (!enabled) return null;

  return (
    <ParticlesProvider init={loadSlim}>
      <ParticlesCanvas />
    </ParticlesProvider>
  );
}
