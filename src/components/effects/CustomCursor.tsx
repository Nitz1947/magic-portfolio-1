"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useCursorTrail } from "./CursorTrailCanvas";
import { useCursorMode } from "./performance/useCursorMode";
import styles from "./CustomCursor.module.scss";

type CursorState = "default" | "link" | "button" | "card";

const CODE_CHARS = ["{", "}", ";", "<", ">", "/", "(", ")", "="] as const;
const RING_LERP = 0.15;
const DOT_LERP = 0.55;
const CHAR_SPAWN_CHANCE = 0.018;
const CHAR_MIN_DIST = 22;
const MOVE_THROTTLE_MS = 16;
const POSITION_EPSILON = 0.5;
const IDLE_MS = 100;
const SETTLE_EPSILON = 0.35;

interface CodeCharEl {
  el: HTMLSpanElement;
  life: number;
  maxLife: number;
}

function restoreNativeCursor() {
  document.documentElement.classList.remove("cursor-hidden");
  document.documentElement.style.cursor = "";
  document.body.style.cursor = "";
}

function roundPos(v: number): number {
  return Math.round(v * 2) / 2;
}

export function CustomCursor() {
  const pathname = usePathname();
  const cursorMode = useCursorMode();
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const outerRingRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const charsContainerRef = useRef<HTMLDivElement>(null);
  const ripplesContainerRef = useRef<HTMLDivElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);

  const [mounted, setMounted] = useState(false);
  const [state, setState] = useState<CursorState>("default");
  const [label, setLabel] = useState("");

  const isFull = cursorMode === "full";
  const enabled = cursorMode !== "disabled";

  const trailApi = useCursorTrail(canvasRef, { enabled: isFull });
  const trailRef = useRef(trailApi);
  trailRef.current = trailApi;

  const codeCharsRef = useRef<CodeCharEl[]>([]);
  const lastCharPosRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!enabled) return;

    const { addTrail, addBurst, render, resize } = trailRef.current;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let dotX = mouseX;
    let dotY = mouseY;
    let ringX = mouseX;
    let ringY = mouseY;
    let lastRenderedDotX = -9999;
    let lastRenderedDotY = -9999;
    let lastRenderedRingX = -9999;
    let lastRenderedRingY = -9999;
    let pendingMove = false;
    let cursorHiddenApplied = false;
    let lastMoveTime = 0;
    let idleTimer = 0;
    let rafId = 0;
    let loopRunning = false;
    let inViewport = true;
    let tabVisible = !document.hidden;

    const applyCursorHidden = () => {
      if (cursorHiddenApplied) return;
      if (dotRef.current) {
        document.documentElement.classList.add("cursor-hidden");
        cursorHiddenApplied = true;
        setMounted(true);
      }
    };

    const removeCursorHidden = () => {
      restoreNativeCursor();
      cursorHiddenApplied = false;
    };

    const spawnCodeChar = (x: number, y: number) => {
      if (!isFull) return;
      const container = charsContainerRef.current;
      if (!container || codeCharsRef.current.length >= 6) return;

      const el = document.createElement("span");
      el.className = styles.codeChar;
      el.textContent = CODE_CHARS[Math.floor(Math.random() * CODE_CHARS.length)];
      el.style.transform = `translate3d(${x + (Math.random() - 0.5) * 16}px, ${y + (Math.random() - 0.5) * 8}px, 0)`;
      container.appendChild(el);

      codeCharsRef.current.push({
        el,
        life: 1,
        maxLife: 0.7 + Math.random() * 0.3,
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

    const setMovingClass = (active: boolean) => {
      rootRef.current?.classList.toggle(styles.moving, active);
    };

    const showCursor = () => {
      if (!inViewport || !tabVisible) return;
      setRootVisible(true);
    };

    const isSettled = () => {
      return (
        Math.abs(mouseX - dotX) < SETTLE_EPSILON &&
        Math.abs(mouseY - dotY) < SETTLE_EPSILON &&
        Math.abs(mouseX - ringX) < SETTLE_EPSILON &&
        Math.abs(mouseY - ringY) < SETTLE_EPSILON
      );
    };

    const needsAnimation = () => {
      if (!tabVisible || !inViewport) return false;
      if (pendingMove) return true;
      if (!isSettled()) return true;
      if (isFull && codeCharsRef.current.length > 0) return true;
      if (trailRef.current.hasActiveParticles()) return true;
      return false;
    };

    const stopLoop = () => {
      loopRunning = false;
      if (rafId !== 0) {
        cancelAnimationFrame(rafId);
        rafId = 0;
      }
      setMovingClass(false);
    };

    const scheduleIdleStop = () => {
      if (idleTimer !== 0) window.clearTimeout(idleTimer);
      idleTimer = window.setTimeout(() => {
        idleTimer = 0;
        if (!needsAnimation()) stopLoop();
      }, IDLE_MS);
    };

    const tick = () => {
      if (!loopRunning) return;

      dotX += (mouseX - dotX) * DOT_LERP;
      dotY += (mouseY - dotY) * DOT_LERP;
      ringX += (mouseX - ringX) * RING_LERP;
      ringY += (mouseY - ringY) * RING_LERP;

      const rdX = roundPos(dotX);
      const rdY = roundPos(dotY);
      const rrX = roundPos(ringX);
      const rrY = roundPos(ringY);

      if (
        Math.abs(rdX - lastRenderedDotX) >= POSITION_EPSILON ||
        Math.abs(rdY - lastRenderedDotY) >= POSITION_EPSILON
      ) {
        const txDot = `translate3d(${rdX}px, ${rdY}px, 0)`;
        if (dotRef.current) dotRef.current.style.transform = txDot;
        if (labelRef.current) {
          labelRef.current.style.transform = `translate3d(${rdX + 28}px, ${rdY - 10}px, 0)`;
        }
        lastRenderedDotX = rdX;
        lastRenderedDotY = rdY;
      }

      if (
        Math.abs(rrX - lastRenderedRingX) >= POSITION_EPSILON ||
        Math.abs(rrY - lastRenderedRingY) >= POSITION_EPSILON
      ) {
        const txRing = `translate3d(${rrX}px, ${rrY}px, 0)`;
        if (ringRef.current) ringRef.current.style.transform = txRing;
        if (outerRingRef.current) outerRingRef.current.style.transform = txRing;
        if (spotlightRef.current) spotlightRef.current.style.transform = txRing;
        lastRenderedRingX = rrX;
        lastRenderedRingY = rrY;
      }

      if (pendingMove) {
        if (isFull) {
          addTrail(mouseX, mouseY);

          const last = lastCharPosRef.current;
          const cdx = mouseX - last.x;
          const cdy = mouseY - last.y;
          if (cdx * cdx + cdy * cdy > CHAR_MIN_DIST * CHAR_MIN_DIST) {
            if (Math.random() < CHAR_SPAWN_CHANCE) {
              spawnCodeChar(mouseX, mouseY);
              lastCharPosRef.current = { x: mouseX, y: mouseY };
            }
          }
        }
        pendingMove = false;
      }

      if (isFull) {
        codeCharsRef.current = codeCharsRef.current.filter((c) => {
          c.life -= 0.02;
          if (c.life <= 0) {
            c.el.remove();
            return false;
          }
          const t = c.life / c.maxLife;
          c.el.style.opacity = String(t * 0.85);
          return true;
        });
      }

      render();

      if (needsAnimation()) {
        rafId = requestAnimationFrame(tick);
      } else {
        stopLoop();
      }
    };

    const startLoop = () => {
      if (!loopRunning) {
        loopRunning = true;
        setMovingClass(true);
        rafId = requestAnimationFrame(tick);
      }
      scheduleIdleStop();
    };

    const onMove = (e: MouseEvent) => {
      const now = performance.now();
      if (now - lastMoveTime < MOVE_THROTTLE_MS) return;
      lastMoveTime = now;

      mouseX = e.clientX;
      mouseY = e.clientY;
      pendingMove = true;
      showCursor();
      startLoop();
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
      if (isFull) addBurst(e.clientX, e.clientY);
      spawnDomRipple(e.clientX, e.clientY);
      startLoop();
    };

    const onResize = () => {
      resize();
    };

    const onVisibilityChange = () => {
      tabVisible = !document.hidden;
      if (document.hidden) {
        setRootVisible(false);
        stopLoop();
      } else {
        showCursor();
      }
    };

    const onPageShow = () => {
      tabVisible = !document.hidden;
      showCursor();
      resize();
    };

    const onMouseLeave = () => {
      inViewport = false;
      setRootVisible(false);
      stopLoop();
    };

    const onMouseEnter = () => {
      inViewport = true;
      showCursor();
    };

    resize();
    showCursor();
    applyCursorHidden();
    requestAnimationFrame(applyCursorHidden);

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mousedown", onDown);
    window.addEventListener("resize", onResize);
    document.addEventListener("mouseover", onOver, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);
    document.addEventListener("visibilitychange", onVisibilityChange);
    window.addEventListener("pageshow", onPageShow);

    return () => {
      stopLoop();
      if (idleTimer !== 0) window.clearTimeout(idleTimer);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      window.removeEventListener("pageshow", onPageShow);
      removeCursorHidden();
      trailRef.current.reset();
      codeCharsRef.current.forEach((c) => c.el.remove());
      codeCharsRef.current = [];
      setMounted(false);
    };
  }, [enabled, isFull, pathname, cursorMode]);

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
      {isFull && <canvas ref={canvasRef} className={styles.trailCanvas} />}

      {isFull && (
        <div
          ref={spotlightRef}
          className={`${styles.spotlight} ${state === "card" ? styles.spotlightVisible : ""}`}
        />
      )}

      <div ref={outerRingRef} className={styles.outerRing} />
      <div ref={ringRef} className={ringClass} />
      <div ref={dotRef} className={styles.dot} />

      {label && (
        <span ref={labelRef} className={styles.label}>
          {label}
        </span>
      )}

      {isFull && <div ref={charsContainerRef} className={styles.charsLayer} />}
      <div ref={ripplesContainerRef} className={styles.ripplesLayer} />
    </div>
  );
}
