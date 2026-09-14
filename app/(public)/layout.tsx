import { Footer } from "@/components/public/Footer";
import { Navbar } from "@/components/public/Navbar";
import { getSiteSettings } from "@/lib/content";

export const dynamic = "force-dynamic";

export default async function PublicLayout({ children }: { children: React.ReactNode }) {
  const settings = await getSiteSettings();

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer settings={settings} />
    </div>
  );
}
