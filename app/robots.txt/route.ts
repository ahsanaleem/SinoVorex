import { SITE_URL } from "@/lib/site";

export const dynamic = "force-static";

/**
 * robots.txt: every crawler, including AI answer engines, may crawl everything except the API.
 * No Content-Signal line: it only restated the default (search and AI answers allowed) and Lighthouse flags it as invalid.
 */
export function GET() {
  const body = [
    "User-agent: *",
    "Allow: /",
    "Disallow: /api/",
    "",
    `Sitemap: ${SITE_URL}/sitemap.xml`,
    "",
  ].join("\n");
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
