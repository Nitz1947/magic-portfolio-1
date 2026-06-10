import mdx from "@next/mdx";

const withMDX = mdx({
  extension: /\.mdx?$/,
  options: {},
});

const isGithubPages = process.env.GITHUB_PAGES === "true";
const basePath = isGithubPages ? "/magic-portfolio-1" : "";

/** @type {import('next').NextConfig} */
const nextConfig = {
  ...(isGithubPages
    ? {
        output: "export",
        basePath,
        assetPrefix: `${basePath}/`,
        trailingSlash: true,
      }
    : {}),
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  transpilePackages: ["next-mdx-remote"],
  images: {
    unoptimized: isGithubPages,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.google.com",
        pathname: "**",
      },
    ],
  },
  sassOptions: {
    compiler: "modern",
    silenceDeprecations: ["legacy-js-api"],
  },
};

export default withMDX(nextConfig);
