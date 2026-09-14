import { Container } from "@/components/public/Container";
import { SectionHeading } from "@/components/public/SectionHeading";
import { Stagger, StaggerItem } from "@/lib/motion";

export function Testimonials({
  heading,
  label,
  description,
  items,
}: {
  heading?: string | null;
  label?: string | null;
  description?: string | null;
  items: {
    id: string;
    clientName: string;
    company: string;
    role: string;
    quote: string;
  }[];
}) {
  return (
    <section className="py-24 md:py-32">
      <Container>
        <SectionHeading label={label || "Notes"} title={heading || "What collaboration can feel like"} description={description} />
        <Stagger className="mt-12 grid gap-6 md:grid-cols-3">
          {items.map((item) => (
            <StaggerItem
              key={item.id}
              className="rounded-[26px] border border-gold/15 bg-ink-elevated p-7"
            >
              <p className="mb-5 text-[0.62rem] tracking-[0.18em] uppercase text-gold">
                Sample testimonial — replace with client review
              </p>
              <p className="font-serif text-2xl leading-snug text-ivory">“{item.quote}”</p>
              <p className="mt-6 text-sm text-stone">
                {item.clientName}, {item.role}
              </p>
              <p className="text-sm text-gold/80">{item.company}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}
