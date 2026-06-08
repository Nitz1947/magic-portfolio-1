"use client";

import { createContext, useContext } from "react";

import type { Locale } from "@/i18n/config";
import { localizedPath } from "@/i18n/paths";
import type { UiStrings } from "@/i18n/ui";
import type { LocaleContent } from "@/resources/content";

type LocaleContextValue = {
  locale: Locale;
  content: LocaleContent;
  ui: UiStrings;
  href: (path: string) => string;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

export function LocaleProvider({
  locale,
  content,
  ui,
  children,
}: {
  locale: Locale;
  content: LocaleContent;
  ui: UiStrings;
  children: React.ReactNode;
}) {
  return (
    <LocaleContext.Provider
      value={{
        locale,
        content,
        ui,
        href: (path) => localizedPath(path, locale),
      }}
    >
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error("useLocale must be used within LocaleProvider");
  }
  return context;
}
