import Link from "next/link";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { DataTable } from "@/components/admin/DataTable";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { prisma } from "@/lib/db";
import { formatDate } from "@/lib/utils";

export default async function AdminEnquiriesPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const items = await prisma.enquiry.findMany({
    where: q
      ? {
          OR: [
            { name: { contains: q, mode: "insensitive" } },
            { email: { contains: q, mode: "insensitive" } },
            { businessName: { contains: q, mode: "insensitive" } },
          ],
        }
      : {},
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <AdminHeader title="Enquiries" description="Every project form submission is stored here." />
      <form className="mb-5">
        <input name="q" defaultValue={q} placeholder="Search enquiries" className="w-full max-w-sm rounded-[16px] border border-gold/15 bg-ink px-4 py-3 text-sm" />
      </form>
      <DataTable headers={["Name", "Business", "Service", "Status", "Date", ""]}>
        {items.map((item) => (
          <tr key={item.id}>
            <td className="px-4 py-3 text-ivory">{item.name}</td>
            <td className="px-4 py-3 text-stone">{item.businessName}</td>
            <td className="px-4 py-3 text-stone">{item.service}</td>
            <td className="px-4 py-3">
              <StatusBadge value={item.status} />
            </td>
            <td className="px-4 py-3 text-stone">{formatDate(item.createdAt)}</td>
            <td className="px-4 py-3">
              <Link href={`/admin/enquiries/${item.id}`} className="text-gold">
                Open
              </Link>
            </td>
          </tr>
        ))}
      </DataTable>
    </div>
  );
}
