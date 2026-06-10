"use client";

import { useEffect, useState } from "react";

export type CursorMode = "disabled" | "lite" | "full";

function detectCursorMode(): CursorMode {
  if (typeof window === "undefined") return "disabled";

  const coarse = window.matchMedia("(pointer: coarse)").matches;
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (coarse || reducedMotion) return "disabled";

  const isFull =
    window.matchMedia("(min-width: 1280px)").matches &&
    window.matchMedia("(pointer: fine)").matches &&
    (typeof navigator.hardwareConcurrency !== "number" || navigator.hardwareConcurrency > 4);

  return isFull ? "full" : "lite";
}

/** Cursor fidelity: lite = dot+ring, full = trail + code chars on capable desktops. */
export function useCursorMode(): CursorMode {
  const [mode, setMode] = useState<CursorMode>("disabled");

  useEffect(() => {
    const queries = [
      window.matchMedia("(pointer: coarse)"),
      window.matchMedia("(prefers-reduced-motion: reduce)"),
      window.matchMedia("(min-width: 1280px)"),
      window.matchMedia("(pointer: fine)"),
    ];

    const update = () => setMode(detectCursorMode());

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

  return mode;
}

export { detectCursorMode };
