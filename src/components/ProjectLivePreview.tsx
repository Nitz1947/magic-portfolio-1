"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Button, Column, Text } from "@once-ui-system/core";
import { useLocale } from "@/context/LocaleContext";
import { ProjectBrowserFrame } from "./ProjectBrowserFrame";
import styles from "./ProjectLivePreview.module.scss";

const EMBED_REFERENCE_WIDTH = 1280;

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
  /** Two-column presentation layout — fills parent height on desktop */
  presentationLayout?: boolean;
  /**
   * Scroll the iframe via a portfolio wrapper (dark branded scrollbar) instead of
   * the cross-origin iframe viewport — avoids default white inner scrollbars.
   */
  externalScroll?: boolean;
  /** Scale a fixed-width iframe down to fit the container — prevents horizontal overflow. */
  scaleToFit?: boolean;
  /** Tall iframe viewport height when externalScroll is enabled (px). */
  embedViewportHeight?: number;
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
  presentationLayout = false,
  externalScroll = presentationLayout,
  scaleToFit = false,
  embedViewportHeight = 2400,
}: ProjectLivePreviewProps) {
  const { ui } = useLocale();
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [shouldLoad, setShouldLoad] = useState(!lazy);
  const [isVisible, setIsVisible] = useState(false);
  const [embedBlocked, setEmbedBlocked] = useState(!canEmbed);
  const [isLoading, setIsLoading] = useState(canEmbed);
  const [iframeScale, setIframeScale] = useState(1);
  const loadTimeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const src = embedUrl || liveUrl;
  const useScale = externalScroll && scaleToFit;
  const scaledHeight = embedViewportHeight * iframeScale;

  useEffect(() => {
    if (!canEmbed) return;

    const node = containerRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
        if (lazy && entry.isIntersecting) {
          setShouldLoad(true);
        }
      },
      { rootMargin: "200px", threshold: 0.08 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [lazy, canEmbed]);

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

  useEffect(() => {
    if (!useScale) {
      setIframeScale(1);
      return;
    }

    const node = scrollRef.current;
    if (!node) return;

    const updateScale = () => {
      const width = node.clientWidth;
      if (width <= 0) return;
      setIframeScale(Math.min(1, width / EMBED_REFERENCE_WIDTH));
    };

    updateScale();
    const observer = new ResizeObserver(updateScale);
    observer.observe(node);
    window.addEventListener("resize", updateScale);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updateScale);
    };
  }, [useScale, shouldLoad]);

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

  const iframeClassName = [
    styles.iframe,
    externalScroll ? styles.iframeExternal : undefined,
    useScale ? styles.iframeScaled : undefined,
    isVisible ? styles.iframeActive : styles.iframePaused,
  ]
    .filter(Boolean)
    .join(" ");

  const iframeElement = (
    <iframe
      className={iframeClassName}
      src={src}
      title={`${title} — ${ui.work.preview}`}
      sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
      loading="lazy"
      scrolling="no"
      onLoad={handleIframeLoad}
      onError={handleIframeError}
    />
  );

  const previewContent = (
    <div className={viewportClass}>
      {showIframe ? (
        <>
          {isLoading && <div className={styles.loading}>{ui.work.previewLoading}</div>}
          {externalScroll ? (
            <div
              ref={scrollRef}
              className={styles.previewScroll}
              style={
                {
                  "--embed-viewport-height": `${embedViewportHeight}px`,
                  "--iframe-scale": iframeScale,
                  "--scaled-height": `${scaledHeight}px`,
                } as React.CSSProperties
              }
            >
              {useScale ? (
                <div className={styles.iframeScaleOuter} style={{ height: `${scaledHeight}px` }}>
                  <div
                    className={styles.iframeScaleInner}
                    style={{
                      width: EMBED_REFERENCE_WIDTH,
                      height: embedViewportHeight,
                      transform: `scale(${iframeScale})`,
                    }}
                  >
                    {iframeElement}
                  </div>
                </div>
              ) : (
                iframeElement
              )}
            </div>
          ) : (
            <iframe
              className={`${styles.iframe} ${isVisible ? styles.iframeActive : styles.iframePaused}`}
              src={src}
              title={`${title} — ${ui.work.preview}`}
              sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
              loading="lazy"
              onLoad={handleIframeLoad}
              onError={handleIframeError}
            />
          )}
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

  const rootClassName = [
    fullBleed ? styles.fullBleedRoot : undefined,
    presentationLayout ? styles.presentationContext : undefined,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <Column ref={containerRef} fillWidth className={rootClassName || undefined}>
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
