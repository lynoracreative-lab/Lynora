export type ServiceRecord = {
  title: string;
  slug: string;
  icon: string;
  shortDescription: string;
  fullDescription: string;
  idealClient: string;
  deliverables: string;
  outcomes: string;
  ctaLabel: string;
  ctaUrl: string;
  seoTitle: string;
  seoDescription: string;
  sortOrder: number;
  published: boolean;
};

export const serviceCatalog: ServiceRecord[] = [
  {
    title: "Website Design & Development",
    slug: "website-design-development",
    icon: "monitor",
    shortDescription:
      "Modern, responsive websites designed to make your business easier to discover, understand and contact.",
    fullDescription:
      "Modern, responsive websites designed to make your business easier to discover, understand and contact. From a single landing page to ecommerce, portals and ongoing care, the work is built around how customers find you and get in touch.",
    idealClient:
      "Small businesses, startups, restaurants, professional services and established companies that need a website that looks credible and converts enquiries.",
    deliverables: [
      "One-page / landing page websites",
      "Small business websites",
      "Professional / advanced business websites",
      "E-commerce websites",
      "Advanced e-commerce websites",
      "Web apps",
      "Client portals",
      "Membership websites",
      "Responsive website design",
      "Mobile optimisation",
      "UI / UX design",
      "Contact forms and WhatsApp CTAs",
      "Booking functionality",
      "CMS setup",
      "Custom integrations",
      "API integrations",
      "Analytics setup",
      "Basic SEO setup",
      "Website performance optimisation",
      "Website maintenance",
      "Domain, hosting and SSL support",
    ].join("\n"),
    outcomes: "A website that is easier to understand, trust and enquire through.",
    ctaLabel: "Discuss Your Website",
    ctaUrl: `/contact?service=${encodeURIComponent("Website Design & Development")}`,
    seoTitle: "Website Design & Development | Lynora",
    seoDescription:
      "Modern, responsive websites designed to make your business easier to discover, understand and contact.",
    sortOrder: 1,
    published: true,
  },
  {
    title: "Branding & Brand Identity",
    slug: "branding-visual-identity",
    icon: "palette",
    shortDescription:
      "Build a consistent, recognisable brand that reflects the quality and personality of your business.",
    fullDescription:
      "Build a consistent, recognisable brand that reflects the quality and personality of your business — from the mark and visual system to the everyday materials people actually use.",
    idealClient:
      "Businesses launching, refreshing or moving away from a look that no longer matches the quality of the work.",
    deliverables: [
      "Logo design",
      "Brand refreshes",
      "Mini brand identity packages",
      "Full brand identity development",
      "Brand strategy",
      "Brand guidelines",
      "Colour palettes",
      "Typography systems",
      "Visual direction",
      "Business card design",
      "Email signature design",
      "Letterhead and invoice templates",
      "Company profiles",
      "Capability decks",
      "Brochure and flyer design",
      "Menu and price-list design",
      "Social media template packs",
      "Presentation templates",
    ].join("\n"),
    outcomes: "A more consistent brand that feels considered across website, social and print.",
    ctaLabel: "Build Your Brand",
    ctaUrl: "/contact?service=Branding",
    seoTitle: "Branding & Brand Identity | Lynora",
    seoDescription:
      "Build a consistent, recognisable brand that reflects the quality and personality of your business.",
    sortOrder: 2,
    published: true,
  },
  {
    title: "Digital Marketing Strategy",
    slug: "digital-marketing",
    icon: "megaphone",
    shortDescription:
      "Strategic marketing built around your audience, goals and the channels most likely to generate results.",
    fullDescription:
      "Strategic marketing built around your audience, goals and the channels most likely to generate results — so you know what to say, where to show up and how to measure it.",
    idealClient:
      "Businesses that already have something worth offering but need a clearer plan before spending more time or attention on more channels.",
    deliverables: [
      "Marketing audits",
      "Digital marketing strategy",
      "Campaign strategy",
      "Social media strategy",
      "Content planning",
      "Monthly content calendars",
      "Competitor reviews",
      "Audience strategy",
      "Brand messaging",
      "Campaign planning",
      "KPI recommendations",
      "Google Business Profile setup and optimisation",
      "GA4 setup",
      "Search Console setup",
      "Meta Pixel setup",
      "Conversion tracking",
      "Analytics and reporting",
    ].join("\n"),
    outcomes: "A marketing direction you can act on, with the right channels and clearer measurement.",
    ctaLabel: "Plan Your Marketing",
    ctaUrl: "/contact?service=Digital Marketing",
    seoTitle: "Digital Marketing Strategy | Lynora",
    seoDescription:
      "Strategic marketing built around your audience, goals and the channels most likely to generate results.",
    sortOrder: 3,
    published: true,
  },
  {
    title: "Social Media Management",
    slug: "social-media-marketing",
    icon: "share-2",
    shortDescription:
      "Consistent social media management designed to build visibility, trust and engagement.",
    fullDescription:
      "Consistent social media management designed to build visibility, trust and engagement — with planning, publishing and community care that feels like part of the brand.",
    idealClient:
      "Restaurants, beauty and wellness brands, studios and service businesses that want social media to feel intentional rather than last-minute.",
    deliverables: [
      "Instagram management",
      "Facebook management",
      "LinkedIn management",
      "TikTok content support",
      "Content planning",
      "Caption writing",
      "Scheduling",
      "Community monitoring",
      "Comment and DM management",
      "Monthly reporting",
      "Social media growth strategy",
      "Reel / short-form support",
    ].join("\n"),
    outcomes: "A more consistent social presence that supports trust and enquiry.",
    ctaLabel: "Grow Your Social Media",
    ctaUrl: "/contact?service=Social Media",
    seoTitle: "Social Media Management | Lynora",
    seoDescription:
      "Consistent social media management designed to build visibility, trust and engagement.",
    sortOrder: 4,
    published: true,
  },
  {
    title: "Content Creation",
    slug: "content-creation",
    icon: "pen-line",
    shortDescription: "Content designed to educate, engage and turn attention into action.",
    fullDescription:
      "Content designed to educate, engage and turn attention into action — from social graphics and reels to website copy, articles and campaign creative.",
    idealClient:
      "Businesses that need a steady flow of on-brand content without assembling a full in-house creative team.",
    deliverables: [
      "Static social media graphics",
      "Carousel posts",
      "Reels",
      "Short-form video editing",
      "Reel concepts",
      "Script and shot-list direction",
      "On-site content sessions",
      "Content shoots",
      "Monthly content batches",
      "Blog articles",
      "SEO articles",
      "Website copywriting",
      "Ad creative",
      "Marketing graphics",
    ].join("\n"),
    outcomes: "Content that looks like the brand and gives people a reason to pay attention.",
    ctaLabel: "Create Content",
    ctaUrl: "/contact?service=Multiple Services",
    seoTitle: "Content Creation | Lynora",
    seoDescription: "Content designed to educate, engage and turn attention into action.",
    sortOrder: 5,
    published: true,
  },
  {
    title: "Paid Advertising",
    slug: "paid-advertising",
    icon: "target",
    shortDescription:
      "Paid campaigns focused on reaching the right audience and generating measurable business results.",
    fullDescription:
      "Paid campaigns focused on reaching the right audience and generating measurable business results across Meta and Google.",
    idealClient:
      "Businesses ready to invest in paid attention and willing to measure results against real enquiries or sales.",
    deliverables: [
      "Meta Ads setup",
      "Meta Ads management",
      "Facebook advertising",
      "Instagram advertising",
      "Google Ads setup",
      "Google Ads management",
      "Search campaigns",
      "Audience targeting",
      "Conversion tracking",
      "Campaign optimisation",
      "Budget monitoring",
      "Multi-channel ad campaigns",
      "Campaign reporting",
    ].join("\n"),
    outcomes: "Paid campaigns with a clearer objective and a better path from attention to enquiry.",
    ctaLabel: "Launch a Campaign",
    ctaUrl: "/contact?service=Paid Ads",
    seoTitle: "Paid Advertising | Lynora",
    seoDescription:
      "Paid campaigns focused on reaching the right audience and generating measurable business results.",
    sortOrder: 6,
    published: true,
  },
  {
    title: "SEO & Search Visibility",
    slug: "seo-search-visibility",
    icon: "search",
    shortDescription:
      "Improve your visibility when potential customers are actively searching for the services you offer.",
    fullDescription:
      "Improve your visibility when potential customers are actively searching for the services you offer — through practical on-page, technical and local search work.",
    idealClient:
      "Local and international businesses that want to be discovered through search rather than relying only on ads or referrals.",
    deliverables: [
      "SEO audits",
      "On-page SEO",
      "Technical SEO",
      "Local SEO",
      "Keyword research",
      "Keyword tracking",
      "Search optimisation",
      "Website performance improvements",
      "Google Business optimisation",
      "SEO content",
      "Search reporting",
    ].join("\n"),
    outcomes: "A website that is easier for people — and search engines — to understand and find.",
    ctaLabel: "Improve My Visibility",
    ctaUrl: "/contact?service=SEO",
    seoTitle: "SEO & Search Visibility | Lynora",
    seoDescription:
      "Improve your visibility when potential customers are actively searching for the services you offer.",
    sortOrder: 7,
    published: true,
  },
  {
    title: "Email Marketing & Lead Generation",
    slug: "email-marketing-lead-generation",
    icon: "mail",
    shortDescription:
      "Turn website visitors and existing audiences into leads through email and conversion-focused funnels.",
    fullDescription:
      "Turn website visitors and existing audiences into leads through email and conversion-focused funnels — with templates, campaigns and the pages that collect the enquiry.",
    idealClient:
      "Businesses that already attract some attention and want a clearer way to follow up and convert it.",
    deliverables: [
      "Email marketing setup",
      "Email template design",
      "Email campaign design",
      "Email copywriting",
      "Campaign scheduling",
      "Monthly email marketing",
      "Mailing-list structure",
      "Lead magnets",
      "Landing pages",
      "Lead-generation funnels",
      "Forms",
      "Basic automation",
      "Conversion-focused landing pages",
    ].join("\n"),
    outcomes: "A clearer path from attention to enquiry, and a list you can keep speaking to.",
    ctaLabel: "Generate More Leads",
    ctaUrl: "/contact?service=Digital Marketing",
    seoTitle: "Email Marketing & Lead Generation | Lynora",
    seoDescription:
      "Turn website visitors and existing audiences into leads through email and conversion-focused funnels.",
    sortOrder: 8,
    published: true,
  },
  {
    title: "Consulting & Strategy",
    slug: "marketing-strategy",
    icon: "compass",
    shortDescription:
      "Practical advice and clear strategy for businesses that need direction before committing to a larger project.",
    fullDescription:
      "Practical advice and clear strategy for businesses that need direction before committing to a larger project — reviews, workshops and recommendations you can act on.",
    idealClient:
      "Owners who want a clear next step before investing in a website, brand or campaign.",
    deliverables: [
      "Brand consultations",
      "Marketing consultations",
      "Strategy workshops",
      "Digital presence reviews",
      "Website reviews",
      "Marketing audits",
      "Growth recommendations",
      "Campaign planning",
      "Brand positioning advice",
    ].join("\n"),
    outcomes: "A clearer recommendation for where to start, and why.",
    ctaLabel: "Book a Consultation",
    ctaUrl: "/contact?service=Marketing Strategy",
    seoTitle: "Consulting & Strategy | Lynora",
    seoDescription:
      "Practical advice and clear strategy for businesses that need direction before committing to a larger project.",
    sortOrder: 9,
    published: true,
  },
];

export const services = serviceCatalog;
