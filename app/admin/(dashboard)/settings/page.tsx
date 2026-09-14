import { updateSettings } from "@/app/admin/actions";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { FormField, inputClass } from "@/components/admin/FormField";
import { MediaPicker } from "@/components/admin/MediaPicker";
import { SaveButton } from "@/components/admin/SaveButton";
import { requireAdmin } from "@/lib/auth";
import { getSiteSettings } from "@/lib/content";

export default async function AdminSettingsPage() {
  await requireAdmin("/admin/settings");
  const settings = await getSiteSettings();

  return (
    <div>
      <AdminHeader title="Settings" description="Business details, social links and default SEO." />
      <form action={updateSettings} className="grid gap-4 md:grid-cols-2">
        {Object.entries(settings).map(([key, value]) => {
          if (key === "defaultOgImage") {
            return (
              <FormField key={key} label="Default Open Graph image" className="md:col-span-2">
                <MediaPicker name={key} defaultValue={value} />
              </FormField>
            );
          }
          const textarea = key === "defaultSeoDescription" || key === "footerText" || key === "tagline";
          return (
            <FormField key={key} label={key.replace(/([A-Z])/g, " $1")} className={textarea ? "md:col-span-2" : ""}>
              {textarea ? (
                <textarea name={key} defaultValue={value} rows={3} className={inputClass} />
              ) : (
                <input name={key} defaultValue={value} className={inputClass} />
              )}
            </FormField>
          );
        })}
        <div>
          <SaveButton>Save settings</SaveButton>
        </div>
      </form>
    </div>
  );
}
