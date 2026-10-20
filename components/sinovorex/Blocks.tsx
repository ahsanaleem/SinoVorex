import type { ReactNode } from "react";
import Link from "next/link";
import type { Block, QA } from "./content/types";

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
  "text-[17px] leading-[1.7] text-ink/80 [&_a]:font-medium [&_a]:text-flame [&_a]:underline [&_a]:underline-offset-2 [&_strong]:font-semibold [&_strong]:text-ink";

export function Blocks({ blocks }: { blocks: Block[] }) {
  return (
    <div className={PROSE}>
      {blocks.map((b, i) => {
        if ("h2" in b) return <h2 key={i} id={b.id ?? slugify(b.h2)} className="scroll-mt-28 pt-10 font-display text-[clamp(26px,3vw,34px)] font-medium leading-tight tracking-[-0.03em] text-ink first:pt-0">{b.h2}</h2>;
        if ("h3" in b) return <h3 key={i} className="pt-6 font-display text-[21px] font-medium tracking-[-0.02em] text-ink">{b.h3}</h3>;
        if ("p" in b) return <p key={i} className="mt-4"><RichText text={b.p} /></p>;
        if ("ul" in b) return (
          <ul key={i} className="mt-4 space-y-2">
            {b.ul.map((t, j) => <li key={j} className="relative pl-6 before:absolute before:left-0 before:top-[0.7em] before:h-2 before:w-2 before:rounded-full before:bg-flame"><RichText text={t} /></li>)}
          </ul>
        );
        if ("ol" in b) return (
          <ol key={i} className="mt-4 space-y-3 [counter-reset:step]">
            {b.ol.map((t, j) => (
              <li key={j} className="relative pl-10 [counter-increment:step] before:absolute before:left-0 before:top-0.5 before:grid before:h-7 before:w-7 before:place-items-center before:rounded-full before:bg-ink before:font-mono before:text-[12px] before:text-white before:content-[counter(step)]"><RichText text={t} /></li>
            ))}
          </ol>
        );
        if ("table" in b) return (
          <div key={i} className="mt-6 overflow-x-auto rounded-2xl border border-ink/[0.08] bg-white">
            <table className="w-full min-w-[560px] border-collapse text-left text-[15px] leading-snug">
              {b.table.caption && <caption className="px-5 pt-4 text-left font-mono text-[11px] uppercase tracking-[0.18em] text-ink/65">{b.table.caption}</caption>}
              <thead>
                <tr>{b.table.head.map((h) => <th key={h} scope="col" className="border-b border-ink/10 px-5 py-3 font-semibold text-ink">{h}</th>)}</tr>
              </thead>
              <tbody>
                {b.table.rows.map((r, j) => (
                  <tr key={j} className="border-b border-ink/[0.06] last:border-0">
                    {r.map((c, n) => n === 0
                      ? <th key={n} scope="row" className="px-5 py-3 align-top font-medium text-ink"><RichText text={c} /></th>
                      : <td key={n} className="px-5 py-3 align-top text-ink/75"><RichText text={c} /></td>)}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
        return (
          <aside key={i} className="mt-6 rounded-2xl border-l-4 border-flame bg-flame/[0.06] px-5 py-4 text-[16px]">
            {b.label && <div className="mb-1 font-mono text-[11px] uppercase tracking-[0.18em] text-flame">{b.label}</div>}
            <RichText text={b.note} />
          </aside>
        );
      })}
    </div>
  );
}

/** Visible Q&A list. All answers are in the HTML (no FAQPage markup: Google retired FAQ rich results in 2026). */
export function FaqList({ items, heading = "Frequently asked questions" }: { items: QA[]; heading?: string }) {
  return (
    <section className="mt-14">
      <h2 className="font-display text-[clamp(26px,3vw,34px)] font-medium tracking-[-0.03em] text-ink">{heading}</h2>
      <div className="mt-6 divide-y divide-ink/10 border-y border-ink/10">
        {items.map((f) => (
          <div key={f.q} className="py-5">
            <h3 className="font-display text-[19px] font-medium tracking-[-0.02em] text-ink">{f.q}</h3>
            <p className={`mt-2 ${PROSE} text-[16px]`}><RichText text={f.a} /></p>
          </div>
        ))}
      </div>
    </section>
  );
}
