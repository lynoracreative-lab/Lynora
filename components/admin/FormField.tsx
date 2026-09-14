import { cn } from "@/lib/utils";

export function FormField({
  label,
  hint,
  children,
  className,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <label className={cn("block text-xs tracking-[0.16em] uppercase text-stone", className)}>
      {label}
      <div className="mt-2">{children}</div>
      {hint ? <p className="mt-1 text-[0.7rem] normal-case tracking-normal text-stone/80">{hint}</p> : null}
    </label>
  );
}

export const inputClass =
  "w-full rounded-[16px] border border-gold/15 bg-ink px-4 py-3 text-sm text-ivory outline-none focus:border-gold/50";
