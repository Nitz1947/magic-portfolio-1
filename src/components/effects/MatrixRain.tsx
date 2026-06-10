"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { getCssVar, onThemeChange, parseRgb, resolveCssColor } from "./themeColors";
import styles from "./MatrixRain.module.scss";

const CHAR_POOL = [
  "0",
  "1",
  "{",
  "}",
  "[",
  "]",
  "(",
  ")",
  "<",
  ">",
  "/",
  ";",
  "=",
  "+",
  "*",
  "&",
  "|",
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "x",
  "y",
  "z",
  "fn",
  "if",
  "=>",
  "const",
  "let",
  "var",
  "import",
  "export",
  "async",
  "await",
  "return",
  "function",
  "null",
  "true",
  "false",
];

function randomChar(): string {
  return CHAR_POOL[Math.floor(Math.random() * CHAR_POOL.length)]!;
}

function readPalette(): [{ r: number; g: number; b: number }, { r: number; g: number; b: number }, { r: number; g: number; b: number }] {
  const bright = parseRgb(resolveCssColor("var(--brand-on-background-strong)")) ?? [4, 158, 226];
  const mid = parseRgb(resolveCssColor("var(--brand-on-background-weak)")) ?? [6, 182, 212];
  const dark = parseRgb(resolveCssColor("var(--brand-on-background-medium)")) ?? [8, 145, 178];
  return [
    { r: bright[0], g: bright[1], b: bright[2] },
    { r: mid[0], g: mid[1], b: mid[2] },
    { r: dark[0], g: dark[1], b: dark[2] },
  ];
}

function lerpColor(
  t: number,
  colors: [{ r: number; g: number; b: number }, { r: number; g: number; b: number }, { r: number; g: number; b: number }],
): { r: number; g: number; b: number } {
  const [bright, mid, dark] = colors;
  if (t >= 0.66) {
    const local = (t - 0.66) / 0.34;
    return {
      r: mid.r + (bright.r - mid.r) * local,
      g: mid.g + (bright.g - mid.g) * local,
      b: mid.b + (bright.b - mid.b) * local,
    };
  }

  const local = t / 0.66;
  return {
    r: dark.r + (mid.r - dark.r) * local,
    g: dark.g + (mid.g - dark.g) * local,
    b: dark.b + (mid.b - dark.b) * local,
  };
}

function getMonoFont(fontSize: number): string {
  const root = getComputedStyle(document.documentElement);
  const family =
    root.getPropertyValue("--font-family-code").trim() ||
    root.getPropertyValue("--font-code").trim() ||
    "ui-monospace, monospace";
  return `${fontSize}px ${family}`;
}

interface Column {
  x: number;
  headY: number;
  speed: number;
  trailLength: number;
  chars: string[];
  changeTimers: number[];
}

function createColumn(x: number, fontSize: number, height: number): Column {
  const trailLength = 8 + Math.floor(Math.random() * 10);
  const chars = Array.from({ length: trailLength }, () => randomChar());
  const changeTimers = Array.from({ length: trailLength }, () => Math.random() * 40);

  return {
    x,
    headY: -Math.random() * height,
    speed: 0.35 + Math.random() * 0.55,
    trailLength,
    chars,
    changeTimers,
  };
}

export function MatrixRain() {
  const pathname = usePathname();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isCoarse = window.matchMedia("(pointer: coarse)").matches;
    const isSmallMobile = window.innerWidth <= 640;

    if (prefersReduced || (isCoarse && isSmallMobile)) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId = 0;
    let columns: Column[] = [];
    let fontSize = 15;
    let columnWidth = 16;
    let palette = readPalette();
    let globalAlpha = Number.parseFloat(getCssVar("--effect-matrix-alpha")) || 1;

    const getColumnDensity = (width: number) => {
      if (width <= 480) return 0.55;
      if (width <= 768 || isCoarse) return 0.72;
      return 1;
    };

    const initColumns = (width: number, height: number) => {
      fontSize = width <= 768 ? 14 : 15;
      columnWidth = fontSize + 2;
      const density = getColumnDensity(width);
      const count = Math.max(8, Math.floor((width / columnWidth) * density));
      columns = Array.from({ length: count }, (_, i) =>
        createColumn(i * columnWidth + columnWidth * 0.5, fontSize, height),
      );
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      initColumns(w, h);
    };

    const draw = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;

      ctx.clearRect(0, 0, w, h);
      ctx.font = getMonoFont(fontSize);
      ctx.textAlign = "center";
      ctx.textBaseline = "top";

      for (const col of columns) {
        col.headY += col.speed;

        if (col.headY - col.trailLength * fontSize > h + fontSize) {
          col.headY = -Math.random() * h * 0.4;
          col.speed = 0.35 + Math.random() * 0.55;
          col.trailLength = 8 + Math.floor(Math.random() * 10);
          col.chars = Array.from({ length: col.trailLength }, () => randomChar());
          col.changeTimers = Array.from({ length: col.trailLength }, () => Math.random() * 40);
        }

        for (let j = 0; j < col.trailLength; j++) {
          const y = col.headY - j * fontSize;
          if (y < -fontSize || y > h + fontSize) continue;

          col.changeTimers[j]! -= 1;
          if (col.changeTimers[j]! <= 0) {
            col.chars[j] = randomChar();
            col.changeTimers[j] = 18 + Math.random() * 36;
          }

          const trailT = 1 - j / col.trailLength;
          const verticalT = Math.max(0, 1 - y / h);
          const brightness = trailT * 0.72 + verticalT * 0.28;
          const { r, g, b } = lerpColor(brightness, palette);
          const alpha = globalAlpha * (0.35 + brightness * 0.65);

          ctx.fillStyle = `rgba(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)}, ${alpha})`;
          ctx.fillText(col.chars[j]!, col.x, y);
        }
      }

      animationId = requestAnimationFrame(draw);
    };

    const refreshTheme = () => {
      palette = readPalette();
      globalAlpha = Number.parseFloat(getCssVar("--effect-matrix-alpha")) || 1;
    };

    resize();
    window.addEventListener("resize", resize);
    const unsubscribeTheme = onThemeChange(refreshTheme);

    void document.fonts.ready.then(() => {
      draw();
    });

    return () => {
      cancelAnimationFrame(animationId);
      unsubscribeTheme();
      window.removeEventListener("resize", resize);
    };
  }, [pathname]);

  return <canvas ref={canvasRef} className={styles.canvas} aria-hidden="true" />;
}
