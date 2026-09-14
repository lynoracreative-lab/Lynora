import Link from "next/link";
import { deleteProject } from "@/app/admin/actions";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { DataTable } from "@/components/admin/DataTable";
import { DeleteDialog } from "@/components/admin/DeleteDialog";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { prisma } from "@/lib/db";

export default async function AdminProjectsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const projects = await prisma.project.findMany({
    where: q
      ? {
          OR: [
            { title: { contains: q, mode: "insensitive" } },
            { industry: { contains: q, mode: "insensitive" } },
          ],
        }
      : {},
    orderBy: { updatedAt: "desc" },
  });

  return (
    <div>
      <AdminHeader
        title="Portfolio"
        description="Manage real, concept and in-house projects."
        actions={
          <Link href="/admin/projects/new" className="rounded-full bg-gold px-4 py-2 text-[0.7rem] tracking-[0.16em] uppercase text-ink">
            Create project
          </Link>
        }
      />
      <form className="mb-5">
        <input name="q" defaultValue={q} placeholder="Search projects" className="w-full max-w-sm rounded-[16px] border border-gold/15 bg-ink px-4 py-3 text-sm" />
      </form>
      <DataTable headers={["Title", "Type", "Status", "Featured", ""]}>
        {projects.map((project) => (
          <tr key={project.id}>
            <td className="px-4 py-3 text-ivory">{project.title}</td>
            <td className="px-4 py-3">
              <StatusBadge value={project.status} />
            </td>
            <td className="px-4 py-3">
              <StatusBadge value={project.published ? "PUBLISHED" : "DRAFT"} />
            </td>
            <td className="px-4 py-3 text-stone">{project.featured ? "Yes" : "No"}</td>
            <td className="px-4 py-3">
              <div className="flex gap-3">
                <Link href={`/admin/projects/${project.id}`} className="text-gold">
                  Edit
                </Link>
                <Link href={`/work/${project.slug}?preview=1`} className="text-stone">
                  Preview
                </Link>
                <DeleteDialog action={deleteProject.bind(null, project.id)} />
              </div>
            </td>
          </tr>
        ))}
      </DataTable>
    </div>
  );
}
