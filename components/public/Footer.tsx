import Link from "next/link";
import { Logo } from "@/components/public/Logo";
import { Container } from "@/components/public/Container";
import type { SiteSettings } from "@/lib/constants";
import { whatsappLink } from "@/lib/utils";

const nav = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const serviceLinks = [
  { href: "/services/website-design-development", label: "Web Design" },
  { href: "/services/branding-visual-identity", label: "Branding" },
  { href: "/services/digital-marketing", label: "Marketing" },
  { href: "/services/seo-search-visibility", label: "SEO" },
  { href: "/services/content-creation", label: "Content" },
];

export function Footer({ settings }: { settings: SiteSettings }) {
  const socials = [
    { label: "Instagram", href: settings.instagram },
    { label: "LinkedIn", href: settings.linkedin },
    { label: "TikTok", href: settings.tiktok },
    { label: "Facebook", href: settings.facebook },
  ];

  return (
    <footer className="border-t border-gold/10 bg-ink">
      <Container className="grid gap-12 py-16 md:grid-cols-4">
        <div className="md:col-span-1">
          <Logo compact />
          <p className="mt-5 max-w-xs text-[0.72rem] tracking-[0.22em] uppercase text-gold">
            {settings.tagline}
          </p>
        </div>
        <div>
          <p className="section-label mb-4">Navigation</p>
          <ul className="space-y-3 text-sm text-stone">
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-ivory">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="section-label mb-4">Services</p>
          <ul className="space-y-3 text-sm text-stone">
            {serviceLinks.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-ivory">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="section-label mb-4">Contact</p>
          <ul className="space-y-3 text-sm text-stone">
            <li>
              <a href={`mailto:${settings.email}`} className="hover:text-ivory">
                {settings.email}
              </a>
            </li>
            <li>
              <a href={whatsappLink(settings.whatsapp)} className="hover:text-ivory">
                {settings.whatsapp}
              </a>
            </li>
            <li>{settings.location}</li>
          </ul>
          <div className="mt-6 flex flex-wrap gap-4 text-[0.7rem] tracking-[0.18em] uppercase text-stone">
            {socials.map((item) =>
              item.href ? (
                <a key={item.label} href={item.href} className="hover:text-gold">
                  {item.label}
                </a>
              ) : (
                <span key={item.label}>{item.label}</span>
              ),
            )}
          </div>
        </div>
      </Container>
      <div className="border-t border-gold/10">
        <Container className="flex flex-col gap-3 py-6 text-xs text-stone sm:flex-row sm:items-center sm:justify-between">
          <p>{settings.footerText}</p>
          <Link href="/blog" className="hover:text-ivory">
            Journal
          </Link>
        </Container>
      </div>
    </footer>
  );
}
