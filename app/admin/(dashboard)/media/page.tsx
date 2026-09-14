import { deleteMedia, updateMediaMeta } from "@/app/admin/actions";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { DeleteDialog } from "@/components/admin/DeleteDialog";
import { EmptyState } from "@/components/admin/EmptyState";
import { MediaUploadButton } from "@/components/admin/MediaUploadButton";
import { inputClass } from "@/components/admin/FormField";
import { prisma } from "@/lib/db";
import { formatBytes, formatDate } from "@/lib/utils";

export default async function AdminMediaPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const items = await prisma.media.findMany({
    where: q
      ? {
          OR: [
            { title: { contains: q, mode: "insensitive" } },
            { fileName: { contains: q, mode: "insensitive" } },
          ],
        }
      : {},
    orderBy: { uploadedAt: "desc" },
  });

  return (
    <div>
      <AdminHeader
        title="Media"
        description="Upload images, video and documents. Copy the URL into any page or post."
        actions={<MediaUploadButton />}
      />
      <form className="mb-6">
        <input name="q" defaultValue={q} placeholder="Search media" className="w-full max-w-sm rounded-[16px] border border-gold/15 bg-ink px-4 py-3 text-sm" />
      </form>
      {items.length === 0 ? (
        <EmptyState title="No media yet" text="Upload your first image, video or PDF." />
      ) : (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {items.map((item) => (
            <article key={item.id} className="rounded-[22px] border border-gold/15 p-4">
              {item.fileType === "IMAGE" ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={item.fileUrl} alt={item.altText} className="mb-3 h-40 w-full rounded-2xl object-cover" />
              ) : (
                <div className="mb-3 flex h-40 items-center justify-center rounded-2xl bg-ink-soft text-sm text-stone">
                  {item.fileType}
                </div>
              )}
              <form action={updateMediaMeta} className="space-y-2">
                <input type="hidden" name="id" value={item.id} />
                <input name="title" defaultValue={item.title} className={inputClass} />
                <input name="altText" defaultValue={item.altText} placeholder="Alt text" className={inputClass} />
                <p className="text-xs text-stone">
                  {formatBytes(item.fileSize)} · {formatDate(item.uploadedAt)}
                </p>
                <p className="break-all text-xs text-gold">{item.fileUrl}</p>
                <div className="flex items-center justify-between pt-2">
                  <button className="text-sm text-ivory">Save</button>
                  <DeleteDialog action={deleteMedia.bind(null, item.id)} />
                </div>
              </form>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
