"use client";

import { useCallback, useState, type ReactNode } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { COMPANY, SERVICES } from "./data";
import { BrandLogo } from "./primitives";
import { ContactModal } from "./ContactModal";
import { FloatingChat, HeaderWhatsApp } from "./ChatButtons";

/** Lightweight layout for service and legal pages (no intro screen, no heavy animation). */
export function SubpageShell({ children, quoteCta = true }: { children: ReactNode; quoteCta?: boolean }) {
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);

  return (
    <div className="min-h-screen bg-paper font-display text-ink">
      <header className="sticky top-0 z-[150] border-b border-ink/[0.07] bg-paper/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1280px] items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <Link href="/" aria-label="Sino Vorex home"><BrandLogo className="h-11 w-auto md:h-12" /></Link>
          <div className="flex items-center gap-2">
            <Link href="/" className="hidden items-center gap-1.5 rounded-full px-4 py-2 text-[14px] font-medium text-ink/75 hover:text-ink sm:inline-flex">
              <ArrowLeft size={16} /> Home
            </Link>
            <HeaderWhatsApp />
            <button onClick={() => setOpen(true)} className="group inline-flex items-center gap-2 rounded-full bg-ink py-2.5 pl-5 pr-2.5 text-[14px] font-medium text-white">
              Get a Quote
              <span className="grid h-7 w-7 place-items-center rounded-full bg-flame transition-transform duration-500 group-hover:rotate-45"><ArrowUpRight size={15} /></span>
            </button>
          </div>
        </div>
      </header>

      <main>{children}</main>

      {quoteCta && (
        <section className="px-4 pb-20 sm:px-6">
          <div className="mx-auto flex max-w-[1280px] flex-col items-start justify-between gap-6 rounded-[32px] bg-gradient-to-br from-[#FF7A3D] via-flame to-flame-deep p-8 text-white md:flex-row md:items-center md:p-12">
            <div>
              <h2 className="font-display text-[clamp(28px,4vw,44px)] font-medium leading-tight tracking-[-0.04em]">Tell us what you want to source</h2>
              <p className="mt-2 text-[16px] text-white/85">We reply within 24 hours with next steps.</p>
            </div>
            <button onClick={() => setOpen(true)} className="rounded-full bg-white px-7 py-4 text-[15px] font-medium text-ink transition-transform hover:scale-[1.03]">Request a Quote</button>
          </div>
        </section>
      )}

      <footer data-theme="dark" className="bg-ink px-4 py-12 text-white sm:px-6">
        <div className="mx-auto grid max-w-[1280px] gap-10 md:grid-cols-[1.5fr_1fr_1fr]">
          <div>
            <BrandLogo dark className="h-16 w-auto" />
            <p className="mt-4 max-w-[320px] text-[14px] leading-relaxed text-white/70">Sourcing, quality inspection and shipping from factories across China, for buyers worldwide.</p>
          </div>
          <div>
            <div className="mb-4 font-mono text-[11px] uppercase tracking-[0.25em] text-white/65">Services</div>
            <ul className="space-y-2 text-[14px]">
              {SERVICES.map((s) => <li key={s.slug}><Link href={`/services/${s.slug}`} className="text-white/75 hover:text-white">{s.title}</Link></li>)}
            </ul>
          </div>
          <div>
            <div className="mb-4 font-mono text-[11px] uppercase tracking-[0.25em] text-white/65">Contact</div>
            <ul className="space-y-2 text-[14px] text-white/75">
              <li><a href={`mailto:${COMPANY.email}`} className="hover:text-white">{COMPANY.email}</a></li>
              <li><a href={COMPANY.phoneHref} className="hover:text-white">{COMPANY.phoneDisplay}</a></li>
              <li><a href={COMPANY.whatsappHref} target="_blank" rel="noopener noreferrer" className="hover:text-white">WhatsApp</a> · WeChat: {COMPANY.wechatId}</li>
              <li>{COMPANY.address}</li>
            </ul>
          </div>
        </div>
        <div className="mx-auto mt-10 flex max-w-[1280px] flex-col gap-2 border-t border-white/10 pt-6 text-[13px] text-white/65 md:flex-row md:justify-between">
          <span>{COMPANY.legalNameZh} · {COMPANY.legalNameEn}{COMPANY.licenceNo && ` · 统一社会信用代码 ${COMPANY.licenceNo}`}</span>
          <span className="flex flex-wrap gap-4">
            {COMPANY.icp && <a href="https://beian.miit.gov.cn/" target="_blank" rel="noopener noreferrer" className="hover:text-white">{COMPANY.icp}</a>}
            <Link href="/privacy" className="hover:text-white">Privacy policy</Link>
            <Link href="/terms" className="hover:text-white">Terms of service</Link>
            <span>© {new Date().getFullYear()} Sino Vorex</span>
          </span>
        </div>
      </footer>

      <ContactModal open={open} onClose={close} />
      <FloatingChat />
    </div>
  );
}
