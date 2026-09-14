import { notFound } from "next/navigation";
import { saveProject } from "@/app/admin/actions";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { FormField, inputClass } from "@/components/admin/FormField";
import { MediaPicker } from "@/components/admin/MediaPicker";
import { SaveButton } from "@/components/admin/SaveButton";
import { prisma } from "@/lib/db";

export default async function ProjectFormPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project =
    id === "new"
      ? null
      : await prisma.project.findUnique({
          where: { id },
          include: { gallery: { orderBy: { sortOrder: "asc" } } },
        });
  if (id !== "new" && !project) notFound();

  return (
    <div>
      <AdminHeader title={project ? "Edit project" : "Create project"} />
      <form action={saveProject} className="grid gap-4 md:grid-cols-2">
        {project ? <input type="hidden" name="id" value={project.id} /> : null}
        <FormField label="Title">
          <input name="title" defaultValue={project?.title} required className={inputClass} />
        </FormField>
        <FormField label="Slug">
          <input name="slug" defaultValue={project?.slug} className={inputClass} />
        </FormField>
        <FormField label="Industry">
          <input name="industry" defaultValue={project?.industry} className={inputClass} />
        </FormField>
        <FormField label="Project type">
          <input name="projectType" defaultValue={project?.projectType} className={inputClass} />
        </FormField>
        <FormField label="Status">
          <select name="status" defaultValue={project?.status || "CONCEPT"} className={inputClass}>
            <option value="REAL">REAL</option>
            <option value="CONCEPT">CONCEPT</option>
            <option value="INTERNAL">INTERNAL</option>
          </select>
        </FormField>
        <FormField label="Services" hint="Comma-separated, e.g. Websites, Branding">
          <input name="services" defaultValue={project?.services.join(", ")} className={inputClass} />
        </FormField>
        <FormField label="Summary" className="md:col-span-2">
          <textarea name="summary" defaultValue={project?.summary} rows={3} className={inputClass} />
        </FormField>
        <FormField label="Cover image" className="md:col-span-2">
          <MediaPicker name="coverImage" defaultValue={project?.coverImage || ""} />
        </FormField>
        <FormField label="Gallery URLs" hint="One image URL per line. Reorder by changing the order of the lines." className="md:col-span-2">
          <textarea
            name="gallery"
            rows={4}
            defaultValue={project?.gallery.map((item) => item.url).join("\n")}
            className={inputClass}
          />
        </FormField>
        <FormField label="Problem">
          <textarea name="problem" defaultValue={project?.problem} rows={4} className={inputClass} />
        </FormField>
        <FormField label="Solution">
          <textarea name="solution" defaultValue={project?.solution} rows={4} className={inputClass} />
        </FormField>
        <FormField label="Results" className="md:col-span-2">
          <textarea name="results" defaultValue={project?.results} rows={4} className={inputClass} />
        </FormField>
        <FormField label="Testimonial" className="md:col-span-2">
          <textarea name="testimonial" defaultValue={project?.testimonial || ""} rows={3} className={inputClass} />
        </FormField>
        <FormField label="Project URL">
          <input name="projectUrl" defaultValue={project?.projectUrl || ""} className={inputClass} />
        </FormField>
        <FormField label="SEO title">
          <input name="seoTitle" defaultValue={project?.seoTitle || ""} className={inputClass} />
        </FormField>
        <FormField label="SEO description" className="md:col-span-2">
          <input name="seoDescription" defaultValue={project?.seoDescription || ""} className={inputClass} />
        </FormField>
        <label className="text-sm text-ivory">
          <input type="checkbox" name="featured" defaultChecked={project?.featured} /> Featured
        </label>
        <label className="text-sm text-ivory">
          <input type="checkbox" name="published" defaultChecked={project?.published} /> Published
        </label>
        <div>
          <SaveButton />
        </div>
      </form>
    </div>
  );
}
