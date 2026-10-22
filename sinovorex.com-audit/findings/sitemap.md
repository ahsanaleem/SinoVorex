# Sitemap audit — sinovorex.com (2026-10-22)

Score: 90/100. `sitemap_discovery.py`: declared in robots.txt, `https://sinovorex.com/sitemap.xml` 200, valid urlset, 20 URLs.

## Passes
- Declared in robots.txt (`app/robots.ts:6`), validated by the helper; no stale declaration.
- 20 URLs = every indexable page in the crawl (21 crawled incl. none extra; /quote/problem and /quote/thanks, noindex, correctly excluded; /api excluded). All locs return 200, are self-canonical, absolute https, no trailing slash, no redirects.
- lastmod now real per-page content dates (`app/sitemap.ts:11-24` reads `PAGE_UPDATED`, `SERVICE_CONTENT[].updated`, `g.updated`, `a.updated`). FIXED vs old M1 (single `new Date()`). priority/changefreq omitted (correct).
- Under limits (50k URLs / 50MB).

## Findings
- Medium: lastmod is hand-maintained, not derived. 18 of 20 entries say 2026-10-20 (the day the pages were created/rewritten in one batch), privacy/terms 2026-10-16. Dates match git history (commits 2026-10-16 and 2026-10-20), so currently accurate, but nothing forces an update when copy changes; the bulk-identical date is a weak freshness signal once Google sees it unchanged. Fix: bump the matching `updated` field in `components/sinovorex/data.ts:35-43`, `content/{services,guides,audiences}.ts` whenever copy changes, or derive from git (`git log -1 --format=%cs -- <file>`) at build. Also keep JSON-LD `dateModified`/article `modified` fed from the same field.
- Low: homepage `<loc>` is `https://sinovorex.com` (no slash). Equivalent and matches canonical; no action.
- Low: no sitemap `<image>` or hreflang entries; not needed (single-language).
- Low: /sourcing-for and a /sourcing-for index do not exist; sitemap has no hub for it (not a sitemap problem).

## Coverage vs app/sitemap.ts
Matches live output exactly (home, services hub + 6, guides hub + 5, sourcing-for x3, about, quote, privacy, terms). Quality gate: no noindex, redirected, 404 or non-canonical URL listed.
