import Image from "next/image";
import { ButtonLink } from "@/components/public/ButtonLink";
import { Container } from "@/components/public/Container";
import { ProjectCard } from "@/components/public/ProjectCard";
import { SectionHeading } from "@/components/public/SectionHeading";
import { ServiceCard } from "@/components/public/ServiceCard";
import type { SiteSettings } from "@/lib/constants";
import { FadeIn, Stagger, StaggerItem } from "@/lib/motion";
import { whatsappLink } from "@/lib/utils";

type Section = {
  key: string;
  heading?: string | null;
  subheading?: string | null;
  paragraph?: string | null;
  ctaLabel?: string | null;
  ctaUrl?: string | null;
  image?: string | null;
  extra?: unknown;
};

function extraOf<T>(value: unknown) {
  return (value || {}) as T;
}

export function IntroSection({ section }: { section?: Section }) {
  if (!section) return null;
  return (
    <section id="intro" className="py-24 md:py-32">
      <Container className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
        <SectionHeading
          label={section.subheading || "What we do"}
          title={section.heading || "We build digital experiences that make businesses easier to discover, trust and choose."}
        />
        <FadeIn>
          <div className="gold-line mb-6" />
          <p className="text-base leading-8 text-stone">{section.paragraph}</p>
        </FadeIn>
      </Container>
    </section>
  );
}

export function ServicesSection({
  section,
  services,
}: {
  section?: Section;
  services: {
    title: string;
    slug: string;
    shortDescription: string;
    icon: string;
    deliverables?: string;
    ctaLabel?: string;
    ctaUrl?: string;
  }[];
}) {
  if (!section) return null;
  return (
    <section className="py-24 md:py-32">
      <Container>
        <div className="mb-12">
          <SectionHeading
            label={section.subheading || "Services"}
            title={section.heading || "Everything Your Business Needs to Grow Online"}
            description={
              section.paragraph ||
              "From websites and branding to marketing and content, Lynora brings the pieces of your digital presence together."
            }
          />
        </div>
        <Stagger className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {services.map((service) => (
            <StaggerItem key={service.slug}>
              <ServiceCard {...service} />
            </StaggerItem>
          ))}
        </Stagger>
        {section.ctaLabel ? (
          <div className="mt-10 text-center">
            <ButtonLink href={section.ctaUrl || "/services"} variant="secondary">
              {section.ctaLabel}
            </ButtonLink>
          </div>
        ) : null}
      </Container>
    </section>
  );
}

export function FeaturedWorkSection({
  section,
  projects,
}: {
  section?: Section;
  projects: {
    title: string;
    slug: string;
    industry: string;
    projectType: string;
    status: string;
    services: string[];
    summary: string;
    coverImage?: string | null;
  }[];
}) {
  if (!section) return null;
  return (
    <section className="py-24 md:py-32">
      <Container>
        <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            label={section.subheading || "Selected work"}
            title={section.heading}
            description={section.paragraph}
          />
          {section.ctaLabel ? (
            <ButtonLink href={section.ctaUrl || "/work"} variant="secondary">
              {section.ctaLabel}
            </ButtonLink>
          ) : null}
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((project) => (
            <ProjectCard key={project.slug} {...project} />
          ))}
        </div>
      </Container>
    </section>
  );
}

export function WhyLynoraSection({ section }: { section?: Section }) {
  if (!section) return null;
  const extra = extraOf<{ pillars?: { number: string; title: string }[] }>(section.extra);
  const pillars = extra.pillars || [
    { number: "01", title: "Clear Strategy" },
    { number: "02", title: "Premium Design" },
    { number: "03", title: "Purposeful Development" },
    { number: "04", title: "Growth-Focused Marketing" },
  ];

  return (
    <section className="relative overflow-hidden py-24 md:py-32">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(201,165,92,0.1),transparent_30%)]" />
      <Container className="relative">
        <SectionHeading label={section.subheading || "Why Lynora"} title={section.heading} />
        <p className="mt-6 max-w-2xl text-base leading-8 text-stone">{section.paragraph}</p>
        <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {pillars.map((pillar) => (
            <div key={pillar.number} className="rounded-[24px] border border-gold/20 bg-ink-elevated/80 p-6">
              <p className="font-serif text-4xl text-gold">{pillar.number}</p>
              <h3 className="mt-4 text-[0.78rem] tracking-[0.2em] uppercase text-ivory">{pillar.title}</h3>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

export function AuditCtaSection({ section }: { section?: Section }) {
  if (!section) return null;
  const extra = extraOf<{ notes?: string }>(section.extra);
  return (
    <section className="py-24">
      <Container>
        <div className="overflow-hidden rounded-[30px] border border-gold/20 bg-[linear-gradient(135deg,rgba(201,165,92,0.12),rgba(8,8,8,0.9))] px-6 py-12 md:px-14">
          <p className="section-label">Website review</p>
          <h2 className="mt-5 max-w-3xl font-serif text-4xl text-ivory sm:text-5xl">{section.heading}</h2>
          <p className="mt-5 max-w-2xl text-base leading-8 text-stone">{section.paragraph}</p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
            <ButtonLink href={section.ctaUrl || "/contact?intent=review"}>{section.ctaLabel || "Get a Free Website Review"}</ButtonLink>
            <p className="text-sm text-gold/80">{extra.notes || "No obligation. No hard sell."}</p>
          </div>
        </div>
      </Container>
    </section>
  );
}

export function AboutPreviewSection({ section }: { section?: Section }) {
  if (!section) return null;
  const extra = extraOf<{ founder?: string; founderLabel?: string; image?: string }>(section.extra);
  return (
    <section className="py-24 md:py-32">
      <Container className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <SectionHeading label={section.subheading || "About Lynora"} title={section.heading} />
          <div className="mt-6 space-y-4 whitespace-pre-line text-base leading-8 text-stone">
            {section.paragraph}
          </div>
          <p className="mt-8 text-[0.72rem] tracking-[0.2em] uppercase text-gold">
            {extra.founderLabel || "Founder"} · {extra.founder || "Zaghrah Anthony"}
          </p>
          {section.ctaLabel ? (
            <div className="mt-8">
              <ButtonLink href={section.ctaUrl || "/about"} variant="secondary">
                {section.ctaLabel}
              </ButtonLink>
            </div>
          ) : null}
        </div>
        <div className="relative aspect-[4/5] overflow-hidden rounded-[28px] border border-gold/15">
          <Image
            src={section.image || extra.image || "/branding/founder-placeholder.svg"}
            alt={extra.founder || "Zaghrah Anthony"}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 40vw"
          />
        </div>
      </Container>
    </section>
  );
}

export function FinalCtaSection({
  section,
  settings,
}: {
  section?: Section;
  settings: SiteSettings;
}) {
  if (!section) return null;
  const extra = extraOf<{ secondaryCtaLabel?: string; secondaryCtaUrl?: string }>(section.extra);
  const whatsapp = extra.secondaryCtaUrl === "whatsapp" ? whatsappLink(settings.whatsapp) : extra.secondaryCtaUrl || whatsappLink(settings.whatsapp);

  return (
    <section className="relative overflow-hidden py-28">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_40%,rgba(201,165,92,0.14),transparent_28%)]" />
      <Container className="relative text-center">
        <h2 className="font-serif text-5xl text-ivory sm:text-6xl">{section.heading}</h2>
        <p className="mx-auto mt-6 max-w-xl text-base leading-8 text-stone">{section.paragraph}</p>
        <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
          <ButtonLink href={section.ctaUrl || "/contact"}>{section.ctaLabel || "Start a Project"}</ButtonLink>
          <ButtonLink href={whatsapp} variant="gold-outline">
            {extra.secondaryCtaLabel || "WhatsApp Us"}
          </ButtonLink>
        </div>
        <div className="mt-12 space-y-2 text-sm text-stone">
          <p>{settings.email}</p>
          <p>{settings.whatsapp}</p>
          <p>{settings.location}</p>
          <p className="pt-3 text-gold/80">Working with clients locally and internationally.</p>
        </div>
      </Container>
    </section>
  );
}
