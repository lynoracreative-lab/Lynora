export const SERVICE_ICONS = [
  "monitor",
  "palette",
  "megaphone",
  "share-2",
  "search",
  "target",
  "smartphone",
  "compass",
  "sparkles",
  "pen-line",
  "mail",
] as const;

export const SERVICE_OPTIONS = [
  "Website Design & Development",
  "Branding",
  "Digital Marketing",
  "Social Media",
  "SEO",
  "Paid Ads",
  "App Development",
  "Marketing Strategy",
  "Multiple Services",
] as const;

export const BUDGET_OPTIONS = [
  "Under R5,000",
  "R5,000 – R10,000",
  "R10,000 – R25,000",
  "R25,000 – R50,000",
  "R50,000+",
] as const;

export const CONTACT_METHODS = ["Email", "WhatsApp"] as const;

export const PROJECT_FILTERS = ["All", "Websites", "Branding", "Marketing", "Apps"] as const;

export const MAX_IMAGE_SIZE = 10 * 1024 * 1024;
export const MAX_VIDEO_SIZE = 25 * 1024 * 1024;
export const MAX_DOCUMENT_SIZE = 10 * 1024 * 1024;

export const ALLOWED_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/avif",
];

export const ALLOWED_VIDEO_TYPES = ["video/mp4"];
export const ALLOWED_DOCUMENT_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

export const DEFAULT_SETTINGS = {
  businessName: "Lynora",
  tagline: "WHERE CURIOSITY MEETS TECHNOLOGY.",
  email: "lynora.creative@gmail.com",
  whatsapp: "079 240 4930",
  phone: "079 240 4930",
  location: "Cape Town, South Africa",
  instagram: "",
  facebook: "",
  linkedin: "",
  tiktok: "",
  defaultSeoTitle: "Lynora | Website Design, Branding & Digital Marketing",
  defaultSeoDescription:
    "Lynora helps businesses build stronger digital identities through website design, branding, digital marketing, SEO and app development.",
  defaultOgImage: "/images/og-default.jpg",
  footerText: "© 2026 Lynora. All rights reserved.",
};

export type SiteSettings = typeof DEFAULT_SETTINGS;
