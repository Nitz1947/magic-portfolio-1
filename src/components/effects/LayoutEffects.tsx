"use client";

import { CustomCursor } from "./CustomCursor";
import { GlobalPageBackground } from "./GlobalPageBackground";

/** Persistent layout-level effects — survive route changes within [locale]. */
export function LayoutEffects() {
  return (
    <>
      <GlobalPageBackground />
      <CustomCursor />
    </>
  );
}
