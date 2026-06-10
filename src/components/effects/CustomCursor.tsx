"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useCursorTrail } from "./CursorTrailCanvas";
import { useReducedEffects } from "./performance";
import { subscribeAnimationFrame } from "./performance/useSharedAnimationFrame";
import styles from "./CustomCursor.module.scss";

type CursorState = "default" | "link" | "button" | "card";

const CODE_CHARS = ["{", "}", ";", "<", ">", "/", "(", ")", "="] as const;
const RING_LERP = 0.15;
const DOT_LERP = 0.55;
const CHAR_SPAWN_CHANCE = 0.022;
const CHAR_MIN_DIST = 18;

interface CodeCharEl {
  el: HTMLSpanElement;
  life: number;
  maxLife: number;
  vy: number;
}

function restoreNativeCursor() {
  document.documentElement.classList.remove("cursor-hidden");
  document.documentElement.style.cursor = "";
  document.body.style.cursor = "";
}

export function CustomCursor() {
  const pathname = usePathname();
  const reducedEffects = useReducedEffects();
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const outerRingRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const crosshairRef = useRef<SVGSVGElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const charsContainerRef = useRef<HTMLDivElement>(null);
  const ripplesContainerRef = useRef<HTMLDivElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);

  const [enabled, setEnabled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const inViewportRef = useRef(false);
  const [state, setState] = useState<CursorState>("default");
  const [label, setLabel] = useState("");

  const trailApi = useCursorTrail(canvasRef, { reducedEffects });
  const trailRef = useRef(trailApi);
  trailRef.current = trailApi;

  const codeCharsRef = useRef<CodeCharEl[]>([]);
  const lastCharPosRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (coarse || reduced) {
      setEnabled(false);
      return;
    }

    setEnabled(true);
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const { addTrail, addBurst, render, resize } = trailRef.current;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let dotX = mouseX;
    let dotY = mouseY;
    let ringX = mouseX;
    let ringY = mouseY;
    let pendingMove = true;
    let cursorHiddenApplied = false;
    let lastMoveTime = 0;
    let rafFrame = 0;

    const applyCursorHidden = () => {
      if (cursorHiddenApplied) return;
      if (dotRef.current && canvasRef.current) {
        document.documentElement.classList.add("cursor-hidden");
        cursorHiddenApplied = true;
        setMounted(true);
      }
    };

    const removeCursorHidden = () => {
      restoreNativeCursor();
      cursorHiddenApplied = false;
    };

    const crossLines = crosshairRef.current
      ? {
          top: crosshairRef.current.querySelector("[data-line='top']") as SVGLineElement,
          bottom: crosshairRef.current.querySelector("[data-line='bottom']") as SVGLineElement,
          left: crosshairRef.current.querySelector("[data-line='left']") as SVGLineElement,
          right: crosshairRef.current.querySelector("[data-line='right']") as SVGLineElement,
        }
      : null;

    const spawnCodeChar = (x: number, y: number) => {
      const container = charsContainerRef.current;
      if (!container) return;

      const el = document.createElement("span");
      el.className = styles.codeChar;
      el.textContent = CODE_CHARS[Math.floor(Math.random() * CODE_CHARS.length)];
      el.style.left = `${x + (Math.random() - 0.5) * 20}px`;
      el.style.top = `${y + (Math.random() - 0.5) * 10}px`;
      container.appendChild(el);

      codeCharsRef.current.push({
        el,
        life: 1,
        maxLife: 0.8 + Math.random() * 0.4,
        vy: -0.6 - Math.random() * 0.8,
      });
    };

    const spawnDomRipple = (x: number, y: number) => {
      const container = ripplesContainerRef.current;
      if (!container) return;

      const ripple = document.createElement("div");
      ripple.className = styles.clickRipple;
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;
      container.appendChild(ripple);

      ripple.addEventListener(
        "animationend",
        () => {
          ripple.remove();
        },
        { once: true },
      );
    };

    const setRootVisible = (visible: boolean) => {
      const root = rootRef.current;
      if (!root) return;
      root.style.opacity = visible ? "1" : "0";
      root.style.visibility = visible ? "visible" : "hidden";
    };

    const showCursor = () => {
      inViewportRef.current = true;
      setRootVisible(true);
    };

    const onMove = (e: MouseEvent) => {
      const now = performance.now();
      if (now - lastMoveTime < 8) return;
      lastMoveTime = now;
      mouseX = e.clientX;
      mouseY = e.clientY;
      pendingMove = true;
      showCursor();
    };

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const button = target.closest("button, input[type='submit'], input[type='button']");
      const link = target.closest("a, [role='link']");
      const card = target.closest("[data-cursor='card']");

      if (button) {
        setState("button");
        setLabel("");
      } else if (link) {
        setState("link");
        setLabel("");
      } else if (card) {
        setState("card");
        setLabel(card.getAttribute("data-cursor-label") || "");
      } else {
        setState("default");
        setLabel("");
      }
    };

    const onDown = (e: MouseEvent) => {
      addBurst(e.clientX, e.clientY);
      spawnDomRipple(e.clientX, e.clientY);
    };

    const onResize = () => {
      resize();
    };

    const onVisibilityChange = () => {
      if (document.hidden) {
        setRootVisible(false);
      } else {
        showCursor();
      }
    };

    const onPageShow = () => {
      showCursor();
      resize();
    };

    const updateCrosshair = () => {
      if (!crossLines) return;
      const w = window.innerWidth;
      const h = window.innerHeight;
      crossLines.top.setAttribute("x1", String(dotX));
      crossLines.top.setAttribute("y1", "0");
      crossLines.top.setAttribute("x2", String(dotX));
      crossLines.top.setAttribute("y2", String(dotY));
      crossLines.bottom.setAttribute("x1", String(dotX));
      crossLines.bottom.setAttribute("y1", String(dotY));
      crossLines.bottom.setAttribute("x2", String(dotX));
      crossLines.bottom.setAttribute("y2", String(h));
      crossLines.left.setAttribute("x1", "0");
      crossLines.left.setAttribute("y1", String(dotY));
      crossLines.left.setAttribute("x2", String(dotX));
      crossLines.left.setAttribute("y2", String(dotY));
      crossLines.right.setAttribute("x1", String(dotX));
      crossLines.right.setAttribute("y1", String(dotY));
      crossLines.right.setAttribute("x2", String(w));
      crossLines.right.setAttribute("y2", String(dotY));
    };

    const animate = () => {
      rafFrame += 1;

      dotX += (mouseX - dotX) * DOT_LERP;
      dotY += (mouseY - dotY) * DOT_LERP;
      ringX += (mouseX - ringX) * RING_LERP;
      ringY += (mouseY - ringY) * RING_LERP;

      const txDot = `translate3d(${dotX}px, ${dotY}px, 0)`;
      const txRing = `translate3d(${ringX}px, ${ringY}px, 0)`;

      if (dotRef.current) {
        dotRef.current.style.transform = txDot;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = txRing;
      }
      if (outerRingRef.current) {
        outerRingRef.current.style.transform = txRing;
      }
      if (spotlightRef.current) {
        spotlightRef.current.style.transform = txRing;
      }
      if (labelRef.current) {
        labelRef.current.style.transform = `translate3d(${dotX + 28}px, ${dotY - 10}px, 0)`;
      }

      if (!reducedEffects || rafFrame % 2 === 0) {
        updateCrosshair();
      }

      if (pendingMove) {
        addTrail(mouseX, mouseY);
        pendingMove = false;

        const last = lastCharPosRef.current;
        const cdx = mouseX - last.x;
        const cdy = mouseY - last.y;
        if (Math.sqrt(cdx * cdx + cdy * cdy) > CHAR_MIN_DIST) {
          if (Math.random() < (reducedEffects ? CHAR_SPAWN_CHANCE * 0.5 : CHAR_SPAWN_CHANCE)) {
            spawnCodeChar(mouseX, mouseY);
            lastCharPosRef.current = { x: mouseX, y: mouseY };
          }
        }
      }

      const charDecay = reducedEffects ? 0.02 : 0.016;
      codeCharsRef.current = codeCharsRef.current.filter((c) => {
        c.life -= charDecay;
        if (c.life <= 0) {
          c.el.remove();
          return false;
        }
        const t = c.life / c.maxLife;
        const yOffset = (1 - t) * -30;
        c.el.style.opacity = String(t * 0.9);
        c.el.style.transform = `translate3d(0, ${yOffset}px, 0)`;
        return true;
      });

      render();
    };

    resize();
    showCursor();
    applyCursorHidden();
    requestAnimationFrame(applyCursorHidden);

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mousedown", onDown);
    window.addEventListener("resize", onResize);
    document.addEventListener("mouseover", onOver);
    document.addEventListener("visibilitychange", onVisibilityChange);
    window.addEventListener("pageshow", onPageShow);

    const unsubscribeRaf = subscribeAnimationFrame(animate, 2);

    return () => {
      unsubscribeRaf();
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      window.removeEventListener("pageshow", onPageShow);
      removeCursorHidden();
      trailRef.current.reset();
      codeCharsRef.current.forEach((c) => c.el.remove());
      codeCharsRef.current = [];
      setMounted(false);
    };
  }, [enabled, pathname, reducedEffects]);

  useEffect(() => {
    return () => {
      restoreNativeCursor();
    };
  }, []);

  if (!enabled) return null;

  const ringClass = [
    styles.ring,
    state === "link" ? styles.ringLink : "",
    state === "button" ? styles.ringButton : "",
    state === "card" ? styles.ringCard : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      ref={rootRef}
      className={`${styles.root} ${mounted ? styles.ready : ""}`}
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className={styles.trailCanvas} />

      <svg ref={crosshairRef} className={styles.crosshair}>
        <line data-line="top" />
        <line data-line="bottom" />
        <line data-line="left" />
        <line data-line="right" />
      </svg>

      <div
        ref={spotlightRef}
        className={`${styles.spotlight} ${state === "card" ? styles.spotlightVisible : ""}`}
      />

      <div ref={outerRingRef} className={styles.outerRing} />
      <div ref={ringRef} className={ringClass} />
      <div ref={dotRef} className={styles.dot} />

      {label && (
        <span ref={labelRef} className={styles.label}>
          {label}
        </span>
      )}

      <div ref={charsContainerRef} className={styles.charsLayer} />
      <div ref={ripplesContainerRef} className={styles.ripplesLayer} />
    </div>
  );
}
