import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/public/Breadcrumbs";
import { ButtonLink } from "@/components/public/ButtonLink";
import { Container } from "@/components/public/Container";
import { JsonLd } from "@/components/public/JsonLd";
import { ServiceIcon } from "@/components/public/icons";
import { prisma } from "@/lib/db";
import { getPublishedServices } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbJsonLd, serviceJsonLd } from "@/lib/structured-data";
import { splitLines } from "@/lib/utils";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = await prisma.service.findFirst({ where: { slug, published: true } }).catch(() => null);
  if (!service) return buildMetadata({ path: `/services/${slug}` });
  return buildMetadata({
    title: service.seoTitle || `${service.title} | Lynora`,
    description: service.seoDescription || service.shortDescription,
    ogImage: service.coverImage,
    path: `/services/${slug}`,
  });
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const services = await getPublishedServices();
  const service = services.find((item) => item.slug === slug);
  if (!service) notFound();

  const crumbs = [
    { href: "/", label: "Home" },
    { href: "/services", label: "Services" },
    { href: `/services/${service.slug}`, label: service.title },
  ];

  return (
    <div className="pt-32 pb-24">
      <JsonLd data={[breadcrumbJsonLd(crumbs), serviceJsonLd(service)]} />
      <Container className="max-w-4xl">
        <Breadcrumbs items={crumbs} />
        <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl border border-gold/20 text-gold">
          <ServiceIcon name={service.icon} className="h-5 w-5" />
        </div>
        <p className="section-label">Service</p>
        <h1 className="mt-4 font-serif text-5xl text-ivory">{service.title}</h1>
        <p className="mt-6 text-lg leading-8 text-stone">{service.fullDescription}</p>
        <div className="mt-16 divide-y divide-gold/15 border-y border-gold/15">
          <section className="grid gap-4 py-10 md:grid-cols-[11rem_1fr] md:items-start md:gap-16 md:py-12">
            <p className="section-label">Ideal client</p>
            <p className="max-w-2xl text-base leading-8 text-ivory/85">{service.idealClient}</p>
          </section>
          <section className="grid gap-4 py-10 md:grid-cols-[11rem_1fr] md:items-start md:gap-16 md:py-12">
            <p className="section-label">Deliverables</p>
            <ul className="max-w-2xl space-y-3">
              {splitLines(service.deliverables).map((item) => (
                <li key={item} className="flex gap-3 text-base leading-7 text-ivory/85">
                  <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>
          <section className="grid gap-4 py-10 md:grid-cols-[11rem_1fr] md:items-start md:gap-16 md:py-12">
            <p className="section-label">Outcomes</p>
            <p className="max-w-2xl text-base leading-8 text-ivory/85">{service.outcomes}</p>
          </section>
        </div>
        <div className="mt-10">
          <ButtonLink href={service.ctaUrl || "/contact"}>{service.ctaLabel}</ButtonLink>
        </div>
      </Container>
    </div>
  );
}
