import Image from "next/image";

export function HeroVisual() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden bg-ink">
      <Image
        src="/images/hero-planet.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-[center_right]"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-ink from-[6%] via-ink/80 via-[28%] to-transparent to-[62%] lg:from-[12%] lg:via-ink/45 lg:via-[38%]" />
      <div className="absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-ink/80 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-ink to-transparent" />
    </div>
  );
}
