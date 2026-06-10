"use client";

import { Column, Row, Text } from "@once-ui-system/core";
import { useLocale } from "@/context/LocaleContext";
import styles from "./SocialProofStrip.module.scss";

export function SocialProofStrip() {
  const { ui } = useLocale();

  return (
    <Row
      fillWidth
      horizontal="center"
      className={styles.strip}
      role="region"
      aria-label={ui.socialProof.ariaLabel}
    >
      <Row fillWidth maxWidth="m" gap="16" wrap horizontal="center" vertical="center" paddingY="12" paddingX="16">
        {ui.socialProof.items.map((item) => (
          <Column key={item.label} gap="4" horizontal="center" className={styles.item}>
            <Text variant="display-strong-xs" className={styles.value}>
              {item.value}
            </Text>
            <Text variant="label-default-s" onBackground="neutral-weak">
              {item.label}
            </Text>
          </Column>
        ))}
        <span className={styles.divider} aria-hidden="true" />
        <Row gap="8" vertical="center" className={styles.status}>
          <span className={styles.dot} aria-hidden="true" />
          <Text variant="label-default-s" onBackground="brand-medium">
            {ui.socialProof.available}
          </Text>
        </Row>
      </Row>
    </Row>
  );
}
