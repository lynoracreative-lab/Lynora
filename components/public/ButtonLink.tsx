import Link from "next/link";
import { cn } from "@/lib/utils";

type Props = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "gold-outline";
  className?: string;
};

export function ButtonLink({ href, children, variant = "primary", className }: Props) {
  const styles = {
    primary:
      "bg-ivory text-ink hover:bg-gold-light hover:text-ink",
    secondary:
      "border border-ivory/20 text-ivory hover:border-gold/50 hover:text-gold-light",
    "gold-outline":
      "border border-gold/70 text-gold hover:bg-gold hover:text-ink",
  };

  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center justify-center rounded-full px-5 py-2.5 text-[0.78rem] font-medium tracking-[0.08em] transition-all duration-300",
        styles[variant],
        className,
      )}
    >
      {children}
    </Link>
  );
}
