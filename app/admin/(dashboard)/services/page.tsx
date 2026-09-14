import Link from "next/link";
import { deleteService, reorderService } from "@/app/admin/actions";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { DataTable } from "@/components/admin/DataTable";
import { DeleteDialog } from "@/components/admin/DeleteDialog";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { prisma } from "@/lib/db";

export default async function AdminServicesPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const services = await prisma.service.findMany({
    where: q ? { title: { contains: q, mode: "insensitive" } } : {},
    orderBy: { sortOrder: "asc" },
  });

  return (
    <div>
      <AdminHeader
        title="Services"
        description="Create, reorder and publish the services shown on the website."
        actions={
          <Link href="/admin/services/new" className="rounded-full bg-gold px-4 py-2 text-[0.7rem] tracking-[0.16em] uppercase text-ink">
            Create service
          </Link>
        }
      />
      <form className="mb-5">
        <input name="q" defaultValue={q} placeholder="Search services" className="w-full max-w-sm rounded-[16px] border border-gold/15 bg-ink px-4 py-3 text-sm" />
      </form>
      <DataTable headers={["Title", "Status", "Order", ""]}>
        {services.map((service) => (
          <tr key={service.id}>
            <td className="px-4 py-3 text-ivory">{service.title}</td>
            <td className="px-4 py-3">
              <StatusBadge value={service.published ? "PUBLISHED" : "DRAFT"} />
            </td>
            <td className="px-4 py-3 text-stone">{service.sortOrder}</td>
            <td className="px-4 py-3">
              <div className="flex flex-wrap gap-3">
                <Link href={`/admin/services/${service.id}`} className="text-gold">
                  Edit
                </Link>
                <form action={reorderService.bind(null, service.id, "up")}>
                  <button className="text-stone">Up</button>
                </form>
                <form action={reorderService.bind(null, service.id, "down")}>
                  <button className="text-stone">Down</button>
                </form>
                <DeleteDialog action={deleteService.bind(null, service.id)} message="Delete this service from the website?" />
              </div>
            </td>
          </tr>
        ))}
      </DataTable>
    </div>
  );
}
