"use client";

import { usePathname, useRouter } from "next/navigation";

import { localeLabels, locales, type Locale } from "@/i18n/config";
import { getLocaleFromPathname, switchLocalePath } from "@/i18n/paths";
import { Row, ToggleButton } from "@once-ui-system/core";

export function LanguageSwitcher() {
  const pathname = usePathname() ?? "";
  const router = useRouter();
  const currentLocale = getLocaleFromPathname(pathname) ?? "en";

  const handleSwitch = (locale: Locale) => {
    if (locale === currentLocale) return;
    router.push(switchLocalePath(pathname, locale));
  };

  return (
    <Row gap="4" vertical="center">
      {locales.map((locale) => (
        <ToggleButton
          key={locale}
          label={localeLabels[locale]}
          selected={currentLocale === locale}
          onClick={() => handleSwitch(locale)}
        />
      ))}
    </Row>
  );
}
