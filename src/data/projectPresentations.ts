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
      slug: "seo-opt-one",
      tagline: "Suite SEO — od audytu URL po gotowe kody wdrożeniowe",
      shortSummary:
        "Platforma audytu SEO z planami strategii, generatorami meta i JSON-LD oraz modułami marketingowymi — jeden workflow dla właścicieli stron i marketerów.",
      audience:
        "Właściciele stron, marketerzy i agencje, które potrzebują przejrzystego audytu Google, rekomendacji wdrożeniowych i gotowych fragmentów kodu — bez rozproszenia między wieloma narzędziami.",
      delivered:
        "Zaprojektowałem i wdrożyłem kompleksową platformę SEO: analiza strony z wynikiem 0–100, moduły AI/GEO, generator kodów (meta, JSON-LD, robots.txt, GA4), pięć planów strategii, raporty trafności oraz sekcję marketingową — w spójnym interfejsie z nawigacją zakładkami.",
      stack: ["Next.js", "TypeScript", "App Router", "Vercel"],
      features: [
        "Audyt SEO/AI/GEO z oceną widoczności w Google SGE i asystentach AI",
        "Pełny skan techniczny: robots.txt, sitemap, meta, structured data",
        "Generator kodów z auto-doborem SEO na podstawie URL",
        "21 narzędzi SEO w katalogu według kategorii",
        "5 planów strategii dopasowanych do celu biznesowego",
        "Reports z historią analiz i oceną trafności wyników",
      ],
      outcome:
        "Jeden punkt wejścia od wklejenia adresu URL do planu wdrożenia i gotowych kodów — ułatwia decyzje marketingowe i skraca drogę od diagnozy do poprawek na stronie.",
    },
    {
      slug: "strefa-kibica",
      tagline: "Społeczność Discord z wirtualnymi zakładami i rankingiem",
      shortSummary:
        "Aplikacja webowa dla fanów sportu — logowanie Discord OAuth, zakłady na wirtualną walutę i tablica liderów budująca zaangażowanie bez transakcji finansowych.",
      audience:
        "Administratorzy serwerów Discord i społeczności sportowe, które chcą własnej platformy angażującej członków — z profesjonalnym UX i szybkim onboardingiem przez konto Discord.",
      delivered:
        "Stworzyłem platformę wirtualnych zakładów: autoryzacja Discord OAuth, system coinów startowych, obstawianie meczów na żywo, ranking Top 10 oraz interfejs dopasowany do energii community — bez prawdziwych pieniędzy, wyłącznie dla integracji grupy.",
      stack: ["Next.js", "TypeScript", "Discord OAuth", "Vercel"],
      features: [
        "Logowanie jednym kliknięciem przez Discord OAuth",
        "Wirtualna waluta i bonus powitalny dla nowych użytkowników",
        "Zakłady na żywo ze śledzeniem wydarzeń w czasie rzeczywistym",
        "Ranking graczy motywujący do aktywności w społeczności",
        "Responsywny interfejs pod desktop i mobile",
      ],
      outcome:
        "Społeczność zyskuje dedykowaną aplikację z własną tożsamością wizualną — angażującą, bezpieczną i gotową do rozbudowy o kolejne mechaniki gry.",
    },
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
      slug: "seo-opt-one",
      tagline: "SEO suite — from URL audit to deployment-ready code",
      shortSummary:
        "SEO audit platform with strategy plans, meta and JSON-LD generators, and marketing modules — one workflow for site owners and marketers.",
      audience:
        "Site owners, marketers, and agencies who need a clear Google audit, actionable recommendations, and ready-to-deploy code snippets — without juggling multiple disconnected tools.",
      delivered:
        "I designed and shipped a full SEO platform: page analysis scored 0–100, AI/GEO modules, code generators (meta, JSON-LD, robots.txt, GA4), five strategy plans, relevance reports, and a marketing section — unified in a tab-based interface.",
      stack: ["Next.js", "TypeScript", "App Router", "Vercel"],
      features: [
        "SEO/AI/GEO audit covering Google SGE and AI assistant visibility",
        "Full technical scan: robots.txt, sitemap, meta, structured data",
        "Code generator with SEO auto-selection from URL",
        "21 SEO tools organized by category",
        "5 strategy plans aligned to business goals",
        "Reports with analysis history and relevance scoring",
      ],
      outcome:
        "A single entry point from pasting a URL to an implementation plan and ready code — supporting faster marketing decisions and a shorter path from diagnosis to on-site fixes.",
    },
    {
      slug: "strefa-kibica",
      tagline: "Discord community with virtual betting and leaderboards",
      shortSummary:
        "Web app for sports fans — Discord OAuth login, virtual-currency bets, and a leaderboard that drives engagement without real-money transactions.",
      audience:
        "Discord server admins and sports communities that want a dedicated engagement platform — with professional UX and frictionless onboarding via Discord accounts.",
      delivered:
        "I built a virtual betting platform: Discord OAuth, starter coins, live match betting, a Top 10 leaderboard, and a UI tuned to community energy — no real money, purely for group engagement.",
      stack: ["Next.js", "TypeScript", "Discord OAuth", "Vercel"],
      features: [
        "One-click sign-in via Discord OAuth",
        "Virtual currency with a welcome bonus for new users",
        "Live betting with real-time event tracking",
        "Player leaderboard encouraging community activity",
        "Responsive interface for desktop and mobile",
      ],
      outcome:
        "The community gets a branded web app that is engaging, safe, and ready to extend with additional game mechanics over time.",
    },
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
