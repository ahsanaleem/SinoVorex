import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PAGE_UPDATED } from "@/components/sinovorex/data";
import { AUDIENCES } from "@/components/sinovorex/content/audiences";
import { SubpageShell } from "@/components/sinovorex/SubpageShell";
import { PageHeader } from "@/components/sinovorex/PageParts";
import { JsonLd, ORG_ID, WEBSITE_ID, abs, breadcrumbLd, graph, pageMeta } from "@/lib/seo";

const TITLE = "Who We Help: Sourcing from China by Business Type | SinoVorex";
const DESCRIPTION = "How we help Amazon and e-commerce sellers, small businesses, and hotels, restaurants and cafés source, check and ship products from China.";

export const metadata: Metadata = pageMeta({ title: TITLE, description: DESCRIPTION, path: "/sourcing-for" });

export default function SourcingForIndex() {
  const crumbs = [{ name: "Home", path: "/" }, { name: "Who we help", path: "/sourcing-for" }];
  return (
    <SubpageShell>
      <JsonLd data={graph(breadcrumbLd(crumbs), {
        "@type": "CollectionPage",
        "@id": `${abs("/sourcing-for")}#webpage`,
        name: "Who we help",
        url: abs("/sourcing-for"),
        dateModified: PAGE_UPDATED.sourcingFor,
        isPartOf: { "@id": WEBSITE_ID },
        about: { "@id": ORG_ID },
        hasPart: AUDIENCES.map((a) => ({ "@id": `${abs(`/sourcing-for/${a.slug}`)}#webpage` })),
      })} />
      <section className="px-4 pb-16 pt-10 sm:px-6 md:pt-16">
        <div className="mx-auto max-w-[1280px]">
          <PageHeader
            crumbs={[{ name: "Home", path: "/" }, { name: "Who we help" }]}
            h1="Who we help"
            summary="Different buyers need different things from China. Here's how we work with online sellers, small businesses and hospitality buyers."
            updated={PAGE_UPDATED.sourcingFor}
          />
          <ul className="mt-12 grid gap-4 md:grid-cols-3">
            {AUDIENCES.map((a) => (
              <li key={a.slug}>
                <Link href={`/sourcing-for/${a.slug}`} className="group flex h-full flex-col rounded-[28px] border border-ink/[0.07] bg-white p-7 transition-colors hover:border-flame">
                  <span className="text-[12px] font-semibold uppercase tracking-[0.08em] text-flame">{a.label}</span>
                  <h2 className="mt-3 font-display text-[23px] font-medium leading-tight tracking-[-0.03em]">{a.h1}</h2>
                  <p className="mt-3 flex-1 text-[15px] leading-relaxed text-ink/70">{a.summary}</p>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-[14px] font-medium text-flame">Read more <ArrowUpRight size={15} className="transition-transform group-hover:rotate-45" /></span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </SubpageShell>
  );
}
