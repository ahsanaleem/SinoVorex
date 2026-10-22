# Action Plan — sinovorex.com (2026-10-22)

SEO Health Score **81/100** (was 59). No Critical items. Ordered by impact ÷ effort.

## Critical
None — every indexable page is 200, server-rendered, canonicalised and in the sitemap.

## High (this week)
1. **Fill the trust data** — `components/sinovorex/data.ts`: `licenceNo` (:22), `foundedYear` (:26), `sameAs` (:28), `TEAM` (:32), `commissionRange` (:125), `inspectionRate` (:127). Footer, /about, Organization schema and pricing UI already render them. *Effort: 30 min + gathering the data.*
2. **Get into Bing (and confirm Google)** — verify in Bing Webmaster Tools and Google Search Console (set `NEXT_PUBLIC_BING_SITE_VERIFICATION` / `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`, `app/layout.tsx:11-18`, or use DNS), submit `https://sinovorex.com/sitemap.xml`, run `npm run indexnow`. *1 h.*
3. **Create off-site profiles** — LinkedIn company page, Google Business Profile (Suzhou office), YouTube, 1–2 B2B directories; add URLs to `sameAs`. *1–2 days.*
4. **Real proof** — replace "Illustrative example" cases (`content/services.ts:79,147,212`) with 2–3 real anonymised orders; publish a redacted sample inspection report and factory-audit report. *1–3 days.*

## Medium (within a month)
5. Name an author: add a real person to `TEAM`, switch Article `author` to Person (`ArticleView.tsx:23`), show a byline. *2 h.*
6. Internal links to guides: footer + homepage guide list, `related` guides for order-follow-up and samples-consolidation (`app/services/[slug]/page.tsx:33`), in-body links from service pages. *1 h.*
7. Fix noindex-page canonicals: `alternates: { canonical: null }` in `app/quote/thanks/page.tsx:7`, `app/quote/problem/page.tsx:7`, `app/not-found.tsx:6` (also drop the duplicate robots there). *10 min.*
8. De-cannibalise: retitle product-sourcing away from "China Sourcing Agent" (`content/services.ts:22`); write a 2,500+ word `/guides/china-sourcing-agent` pillar. *1 day.*
9. Shipping intent: add "shipping from China to USA / UK / EU" guides; retarget the service page to "freight forwarding from China". *2–3 days.*
10. Deepen the Amazon page and cost guide toward 2,000+ words; source the market figures in all guides (1–3 named sources each). *1–2 days.*
11. Homepage mobile performance: drop parallax/`useScroll` springs on touch, lazy-mount below-fold sections, `aria-hidden` + dedupe the marquee (`Hero.tsx:26-45,150`). *0.5 day.*
12. Intro curtain: remove or cut to ≤300 ms and remove the 0.8 s H1 delay (`globals.css:61,72-73`). *30 min.*
13. Mobile UX: shrink the globe below `md` so H1 + CTA sit in the first screen; quote inputs 16 px, labels ≥12 px; ≥44 px tap targets; hide floating chat on /quote; form above explainer on mobile. *0.5 day.*
14. Quote form fit: "What do you need?" service chips, Amazon FBA toggle, `?service=` prefill from service-page CTAs (`QuoteForm.tsx:111-124`). *0.5 day.*
15. Real photos / video on service pages and guides with descriptive alt text. *Ongoing.*
16. `http://www` single hop: set www→apex redirect at the Vercel domain level. *10 min.*
17. Automate sitemap lastmod (git-derived) and IndexNow on deploy. *1 h.*

## Low (backlog)
- HSTS `includeSubDomains; preload`; gate `vercel.live`/pusher CSP entries to preview.
- `/sourcing-for` hub page (currently 404).
- Remove `world-dots.svg` preload (`GlobalReach.tsx:38`); long cache headers for `/brand`, `/products`, OG image; delete unused Geist fonts; SVGO logos; re-encode OG PNG (~60 KB).
- Schema: /services hub reference Service `@id`s (`app/services/page.tsx:24`); ≥512 px logo (`lib/seo.tsx:42`); homepage WebPage `dateModified`; breadcrumbs on /privacy, /terms.
- Rename duplicate H2s (`services.ts:282,366`, `audiences.ts:25`); trim hotels description; lengthen /terms and /privacy descriptions.
- Single responsive `<table>` instead of table + card duplicate (`Blocks.tsx:72-104`); concrete homepage FAQ answers.
- Optional agent-readiness drafts: Content-Signal, llms-full.txt, WebMCP annotations on the quote form.
- Do **not** add FAQPage markup expecting rich results — Google ended them for all sites on 2026-05-07.

## Monitoring
- Run Lighthouse / PSI with an API key for real CWV and the Agentic Browsing fraction.
- Capture a drift baseline (`/claude-seo:seo-drift baseline https://sinovorex.com`) so future deploys can be diffed.
- After Bing/GSC verification, re-audit in ~6 weeks with field data and backlink data.
