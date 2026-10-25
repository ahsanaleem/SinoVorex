import type { MetadataRoute } from "next";
import { ALL_SERVICES, PAGE_UPDATED } from "@/components/sinovorex/data";
import { SERVICE_CONTENT } from "@/components/sinovorex/content/services";
import { GUIDES } from "@/components/sinovorex/content/guides";
import { AUDIENCES } from "@/components/sinovorex/content/audiences";
import { MARKETS } from "@/components/sinovorex/content/markets";
import { TOOLS } from "@/components/sinovorex/content/tools";
import { CASE_STUDIES } from "@/components/sinovorex/content/case-studies";
import { abs } from "@/lib/seo";

/** lastmod comes from each page's real content date (not build time); priority/changefreq are ignored by Google, so omitted. */
export default function sitemap(): MetadataRoute.Sitemap {
  const entry = (path: string, date: string) => ({ url: abs(path), lastModified: date });
  return [
    entry("/", PAGE_UPDATED.home),
    entry("/services", PAGE_UPDATED.services),
    ...ALL_SERVICES.map((s) => entry(`/services/${s.slug}`, SERVICE_CONTENT[s.slug].updated)),
    entry("/guides", PAGE_UPDATED.guides),
    ...GUIDES.map((g) => entry(`/guides/${g.slug}`, g.updated)),
    entry("/sourcing-for", PAGE_UPDATED.sourcingFor),
    ...AUDIENCES.map((a) => entry(`/sourcing-for/${a.slug}`, a.updated)),
    entry("/markets", PAGE_UPDATED.markets),
    ...MARKETS.map((m) => entry(`/markets/${m.slug}`, m.updated)),
    entry("/tools", PAGE_UPDATED.tools),
    ...TOOLS.map((t) => entry(`/tools/${t.slug}`, t.updated)),
    // Case studies appear only once real ones are added.
    ...(CASE_STUDIES.length ? [entry("/case-studies", CASE_STUDIES[0].updated), ...CASE_STUDIES.map((c) => entry(`/case-studies/${c.slug}`, c.updated))] : []),
    entry("/about", PAGE_UPDATED.about),
    entry("/quote", PAGE_UPDATED.quote),
    entry("/privacy", PAGE_UPDATED.privacy),
    entry("/terms", PAGE_UPDATED.terms),
  ];
}
