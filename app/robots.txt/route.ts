import { SITE_URL } from "@/lib/site";

export const dynamic = "force-static";

/**
 * robots.txt as plain text so it can carry a Content-Signal line (contentsignals.org): search engines and AI
 * answer engines may use the content (search, ai-input). No preference is stated for AI training.
 */
export function GET() {
  const body = [
    "User-agent: *",
    "Content-Signal: search=yes, ai-input=yes",
    "Allow: /",
    "Disallow: /api/",
    "",
    `Sitemap: ${SITE_URL}/sitemap.xml`,
    "",
  ].join("\n");
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
