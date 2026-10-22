"use client";

import { useCallback, useEffect, useState, type ReactNode } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { clsx } from "clsx";
import { COMPANY, SERVICES } from "./data";
import { FOOTER_GUIDES, FOOTER_RESOURCES, SUBPAGE_NAV } from "./links";
import { BrandLogo } from "./brand";
import { HeaderWhatsApp } from "./ChatButtons";

// Animated widgets (framer-motion) load after the page, keeping subpages light.
const FloatingChat = dynamic(() => import("./FloatingChat").then((m) => m.FloatingChat), { ssr: false });
const ContactModal = dynamic(() => import("./ContactModal").then((m) => m.ContactModal), { ssr: false });

/** Lightweight layout for service, guide, legal and other subpages (no intro screen, no heavy animation). */
export function SubpageShell({ children, quoteCta = true }: { children: ReactNode; quoteCta?: boolean }) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const openQuote = useCallback(() => { setMounted(true); setOpen(true); }, []);
  const close = useCallback(() => setOpen(false), []);

  useEffect(() => setMenuOpen(false), [pathname]);
  useEffect(() => {
    document.documentElement.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.documentElement.style.overflow = ""; };
  }, [menuOpen]);

  const isActive = (href: string) => !href.includes("#") && (pathname === href || pathname.startsWith(`${href}/`));

  return (
    <div className="min-h-screen bg-paper font-display text-ink">
      <header className="sticky top-0 z-[150] border-b border-ink/[0.07] bg-paper/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1280px] items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <Link href="/" aria-label="Sino Vorex home"><BrandLogo className="h-11 w-auto md:h-12" /></Link>

          <nav aria-label="Main" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {SUBPAGE_NAV.map(([label, href]) => (
                <li key={href}>
                  <Link href={href} aria-current={isActive(href) ? "page" : undefined}
                    className={clsx("rounded-full px-4 py-2 text-[14px] font-medium transition-colors", isActive(href) ? "bg-ink/[0.06] text-ink" : "text-ink/70 hover:text-ink")}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <HeaderWhatsApp />
            <button onClick={openQuote} className="group hidden items-center gap-2 rounded-full bg-ink py-2.5 pl-5 pr-2.5 text-[14px] font-medium text-white sm:inline-flex">
              Get a Quote
              <span className="grid h-7 w-7 place-items-center rounded-full bg-flame transition-transform duration-500 group-hover:rotate-45"><ArrowUpRight size={15} /></span>
            </button>
            <button
              onClick={() => setMenuOpen((o) => !o)}
              aria-expanded={menuOpen}
              aria-controls="subpage-menu"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              className="grid h-12 w-12 place-items-center rounded-full bg-ink text-white lg:hidden"
            >
              {menuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </header>

      {/* Always in the HTML (crawlable); shown on small screens when opened. */}
      <nav id="subpage-menu" aria-label="Mobile" hidden={!menuOpen} data-theme="dark"
        className="fixed inset-x-0 bottom-0 top-[73px] z-[140] overflow-y-auto bg-ink px-6 pb-10 pt-8 text-white lg:hidden">
        <ul className="space-y-1">
          <li><Link href="/" className="block py-2 font-display text-[30px] font-medium tracking-[-0.03em]">Home</Link></li>
          {SUBPAGE_NAV.map(([label, href]) => (
            <li key={href}><Link href={href} className="block py-2 font-display text-[30px] font-medium tracking-[-0.03em]">{label}</Link></li>
          ))}
        </ul>
        <div className="mt-8 font-mono text-[11px] uppercase tracking-[0.25em] text-white/60">Services</div>
        <ul className="mt-3 grid gap-1 sm:grid-cols-2">
          {SERVICES.map((s) => <li key={s.slug}><Link href={`/services/${s.slug}`} className="block py-1.5 text-[17px] text-white/80 hover:text-white">{s.title}</Link></li>)}
        </ul>
        <Link href="/quote" className="mt-10 block w-full rounded-full bg-flame py-4 text-center text-base font-medium">Request a Quote</Link>
      </nav>

      <main>{children}</main>

      {quoteCta && (
        <section className="px-4 pb-20 sm:px-6">
          <div className="mx-auto flex max-w-[1280px] flex-col items-start justify-between gap-6 rounded-[32px] bg-gradient-to-br from-[#FF7A3D] via-flame to-flame-deep p-8 text-white md:flex-row md:items-center md:p-12">
            <div>
              <h2 className="font-display text-[clamp(28px,4vw,44px)] font-medium leading-tight tracking-[-0.04em]">Tell us what you want to source</h2>
              <p className="mt-2 text-[16px] text-white/85">We reply within 24 hours with next steps.</p>
            </div>
            <button onClick={openQuote} className="rounded-full bg-white px-7 py-4 text-[15px] font-medium text-ink transition-transform hover:scale-[1.03]">Request a Quote</button>
          </div>
        </section>
      )}

      <footer data-theme="dark" className="bg-ink px-4 pb-28 pt-12 text-white sm:px-6 lg:pb-12">
        <div className="mx-auto grid max-w-[1280px] gap-10 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-[1.3fr_1fr_1fr_1.2fr_1.2fr]">
          <div>
            <BrandLogo dark className="h-16 w-auto" />
            <p className="mt-4 max-w-[320px] text-[14px] leading-relaxed text-white/70">We help buyers around the world find, check and ship products from factories across China.</p>
          </div>
          <div>
            <div className="mb-4 font-mono text-[11px] uppercase tracking-[0.25em] text-white/65">Services</div>
            <ul className="space-y-0.5 text-[14px]">
              {SERVICES.map((s) => <li key={s.slug}><Link href={`/services/${s.slug}`} className="inline-block py-1.5 text-white/75 hover:text-white">{s.title}</Link></li>)}
            </ul>
          </div>
          <div>
            <div className="mb-4 font-mono text-[11px] uppercase tracking-[0.25em] text-white/65">Resources</div>
            <ul className="space-y-0.5 text-[14px]">
              {FOOTER_RESOURCES.map(([label, href]) => <li key={href}><Link href={href} className="inline-block py-1.5 text-white/75 hover:text-white">{label}</Link></li>)}
            </ul>
          </div>
          <div>
            <div className="mb-4 font-mono text-[11px] uppercase tracking-[0.25em] text-white/65">Guides</div>
            <ul className="space-y-0.5 text-[14px]">
              {FOOTER_GUIDES.map(([label, href]) => <li key={href}><Link href={href} className="inline-block py-1.5 text-white/75 hover:text-white">{label}</Link></li>)}
            </ul>
          </div>
          <div>
            <div className="mb-4 font-mono text-[11px] uppercase tracking-[0.25em] text-white/65">Contact</div>
            <ul className="space-y-2 text-[14px] text-white/75">
              <li><a href={`mailto:${COMPANY.email}`} className="hover:text-white">{COMPANY.email}</a></li>
              <li><a href={COMPANY.phoneHref} className="hover:text-white">{COMPANY.phoneDisplay}</a></li>
              <li><a href={COMPANY.whatsappHref} target="_blank" rel="noopener noreferrer" className="hover:text-white">WhatsApp</a> · WeChat: {COMPANY.wechatId}</li>
              <li>{COMPANY.address}<span className="block text-white/65">{COMPANY.addressZh}</span></li>
            </ul>
          </div>
        </div>
        <div className="mx-auto mt-10 flex max-w-[1280px] flex-col gap-2 border-t border-white/10 pt-6 text-[13px] text-white/65 md:flex-row md:justify-between">
          <span>{COMPANY.brand} is a brand of {COMPANY.legalNameZh}{COMPANY.licenceNo && ` · 统一社会信用代码 ${COMPANY.licenceNo}`}</span>
          <span className="flex flex-wrap gap-4">
            {COMPANY.icp && <a href="https://beian.miit.gov.cn/" target="_blank" rel="noopener noreferrer" className="hover:text-white">{COMPANY.icp}</a>}
            <Link href="/privacy" className="hover:text-white">Privacy policy</Link>
            <Link href="/terms" className="hover:text-white">Terms of service</Link>
            <span>© {new Date().getFullYear()} Sino Vorex</span>
          </span>
        </div>
      </footer>

      {mounted && <ContactModal open={open} onClose={close} />}
      {/* Not on the quote pages, where it would cover form fields on phones. */}
      {!pathname.startsWith("/quote") && <FloatingChat />}
    </div>
  );
}
