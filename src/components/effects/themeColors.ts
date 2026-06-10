/** Read a CSS custom property from :root. */
export function getCssVar(name: string): string {
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
}

/** Resolve a CSS color (incl. var()) to rgb(r, g, b). */
export function resolveCssColor(cssColor: string): string {
  const probe = document.createElement("span");
  probe.style.color = cssColor;
  probe.style.display = "none";
  document.documentElement.appendChild(probe);
  const resolved = getComputedStyle(probe).color;
  probe.remove();
  return resolved;
}

/** Parse "rgb(r, g, b)" or "rgba(...)" into [r, g, b]. */
export function parseRgb(color: string): [number, number, number] | null {
  const match = color.match(/(\d+)[,\s]+(\d+)[,\s]+(\d+)/);
  if (!match) return null;
  return [Number(match[1]), Number(match[2]), Number(match[3])];
}

/** Build rgba() from a theme CSS variable name and alpha. */
export function brandRgba(varName: string, alpha: number): string {
  const rgb = parseRgb(resolveCssColor(`var(${varName})`));
  if (!rgb) return `rgba(4, 158, 226, ${alpha})`;
  return `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${alpha})`;
}

/** Subscribe to data-theme changes on documentElement. */
export function onThemeChange(callback: () => void): () => void {
  const observer = new MutationObserver((mutations) => {
    for (const m of mutations) {
      if (m.type === "attributes" && m.attributeName === "data-theme") {
        callback();
        break;
      }
    }
  });
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });
  return () => observer.disconnect();
}
