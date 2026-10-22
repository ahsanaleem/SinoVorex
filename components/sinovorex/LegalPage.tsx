import type { ReactNode } from "react";
import { SubpageShell } from "./SubpageShell";
import { Breadcrumbs, fmtDate } from "./PageParts";
import { JsonLd, WEBSITE_ID, abs, breadcrumbLd, graph } from "@/lib/seo";

export function LegalPage({ title, path, updated, children }: { title: string; path: string; updated: string; children: ReactNode }) {
  const crumbs = [{ name: "Home", path: "/" }, { name: title, path }];
  return (
    <SubpageShell quoteCta={false}>
      <JsonLd data={graph(breadcrumbLd(crumbs), {
        "@type": "WebPage",
        "@id": `${abs(path)}#webpage`,
        url: abs(path),
        name: title,
        dateModified: updated,
        inLanguage: "en",
        isPartOf: { "@id": WEBSITE_ID },
      })} />
      <article className="px-4 pb-24 pt-10 sm:px-6 md:pt-16">
        <div className="mx-auto max-w-[760px]">
          <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: title }]} />
          <h1 className="mt-8 font-display text-[clamp(40px,6vw,72px)] font-medium leading-[0.95] tracking-[-0.045em]">{title}</h1>
          <p className="mt-4 text-[14px] text-ink/60">Last updated <time dateTime={updated}>{fmtDate(updated)}</time></p>
          <div className="mt-10 space-y-5 text-[16px] leading-relaxed text-ink/80 [&_a]:text-flame [&_a]:underline [&_h2]:pt-6 [&_h2]:font-display [&_h2]:text-[24px] [&_h2]:font-medium [&_h2]:tracking-[-0.02em] [&_h2]:text-ink [&_li]:ml-5 [&_li]:list-disc [&_ul]:space-y-1.5">
            {children}
          </div>
        </div>
      </article>
    </SubpageShell>
  );
}
