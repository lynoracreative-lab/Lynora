import { notFound } from "next/navigation";
import { savePost } from "@/app/admin/actions";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { FormField, inputClass } from "@/components/admin/FormField";
import { MediaPicker } from "@/components/admin/MediaPicker";
import { RichTextEditor } from "@/components/admin/RichTextEditor";
import { SaveButton } from "@/components/admin/SaveButton";
import { prisma } from "@/lib/db";

export default async function PostFormPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const post =
    id === "new"
      ? null
      : await prisma.post.findUnique({
          where: { id },
          include: { tags: { include: { tag: true } }, category: true },
        });
  if (id !== "new" && !post) notFound();
  const categories = await prisma.category.findMany({ orderBy: { name: "asc" } });

  return (
    <div>
      <AdminHeader title={post ? "Edit post" : "Create post"} />
      <form action={savePost} className="grid gap-4">
        {post ? <input type="hidden" name="id" value={post.id} /> : null}
        <div className="grid gap-4 md:grid-cols-2">
          <FormField label="Title">
            <input name="title" defaultValue={post?.title} required className={inputClass} />
          </FormField>
          <FormField label="Slug">
            <input name="slug" defaultValue={post?.slug} className={inputClass} />
          </FormField>
          <FormField label="Excerpt" className="md:col-span-2">
            <textarea name="excerpt" defaultValue={post?.excerpt} rows={3} className={inputClass} />
          </FormField>
          <FormField label="Category">
            <select name="categoryId" defaultValue={post?.categoryId || ""} className={inputClass}>
              <option value="">None</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </FormField>
          <FormField label="Or create category">
            <input name="categoryName" placeholder="New category name" className={inputClass} />
          </FormField>
          <FormField label="Tags" hint="Comma-separated">
            <input name="tags" defaultValue={post?.tags.map((item) => item.tag.name).join(", ")} className={inputClass} />
          </FormField>
          <FormField label="Status">
            <select name="status" defaultValue={post?.status || "DRAFT"} className={inputClass}>
              <option value="DRAFT">DRAFT</option>
              <option value="PUBLISHED">PUBLISHED</option>
            </select>
          </FormField>
          <FormField label="Publish date">
            <input
              type="datetime-local"
              name="publishedAt"
              defaultValue={post?.publishedAt ? post.publishedAt.toISOString().slice(0, 16) : ""}
              className={inputClass}
            />
          </FormField>
          <FormField label="Featured image" className="md:col-span-2">
            <MediaPicker name="featuredImage" defaultValue={post?.featuredImage || ""} />
          </FormField>
          <FormField label="SEO title">
            <input name="seoTitle" defaultValue={post?.seoTitle || ""} className={inputClass} />
          </FormField>
          <FormField label="SEO description">
            <input name="seoDescription" defaultValue={post?.seoDescription || ""} className={inputClass} />
          </FormField>
          <label className="text-sm text-ivory">
            <input type="checkbox" name="featured" defaultChecked={post?.featured} /> Featured post
          </label>
        </div>
        <FormField label="Content">
          <RichTextEditor name="content" defaultValue={post?.content || ""} />
        </FormField>
        <SaveButton>{post?.status === "PUBLISHED" ? "Update post" : "Save post"}</SaveButton>
      </form>
    </div>
  );
}
