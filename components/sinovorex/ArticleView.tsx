import { Blocks, FaqList } from "./Blocks";
import { PageHeader, RelatedLinks, Toc } from "./PageParts";
import { SubpageShell } from "./SubpageShell";
import type { Article } from "./content/types";
import { JsonLd, ORG_ID, WEBSITE_ID, abs, breadcrumbLd, graph } from "@/lib/seo";

/** Guide and audience page layout, with BreadcrumbList + Article/WebPage JSON-LD. */
export function ArticleView({ a, path, crumbs, kind, eyebrow }: {
  a: Article; path: string; crumbs: { name: string; path: string }[]; kind: "guide" | "page"; eyebrow?: string;
}) {
  const page = kind === "guide"
    ? {
        "@type": "Article",
        "@id": `${abs(path)}#article`,
        headline: a.h1,
        description: a.description,
        url: abs(path),
        mainEntityOfPage: abs(path),
        datePublished: a.published,
        dateModified: a.updated,
        inLanguage: "en",
        image: abs("/opengraph-image.png"),
        author: { "@id": ORG_ID },
        publisher: { "@id": ORG_ID },
        isPartOf: { "@id": WEBSITE_ID },
      }
    : {
        "@type": "WebPage",
        "@id": `${abs(path)}#webpage`,
        name: a.h1,
        description: a.description,
        url: abs(path),
        dateModified: a.updated,
        inLanguage: "en",
        about: { "@id": ORG_ID },
        isPartOf: { "@id": WEBSITE_ID },
      };

  return (
    <SubpageShell>
      <JsonLd data={graph(breadcrumbLd(crumbs), page)} />
      <article className="px-4 pb-16 pt-14 sm:px-6 md:pt-20">
        <div className="mx-auto max-w-[1280px]">
          <PageHeader
            crumbs={crumbs.map((c, i) => (i === crumbs.length - 1 ? { name: c.name } : c))}
            h1={a.h1}
            summary={a.summary}
            updated={a.updated}
            eyebrow={eyebrow}
          />
          <div className="mt-14 grid gap-12 lg:grid-cols-[minmax(0,1fr)_300px]">
            <div className="min-w-0 max-w-[820px]">
              <Blocks blocks={a.body} />
              {a.faqs && <FaqList items={a.faqs} />}
            </div>
            <aside className="lg:sticky lg:top-28 lg:self-start"><Toc blocks={a.body} /></aside>
          </div>
          {a.related && <RelatedLinks paths={a.related} />}
        </div>
      </article>
    </SubpageShell>
  );
}
