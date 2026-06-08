"use client";

import { usePathname } from "next/navigation";
import { Column, Heading, Text } from "@once-ui-system/core";
import { defaultLocale } from "@/i18n/config";
import { getLocaleFromPathname } from "@/i18n/paths";
import { getUi } from "@/i18n/ui";

export default function NotFound() {
  const pathname = usePathname() ?? "";
  const locale = getLocaleFromPathname(pathname) ?? defaultLocale;
  const ui = getUi(locale);

  return (
    <Column as="section" fill center paddingBottom="160">
      <Text marginBottom="s" variant="display-strong-xl">
        404
      </Text>
      <Heading marginBottom="l" variant="display-default-xs">
        {ui.notFound.title}
      </Heading>
      <Text onBackground="neutral-weak">{ui.notFound.description}</Text>
    </Column>
  );
}
