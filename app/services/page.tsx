import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PAGE_UPDATED, SERVICES } from "@/components/sinovorex/data";
import { SERVICE_CONTENT } from "@/components/sinovorex/content/services";
import { SubpageShell } from "@/components/sinovorex/SubpageShell";
import { PageHeader, RelatedLinks } from "@/components/sinovorex/PageParts";
import { JsonLd, abs, breadcrumbLd, graph, pageMeta } from "@/lib/seo";

const TITLE = "China Sourcing, Inspection & Shipping Services | Sino Vorex";
const DESCRIPTION = "Our services for buyers sourcing from China: product sourcing, factory audits, quality inspection, production follow-up, samples, consolidation and freight.";

export const metadata: Metadata = pageMeta({ title: TITLE, description: DESCRIPTION, path: "/services" });

export default function ServicesIndex() {
  const crumbs = [{ name: "Home", path: "/" }, { name: "Services", path: "/services" }];
  return (
    <SubpageShell>
      <JsonLd data={graph(breadcrumbLd(crumbs), {
        "@type": "ItemList",
        name: "Sino Vorex services",
        itemListElement: SERVICES.map((s, i) => ({
          "@type": "ListItem", position: i + 1, url: abs(`/services/${s.slug}`),
          // Same @id as the Service node on each service page, so they are one entity.
          item: { "@id": `${abs(`/services/${s.slug}`)}#service` },
        })),
      })} />
      <section className="px-4 pb-16 pt-14 sm:px-6 md:pt-20">
        <div className="mx-auto max-w-[1280px]">
          <PageHeader
            crumbs={[{ name: "Home", path: "/" }, { name: "Services" }]}
            h1="Sourcing, inspection and shipping services in China"
            summary="Six services that take an order from the first supplier search all the way to delivery. Use them together, or just pick the one you need, like an inspection for a supplier you already work with."
            updated={PAGE_UPDATED.services}
          />
          <ul className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((s) => {
              const Icon = s.icon;
              return (
                <li key={s.slug}>
                  <Link href={`/services/${s.slug}`} className="group flex h-full flex-col rounded-[28px] border border-ink/[0.07] bg-white p-7 transition-colors hover:border-flame">
                    <div className="flex items-center justify-between">
                      <span className="grid h-12 w-12 place-items-center rounded-2xl bg-flame/10 text-flame transition-colors group-hover:bg-flame group-hover:text-white"><Icon size={22} strokeWidth={1.6} /></span>
                      <span className="font-mono text-xs text-ink/50">{s.num}</span>
                    </div>
                    <h2 className="mt-6 font-display text-[23px] font-medium leading-tight tracking-[-0.03em]">{SERVICE_CONTENT[s.slug].h1}</h2>
                    <p className="mt-3 flex-1 text-[15px] leading-relaxed text-ink/70">{s.desc}</p>
                    <span className="mt-5 inline-flex items-center gap-1.5 text-[14px] font-medium text-flame">Read more <ArrowUpRight size={15} className="transition-transform group-hover:rotate-45" /></span>
                  </Link>
                </li>
              );
            })}
          </ul>
          <RelatedLinks heading="Who we help" paths={["/sourcing-for/amazon-sellers", "/sourcing-for/small-businesses", "/sourcing-for/hotels-restaurants"]} />
        </div>
      </section>
    </SubpageShell>
  );
}
