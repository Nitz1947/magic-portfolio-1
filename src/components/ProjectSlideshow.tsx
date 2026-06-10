"use client";

import { useCallback, useEffect, useState } from "react";
import {
  Button,
  Column,
  Heading,
  IconButton,
  Row,
  SmartLink,
  Text,
} from "@once-ui-system/core";
import { useLocale } from "@/context/LocaleContext";
import type { ShowcaseProject } from "./ProjectShowcase";
import { ProjectLivePreview } from "./ProjectLivePreview";
import styles from "./ProjectSlideshow.module.scss";

interface ProjectSlideshowProps {
  projects: ShowcaseProject[];
  autoplayMs?: number;
}

export function ProjectSlideshow({ projects, autoplayMs = 8000 }: ProjectSlideshowProps) {
  const { ui } = useLocale();
  const [activeIndex, setActiveIndex] = useState(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(true);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mq.matches);
    const handler = (event: MediaQueryListEvent) => setPrefersReducedMotion(event.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const goTo = useCallback(
    (index: number) => {
      setActiveIndex((index + projects.length) % projects.length);
    },
    [projects.length],
  );

  const goPrev = useCallback(() => goTo(activeIndex - 1), [activeIndex, goTo]);
  const goNext = useCallback(() => goTo(activeIndex + 1), [activeIndex, goTo]);

  useEffect(() => {
    if (prefersReducedMotion || projects.length <= 1) return;
    const timer = setInterval(goNext, autoplayMs);
    return () => clearInterval(timer);
  }, [activeIndex, autoplayMs, goNext, prefersReducedMotion, projects.length]);

  const project = projects[activeIndex];
  if (!project) return null;

  return (
    <Column fillWidth gap="20" className={styles.slideshow}>
      <div className={styles.viewport}>
        <div key={project.slug} className={styles.slide}>
          <ProjectLivePreview
            title={project.title}
            liveUrl={project.config.liveUrl}
            embedUrl={project.config.embedUrl}
            canEmbed={project.config.canEmbed}
            fallbackImage={project.config.fallbackImage}
            displayUrl={project.config.displayUrl}
          />
        </div>
        {projects.length > 1 && (
          <>
            <IconButton
              className={`${styles.navButton} ${styles.prev}`}
              icon="chevronLeft"
              variant="secondary"
              size="m"
              aria-label={ui.slideshow.prev}
              onClick={goPrev}
            />
            <IconButton
              className={`${styles.navButton} ${styles.next}`}
              icon="chevronRight"
              variant="secondary"
              size="m"
              aria-label={ui.slideshow.next}
              onClick={goNext}
            />
          </>
        )}
      </div>

      <Column gap="8" paddingX="4">
        <Row fillWidth horizontal="between" vertical="center" gap="12">
          <Heading as="h3" variant="heading-strong-l">
            {project.title}
          </Heading>
          {projects.length > 1 && (
            <Row gap="8" className={styles.dots} role="tablist" aria-label={ui.slideshow.label}>
              {projects.map((item, index) => (
                <button
                  key={item.slug}
                  type="button"
                  role="tab"
                  aria-selected={index === activeIndex}
                  aria-label={`${item.title} (${index + 1}/${projects.length})`}
                  className={`${styles.dot} ${index === activeIndex ? styles.dotActive : ""}`}
                  onClick={() => goTo(index)}
                />
              ))}
            </Row>
          )}
        </Row>
        <Text variant="body-default-s" onBackground="neutral-weak">
          {project.summary}
        </Text>
        <Row className={styles.actions}>
          <Button
            href={project.config.liveUrl}
            variant="primary"
            size="s"
            suffixIcon="arrowUpRightFromSquare"
            target="_blank"
            rel="noopener noreferrer"
          >
            {ui.work.openLive}
          </Button>
          <SmartLink href={project.href} suffixIcon="arrowRight">
            <Text variant="body-default-s">{ui.work.readCaseStudy}</Text>
          </SmartLink>
        </Row>
      </Column>
    </Column>
  );
}
