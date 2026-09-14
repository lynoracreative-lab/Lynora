import { notFound } from "next/navigation";
import { saveService } from "@/app/admin/actions";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { FormField, inputClass } from "@/components/admin/FormField";
import { MediaPicker } from "@/components/admin/MediaPicker";
import { SaveButton } from "@/components/admin/SaveButton";
import { SERVICE_ICONS } from "@/lib/constants";
import { prisma } from "@/lib/db";

export default async function ServiceFormPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const service =
    id === "new"
      ? null
      : await prisma.service.findUnique({ where: { id } });
  if (id !== "new" && !service) notFound();

  return (
    <div>
      <AdminHeader title={service ? "Edit service" : "Create service"} />
      <form action={saveService} className="grid gap-4 md:grid-cols-2">
        {service ? <input type="hidden" name="id" value={service.id} /> : null}
        <FormField label="Title">
          <input name="title" defaultValue={service?.title} required className={inputClass} />
        </FormField>
        <FormField label="Slug">
          <input name="slug" defaultValue={service?.slug} className={inputClass} />
        </FormField>
        <FormField label="Short description" className="md:col-span-2">
          <textarea name="shortDescription" defaultValue={service?.shortDescription} rows={3} className={inputClass} />
        </FormField>
        <FormField label="Full description" className="md:col-span-2">
          <textarea name="fullDescription" defaultValue={service?.fullDescription} rows={5} className={inputClass} />
        </FormField>
        <FormField label="Icon">
          <select name="icon" defaultValue={service?.icon || "sparkles"} className={inputClass}>
            {SERVICE_ICONS.map((icon) => (
              <option key={icon} value={icon}>
                {icon}
              </option>
            ))}
          </select>
        </FormField>
        <FormField label="Sort order">
          <input type="number" name="sortOrder" defaultValue={service?.sortOrder ?? 0} className={inputClass} />
        </FormField>
        <FormField label="Cover image" className="md:col-span-2">
          <MediaPicker name="coverImage" defaultValue={service?.coverImage || ""} />
        </FormField>
        <FormField label="Ideal client" className="md:col-span-2">
          <textarea name="idealClient" defaultValue={service?.idealClient} rows={3} className={inputClass} />
        </FormField>
        <FormField label="Deliverables" hint="One item per line">
          <textarea name="deliverables" defaultValue={service?.deliverables} rows={5} className={inputClass} />
        </FormField>
        <FormField label="Outcomes">
          <textarea name="outcomes" defaultValue={service?.outcomes} rows={5} className={inputClass} />
        </FormField>
        <FormField label="CTA label">
          <input name="ctaLabel" defaultValue={service?.ctaLabel || "Start a Project"} className={inputClass} />
        </FormField>
        <FormField label="CTA URL">
          <input name="ctaUrl" defaultValue={service?.ctaUrl || "/contact"} className={inputClass} />
        </FormField>
        <FormField label="SEO title">
          <input name="seoTitle" defaultValue={service?.seoTitle || ""} className={inputClass} />
        </FormField>
        <FormField label="SEO description">
          <input name="seoDescription" defaultValue={service?.seoDescription || ""} className={inputClass} />
        </FormField>
        <label className="text-sm text-ivory">
          <input type="checkbox" name="published" defaultChecked={service?.published ?? true} /> Published
        </label>
        <div>
          <SaveButton />
        </div>
      </form>
    </div>
  );
}
