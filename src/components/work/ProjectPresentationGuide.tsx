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
import type { ProjectPresentationContent } from "@/data/projectPresentations";
import type { FeaturedProjectConfig } from "@/data/featuredProjects";
import { ProjectLivePreview } from "@/components/ProjectLivePreview";
import styles from "./ProjectPresentationGuide.module.scss";

export type PresentationProject = {
  slug: string;
  title: string;
  href: string;
  config: FeaturedProjectConfig;
  presentation: ProjectPresentationContent;
};

interface ProjectPresentationGuideProps {
  projects: PresentationProject[];
}

function hashForSlug(slug: string) {
  return `project-${slug}`;
}

export function ProjectPresentationGuide({ projects }: ProjectPresentationGuideProps) {
  const { ui, href } = useLocale();
  const [activeIndex, setActiveIndex] = useState(0);

  const resolveIndexFromHash = useCallback(() => {
    const hash = window.location.hash.replace("#", "");
    if (!hash) return 0;
    const index = projects.findIndex((project) => hashForSlug(project.slug) === hash);
    return index >= 0 ? index : 0;
  }, [projects]);

  useEffect(() => {
    setActiveIndex(resolveIndexFromHash());

    const onHashChange = () => setActiveIndex(resolveIndexFromHash());
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, [resolveIndexFromHash]);

  const goTo = useCallback(
    (index: number) => {
      const normalized = (index + projects.length) % projects.length;
      setActiveIndex(normalized);
      const slug = projects[normalized]?.slug;
      if (!slug) return;
      const nextHash = `#${hashForSlug(slug)}`;
      if (window.location.hash !== nextHash) {
        window.history.replaceState(null, "", nextHash);
      }
      document.getElementById(hashForSlug(slug))?.scrollIntoView({ behavior: "smooth", block: "start" });
    },
    [projects],
  );

  const project = projects[activeIndex];
  if (!project) return null;

  const progress = ((activeIndex + 1) / projects.length) * 100;

  return (
    <Column fillWidth gap="24" className={styles.guide}>
      <div className={styles.thumbnails} role="tablist" aria-label={ui.work.presentation.thumbnailsLabel}>
        {projects.map((item, index) => (
          <button
            key={item.slug}
            type="button"
            role="tab"
            aria-selected={index === activeIndex}
            className={`${styles.thumbnail} ${index === activeIndex ? styles.thumbnailActive : ""}`}
            onClick={() => goTo(index)}
          >
            <Text variant="label-default-s" className={styles.thumbnailStep}>
              {ui.work.presentation.step} {index + 1}/{projects.length}
            </Text>
            <Text variant="body-default-s" weight="strong">
              {item.title}
            </Text>
            <Text variant="body-default-xs" onBackground="neutral-weak">
              {item.presentation.tagline}
            </Text>
          </button>
        ))}
      </div>

      <div className={styles.progressBar} aria-hidden="true">
        <div className={styles.progressFill} style={{ width: `${progress}%` }} />
      </div>

      <section
        id={hashForSlug(project.slug)}
        className={styles.stage}
        aria-labelledby={`presentation-title-${project.slug}`}
      >
        <Column fillWidth gap="20">
          <div className={styles.stageHeader}>
            <Column gap="8" style={{ flex: 1 }}>
              <span className={styles.stepBadge}>
                {ui.work.presentation.step} {activeIndex + 1}/{projects.length}
              </span>
              <Heading as="h2" id={`presentation-title-${project.slug}`} variant="heading-strong-xl" wrap="balance">
                {project.title}
              </Heading>
              <Text variant="body-default-m" onBackground="brand-medium" wrap="balance">
                {project.presentation.tagline}
              </Text>
            </Column>
            {projects.length > 1 && (
              <Row gap="8" className={styles.navButtons}>
                <IconButton
                  icon="chevronLeft"
                  variant="secondary"
                  size="m"
                  aria-label={ui.slideshow.prev}
                  onClick={() => goTo(activeIndex - 1)}
                />
                <IconButton
                  icon="chevronRight"
                  variant="secondary"
                  size="m"
                  aria-label={ui.slideshow.next}
                  onClick={() => goTo(activeIndex + 1)}
                />
              </Row>
            )}
          </div>

          <div className={styles.previewWrap}>
            <ProjectLivePreview
              title={project.title}
              liveUrl={project.config.liveUrl}
              embedUrl={project.config.embedUrl}
              canEmbed={project.config.canEmbed}
              fallbackImage={project.config.fallbackImage}
              displayUrl={project.config.displayUrl}
            />
          </div>

          <div className={styles.details}>
            <div className={styles.detailBlock}>
              <Text variant="label-default-s" className={styles.detailLabel}>
                {ui.work.presentation.forWhom}
              </Text>
              <Text variant="body-default-s" onBackground="neutral-weak" wrap="balance">
                {project.presentation.audience}
              </Text>
            </div>
            <div className={styles.detailBlock}>
              <Text variant="label-default-s" className={styles.detailLabel}>
                {ui.work.presentation.delivered}
              </Text>
              <Text variant="body-default-s" onBackground="neutral-weak" wrap="balance">
                {project.presentation.delivered}
              </Text>
            </div>
            <div className={styles.detailBlock}>
              <Text variant="label-default-s" className={styles.detailLabel}>
                {ui.work.presentation.stack}
              </Text>
              <div className={styles.stackTags}>
                {project.presentation.stack.map((item) => (
                  <span key={item} className={styles.stackTag}>
                    {item}
                  </span>
                ))}
              </div>
            </div>
            <div className={styles.detailBlock}>
              <Text variant="label-default-s" className={styles.detailLabel}>
                {ui.work.presentation.features}
              </Text>
              <ul className={styles.featureList}>
                {project.presentation.features.map((feature) => (
                  <li key={feature}>
                    <Text as="span" variant="body-default-s" onBackground="neutral-weak">
                      {feature}
                    </Text>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className={styles.detailBlock}>
            <Text variant="label-default-s" className={styles.detailLabel}>
              {ui.work.presentation.outcome}
            </Text>
            <Text variant="body-default-m" wrap="balance">
              {project.presentation.outcome}
            </Text>
          </div>

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
            <Button href={project.href} variant="secondary" size="s" suffixIcon="arrowRight">
              {ui.work.readCaseStudy}
            </Button>
          </Row>
        </Column>
      </section>

      <div className={styles.navRow}>
        <Text variant="label-default-s" onBackground="neutral-weak">
          {ui.work.presentation.progress
            .replace("{current}", String(activeIndex + 1))
            .replace("{total}", String(projects.length))}
        </Text>
        <Row gap="8" className={styles.navButtons}>
          <Button
            variant="tertiary"
            size="s"
            prefixIcon="chevronLeft"
            onClick={() => goTo(activeIndex - 1)}
            disabled={projects.length <= 1}
          >
            {ui.slideshow.prev}
          </Button>
          <Button
            variant="tertiary"
            size="s"
            suffixIcon="chevronRight"
            onClick={() => goTo(activeIndex + 1)}
            disabled={projects.length <= 1}
          >
            {ui.slideshow.next}
          </Button>
        </Row>
      </div>

      <Row horizontal="center">
        <SmartLink href={href("/quote")} suffixIcon="arrowRight">
          <Text variant="body-default-s">{ui.services.cta}</Text>
        </SmartLink>
      </Row>
    </Column>
  );
}
