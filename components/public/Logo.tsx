import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function Logo({
  className,
  lockup = false,
}: {
  className?: string;
  compact?: boolean;
  lockup?: boolean;
}) {
  if (lockup) {
    return (
      <Link href="/" className={cn("inline-block", className)}>
        <Image
          src="/branding/lynora-logo.png"
          alt="Lynora — Where curiosity meets technology"
          width={734}
          height={632}
          className="h-auto w-[200px] sm:w-[240px]"
          priority
        />
      </Link>
    );
  }

  return (
    <Link href="/" className={cn("group inline-flex items-center gap-3", className)}>
      <Image
        src="/branding/lynora-mark.png"
        alt=""
        width={219}
        height={367}
        className="h-10 w-auto sm:h-11"
        priority
      />
      <span className="text-[1.02rem] font-light tracking-[0.34em] text-ivory sm:text-[1.12rem]">
        LYNORA
      </span>
    </Link>
  );
}
