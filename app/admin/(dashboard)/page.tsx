import Link from "next/link";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { prisma } from "@/lib/db";
import { formatDate } from "@/lib/utils";

export default async function AdminDashboardPage() {
  const [
    publishedPosts,
    draftPosts,
    projects,
    services,
    media,
    newEnquiries,
    recentPosts,
    recentProjects,
    recentEnquiries,
    recentMedia,
  ] = await Promise.all([
    prisma.post.count({ where: { status: "PUBLISHED" } }),
    prisma.post.count({ where: { status: "DRAFT" } }),
    prisma.project.count(),
    prisma.service.count(),
    prisma.media.count(),
    prisma.enquiry.count({ where: { status: "NEW" } }),
    prisma.post.findMany({ orderBy: { updatedAt: "desc" }, take: 5 }),
    prisma.project.findMany({ orderBy: { updatedAt: "desc" }, take: 5 }),
    prisma.enquiry.findMany({ orderBy: { createdAt: "desc" }, take: 5 }),
    prisma.media.findMany({ orderBy: { uploadedAt: "desc" }, take: 5 }),
  ]);

  const cards = [
    { label: "Published Posts", value: publishedPosts, href: "/admin/posts" },
    { label: "Draft Posts", value: draftPosts, href: "/admin/posts?status=DRAFT" },
    { label: "Portfolio Projects", value: projects, href: "/admin/projects" },
    { label: "Services", value: services, href: "/admin/services" },
    { label: "Media Files", value: media, href: "/admin/media" },
    { label: "New Enquiries", value: newEnquiries, href: "/admin/enquiries" },
  ];

  return (
    <div>
      <AdminHeader title="Dashboard" description="A snapshot of Lynora’s content and incoming work." />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {cards.map((card) => (
          <Link
            key={card.label}
            href={card.href}
            className="rounded-[22px] border border-gold/15 bg-ink-elevated p-5 hover:border-gold/40"
          >
            <p className="text-[0.68rem] tracking-[0.16em] uppercase text-stone">{card.label}</p>
            <p className="mt-3 font-serif text-4xl text-ivory">{card.value}</p>
          </Link>
        ))}
      </div>
      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        <section className="rounded-[22px] border border-gold/15 p-5">
          <h2 className="font-serif text-2xl text-ivory">Recent posts</h2>
          <ul className="mt-4 space-y-3 text-sm">
            {recentPosts.map((item) => (
              <li key={item.id} className="flex justify-between gap-3">
                <Link href={`/admin/posts/${item.id}`} className="text-ivory hover:text-gold">
                  {item.title}
                </Link>
                <StatusBadge value={item.status} />
              </li>
            ))}
          </ul>
        </section>
        <section className="rounded-[22px] border border-gold/15 p-5">
          <h2 className="font-serif text-2xl text-ivory">Recent projects</h2>
          <ul className="mt-4 space-y-3 text-sm">
            {recentProjects.map((item) => (
              <li key={item.id} className="flex justify-between gap-3">
                <Link href={`/admin/projects/${item.id}`} className="text-ivory hover:text-gold">
                  {item.title}
                </Link>
                <StatusBadge value={item.status} />
              </li>
            ))}
          </ul>
        </section>
        <section className="rounded-[22px] border border-gold/15 p-5">
          <h2 className="font-serif text-2xl text-ivory">Recent enquiries</h2>
          <ul className="mt-4 space-y-3 text-sm">
            {recentEnquiries.map((item) => (
              <li key={item.id} className="flex justify-between gap-3">
                <Link href={`/admin/enquiries/${item.id}`} className="text-ivory hover:text-gold">
                  {item.name} · {item.businessName}
                </Link>
                <StatusBadge value={item.status} />
              </li>
            ))}
          </ul>
        </section>
        <section className="rounded-[22px] border border-gold/15 p-5">
          <h2 className="font-serif text-2xl text-ivory">Recently uploaded media</h2>
          <ul className="mt-4 space-y-3 text-sm text-stone">
            {recentMedia.map((item) => (
              <li key={item.id} className="flex justify-between gap-3">
                <Link href="/admin/media" className="text-ivory hover:text-gold">
                  {item.title}
                </Link>
                <span>{formatDate(item.uploadedAt)}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
