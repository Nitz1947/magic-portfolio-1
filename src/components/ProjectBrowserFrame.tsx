import type { ReactNode } from "react";
import { Column, Text } from "@once-ui-system/core";
import styles from "./ProjectBrowserFrame.module.scss";

interface ProjectBrowserFrameProps {
  src?: string;
  alt?: string;
  url?: string;
  children?: ReactNode;
}

export function ProjectBrowserFrame({
  src,
  alt = "",
  url = "app.example.com",
  children,
}: ProjectBrowserFrameProps) {
  return (
    <Column fillWidth className={styles.frame} radius="l" border="neutral-alpha-weak">
      <div className={styles.chrome}>
        <div className={styles.dots}>
          <span className={styles.dot} data-color="red" />
          <span className={styles.dot} data-color="yellow" />
          <span className={styles.dot} data-color="green" />
        </div>
        <Text variant="label-default-xs" onBackground="neutral-weak" className={styles.url}>
          {url}
        </Text>
      </div>
      {children ?? (
        <div className={styles.viewport}>
          {src && (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img src={src} alt={alt} className={styles.screenshot} loading="lazy" />
          )}
        </div>
      )}
    </Column>
  );
}
