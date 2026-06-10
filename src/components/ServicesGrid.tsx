"use client";

import { Button, Column, Heading, Icon, RevealFx, Row, Text } from "@once-ui-system/core";
import { useLocale } from "@/context/LocaleContext";
import { SectionBackground } from "@/components/effects";
import styles from "./ServicesGrid.module.scss";

export function ServicesGrid() {
  const { ui } = useLocale();
  const { services } = ui;

  return (
    <SectionBackground variant="grid">
      <Column fillWidth gap="24" id="services">
      <Column fillWidth gap="8">
        <Heading as="h2" variant="display-strong-xs" wrap="balance">
          {services.title}
        </Heading>
        <Text variant="body-default-m" onBackground="neutral-weak" wrap="balance">
          {services.subline}
        </Text>
      </Column>

      <div className={styles.grid}>
        {services.items.map((item, index) => (
          <RevealFx key={item.id} translateY="12" delay={0.05 * index} fillWidth>
            <Column gap="16" className={styles.card} fillHeight>
              <div className={styles.iconWrap}>
                <Icon name={item.icon} size="m" onBackground="brand-strong" />
              </div>
              <Column gap="8">
                <Heading as="h3" variant="heading-strong-m">
                  {item.title}
                </Heading>
                <Text variant="body-default-s" onBackground="neutral-weak">
                  {item.description}
                </Text>
              </Column>
            </Column>
          </RevealFx>
        ))}
      </div>

      <Row horizontal="center" paddingTop="8">
        <Button href="#offer-builder" variant="primary" size="m" arrowIcon>
          {services.cta}
        </Button>
      </Row>
    </Column>
    </SectionBackground>
  );
}
