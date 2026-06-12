export type FeaturedProjectConfig = {
  slug: string;
  liveUrl: string;
  embedUrl?: string;
  canEmbed: boolean;
  fallbackImage: string;
  displayUrl: string;
};

export const featuredProjectConfigs: Record<string, FeaturedProjectConfig> = {
  bjtrade: {
    slug: "bjtrade",
    liveUrl: "https://website-clients-three.vercel.app/pl",
    embedUrl: "https://website-clients-three.vercel.app/pl",
    canEmbed: true,
    fallbackImage: "/images/projects/bjtrade/cover-01.svg",
    displayUrl: "website-clients-three.vercel.app",
  },
};

export const homepageFeaturedSlugs = ["bjtrade"] as const;

export function getFeaturedConfig(slug: string): FeaturedProjectConfig | undefined {
  return featuredProjectConfigs[slug];
}
