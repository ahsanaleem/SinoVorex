import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, Check } from "lucide-react";
import { PROCESS, SERVICES } from "@/components/sinovorex/data";
import { SERVICE_CONTENT } from "@/components/sinovorex/content/services";
import { GUIDES } from "@/components/sinovorex/content/guides";
import { SubpageShell } from "@/components/sinovorex/SubpageShell";
import { Blocks, FaqList } from "@/components/sinovorex/Blocks";
import { InShort, PageHeader, ReadingLayout, RelatedLinks, headsOf, readMinutes } from "@/components/sinovorex/PageParts";
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
  const heads = headsOf(c.body, [{ id: "faq", text: "Common questions" }]);
  heads.unshift({ id: "included", text: "What's included" });

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
      <article className="px-4 pb-16 pt-10 sm:px-6 md:pt-16">
        <div className="mx-auto max-w-[1280px]">
          <PageHeader
            crumbs={crumbs.map((x, i) => (i === crumbs.length - 1 ? { name: x.name } : x))}
            h1={c.h1} summary={s.desc} updated={c.updated}
            eyebrow={`Service ${s.num} of ${SERVICES.length}`}
            icon={<Icon size={22} strokeWidth={1.7} />}
            minutes={readMinutes(c.body, c.faqs)}
            quoteHref={`/quote?service=${s.slug}`}
          />

          <div className="mt-10"><InShort title="At a glance" points={c.glance} /></div>

          <div className="mt-10">
            <ReadingLayout heads={heads} aside={step && (
              <div className="rounded-[24px] border border-ink/[0.07] bg-white p-5">
                <div className="text-[13px] font-semibold uppercase tracking-[0.06em] text-ink/55">Where this fits</div>
                <p className="mt-2 text-[15px] leading-relaxed text-ink/80">
                  <span className="font-semibold text-flame">Step {Number(step.step)} of {PROCESS.length}:</span> <strong className="font-medium text-ink">{step.title}.</strong> {step.desc}
                </p>
                <Link href="/#how-it-works" className="mt-3 inline-flex items-center gap-1 text-[14px] font-medium text-flame hover:underline">See all six steps <ArrowUpRight size={14} /></Link>
              </div>
            )}>
              <section id="included" aria-label="What's included" className="grid scroll-mt-28 gap-4 md:grid-cols-2">
                <div className="rounded-[28px] border border-ink/[0.07] bg-white p-6 md:p-8">
                  <h2 className="font-display text-[24px] font-medium tracking-[-0.03em]">What&apos;s included</h2>
                  <ul className="mt-5 space-y-3">
                    {s.includes.map((it) => (
                      <li key={it} className="flex gap-3 text-[16px] leading-relaxed text-ink/80">
                        <span className="mt-1 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-flame/15 text-flame"><Check size={13} strokeWidth={2.5} /></span>{it}
                      </li>
                    ))}
                  </ul>
                </div>
                <div data-theme="dark" className="flex flex-col rounded-[28px] bg-ink p-6 text-white md:p-8">
                  <h2 className="font-display text-[24px] font-medium tracking-[-0.03em]">What you receive</h2>
                  <p className="mt-5 flex-1 text-[18px] leading-relaxed text-white/85">{s.youReceive}</p>
                  <Link href={`/quote?service=${s.slug}`} className="mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-flame px-5 py-3 text-[15px] font-medium">Get a free quote <ArrowUpRight size={16} /></Link>
                </div>
              </section>

              <Blocks blocks={c.body} />
              <FaqList items={c.faqs} heading="Common questions" />
            </ReadingLayout>
          </div>

          <RelatedLinks paths={guides} heading="Guides on this topic" />

          <section className="mt-16">
            <h2 className="font-display text-[clamp(24px,2.6vw,30px)] font-medium tracking-[-0.03em]">Other services</h2>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
              {others.map((o) => {
                const OIcon = o.icon;
                return (
                  <li key={o.slug}>
                    <Link href={`/services/${o.slug}`} className="group flex h-full flex-col gap-4 rounded-[24px] border border-ink/[0.07] bg-white p-5 transition-all hover:-translate-y-0.5 hover:border-flame">
                      <span className="grid h-10 w-10 place-items-center rounded-xl bg-flame/10 text-flame transition-colors group-hover:bg-flame group-hover:text-white"><OIcon size={19} strokeWidth={1.7} /></span>
                      <span className="flex items-center justify-between gap-2 font-display text-[16px] font-medium leading-snug">
                        {o.title}<ArrowUpRight size={16} className="shrink-0 text-flame transition-transform group-hover:rotate-45" />
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </section>
        </div>
      </article>
    </SubpageShell>
  );
}
