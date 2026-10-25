import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ALL_SERVICES } from "@/components/sinovorex/data";
import { CASE_STUDIES, CASE_STUDY_BY_SLUG } from "@/components/sinovorex/content/case-studies";
import { SubpageShell } from "@/components/sinovorex/SubpageShell";
import { Blocks } from "@/components/sinovorex/Blocks";
import { PageHeader, RelatedLinks } from "@/components/sinovorex/PageParts";
import type { Block } from "@/components/sinovorex/content/types";
import { JsonLd, ORG_ID, WEBSITE_ID, abs, breadcrumbLd, graph, pageMeta } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return CASE_STUDIES.map((c) => ({ slug: c.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const c = CASE_STUDY_BY_SLUG[params.slug];
  if (!c) return {};
  return pageMeta({ title: c.title, description: c.description, path: `/case-studies/${c.slug}`, type: "article", published: c.published, modified: c.updated });
}

/** Problem → factory → inspection → result. Real orders only. */
export default function CaseStudyPage({ params }: { params: { slug: string } }) {
  const c = CASE_STUDY_BY_SLUG[params.slug];
  if (!c) notFound();
  const path = `/case-studies/${c.slug}`;
  const crumbs = [{ name: "Home", path: "/" }, { name: "Case studies", path: "/case-studies" }, { name: c.product, path }];
  const body: Block[] = [
    { h2: "The problem" }, ...c.problem,
    { h2: "Finding and checking the factory" }, ...c.factory,
    { h2: "What inspection found" }, ...c.inspection,
    { h2: "The result" }, ...c.result,
  ];
  const services = ALL_SERVICES.filter((s) => c.services.includes(s.slug));
  return (
    <SubpageShell>
      <JsonLd data={graph(breadcrumbLd(crumbs), {
        "@type": "Article",
        "@id": `${abs(path)}#article`,
        headline: c.h1,
        description: c.description,
        url: abs(path),
        datePublished: c.published,
        dateModified: c.updated,
        author: { "@id": ORG_ID },
        publisher: { "@id": ORG_ID },
        isPartOf: { "@id": WEBSITE_ID },
        about: c.product,
      })} />
      <article className="px-4 pb-16 pt-10 sm:px-6 md:pt-16">
        <div className="mx-auto max-w-[1280px]">
          <PageHeader crumbs={crumbs.map((x, i) => (i === crumbs.length - 1 ? { name: x.name } : x))} h1={c.h1} summary={c.summary} updated={c.updated} eyebrow={`Case study · ${c.country}`} />
          <ul className="mt-10 grid gap-3 sm:grid-cols-3">
            {c.results.map((r) => (
              <li key={r.label} className="rounded-[24px] bg-ink p-6 text-white" data-theme="dark">
                <div className="font-display text-[34px] font-medium leading-none">{r.value}</div>
                <div className="mt-2 text-[14px] text-white/70">{r.label}</div>
              </li>
            ))}
          </ul>
          <div className="mt-10 max-w-[900px]">
            <p className="mb-6 text-[15px] text-ink/70">Client: {c.client}</p>
            <Blocks blocks={body} cta={false} />
            {c.quote && (
              <figure className="mt-8 rounded-[28px] border-l-4 border-flame bg-white p-7">
                <blockquote className="font-display text-[22px] leading-snug text-ink">&ldquo;{c.quote.text}&rdquo;</blockquote>
                <figcaption className="mt-3 text-[14px] text-ink/60">{c.quote.who}</figcaption>
              </figure>
            )}
          </div>
          <RelatedLinks heading="Services used" paths={services.map((s) => `/services/${s.slug}`)} />
        </div>
      </article>
    </SubpageShell>
  );
}
