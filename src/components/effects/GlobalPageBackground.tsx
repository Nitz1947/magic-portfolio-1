"use client";

import { useEffect, useRef } from "react";
import { FloatingSymbols } from "./FloatingSymbols";
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
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isCoarse = window.matchMedia("(pointer: coarse)").matches;
    if (prefersReduced || isCoarse) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId = 0;
    let scrollY = 0;
    const spacing = 52;
    const dotRadius = 1.35;
    const mouse = { x: -9999, y: -9999, active: false };

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
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseleave", onLeave);

    const draw = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      ctx.clearRect(0, 0, w, h);

      const cols = Math.ceil(w / spacing) + 1;
      const rows = Math.ceil(h / spacing) + 1;
      const scrollOffset = (scrollY * 0.12) % spacing;

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const baseX = col * spacing;
          const baseY = row * spacing - scrollOffset;
          let x = baseX;
          let y = baseY;
          let alpha = 0.16;

          if (mouse.active) {
            const dx = mouse.x - baseX;
            const dy = mouse.y - baseY;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const influence = Math.max(0, 1 - dist / 200);
            if (influence > 0) {
              x += dx * influence * 0.1;
              y += dy * influence * 0.1;
              alpha = 0.16 + influence * 0.42;
            }
          }

          ctx.beginPath();
          ctx.arc(x, y, dotRadius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(34, 211, 238, ${alpha})`;
          ctx.fill();
        }
      }

      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <div className={styles.root} aria-hidden="true">
      <div className={styles.mesh} />
      <div className={styles.perspectiveGrid} />
      <div className={styles.grid} />
      <canvas ref={canvasRef} className={styles.canvas} />
      <FloatingSymbols density="sparse" />
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
