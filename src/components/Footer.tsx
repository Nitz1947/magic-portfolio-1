"use client";

import { Button, Column, Row, IconButton, Text } from "@once-ui-system/core";
import { useLocale } from "@/context/LocaleContext";
import { localizedPath } from "@/i18n/paths";
import { routes } from "@/resources";
import styles from "./Footer.module.scss";

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { content, ui, locale } = useLocale();
  const { person, social } = content;

  return (
    <Column as="footer" fillWidth padding="8" horizontal="center" className={styles.footer} position="relative" zIndex={2}>
      <Column
        maxWidth="m"
        fillWidth
        paddingY="24"
        paddingX="16"
        gap="24"
        horizontal="center"
        className={styles.inner}
      >
        <Column fillWidth gap="12" horizontal="center" align="center" className={styles.ctaBlock}>
          <Text variant="heading-strong-l" align="center" wrap="balance">
            {ui.footer.ctaTitle}
          </Text>
          <Text variant="body-default-m" onBackground="neutral-weak" align="center" wrap="balance">
            {ui.footer.ctaDescription}
          </Text>
          <Row gap="12" wrap horizontal="center" paddingTop="8">
            {routes["/quote"] && (
              <Button href={localizedPath("/quote", locale)} variant="primary" size="m" arrowIcon>
                {ui.services.cta}
              </Button>
            )}
            <Button href={`mailto:${person.email}`} variant="secondary" size="m">
              {ui.contactMe}
            </Button>
          </Row>
        </Column>

        <Row
          className={styles.bottom}
          fillWidth
          gap="16"
          horizontal="between"
          vertical="center"
          s={{
            direction: "column",
            horizontal: "center",
            align: "center",
          }}
        >
          <Text variant="body-default-s" onBackground="neutral-strong">
            <Text onBackground="neutral-weak">© {currentYear} /</Text>
            <Text paddingX="4">{person.name}</Text>
            <Text onBackground="neutral-weak">
              {" "}
              · {person.role}
            </Text>
          </Text>
          <Row gap="16">
            {social.map(
              (item) =>
                item.link && (
                  <IconButton
                    key={item.name}
                    href={item.link}
                    icon={item.icon}
                    tooltip={item.name}
                    size="s"
                    variant="ghost"
                  />
                ),
            )}
          </Row>
        </Row>
      </Column>
      <Row height="80" hide s={{ hide: false }} />
    </Column>
  );
};
