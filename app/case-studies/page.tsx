import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { CASE_STUDIES } from "@/components/sinovorex/content/case-studies";
import { SubpageShell } from "@/components/sinovorex/SubpageShell";
import { PageHeader } from "@/components/sinovorex/PageParts";
import { JsonLd, ORG_ID, WEBSITE_ID, abs, breadcrumbLd, graph, pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Case Studies: Real Sourcing Orders from China | SinoVorex",
  description: "Real orders we've sourced, inspected and shipped from China: the problem, the factory, what inspection found and the result.",
  path: "/case-studies",
});

/** Hidden (404) until there is at least one real case study in content/case-studies.ts. */
export default function CaseStudiesIndex() {
  if (!CASE_STUDIES.length) notFound();
  const crumbs = [{ name: "Home", path: "/" }, { name: "Case studies", path: "/case-studies" }];
  return (
    <SubpageShell>
      <JsonLd data={graph(breadcrumbLd(crumbs), {
        "@type": "CollectionPage",
        "@id": `${abs("/case-studies")}#webpage`,
        name: "Case studies",
        url: abs("/case-studies"),
        isPartOf: { "@id": WEBSITE_ID },
        about: { "@id": ORG_ID },
        hasPart: CASE_STUDIES.map((c) => ({ "@id": `${abs(`/case-studies/${c.slug}`)}#article` })),
      })} />
      <section className="px-4 pb-16 pt-10 sm:px-6 md:pt-16">
        <div className="mx-auto max-w-[1280px]">
          <PageHeader crumbs={[{ name: "Home", path: "/" }, { name: "Case studies" }]} h1="Case studies" summary="Real orders we've sourced, checked and shipped from China: what the client needed, how we found the factory, what inspection caught, and the result." />
          <ul className="mt-12 grid gap-4 md:grid-cols-2">
            {CASE_STUDIES.map((c) => (
              <li key={c.slug}>
                <Link href={`/case-studies/${c.slug}`} className="group flex h-full flex-col rounded-[28px] border border-ink/[0.07] bg-white p-7 transition-colors hover:border-flame">
                  <span className="text-[12px] font-semibold uppercase tracking-[0.08em] text-flame">{c.product} · {c.country}</span>
                  <h2 className="mt-3 font-display text-[22px] font-medium leading-tight tracking-[-0.03em]">{c.h1}</h2>
                  <p className="mt-3 flex-1 text-[15px] leading-relaxed text-ink/70">{c.summary}</p>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-[14px] font-medium text-flame">Read the case study <ArrowUpRight size={15} /></span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </SubpageShell>
  );
}
