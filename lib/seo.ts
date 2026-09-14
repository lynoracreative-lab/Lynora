import type { Metadata } from "next";
import { DEFAULT_SETTINGS } from "@/lib/constants";
import { siteUrl } from "@/lib/utils";

type SeoInput = {
  title?: string | null;
  description?: string | null;
  ogImage?: string | null;
  canonicalUrl?: string | null;
  noIndex?: boolean;
  path?: string;
};

export function buildMetadata({
  title,
  description,
  ogImage,
  canonicalUrl,
  noIndex,
  path = "/",
}: SeoInput): Metadata {
  const resolvedTitle = title || DEFAULT_SETTINGS.defaultSeoTitle;
  const resolvedDescription = description || DEFAULT_SETTINGS.defaultSeoDescription;
  const image = ogImage || DEFAULT_SETTINGS.defaultOgImage;
  const imageUrl = image.startsWith("http") ? image : siteUrl(image);
  const canonical = canonicalUrl || siteUrl(path);

  return {
    title: resolvedTitle,
    description: resolvedDescription,
    alternates: { canonical },
    robots: noIndex ? { index: false, follow: false } : { index: true, follow: true },
    openGraph: {
      title: resolvedTitle,
      description: resolvedDescription,
      url: canonical,
      siteName: "Lynora",
      type: "website",
      images: [{ url: imageUrl, alt: resolvedTitle }],
    },
    twitter: {
      card: "summary_large_image",
      title: resolvedTitle,
      description: resolvedDescription,
      images: [imageUrl],
    },
  };
}
