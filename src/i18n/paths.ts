import { defaultLocale, isLocale, type Locale } from "./config";

export function localizedPath(path: string, locale: Locale): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  if (normalized === "/") {
    return `/${locale}`;
  }
  return `/${locale}${normalized}`;
}

export function stripLocalePath(pathname: string): string {
  const segments = pathname.split("/").filter(Boolean);
  if (segments.length > 0 && isLocale(segments[0])) {
    const rest = segments.slice(1);
    return rest.length > 0 ? `/${rest.join("/")}` : "/";
  }
  return pathname || "/";
}

export function getLocaleFromPathname(pathname: string): Locale | null {
  const segment = pathname.split("/").filter(Boolean)[0];
  return segment && isLocale(segment) ? segment : null;
}

export function switchLocalePath(pathname: string, locale: Locale): string {
  const stripped = stripLocalePath(pathname);
  return localizedPath(stripped, locale);
}

export function getDateLocale(locale: Locale): string {
  return locale === "pl" ? "pl-PL" : "en-US";
}

export function getTimeLocale(locale: Locale): string {
  return locale === "pl" ? "pl-PL" : "en-GB";
}

export { defaultLocale };
