export function AdminHeader({
  title,
  description,
  actions,
}: {
  title: string;
  description?: string;
  actions?: React.ReactNode;
}) {
  return (
    <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
      <div>
        <h1 className="font-serif text-4xl text-ivory">{title}</h1>
        {description ? <p className="mt-2 text-sm text-stone">{description}</p> : null}
      </div>
      {actions}
    </div>
  );
}
