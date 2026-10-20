import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { slugify } from "./Blocks";
import type { Block } from "./content/types";
import { GUIDES } from "./content/guides";
import { AUDIENCES } from "./content/audiences";
import { SERVICES } from "./data";
import { SERVICE_CONTENT } from "./content/services";

export const fmtDate = (iso: string) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });

export function Breadcrumbs({ items }: { items: { name: string; path?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink/70">
      <ol className="flex flex-wrap gap-x-2 gap-y-1">
        {items.map((it, i) => (
          <li key={it.name} className="flex gap-2">
            {i > 0 && <span aria-hidden>/</span>}
            {it.path ? <Link href={it.path} className="hover:text-flame">{it.name}</Link> : <span aria-current="page" className="text-ink">{it.name}</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}

/** Title block for long-form pages: breadcrumb, H1, a short quotable summary, dates and a quote CTA. */
export function PageHeader({ crumbs, h1, summary, updated, eyebrow }: {
  crumbs: { name: string; path?: string }[]; h1: string; summary: string; updated?: string; eyebrow?: string;
}) {
  return (
    <header className="max-w-[860px]">
      <Breadcrumbs items={crumbs} />
      {eyebrow && <div className="mt-8 font-mono text-[11px] uppercase tracking-[0.25em] text-flame">{eyebrow}</div>}
      <h1 className="mt-4 font-display text-[clamp(36px,5.2vw,68px)] font-medium leading-[1] tracking-[-0.045em] text-ink">{h1}</h1>
      <p className="mt-6 text-[19px] leading-relaxed text-ink/75">{summary}</p>
      <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3">
        <Link href="/quote" className="group inline-flex items-center gap-3 rounded-full bg-ink py-2 pl-6 pr-2 text-[15px] font-medium text-white transition-shadow hover:shadow-[0_18px_40px_-12px_rgba(255,107,43,0.55)]">
          Get a quote
          <span className="grid h-9 w-9 place-items-center rounded-full bg-flame transition-transform duration-500 group-hover:rotate-45"><ArrowUpRight size={16} /></span>
        </Link>
        {updated && <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink/60">By the Sino Vorex team · Updated <time dateTime={updated}>{fmtDate(updated)}</time></p>}
      </div>
    </header>
  );
}

/** "On this page" list built from the H2s in a block list. */
export function Toc({ blocks }: { blocks: Block[] }) {
  const heads = blocks.flatMap((b) => ("h2" in b ? [{ text: b.h2, id: b.id ?? slugify(b.h2) }] : []));
  if (heads.length < 3) return null;
  return (
    <nav aria-label="On this page" className="rounded-2xl border border-ink/[0.07] bg-white p-5">
      <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink/60">On this page</div>
      <ul className="mt-3 space-y-2 text-[14px] leading-snug">
        {heads.map((h) => <li key={h.id}><a href={`#${h.id}`} className="text-ink/75 hover:text-flame">{h.text}</a></li>)}
      </ul>
    </nav>
  );
}

const TITLE_FOR: Record<string, string> = Object.fromEntries([
  ...GUIDES.map((g) => [`/guides/${g.slug}`, g.h1]),
  ...AUDIENCES.map((a) => [`/sourcing-for/${a.slug}`, a.h1]),
  ...SERVICES.map((s) => [`/services/${s.slug}`, SERVICE_CONTENT[s.slug]?.h1 ?? s.title]),
]);

export function RelatedLinks({ paths, heading = "Related reading" }: { paths: string[]; heading?: string }) {
  const items = paths.filter((p) => TITLE_FOR[p]);
  if (!items.length) return null;
  return (
    <section className="mt-14">
      <h2 className="font-display text-[clamp(24px,2.6vw,30px)] font-medium tracking-[-0.03em] text-ink">{heading}</h2>
      <ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((p) => (
          <li key={p}>
            <Link href={p} className="group flex h-full items-start justify-between gap-3 rounded-2xl border border-ink/[0.07] bg-white p-5 transition-colors hover:border-flame">
              <span className="font-display text-[17px] font-medium leading-snug">{TITLE_FOR[p]}</span>
              <ArrowUpRight size={18} className="mt-0.5 shrink-0 text-flame transition-transform group-hover:rotate-45" />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
