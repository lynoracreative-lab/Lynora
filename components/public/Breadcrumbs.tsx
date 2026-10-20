import Link from "next/link";

export type Crumb = { href: string; label: string };

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex flex-wrap items-center gap-2 text-[0.68rem] tracking-[0.18em] uppercase text-stone">
        {items.map((item, index) => {
          const last = index === items.length - 1;
          return (
            <li key={`${item.href}-${item.label}`} className="flex items-center gap-2">
              {index > 0 ? <span aria-hidden="true" className="text-gold/40">/</span> : null}
              {last ? (
                <span className="text-ivory" aria-current="page">
                  {item.label}
                </span>
              ) : (
                <Link href={item.href} className="transition-colors hover:text-gold">
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
