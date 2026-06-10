"use client";

import { useCallback, useEffect, useState } from "react";
import { Button, Column, Row, Text } from "@once-ui-system/core";
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
    <Column fillWidth gap="24" horizontal="center" align="center" className={styles.guide}>
      <div className={styles.thumbnails} role="tablist" aria-label={ui.work.presentation.thumbnailsLabel}>
        {projects.map((item, index) => (
          <button
            key={item.slug}
            type="button"
            role="tab"
            aria-selected={index === activeIndex}
            aria-controls={hashForSlug(item.slug)}
            className={`${styles.thumbnail} ${index === activeIndex ? styles.thumbnailActive : ""}`}
            onClick={() => goTo(index)}
          >
            <span className={styles.thumbnailStep}>
              {ui.work.presentation.step} {index + 1}/{projects.length}
            </span>
            <span className={styles.thumbnailTitle}>{item.title}</span>
            <span className={styles.thumbnailTagline}>{item.presentation.tagline}</span>
          </button>
        ))}
      </div>

      <div className={styles.progressWrap} aria-hidden={projects.length <= 1}>
        <div className={styles.progressBar}>
          <div className={styles.progressFill} style={{ width: `${progress}%` }} />
        </div>
        {projects.length > 1 && (
          <div className={styles.progressSteps}>
            {projects.map((item, index) => (
              <button
                key={item.slug}
                type="button"
                className={`${styles.progressStep} ${index === activeIndex ? styles.progressStepActive : ""} ${index < activeIndex ? styles.progressStepDone : ""}`}
                onClick={() => goTo(index)}
                aria-label={`${ui.work.presentation.step} ${index + 1}: ${item.title}`}
              >
                <span className={styles.progressDot} />
                <span className={styles.progressStepLabel}>{index + 1}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      <section
        id={hashForSlug(project.slug)}
        className={styles.stage}
        aria-labelledby={`presentation-title-${project.slug}`}
        role="tabpanel"
      >
        <h2 id={`presentation-title-${project.slug}`} className={styles.srOnly}>
          {project.title} — {project.presentation.tagline}
        </h2>

        <Column fillWidth gap="20" horizontal="center" align="center">
          <div className={styles.contentRow}>
            <div className={styles.previewCell}>
              <ProjectLivePreview
                title={project.title}
                liveUrl={project.config.liveUrl}
                embedUrl={project.config.embedUrl}
                canEmbed={project.config.canEmbed}
                fallbackImage={project.config.fallbackImage}
                displayUrl={project.config.displayUrl}
                fullBleed
                presentationLayout
                externalScroll
              />
            </div>

            <div className={styles.infoCell}>
              <div className={styles.infoScroll}>
                <div className={styles.details}>
                  <div className={styles.detailBlock}>
                    <Text variant="label-default-s" className={styles.detailLabel}>
                      {ui.work.presentation.forWhom}
                    </Text>
                    <Text variant="body-default-m" className={styles.detailText} onBackground="neutral-weak" wrap="balance">
                      {project.presentation.audience}
                    </Text>
                  </div>
                  <div className={styles.detailBlock}>
                    <Text variant="label-default-s" className={styles.detailLabel}>
                      {ui.work.presentation.delivered}
                    </Text>
                    <Text variant="body-default-m" className={styles.detailText} onBackground="neutral-weak" wrap="balance">
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
                          <Text as="span" variant="body-default-m" className={styles.detailText} onBackground="neutral-weak">
                            {feature}
                          </Text>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className={styles.outcomeBlock}>
                  <Text variant="label-default-s" className={styles.detailLabel}>
                    {ui.work.presentation.outcome}
                  </Text>
                  <Text variant="body-default-m" onBackground="neutral-strong" wrap="balance">
                    {project.presentation.outcome}
                  </Text>
                </div>
              </div>
            </div>
          </div>

          <Row className={styles.actions} horizontal="center">
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
            <Button href={href("/quote")} variant="tertiary" size="s" suffixIcon="document">
              {ui.services.cta}
            </Button>
          </Row>
        </Column>
      </section>

      <div className={styles.navRow}>
        <Text variant="label-default-s" className={styles.navProgress}>
          {ui.work.presentation.progress
            .replace("{current}", String(activeIndex + 1))
            .replace("{total}", String(projects.length))}
        </Text>
        <Row gap="12" className={styles.navButtons}>
          <button
            type="button"
            className={styles.navArrow}
            onClick={() => goTo(activeIndex - 1)}
            disabled={projects.length <= 1}
            aria-label={ui.slideshow.prev}
          >
            <span className={styles.navArrowIcon} aria-hidden="true">
              ‹
            </span>
            <span>{ui.slideshow.prev}</span>
          </button>
          <button
            type="button"
            className={`${styles.navArrow} ${styles.navArrowPrimary}`}
            onClick={() => goTo(activeIndex + 1)}
            disabled={projects.length <= 1}
            aria-label={ui.slideshow.next}
          >
            <span>{ui.slideshow.next}</span>
            <span className={styles.navArrowIcon} aria-hidden="true">
              ›
            </span>
          </button>
        </Row>
      </div>
    </Column>
  );
}
