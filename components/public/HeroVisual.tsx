import Image from "next/image";

export function HeroVisual() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden bg-ink">
      <div className="absolute right-0 top-0 size-[100svh]">
        <Image
          src="/images/hero-planet.jpg"
          alt=""
          fill
          priority
          sizes="100vh"
          className="object-contain"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-ink from-[10%] via-ink/55 via-[38%] to-transparent to-[70%] lg:from-[20%] lg:via-ink/25 lg:via-[44%]" />
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-ink to-transparent" />
    </div>
  );
}
