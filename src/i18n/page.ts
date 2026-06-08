import { defaultLocale, isLocale, type Locale } from "./config";

export async function resolveLocale(params: Promise<{ locale: string }>): Promise<Locale> {
  const { locale } = await params;
  return isLocale(locale) ? locale : defaultLocale;
}

export { defaultLocale };
