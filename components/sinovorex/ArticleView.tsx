import { Blocks, FaqList } from "./Blocks";
import { InShort, PageHeader, ReadingLayout, RelatedLinks, headsOf, readMinutes } from "./PageParts";
import { SubpageShell } from "./SubpageShell";
import type { Article } from "./content/types";
import { TEAM } from "./data";
import { JsonLd, ORG_ID, WEBSITE_ID, abs, breadcrumbLd, graph } from "@/lib/seo";

/** Guide and audience page layout, with BreadcrumbList + Article/WebPage JSON-LD. */
export function ArticleView({ a, path, crumbs, kind, eyebrow }: {
  a: Article; path: string; crumbs: { name: string; path: string }[]; kind: "guide" | "page"; eyebrow?: string;
}) {
  // The first TEAM member is the named author of guides; until one is added, the company is the author.
  const author = TEAM[0];
  const authorLd = author
    ? { "@type": "Person", name: author.name, jobTitle: author.role, worksFor: { "@id": ORG_ID }, url: abs("/about"), ...(author.linkedin ? { sameAs: [author.linkedin] } : {}) }
    : { "@id": ORG_ID };
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
        author: authorLd,
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
      <article className="px-4 pb-16 pt-10 sm:px-6 md:pt-16">
        <div className="mx-auto max-w-[1280px]">
          <PageHeader
            crumbs={crumbs.map((c, i) => (i === crumbs.length - 1 ? { name: c.name } : c))}
            h1={a.h1}
            summary={a.summary}
            updated={a.updated}
            eyebrow={eyebrow}
            minutes={readMinutes(a.body, a.faqs)}
            byline={kind === "guide" && author ? `${author.name}, ${author.role}` : undefined}
          />
          <div className="mt-10"><InShort title={kind === "guide" ? "Key takeaways" : "At a glance"} points={a.takeaways} /></div>
          <div className="mt-10">
            <ReadingLayout heads={headsOf(a.body, a.faqs ? [{ id: "faq", text: "Common questions" }] : [])}>
              <Blocks blocks={a.body} />
              {a.faqs && <FaqList items={a.faqs} heading="Common questions" />}
            </ReadingLayout>
          </div>
          {a.related && <RelatedLinks paths={a.related} />}
        </div>
      </article>
    </SubpageShell>
  );
}
