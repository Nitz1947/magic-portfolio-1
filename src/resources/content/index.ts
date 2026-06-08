import type { LocaleContent } from "./types";

export { createEnglishContent } from "./en";
export { createPolishContent } from "./pl";
export type { LocaleContent } from "./types";

import { createEnglishContent } from "./en";
import { createPolishContent } from "./pl";
import type { Locale } from "@/i18n/config";

const contentByLocale = {
  en: createEnglishContent,
  pl: createPolishContent,
} as const;

export function getContent(locale: Locale): LocaleContent {
  return contentByLocale[locale]();
}

/** Default English content for API routes and static config. */
export const defaultContent = createEnglishContent();
