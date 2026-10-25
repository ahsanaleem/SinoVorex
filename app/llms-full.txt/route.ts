import { ALL_SERVICES, COMPANY } from "@/components/sinovorex/data";
import { SERVICE_CONTENT } from "@/components/sinovorex/content/services";
import { GUIDES } from "@/components/sinovorex/content/guides";
import { AUDIENCES } from "@/components/sinovorex/content/audiences";
import { MARKETS } from "@/components/sinovorex/content/markets";
import { TOOLS } from "@/components/sinovorex/content/tools";
import { blocksToMarkdown } from "@/lib/markdown";
import { abs } from "@/lib/seo";

export const dynamic = "force-static";

/** Full text of every service page, guide and audience page as Markdown, for AI assistants (llms.txt has the index). */
export function GET() {
  const parts: string[] = [
    `# ${COMPANY.brand}: full content`,
    `> ${COMPANY.brand} is a China sourcing agent based in Suzhou, China (brand of ${COMPANY.legalNameZh}). Contact: ${COMPANY.email}, ${COMPANY.phoneDisplay}. The index of pages is at ${abs("/llms.txt")}.`,
  ];
  for (const s of ALL_SERVICES) {
    const c = SERVICE_CONTENT[s.slug];
    parts.push(`---\n\n# ${c.h1}\n\nURL: ${abs(`/services/${s.slug}`)} · Updated ${c.updated}\n\n${s.desc}\n\n${c.glance.map((g) => `- ${g}`).join("\n")}\n\n${blocksToMarkdown(c.body, c.faqs)}`);
  }
  for (const a of [...GUIDES, ...AUDIENCES, ...MARKETS]) {
    const path = GUIDES.includes(a) ? `/guides/${a.slug}` : MARKETS.some((m) => m.slug === a.slug) ? `/markets/${a.slug}` : `/sourcing-for/${a.slug}`;
    parts.push(`---\n\n# ${a.h1}\n\nURL: ${abs(path)} · Updated ${a.updated}\n\n${a.summary}\n\n${a.takeaways.map((t) => `- ${t}`).join("\n")}\n\n${blocksToMarkdown(a.body, a.faqs)}`);
  }
  for (const t of TOOLS) {
    parts.push(`---\n\n# ${t.h1}\n\nURL: ${abs(`/tools/${t.slug}`)} (interactive tool) · Updated ${t.updated}\n\n${t.summary}\n\n${blocksToMarkdown(t.body, t.faqs)}`);
  }
  return new Response(parts.join("\n\n") + "\n", { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
