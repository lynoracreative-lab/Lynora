import Link from "next/link";
import { deletePost, duplicatePost } from "@/app/admin/actions";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { DataTable } from "@/components/admin/DataTable";
import { DeleteDialog } from "@/components/admin/DeleteDialog";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { prisma } from "@/lib/db";
import { formatDate } from "@/lib/utils";

export default async function AdminPostsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; status?: string }>;
}) {
  const { q, status } = await searchParams;
  const posts = await prisma.post.findMany({
    where: {
      ...(status === "DRAFT" || status === "PUBLISHED" ? { status } : {}),
      ...(q ? { title: { contains: q, mode: "insensitive" } } : {}),
    },
    include: { author: true, category: true },
    orderBy: { updatedAt: "desc" },
  });

  return (
    <div>
      <AdminHeader
        title="Posts"
        description="Write, draft, publish and duplicate journal posts."
        actions={
          <Link href="/admin/posts/new" className="rounded-full bg-gold px-4 py-2 text-[0.7rem] tracking-[0.16em] uppercase text-ink">
            Create post
          </Link>
        }
      />
      <form className="mb-5">
        <input name="q" defaultValue={q} placeholder="Search posts" className="w-full max-w-sm rounded-[16px] border border-gold/15 bg-ink px-4 py-3 text-sm" />
      </form>
      <DataTable headers={["Title", "Status", "Author", "Updated", ""]}>
        {posts.map((post) => (
          <tr key={post.id}>
            <td className="px-4 py-3 text-ivory">{post.title}</td>
            <td className="px-4 py-3">
              <StatusBadge value={post.status} />
            </td>
            <td className="px-4 py-3 text-stone">{post.author.name}</td>
            <td className="px-4 py-3 text-stone">{formatDate(post.updatedAt)}</td>
            <td className="px-4 py-3">
              <div className="flex flex-wrap gap-3">
                <Link href={`/admin/posts/${post.id}`} className="text-gold">
                  Edit
                </Link>
                <Link href={`/blog/${post.slug}?preview=1`} className="text-stone">
                  Preview
                </Link>
                <form action={duplicatePost.bind(null, post.id)}>
                  <button className="text-stone">Duplicate</button>
                </form>
                <DeleteDialog action={deletePost.bind(null, post.id)} />
              </div>
            </td>
          </tr>
        ))}
      </DataTable>
    </div>
  );
}
