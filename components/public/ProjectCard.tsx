import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

const typeLabel: Record<string, string> = {
  REAL: "Real Project",
  CONCEPT: "Concept Project",
  INTERNAL: "In-house Project",
};

export function ProjectCard({
  title,
  slug,
  industry,
  projectType,
  status,
  services,
  summary,
  coverImage,
}: {
  title: string;
  slug: string;
  industry: string;
  projectType: string;
  status: string;
  services: string[];
  summary: string;
  coverImage?: string | null;
}) {
  return (
    <article className="group overflow-hidden rounded-[26px] border border-gold/15 bg-ink-elevated">
      <div className="relative aspect-[16/11] overflow-hidden bg-ink-soft">
        <Image
          src={coverImage || "/portfolio/lynora-identity.svg"}
          alt={title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        <span
          className={cn(
            "absolute left-4 top-4 rounded-full px-3 py-1 text-[0.62rem] tracking-[0.18em] uppercase",
            status === "REAL" ? "bg-ivory text-ink" : "bg-ink/80 text-gold border border-gold/30",
          )}
        >
          {typeLabel[status] || status}
        </span>
      </div>
      <div className="p-6">
        <p className="section-label">{industry}</p>
        <h3 className="mt-3 font-serif text-3xl text-ivory">{title}</h3>
        <p className="mt-2 text-sm text-gold/80">{projectType}</p>
        <p className="mt-4 text-sm leading-7 text-stone">{summary}</p>
        <p className="mt-4 text-[0.7rem] tracking-[0.16em] uppercase text-stone">
          {services.join(" · ")}
        </p>
        <Link
          href={`/work/${slug}`}
          className="mt-6 inline-flex text-[0.72rem] tracking-[0.18em] uppercase text-gold"
        >
          View Project
        </Link>
      </div>
    </article>
  );
}
