import { notFound } from "next/navigation";
import { saveFaq } from "@/app/admin/actions";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { FormField, inputClass } from "@/components/admin/FormField";
import { SaveButton } from "@/components/admin/SaveButton";
import { prisma } from "@/lib/db";

export default async function FaqFormPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const item = id === "new" ? null : await prisma.faq.findUnique({ where: { id } });
  if (id !== "new" && !item) notFound();

  return (
    <div>
      <AdminHeader title={item ? "Edit FAQ" : "Add FAQ"} />
      <form action={saveFaq} className="grid gap-4">
        {item ? <input type="hidden" name="id" value={item.id} /> : null}
        <FormField label="Question">
          <input name="question" defaultValue={item?.question} className={inputClass} />
        </FormField>
        <FormField label="Answer">
          <textarea name="answer" defaultValue={item?.answer} rows={6} className={inputClass} />
        </FormField>
        <FormField label="Category">
          <input name="category" defaultValue={item?.category || "General"} className={inputClass} />
        </FormField>
        <FormField label="Sort order">
          <input type="number" name="sortOrder" defaultValue={item?.sortOrder ?? 0} className={inputClass} />
        </FormField>
        <label className="text-sm text-ivory">
          <input type="checkbox" name="published" defaultChecked={item?.published ?? true} /> Published
        </label>
        <div>
          <SaveButton />
        </div>
      </form>
    </div>
  );
}
