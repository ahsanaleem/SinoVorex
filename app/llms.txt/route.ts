import { COMPANY, SERVICES } from "@/components/sinovorex/data";
import { SERVICE_CONTENT } from "@/components/sinovorex/content/services";
import { GUIDES } from "@/components/sinovorex/content/guides";
import { AUDIENCES } from "@/components/sinovorex/content/audiences";
import { abs } from "@/lib/seo";

export const dynamic = "force-static";

/** llms.txt (llmstxt.org): a plain-text map of the site for AI assistants. Optional; Google Search ignores it. */
export function GET() {
  const lines = [
    "# Sino Vorex",
    "",
    `> Sino Vorex is a China sourcing agent based in Suzhou, China (brand of ${COMPANY.legalNameZh}). It helps buyers worldwide find factories, audit suppliers, inspect goods before shipment and arrange freight by sea, air or rail.`,
    "",
    `Contact: ${COMPANY.email} · ${COMPANY.phoneDisplay} (phone/WhatsApp) · WeChat ${COMPANY.wechatId}. Fees: a commission on the order value, confirmed in writing in each quote.`,
    "",
    "## Services",
    ...SERVICES.map((s) => `- [${SERVICE_CONTENT[s.slug].h1}](${abs(`/services/${s.slug}`)}): ${SERVICE_CONTENT[s.slug].description}`),
    "",
    "## Guides",
    ...GUIDES.map((g) => `- [${g.h1}](${abs(`/guides/${g.slug}`)}): ${g.description}`),
    "",
    "## Who we help",
    ...AUDIENCES.map((a) => `- [${a.h1}](${abs(`/sourcing-for/${a.slug}`)}): ${a.description}`),
    "",
    "## Company",
    `- [About Sino Vorex](${abs("/about")}): company details and how to verify our registration`,
    `- [Request a quote](${abs("/quote")}): quote form (product, quantity, target price, destination)`,
    `- [Privacy policy](${abs("/privacy")})`,
    `- [Terms of service](${abs("/terms")})`,
    "",
  ];
  return new Response(lines.join("\n"), { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
