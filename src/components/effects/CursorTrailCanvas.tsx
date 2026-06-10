"use client";

import { useCallback, useRef } from "react";
import { brandRgba } from "./themeColors";

const DEFAULT_MAX_TRAIL = 25;
const REDUCED_MAX_TRAIL = 12;

interface TrailParticle {
  x: number;
  y: number;
  life: number;
  maxLife: number;
  size: number;
  colorIndex: number;
}

interface BurstParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
}

interface CanvasRipple {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  life: number;
  maxLife: number;
}

const TRAIL_VARS: [string, string, string] = [
  "--brand-on-background-weak",
  "--brand-on-background-medium",
  "--brand-on-background-strong",
];

interface CursorTrailOptions {
  reducedEffects?: boolean;
}

export function useCursorTrail(
  canvasRef: React.RefObject<HTMLCanvasElement | null>,
  options: CursorTrailOptions = {},
) {
  const maxTrail = options.reducedEffects ? REDUCED_MAX_TRAIL : DEFAULT_MAX_TRAIL;
  const trail = useRef<TrailParticle[]>([]);
  const bursts = useRef<BurstParticle[]>([]);
  const ripples = useRef<CanvasRipple[]>([]);
  const lastTrailPos = useRef({ x: -9999, y: -9999 });
  const dprRef = useRef(1);

  const resize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    dprRef.current = dpr;
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;
  }, [canvasRef]);

  const addTrail = useCallback(
    (x: number, y: number) => {
      const last = lastTrailPos.current;
      const dx = x - last.x;
      const dy = y - last.y;
      if (Math.sqrt(dx * dx + dy * dy) < 5) return;

      lastTrailPos.current = { x, y };

      if (trail.current.length >= maxTrail) {
        trail.current.shift();
      }

      trail.current.push({
        x,
        y,
        life: 1,
        maxLife: 0.65 + Math.random() * 0.45,
        size: 3 + Math.random() * 4.5,
        colorIndex: Math.floor(Math.random() * 3),
      });
    },
    [maxTrail],
  );

  const addBurst = useCallback((x: number, y: number) => {
    const count = options.reducedEffects ? 8 + Math.floor(Math.random() * 4) : 12 + Math.floor(Math.random() * 6);
    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 * i) / count + Math.random() * 0.4;
      const speed = 2.5 + Math.random() * 4.5;
      bursts.current.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 1,
        maxLife: 0.55 + Math.random() * 0.35,
        size: 2 + Math.random() * 3,
      });
    }

    const maxLife = 0.6;
    ripples.current.push({
      x,
      y,
      radius: 5,
      maxRadius: 70 + Math.random() * 25,
      life: maxLife,
      maxLife,
    });
  }, [options.reducedEffects]);

  const render = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = dprRef.current;
    const w = window.innerWidth;
    const h = window.innerHeight;
    const lifeDecay = options.reducedEffects ? 0.02 : 0.016;

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, w, h);

    trail.current = trail.current.filter((p) => {
      p.life -= lifeDecay;
      if (p.life <= 0) return false;

      const t = Math.max(0, p.life / p.maxLife);
      const alpha = t * 0.85;
      const size = Math.max(0, p.size * (0.45 + t * 0.55));

      ctx.beginPath();
      ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
      ctx.fillStyle = brandRgba(TRAIL_VARS[p.colorIndex]!, alpha);
      ctx.fill();
      return true;
    });

    bursts.current = bursts.current.filter((p) => {
      p.life -= 0.026;
      if (p.life <= 0) return false;

      p.x += p.vx;
      p.y += p.vy;
      p.vx *= 0.94;
      p.vy *= 0.94;

      const t = Math.max(0, p.life / p.maxLife);
      const burstRadius = Math.max(0, p.size * t);
      ctx.beginPath();
      ctx.arc(p.x, p.y, burstRadius, 0, Math.PI * 2);
      ctx.fillStyle = brandRgba("--brand-on-background-weak", t * 0.95);
      ctx.fill();
      return true;
    });

    ripples.current = ripples.current.filter((r) => {
      r.life -= 0.02;
      if (r.life <= 0) return false;

      const t = Math.max(0, Math.min(1, 1 - r.life / r.maxLife));
      r.radius = Math.max(0, 5 + (r.maxRadius - 5) * t);

      ctx.beginPath();
      ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
      ctx.strokeStyle = brandRgba("--brand-on-background-weak", r.life * 0.65);
      ctx.lineWidth = 2;
      ctx.stroke();
      return true;
    });
  }, [canvasRef, options.reducedEffects]);

  const reset = useCallback(() => {
    trail.current = [];
    bursts.current = [];
    ripples.current = [];
    lastTrailPos.current = { x: -9999, y: -9999 };
  }, []);

  return { addTrail, addBurst, render, resize, reset };
}
