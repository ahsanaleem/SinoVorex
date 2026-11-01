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
  // The first TEAM member is the named author of guides and the second, if any, reviews them; with no team, the company is the author.
  const [author, reviewer] = TEAM;
  const authorLd = author
    ? { "@type": "Person", name: author.name, jobTitle: author.role, worksFor: { "@id": ORG_ID }, url: abs("/about#team"), ...(author.linkedin ? { sameAs: [author.linkedin] } : {}) }
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
        ...(a.sources ? { citation: a.sources.map((s) => ({ "@type": "WebPage", name: s.name, url: s.url })) } : {}),
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
            reviewedBy={kind === "guide" && reviewer ? `${reviewer.name}, ${reviewer.role}` : undefined}
          />
          <div className="mt-10"><InShort title={kind === "guide" ? "Key takeaways" : "At a glance"} points={a.takeaways} /></div>
          <div className="mt-10">
            <ReadingLayout heads={headsOf(a.body, [
              ...(a.faqs ? [{ id: "faq", text: "Common questions" }] : []),
              ...(a.sources ? [{ id: "sources", text: "Sources" }] : []),
            ])}>
              <Blocks blocks={a.body} />
              {a.faqs && <FaqList items={a.faqs} heading="Common questions" />}
              {a.sources && <SourceList items={a.sources} />}
            </ReadingLayout>
          </div>
          {a.related && <RelatedLinks paths={a.related} />}
        </div>
      </article>
    </SubpageShell>
  );
}

/** Primary sources behind the guide's rules, rates and dates. */
function SourceList({ items }: { items: { name: string; url: string }[] }) {
  return (
    <section id="sources" className="mt-10 scroll-mt-28">
      <h2 className="font-display text-[clamp(23px,2.6vw,30px)] font-medium tracking-[-0.03em] text-ink">Sources</h2>
      <ul className="mt-4 space-y-2 text-[16px] leading-relaxed text-ink/75">
        {items.map((s) => (
          <li key={s.url}>
            <a href={s.url} target="_blank" rel="noopener noreferrer" className="font-medium text-ink underline decoration-flame/40 underline-offset-4 hover:text-flame">{s.name}</a>
            <span className="ml-2 text-[14px] text-ink/60">{new URL(s.url).hostname.replace(/^www\./, "")}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
