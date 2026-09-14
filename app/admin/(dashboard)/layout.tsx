import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { MobileAdminNav } from "@/components/admin/MobileAdminNav";
import { requireUser } from "@/lib/auth";
import { isAdmin } from "@/lib/permissions";

export const dynamic = "force-dynamic";

export default async function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  const user = await requireUser("/admin");

  return (
    <div className="flex min-h-screen bg-ink">
      <div className="hidden md:block">
        <AdminSidebar isAdmin={isAdmin(user)} />
      </div>
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="relative flex items-center justify-between border-b border-gold/10 px-5 py-4 md:px-8">
          <p className="text-sm text-stone">
            Signed in as <span className="text-ivory">{user.name}</span> · {user.role}
          </p>
          <MobileAdminNav isAdmin={isAdmin(user)} />
        </div>
        <div className="flex-1 px-5 py-8 md:px-8">{children}</div>
      </div>
    </div>
  );
}
