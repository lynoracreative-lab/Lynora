import { notFound } from "next/navigation";
import { saveTestimonial } from "@/app/admin/actions";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { FormField, inputClass } from "@/components/admin/FormField";
import { MediaPicker } from "@/components/admin/MediaPicker";
import { SaveButton } from "@/components/admin/SaveButton";
import { prisma } from "@/lib/db";

export default async function TestimonialFormPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const item = id === "new" ? null : await prisma.testimonial.findUnique({ where: { id } });
  if (id !== "new" && !item) notFound();

  return (
    <div>
      <AdminHeader title={item ? "Edit testimonial" : "Add testimonial"} />
      <form action={saveTestimonial} className="grid gap-4 md:grid-cols-2">
        {item ? <input type="hidden" name="id" value={item.id} /> : null}
        <FormField label="Client name">
          <input name="clientName" defaultValue={item?.clientName} className={inputClass} />
        </FormField>
        <FormField label="Company">
          <input name="company" defaultValue={item?.company} className={inputClass} />
        </FormField>
        <FormField label="Role">
          <input name="role" defaultValue={item?.role} className={inputClass} />
        </FormField>
        <FormField label="Sort order">
          <input type="number" name="sortOrder" defaultValue={item?.sortOrder ?? 0} className={inputClass} />
        </FormField>
        <FormField label="Quote" className="md:col-span-2">
          <textarea name="quote" defaultValue={item?.quote} rows={5} className={inputClass} />
        </FormField>
        <FormField label="Client image">
          <MediaPicker name="clientImage" defaultValue={item?.clientImage || ""} />
        </FormField>
        <FormField label="Company logo">
          <MediaPicker name="companyLogo" defaultValue={item?.companyLogo || ""} />
        </FormField>
        <label className="text-sm text-ivory">
          <input type="checkbox" name="featured" defaultChecked={item?.featured} /> Featured
        </label>
        <label className="text-sm text-ivory">
          <input type="checkbox" name="published" defaultChecked={item?.published} /> Published
        </label>
        <div>
          <SaveButton />
        </div>
      </form>
    </div>
  );
}
