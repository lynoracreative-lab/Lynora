import { cn } from "@/lib/utils";

const styles: Record<string, string> = {
  PUBLISHED: "border-emerald-400/30 text-emerald-300",
  DRAFT: "border-stone/40 text-stone",
  NEW: "border-gold/40 text-gold",
  READ: "border-sky-400/30 text-sky-300",
  CONTACTED: "border-violet-400/30 text-violet-300",
  CLOSED: "border-stone/40 text-stone",
  REAL: "border-emerald-400/30 text-emerald-300",
  CONCEPT: "border-gold/40 text-gold",
  INTERNAL: "border-ivory/30 text-ivory",
  ADMIN: "border-gold/40 text-gold",
  EDITOR: "border-ivory/20 text-ivory",
};

export function StatusBadge({ value }: { value: string }) {
  return (
    <span className={cn("rounded-full border px-2.5 py-1 text-[0.65rem] tracking-[0.14em] uppercase", styles[value] || "border-gold/20 text-stone")}>
      {value}
    </span>
  );
}
