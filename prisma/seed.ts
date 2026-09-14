import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { serviceCatalog } from "../data/services";
import { DEFAULT_SETTINGS } from "../lib/constants";
import { fallbackFaqs, fallbackProjects, fallbackTestimonials } from "../lib/fallback";

const prisma = new PrismaClient();

const services = serviceCatalog;

async function main() {
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminEmail || !adminPassword) {
    throw new Error("Set ADMIN_EMAIL and ADMIN_PASSWORD in your .env file before seeding.");
  }

  const password = await bcrypt.hash(adminPassword, 12);

  await prisma.user.upsert({
    where: { email: adminEmail },
    update: { name: "Zaghrah Anthony", role: "ADMIN", active: true },
    create: {
      name: "Zaghrah Anthony",
      email: adminEmail,
      password,
      role: "ADMIN",
      active: true,
    },
  });

  for (const [key, value] of Object.entries(DEFAULT_SETTINGS)) {
    await prisma.siteSetting.upsert({
      where: { key },
      update: {},
      create: { key, value },
    });
  }

  for (const service of services) {
    await prisma.service.upsert({
      where: { slug: service.slug },
      update: service,
      create: service,
    });
  }

  await prisma.service.updateMany({
    where: { slug: "app-design-development" },
    data: { published: false },
  });

  const home = await prisma.page.upsert({
    where: { slug: "home" },
    update: {},
    create: {
      slug: "home",
      title: "Home",
      seoTitle: DEFAULT_SETTINGS.defaultSeoTitle,
      seoDescription: DEFAULT_SETTINGS.defaultSeoDescription,
      published: true,
    },
  });

  const about = await prisma.page.upsert({
    where: { slug: "about" },
    update: {},
    create: {
      slug: "about",
      title: "About",
      seoTitle: "About Lynora | Digital Studio",
      seoDescription:
        "Lynora is a Cape Town digital studio helping businesses bring websites, branding and marketing together.",
      published: true,
    },
  });

  const servicesPage = await prisma.page.upsert({
    where: { slug: "services" },
    update: {},
    create: {
      slug: "services",
      title: "Services",
      seoTitle: "Digital Services | Lynora",
      seoDescription:
        "Website design, branding, digital marketing, SEO, paid advertising, apps and marketing strategy from Lynora.",
      published: true,
    },
  });

  const work = await prisma.page.upsert({
    where: { slug: "work" },
    update: {},
    create: {
      slug: "work",
      title: "Work",
      seoTitle: "Selected Work | Lynora",
      seoDescription: "Selected website, branding and digital projects from Lynora.",
      published: true,
    },
  });

  const contact = await prisma.page.upsert({
    where: { slug: "contact" },
    update: {},
    create: {
      slug: "contact",
      title: "Contact",
      seoTitle: "Start a Project | Lynora",
      seoDescription: "Tell Lynora where your business is now and where you want it to go.",
      published: true,
    },
  });

  const blog = await prisma.page.upsert({
    where: { slug: "blog" },
    update: {},
    create: {
      slug: "blog",
      title: "Journal",
      seoTitle: "Journal | Lynora",
      seoDescription: "Notes on websites, branding, marketing and digital growth from Lynora.",
      published: true,
    },
  });

  const homeSections = [
    {
      key: "hero",
      heading: "Ideas Engineered for What’s Next",
      subheading: "Where curiosity meets technology.",
      paragraph:
        "We help businesses build stronger digital identities through websites, branding and marketing designed to turn attention into growth.",
      ctaLabel: "Start a Project",
      ctaUrl: "/contact",
      extra: {
        label: "Lynora Digital Studio",
        line1: "Ideas",
        line2: "Engineered",
        line3: "for What’s Next",
        goldText: "What’s Next",
        secondaryCtaLabel: "View Our Work",
        secondaryCtaUrl: "/work",
        trustedBy: ["Web Design", "Branding", "Marketing", "Strategy", "Digital Growth"],
      },
    },
    {
      key: "intro",
      heading: "We build digital experiences that make businesses easier to discover, trust and choose.",
      subheading: "What we do",
      paragraph:
        "Lynora brings together strategy, design, development and marketing to create digital experiences that look professional and perform with purpose.",
    },
    {
      key: "services",
      heading: "Everything Your Business Needs to Grow Online",
      subheading: "Services",
      paragraph:
        "From websites and branding to marketing and content, Lynora brings the pieces of your digital presence together.",
      ctaLabel: "Explore Services",
      ctaUrl: "/services",
    },
    {
      key: "featuredWork",
      heading: "Digital work designed to move businesses forward.",
      subheading: "Selected work",
      paragraph: "A mix of concept studies and in-house work while the public portfolio grows.",
      ctaLabel: "View all work",
      ctaUrl: "/work",
    },
    {
      key: "whyLynora",
      heading: "Not just better design. Better business presentation.",
      subheading: "Why Lynora",
      paragraph:
        "Every project is built around how your business should look, communicate and convert — not just what looks good on screen.",
      extra: {
        pillars: [
          { number: "01", title: "Clear Strategy" },
          { number: "02", title: "Premium Design" },
          { number: "03", title: "Purposeful Development" },
          { number: "04", title: "Growth-Focused Marketing" },
        ],
      },
    },
    {
      key: "process",
      heading: "From idea to launch.",
      subheading: "How we work",
      extra: {
        steps: [
          {
            number: "01",
            title: "Discover",
            text: "We learn about your business, audience, goals and current challenges.",
          },
          {
            number: "02",
            title: "Strategy",
            text: "We identify what your business actually needs and build the direction.",
          },
          {
            number: "03",
            title: "Design",
            text: "We create the visual experience and refine the details.",
          },
          {
            number: "04",
            title: "Build",
            text: "We develop, test and optimise the final product.",
          },
          {
            number: "05",
            title: "Grow",
            text: "We support your launch with marketing, optimisation and ongoing improvements.",
          },
        ],
      },
    },
    {
      key: "auditCta",
      heading: "Not sure if your website needs work?",
      paragraph:
        "Send us your website and we’ll share three things we think could improve your online presence.",
      ctaLabel: "Get a Free Website Review",
      ctaUrl: "/contact?intent=review",
      extra: { notes: "No obligation. No hard sell." },
    },
    {
      key: "aboutPreview",
      heading: "Built for businesses that want to move forward.",
      subheading: "About Lynora",
      paragraph:
        "Lynora was created to help businesses bring together the parts of their digital presence that are too often disconnected.\n\nWebsite. Branding. Marketing.\n\nOur goal is simple: help businesses present themselves with confidence and turn their digital presence into something that supports real growth.",
      ctaLabel: "Meet Lynora",
      ctaUrl: "/about",
      extra: { founder: "Zaghrah Anthony", founderLabel: "Founder" },
    },
    {
      key: "testimonials",
      heading: "What collaboration can feel like",
      subheading: "Notes",
      paragraph: "These are sample testimonials — replace them with client reviews from the admin dashboard.",
    },
    {
      key: "faq",
      heading: "Questions, answered plainly.",
      subheading: "FAQ",
    },
    {
      key: "finalCta",
      heading: "Ready to build something better?",
      paragraph: "Tell us where your business is now and where you want it to go.",
      ctaLabel: "Start a Project",
      ctaUrl: "/contact",
      extra: { secondaryCtaLabel: "WhatsApp Us", secondaryCtaUrl: "whatsapp" },
    },
  ];

  for (const [index, section] of homeSections.entries()) {
    await prisma.pageSection.upsert({
      where: { pageId_key: { pageId: home.id, key: section.key } },
      update:
        section.key === "services"
          ? {
              heading: section.heading,
              subheading: section.subheading,
              paragraph: section.paragraph,
              ctaLabel: section.ctaLabel,
              ctaUrl: section.ctaUrl,
            }
          : {},
      create: {
        pageId: home.id,
        key: section.key,
        heading: section.heading,
        subheading: section.subheading,
        paragraph: section.paragraph,
        ctaLabel: section.ctaLabel,
        ctaUrl: section.ctaUrl,
        enabled: true,
        sortOrder: index + 1,
        extra: section.extra,
      },
    });
  }

  const aboutSections = [
    {
      key: "story",
      heading: "Built for businesses that want to move forward.",
      subheading: "The Lynora story",
      paragraph:
        "Lynora was created to help businesses bring together the parts of their digital presence that are too often disconnected. Website. Branding. Marketing. Too many businesses are asked to choose one, then wonder why the rest never quite matches.",
    },
    {
      key: "mission",
      heading: "Help businesses present themselves with confidence.",
      subheading: "Mission",
      paragraph:
        "Our goal is simple: help businesses present themselves with confidence and turn their digital presence into something that supports real growth — locally and internationally.",
    },
    {
      key: "values",
      heading: "The way we work.",
      subheading: "Values",
      extra: {
        values: [
          { title: "Curiosity", text: "We start by asking better questions about the business, the customer and the constraint." },
          { title: "Clarity", text: "If a visitor cannot understand the offer quickly, the design is not finished." },
          { title: "Craft", text: "Details, spacing, type and tone are treated as part of the commercial work, not decoration." },
          { title: "Innovation", text: "We use current tools and thoughtful technology where they make the work stronger." },
          { title: "Purpose", text: "Every page, campaign and identity decision should help the business move forward." },
        ],
      },
    },
    {
      key: "founder",
      heading: "Zaghrah Anthony",
      subheading: "Founder",
      paragraph:
        "Lynora is led by Zaghrah Anthony — a founder-focused studio practice built around premium digital presentation, clear thinking and work that is meant to convert.",
      extra: { image: "/branding/founder-placeholder.svg" },
    },
    {
      key: "capabilities",
      heading: "One studio. The parts that usually sit apart.",
      subheading: "Capabilities",
      paragraph:
        "Website design and development. Branding and visual identity. Digital marketing. Social. SEO. Paid advertising. App design. Marketing strategy.",
    },
    {
      key: "whyChoose",
      heading: "Why choose Lynora",
      paragraph:
        "Because the website, the brand and the marketing should feel like they belong to the same business. Lynora is built for owners who want that to be true — and who want the work to look as considered as the service they already deliver.",
    },
  ];

  for (const [index, section] of aboutSections.entries()) {
    await prisma.pageSection.upsert({
      where: { pageId_key: { pageId: about.id, key: section.key } },
      update: {},
      create: {
        pageId: about.id,
        key: section.key,
        heading: section.heading,
        subheading: section.subheading,
        paragraph: section.paragraph,
        enabled: true,
        sortOrder: index + 1,
        extra: section.extra,
      },
    });
  }

  await prisma.pageSection.upsert({
    where: { pageId_key: { pageId: servicesPage.id, key: "hero" } },
    update: {
      heading: "Everything Your Business Needs to Grow Online",
      subheading: "Services",
      paragraph:
        "From websites and branding to marketing and content, Lynora brings the pieces of your digital presence together.",
    },
    create: {
      pageId: servicesPage.id,
      key: "hero",
      heading: "Everything Your Business Needs to Grow Online",
      subheading: "Services",
      paragraph:
        "From websites and branding to marketing and content, Lynora brings the pieces of your digital presence together.",
      enabled: true,
      sortOrder: 1,
    },
  });

  await prisma.pageSection.upsert({
    where: { pageId_key: { pageId: work.id, key: "hero" } },
    update: {},
    create: {
      pageId: work.id,
      key: "hero",
      heading: "Selected work",
      subheading: "Portfolio",
      paragraph:
        "Concept studies and in-house work that show how Lynora thinks about industries, offers and presentation.",
      enabled: true,
      sortOrder: 1,
    },
  });

  await prisma.pageSection.upsert({
    where: { pageId_key: { pageId: contact.id, key: "hero" } },
    update: {},
    create: {
      pageId: contact.id,
      key: "hero",
      heading: "Tell us where you want the business to go.",
      subheading: "Start a project",
      paragraph:
        "Share a little context. We will come back with a clear next step — not a hard sell.",
      enabled: true,
      sortOrder: 1,
    },
  });

  await prisma.pageSection.upsert({
    where: { pageId_key: { pageId: blog.id, key: "hero" } },
    update: {},
    create: {
      pageId: blog.id,
      key: "hero",
      heading: "Notes on craft, growth and digital presence.",
      subheading: "Journal",
      paragraph: "Writing from the studio on websites, branding and the work of being found.",
      enabled: true,
      sortOrder: 1,
    },
  });

  for (const project of fallbackProjects) {
    await prisma.project.upsert({
      where: { slug: project.slug },
      update: {},
      create: {
        title: project.title,
        slug: project.slug,
        industry: project.industry,
        projectType: project.projectType,
        status: project.status,
        services: project.services,
        summary: project.summary,
        coverImage: project.coverImage,
        problem: project.problem,
        solution: project.solution,
        results: project.results,
        featured: true,
        published: true,
        seoTitle: `${project.title} | Lynora`,
        seoDescription: project.summary,
      },
    });
  }

  for (const item of fallbackTestimonials) {
    const existing = await prisma.testimonial.findFirst({
      where: { quote: item.quote },
    });
    if (!existing) {
      await prisma.testimonial.create({
        data: {
          clientName: item.clientName,
          company: item.company,
          role: item.role,
          quote: item.quote,
          featured: true,
          published: true,
          sortOrder: item.sortOrder,
        },
      });
    }
  }

  for (const item of fallbackFaqs) {
    const existing = await prisma.faq.findFirst({ where: { question: item.question } });
    if (!existing) {
      await prisma.faq.create({
        data: {
          question: item.question,
          answer: item.answer,
          category: item.category,
          published: true,
          sortOrder: item.sortOrder,
        },
      });
    } else if (existing.answer !== item.answer) {
      await prisma.faq.update({
        where: { id: existing.id },
        data: { answer: item.answer, category: item.category },
      });
    }
  }

  console.log("Lynora seed complete.");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
