import { notFound } from "next/navigation";
import { ButtonLink } from "@/components/public/ButtonLink";
import { Container } from "@/components/public/Container";
import { ServiceIcon } from "@/components/public/icons";
import { prisma } from "@/lib/db";
import { getPublishedServices } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";
import { splitLines } from "@/lib/utils";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = await prisma.service.findFirst({ where: { slug, published: true } }).catch(() => null);
  if (!service) return buildMetadata({ path: `/services/${slug}` });
  return buildMetadata({
    title: service.seoTitle || `${service.title} | Lynora`,
    description: service.seoDescription || service.shortDescription,
    path: `/services/${slug}`,
  });
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const services = await getPublishedServices();
  const service = services.find((item) => item.slug === slug);
  if (!service) notFound();

  return (
    <div className="pt-32 pb-24">
      <Container className="max-w-4xl">
        <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl border border-gold/20 text-gold">
          <ServiceIcon name={service.icon} className="h-5 w-5" />
        </div>
        <p className="section-label">Service</p>
        <h1 className="mt-4 font-serif text-5xl text-ivory">{service.title}</h1>
        <p className="mt-6 text-lg leading-8 text-stone">{service.fullDescription}</p>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          <div className="rounded-[22px] border border-gold/15 p-5">
            <p className="section-label">Ideal client</p>
            <p className="mt-3 text-sm leading-7 text-stone">{service.idealClient}</p>
          </div>
          <div className="rounded-[22px] border border-gold/15 p-5">
            <p className="section-label">Deliverables</p>
            <ul className="mt-3 space-y-2 text-sm text-stone">
              {splitLines(service.deliverables).map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-[22px] border border-gold/15 p-5">
            <p className="section-label">Outcomes</p>
            <p className="mt-3 text-sm leading-7 text-stone">{service.outcomes}</p>
          </div>
        </div>
        <div className="mt-10">
          <ButtonLink href={service.ctaUrl || "/contact"}>{service.ctaLabel}</ButtonLink>
        </div>
      </Container>
    </div>
  );
}
