import Link from "next/link";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { DataTable } from "@/components/admin/DataTable";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { prisma } from "@/lib/db";
import { formatDate } from "@/lib/utils";

export default async function AdminPagesPage() {
  const pages = await prisma.page.findMany({ orderBy: { title: "asc" } });

  return (
    <div>
      <AdminHeader title="Pages" description="Edit the core website pages and their sections." />
      <DataTable headers={["Page", "Slug", "Status", "Updated", ""]}>
        {pages.map((page) => (
          <tr key={page.id}>
            <td className="px-4 py-3 text-ivory">{page.title}</td>
            <td className="px-4 py-3 text-stone">/{page.slug === "home" ? "" : page.slug}</td>
            <td className="px-4 py-3">
              <StatusBadge value={page.published ? "PUBLISHED" : "DRAFT"} />
            </td>
            <td className="px-4 py-3 text-stone">{formatDate(page.updatedAt)}</td>
            <td className="px-4 py-3">
              <Link href={`/admin/pages/${page.id}`} className="text-gold">
                Edit
              </Link>
            </td>
          </tr>
        ))}
      </DataTable>
    </div>
  );
}
