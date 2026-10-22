import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowUpRight, Check, Lightbulb, MessageCircle, Plus } from "lucide-react";
import type { Block, QA } from "./content/types";
import { COMPANY } from "./data";

/** Renders [text](href) links and **bold** inside a plain string. */
export function RichText({ text }: { text: string }) {
  const out: ReactNode[] = [];
  const re = /\[([^\]]+)\]\(([^)]+)\)|\*\*([^*]+)\*\*/g;
  let last = 0, m: RegExpExecArray | null, k = 0;
  while ((m = re.exec(text))) {
    if (m.index > last) out.push(text.slice(last, m.index));
    if (m[1]) {
      const href = m[2];
      out.push(href.startsWith("/")
        ? <Link key={k++} href={href}>{m[1]}</Link>
        : <a key={k++} href={href} target="_blank" rel="noopener noreferrer">{m[1]}</a>);
    } else {
      out.push(<strong key={k++}>{m[3]}</strong>);
    }
    last = re.lastIndex;
  }
  if (last < text.length) out.push(text.slice(last));
  return <>{out}</>;
}

export const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

/** Typography for long-form content; shared by service, guide, audience and about pages. */
export const PROSE =
  "text-[17px] leading-[1.75] text-ink/80 [&_a]:font-medium [&_a]:text-flame [&_a]:underline [&_a]:decoration-flame/40 [&_a]:underline-offset-4 hover:[&_a]:decoration-flame [&_strong]:font-semibold [&_strong]:text-ink";

/** Splits a block list into sections that each start at an H2. */
export function sectionsOf(blocks: Block[]) {
  const out: { title?: string; id?: string; blocks: Block[] }[] = [];
  for (const b of blocks) {
    if ("h2" in b) out.push({ title: b.h2, id: b.id ?? slugify(b.h2), blocks: [] });
    else (out[out.length - 1] ?? (out[0] = { blocks: [] })).blocks.push(b);
  }
  return out;
}

function BlockView({ b }: { b: Block }) {
  if ("h3" in b) return <h3 className="pt-7 font-display text-[20px] font-semibold tracking-[-0.02em] text-ink first:pt-0">{b.h3}</h3>;
  if ("p" in b) return <p className="mt-4 max-w-[68ch] first:mt-0"><RichText text={b.p} /></p>;
  if ("ul" in b) return (
    <ul className="mt-5 space-y-3 first:mt-0">
      {b.ul.map((t, j) => (
        <li key={j} className="flex gap-3">
          <span className="mt-[5px] grid h-5 w-5 shrink-0 place-items-center rounded-full bg-flame/15 text-flame"><Check size={13} strokeWidth={2.5} /></span>
          <span><RichText text={t} /></span>
        </li>
      ))}
    </ul>
  );
  if ("ol" in b) return (
    // Numbered steps as a vertical timeline.
    <ol className="relative mt-6 space-y-5 first:mt-0 before:absolute before:bottom-4 before:left-[17px] before:top-4 before:w-px before:bg-ink/10">
      {b.ol.map((t, j) => (
        <li key={j} className="relative flex gap-4">
          <span className="relative z-10 grid h-9 w-9 shrink-0 place-items-center rounded-full bg-ink font-mono text-[13px] text-white ring-4 ring-white">{j + 1}</span>
          <span className="pt-1"><RichText text={t} /></span>
        </li>
      ))}
    </ol>
  );
  if ("table" in b) {
    const { head, rows, caption } = b.table;
    return (
      <figure className="mt-6 first:mt-0">
        {/* One real table. On phones each row becomes a card and every cell shows its column name (data-label). */}
        <div className="md:overflow-hidden md:rounded-2xl md:border md:border-ink/[0.08]">
          <table className="w-full border-collapse text-left text-[15px] leading-snug max-md:block">
            <thead className="bg-paper max-md:sr-only">
              <tr>{head.map((h, n) => <th key={n} scope="col" className="px-5 py-3.5 text-[13px] font-semibold uppercase tracking-[0.06em] text-ink/70">{h}</th>)}</tr>
            </thead>
            <tbody className="max-md:block max-md:space-y-3">
              {rows.map((r, j) => (
                <tr key={j} className="border-t border-ink/[0.07] even:bg-paper/40 max-md:block max-md:rounded-2xl max-md:border max-md:border-ink/[0.08] max-md:bg-paper/50 max-md:p-4">
                  {r.map((c, n) => n === 0
                    ? <th key={n} scope="row" className="px-5 py-4 align-top font-semibold text-ink max-md:block max-md:p-0"><RichText text={c} /></th>
                    : <td key={n} data-label={head[n] || undefined} className="px-5 py-4 align-top text-ink/75 max-md:block max-md:px-0 max-md:pb-0 max-md:pt-2 max-md:before:block max-md:before:text-[12px] max-md:before:font-semibold max-md:before:uppercase max-md:before:tracking-[0.06em] max-md:before:text-ink/55 max-md:before:content-[attr(data-label)]"><RichText text={c} /></td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {caption && <figcaption className="mt-3 text-[13px] leading-relaxed text-ink/60">{caption}</figcaption>}
      </figure>
    );
  }
  if ("note" in b) return (
    <aside className="mt-6 flex gap-4 rounded-2xl bg-flame/[0.07] p-5 text-[16px] first:mt-0">
      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-flame text-white"><Lightbulb size={17} /></span>
      <div>
        {b.label && <div className="mb-1 text-[13px] font-semibold uppercase tracking-[0.06em] text-flame">{b.label}</div>}
        <RichText text={b.note} />
      </div>
    </aside>
  );
  return null;
}

/** A short "need help?" prompt placed halfway through long pages. */
export function InlineCta() {
  return (
    <div data-theme="dark" className="flex flex-col gap-5 rounded-[28px] bg-ink p-6 text-white sm:flex-row sm:items-center sm:justify-between md:p-8">
      <div>
        <p className="font-display text-[22px] font-medium leading-tight tracking-[-0.02em]">Not sure what you need?</p>
        <p className="mt-1 text-[15px] text-white/70">Tell us about your product and we&apos;ll get back to you within 24 hours.</p>
      </div>
      <div className="flex flex-wrap gap-2">
        <Link href="/quote" className="inline-flex items-center gap-2 rounded-full bg-flame px-5 py-3 text-[15px] font-medium text-white">Get a quote <ArrowUpRight size={16} /></Link>
        <a href={COMPANY.whatsappHref} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-white/10 px-5 py-3 text-[15px] font-medium text-white hover:bg-white/20"><MessageCircle size={16} /> WhatsApp</a>
      </div>
    </div>
  );
}

/** Long-form content as numbered section cards, with a help prompt halfway through. */
export function Blocks({ blocks, cta = true }: { blocks: Block[]; cta?: boolean }) {
  const sections = sectionsOf(blocks);
  const numbered = sections.filter((s) => s.title);
  const ctaAfter = cta && numbered.length >= 4 ? Math.floor(numbered.length / 2) - 1 : -1;
  let n = 0;
  return (
    <div className="space-y-5">
      {sections.map((s, i) => {
        if (!s.title) return <div key={i} className={PROSE}>{s.blocks.map((b, j) => <BlockView key={j} b={b} />)}</div>;
        const num = n++;
        return (
          <div key={i} className="space-y-5">
            <section id={s.id} aria-labelledby={`${s.id}-h`} className={`${PROSE} scroll-mt-28 rounded-[28px] border border-ink/[0.07] bg-white p-6 md:p-9`}>
              <div className="mb-5 flex items-start gap-4">
                <span className="mt-0.5 grid h-9 min-w-9 shrink-0 place-items-center rounded-xl bg-flame/10 px-2 font-mono text-[13px] font-medium text-flame">{String(num + 1).padStart(2, "0")}</span>
                <h2 id={`${s.id}-h`} className="font-display text-[clamp(23px,2.6vw,30px)] font-medium leading-tight tracking-[-0.03em] text-ink">{s.title}</h2>
              </div>
              <div className="md:pl-[52px]">{s.blocks.map((b, j) => <BlockView key={j} b={b} />)}</div>
            </section>
            {num === ctaAfter && <InlineCta />}
          </div>
        );
      })}
    </div>
  );
}

/** Accordion FAQ. Answers are always in the HTML (native <details>), so crawlers and AI engines read them. */
export function FaqList({ items, heading = "Frequently asked questions", id = "faq" }: { items: QA[]; heading?: string; id?: string }) {
  return (
    <section id={id} className="scroll-mt-28 mt-10">
      <h2 className="font-display text-[clamp(23px,2.6vw,30px)] font-medium tracking-[-0.03em] text-ink">{heading}</h2>
      <div className="mt-5 space-y-3">
        {items.map((f, i) => (
          <details key={f.q} open={i === 0} className="group rounded-2xl border border-ink/[0.08] bg-white open:border-flame/30 open:shadow-[0_12px_30px_-20px_rgba(255,107,43,0.5)]">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 [&::-webkit-details-marker]:hidden">
              <h3 className="font-display text-[18px] font-medium leading-snug tracking-[-0.01em] text-ink">{f.q}</h3>
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-ink/15 text-ink transition-transform duration-300 group-open:rotate-45 group-open:border-flame group-open:bg-flame group-open:text-white"><Plus size={15} /></span>
            </summary>
            <p className={`${PROSE} px-5 pb-5 text-[16px]`}><RichText text={f.a} /></p>
          </details>
        ))}
      </div>
    </section>
  );
}
