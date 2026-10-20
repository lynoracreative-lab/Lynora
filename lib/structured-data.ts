import { DEFAULT_SETTINGS, type SiteSettings } from "@/lib/constants";
import { siteUrl } from "@/lib/utils";
import type { Crumb } from "@/components/public/Breadcrumbs";

function telephone(value: string) {
  const digits = value.replace(/\D/g, "");
  if (digits.startsWith("0")) return `+27${digits.slice(1)}`;
  if (digits.startsWith("27")) return `+${digits}`;
  return value;
}

export function organizationJsonLd(settings: SiteSettings) {
  const sameAs = [settings.instagram, settings.facebook, settings.linkedin, settings.tiktok].filter(Boolean);

  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: settings.businessName,
    url: siteUrl("/"),
    logo: siteUrl("/branding/lynora-logo.png"),
    image: siteUrl(DEFAULT_SETTINGS.defaultOgImage),
    description: settings.defaultSeoDescription,
    email: settings.email,
    telephone: telephone(settings.phone || settings.whatsapp),
    address: {
      "@type": "PostalAddress",
      addressLocality: "Cape Town",
      addressCountry: "ZA",
    },
    areaServed: ["ZA", "Worldwide"],
    ...(sameAs.length ? { sameAs } : {}),
  };
}

export function websiteJsonLd(settings: SiteSettings) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: settings.businessName,
    url: siteUrl("/"),
    description: settings.defaultSeoDescription,
    publisher: {
      "@type": "Organization",
      name: settings.businessName,
      url: siteUrl("/"),
    },
  };
}

export function breadcrumbJsonLd(items: Crumb[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      item: siteUrl(item.href),
    })),
  };
}

export function itemListJsonLd(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      url: item.url,
    })),
  };
}

export function serviceJsonLd(service: { title: string; slug: string; shortDescription: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.shortDescription,
    url: siteUrl(`/services/${service.slug}`),
    serviceType: service.title,
    areaServed: ["ZA", "Worldwide"],
    provider: {
      "@type": "Organization",
      name: "Lynora",
      url: siteUrl("/"),
    },
  };
}

export function articleJsonLd(post: {
  title: string;
  slug: string;
  excerpt: string;
  featuredImage?: string | null;
  publishedAt?: Date | null;
  updatedAt: Date;
  authorName: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    url: siteUrl(`/blog/${post.slug}`),
    mainEntityOfPage: siteUrl(`/blog/${post.slug}`),
    ...(post.featuredImage
      ? { image: post.featuredImage.startsWith("http") ? post.featuredImage : siteUrl(post.featuredImage) }
      : {}),
    datePublished: (post.publishedAt || post.updatedAt).toISOString(),
    dateModified: post.updatedAt.toISOString(),
    author: { "@type": "Person", name: post.authorName },
    publisher: {
      "@type": "Organization",
      name: "Lynora",
      logo: { "@type": "ImageObject", url: siteUrl("/branding/lynora-logo.png") },
    },
  };
}

export function projectJsonLd(project: {
  title: string;
  slug: string;
  summary: string;
  coverImage?: string | null;
}) {
  const image = project.coverImage || "/portfolio/lynora-identity.svg";
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.summary,
    url: siteUrl(`/work/${project.slug}`),
    image: image.startsWith("http") ? image : siteUrl(image),
    creator: { "@type": "Organization", name: "Lynora", url: siteUrl("/") },
  };
}

export function faqJsonLd(items: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}
