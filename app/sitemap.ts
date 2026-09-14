import type { MetadataRoute } from "next";
import { prisma } from "@/lib/db";
import { siteUrl } from "@/lib/utils";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes = ["", "/services", "/work", "/about", "/contact", "/blog"].map((path) => ({
    url: siteUrl(path || "/"),
    lastModified: new Date(),
  }));

  try {
    const [pages, services, projects, posts] = await Promise.all([
      prisma.page.findMany({ where: { published: true } }),
      prisma.service.findMany({ where: { published: true } }),
      prisma.project.findMany({ where: { published: true } }),
      prisma.post.findMany({ where: { status: "PUBLISHED" } }),
    ]);

    return [
      ...staticRoutes,
      ...pages
        .filter((page) => !["home", "services", "work", "about", "contact", "blog"].includes(page.slug))
        .map((page) => ({ url: siteUrl(`/${page.slug}`), lastModified: page.updatedAt })),
      ...services.map((item) => ({ url: siteUrl(`/services/${item.slug}`), lastModified: item.updatedAt })),
      ...projects.map((item) => ({ url: siteUrl(`/work/${item.slug}`), lastModified: item.updatedAt })),
      ...posts.map((item) => ({ url: siteUrl(`/blog/${item.slug}`), lastModified: item.updatedAt })),
    ];
  } catch {
    return staticRoutes;
  }
}
