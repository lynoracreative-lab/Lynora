import { notFound } from "next/navigation";
import { saveUser } from "@/app/admin/actions";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { FormField, inputClass } from "@/components/admin/FormField";
import { SaveButton } from "@/components/admin/SaveButton";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/db";

export default async function UserFormPage({ params }: { params: Promise<{ id: string }> }) {
  await requireAdmin("/admin/users");
  const { id } = await params;
  const user = id === "new" ? null : await prisma.user.findUnique({ where: { id } });
  if (id !== "new" && !user) notFound();

  return (
    <div>
      <AdminHeader title={user ? "Edit user" : "Add editor"} />
      <form action={saveUser} className="grid max-w-xl gap-4">
        {user ? <input type="hidden" name="id" value={user.id} /> : null}
        <FormField label="Name">
          <input name="name" defaultValue={user?.name} className={inputClass} />
        </FormField>
        <FormField label="Email">
          <input name="email" type="email" defaultValue={user?.email} className={inputClass} />
        </FormField>
        <FormField label="Password" hint={user ? "Leave blank to keep the current password." : "Required for a new user."}>
          <input name="password" type="password" className={inputClass} />
        </FormField>
        <FormField label="Role">
          <select name="role" defaultValue={user?.role || "EDITOR"} className={inputClass}>
            <option value="EDITOR">EDITOR</option>
            <option value="ADMIN">ADMIN</option>
          </select>
        </FormField>
        <label className="text-sm text-ivory">
          <input type="checkbox" name="active" defaultChecked={user?.active ?? true} /> Active
        </label>
        <div>
          <SaveButton />
        </div>
      </form>
    </div>
  );
}
