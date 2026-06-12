import type { Locale } from "@/i18n/config";

import { homepageFeaturedSlugs } from "./featuredProjects";

export type ProjectPresentationContent = {
  slug: string;
  tagline: string;
  shortSummary: string;
  audience: string;
  delivered: string;
  stack: string[];
  features: string[];
  outcome: string;
};

const presentations: Record<Locale, ProjectPresentationContent[]> = {
  pl: [
    {
      slug: "bjtrade",
      tagline: "Strona B2B hurtowni ziół z mapą sourcingu i wyceną online",
      shortSummary:
        "Wielojęzyczna witryna hurtowni botanicznej — buduje zaufanie certyfikatami ISO/HACCP, prezentuje globalny sourcing i upraszcza zapytania ofertowe dla kupujących B2B.",
      audience:
        "Firmy z branży spożywczej, farmaceutycznej i kosmetycznej szukające niezawodnego dostawcy ziół i przypraw hurtowo — z przejrzystą dokumentacją jakości i profesjonalnym kontaktem handlowym.",
      delivered:
        "Zaprojektowałem i wdrożyłem nowoczesną stronę zastępującą starszy WordPress: landing handlowy z CTA, katalog produktów, mapa pozyskiwania, dashboard sourcingu, Smart Quote Builder, sekcje branżowe i wersję PL/EN — z naciskiem na wiarygodność B2B.",
      stack: ["Next.js", "TypeScript", "i18n PL/EN", "Vercel"],
      features: [
        "Landing z wyraźnymi ścieżkami kontaktu handlowego i wyceny",
        "Katalog ziół, przypraw i botanicals z kategoriami B2B",
        "Tabela dostępności produktów i terminów realizacji",
        "Interaktywna mapa pozyskiwania z 50+ krajami źródłowymi",
        "Smart Quote Builder — strukturalne zapytanie ofertowe online",
        "Sekcje zgodności: ISO 22000, HACCP, dokumentacja fitosanitarna UE",
      ],
      outcome:
        "Klient otrzymuje profesjonalną obecność online dopasowaną do międzynarodowego handlu B2B — z jasną ofertą, sygnałami jakości i narzędziami ułatwiającymi pierwszy kontakt kupującego.",
    },
  ],
  en: [
    {
      slug: "bjtrade",
      tagline: "B2B herb wholesaler site with sourcing map and online quotes",
      shortSummary:
        "Multilingual botanical wholesale website — builds trust with ISO/HACCP credentials, showcases global sourcing, and streamlines B2B quote requests.",
      audience:
        "Food, pharmaceutical, and cosmetics companies seeking a reliable wholesale herbs and spices partner — with clear quality documentation and a professional sales contact path.",
      delivered:
        "I designed and shipped a modern site replacing legacy WordPress: commercial landing with CTAs, product catalog, sourcing map, sourcing dashboard, Smart Quote Builder, industry sections, and PL/EN — focused on B2B credibility.",
      stack: ["Next.js", "TypeScript", "i18n PL/EN", "Vercel"],
      features: [
        "Landing with clear sales contact and quote paths",
        "Herbs, spices, and botanicals catalog with B2B categories",
        "Product availability table with lead times",
        "Interactive sourcing map across 50+ origin countries",
        "Smart Quote Builder — structured online RFQ flow",
        "Compliance sections: ISO 22000, HACCP, EU phytosanitary documentation",
      ],
      outcome:
        "The client gains a professional online presence tailored to international B2B trade — with a clear offer, quality signals, and tools that simplify a buyer's first contact.",
    },
  ],
};

export function getProjectPresentations(locale: Locale): ProjectPresentationContent[] {
  const bySlug = new Map(presentations[locale].map((item) => [item.slug, item]));
  return homepageFeaturedSlugs
    .map((slug) => bySlug.get(slug))
    .filter((item): item is ProjectPresentationContent => item !== undefined);
}

export function getProjectPresentation(
  locale: Locale,
  slug: string,
): ProjectPresentationContent | undefined {
  return presentations[locale].find((item) => item.slug === slug);
}
