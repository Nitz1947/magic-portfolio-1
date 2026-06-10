"use client";

import { useEffect, useRef, useState } from "react";
import { SmartLink, Text } from "@once-ui-system/core";
import type { ShowcaseProject } from "./ProjectShowcase";
import styles from "./PortfolioWall.module.scss";

interface PortfolioWallProps {
  projects: ShowcaseProject[];
}

type WallCard = {
  key: string;
  project: ShowcaseProject;
};

const COLUMN_ROTATIONS = [-4, 3, -2, 5];
const COLUMN_SPEEDS = [28, -36, 22, -30];

function buildColumns(projects: ShowcaseProject[]): WallCard[][] {
  return projects.slice(0, 3).map((project) => [
    {
      key: project.slug,
      project,
    },
  ]);
}

export function PortfolioWall({ projects }: PortfolioWallProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [offsets, setOffsets] = useState<number[]>(() =>
    Array.from({ length: 4 }, () => 0),
  );
  const [reducedMotion, setReducedMotion] = useState(true);
  const columns = buildColumns(projects);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handler = (event: MediaQueryListEvent) => setReducedMotion(event.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    if (reducedMotion || columns.length === 0) return;

    const section = sectionRef.current;
    if (!section) return;

    let raf = 0;
    let visible = false;

    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible) tick();
      },
      { rootMargin: "120px 0px" },
    );

    observer.observe(section);

    const tick = () => {
      if (!visible || !sectionRef.current) {
        raf = 0;
        return;
      }

      const rect = sectionRef.current.getBoundingClientRect();
      const progress =
        (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
      const centered = progress - 0.5;

      setOffsets(
        COLUMN_SPEEDS.slice(0, columns.length).map((speed) => centered * speed),
      );

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [reducedMotion, columns.length]);

  if (projects.length === 0) return null;

  return (
    <section
      ref={sectionRef}
      className={`${styles.section} ${reducedMotion ? styles.static : ""}`}
      aria-label="Portfolio preview wall"
    >
      <div className={styles.columns}>
        {columns.map((column, columnIndex) => (
          <div
            key={`column-${columnIndex}`}
            className={styles.column}
            style={
              reducedMotion
                ? { transform: `rotate(${COLUMN_ROTATIONS[columnIndex % COLUMN_ROTATIONS.length]}deg)` }
                : {
                    transform: `rotate(${COLUMN_ROTATIONS[columnIndex % COLUMN_ROTATIONS.length]}deg) translateY(${offsets[columnIndex] ?? 0}px)`,
                  }
            }
          >
            {column.map((card) => (
              <SmartLink
                key={card.key}
                href={card.project.href}
                className={styles.card}
              >
                <div className={styles.thumbnail}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={card.project.config.fallbackImage}
                    alt={card.project.title}
                    loading="lazy"
                    className={styles.image}
                  />
                  <div className={styles.overlay}>
                    <Text variant="label-default-s" onBackground="neutral-strong">
                      {card.project.title}
                    </Text>
                  </div>
                </div>
              </SmartLink>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
