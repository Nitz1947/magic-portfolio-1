"use client";

import { useCallback, useRef } from "react";

const MAX_TRAIL = 30;
const TRAIL_COLORS = [
  "rgba(34, 211, 238,",
  "rgba(6, 182, 212,",
  "rgba(20, 184, 166,",
] as const;

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

export function useCursorTrail(canvasRef: React.RefObject<HTMLCanvasElement | null>) {
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

  const addTrail = useCallback((x: number, y: number) => {
    const last = lastTrailPos.current;
    const dx = x - last.x;
    const dy = y - last.y;
    if (Math.sqrt(dx * dx + dy * dy) < 5) return;

    lastTrailPos.current = { x, y };

    if (trail.current.length >= MAX_TRAIL) {
      trail.current.shift();
    }

    trail.current.push({
      x,
      y,
      life: 1,
      maxLife: 0.65 + Math.random() * 0.45,
      size: 3 + Math.random() * 4.5,
      colorIndex: Math.floor(Math.random() * TRAIL_COLORS.length),
    });
  }, []);

  const addBurst = useCallback((x: number, y: number) => {
    const count = 12 + Math.floor(Math.random() * 6);
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

    ripples.current.push({
      x,
      y,
      radius: 5,
      maxRadius: 70 + Math.random() * 25,
      life: 1,
      maxLife: 0.6,
    });
  }, []);

  const render = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = dprRef.current;
    const w = window.innerWidth;
    const h = window.innerHeight;

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, w, h);

    trail.current = trail.current.filter((p) => {
      p.life -= 0.016;
      if (p.life <= 0) return false;

      const t = p.life / p.maxLife;
      const alpha = t * 0.85;
      const size = p.size * (0.45 + t * 0.55);

      ctx.beginPath();
      ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
      ctx.fillStyle = `${TRAIL_COLORS[p.colorIndex]}${alpha})`;
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

      const t = p.life / p.maxLife;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size * t, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(34, 211, 238, ${t * 0.95})`;
      ctx.fill();
      return true;
    });

    ripples.current = ripples.current.filter((r) => {
      r.life -= 0.02;
      if (r.life <= 0) return false;

      const t = 1 - r.life / r.maxLife;
      r.radius = 5 + (r.maxRadius - 5) * t;

      ctx.beginPath();
      ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(34, 211, 238, ${r.life * 0.65})`;
      ctx.lineWidth = 2;
      ctx.stroke();
      return true;
    });
  }, [canvasRef]);

  return { addTrail, addBurst, render, resize };
}
