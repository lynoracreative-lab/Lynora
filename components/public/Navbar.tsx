"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/public/Logo";
import { ButtonLink } from "@/components/public/ButtonLink";
import { cn } from "@/lib/utils";

const links = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/#process", label: "Process" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    menuRef.current?.removeAttribute("open");
  }, [pathname]);

  const closeMenu = () => menuRef.current?.removeAttribute("open");

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={cn(
          "transition-colors duration-300",
          scrolled ? "border-b border-gold/10 bg-ink/90 backdrop-blur-xl" : "bg-transparent",
        )}
      >
        <div className="mx-auto flex w-full items-center justify-between px-5 py-4 sm:px-8 lg:px-12 xl:px-16">
          <Logo compact />
          <nav className="hidden items-center gap-8 lg:flex">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-[0.72rem] tracking-[0.22em] uppercase text-stone transition-colors hover:text-ivory",
                  pathname === link.href && "text-ivory",
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="hidden lg:block">
            <ButtonLink href="/contact" variant="gold-outline">
              Get in Touch
            </ButtonLink>
          </div>
          <details ref={menuRef} className="group lg:hidden">
            <summary
              className="flex cursor-pointer list-none items-center justify-center rounded-full border border-gold/25 p-2 text-ivory marker:content-none [&::-webkit-details-marker]:hidden"
              aria-label="Open menu"
            >
              <Menu size={18} className="group-open:hidden" />
              <X size={18} className="hidden group-open:block" />
            </summary>
            <nav
              id="mobile-navigation"
              className="absolute inset-x-0 top-full z-[60] max-h-[min(28rem,calc(100svh-4.5rem))] overflow-y-auto border-b border-gold/10 bg-ink"
            >
              <div className="mx-auto flex w-full flex-col gap-5 px-5 py-6 sm:px-8 lg:px-12 xl:px-16">
                {links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={closeMenu}
                    className="text-sm tracking-[0.2em] uppercase text-ivory"
                  >
                    {link.label}
                  </Link>
                ))}
                <Link
                  href="/contact"
                  onClick={closeMenu}
                  className="inline-flex items-center justify-center rounded-full border border-gold/70 px-6 py-3 text-[0.72rem] font-medium tracking-[0.2em] uppercase text-gold"
                >
                  Get in Touch
                </Link>
              </div>
            </nav>
          </details>
        </div>
      </div>
    </header>
  );
}
