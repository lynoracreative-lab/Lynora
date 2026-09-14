import Link from "next/link";

export function Pagination({
  page,
  pageCount,
  basePath,
}: {
  page: number;
  pageCount: number;
  basePath: string;
}) {
  if (pageCount <= 1) return null;
  const prev = page > 1 ? `${basePath}${basePath.includes("?") ? "&" : "?"}page=${page - 1}` : null;
  const next = page < pageCount ? `${basePath}${basePath.includes("?") ? "&" : "?"}page=${page + 1}` : null;

  return (
    <div className="mt-6 flex items-center justify-between text-sm text-stone">
      <span>
        Page {page} of {pageCount}
      </span>
      <div className="flex gap-3">
        {prev ? <Link href={prev}>Previous</Link> : <span />}
        {next ? <Link href={next}>Next</Link> : null}
      </div>
    </div>
  );
}
