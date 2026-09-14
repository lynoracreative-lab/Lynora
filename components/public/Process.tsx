import { Container } from "@/components/public/Container";
import { SectionHeading } from "@/components/public/SectionHeading";
import { FadeIn, Stagger, StaggerItem } from "@/lib/motion";

type Step = { number: string; title: string; text: string };

const defaultSteps: Step[] = [
  { number: "01", title: "Discover", text: "We learn about your business, audience, goals and current challenges." },
  { number: "02", title: "Strategy", text: "We identify what your business actually needs and build the direction." },
  { number: "03", title: "Design", text: "We create the visual experience and refine the details." },
  { number: "04", title: "Build", text: "We develop, test and optimise the final product." },
  { number: "05", title: "Grow", text: "We support your launch with marketing, optimisation and ongoing improvements." },
];

export function Process({
  heading,
  label,
  steps,
}: {
  heading?: string | null;
  label?: string | null;
  steps?: Step[] | null;
}) {
  const items = steps?.length ? steps : defaultSteps;

  return (
    <section id="process" className="py-24 md:py-32">
      <Container>
        <SectionHeading label={label || "How we work"} title={heading || "From idea to launch."} />
        <FadeIn className="my-12 hidden md:block">
          <div className="gold-line" />
        </FadeIn>
        <Stagger className="grid gap-6 md:grid-cols-5">
          {items.map((step) => (
            <StaggerItem key={step.number} className="rounded-[22px] border border-gold/10 bg-ink-soft p-5">
              <p className="font-serif text-3xl text-gold">{step.number}</p>
              <h3 className="mt-4 text-[0.78rem] tracking-[0.2em] uppercase text-ivory">
                {step.title}
              </h3>
              <p className="mt-3 text-sm leading-7 text-stone">{step.text}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}
