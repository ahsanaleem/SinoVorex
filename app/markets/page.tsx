import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PAGE_UPDATED } from "@/components/sinovorex/data";
import { MARKETS } from "@/components/sinovorex/content/markets";
import { SubpageShell } from "@/components/sinovorex/SubpageShell";
import { PageHeader, RelatedLinks } from "@/components/sinovorex/PageParts";
import { JsonLd, ORG_ID, WEBSITE_ID, abs, breadcrumbLd, graph, pageMeta } from "@/lib/seo";

const TITLE = "Sourcing & Shipping from China by Country | SinoVorex";
const DESCRIPTION = "Sourcing and shipping from China for buyers in the UAE, Saudi Arabia, Pakistan, Nigeria and Kenya: ports, customs and product approvals.";

export const metadata: Metadata = pageMeta({ title: TITLE, description: DESCRIPTION, path: "/markets" });

export default function MarketsIndex() {
  const crumbs = [{ name: "Home", path: "/" }, { name: "Markets", path: "/markets" }];
  return (
    <SubpageShell>
      <JsonLd data={graph(breadcrumbLd(crumbs), {
        "@type": "CollectionPage",
        "@id": `${abs("/markets")}#webpage`,
        name: "Markets we ship to",
        url: abs("/markets"),
        dateModified: PAGE_UPDATED.markets,
        isPartOf: { "@id": WEBSITE_ID },
        about: { "@id": ORG_ID },
        hasPart: MARKETS.map((m) => ({ "@id": `${abs(`/markets/${m.slug}`)}#webpage` })),
      })} />
      <section className="px-4 pb-16 pt-10 sm:px-6 md:pt-16">
        <div className="mx-auto max-w-[1280px]">
          <PageHeader
            crumbs={[{ name: "Home", path: "/" }, { name: "Markets" }]}
            h1="Sourcing and shipping from China, by country"
            summary="Every country has its own ports, customs rules and product approvals. These pages explain what buyers in each market need to know, and how we help."
            updated={PAGE_UPDATED.markets}
          />
          <ul className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {MARKETS.map((m) => (
              <li key={m.slug}>
                <Link href={`/markets/${m.slug}`} className="group flex h-full flex-col rounded-[28px] border border-ink/[0.07] bg-white p-7 transition-colors hover:border-flame">
                  <span className="text-[12px] font-semibold uppercase tracking-[0.08em] text-flame">{m.country}</span>
                  <h2 className="mt-3 font-display text-[22px] font-medium leading-tight tracking-[-0.03em]">{m.h1}</h2>
                  <p className="mt-3 flex-1 text-[15px] leading-relaxed text-ink/70">{m.takeaways[0]}</p>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-[14px] font-medium text-flame">Read more <ArrowUpRight size={15} className="transition-transform group-hover:rotate-45" /></span>
                </Link>
              </li>
            ))}
          </ul>
          <RelatedLinks heading="More shipping guides" paths={["/guides/shipping-from-china-to-usa", "/guides/shipping-from-china-to-uk", "/guides/shipping-from-china-to-europe"]} />
        </div>
      </section>
    </SubpageShell>
  );
}
