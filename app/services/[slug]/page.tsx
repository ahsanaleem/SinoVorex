import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, Check } from "lucide-react";
import { PROCESS, SERVICES } from "@/components/sinovorex/data";
import { SERVICE_CONTENT } from "@/components/sinovorex/content/services";
import { GUIDES } from "@/components/sinovorex/content/guides";
import { SubpageShell } from "@/components/sinovorex/SubpageShell";
import { Blocks, FaqList } from "@/components/sinovorex/Blocks";
import { PageHeader, RelatedLinks, Toc } from "@/components/sinovorex/PageParts";
import { JsonLd, ORG_ID, abs, breadcrumbLd, graph, pageMeta } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const c = SERVICE_CONTENT[params.slug];
  if (!c) return {};
  return pageMeta({ title: c.seoTitle, description: c.description, path: `/services/${params.slug}` });
}

export default function ServicePage({ params }: { params: { slug: string } }) {
  const s = SERVICES.find((x) => x.slug === params.slug);
  const c = SERVICE_CONTENT[params.slug];
  if (!s || !c) notFound();
  const Icon = s.icon;
  const path = `/services/${s.slug}`;
  const others = SERVICES.filter((x) => x.slug !== s.slug);
  const step = PROCESS.find((p) => p.step === c.processStep);
  const guides = GUIDES.filter((g) => g.related?.includes(path)).map((g) => `/guides/${g.slug}`);
  const crumbs = [{ name: "Home", path: "/" }, { name: "Services", path: "/services" }, { name: s.title, path }];

  return (
    <SubpageShell>
      <JsonLd data={graph(
        breadcrumbLd(crumbs),
        {
          "@type": "Service",
          "@id": `${abs(path)}#service`,
          name: c.h1,
          serviceType: c.serviceType,
          description: c.description,
          url: abs(path),
          provider: { "@id": ORG_ID },
          areaServed: "Worldwide",
          availableLanguage: ["English", "Chinese"],
        },
      )} />
      <article className="px-4 pb-16 pt-14 sm:px-6 md:pt-20">
        <div className="mx-auto max-w-[1280px]">
          <div className="grid gap-8 lg:grid-cols-[auto_1fr] lg:items-start">
            <span className="hidden h-16 w-16 place-items-center rounded-2xl bg-flame text-white lg:mt-12 lg:grid"><Icon size={28} strokeWidth={1.6} /></span>
            <PageHeader crumbs={crumbs.map((x, i) => (i === crumbs.length - 1 ? { name: x.name } : x))} h1={c.h1} summary={s.desc} updated={c.updated} />
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

          <div className="mt-16 grid gap-12 lg:grid-cols-[minmax(0,1fr)_300px]">
            <div className="min-w-0 max-w-[820px]">
              <Blocks blocks={c.body} />
              <FaqList items={c.faqs} heading={`${s.title}: common questions`} />
            </div>
            <aside className="space-y-4 lg:sticky lg:top-28 lg:self-start">
              <Toc blocks={c.body} />
              {step && (
                <div className="rounded-2xl border border-ink/[0.07] bg-white p-5">
                  <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink/60">Where this fits</div>
                  <p className="mt-2 text-[15px] leading-relaxed text-ink/80">
                    <span className="font-mono text-flame">Step {step.step} of {PROCESS.length}</span> · <strong className="font-medium text-ink">{step.title}.</strong> {step.desc}
                  </p>
                  <Link href="/#how-it-works" className="mt-3 inline-flex items-center gap-1 text-[14px] font-medium text-flame hover:underline">See all six steps <ArrowUpRight size={14} /></Link>
                </div>
              )}
            </aside>
          </div>

          <RelatedLinks paths={guides} heading="Guides on this topic" />

          <section className="mt-14">
            <h2 className="font-display text-[clamp(24px,2.6vw,30px)] font-medium tracking-[-0.03em]">Other services</h2>
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
