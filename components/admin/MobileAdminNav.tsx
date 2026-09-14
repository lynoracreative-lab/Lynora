"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export function MobileAdminNav({ isAdmin }: { isAdmin: boolean }) {
  const [open, setOpen] = useState(false);
  const links = [
    ["/admin", "Dashboard"],
    ["/admin/pages", "Pages"],
    ["/admin/services", "Services"],
    ["/admin/projects", "Portfolio"],
    ["/admin/posts", "Posts"],
    ["/admin/media", "Media"],
    ["/admin/testimonials", "Testimonials"],
    ["/admin/faqs", "FAQs"],
    ["/admin/enquiries", "Enquiries"],
    ["/admin/seo", "SEO"],
    ...(isAdmin
      ? [
          ["/admin/settings", "Settings"],
          ["/admin/users", "Users"],
        ]
      : []),
    ["/", "View website"],
  ] as const;

  return (
    <div className="md:hidden">
      <button type="button" onClick={() => setOpen((value) => !value)} className="text-ivory">
        {open ? <X /> : <Menu />}
      </button>
      {open ? (
        <div className="absolute inset-x-0 top-16 z-40 border-b border-gold/10 bg-ink p-4">
          <div className="grid gap-3">
            {links.map(([href, label]) => (
              <Link key={href} href={href} onClick={() => setOpen(false)} className="text-sm text-stone">
                {label}
              </Link>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
