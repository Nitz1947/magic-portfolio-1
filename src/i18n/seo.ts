import type { Metadata } from "next";
import { Meta } from "@once-ui-system/core";

import { baseURL } from "@/resources";

import { locales, type Locale } from "./config";
import { localizedPath } from "./paths";

type PageMetadataInput = {
  locale: Locale;
  path: string;
  title: string;
  description: string;
  image?: string;
  keywords?: string[];
};

export function buildPageMetadata(input: PageMetadataInput): Metadata {
  const canonicalPath = localizedPath(input.path, input.locale);

  const base = Meta.generate({
    title: input.title,
    description: input.description,
    baseURL,
    path: canonicalPath,
    image: input.image,
  });

  const languages: Record<string, string> = {};
  for (const loc of locales) {
    languages[loc] = `${baseURL}${localizedPath(input.path, loc)}`;
  }
  languages["x-default"] = `${baseURL}${localizedPath(input.path, "en")}`;

  return {
    ...base,
    alternates: {
      canonical: `${baseURL}${canonicalPath}`,
      languages,
    },
    ...(input.keywords?.length ? { keywords: input.keywords } : {}),
  };
}
