export type FeaturedProjectConfig = {
  slug: string;
  liveUrl: string;
  embedUrl?: string;
  canEmbed: boolean;
  fallbackImage: string;
  displayUrl: string;
};

export const featuredProjectConfigs: Record<string, FeaturedProjectConfig> = {
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
    liveUrl: "https://bjtrade-git-main-gawinekltd-3457s-projects.vercel.app/pl",
    canEmbed: false,
    fallbackImage: "/images/projects/bjtrade/cover-01.svg",
    displayUrl: "bjtrade.pl/pl",
  },
};

export const homepageFeaturedSlugs = ["strefa-kibica", "bjtrade"] as const;

export function getFeaturedConfig(slug: string): FeaturedProjectConfig | undefined {
  return featuredProjectConfigs[slug];
}
