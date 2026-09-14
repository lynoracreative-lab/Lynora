import { notFound } from "next/navigation";
import { updatePageSection, updatePageSeo } from "@/app/admin/actions";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { FormField, inputClass } from "@/components/admin/FormField";
import { MediaPicker } from "@/components/admin/MediaPicker";
import { SaveButton } from "@/components/admin/SaveButton";
import { prisma } from "@/lib/db";

export default async function EditPagePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const page = await prisma.page.findUnique({
    where: { id },
    include: { sections: { orderBy: { sortOrder: "asc" } } },
  });
  if (!page) notFound();

  return (
    <div>
      <AdminHeader
        title={page.title}
        description="Change headings, copy, CTAs and whether each section is visible."
      />
      <form action={updatePageSeo} className="mb-10 grid gap-4 rounded-[22px] border border-gold/15 p-5 md:grid-cols-2">
        <input type="hidden" name="id" value={page.id} />
        <FormField label="SEO title">
          <input name="seoTitle" defaultValue={page.seoTitle || ""} className={inputClass} />
        </FormField>
        <FormField label="SEO description">
          <input name="seoDescription" defaultValue={page.seoDescription || ""} className={inputClass} />
        </FormField>
        <FormField label="Open Graph image">
          <MediaPicker name="ogImage" defaultValue={page.ogImage || ""} />
        </FormField>
        <FormField label="Canonical URL">
          <input name="canonicalUrl" defaultValue={page.canonicalUrl || ""} className={inputClass} />
        </FormField>
        <label className="flex items-center gap-2 text-sm text-ivory">
          <input type="checkbox" name="published" defaultChecked={page.published} /> Published
        </label>
        <label className="flex items-center gap-2 text-sm text-ivory">
          <input type="checkbox" name="noIndex" defaultChecked={page.noIndex} /> Hide from search
        </label>
        <div>
          <SaveButton>Save page SEO</SaveButton>
        </div>
      </form>

      <div className="space-y-6">
        {page.sections.map((section) => (
          <form key={section.id} action={updatePageSection} className="rounded-[22px] border border-gold/15 p-5">
            <input type="hidden" name="id" value={section.id} />
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-serif text-2xl text-ivory">{section.key}</h2>
              <label className="text-sm text-ivory">
                <input type="checkbox" name="enabled" defaultChecked={section.enabled} /> Enabled
              </label>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <FormField label="Heading">
                <input name="heading" defaultValue={section.heading || ""} className={inputClass} />
              </FormField>
              <FormField label="Subheading / label">
                <input name="subheading" defaultValue={section.subheading || ""} className={inputClass} />
              </FormField>
              <FormField label="Paragraph" className="md:col-span-2">
                <textarea name="paragraph" rows={4} defaultValue={section.paragraph || ""} className={inputClass} />
              </FormField>
              <FormField label="CTA label">
                <input name="ctaLabel" defaultValue={section.ctaLabel || ""} className={inputClass} />
              </FormField>
              <FormField label="CTA URL">
                <input name="ctaUrl" defaultValue={section.ctaUrl || ""} className={inputClass} />
              </FormField>
              <FormField label="Image" className="md:col-span-2">
                <MediaPicker name="image" defaultValue={section.image || ""} />
              </FormField>
              <FormField
                label="Extra JSON"
                hint="Used for hero lines, process steps, values and similar structured fields."
                className="md:col-span-2"
              >
                <textarea
                  name="extra"
                  rows={8}
                  defaultValue={section.extra ? JSON.stringify(section.extra, null, 2) : ""}
                  className={inputClass}
                />
              </FormField>
            </div>
            <div className="mt-4">
              <SaveButton>Save section</SaveButton>
            </div>
          </form>
        ))}
      </div>
    </div>
  );
}
