export function DataTable({
  headers,
  children,
}: {
  headers: string[];
  children: React.ReactNode;
}) {
  return (
    <div className="overflow-x-auto rounded-[22px] border border-gold/15">
      <table className="min-w-full text-left text-sm">
        <thead className="bg-ink-soft text-[0.68rem] tracking-[0.16em] uppercase text-stone">
          <tr>
            {headers.map((header) => (
              <th key={header} className="px-4 py-3 font-medium">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gold/10">{children}</tbody>
      </table>
    </div>
  );
}
