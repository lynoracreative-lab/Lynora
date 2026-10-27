import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/public/ButtonLink";
import { Container } from "@/components/public/Container";
import { ProcessSteps, resolveProcessSteps } from "@/components/public/Process";
import { ProjectCard } from "@/components/public/ProjectCard";
import { SectionHeading } from "@/components/public/SectionHeading";
import { ServiceIcon } from "@/components/public/icons";
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
  extra?: unknown;
};

function extraOf<T>(value: unknown) {
  return (value || {}) as T;
}

function firstParagraph(value?: string | null) {
  return (value || "").split(/\n+/)[0]?.trim() || "";
}

export function IntroSection({ section }: { section?: Section }) {
  if (!section) return null;
  return (
    <section id="intro" className="py-14 md:py-16">
      <Container className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
        <SectionHeading
          label={section.subheading || "What we do"}
          title={
            section.heading ||
            "We build digital experiences that make businesses easier to discover, trust and choose."
          }
        />
        <FadeIn>
          <div className="gold-line mb-6" />
          <p className="prose-quiet">{firstParagraph(section.paragraph)}</p>
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
  }[];
}) {
  if (!section) return null;
  return (
    <section className="py-14 md:py-16">
      <Container>
        <div className="mb-8 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <SectionHeading
            label={section.subheading || "Services"}
            title={section.heading || "Everything your business needs to grow online"}
            description={firstParagraph(section.paragraph)}
          />
          <ButtonLink href={section.ctaUrl || "/services"} variant="secondary">
            {section.ctaLabel || "View all services"}
          </ButtonLink>
        </div>
        <Stagger className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {services.map((service) => (
            <StaggerItem key={service.slug}>
              <Link
                href={`/services/${service.slug}`}
                className="group flex h-full flex-col rounded-[22px] border border-gold/15 bg-ink-elevated/80 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-gold/45"
              >
                <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-2xl border border-gold/20 text-gold">
                  <ServiceIcon name={service.icon} className="h-5 w-5" />
                </div>
                <h3 className="font-serif text-2xl text-ivory transition-colors group-hover:text-gold-light">
                  {service.title}
                </h3>
                <p className="prose-quiet mt-3 flex-1 text-[1rem]">{service.shortDescription}</p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm text-gold">
                  View service
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
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
    <section className="py-14 md:py-16">
      <Container>
        <div className="mb-8 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <SectionHeading
            label={section.subheading || "Selected work"}
            title={section.heading}
            description={firstParagraph(section.paragraph)}
          />
          <ButtonLink href={section.ctaUrl || "/work"} variant="secondary">
            {section.ctaLabel || "View all work"}
          </ButtonLink>
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

export function ProcessPreviewSection({
  section,
}: {
  section?: Section;
}) {
  if (!section) return null;
  const extra = extraOf<{ steps?: { number: string; title: string; text: string }[] }>(section.extra);
  const steps = resolveProcessSteps(extra.steps);

  return (
    <section id="process" className="scroll-mt-28 py-14 md:py-16">
      <Container>
        <div className="mb-8 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <SectionHeading
            label={section.subheading || "How we work"}
            title={section.heading || "From idea to launch."}
            description={
              firstParagraph(section.paragraph) || "A clear path from first conversation to launch and growth."
            }
          />
          <ButtonLink href="/process" variant="secondary">
            See the process
          </ButtonLink>
        </div>
        <ProcessSteps steps={steps} />
      </Container>
    </section>
  );
}

export function AboutPreviewSection({ section }: { section?: Section }) {
  if (!section) return null;
  return (
    <section className="py-14 md:py-16">
      <Container>
        <div className="grid items-center gap-8 overflow-hidden rounded-[28px] border border-gold/15 bg-[linear-gradient(135deg,rgba(201,165,92,0.08),rgba(8,8,8,0.92))] px-7 py-9 md:px-12 md:py-12 lg:grid-cols-[1.35fr_0.65fr]">
          <div>
            <SectionHeading label={section.subheading || "About Lynora"} title={section.heading} />
            <p className="prose-quiet mt-4 max-w-2xl">{firstParagraph(section.paragraph)}</p>
          </div>
          <div className="flex lg:justify-end">
            <ButtonLink href={section.ctaUrl || "/about"} variant="secondary">
              {section.ctaLabel || "Meet Lynora"}
            </ButtonLink>
          </div>
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
  const whatsapp =
    extra.secondaryCtaUrl === "whatsapp"
      ? whatsappLink(settings.whatsapp)
      : extra.secondaryCtaUrl || whatsappLink(settings.whatsapp);

  return (
    <section className="relative overflow-hidden py-16 md:py-20">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_40%,rgba(201,165,92,0.14),transparent_28%)]" />
      <Container className="relative text-center">
        <h2 className="font-serif text-4xl leading-[1.12] text-ivory sm:text-5xl">{section.heading}</h2>
        <p className="prose-quiet mx-auto mt-4 max-w-xl">{section.paragraph}</p>
        <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
          <ButtonLink href={section.ctaUrl || "/contact"}>{section.ctaLabel || "Start a Project"}</ButtonLink>
          <ButtonLink href={whatsapp} variant="gold-outline">
            {extra.secondaryCtaLabel || "WhatsApp Us"}
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
