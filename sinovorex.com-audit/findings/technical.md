# Technical SEO Audit — sinovorex.com

Site: B2B China sourcing/export agency. Next.js 14 (App Router), hosted on Vercel.
Pages audited: `/`, `/services/product-sourcing`, `/services/factory-vetting`, `/services/quality-inspection`,
`/services/samples-consolidation`, `/services/shipping-coordination`, `/services/order-follow-up`, `/privacy`, `/terms`.

Source reviewed at `C:/Users/User/Downloads/SinoVorex` (app/layout.tsx, app/robots.ts, app/sitemap.ts,
app/services/[slug]/page.tsx, next.config.mjs, components/sinovorex/*, components/TradevorexHome.tsx).
Live checks via `render_page.py` (raw mode, saved at
`C:/Users/User/Downloads/SinoVorex/sinovorex.com-audit/homepage-render.json`), `sitemap_discovery.py`, and direct `curl`.

## Technical Score: 80 / 100

Solid Next.js App Router fundamentals (server-rendered HTML, correct status codes, clean metadata, valid
sitemap/robots) pulled down by missing security headers, an inaccurate sitemap freshness signal, a
client-side intro loader that blocks interaction/paint for ~1.5s on first visit, and an unverifiable
`www` host configuration.

---

## What Works

- **Server-side rendering confirmed.** `render_page.py --mode auto` reported `is_spa: false` and `mode_used: raw` for the homepage — full content (title, meta, body copy, nav links, footer) is present in the raw HTML with no JS execution required. Same confirmed for `/services/product-sourcing`. Good for crawlability; no JS-rendering dependency.
- **robots.txt is correct and crawlable** (`app/robots.ts`): `Allow: /`, `Disallow: /api/`, declares `Sitemap: https://sinovorex.com/sitemap.xml`. Returns HTTP 200.
- **sitemap.xml is valid and discoverable.** `sitemap_discovery.py` found it via the robots.txt declaration, parsed it as a valid `urlset`, and found no better candidate at common fallback paths (`/sitemap_index.xml`, `/sitemap-index.xml`, `/wp-sitemap.xml` all 404, as expected). All 9 indexable pages are listed with correct absolute URLs.
- **Canonical tags are correct and self-referencing** on every page checked (home: `https://sinovorex.com`; service pages: `https://sinovorex.com/services/<slug>`; privacy/terms likewise), set via `alternates: { canonical: ... }` in each page's `Metadata` export.
- **Clean URL structure.** Flat, lowercase, hyphenated slugs (`/services/factory-vetting`, etc.), no query-string or ID-based URLs, generated statically via `generateStaticParams()` in `app/services/[slug]/page.tsx`.
- **HTTP→HTTPS redirect works correctly**: `http://sinovorex.com/` → `308 Permanent Redirect` → `https://sinovorex.com/`.
- **Trailing-slash normalization is consistent**: `/services/product-sourcing/` → `308` → `/services/product-sourcing` (Next.js default `trailingSlash: false`), matching the canonical tag exactly.
- **404 handling is correct**: unknown paths return a true HTTP `404` status (custom `app/not-found.tsx`), not a soft-404 200.
- **HSTS is present** (`Strict-Transport-Security: max-age=63072000`) on all pages.
- **Mobile viewport is correct**: `<meta name="viewport" content="width=device-width, initial-scale=1"/>` on every page (Next.js App Router default), with no `maximum-scale`/`user-scalable=no` restricting pinch-zoom.
- **Images have alt text.** All `<img>` tags found in the rendered homepage HTML (9 total) have populated, descriptive `alt` attributes (e.g. `alt="World map showing shipping routes from China to partner markets"`).
- **Structured data validates.** A single `Organization` JSON-LD block (injected in `app/layout.tsx:28-42`, 847 bytes) parses successfully with `types: ["ContactPoint","Organization","PostalAddress"]` and no truncation.
- **Fonts are self-hosted** (`next/font/google` with `display: "swap"` in `app/layout.tsx:45-47`), avoiding a third-party Google Fonts request and FOIT — intentionally done because "Google Fonts is blocked in mainland China" per the code comment. Good for LCP and for CN-based visitors.
- **One H1 per page**, single clear heading hierarchy confirmed on homepage and a service page.

---

## Findings

### Critical
None found.

### High

**H1 — No security response headers (CSP, X-Content-Type-Options, X-Frame-Options, Referrer-Policy, Permissions-Policy).**
Only `Strict-Transport-Security` is sent; verified identical across `/`, `/services/product-sourcing`, `/privacy`, `/terms`, and the 404 page via `curl -D -`. `next.config.mjs` is effectively empty:
```js
/** @type {import('next').NextConfig} */
const nextConfig = {};
export default nextConfig;
```
No `headers()` function is defined, and there is no `vercel.json` or `middleware.ts` in the repo to add them at the edge either.
- *Why it matters for SEO:* Google's security/UX signals aside, missing `X-Frame-Options`/CSP leaves the site open to clickjacking, and missing `X-Content-Type-Options: nosniff` + `Referrer-Policy` are standard items flagged by Core Web Vitals/Lighthouse "Best Practices" audits, which factor into Search Console's overall site-health signals and are a basic trust signal for a B2B lead-gen site asking visitors to submit company/product data.
- **Fix:** add a `headers()` export in `next.config.mjs`, e.g.:
```js
async headers() {
  return [{
    source: "/:path*",
    headers: [
      { key: "X-Content-Type-Options", value: "nosniff" },
      { key: "X-Frame-Options", value: "SAMEORIGIN" },
      { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
      { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
      { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
    ],
  }];
}
```
(A CSP needs care because the site loads Plausible/GA scripts conditionally — `app/layout.tsx:64-79` — and inline JSON-LD; a `script-src` allow-list plus `'unsafe-inline'` or nonces for the inline `<script type="application/ld+json">` would be required.)

**H2 — `www.sinovorex.com` could not be verified and may not be configured at all.**
`https://www.sinovorex.com/` and `http://www.sinovorex.com/` both fail at the TLS handshake stage (`SSL/TLS connection failed`, curl error 35) even when resolved via Google's public resolver (8.8.8.8) independent of this machine's proxy. The apex domain `sinovorex.com` resolves and serves correctly through the same path, so this is not purely a local network artifact affecting the whole domain — only the `www` host failed.
- *Caveat:* this sandboxed environment resolves all hostnames to non-routable `28.0.0.0/8` addresses (both `sinovorex.com` and `www.sinovorex.com`), so DNS here is not showing real-world records; the apex request still reached a real Vercel backend (got genuine `X-Vercel-Id`, `Etag`, `Age` headers), while the `www` request did not reach anything that could complete a handshake. This is suggestive but not conclusive proof that `www` is unconfigured in production.
- **Recommendation:** verify directly from an unrestricted network/browser that `https://www.sinovorex.com` either (a) is not expected to resolve at all (fine, as long as no inbound links/backlinks/old citations point to `www`), or (b) redirects 301/308 to the bare `https://sinovorex.com`. If any marketing material, backlinks, or the business license/WeChat listings reference `www.sinovorex.com`, add it as a redirect domain in the Vercel project's Domains settings — don't leave it as a dangling, un-routable host that could 404 or error for anyone who types `www.`.

### Medium

**M1 — Sitemap `lastmod` is inaccurate: every URL reports the same build/request timestamp, not real content dates.**
`app/sitemap.ts:6-11`:
```ts
const now = new Date();
return [
  { url: `${SITE_URL}/`, lastModified: now, ... },
  ...SERVICES.map((s) => ({ url: ..., lastModified: now, ... })),
  { url: `${SITE_URL}/privacy`, lastModified: now, ... },
  { url: `${SITE_URL}/terms`, lastModified: now, ... },
];
```
Live fetch confirms every one of the 9 URLs carries the identical `<lastmod>2026-10-18T10:01:02.002Z</lastmod>` — i.e. whatever moment the cached response was generated, not when any page's content actually changed.
- *Why it matters:* Google explicitly discounts `lastmod` values it cannot trust (e.g. values that are always "now" regardless of real edits), so this sitemap currently carries no freshness signal at all — a missed opportunity to prioritize recrawl of genuinely updated pages (e.g. after updating a service description), and a pattern Search Console sometimes flags as "Sitemap stale/invalid dates."
- **Fix:** derive `lastModified` per URL from real data — e.g. the git commit date of the relevant content file at build time, a CMS `updatedAt` field, or at minimum hard-code distinct, meaningful dates per section when content actually changes — rather than `new Date()` computed on every request/revalidation.

**M2 — Client-side intro loader blocks first paint/interaction for up to ~1.5s on every new session, and reappears (briefer) on every subsequent page load.**
`components/sinovorex/chrome.tsx:15-27` (`PageLoader`): on mount it sets `document.documentElement.style.overflow = "hidden"`, runs a 0.9s counter animation (0.15s if `sessionStorage['sv-intro']` is already set), then a further 0.6s (or 0.45s repeat) curtain-lift exit animation before calling `onDone()`. The loader is a `position: fixed, z-[100000]` full-viewport overlay (`chrome.tsx:31`) rendered via `AnimatePresence` in `components/TradevorexHome.tsx:38`, and it sits on top of the actual SSR'd hero content for that whole duration, blocking pointer interaction and page scroll the entire time.
- *Why it matters for Core Web Vitals:* this is a classic pattern that hurts **INP** (any click/tap during the loader is swallowed — the overlay has no `pointer-events:none`, and `overflow:hidden` on `<html>` blocks scroll input) and can distort **LCP** measurement: the loader's own logo/text is painted first and is large enough to register as the Largest Contentful Paint element, while the real hero content underneath is delayed from being visually meaningful to the user by ~0.9–1.5s even though it was present in the HTML all along. First-time visitors (the ones a B2B lead-gen site most needs to convert quickly) get the full-length version every session (sessionStorage resets per tab/session), not just once per device.
- **Fix:** Either remove the forced-duration loader entirely (content is already SSR'd — there's nothing to "load"), or at minimum: (1) add `pointer-events-none` as soon as content is visually ready rather than waiting for the full exit animation, (2) don't lock `document.documentElement.style.overflow` for longer than a brief fade (≤300ms), (3) persist the "seen" flag in `localStorage` instead of `sessionStorage` so repeat visitors across sessions never see the full 1.5s version, and (4) test actual LCP/INP in Lighthouse/CrUX with and without the loader to quantify the cost.

**M3 — No IndexNow integration.**
No reference to IndexNow, `api.indexnow.org`, or a key file anywhere in the repo (`grep -ri indexnow` across the project returns nothing), and there's no API route for it under `app/api/`. Bing, Yandex, and Naver support instant-push indexing via IndexNow; relying on sitemap crawl cadence alone (especially with the M1 stale-timestamp issue) means updates to service pages may take longer to reach non-Google engines.
- **Fix:** add a small route (e.g. `app/api/indexnow/route.ts`) or build-time script that pings `https://api.indexnow.org/indexnow?url=<url>&key=<key>` for the 9 URLs whenever content changes, with the key file served at `/<key>.txt` per the protocol. Low effort relative to benefit for a service-based B2B site that will iterate on service-page copy.

### Low

**L1 — No `BreadcrumbList` structured data despite a visible breadcrumb UI on every service page.**
`app/services/[slug]/page.tsx:34-36` renders a visual breadcrumb (`Home / Services / {s.title}`) but no corresponding JSON-LD. Only the `Organization` schema from the root layout is present (confirmed: service page HTML has `application/ld+json` from the layout only — no second schema block).
- **Fix:** add a `BreadcrumbList` JSON-LD block in `generateMetadata`/page body for `/services/[slug]`, matching the visible crumb trail (Home → Services → <Service title>), to make the pages eligible for breadcrumb rich results.

**L2 — Canonical/sitemap trailing-slash mismatch on the homepage.**
The homepage canonical and `og:url` are `https://sinovorex.com` (no trailing slash — `alternates: { canonical: "/" }` in `app/layout.tsx:16`, which Next.js resolves against `metadataBase` without adding a slash), while `app/sitemap.ts:8` lists the homepage as `https://sinovorex.com/` (with trailing slash). Both resolve to the same page and neither causes a redirect, so impact is cosmetic, but it's an easy consistency fix.
- **Fix:** make the sitemap homepage entry `${SITE_URL}` (no trailing slash) to exactly match the canonical/OG URL, or vice-versa.

**L3 — Deprecated `keywords` meta tag still in use.**
`app/layout.tsx:15` sets a `keywords` array rendered as `<meta name="keywords" .../>`. Google and Bing have not used this tag for ranking for over a decade; it adds bytes with zero benefit and occasionally gets scraped by low-quality SEO tools as a competitive signal.
- **Fix:** remove the `keywords` field from the `Metadata` export (no functional loss).

**L4 — `llms.txt` returns 404.**
Confirmed via `curl`. This is an emerging, non-standardized convention (not a ratified crawler protocol, unlike `robots.txt`/sitemaps) for guiding AI assistants/LLM crawlers to a summary of site content — relevant here because B2B buyers increasingly use AI assistants (ChatGPT, Perplexity, etc.) to shortlist sourcing agencies.
- **Fix (optional, low priority):** add a plain-text `/llms.txt` summarizing the company, services, and linking to the 9 indexable pages. Not required for traditional SEO; treat as a forward-looking AI-visibility addition, not a compliance gap.

### Info

- **`Server: Vercel` header is exposed** on every response (homepage headers confirm). Minor information disclosure; not a meaningful attack-surface increase given Vercel is a well-known platform, but can be stripped via `next.config.mjs` `headers()` if a stricter posture is desired alongside the fixes in H1.
- **No hreflang tags** — correctly absent. The site is single-locale (`en_US`), targets "Worldwide" per the `Organization` schema's `areaServed`, and there is no evidence of planned localized versions. No action needed unless/until additional language versions are built; if that happens, defer to the `seo-hreflang` sub-skill for implementation.
- **Dead/unused code found but not shipped:** `components/three/HeroOrb.tsx`, `components/three/NeuralNetwork.tsx`, and `components/sections/AITech.tsx` (leftover from a prior "APPVIX" template) are not imported by `components/TradevorexHome.tsx` or any live route, so they are tree-shaken out of the production bundle and have no runtime CWV impact. Pure repo-hygiene note, not an SEO issue — safe to delete if unused.
- **Heavy client-side animation stack** (`framer-motion`, `gsap`, `@gsap/react`, `lenis`/`@studio-freight/lenis` smooth-scroll) is used extensively across every homepage section (`Hero.tsx`, `Services.tsx`, `Trade.tsx`, `GlobalReach.tsx`, `Nav.tsx`, `primitives.tsx`). This is architecturally consistent with the loader issue in M2 — it doesn't block crawlability (content is SSR'd and the animations are purely presentational `opacity`/`transform`, which don't shift layout and so shouldn't directly hurt CLS), but it is worth a real-device/Lighthouse INP measurement pass post-launch given the amount of JS executing on scroll and load. No fix prescribed here beyond the loader change in M2; flagging as a monitoring item.
- **Core Web Vitals could not be field-measured** from source/static analysis alone (no CrUX history available for a pre-launch/low-traffic domain). The items in M2 and the Info note above are the source-level risk indicators; confirm with Lighthouse/PageSpeed Insights and real CrUX data once traffic accrues.

---

## Category Pass/Fail Summary

| Category | Status | Notes |
|---|---|---|
| Crawlability | PASS | robots.txt valid, sitemap declared and discoverable, no stray noindex/meta-robots found |
| Indexability | PASS (with M1) | Canonicals correct and self-referencing; sitemap `lastmod` not trustworthy |
| Security | FAIL (H1) | HSTS only; no CSP/X-Content-Type-Options/X-Frame-Options/Referrer-Policy/Permissions-Policy |
| URL Structure | PASS | Clean, flat, hyphenated slugs; consistent trailing-slash + http→https redirects (308) |
| Mobile | PASS | Correct responsive viewport meta, no zoom-blocking, touch-sized nav elements |
| Core Web Vitals (source-level) | NEEDS IMPROVEMENT (M2) | Forced intro-loader delay is the primary source-level risk; recommend field measurement |
| Structured Data | PASS (with L1) | Valid `Organization` schema; missing `BreadcrumbList` on service pages |
| JavaScript Rendering | PASS | Confirmed SSR (`is_spa: false`), full content present without JS execution |
| IndexNow | FAIL (M3) | Not implemented anywhere in the codebase |
| `www` / domain config | UNVERIFIED (H2) | Could not complete a TLS handshake to `www.sinovorex.com` from this environment; needs manual confirmation |

---

## Evidence Files
- `C:/Users/User/Downloads/SinoVorex/sinovorex.com-audit/homepage-render.json` — raw-mode render of `/` (status 200, `is_spa: false`, headers, structured-data validation, extracted text)
- Source cited inline: `app/layout.tsx`, `app/robots.ts`, `app/sitemap.ts`, `app/services/[slug]/page.tsx`, `next.config.mjs`, `components/sinovorex/chrome.tsx`, `components/TradevorexHome.tsx`, `components/sinovorex/data.ts`
