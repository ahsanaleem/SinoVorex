import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Boxes, Calculator, ClipboardCheck, Route } from "lucide-react";
import { PAGE_UPDATED } from "@/components/sinovorex/data";
import { TOOLS } from "@/components/sinovorex/content/tools";
import { SubpageShell } from "@/components/sinovorex/SubpageShell";
import { PageHeader } from "@/components/sinovorex/PageParts";
import { JsonLd, ORG_ID, WEBSITE_ID, abs, breadcrumbLd, graph, pageMeta } from "@/lib/seo";

const TITLE = "Free Tools for Importers from China | Sino Vorex";
const DESCRIPTION = "Free tools for importers: landed cost calculator, CBM and container calculator, interactive Incoterms 2020 chart and AQL sample size calculator.";
const ICONS = { "landed-cost-calculator": Calculator, "cbm-calculator": Boxes, incoterms: Route, "aql-calculator": ClipboardCheck } as const;

export const metadata: Metadata = pageMeta({ title: TITLE, description: DESCRIPTION, path: "/tools" });

export default function ToolsIndex() {
  const crumbs = [{ name: "Home", path: "/" }, { name: "Free tools", path: "/tools" }];
  return (
    <SubpageShell>
      <JsonLd data={graph(breadcrumbLd(crumbs), {
        "@type": "CollectionPage",
        "@id": `${abs("/tools")}#webpage`,
        name: "Free tools for importers",
        url: abs("/tools"),
        dateModified: PAGE_UPDATED.tools,
        isPartOf: { "@id": WEBSITE_ID },
        publisher: { "@id": ORG_ID },
        hasPart: TOOLS.map((t) => ({ "@id": `${abs(`/tools/${t.slug}`)}#app` })),
      })} />
      <section className="px-4 pb-16 pt-10 sm:px-6 md:pt-16">
        <div className="mx-auto max-w-[1280px]">
          <PageHeader
            crumbs={[{ name: "Home", path: "/" }, { name: "Free tools" }]}
            h1="Free tools for importers"
            summary="Quick calculators and explainers for buying from China. Work out your landed cost, check whether your order fits a container, see who pays for what under each Incoterm, and get the right AQL sample size."
            updated={PAGE_UPDATED.tools}
          />
          <ul className="mt-12 grid gap-4 md:grid-cols-2">
            {TOOLS.map((t) => {
              const Icon = ICONS[t.slug as keyof typeof ICONS];
              return (
                <li key={t.slug}>
                  <Link href={`/tools/${t.slug}`} className="group flex h-full gap-5 rounded-[28px] border border-ink/[0.07] bg-white p-7 transition-colors hover:border-flame">
                    <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-flame/10 text-flame transition-colors group-hover:bg-flame group-hover:text-white"><Icon size={22} strokeWidth={1.6} /></span>
                    <span>
                      <h2 className="font-display text-[22px] font-medium leading-tight tracking-[-0.03em]">{t.h1}</h2>
                      <p className="mt-2 text-[15px] leading-relaxed text-ink/70">{t.description}</p>
                      <span className="mt-4 inline-flex items-center gap-1.5 text-[14px] font-medium text-flame">Open the tool <ArrowUpRight size={15} className="transition-transform group-hover:rotate-45" /></span>
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </section>
    </SubpageShell>
  );
}
