import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowUpRight, Check, ChevronRight, Clock, Mail, MessageCircle } from "lucide-react";
import { RichText, slugify } from "./Blocks";
import type { Block, QA } from "./content/types";
import { GUIDES } from "./content/guides";
import { AUDIENCES } from "./content/audiences";
import { ALL_SERVICES, COMPANY } from "./data";
import { SERVICE_CONTENT } from "./content/services";
import { MARKETS } from "./content/markets";
import { TOOLS } from "./content/tools";
import { ReadingProgress, TocMobile, TocSidebar, type Heading } from "./PageNav";

export const fmtDate = (iso: string) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });

/** Approximate reading time in minutes for a block list plus FAQs. */
export function readMinutes(blocks: Block[], faqs: QA[] = []) {
  // Counts every string, including table cells, by walking the JSON.
  const words = JSON.stringify([blocks, faqs]).match(/[A-Za-z0-9][\w'’-]*/g)?.length ?? 0;
  return Math.max(2, Math.round(words / 220));
}

export function headsOf(blocks: Block[], extra: Heading[] = []): Heading[] {
  return [...blocks.flatMap((b) => ("h2" in b ? [{ text: b.h2, id: b.id ?? slugify(b.h2) }] : [])), ...extra];
}

export function Breadcrumbs({ items }: { items: { name: string; path?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-[14px] text-ink/60">
      <ol className="flex flex-wrap items-center gap-x-1.5 gap-y-1">
        {items.map((it, i) => (
          <li key={it.name} className="flex items-center gap-1.5">
            {i > 0 && <ChevronRight size={14} aria-hidden className="text-ink/35" />}
            {it.path
              ? <Link href={it.path} prefetch={it.path === "/" ? false : undefined} className="-my-3 inline-block rounded py-3 hover:text-flame hover:underline">{it.name}</Link>
              : <span aria-current="page" className="font-medium text-ink">{it.name}</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}

/** Title block for inner pages: breadcrumb, H1, a plain-language lead, reading time and a quote CTA. */
export function PageHeader({ crumbs, h1, summary, updated, eyebrow, minutes, icon, quoteHref = "/quote", byline }: {
  crumbs: { name: string; path?: string }[]; h1: string; summary: string; updated?: string; eyebrow?: string; minutes?: number; icon?: ReactNode; quoteHref?: string; byline?: string;
}) {
  return (
    <header className="max-w-[880px]">
      <Breadcrumbs items={crumbs} />
      <div className="mt-8 flex items-center gap-3">
        {icon && <span className="grid h-11 w-11 place-items-center rounded-2xl bg-flame text-white">{icon}</span>}
        {eyebrow && <span className="rounded-full bg-flame/10 px-3 py-1 text-[13px] font-semibold text-flame">{eyebrow}</span>}
      </div>
      <h1 className="mt-4 font-display text-[clamp(34px,5vw,64px)] font-medium leading-[1.02] tracking-[-0.04em] text-ink">{h1}</h1>
      <p className="mt-5 max-w-[68ch] text-[19px] leading-relaxed text-ink/75">{summary}</p>
      <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3">
        <Link href={quoteHref} className="group inline-flex items-center gap-3 rounded-full bg-ink py-2 pl-6 pr-2 text-[15px] font-medium text-white transition-shadow hover:shadow-[0_18px_40px_-12px_rgba(255,107,43,0.55)]">
          Get a free quote
          <span className="grid h-9 w-9 place-items-center rounded-full bg-flame transition-transform duration-500 group-hover:rotate-45"><ArrowUpRight size={16} /></span>
        </Link>
        {(updated || minutes) && (
          <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[14px] text-ink/60">
            {byline && <span>By <Link href="/about" className="font-medium text-ink hover:text-flame">{byline}</Link></span>}
            {minutes && <span className="inline-flex items-center gap-1.5"><Clock size={15} className="text-flame" />{minutes} min read</span>}
            {updated && <span>Updated <time dateTime={updated}>{fmtDate(updated)}</time></span>}
          </p>
        )}
      </div>
    </header>
  );
}

/** "In short" box: the answer first, for readers who only skim. */
export function InShort({ title = "In short", points }: { title?: string; points: string[] }) {
  return (
    <section aria-label={title} className="rounded-[28px] border border-flame/20 bg-gradient-to-br from-[#FFF1E9] to-white p-6 md:p-8">
      <h2 className="text-[13px] font-semibold uppercase tracking-[0.08em] text-flame">{title}</h2>
      <ul className="mt-4 grid gap-3 md:grid-cols-2">
        {points.map((p) => (
          <li key={p} className="flex gap-3 text-[16px] leading-relaxed text-ink/85 [&_a]:font-medium [&_a]:text-flame [&_a]:underline [&_strong]:font-semibold [&_strong]:text-ink">
            <span className="mt-[5px] grid h-5 w-5 shrink-0 place-items-center rounded-full bg-flame text-white"><Check size={12} strokeWidth={3} /></span>
            <span><RichText text={p} /></span>
          </li>
        ))}
      </ul>
    </section>
  );
}

/** Sidebar card: a human to talk to. */
export function HelpCard() {
  return (
    <div data-theme="dark" className="rounded-[24px] bg-ink p-6 text-white">
      <p className="font-display text-[20px] font-medium leading-tight tracking-[-0.02em]">Have a question?</p>
      <p className="mt-2 text-[14px] leading-relaxed text-white/70">Talk to our team in China. We reply within 24 hours.</p>
      <div className="mt-5 space-y-2">
        <Link href="/quote" className="flex items-center justify-between rounded-full bg-flame px-5 py-3 text-[15px] font-medium">Get a free quote <ArrowUpRight size={16} /></Link>
        <div className="grid grid-cols-2 gap-2">
          <a href={COMPANY.whatsappHref} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 rounded-full bg-white/10 px-4 py-3 text-[14px] hover:bg-white/20"><MessageCircle size={15} /> WhatsApp</a>
          <a href={`mailto:${COMPANY.email}`} className="flex items-center justify-center gap-2 rounded-full bg-white/10 px-4 py-3 text-[14px] hover:bg-white/20"><Mail size={15} /> Email</a>
        </div>
      </div>
    </div>
  );
}

/** Two-column reading layout: content, plus a sticky sidebar (table of contents, help card) on desktop. */
export function ReadingLayout({ heads, children, aside }: { heads: Heading[]; children: ReactNode; aside?: ReactNode }) {
  const showToc = heads.length >= 3;
  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px]">
      <ReadingProgress />
      <div className="min-w-0 space-y-5">
        {showToc && <TocMobile heads={heads} />}
        {children}
      </div>
      <aside className="hidden space-y-4 lg:block">
        {aside}
        {/* Only the contents list and help card follow the reader, so the sticky part fits on laptop screens. */}
        <div className="sticky top-24 space-y-4">
          {showToc && <TocSidebar heads={heads} />}
          <HelpCard />
        </div>
      </aside>
    </div>
  );
}

const TITLE_FOR: Record<string, string> = Object.fromEntries([
  ...GUIDES.map((g) => [`/guides/${g.slug}`, g.h1]),
  ...AUDIENCES.map((a) => [`/sourcing-for/${a.slug}`, a.h1]),
  ...ALL_SERVICES.map((s) => [`/services/${s.slug}`, SERVICE_CONTENT[s.slug]?.h1 ?? s.title]),
  ...MARKETS.map((m) => [`/markets/${m.slug}`, m.h1]),
  ...TOOLS.map((t) => [`/tools/${t.slug}`, t.h1]),
]);

const KIND_FOR = (p: string) =>
  p.startsWith("/guides") ? "Guide" : p.startsWith("/services") ? "Service" : p.startsWith("/tools") ? "Free tool" : p.startsWith("/markets") ? "Market" : "Who we help";

export function RelatedLinks({ paths, heading = "Keep reading" }: { paths: string[]; heading?: string }) {
  const items = paths.filter((p) => TITLE_FOR[p]);
  if (!items.length) return null;
  return (
    <section className="mt-16">
      <h2 className="font-display text-[clamp(24px,2.6vw,30px)] font-medium tracking-[-0.03em] text-ink">{heading}</h2>
      <ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((p) => (
          <li key={p}>
            <Link href={p} className="group flex h-full flex-col justify-between gap-4 rounded-[24px] border border-ink/[0.07] bg-white p-6 transition-all hover:-translate-y-0.5 hover:border-flame hover:shadow-[0_20px_40px_-28px_rgba(14,14,22,0.4)]">
              <span className="text-[12px] font-semibold uppercase tracking-[0.08em] text-flame">{KIND_FOR(p)}</span>
              <span className="font-display text-[18px] font-medium leading-snug">{TITLE_FOR[p]}</span>
              <span className="inline-flex items-center gap-1 text-[14px] font-medium text-ink/60 group-hover:text-flame">Read <ArrowUpRight size={15} className="transition-transform group-hover:rotate-45" /></span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
