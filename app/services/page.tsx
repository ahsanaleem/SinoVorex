import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ALL_SERVICES, BUSINESS_SERVICES, PAGE_UPDATED, SERVICES, type Service } from "@/components/sinovorex/data";
import { SERVICE_CONTENT } from "@/components/sinovorex/content/services";
import { SubpageShell } from "@/components/sinovorex/SubpageShell";
import { PageHeader, RelatedLinks } from "@/components/sinovorex/PageParts";
import { JsonLd, abs, breadcrumbLd, graph, pageMeta } from "@/lib/seo";

const TITLE = "Our Services: Sourcing, Inspection, Shipping & More | Sino Vorex";
const DESCRIPTION = "Sourcing, factory audits, inspection and freight from China, plus company registration, visa help and business trips to China and the Canton Fair.";

export const metadata: Metadata = pageMeta({ title: TITLE, description: DESCRIPTION, path: "/services" });

export default function ServicesIndex() {
  const crumbs = [{ name: "Home", path: "/" }, { name: "Services", path: "/services" }];
  return (
    <SubpageShell>
      <JsonLd data={graph(breadcrumbLd(crumbs), {
        "@type": "ItemList",
        name: "Sino Vorex services",
        itemListElement: ALL_SERVICES.map((s, i) => ({
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
            summary="Six sourcing services that take an order from the first supplier search all the way to delivery, plus help with setting up a company, visas and business trips. Use them together, or just pick the one you need."
            updated={PAGE_UPDATED.services}
          />
          <h2 className="mt-14 font-display text-[clamp(24px,2.6vw,32px)] font-medium tracking-[-0.03em]">Sourcing, inspection and shipping</h2>
          <ServiceGrid items={SERVICES} />
          <h2 id="business" className="mt-16 scroll-mt-28 font-display text-[clamp(24px,2.6vw,32px)] font-medium tracking-[-0.03em]">Doing business in China</h2>
          <p className="mt-2 max-w-[68ch] text-[16px] leading-relaxed text-ink/70">Setting up a company, getting a visa, or visiting suppliers and trade fairs in person.</p>
          <ServiceGrid items={BUSINESS_SERVICES} />
          <RelatedLinks heading="Who we help" paths={["/sourcing-for/amazon-sellers", "/sourcing-for/small-businesses", "/sourcing-for/hotels-restaurants"]} />
        </div>
      </section>
    </SubpageShell>
  );
}

function ServiceGrid({ items }: { items: Service[] }) {
  return (
    <ul className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {items.map((s) => {
        const Icon = s.icon;
        return (
          <li key={s.slug}>
            <Link href={`/services/${s.slug}`} className="group flex h-full flex-col rounded-[28px] border border-ink/[0.07] bg-white p-7 transition-colors hover:border-flame">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-flame/10 text-flame transition-colors group-hover:bg-flame group-hover:text-white"><Icon size={22} strokeWidth={1.6} /></span>
              <h3 className="mt-6 font-display text-[23px] font-medium leading-tight tracking-[-0.03em]">{SERVICE_CONTENT[s.slug].h1}</h3>
              <p className="mt-3 flex-1 text-[15px] leading-relaxed text-ink/70">{s.desc}</p>
              <span className="mt-5 inline-flex items-center gap-1.5 text-[14px] font-medium text-flame">Read more <ArrowUpRight size={15} className="transition-transform group-hover:rotate-45" /></span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
