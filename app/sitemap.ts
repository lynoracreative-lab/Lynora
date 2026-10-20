import type { MetadataRoute } from "next";
import { prisma } from "@/lib/db";
import { siteUrl } from "@/lib/utils";

const staticPages = [
  { path: "/", slug: "home" },
  { path: "/services", slug: "services" },
  { path: "/work", slug: "work" },
  { path: "/about", slug: "about" },
  { path: "/process", slug: "process" },
  { path: "/contact", slug: "contact" },
  { path: "/blog", slug: "blog" },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  try {
    const [pages, services, projects, posts] = await Promise.all([
      prisma.page.findMany(),
      prisma.service.findMany({ where: { published: true } }),
      prisma.project.findMany({ where: { published: true } }),
      prisma.post.findMany({ where: { status: "PUBLISHED" } }),
    ]);
    const pageBySlug = new Map(pages.map((page) => [page.slug, page]));

    return [
      ...staticPages
        .filter(({ slug }) => {
          const page = pageBySlug.get(slug);
          if (!page) return true;
          return page.published && !page.noIndex;
        })
        .map(({ path, slug }) => ({
          url: siteUrl(path),
          lastModified: pageBySlug.get(slug)?.updatedAt,
        })),
      ...services.map((item) => ({
        url: siteUrl(`/services/${item.slug}`),
        lastModified: item.updatedAt,
      })),
      ...projects.map((item) => ({
        url: siteUrl(`/work/${item.slug}`),
        lastModified: item.updatedAt,
      })),
      ...posts.map((item) => ({
        url: siteUrl(`/blog/${item.slug}`),
        lastModified: item.updatedAt,
      })),
    ];
  } catch {
    return staticPages.map(({ path }) => ({ url: siteUrl(path) }));
  }
}
