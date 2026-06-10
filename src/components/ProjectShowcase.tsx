"use client";

import { useState } from "react";
import {
  Button,
  Column,
  Dialog,
  Heading,
  Row,
  SmartLink,
  Text,
} from "@once-ui-system/core";
import { useLocale } from "@/context/LocaleContext";
import type { FeaturedProjectConfig } from "@/data/featuredProjects";
import { ProjectLivePreview } from "./ProjectLivePreview";
import styles from "./ProjectShowcase.module.scss";

export type ShowcaseProject = {
  slug: string;
  title: string;
  summary: string;
  tagline?: string;
  stack?: string[];
  presentationHref?: string;
  href: string;
  config: FeaturedProjectConfig;
};

interface ProjectShowcaseProps {
  projects: ShowcaseProject[];
}

export function ProjectShowcase({ projects }: ProjectShowcaseProps) {
  const { ui } = useLocale();
  const [previewProject, setPreviewProject] = useState<ShowcaseProject | null>(null);

  return (
    <>
      <div className={styles.grid}>
        {projects.map((project) => (
          <Column key={project.slug} className={styles.card}>
            <ProjectLivePreview
              title={project.title}
              liveUrl={project.config.liveUrl}
              embedUrl={project.config.embedUrl}
              canEmbed={project.config.canEmbed}
              fallbackImage={project.config.fallbackImage}
              displayUrl={project.config.displayUrl}
            />
            <Column gap="8" paddingX="4">
              <Heading as="h3" variant="heading-strong-l">
                {project.title}
              </Heading>
              <Text variant="body-default-s" onBackground="neutral-weak">
                {project.summary}
              </Text>
              <Row className={styles.actions}>
                <Button
                  variant="primary"
                  size="s"
                  onClick={() => setPreviewProject(project)}
                >
                  {ui.work.preview}
                </Button>
                <Button
                  href={project.config.liveUrl}
                  variant="secondary"
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
        ))}
      </div>

      {previewProject && (
        <Dialog
          isOpen={!!previewProject}
          onClose={() => setPreviewProject(null)}
          title={previewProject.title}
          description={previewProject.summary}
          stack
          footer={
            <Row gap="12" horizontal="end" fillWidth>
              <Button
                href={previewProject.config.liveUrl}
                variant="primary"
                size="s"
                suffixIcon="arrowUpRightFromSquare"
                target="_blank"
                rel="noopener noreferrer"
              >
                {ui.work.openLive}
              </Button>
              <Button variant="secondary" size="s" onClick={() => setPreviewProject(null)}>
                {ui.work.closePreview}
              </Button>
            </Row>
          }
        >
          <ProjectLivePreview
            title={previewProject.title}
            liveUrl={previewProject.config.liveUrl}
            embedUrl={previewProject.config.embedUrl}
            canEmbed={previewProject.config.canEmbed}
            fallbackImage={previewProject.config.fallbackImage}
            displayUrl={previewProject.config.displayUrl}
            lazy={false}
          />
        </Dialog>
      )}
    </>
  );
}
