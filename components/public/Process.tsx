import { ButtonLink } from "@/components/public/ButtonLink";
import { Container } from "@/components/public/Container";
import { FadeIn, Stagger, StaggerItem } from "@/lib/motion";

type Step = { number: string; title: string; text: string };

export const defaultProcessSteps: Step[] = [
  { number: "01", title: "Discover", text: "We learn about your business, audience, goals and current challenges." },
  { number: "02", title: "Strategy", text: "We identify what your business actually needs and build the direction." },
  { number: "03", title: "Design", text: "We create the visual experience and refine the details." },
  { number: "04", title: "Build", text: "We develop, test and optimise the final product." },
  { number: "05", title: "Grow", text: "We support your launch with marketing, optimisation and ongoing improvements." },
];

export function resolveProcessSteps(steps?: Step[] | null): Step[] {
  const source = steps?.length ? steps : defaultProcessSteps;
  return source.map((step, index) => ({
    number: step.number || defaultProcessSteps[index]?.number || String(index + 1).padStart(2, "0"),
    title: step.title || defaultProcessSteps[index]?.title || "Step",
    text: step.text || defaultProcessSteps[index]?.text || "",
  }));
}

export function ProcessSteps({ steps }: { steps: Step[] }) {
  return (
    <Stagger className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
      {steps.map((step) => (
        <StaggerItem key={step.number} className="h-full">
          <article className="group relative flex h-full flex-col rounded-[26px] border border-gold/12 bg-gradient-to-b from-ink-elevated to-ink px-6 py-7 transition-colors duration-300 hover:border-gold/40">
            <span className="flex h-11 w-11 items-center justify-center rounded-full border border-gold/35 text-[0.68rem] tracking-[0.18em] text-gold">
              {step.number}
            </span>
            <h3 className="mt-6 font-serif text-2xl text-ivory transition-colors group-hover:text-gold-light">
              {step.title}
            </h3>
            <p className="mt-3 flex-1 text-sm leading-7 text-stone">{step.text}</p>
          </article>
        </StaggerItem>
      ))}
    </Stagger>
  );
}

export function Process({
  heading,
  label,
  steps,
}: {
  heading?: string | null;
  label?: string | null;
  steps?: Step[] | null;
}) {
  const items = resolveProcessSteps(steps);

  return (
    <div className="relative pt-32 pb-24">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[36rem] bg-[radial-gradient(ellipse_at_top_left,rgba(201,165,92,0.16),transparent_58%)]" />
      <Container className="relative">
        <FadeIn className="max-w-3xl">
          <p className="section-label">{label || "How we work"}</p>
          <h1 className="mt-5 font-serif text-5xl leading-[0.98] text-ivory sm:text-6xl md:text-7xl">
            {heading || "From idea to launch."}
          </h1>
          <p className="mt-6 max-w-xl text-base leading-8 text-stone sm:text-lg">
            Five stages, kept in one conversation. We stay with the work from the first brief through launch and the improvements that follow.
          </p>
        </FadeIn>

        <ol className="relative mt-20 md:mt-28">
          <div
            aria-hidden
            className="absolute top-6 bottom-8 left-[1.3rem] w-px bg-gradient-to-b from-gold via-gold/35 to-transparent md:top-8 md:left-[1.95rem]"
          />
          {items.map((step, index) => (
            <li key={step.number} className="relative pb-14 last:pb-0 md:pb-20">
              <FadeIn delay={index * 0.04} className="grid grid-cols-[2.75rem_1fr] items-start gap-4 md:grid-cols-[4rem_1fr] md:gap-16">
                <span className="relative z-10 flex h-11 w-11 items-center justify-center rounded-full border border-gold/50 bg-ink font-serif text-lg text-gold shadow-[0_0_0_8px_#080808] md:h-16 md:w-16 md:text-2xl">
                  {step.number}
                </span>
                <div className="max-w-2xl md:pt-2">
                  <p className="text-[0.68rem] tracking-[0.28em] uppercase text-gold/80">Step {step.number}</p>
                  <h2 className="mt-3 font-serif text-4xl text-ivory md:text-6xl">{step.title}</h2>
                  <p className="mt-4 max-w-xl text-base leading-8 text-stone md:text-lg">{step.text}</p>
                </div>
              </FadeIn>
            </li>
          ))}
        </ol>

        <FadeIn className="mt-28 md:mt-40">
          <div className="gold-line mx-auto mb-16 max-w-48 md:mb-20" />
          <div className="relative overflow-hidden rounded-[36px] border border-gold/20 px-8 py-14 text-center md:px-16 md:py-20">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(201,165,92,0.14),transparent_62%)]" />
            <div className="relative">
              <p className="section-label">Next step</p>
              <h2 className="mx-auto mt-4 max-w-3xl font-serif text-4xl leading-tight text-ivory md:text-6xl">
                Tell us what you want to build.
              </h2>
              <div className="mt-10">
                <ButtonLink href="/contact">Get in Touch</ButtonLink>
              </div>
            </div>
          </div>
        </FadeIn>
      </Container>
    </div>
  );
}
