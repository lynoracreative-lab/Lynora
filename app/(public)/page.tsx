import { Hero } from "@/components/public/Hero";
import {
  AboutPreviewSection,
  FeaturedWorkSection,
  FinalCtaSection,
  IntroSection,
  ProcessPreviewSection,
  ServicesSection,
} from "@/components/public/HomeSections";
import {
  getPageBySlug,
  getPublishedProjects,
  getPublishedServices,
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
  const [page, services, projects, settings] = await Promise.all([
    getPageBySlug("home"),
    getPublishedServices(),
    getPublishedProjects({ featured: true }),
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
      {enabled("featuredWork") ? (
        <FeaturedWorkSection section={sections.featuredWork} projects={projects.slice(0, 2)} />
      ) : null}
      {enabled("process") ? <ProcessPreviewSection section={sections.process} /> : null}
      {enabled("aboutPreview") ? <AboutPreviewSection section={sections.aboutPreview} /> : null}
      {enabled("finalCta") ? <FinalCtaSection section={sections.finalCta} settings={settings} /> : null}
    </>
  );
}
