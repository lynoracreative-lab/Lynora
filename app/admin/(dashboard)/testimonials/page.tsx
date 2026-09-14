import Link from "next/link";
import { deleteTestimonial } from "@/app/admin/actions";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { DataTable } from "@/components/admin/DataTable";
import { DeleteDialog } from "@/components/admin/DeleteDialog";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { prisma } from "@/lib/db";

export default async function AdminTestimonialsPage() {
  const items = await prisma.testimonial.findMany({ orderBy: { sortOrder: "asc" } });

  return (
    <div>
      <AdminHeader
        title="Testimonials"
        description="Keep sample cards unpublished until you have a real client review."
        actions={
          <Link href="/admin/testimonials/new" className="rounded-full bg-gold px-4 py-2 text-[0.7rem] tracking-[0.16em] uppercase text-ink">
            Add testimonial
          </Link>
        }
      />
      <DataTable headers={["Client", "Company", "Status", ""]}>
        {items.map((item) => (
          <tr key={item.id}>
            <td className="px-4 py-3 text-ivory">{item.clientName}</td>
            <td className="px-4 py-3 text-stone">{item.company}</td>
            <td className="px-4 py-3">
              <StatusBadge value={item.published ? "PUBLISHED" : "DRAFT"} />
            </td>
            <td className="px-4 py-3">
              <div className="flex gap-3">
                <Link href={`/admin/testimonials/${item.id}`} className="text-gold">
                  Edit
                </Link>
                <DeleteDialog action={deleteTestimonial.bind(null, item.id)} />
              </div>
            </td>
          </tr>
        ))}
      </DataTable>
    </div>
  );
}
