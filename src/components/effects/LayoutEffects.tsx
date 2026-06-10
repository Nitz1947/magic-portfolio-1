"use client";

import dynamic from "next/dynamic";
import { useLazyMount } from "./performance";

const GlobalPageBackground = dynamic(
  () => import("./GlobalPageBackground").then((m) => ({ default: m.GlobalPageBackground })),
  { ssr: false },
);

const CustomCursor = dynamic(
  () => import("./CustomCursor").then((m) => ({ default: m.CustomCursor })),
  { ssr: false },
);

/** Persistent layout-level effects — survive route changes within [locale]. */
export function LayoutEffects() {
  const mounted = useLazyMount();

  if (!mounted) return null;

  return (
    <>
      <GlobalPageBackground />
      <CustomCursor />
    </>
  );
}
