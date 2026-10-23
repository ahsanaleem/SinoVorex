"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowUp, ArrowUpRight, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { COMPANY } from "./data";
import { FOOTER_COLUMNS } from "./links";
import { BrandLogo } from "./brand";

/**
 * One footer for every page. `onQuote` opens the quote modal where the page has one (otherwise /quote),
 * `onTop` lets the homepage use its smooth scroller, and `children` renders under the bottom bar.
 */
export function SiteFooter({ onQuote, onTop, className = "", children }: {
  onQuote?: () => void; onTop?: () => void; className?: string; children?: ReactNode;
}) {
  const quoteCls = "group inline-flex items-center gap-2 rounded-full bg-flame px-5 py-3 text-[15px] font-medium text-white transition-transform hover:scale-[1.03]";
  const toTop = () => (onTop ? onTop() : window.scrollTo({ top: 0, behavior: "smooth" }));

  return (
    <footer data-theme="dark" className={`relative overflow-hidden bg-ink px-4 pt-16 text-white sm:px-6 md:pt-20 ${className}`}>
      <div className="mx-auto max-w-[1280px]">
        <div className="grid gap-12 border-b border-white/10 pb-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,2.2fr)] lg:gap-16">
          {/* Brand and contact */}
          <div>
            <BrandLogo dark className="h-14 w-auto md:h-16" />
            <p className="mt-5 max-w-[340px] text-[15px] leading-relaxed text-white/65">
              Sourcing, factory checks, quality inspection and shipping from China, for buyers worldwide.
            </p>
            <ul className="mt-7 space-y-1 text-[15px] text-white/75">
              <li><a href={`mailto:${COMPANY.email}`} className="flex min-h-[40px] items-center gap-3 hover:text-white"><Mail size={17} className="shrink-0 text-flame" />{COMPANY.email}</a></li>
              <li><a href={COMPANY.phoneHref} className="flex min-h-[40px] items-center gap-3 hover:text-white"><Phone size={17} className="shrink-0 text-flame" />{COMPANY.phoneDisplay}</a></li>
              <li className="flex min-h-[40px] items-center gap-3">
                <MessageCircle size={17} className="shrink-0 text-flame" />
                <a href={COMPANY.whatsappHref} target="_blank" rel="noopener noreferrer" className="hover:text-white">WhatsApp</a>
                <span className="text-white/30">·</span>
                <span>WeChat {COMPANY.wechatId}</span>
              </li>
            </ul>
            <div className="mt-6">
              {onQuote
                ? <button onClick={onQuote} className={quoteCls}>Get a free quote <ArrowUpRight size={16} className="transition-transform group-hover:rotate-45" /></button>
                : <Link href="/quote" className={quoteCls}>Get a free quote <ArrowUpRight size={16} className="transition-transform group-hover:rotate-45" /></Link>}
            </div>
          </div>

          {/* Link columns: same width, same type, short labels */}
          <nav aria-label="Footer" className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-4">
            {FOOTER_COLUMNS.map((col) => (
              <div key={col.title}>
                <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-white/45">{col.title}</p>
                <ul className="mt-4 space-y-0.5">
                  {col.links.map(([label, href]) => (
                    <li key={href}>
                      <Link href={href} className="inline-block py-1.5 text-[15px] leading-snug text-white/75 transition-colors hover:text-white">{label}</Link>
                    </li>
                  ))}
                  {col.more && (
                    <li>
                      <Link href={col.more[1]} className="mt-1 inline-flex items-center gap-1 py-1.5 text-[14px] font-medium text-flame hover:underline">{col.more[0]} <ArrowUpRight size={14} /></Link>
                    </li>
                  )}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        {/* Legal bar */}
        <div className="flex flex-col gap-5 py-7 text-[13px] text-white/55 md:flex-row md:items-center md:justify-between">
          <div className="space-y-1.5">
            <p>© {new Date().getFullYear()} {COMPANY.brand}, a brand of {COMPANY.legalNameZh} ({COMPANY.legalNameEnGloss})</p>
            <p className="flex items-start gap-2"><MapPin size={14} className="mt-0.5 shrink-0 text-flame" />{COMPANY.address}</p>
            {(COMPANY.licenceNo || COMPANY.icp) && (
              <p className="flex flex-wrap gap-x-4">
                {COMPANY.licenceNo && <span>统一社会信用代码 {COMPANY.licenceNo}</span>}
                {COMPANY.icp && <a href="https://beian.miit.gov.cn/" target="_blank" rel="noopener noreferrer" className="hover:text-white">{COMPANY.icp}</a>}
              </p>
            )}
          </div>
          <div className="flex items-center gap-5">
            <Link href="/privacy" className="py-2 hover:text-white">Privacy</Link>
            <Link href="/terms" className="py-2 hover:text-white">Terms</Link>
            <button onClick={toTop} aria-label="Back to top" className="grid h-11 w-11 place-items-center rounded-full border border-white/15 text-white transition-all duration-500 hover:-translate-y-1 hover:border-flame hover:bg-flame">
              <ArrowUp size={16} />
            </button>
          </div>
        </div>
      </div>
      {children}
    </footer>
  );
}
