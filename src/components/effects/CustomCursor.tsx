"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./CustomCursor.module.scss";

type CursorState = "default" | "link" | "card";

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [state, setState] = useState<CursorState>("default");
  const [label, setLabel] = useState("");

  useEffect(() => {
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (coarse || reduced) return;

    setEnabled(true);
    document.documentElement.classList.add("cursor-hidden");

    let mouseX = 0;
    let mouseY = 0;
    let dotX = 0;
    let dotY = 0;
    let ringX = 0;
    let ringY = 0;
    let animationId = 0;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactive = target.closest("a, button, [role='button'], input, textarea, select, label");
      const card = target.closest("[data-cursor='card']");

      if (interactive) {
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

    const animate = () => {
      dotX += (mouseX - dotX) * 0.55;
      dotY += (mouseY - dotY) * 0.55;
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${dotX}px, ${dotY}px)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringX}px, ${ringY}px)`;
      }

      animationId = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onOver);
    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.documentElement.classList.remove("cursor-hidden");
    };
  }, []);

  if (!enabled) return null;

  return (
    <div className={styles.root} aria-hidden="true">
      <div
        ref={ringRef}
        className={`${styles.ring} ${state === "link" ? styles.ringLink : ""} ${state === "card" ? styles.ringCard : ""}`}
      />
      <div ref={dotRef} className={styles.dot} />
      {label && (
        <span ref={labelRef} className={styles.label}>
          {label}
        </span>
      )}
    </div>
  );
}
