export type FeaturedProjectConfig = {
  slug: string;
  liveUrl: string;
  embedUrl?: string;
  canEmbed: boolean;
  fallbackImage: string;
  displayUrl: string;
};

export const featuredProjectConfigs: Record<string, FeaturedProjectConfig> = {
  "seo-opt-one": {
    slug: "seo-opt-one",
    liveUrl: "https://seo-opt-one.vercel.app/",
    embedUrl: "https://seo-opt-one.vercel.app/",
    canEmbed: true,
    fallbackImage: "/images/projects/seo-opt-one/cover-01.svg",
    displayUrl: "seo-opt-one.vercel.app",
  },
  "strefa-kibica": {
    slug: "strefa-kibica",
    liveUrl: "https://discord-strefakibica.vercel.app/",
    embedUrl: "https://discord-strefakibica.vercel.app/",
    canEmbed: true,
    fallbackImage: "/images/projects/strefa-kibica/cover-01.svg",
    displayUrl: "discord-strefakibica.vercel.app",
  },
  bjtrade: {
    slug: "bjtrade",
    liveUrl: "https://website-clients-three.vercel.app/pl",
    embedUrl: "https://website-clients-three.vercel.app/pl",
    canEmbed: true,
    fallbackImage: "/images/projects/bjtrade/cover-01.svg",
    displayUrl: "website-clients-three.vercel.app",
  },
};

export const homepageFeaturedSlugs = ["seo-opt-one", "strefa-kibica", "bjtrade"] as const;

export function getFeaturedConfig(slug: string): FeaturedProjectConfig | undefined {
  return featuredProjectConfigs[slug];
}
