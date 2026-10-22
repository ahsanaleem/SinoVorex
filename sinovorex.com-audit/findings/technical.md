# Technical SEO — sinovorex.com (re-audit 2026-10-22)

Score: 88/100 (old audit 80). Next.js App Router on Vercel, fully server-rendered (no SPA shell), 21 pages all 200 with self-canonicals.

## Old findings status
- H1 security headers: FIXED. CSP, nosniff, X-Frame-Options SAMEORIGIN, Referrer-Policy, Permissions-Policy live on all responses incl. 404 (`next.config.mjs:35-41`). poweredByHeader off.
- H2 www host: FIXED. `https://www.sinovorex.com/` -> 308 -> `https://sinovorex.com/` (`next.config.mjs:45-52`).
- M1 sitemap lastmod: FIXED (see sitemap.md).
- No IndexNow: FIXED (script + key).
- REMAIN: HSTS is `max-age=63072000` only (no includeSubDomains/preload); intro-curtain loader (performance report owns it).

## What works
robots.txt valid (`Allow /`, `Disallow /api/`, sitemap line); sitemap valid; http->https 308; trailing slash 308 to slashless; true 404 status; canonical host consistent; lang="en"; viewport correct, no zoom lock; CSP present without `unsafe-eval` in prod; frame-ancestors; X-Robots-Tag absent (no accidental blocking); /llms.txt 200; `/api/*` GET returns 404, POST handler redirects form posts to /quote/thanks or /quote/problem (303) which are noindex,follow.

## Findings
- Medium: Redirect chain on http://www. `http://www.sinovorex.com/about` -> 308 -> `https://www.sinovorex.com/about` -> 308 -> `https://sinovorex.com/about` (2 hops; Vercel does protocol first). Single hop for apex http. Fix: in Vercel Domains set www to redirect directly to apex (domain-level 308) instead of the `next.config.mjs:45` rule, so both protocols go in one hop. Minor crawl-budget issue only.
- Medium: noindex pages and the 404 inherit the layout's canonical to the homepage. `/quote/problem`, `/quote/thanks`, and 404 emit `<link rel="canonical" href="https://sinovorex.com">` (root `app/layout.tsx:16` calls `pageMeta(... path:"/")`, `lib/seo.tsx:22`; child pages `app/quote/problem/page.tsx:7`, `app/quote/thanks/page.tsx:7`, `app/not-found.tsx:6` don't override). Conflicting noindex + canonical-to-home is a mixed signal. Fix: in those three metadata exports add `alternates: { canonical: null }`, or better, remove the canonical/OG from root layout and let each page set its own.
- Low: 404 page emits two robots tags (`noindex` and `noindex, follow`). Cause: Next.js adds `noindex` for not-found itself plus `app/not-found.tsx:6` robots. Harmless (same directive) but delete the `robots` field at `app/not-found.tsx:6`. Same page inherits homepage title/OG? title is custom; fine.
- Low: HSTS lacks `includeSubDomains; preload`. Vercel sets the header; override in `next.config.mjs` headers: `Strict-Transport-Security: max-age=63072000; includeSubDomains; preload` (only submit to preload once all subdomains are HTTPS).
- Low: CSP uses `'unsafe-inline'` for scripts (needed for Next bootstrap and JSON-LD); acceptable. It also whitelists `vercel.live` / `wss://ws-us3.pusher.com` in production; those are for preview toolbar only. Optionally gate behind `isDev`/preview.
- Low: `Access-Control-Allow-Origin: *` on all static/HTML responses is Vercel's default for static assets; no sensitive data, no action.
- Low: hreflang: not needed. English-only single-locale site, `lang="en"`, `locale: en_US`. Add only if translated versions (e.g. Spanish, German) are launched; delegate to seo-hreflang then.

## IndexNow
`scripts/indexnow.mjs` + `npm run indexnow` (`package.json:11`): reads live sitemap, POSTs 20 URLs to api.indexnow.org with `keyLocation`. Key file `public/c45690fe483bb9f595b7bd03894d610e.txt` is live (200, text/plain, body equals key exactly). Valid. Notes (Low): runs manually, not on deploy (add as Vercel post-deploy/GitHub Action); key hardcoded (fine, public by design); the script treats 200/202 OK, 422/429 would fail the exit. Also verify the site in Bing Webmaster Tools (`NEXT_PUBLIC_BING_SITE_VERIFICATION`, `app/layout.tsx:11`).

## JS rendering / mobile / CWV
All content in raw HTML; no JS required for indexing. Viewport `width=device-width, initial-scale=1`. Fonts self-hosted with swap. Lab CWV belongs to the performance report; the first-visit intro curtain (`app/layout.tsx` INTRO_FLAG, IntroCurtain) remains the main LCP/INP risk.

## URL structure
Flat lowercase hyphenated slugs, max depth 2, no params. `/sourcing-for/*` has no index page (404 at `/sourcing-for`): Low, add a hub or ensure no links point to it.
