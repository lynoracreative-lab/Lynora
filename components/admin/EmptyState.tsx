export function EmptyState({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-[22px] border border-dashed border-gold/20 px-6 py-16 text-center">
      <h3 className="font-serif text-2xl text-ivory">{title}</h3>
      <p className="mt-2 text-sm text-stone">{text}</p>
    </div>
  );
}
