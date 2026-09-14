import { z } from "zod";

export const pageSectionSchema = z.object({
  heading: z.string().optional().or(z.literal("")),
  subheading: z.string().optional().or(z.literal("")),
  paragraph: z.string().optional().or(z.literal("")),
  ctaLabel: z.string().optional().or(z.literal("")),
  ctaUrl: z.string().optional().or(z.literal("")),
  image: z.string().optional().or(z.literal("")),
  enabled: z.boolean(),
  extra: z.string().optional().or(z.literal("")),
});

export const serviceSchema = z.object({
  title: z.string().trim().min(2),
  slug: z.string().trim().min(2),
  shortDescription: z.string().trim().min(8),
  fullDescription: z.string().trim().min(12),
  icon: z.string().trim().min(2),
  coverImage: z.string().optional().or(z.literal("")),
  idealClient: z.string().trim().min(8),
  deliverables: z.string().trim().min(8),
  outcomes: z.string().trim().min(8),
  ctaLabel: z.string().trim().min(2),
  ctaUrl: z.string().trim().min(1),
  seoTitle: z.string().optional().or(z.literal("")),
  seoDescription: z.string().optional().or(z.literal("")),
  published: z.boolean(),
  sortOrder: z.coerce.number().int(),
});

export const projectSchema = z.object({
  title: z.string().trim().min(2),
  slug: z.string().trim().min(2),
  industry: z.string().trim().min(2),
  projectType: z.string().trim().min(2),
  status: z.enum(["REAL", "CONCEPT", "INTERNAL"]),
  services: z.string().trim().min(2),
  summary: z.string().trim().min(8),
  coverImage: z.string().optional().or(z.literal("")),
  problem: z.string().trim().min(8),
  solution: z.string().trim().min(8),
  results: z.string().trim().min(8),
  testimonial: z.string().optional().or(z.literal("")),
  projectUrl: z.string().optional().or(z.literal("")),
  featured: z.boolean(),
  published: z.boolean(),
  seoTitle: z.string().optional().or(z.literal("")),
  seoDescription: z.string().optional().or(z.literal("")),
});

export const postSchema = z.object({
  title: z.string().trim().min(2),
  slug: z.string().trim().min(2),
  excerpt: z.string().trim().min(8),
  content: z.string().min(8),
  featuredImage: z.string().optional().or(z.literal("")),
  status: z.enum(["DRAFT", "PUBLISHED"]),
  categoryId: z.string().optional().or(z.literal("")),
  tags: z.string().optional().or(z.literal("")),
  seoTitle: z.string().optional().or(z.literal("")),
  seoDescription: z.string().optional().or(z.literal("")),
  featured: z.boolean(),
  publishedAt: z.string().optional().or(z.literal("")),
});

export const testimonialSchema = z.object({
  clientName: z.string().trim().min(2),
  company: z.string().trim().min(2),
  role: z.string().trim().min(2),
  quote: z.string().trim().min(8),
  clientImage: z.string().optional().or(z.literal("")),
  companyLogo: z.string().optional().or(z.literal("")),
  featured: z.boolean(),
  published: z.boolean(),
  sortOrder: z.coerce.number().int(),
});

export const faqSchema = z.object({
  question: z.string().trim().min(4),
  answer: z.string().trim().min(8),
  category: z.string().trim().min(2),
  published: z.boolean(),
  sortOrder: z.coerce.number().int(),
});

export const mediaMetaSchema = z.object({
  title: z.string().trim().min(1),
  altText: z.string().optional().or(z.literal("")),
});

export const seoItemSchema = z.object({
  seoTitle: z.string().optional().or(z.literal("")),
  seoDescription: z.string().optional().or(z.literal("")),
  ogImage: z.string().optional().or(z.literal("")),
  canonicalUrl: z.string().optional().or(z.literal("")),
  noIndex: z.boolean(),
});
