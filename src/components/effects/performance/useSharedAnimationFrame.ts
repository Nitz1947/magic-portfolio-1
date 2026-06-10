"use client";

import { useEffect } from "react";

type FrameCallback = (deltaMs: number, frame: number) => void;

interface Subscriber {
  callback: FrameCallback;
  priority: number;
}

const subscribers = new Map<symbol, Subscriber>();
let rafId = 0;
let lastTime = 0;
let frameCount = 0;

function tick(now: number) {
  const rawDelta = now - lastTime;
  const deltaMs = Math.min(Math.max(rawDelta, 0), 32);
  lastTime = now;
  frameCount += 1;

  const ordered = [...subscribers.values()].sort((a, b) => a.priority - b.priority);
  for (const { callback } of ordered) {
    callback(deltaMs, frameCount);
  }

  rafId = requestAnimationFrame(tick);
}

function ensureLoop() {
  if (rafId !== 0 || subscribers.size === 0) return;
  lastTime = performance.now();
  rafId = requestAnimationFrame(tick);
}

function stopLoop() {
  if (rafId !== 0) {
    cancelAnimationFrame(rafId);
    rafId = 0;
  }
}

/** Subscribe to a single shared requestAnimationFrame loop. Lower priority runs first. */
export function subscribeAnimationFrame(callback: FrameCallback, priority = 0): () => void {
  const id = Symbol("raf-subscriber");
  subscribers.set(id, { callback, priority });
  ensureLoop();

  return () => {
    subscribers.delete(id);
    if (subscribers.size === 0) {
      stopLoop();
    }
  };
}

/** React hook wrapper for the shared animation frame loop. */
export function useSharedAnimationFrame(callback: FrameCallback, enabled: boolean, priority = 0) {
  useEffect(() => {
    if (!enabled) return;
    return subscribeAnimationFrame(callback, priority);
  }, [callback, enabled, priority]);
}
