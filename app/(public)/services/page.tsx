import { Container } from "@/components/public/Container";
import { JsonLd } from "@/components/public/JsonLd";
import { ServiceCard } from "@/components/public/ServiceCard";
import { ServicesQuoteCta } from "@/components/public/ServicesQuoteCta";
import { FadeIn, Stagger, StaggerItem } from "@/lib/motion";
import { getPageBySlug, getPublishedServices, getSiteSettings, sectionMap } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";
import { itemListJsonLd } from "@/lib/structured-data";
import { siteUrl } from "@/lib/utils";

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
    <div className="pt-28 pb-16">
      <JsonLd
        data={itemListJsonLd(
          services.map((service) => ({
            name: service.title,
            url: siteUrl(`/services/${service.slug}`),
          })),
        )}
      />
      <Container>
        <FadeIn className="mx-auto max-w-3xl text-center">
          <p className="section-label">{hero?.subheading || "Services"}</p>
          <h1 className="mt-3 font-serif text-4xl leading-[1.1] text-ivory sm:text-5xl md:text-6xl">
            {hero?.heading || "Everything your business needs to grow online"}
          </h1>
          <p className="prose-quiet mt-4">
            {hero?.paragraph ||
              "From websites and branding to marketing and content, Lynora brings the pieces of your digital presence together."}
          </p>
        </FadeIn>
        <Stagger className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
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
