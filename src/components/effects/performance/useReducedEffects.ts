"use client";

import { useEffect, useState } from "react";

function detectReducedEffects(): boolean {
  if (typeof window === "undefined") return false;

  const coarse = window.matchMedia("(pointer: coarse)").matches;
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const lowCores = typeof navigator.hardwareConcurrency === "number" && navigator.hardwareConcurrency <= 4;
  const mobile = window.matchMedia("(max-width: 768px)").matches;

  return coarse || reducedMotion || lowCores || mobile;
}

/** True when effects should run in a lighter performance mode. */
export function useReducedEffects(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const queries = [
      window.matchMedia("(pointer: coarse)"),
      window.matchMedia("(prefers-reduced-motion: reduce)"),
      window.matchMedia("(max-width: 768px)"),
    ];

    const update = () => setReduced(detectReducedEffects());

    update();
    for (const q of queries) {
      q.addEventListener("change", update);
    }
    window.addEventListener("resize", update);

    return () => {
      for (const q of queries) {
        q.removeEventListener("change", update);
      }
      window.removeEventListener("resize", update);
    };
  }, []);

  return reduced;
}

export { detectReducedEffects };
