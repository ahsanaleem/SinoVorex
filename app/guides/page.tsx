import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PAGE_UPDATED } from "@/components/sinovorex/data";
import { GUIDES } from "@/components/sinovorex/content/guides";
import { SubpageShell } from "@/components/sinovorex/SubpageShell";
import { PageHeader, fmtDate } from "@/components/sinovorex/PageParts";
import { JsonLd, ORG_ID, WEBSITE_ID, abs, breadcrumbLd, graph, pageMeta } from "@/lib/seo";

const TITLE = "Guides to Sourcing from China | Sino Vorex";
const DESCRIPTION = "Practical guides for importers: what a China sourcing agent costs, low-MOQ orders, factory audit checklists, AQL inspections and freight forwarders.";

export const metadata: Metadata = pageMeta({ title: TITLE, description: DESCRIPTION, path: "/guides" });

export default function GuidesIndex() {
  const crumbs = [{ name: "Home", path: "/" }, { name: "Guides", path: "/guides" }];
  return (
    <SubpageShell>
      <JsonLd data={graph(breadcrumbLd(crumbs), {
        "@type": "CollectionPage",
        "@id": `${abs("/guides")}#webpage`,
        name: "Guides to sourcing from China",
        url: abs("/guides"),
        isPartOf: { "@id": WEBSITE_ID },
        publisher: { "@id": ORG_ID },
        hasPart: GUIDES.map((g) => ({ "@type": "Article", headline: g.h1, url: abs(`/guides/${g.slug}`), dateModified: g.updated })),
      })} />
      <section className="px-4 pb-16 pt-14 sm:px-6 md:pt-20">
        <div className="mx-auto max-w-[1280px]">
          <PageHeader
            crumbs={[{ name: "Home", path: "/" }, { name: "Guides" }]}
            h1="Guides to sourcing from China"
            summary="Plain-English guides for buyers: what sourcing agents cost, how to place a small first order, how to audit a factory, how AQL inspections work, and who does what between your agent and your freight forwarder."
            updated={PAGE_UPDATED.guides}
          />
          <ul className="mt-14 grid gap-4 md:grid-cols-2">
            {GUIDES.map((g) => (
              <li key={g.slug}>
                <Link href={`/guides/${g.slug}`} className="group flex h-full flex-col rounded-[28px] border border-ink/[0.07] bg-white p-7 transition-colors hover:border-flame">
                  <h2 className="font-display text-[24px] font-medium leading-tight tracking-[-0.03em]">{g.h1}</h2>
                  <p className="mt-3 flex-1 text-[15px] leading-relaxed text-ink/70">{g.summary}</p>
                  <span className="mt-5 flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.18em] text-ink/55">
                    <time dateTime={g.updated}>Updated {fmtDate(g.updated)}</time>
                    <ArrowUpRight size={18} className="text-flame transition-transform group-hover:rotate-45" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </SubpageShell>
  );
}
