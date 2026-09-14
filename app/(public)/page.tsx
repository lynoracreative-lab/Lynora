import { FAQ } from "@/components/public/FAQ";
import { Hero } from "@/components/public/Hero";
import { ServicesQuoteCta } from "@/components/public/ServicesQuoteCta";
import {
  AboutPreviewSection,
  AuditCtaSection,
  FeaturedWorkSection,
  FinalCtaSection,
  IntroSection,
  ServicesSection,
  WhyLynoraSection,
} from "@/components/public/HomeSections";
import { Process } from "@/components/public/Process";
import { Testimonials } from "@/components/public/Testimonials";
import {
  getPageBySlug,
  getPublishedFaqs,
  getPublishedProjects,
  getPublishedServices,
  getPublishedTestimonials,
  getSiteSettings,
  sectionMap,
} from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata() {
  const page = await getPageBySlug("home");
  return buildMetadata({
    title: page?.seoTitle,
    description: page?.seoDescription,
    ogImage: page?.ogImage,
    noIndex: page?.noIndex,
    path: "/",
  });
}

export default async function HomePage() {
  const [page, services, projects, testimonials, faqs, settings] = await Promise.all([
    getPageBySlug("home"),
    getPublishedServices(),
    getPublishedProjects({ featured: true }),
    getPublishedTestimonials(),
    getPublishedFaqs(),
    getSiteSettings(),
  ]);

  const sections = sectionMap(page?.sections);
  const enabled = (key: string) => !sections[key] || sections[key].enabled !== false;

  return (
    <>
      {enabled("hero") ? (
        <Hero
          heading={sections.hero?.heading}
          subheading={sections.hero?.subheading}
          paragraph={sections.hero?.paragraph}
          ctaLabel={sections.hero?.ctaLabel}
          ctaUrl={sections.hero?.ctaUrl}
          extra={sections.hero?.extra as never}
        />
      ) : null}
      {enabled("intro") ? <IntroSection section={sections.intro} /> : null}
      {enabled("services") ? <ServicesSection section={sections.services} services={services} /> : null}
      {enabled("services") ? <ServicesQuoteCta settings={settings} /> : null}
      {enabled("featuredWork") ? (
        <FeaturedWorkSection section={sections.featuredWork} projects={projects.slice(0, 4)} />
      ) : null}
      {enabled("whyLynora") ? <WhyLynoraSection section={sections.whyLynora} /> : null}
      {enabled("process") ? (
        <Process
          heading={sections.process?.heading}
          label={sections.process?.subheading}
          steps={
            (sections.process?.extra as { steps?: { number: string; title: string; text: string }[] } | undefined)
              ?.steps
          }
        />
      ) : null}
      {enabled("auditCta") ? <AuditCtaSection section={sections.auditCta} /> : null}
      {enabled("aboutPreview") ? <AboutPreviewSection section={sections.aboutPreview} /> : null}
      {enabled("testimonials") ? (
        <Testimonials
          heading={sections.testimonials?.heading}
          label={sections.testimonials?.subheading}
          description={sections.testimonials?.paragraph}
          items={testimonials}
        />
      ) : null}
      {enabled("faq") ? (
        <FAQ heading={sections.faq?.heading} label={sections.faq?.subheading} items={faqs} />
      ) : null}
      {enabled("finalCta") ? <FinalCtaSection section={sections.finalCta} settings={settings} /> : null}
    </>
  );
}
