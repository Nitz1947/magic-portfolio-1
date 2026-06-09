// Content is locale-aware — use getContent(locale) in pages or useLocale() in client components.
export { getContent, defaultContent } from "./content/index";
export type { LocaleContent } from "./content/index";

import { defaultContent } from "./content/index";

/** English defaults for legacy non-locale routes and API handlers. */
export const { person, social, newsletter, home, about, blog, work, gallery } = defaultContent;

export {
  display,
  mailchimp,
  routes,
  protectedRoutes,
  baseURL,
  fonts,
  style,
  schema,
  sameAs,
  socialSharing,
  effects,
  dataStyle,
} from "./once-ui.config";
