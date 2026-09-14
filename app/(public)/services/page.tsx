import { Container } from "@/components/public/Container";
import { ServiceCard } from "@/components/public/ServiceCard";
import { ServicesQuoteCta } from "@/components/public/ServicesQuoteCta";
import { FadeIn, Stagger, StaggerItem } from "@/lib/motion";
import { getPageBySlug, getPublishedServices, getSiteSettings, sectionMap } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata() {
  const page = await getPageBySlug("services");
  return buildMetadata({
    title: page?.seoTitle || "Digital Services | Lynora",
    description:
      page?.seoDescription ||
      "From websites and branding to marketing and content, Lynora brings the pieces of your digital presence together.",
    path: "/services",
  });
}

export default async function ServicesPage() {
  const [page, services, settings] = await Promise.all([
    getPageBySlug("services"),
    getPublishedServices(),
    getSiteSettings(),
  ]);
  const hero = sectionMap(page?.sections).hero;

  return (
    <div className="pt-32 pb-24">
      <Container>
        <FadeIn className="mx-auto max-w-3xl text-center">
          <p className="section-label">{hero?.subheading || "Services"}</p>
          <h1 className="mt-5 font-serif text-4xl text-ivory sm:text-5xl md:text-6xl">
            {hero?.heading || "Everything Your Business Needs to Grow Online"}
          </h1>
          <p className="mt-6 text-lg leading-8 text-stone">
            {hero?.paragraph ||
              "From websites and branding to marketing and content, Lynora brings the pieces of your digital presence together."}
          </p>
        </FadeIn>
        <Stagger className="mt-16 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {services.map((service) => (
            <StaggerItem key={service.slug}>
              <ServiceCard
                title={service.title}
                slug={service.slug}
                shortDescription={service.shortDescription}
                icon={service.icon}
                deliverables={service.deliverables}
                ctaLabel={service.ctaLabel}
                ctaUrl={service.ctaUrl}
              />
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
      <ServicesQuoteCta settings={settings} />
    </div>
  );
}
