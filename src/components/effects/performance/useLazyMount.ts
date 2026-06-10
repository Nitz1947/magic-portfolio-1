"use client";

import { useEffect, useState } from "react";

/** Defer mounting heavy client effects until after first paint. */
export function useLazyMount(timeoutMs = 1200): boolean {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const mount = () => setMounted(true);

    if (typeof window.requestIdleCallback === "function") {
      const id = window.requestIdleCallback(mount, { timeout: timeoutMs });
      return () => window.cancelIdleCallback(id);
    }

    const id = setTimeout(mount, 80);
    return () => clearTimeout(id);
  }, [timeoutMs]);

  return mounted;
}
