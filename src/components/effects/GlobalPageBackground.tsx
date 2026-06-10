"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { FloatingSymbols } from "./FloatingSymbols";
import { MatrixRain } from "./MatrixRain";
import { useReducedEffects } from "./performance";
import { subscribeAnimationFrame } from "./performance/useSharedAnimationFrame";
import { brandRgba, getCssVar, onThemeChange } from "./themeColors";
import styles from "./GlobalPageBackground.module.scss";

const CODE_SNIPPETS = [
  `export async function getData() {\n  const res = await fetch(url);\n  return res.json();\n}`,
  `const App = () => {\n  return <Layout>{children}</Layout>;\n};`,
  `interface Props {\n  locale: Locale;\n  children: ReactNode;\n}`,
  `await prisma.user.findMany({\n  where: { active: true }\n});`,
  `export const metadata = {\n  title: "Portfolio"\n};`,
];

const WATERMARK_POSITIONS = [
  { top: "8%", left: "3%", rotate: -12 },
  { top: "22%", left: "68%", rotate: 8 },
  { top: "48%", left: "78%", rotate: -6 },
  { top: "62%", left: "6%", rotate: 14 },
  { top: "78%", left: "42%", rotate: -10 },
];

export function GlobalPageBackground() {
  const pathname = usePathname();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reducedEffects = useReducedEffects();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isCoarse = window.matchMedia("(pointer: coarse)").matches;
    const isMobile = window.innerWidth <= 768;

    if (prefersReduced || isCoarse || isMobile) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let scrollY = 0;
    const spacing = reducedEffects ? 72 : 52;
    const dotRadius = 1.35;
    const mouse = { x: -9999, y: -9999, active: false };
    let lastMoveTime = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const onScroll = () => {
      scrollY = window.scrollY;
    };

    const onMove = (e: MouseEvent) => {
      const now = performance.now();
      if (now - lastMoveTime < 12) return;
      lastMoveTime = now;
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;
    };

    const onLeave = () => {
      mouse.active = false;
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseleave", onLeave);

    const readAlphas = () => ({
      base: Number.parseFloat(getCssVar("--effect-dot-base-alpha")) || 0.22,
      active: Number.parseFloat(getCssVar("--effect-dot-active-alpha")) || 0.62,
    });

    let alphas = readAlphas();
    const influenceRadius = reducedEffects ? 160 : 200;
    const step = reducedEffects ? 2 : 1;

    const draw = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      ctx.clearRect(0, 0, w, h);

      const cols = Math.ceil(w / spacing) + 1;
      const rows = Math.ceil(h / spacing) + 1;
      const scrollOffset = (scrollY * 0.12) % spacing;

      for (let row = 0; row < rows; row += step) {
        for (let col = 0; col < cols; col += step) {
          const baseX = col * spacing;
          const baseY = row * spacing - scrollOffset;
          let x = baseX;
          let y = baseY;
          let alpha = alphas.base;

          if (mouse.active) {
            const dx = mouse.x - baseX;
            const dy = mouse.y - baseY;
            const distSq = dx * dx + dy * dy;
            const radiusSq = influenceRadius * influenceRadius;
            if (distSq < radiusSq) {
              const dist = Math.sqrt(distSq);
              const influence = Math.max(0, 1 - dist / influenceRadius);
              x += dx * influence * 0.1;
              y += dy * influence * 0.1;
              alpha = alphas.base + influence * (alphas.active - alphas.base);
            }
          }

          ctx.beginPath();
          ctx.arc(x, y, dotRadius + 0.3, 0, Math.PI * 2);
          ctx.fillStyle = brandRgba("--brand-on-background-weak", alpha);
          ctx.fill();
        }
      }
    };

    const unsubscribeTheme = onThemeChange(() => {
      alphas = readAlphas();
    });

    const unsubscribeRaf = subscribeAnimationFrame(draw, 0);

    return () => {
      unsubscribeRaf();
      unsubscribeTheme();
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
    };
  }, [pathname, reducedEffects]);

  const symbolDensity = reducedEffects ? "sparse" : "full";

  return (
    <div className={styles.root} aria-hidden="true">
      <div className={styles.mesh} />
      <div className={styles.orbs}>
        <div className={styles.orb} />
        <div className={styles.orb} />
        <div className={styles.orb} />
      </div>
      <div className={styles.perspectiveGrid} />
      <div className={styles.grid} />
      <MatrixRain />
      <canvas ref={canvasRef} className={styles.canvas} />
      <FloatingSymbols density={symbolDensity} />
      <div className={styles.watermarks}>
        {WATERMARK_POSITIONS.map((pos, i) => (
          <pre
            key={i}
            className={styles.watermark}
            style={{
              top: pos.top,
              left: pos.left,
              transform: `rotate(${pos.rotate}deg)`,
            }}
          >
            {CODE_SNIPPETS[i % CODE_SNIPPETS.length]}
          </pre>
        ))}
      </div>
      <div className={styles.aurora} />
      <div className={styles.noise} />
    </div>
  );
}
