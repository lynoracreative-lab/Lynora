import { notFound } from "next/navigation";
import { deleteEnquiry, updateEnquiryStatus } from "@/app/admin/actions";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { DeleteDialog } from "@/components/admin/DeleteDialog";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { canDeleteEnquiry } from "@/lib/permissions";
import { formatDate } from "@/lib/utils";

export default async function EnquiryDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [item, user] = await Promise.all([
    prisma.enquiry.findUnique({ where: { id } }),
    getSession(),
  ]);
  if (!item) notFound();

  return (
    <div>
      <AdminHeader title={item.businessName} description={`${item.name} · ${formatDate(item.createdAt)}`} />
      <div className="rounded-[22px] border border-gold/15 p-6">
        <StatusBadge value={item.status} />
        <dl className="mt-6 grid gap-4 text-sm md:grid-cols-2">
          <div>
            <dt className="text-stone">Email</dt>
            <dd className="text-ivory">{item.email}</dd>
          </div>
          <div>
            <dt className="text-stone">Phone</dt>
            <dd className="text-ivory">{item.phone}</dd>
          </div>
          <div>
            <dt className="text-stone">Website</dt>
            <dd className="text-ivory">{item.website || "—"}</dd>
          </div>
          <div>
            <dt className="text-stone">Service</dt>
            <dd className="text-ivory">{item.service}</dd>
          </div>
          <div>
            <dt className="text-stone">Budget</dt>
            <dd className="text-ivory">{item.budget}</dd>
          </div>
          <div>
            <dt className="text-stone">Preferred contact</dt>
            <dd className="text-ivory">{item.preferredContact}</dd>
          </div>
        </dl>
        <p className="mt-6 whitespace-pre-line text-base leading-8 text-stone">{item.message}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          {(["READ", "CONTACTED", "CLOSED"] as const).map((status) => (
            <form key={status} action={updateEnquiryStatus.bind(null, item.id, status)}>
              <button className="rounded-full border border-gold/30 px-4 py-2 text-[0.7rem] tracking-[0.16em] uppercase text-gold">
                Mark {status.toLowerCase()}
              </button>
            </form>
          ))}
          {canDeleteEnquiry(user) ? <DeleteDialog action={deleteEnquiry.bind(null, item.id)} /> : null}
        </div>
      </div>
    </div>
  );
}
