import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { TOOLS, TOOL_BY_SLUG } from "@/components/sinovorex/content/tools";
import { SubpageShell } from "@/components/sinovorex/SubpageShell";
import { Blocks, FaqList } from "@/components/sinovorex/Blocks";
import { PageHeader, RelatedLinks } from "@/components/sinovorex/PageParts";
import { AqlCalculator } from "@/components/tools/AqlCalculator";
import { CbmCalculator } from "@/components/tools/CbmCalculator";
import { IncotermsExplorer } from "@/components/tools/IncotermsExplorer";
import { LandedCostCalculator } from "@/components/tools/LandedCostCalculator";
import { JsonLd, ORG_ID, WEBSITE_ID, abs, breadcrumbLd, graph, pageMeta } from "@/lib/seo";

export const dynamicParams = false;

const WIDGETS: Record<string, ReactNode> = {
  "landed-cost-calculator": <LandedCostCalculator />,
  "cbm-calculator": <CbmCalculator />,
  incoterms: <IncotermsExplorer />,
  "aql-calculator": <AqlCalculator />,
};

export function generateStaticParams() {
  return TOOLS.map((t) => ({ slug: t.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const t = TOOL_BY_SLUG[params.slug];
  if (!t) return {};
  return pageMeta({ title: t.title, description: t.description, path: `/tools/${t.slug}` });
}

export default function ToolPage({ params }: { params: { slug: string } }) {
  const t = TOOL_BY_SLUG[params.slug];
  if (!t) notFound();
  const path = `/tools/${t.slug}`;
  const crumbs = [{ name: "Home", path: "/" }, { name: "Free tools", path: "/tools" }, { name: t.name, path }];
  return (
    <SubpageShell>
      <JsonLd data={graph(breadcrumbLd(crumbs), {
        "@type": "WebApplication",
        "@id": `${abs(path)}#app`,
        name: t.h1,
        description: t.description,
        url: abs(path),
        applicationCategory: "BusinessApplication",
        operatingSystem: "Any (web browser)",
        isAccessibleForFree: true,
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        publisher: { "@id": ORG_ID },
        isPartOf: { "@id": WEBSITE_ID },
        dateModified: t.updated,
      })} />
      <article className="px-4 pb-16 pt-10 sm:px-6 md:pt-16">
        <div className="mx-auto max-w-[1280px]">
          <PageHeader crumbs={crumbs.map((c, i) => (i === crumbs.length - 1 ? { name: c.name } : c))} h1={t.h1} summary={t.summary} updated={t.updated} eyebrow="Free tool" />
          <div className="mt-10">{WIDGETS[t.slug]}</div>
          <div className="mt-12 max-w-[900px]">
            <Blocks blocks={t.body} cta={false} />
            <FaqList items={t.faqs} heading="Common questions" />
          </div>
          <RelatedLinks paths={t.related} />
        </div>
      </article>
    </SubpageShell>
  );
}
