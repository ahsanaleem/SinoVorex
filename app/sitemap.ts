import type { MetadataRoute } from "next";
import { PAGE_UPDATED, SERVICES } from "@/components/sinovorex/data";
import { SERVICE_CONTENT } from "@/components/sinovorex/content/services";
import { GUIDES } from "@/components/sinovorex/content/guides";
import { AUDIENCES } from "@/components/sinovorex/content/audiences";
import { abs } from "@/lib/seo";

/** lastmod comes from each page's real content date (not build time); priority/changefreq are ignored by Google, so omitted. */
export default function sitemap(): MetadataRoute.Sitemap {
  const entry = (path: string, date: string) => ({ url: abs(path), lastModified: date });
  return [
    entry("/", PAGE_UPDATED.home),
    entry("/services", PAGE_UPDATED.services),
    ...SERVICES.map((s) => entry(`/services/${s.slug}`, SERVICE_CONTENT[s.slug].updated)),
    entry("/guides", PAGE_UPDATED.guides),
    ...GUIDES.map((g) => entry(`/guides/${g.slug}`, g.updated)),
    ...AUDIENCES.map((a) => entry(`/sourcing-for/${a.slug}`, a.updated)),
    entry("/about", PAGE_UPDATED.about),
    entry("/quote", PAGE_UPDATED.quote),
    entry("/privacy", PAGE_UPDATED.privacy),
    entry("/terms", PAGE_UPDATED.terms),
  ];
}
