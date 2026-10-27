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
      {label ? <p className="section-label mb-3">{label}</p> : null}
      {title ? (
        <h2 className="font-serif text-[2.4rem] leading-[1.12] text-ivory sm:text-5xl">
          {title}
        </h2>
      ) : null}
      {description ? <p className="prose-quiet mt-4 max-w-2xl">{description}</p> : null}
    </FadeIn>
  );
}
