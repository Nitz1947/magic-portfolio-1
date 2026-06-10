"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Button, Column, Text } from "@once-ui-system/core";
import { useLocale } from "@/context/LocaleContext";
import { ProjectBrowserFrame } from "./ProjectBrowserFrame";
import styles from "./ProjectLivePreview.module.scss";

interface ProjectLivePreviewProps {
  title: string;
  liveUrl: string;
  embedUrl?: string;
  canEmbed?: boolean;
  fallbackImage: string;
  displayUrl: string;
  lazy?: boolean;
  /** Full-bleed preview without browser chrome — for work presentation cell */
  fullBleed?: boolean;
}

export function ProjectLivePreview({
  title,
  liveUrl,
  embedUrl,
  canEmbed = true,
  fallbackImage,
  displayUrl,
  lazy = true,
  fullBleed = false,
}: ProjectLivePreviewProps) {
  const { ui } = useLocale();
  const containerRef = useRef<HTMLDivElement>(null);
  const [shouldLoad, setShouldLoad] = useState(!lazy);
  const [embedBlocked, setEmbedBlocked] = useState(!canEmbed);
  const [isLoading, setIsLoading] = useState(canEmbed);
  const loadTimeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const src = embedUrl || liveUrl;

  useEffect(() => {
    if (!lazy || shouldLoad || !canEmbed) return;

    const node = containerRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [lazy, shouldLoad, canEmbed]);

  useEffect(() => {
    if (!shouldLoad || !canEmbed || embedBlocked) return;

    loadTimeoutRef.current = setTimeout(() => {
      setEmbedBlocked(true);
      setIsLoading(false);
    }, 8000);

    return () => {
      if (loadTimeoutRef.current) clearTimeout(loadTimeoutRef.current);
    };
  }, [shouldLoad, canEmbed, embedBlocked]);

  const handleIframeLoad = useCallback(() => {
    if (loadTimeoutRef.current) clearTimeout(loadTimeoutRef.current);
    setIsLoading(false);
  }, []);

  const handleIframeError = useCallback(() => {
    if (loadTimeoutRef.current) clearTimeout(loadTimeoutRef.current);
    setEmbedBlocked(true);
    setIsLoading(false);
  }, []);

  const showIframe = canEmbed && shouldLoad && !embedBlocked;

  const viewportClass = fullBleed ? `${styles.viewport} ${styles.viewportFullBleed}` : styles.viewport;

  const previewContent = (
    <div className={viewportClass}>
      {showIframe ? (
        <>
          {isLoading && <div className={styles.loading}>{ui.work.previewLoading}</div>}
          <iframe
            className={styles.iframe}
            src={src}
            title={`${title} — ${ui.work.preview}`}
            sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
            loading="lazy"
            onLoad={handleIframeLoad}
            onError={handleIframeError}
          />
        </>
      ) : (
        <div className={styles.fallback}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={fallbackImage} alt={title} className={styles.fallbackImage} loading="lazy" />
          <div className={styles.overlay}>
            <Text variant="body-default-s" onBackground="neutral-strong">
              {embedBlocked ? ui.work.previewBlocked : ui.work.previewPlaceholder}
            </Text>
            <Button
              href={liveUrl}
              variant="primary"
              size="s"
              suffixIcon="arrowUpRightFromSquare"
              target="_blank"
              rel="noopener noreferrer"
            >
              {ui.work.openLive}
            </Button>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <Column ref={containerRef} fillWidth className={fullBleed ? styles.fullBleedRoot : undefined}>
      {fullBleed ? (
        <div className={styles.fullBleedFrame}>
          <div className={styles.fullBleedChrome}>
            <Text variant="label-default-xs" onBackground="neutral-weak" className={styles.fullBleedUrl}>
              {displayUrl}
            </Text>
          </div>
          {previewContent}
        </div>
      ) : (
        <ProjectBrowserFrame url={displayUrl}>{previewContent}</ProjectBrowserFrame>
      )}
    </Column>
  );
}
