import Link from "next/link";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { DataTable } from "@/components/admin/DataTable";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { formatDate } from "@/lib/utils";

export default async function AdminUsersPage() {
  await requireAdmin("/admin/users");
  const users = await prisma.user.findMany({ orderBy: { createdAt: "asc" } });

  return (
    <div>
      <AdminHeader
        title="Users"
        description="Administrators and editors. The last admin account cannot be removed."
        actions={
          <Link href="/admin/users/new" className="rounded-full bg-gold px-4 py-2 text-[0.7rem] tracking-[0.16em] uppercase text-ink">
            Add editor
          </Link>
        }
      />
      <DataTable headers={["Name", "Email", "Role", "Active", "Created", ""]}>
        {users.map((user) => (
          <tr key={user.id}>
            <td className="px-4 py-3 text-ivory">{user.name}</td>
            <td className="px-4 py-3 text-stone">{user.email}</td>
            <td className="px-4 py-3">
              <StatusBadge value={user.role} />
            </td>
            <td className="px-4 py-3 text-stone">{user.active ? "Yes" : "No"}</td>
            <td className="px-4 py-3 text-stone">{formatDate(user.createdAt)}</td>
            <td className="px-4 py-3">
              <Link href={`/admin/users/${user.id}`} className="text-gold">
                Edit
              </Link>
            </td>
          </tr>
        ))}
      </DataTable>
    </div>
  );
}
