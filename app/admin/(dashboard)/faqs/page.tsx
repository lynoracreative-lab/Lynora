import Link from "next/link";
import { deleteFaq, reorderFaq } from "@/app/admin/actions";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { DataTable } from "@/components/admin/DataTable";
import { DeleteDialog } from "@/components/admin/DeleteDialog";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { prisma } from "@/lib/db";

export default async function AdminFaqsPage() {
  const items = await prisma.faq.findMany({ orderBy: { sortOrder: "asc" } });

  return (
    <div>
      <AdminHeader
        title="FAQs"
        actions={
          <Link href="/admin/faqs/new" className="rounded-full bg-gold px-4 py-2 text-[0.7rem] tracking-[0.16em] uppercase text-ink">
            Add FAQ
          </Link>
        }
      />
      <DataTable headers={["Question", "Category", "Status", ""]}>
        {items.map((item) => (
          <tr key={item.id}>
            <td className="px-4 py-3 text-ivory">{item.question}</td>
            <td className="px-4 py-3 text-stone">{item.category}</td>
            <td className="px-4 py-3">
              <StatusBadge value={item.published ? "PUBLISHED" : "DRAFT"} />
            </td>
            <td className="px-4 py-3">
              <div className="flex flex-wrap gap-3">
                <Link href={`/admin/faqs/${item.id}`} className="text-gold">
                  Edit
                </Link>
                <form action={reorderFaq.bind(null, item.id, "up")}>
                  <button className="text-stone">Up</button>
                </form>
                <form action={reorderFaq.bind(null, item.id, "down")}>
                  <button className="text-stone">Down</button>
                </form>
                <DeleteDialog action={deleteFaq.bind(null, item.id)} />
              </div>
            </td>
          </tr>
        ))}
      </DataTable>
    </div>
  );
}
