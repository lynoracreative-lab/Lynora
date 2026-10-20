import { ArrowDown } from "lucide-react";
import { ButtonLink } from "@/components/public/ButtonLink";
import { Container } from "@/components/public/Container";
import { HeroVisual } from "@/components/public/HeroVisual";
import { FadeIn } from "@/lib/motion";

type Extra = {
  label?: string;
  line1?: string;
  line2?: string;
  line3?: string;
  goldText?: string;
  secondaryCtaLabel?: string;
  secondaryCtaUrl?: string;
  trustedBy?: string[];
};

export function Hero({
  heading,
  subheading,
  paragraph,
  ctaLabel,
  ctaUrl,
  extra,
}: {
  heading?: string | null;
  subheading?: string | null;
  paragraph?: string | null;
  ctaLabel?: string | null;
  ctaUrl?: string | null;
  extra?: Extra | null;
}) {
  const line1 = extra?.line1 || "Ideas";
  const line2 = extra?.line2 || "Engineered";
  const line3 = extra?.line3 || "for What’s Next";
  const goldText = extra?.goldText || "What’s Next";
  const line3Parts = line3.split(goldText);

  return (
    <section className="relative isolate min-h-[100svh] overflow-x-clip">
      <HeroVisual />
      <Container className="relative z-10 grid min-h-[100svh] max-w-none grid-rows-[1fr_auto] px-5 pt-28 sm:px-8 lg:px-12 xl:px-16">
        <div className="flex flex-col justify-center py-8 sm:py-10">
          <FadeIn eager>
            <p className="section-label mb-5 sm:mb-6">{extra?.label || "Lynora Digital Studio"}</p>
            <h1 className="max-w-4xl overflow-visible pt-[0.12em] font-serif text-5xl leading-[1.05] text-ivory sm:text-6xl md:text-7xl lg:text-[clamp(4.25rem,6.8vw,6.5rem)]">
              <span className="block">{line1}</span>
              <span className="block">{line2}</span>
              <span className="block">
                {line3Parts[0]}
                <span className="text-gold">{goldText}</span>
                {line3Parts[1]}
              </span>
            </h1>
          </FadeIn>
          <FadeIn eager className="mt-8 max-w-xl">
            <p className="font-serif text-2xl text-ivory/90">{subheading || heading}</p>
            <p className="mt-5 text-base leading-8 text-stone">{paragraph}</p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href={ctaUrl || "/contact"}>{ctaLabel || "Start a Project"}</ButtonLink>
              <ButtonLink href={extra?.secondaryCtaUrl || "/work"} variant="secondary">
                {extra?.secondaryCtaLabel || "View Our Work"}
              </ButtonLink>
            </div>
          </FadeIn>
        </div>
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 pb-6">
          <div className="flex flex-wrap gap-x-8 gap-y-3 text-[0.7rem] tracking-[0.22em] uppercase text-stone">
            {(extra?.trustedBy || ["Web Design", "Branding", "Marketing", "Strategy", "Digital Growth"]).map(
              (item) => (
                <span key={item}>{item}</span>
              ),
            )}
          </div>
          <a
            href="#intro"
            className="inline-flex items-center gap-3 text-[0.68rem] tracking-[0.24em] uppercase text-gold"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-gold/30">
              <ArrowDown size={14} />
            </span>
            Scroll
          </a>
        </div>
      </Container>
    </section>
  );
}
