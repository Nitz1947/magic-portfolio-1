"use client";

import { useCallback, useEffect, useRef } from "react";
import { onThemeChange, parseRgb, resolveCssColor } from "./themeColors";

const FULL_MAX_TRAIL = 6;
const MAX_BURST = 5;

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

type Rgb = [number, number, number];

interface ColorCache {
  trail: Rgb[];
  weak: Rgb;
}

function rgba(rgb: Rgb, alpha: number): string {
  return `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${alpha})`;
}

interface CursorTrailOptions {
  enabled?: boolean;
}

export function useCursorTrail(
  canvasRef: React.RefObject<HTMLCanvasElement | null>,
  options: CursorTrailOptions = {},
) {
  const enabled = options.enabled ?? false;
  const trail = useRef<TrailParticle[]>([]);
  const bursts = useRef<BurstParticle[]>([]);
  const ripples = useRef<CanvasRipple[]>([]);
  const lastTrailPos = useRef({ x: -9999, y: -9999 });
  const dprRef = useRef(1);
  const colorsRef = useRef<ColorCache | null>(null);

  const refreshColors = useCallback(() => {
    colorsRef.current = {
      trail: TRAIL_VARS.map((v) => parseRgb(resolveCssColor(`var(${v})`)) ?? [4, 158, 226]),
      weak: parseRgb(resolveCssColor("var(--brand-on-background-weak)")) ?? [4, 158, 226],
    };
  }, []);

  useEffect(() => {
    refreshColors();
    return onThemeChange(refreshColors);
  }, [refreshColors]);

  const resize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    dprRef.current = dpr;
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;
  }, [canvasRef]);

  const addTrail = useCallback(
    (x: number, y: number) => {
      if (!enabled) return;

      const last = lastTrailPos.current;
      const dx = x - last.x;
      const dy = y - last.y;
      if (dx * dx + dy * dy < 25) return;

      lastTrailPos.current = { x, y };

      if (trail.current.length >= FULL_MAX_TRAIL) {
        trail.current.shift();
      }

      trail.current.push({
        x,
        y,
        life: 1,
        maxLife: 0.55 + Math.random() * 0.35,
        size: 2.5 + Math.random() * 3,
        colorIndex: Math.floor(Math.random() * 3),
      });
    },
    [enabled],
  );

  const addBurst = useCallback((x: number, y: number) => {
    const count = MAX_BURST;
    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 * i) / count + Math.random() * 0.3;
      const speed = 2 + Math.random() * 3.5;
      bursts.current.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 1,
        maxLife: 0.5 + Math.random() * 0.3,
        size: 2 + Math.random() * 2.5,
      });
    }

    const maxLife = 0.55;
    ripples.current.push({
      x,
      y,
      radius: 5,
      maxRadius: 55 + Math.random() * 20,
      life: maxLife,
      maxLife,
    });
  }, []);

  const hasActiveParticles = useCallback(() => {
    return trail.current.length > 0 || bursts.current.length > 0 || ripples.current.length > 0;
  }, []);

  const render = useCallback(() => {
    if (!enabled && bursts.current.length === 0 && ripples.current.length === 0) {
      return false;
    }

    const canvas = canvasRef.current;
    if (!canvas) return false;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return false;

    const colors = colorsRef.current;
    if (!colors) return hasActiveParticles();

    const dpr = dprRef.current;
    const w = window.innerWidth;
    const h = window.innerHeight;
    const lifeDecay = 0.022;
    let hasMore = false;

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, w, h);

    if (enabled) {
      trail.current = trail.current.filter((p) => {
        p.life -= lifeDecay;
        if (p.life <= 0) return false;

        const t = Math.max(0, p.life / p.maxLife);
        const alpha = t * 0.8;
        const size = Math.max(0.5, p.size * (0.4 + t * 0.6));

        ctx.beginPath();
        ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
        ctx.fillStyle = rgba(colors.trail[p.colorIndex]!, alpha);
        ctx.fill();
        hasMore = true;
        return true;
      });
    } else {
      trail.current = [];
    }

    bursts.current = bursts.current.filter((p) => {
      p.life -= 0.03;
      if (p.life <= 0) return false;

      p.x += p.vx;
      p.y += p.vy;
      p.vx *= 0.92;
      p.vy *= 0.92;

      const t = Math.max(0, p.life / p.maxLife);
      const burstRadius = Math.max(0.5, p.size * t);
      ctx.beginPath();
      ctx.arc(p.x, p.y, burstRadius, 0, Math.PI * 2);
      ctx.fillStyle = rgba(colors.weak, t * 0.9);
      ctx.fill();
      hasMore = true;
      return true;
    });

    ripples.current = ripples.current.filter((r) => {
      r.life -= 0.025;
      if (r.life <= 0) return false;

      const t = Math.max(0, Math.min(1, 1 - r.life / r.maxLife));
      r.radius = Math.max(0, 5 + (r.maxRadius - 5) * t);

      ctx.beginPath();
      ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
      ctx.strokeStyle = rgba(colors.weak, r.life * 0.6);
      ctx.lineWidth = 1.5;
      ctx.stroke();
      hasMore = true;
      return true;
    });

    return hasMore;
  }, [canvasRef, enabled, hasActiveParticles]);

  const reset = useCallback(() => {
    trail.current = [];
    bursts.current = [];
    ripples.current = [];
    lastTrailPos.current = { x: -9999, y: -9999 };

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }, [canvasRef]);

  return { addTrail, addBurst, render, resize, reset, hasActiveParticles };
}
