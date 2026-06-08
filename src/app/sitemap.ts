import { getPosts } from "@/utils/utils";
import { baseURL, routes as routesConfig } from "@/resources";
import { locales } from "@/i18n/config";
import { localizedPath } from "@/i18n/paths";

export default async function sitemap() {
  const blogs = getPosts(["src", "app", "blog", "posts"]).flatMap((post) =>
    locales.map((locale) => ({
      url: `${baseURL}${localizedPath(`/blog/${post.slug}`, locale)}`,
      lastModified: post.metadata.publishedAt,
    })),
  );

  const works = getPosts(["src", "app", "work", "projects"]).flatMap((post) =>
    locales.map((locale) => ({
      url: `${baseURL}${localizedPath(`/work/${post.slug}`, locale)}`,
      lastModified: post.metadata.publishedAt,
    })),
  );

  const activeRoutes = Object.keys(routesConfig).filter(
    (route) => routesConfig[route as keyof typeof routesConfig],
  );

  const routes = activeRoutes.flatMap((route) =>
    locales.map((locale) => ({
      url: `${baseURL}${localizedPath(route, locale)}`,
      lastModified: new Date().toISOString().split("T")[0],
    })),
  );

  return [...routes, ...blogs, ...works];
}
