import { ChevronDown } from "lucide-react";
import { Container } from "@/components/public/Container";
import { SectionHeading } from "@/components/public/SectionHeading";

export function FAQ({
  heading,
  label,
  items,
}: {
  heading?: string | null;
  label?: string | null;
  items: { id: string; question: string; answer: string }[];
}) {
  return (
    <section className="py-24 md:py-32">
      <Container className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
        <SectionHeading label={label || "FAQ"} title={heading || "Questions, answered plainly."} />
        <div className="space-y-3">
          {items.map((item, index) => (
            <details
              key={item.id}
              className="group rounded-[22px] border border-gold/15 bg-ink-soft"
              open={index === 0}
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-5 text-left marker:content-none [&::-webkit-details-marker]:hidden">
                <span className="font-serif text-xl text-ivory">{item.question}</span>
                <ChevronDown className="h-5 w-5 shrink-0 text-gold transition-transform group-open:rotate-180" />
              </summary>
              <p className="px-5 pb-5 text-sm leading-7 text-stone">{item.answer}</p>
            </details>
          ))}
        </div>
      </Container>
    </section>
  );
}
