import Link from "next/link";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { prisma } from "@/lib/db";

export default async function AdminSeoPage() {
  const [pages, services, projects, posts] = await Promise.all([
    prisma.page.findMany({ orderBy: { title: "asc" } }),
    prisma.service.findMany({ orderBy: { title: "asc" } }),
    prisma.project.findMany({ orderBy: { title: "asc" } }),
    prisma.post.findMany({ orderBy: { title: "asc" } }),
  ]);

  return (
    <div>
      <AdminHeader
        title="SEO"
        description="Open any item to edit its title, description and Open Graph image."
      />
      <div className="grid gap-6 lg:grid-cols-2">
        <section className="rounded-[22px] border border-gold/15 p-5">
          <h2 className="font-serif text-2xl text-ivory">Pages</h2>
          <ul className="mt-4 space-y-3 text-sm">
            {pages.map((item) => (
              <li key={item.id} className="flex justify-between gap-3">
                <span className="text-ivory">{item.title}</span>
                <Link href={`/admin/pages/${item.id}`} className="text-gold">
                  Edit SEO
                </Link>
              </li>
            ))}
          </ul>
        </section>
        <section className="rounded-[22px] border border-gold/15 p-5">
          <h2 className="font-serif text-2xl text-ivory">Services</h2>
          <ul className="mt-4 space-y-3 text-sm">
            {services.map((item) => (
              <li key={item.id} className="flex justify-between gap-3">
                <span className="text-ivory">{item.title}</span>
                <Link href={`/admin/services/${item.id}`} className="text-gold">
                  Edit SEO
                </Link>
              </li>
            ))}
          </ul>
        </section>
        <section className="rounded-[22px] border border-gold/15 p-5">
          <h2 className="font-serif text-2xl text-ivory">Projects</h2>
          <ul className="mt-4 space-y-3 text-sm">
            {projects.map((item) => (
              <li key={item.id} className="flex justify-between gap-3">
                <span className="text-ivory">{item.title}</span>
                <Link href={`/admin/projects/${item.id}`} className="text-gold">
                  Edit SEO
                </Link>
              </li>
            ))}
          </ul>
        </section>
        <section className="rounded-[22px] border border-gold/15 p-5">
          <h2 className="font-serif text-2xl text-ivory">Posts</h2>
          <ul className="mt-4 space-y-3 text-sm">
            {posts.map((item) => (
              <li key={item.id} className="flex justify-between gap-3">
                <span className="text-ivory">{item.title}</span>
                <Link href={`/admin/posts/${item.id}`} className="text-gold">
                  Edit SEO
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
