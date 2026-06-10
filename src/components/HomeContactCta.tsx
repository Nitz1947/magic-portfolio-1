"use client";

import { Button, Column, Heading, Row, Text } from "@once-ui-system/core";
import { useLocale } from "@/context/LocaleContext";
import { localizedPath } from "@/i18n/paths";
import { routes } from "@/resources";
import styles from "./HomeContactCta.module.scss";

export function HomeContactCta() {
  const { content, ui, locale } = useLocale();
  const { person } = content;

  return (
    <Column
      fillWidth
      padding="xl"
      radius="l"
      gap="16"
      horizontal="center"
      align="center"
      className={styles.cta}
    >
      <Column maxWidth="s" gap="8" horizontal="center" align="center">
        <Heading as="h2" variant="display-strong-xs" wrap="balance" align="center">
          {ui.homeCta.title}
        </Heading>
        <Text variant="body-default-l" onBackground="neutral-weak" wrap="balance" align="center">
          {ui.homeCta.description}
        </Text>
      </Column>
      <Row gap="12" wrap horizontal="center">
        {routes["/quote"] && (
          <Button
            href={localizedPath("/quote", locale)}
            variant="primary"
            size="m"
            arrowIcon
          >
            {ui.services.cta}
          </Button>
        )}
        <Button href={`mailto:${person.email}`} variant="secondary" size="m">
          {ui.contactMe}
        </Button>
      </Row>
    </Column>
  );
}
