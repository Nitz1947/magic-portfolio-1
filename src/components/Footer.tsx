"use client";

import { Row, IconButton, SmartLink, Text } from "@once-ui-system/core";
import { useLocale } from "@/context/LocaleContext";
import { FloatingSymbols } from "@/components/effects";
import styles from "./Footer.module.scss";

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { content, ui } = useLocale();
  const { person, social } = content;

  return (
    <Row as="footer" fillWidth padding="8" horizontal="center" s={{ direction: "column" }} className={styles.footer}>
      <div className={styles.backdrop} aria-hidden="true">
        <FloatingSymbols density="sparse" />
      </div>
      <Row
        className={styles.mobile}
        maxWidth="m"
        paddingY="8"
        paddingX="16"
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
            / {ui.footer.buildWith}{" "}
            <SmartLink href="https://once-ui.com/products/magic-portfolio">Once UI</SmartLink>
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
      <Row height="80" hide s={{ hide: false }} />
    </Row>
  );
};
