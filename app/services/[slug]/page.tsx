import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, Check } from "lucide-react";
import { PROCESS, SERVICES } from "@/components/sinovorex/data";
import { SubpageShell } from "@/components/sinovorex/SubpageShell";

export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const s = SERVICES.find((x) => x.slug === params.slug);
  if (!s) return {};
  const title = `${s.title} in China | Sino Vorex`;
  return {
    title,
    description: s.desc,
    alternates: { canonical: `/services/${s.slug}` },
    openGraph: { title, description: s.desc, url: `/services/${s.slug}`, type: "article" },
  };
}

export default function ServicePage({ params }: { params: { slug: string } }) {
  const s = SERVICES.find((x) => x.slug === params.slug);
  if (!s) notFound();
  const Icon = s.icon;
  const others = SERVICES.filter((x) => x.slug !== s.slug);

  return (
    <SubpageShell>
      <article className="px-4 pb-16 pt-14 sm:px-6 md:pt-20">
        <div className="mx-auto max-w-[1280px]">
          <nav aria-label="Breadcrumb" className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink/70">
            <Link href="/" className="hover:text-flame">Home</Link> / <Link href="/#services" className="hover:text-flame">Services</Link> / <span className="text-ink">{s.title}</span>
          </nav>

          <div className="mt-8 grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-end">
            <div>
              <span className="grid h-16 w-16 place-items-center rounded-2xl bg-flame text-white"><Icon size={28} strokeWidth={1.6} /></span>
              <h1 className="mt-6 font-display text-[clamp(40px,6vw,84px)] font-medium leading-[0.95] tracking-[-0.045em]">
                {s.title} <span className="font-serif font-normal italic text-flame">in China</span>
              </h1>
            </div>
            <p className="text-[18px] leading-relaxed text-ink/75">{s.desc}</p>
          </div>

          <div className="mt-14 grid gap-4 md:grid-cols-2">
            <section className="rounded-[28px] border border-ink/[0.07] bg-white p-8">
              <h2 className="font-display text-[26px] font-medium tracking-[-0.03em]">What&apos;s included</h2>
              <ul className="mt-5 space-y-3">
                {s.includes.map((it) => (
                  <li key={it} className="flex gap-3 text-[16px] leading-relaxed text-ink/80">
                    <span className="mt-1 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-flame/15 text-flame"><Check size={13} /></span>{it}
                  </li>
                ))}
              </ul>
            </section>
            <section data-theme="dark" className="rounded-[28px] bg-ink p-8 text-white">
              <h2 className="font-display text-[26px] font-medium tracking-[-0.03em]">What you receive</h2>
              <p className="mt-5 text-[18px] leading-relaxed text-white/85">{s.youReceive}</p>
              <div className="mt-8 flex flex-wrap gap-2">
                {s.detail.map((d) => <span key={d} className="rounded-full bg-white/10 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.12em] text-white/80">{d}</span>)}
              </div>
            </section>
          </div>

          <section className="mt-14">
            <h2 className="font-display text-[30px] font-medium tracking-[-0.03em]">Where this fits in the process</h2>
            <ol className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-6">
              {PROCESS.map((p) => (
                <li key={p.step} className="rounded-2xl border border-ink/[0.07] bg-white p-5">
                  <div className="font-mono text-[12px] text-flame">{p.step}</div>
                  <div className="mt-2 font-display text-[18px] font-medium">{p.title}</div>
                  <p className="mt-1 text-[13px] leading-relaxed text-ink/70">{p.desc}</p>
                </li>
              ))}
            </ol>
          </section>

          <section className="mt-14">
            <h2 className="font-display text-[30px] font-medium tracking-[-0.03em]">Other services</h2>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
              {others.map((o) => (
                <li key={o.slug}>
                  <Link href={`/services/${o.slug}`} className="group flex h-full items-center justify-between gap-3 rounded-2xl border border-ink/[0.07] bg-white p-5 transition-colors hover:border-flame">
                    <span className="font-display text-[17px] font-medium">{o.title}</span>
                    <ArrowUpRight size={18} className="shrink-0 text-flame transition-transform group-hover:rotate-45" />
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </article>
    </SubpageShell>
  );
}
