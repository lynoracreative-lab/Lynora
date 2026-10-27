"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { ButtonLink } from "@/components/public/ButtonLink";
import { ServiceIcon } from "@/components/public/icons";
import { cn, splitLines } from "@/lib/utils";

const PREVIEW_COUNT = 5;

export function ServiceCard({
  title,
  slug,
  shortDescription,
  icon,
  deliverables,
  ctaLabel,
  ctaUrl,
}: {
  title: string;
  slug: string;
  shortDescription: string;
  icon: string;
  deliverables?: string;
  ctaLabel?: string;
  ctaUrl?: string;
}) {
  const [open, setOpen] = useState(false);
  const items = splitLines(deliverables);
  const preview = items.slice(0, PREVIEW_COUNT);
  const rest = items.slice(PREVIEW_COUNT);

  return (
    <article className="flex h-full flex-col rounded-[24px] border border-gold/15 bg-ink-elevated/80 p-7 transition-all duration-300 hover:-translate-y-1 hover:border-gold/45 hover:shadow-[0_20px_60px_rgba(201,165,92,0.08)]">
      <div className="mb-6 flex h-11 w-11 items-center justify-center rounded-2xl border border-gold/20 text-gold">
        <ServiceIcon name={icon} className="h-5 w-5" />
      </div>
      <h3 className="font-serif text-2xl text-ivory md:text-[1.7rem]">
        <Link href={`/services/${slug}`} className="transition-colors hover:text-gold-light">
          {title}
        </Link>
      </h3>
      <p className="prose-quiet mt-3 text-[1rem]">{shortDescription}</p>
      {preview.length ? (
        <ul className="mt-6 space-y-2 text-sm leading-6 text-ivory/80">
          {preview.map((item) => (
            <li key={item} className="flex gap-3">
              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-gold" />
              <span>{item}</span>
            </li>
          ))}
          {open
            ? rest.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-gold" />
                  <span>{item}</span>
                </li>
              ))
            : null}
        </ul>
      ) : null}
      {rest.length ? (
        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          className="mt-4 inline-flex items-center gap-2 self-start text-sm text-gold"
          aria-expanded={open}
        >
          {open ? "View less" : "View more"}
          <ChevronDown className={cn("h-4 w-4 transition-transform", open && "rotate-180")} />
        </button>
      ) : null}
      <div className="mt-auto pt-7">
        <ButtonLink href={ctaUrl || `/contact?service=${encodeURIComponent(title)}`} className="w-full min-h-12">
          {ctaLabel || "Get a Custom Quote"}
        </ButtonLink>
      </div>
    </article>
  );
}
