"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FileText,
  FolderKanban,
  HelpCircle,
  ImageIcon,
  Inbox,
  LayoutDashboard,
  LayoutTemplate,
  LogOut,
  MessageSquareQuote,
  Search,
  Settings,
  Sparkles,
  Users,
  ExternalLink,
} from "lucide-react";
import { cn } from "@/lib/utils";

const items = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/pages", label: "Pages", icon: LayoutTemplate },
  { href: "/admin/services", label: "Services", icon: Sparkles },
  { href: "/admin/projects", label: "Portfolio", icon: FolderKanban },
  { href: "/admin/posts", label: "Posts", icon: FileText },
  { href: "/admin/media", label: "Media", icon: ImageIcon },
  { href: "/admin/testimonials", label: "Testimonials", icon: MessageSquareQuote },
  { href: "/admin/faqs", label: "FAQs", icon: HelpCircle },
  { href: "/admin/enquiries", label: "Enquiries", icon: Inbox },
  { href: "/admin/seo", label: "SEO", icon: Search },
  { href: "/admin/settings", label: "Settings", icon: Settings, admin: true },
  { href: "/admin/users", label: "Users", icon: Users, admin: true },
];

export function AdminSidebar({ isAdmin }: { isAdmin: boolean }) {
  const pathname = usePathname();

  return (
    <aside className="flex h-full w-64 flex-col border-r border-gold/10 bg-ink-soft">
      <div className="px-5 py-6">
        <Link href="/admin" className="flex items-center gap-3">
          <Image src="/branding/lynora-mark.png" alt="" width={219} height={367} className="h-9 w-auto" />
          <span>
            <span className="block text-[0.95rem] font-light tracking-[0.28em] text-ivory">LYNORA</span>
            <span className="mt-1 block text-[0.65rem] tracking-[0.2em] uppercase text-gold">Admin</span>
          </span>
        </Link>
      </div>
      <nav className="flex-1 space-y-1 px-3">
        {items
          .filter((item) => !item.admin || isAdmin)
          .map((item) => {
            const active = pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-stone transition hover:bg-ink-elevated hover:text-ivory",
                  active && "bg-ink-elevated text-ivory",
                )}
              >
                <item.icon size={16} className="text-gold" />
                {item.label}
              </Link>
            );
          })}
      </nav>
      <div className="space-y-1 border-t border-gold/10 p-3">
        <Link href="/" className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-stone hover:text-ivory">
          <ExternalLink size={16} />
          View Website
        </Link>
        <form action="/admin/logout" method="post">
          <button className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-stone hover:text-ivory">
            <LogOut size={16} />
            Logout
          </button>
        </form>
      </div>
    </aside>
  );
}
