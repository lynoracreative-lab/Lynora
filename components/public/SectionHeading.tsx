import { FadeIn } from "@/lib/motion";
import { cn } from "@/lib/utils";

export function SectionHeading({
  label,
  title,
  description,
  align = "left",
  className,
}: {
  label?: string | null;
  title?: string | null;
  description?: string | null;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <FadeIn className={cn(align === "center" ? "mx-auto text-center" : "", "max-w-3xl", className)}>
      {label ? <p className="section-label mb-5">{label}</p> : null}
      {title ? (
        <h2 className="font-serif text-4xl leading-[1.05] text-ivory sm:text-5xl md:text-[3.4rem]">
          {title}
        </h2>
      ) : null}
      {description ? (
        <p className="mt-6 text-base leading-8 text-stone sm:text-lg">{description}</p>
      ) : null}
    </FadeIn>
  );
}
