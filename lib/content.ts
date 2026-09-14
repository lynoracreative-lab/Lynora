import { prisma } from "@/lib/db";
import { DEFAULT_SETTINGS, type SiteSettings } from "@/lib/constants";
import { fallbackFaqs, fallbackProjects, fallbackServices, fallbackTestimonials } from "@/lib/fallback";

export async function getSiteSettings(): Promise<SiteSettings> {
  try {
    const rows = await prisma.siteSetting.findMany();
    const map = Object.fromEntries(rows.map((row) => [row.key, row.value]));
    return {
      ...DEFAULT_SETTINGS,
      ...Object.fromEntries(
        Object.keys(DEFAULT_SETTINGS).map((key) => [key, map[key] ?? DEFAULT_SETTINGS[key as keyof SiteSettings]]),
      ),
    } as SiteSettings;
  } catch {
    return DEFAULT_SETTINGS;
  }
}

export async function getPageBySlug(slug: string) {
  try {
    return await prisma.page.findUnique({
      where: { slug },
      include: { sections: { orderBy: { sortOrder: "asc" } } },
    });
  } catch {
    return null;
  }
}

export type PageSectionContent = {
  key: string;
  heading?: string | null;
  subheading?: string | null;
  paragraph?: string | null;
  ctaLabel?: string | null;
  ctaUrl?: string | null;
  image?: string | null;
  enabled?: boolean;
  extra?: unknown;
};

export function sectionMap(sections: PageSectionContent[] | undefined | null) {
  return Object.fromEntries((sections || []).map((section) => [section.key, section])) as Record<
    string,
    PageSectionContent
  >;
}

export async function getPublishedServices() {
  try {
    const services = await prisma.service.findMany({
      where: { published: true },
      orderBy: { sortOrder: "asc" },
    });
    return services.length ? services : fallbackServices;
  } catch {
    return fallbackServices;
  }
}

export async function getPublishedProjects(options?: { featured?: boolean }) {
  try {
    const projects = await prisma.project.findMany({
      where: {
        published: true,
        ...(options?.featured ? { featured: true } : {}),
      },
      include: { gallery: { orderBy: { sortOrder: "asc" } } },
      orderBy: { createdAt: "desc" },
    });
    return projects.length ? projects : fallbackProjects;
  } catch {
    return fallbackProjects;
  }
}

export async function getPublishedTestimonials() {
  try {
    const items = await prisma.testimonial.findMany({
      where: { published: true },
      orderBy: { sortOrder: "asc" },
    });
    return items.length ? items : fallbackTestimonials;
  } catch {
    return fallbackTestimonials;
  }
}

export async function getPublishedFaqs() {
  try {
    const items = await prisma.faq.findMany({
      where: { published: true },
      orderBy: { sortOrder: "asc" },
    });
    return items.length ? items : fallbackFaqs;
  } catch {
    return fallbackFaqs;
  }
}

export async function getPublishedPosts(options?: { featured?: boolean; take?: number }) {
  try {
    return await prisma.post.findMany({
      where: {
        status: "PUBLISHED",
        ...(options?.featured ? { featured: true } : {}),
      },
      include: { author: true, category: true, tags: { include: { tag: true } } },
      orderBy: { publishedAt: "desc" },
      take: options?.take,
    });
  } catch {
    return [];
  }
}
