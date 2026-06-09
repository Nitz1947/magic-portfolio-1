"use client";

import { useState } from "react";
import {
  AvatarGroup,
  Button,
  Carousel,
  Column,
  Dialog,
  Flex,
  Heading,
  SmartLink,
  Text,
} from "@once-ui-system/core";
import { useLocale } from "@/context/LocaleContext";
import { getFeaturedConfig } from "@/data/featuredProjects";
import { ProjectLivePreview } from "./ProjectLivePreview";
import styles from "./ProjectCard.module.scss";

interface ProjectCardProps {
  href: string;
  slug: string;
  priority?: boolean;
  images: string[];
  title: string;
  content: string;
  description: string;
  avatars: { src: string }[];
  link: string;
}

function isSvg(path: string) {
  return path.endsWith(".svg");
}

function ProjectImage({ src, alt, priority }: { src: string; alt: string; priority?: boolean }) {
  if (isSvg(src)) {
    return (
      /* eslint-disable-next-line @next/next/no-img-element */
      <img
        src={src}
        alt={alt}
        className={styles.image}
        loading={priority ? "eager" : "lazy"}
      />
    );
  }

  return (
    <Carousel
      sizes="(max-width: 960px) 100vw, 960px"
      priority={priority}
      aspectRatio="16/9"
      items={[{ slide: src, alt }]}
    />
  );
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  href,
  slug,
  images = [],
  title,
  content,
  description,
  avatars,
  link,
  priority,
}) => {
  const { ui } = useLocale();
  const [previewOpen, setPreviewOpen] = useState(false);
  const featured = getFeaturedConfig(slug);
  const hasLivePreview = Boolean(featured && link);

  const carouselItems = images.map((image) => ({
    slide: isSvg(image) ? (
      /* eslint-disable-next-line @next/next/no-img-element */
      <img src={image} alt={title} className={styles.image} loading="lazy" />
    ) : (
      image
    ),
    alt: title,
  }));

  return (
    <Column fillWidth gap="m" className={styles.card}>
      <div className={styles.mediaWrap}>
        {images.length > 1 ? (
          <Carousel
            sizes="(max-width: 960px) 100vw, 960px"
            priority={priority}
            aspectRatio="16/9"
            items={carouselItems}
          />
        ) : images.length === 1 ? (
          <ProjectImage src={images[0]} alt={title} priority={priority} />
        ) : null}

        {hasLivePreview && (
          <div className={styles.overlay}>
            <Button variant="primary" size="s" onClick={() => setPreviewOpen(true)}>
              {ui.work.preview}
            </Button>
            <Button
              href={link}
              variant="secondary"
              size="s"
              suffixIcon="arrowUpRightFromSquare"
              target="_blank"
              rel="noopener noreferrer"
            >
              {ui.work.openLive}
            </Button>
          </div>
        )}
      </div>

      <Flex
        s={{ direction: "column" }}
        fillWidth
        paddingX="s"
        paddingTop="12"
        paddingBottom="24"
        gap="l"
      >
        {title && (
          <Flex flex={5}>
            <Heading as="h2" wrap="balance" variant="heading-strong-xl">
              {title}
            </Heading>
          </Flex>
        )}
        {(avatars?.length > 0 || description?.trim() || content?.trim()) && (
          <Column flex={7} gap="16">
            {avatars?.length > 0 && <AvatarGroup avatars={avatars} size="m" reverse />}
            {description?.trim() && (
              <Text wrap="balance" variant="body-default-s" onBackground="neutral-weak">
                {description}
              </Text>
            )}
            <Flex gap="24" wrap>
              {content?.trim() && (
                <SmartLink
                  suffixIcon="arrowRight"
                  style={{ margin: "0", width: "fit-content" }}
                  href={href}
                >
                  <Text variant="body-default-s">{ui.work.readCaseStudy}</Text>
                </SmartLink>
              )}
              {link && (
                <SmartLink
                  suffixIcon="arrowUpRightFromSquare"
                  style={{ margin: "0", width: "fit-content" }}
                  href={link}
                >
                  <Text variant="body-default-s">{ui.work.viewProject}</Text>
                </SmartLink>
              )}
            </Flex>
          </Column>
        )}
      </Flex>

      {hasLivePreview && featured && (
        <Dialog
          isOpen={previewOpen}
          onClose={() => setPreviewOpen(false)}
          title={title}
          description={description}
          stack
          footer={
            <Flex gap="12" horizontal="end" fillWidth>
              <Button
                href={link}
                variant="primary"
                size="s"
                suffixIcon="arrowUpRightFromSquare"
                target="_blank"
                rel="noopener noreferrer"
              >
                {ui.work.openLive}
              </Button>
              <Button variant="secondary" size="s" onClick={() => setPreviewOpen(false)}>
                {ui.work.closePreview}
              </Button>
            </Flex>
          }
        >
          <ProjectLivePreview
            title={title}
            liveUrl={featured.liveUrl}
            embedUrl={featured.embedUrl}
            canEmbed={featured.canEmbed}
            fallbackImage={featured.fallbackImage}
            displayUrl={featured.displayUrl}
            lazy={false}
          />
        </Dialog>
      )}
    </Column>
  );
};
