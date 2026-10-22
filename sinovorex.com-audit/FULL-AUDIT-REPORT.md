# SEO Audit — sinovorex.com

**Date:** 2026-10-22 (re-audit; previous 2026-10-19) · **Business type:** B2B service / sourcing agency (China sourcing, inspection & export for buyers worldwide, Suzhou) · **Stack:** Next.js App Router on Vercel (hkg1) · **Pages crawled:** 21 (20 in sitemap + 2 noindex utility pages excluded; `/api/` disallowed)

## SEO Health Score: 81 / 100 (was 59)

| Category | Weight | Score | Was | Source |
|---|---|---|---|---|
| Technical SEO | 22% | 88 | 78 | findings/technical.md, sitemap.md |
| Content Quality | 23% | 74 | 42 | findings/content.md, sxo.md |
| On-Page SEO | 20% | 86 | 61 | findings/content.md |
| Schema / Structured Data | 10% | 80 | 48 | findings/schema.md |
| Performance (CWV) | 10% | 82 | 60 | findings/performance.md (lab only) |
| AI Search Readiness | 10% | 70 | 56 | findings/geo.md (64) + agentic.md (84), weighted 70/30 |
| Images | 5% | 78 | 78 | findings/performance.md (Images section) |

Supporting scores (not weighted): SXO Gap 68 (was ~46/30) · Visual/mobile 80 · E-E-A-T 52.

### Data limitations
- **No field data.** No Google API key → no CrUX / Search Console / GA4. PageSpeed Insights quota exhausted (HTTP 429), so no Lighthouse Agentic Browsing fraction. Performance numbers are single-run Playwright lab measurements (mobile = 4× CPU, 1.6 Mbps, 150 ms RTT) — directional only.
- **No backlink data.** No Moz/Bing keys. Backlinks not scored; `findings/backlinks.md` is from 2026-10-19 and was not re-run.
- **SERP analysis** used web search (US), not a live Google SERP — no PAA / AI Overview / positions.
- **Bing indexation** was checked by scraping `site:` queries — directional; confirm in Bing Webmaster Tools.
- **Skipped:** local SEO (worldwide B2B, no local SERP intent), drift (no baseline), e-commerce, Google/Matomo agents (no credentials).
- Environment note: this machine's system proxy (127.0.0.1:7890) had to be bypassed (`NO_PROXY='*'`) for the audit scripts.

---

## Executive Summary

In three days the site went from 9 thin pages to 21 substantive ones, and nearly every technical and on-page issue from the last audit is fixed. **No Critical issues.** What remains is almost entirely **proof and presence**: the site still cannot show who is behind it or that it has done real work, and it is invisible to Bing (and therefore to ChatGPT Search and Copilot).

**Fixed since 2026-10-19:** www → apex 308 · full security headers (CSP, nosniff, XFO, Referrer-Policy, Permissions-Policy) · real per-page sitemap lastmod · IndexNow key + script · homepage H1 now "China Sourcing Agent for Global Buyers" · service pages 147–194 → 1,106–1,658 words, overlap 0.45 → 0.05–0.07 · 5 guides, 3 audience pages, /about, /services hub, /quote · FAQ + Incoterm answers in server HTML · Service/Article/Breadcrumb schema · llms.txt · intro loader no longer hides the H1 (LCP 4.3/6.6 s → 1.35/3.08 s) · server-rendered, agent-submittable quote form.

**Top 5 issues**
1. **No proof of real work or people (High).** `licenceNo`, `foundedYear`, `sameAs`, `TEAM` are empty in `components/sinovorex/data.ts:22,26,28,32`; all case studies are labelled "Illustrative example" (`content/services.ts:79,147,212`); no reviews, sample reports or real photos. Trust scores 12–14/25 on every page in the SXO persona review. The display code already exists — only the data is missing.
2. **Not indexed in Bing; no off-site brand presence (High).** Bing `site:` and brand searches return nothing; no LinkedIn/YouTube/directory profiles; no Bing/Google verification meta set (`app/layout.tsx:11-18`, env vars unset). This caps ChatGPT and Copilot visibility.
3. **Guides are under-linked and authorless (Medium).** Guides get 5–9 internal links vs 21 for nav pages; homepage links one guide; `order-follow-up` and `samples-consolidation` link none (`app/services/[slug]/page.tsx:33`). Article author is the Organization (`ArticleView.tsx:23`).
4. **Head-term cannibalisation + page-type gaps (Medium).** Homepage and `/services/product-sourcing` both target "China Sourcing Agent" (`content/services.ts:22`). "china sourcing agent" and "shipping from china" SERPs are dominated by long guides the site doesn't have.
5. **Homepage mobile experience (Medium).** Mobile TBT 705 ms (framer-motion scroll/parallax, 1,707 DOM nodes); globe pushes H1 to y=509 and the CTA to the fold edge; quote inputs at 15 px trigger iOS zoom; 10 px labels; small tap targets.

**Top 5 quick wins**
1. Fill `licenceNo`, `foundedYear`, `sameAs`, `commissionRange`, `inspectionRate` in `data.ts` — footer, /about, schema and pricing UI already render them. (~30 min once you have the data)
2. Verify in Bing Webmaster Tools + Google Search Console, submit the sitemap, run `npm run indexnow`. (~1 h)
3. Add `alternates: { canonical: null }` to `/quote/thanks`, `/quote/problem`, `not-found` (they currently canonicalise to `/`). (~10 min)
4. Link all 5 guides from the footer/homepage and add `related` guides for the two orphaned services. (~1 h)
5. Quote form: 16 px inputs, ≥12 px labels, hide the floating chat button on /quote. (~30 min)

---

## Technical SEO — 88

**Works:** all 21 pages 200 + SSR; robots.txt valid (allow `/`, disallow `/api/`, sitemap declared); sitemap = exactly the 20 indexable URLs, all 200 + self-canonical; lastmod matches git; http→https single 308; trailing slash → 308 slashless; www → apex 308; real 404; self-canonicals; viewport OK; `lang="en"`; full security header set incl. prod CSP without `unsafe-eval`; IndexNow key live; form endpoints → noindex pages.

| Sev | Finding | Fix |
|---|---|---|
| Medium | `/quote/problem`, `/quote/thanks` and the 404 emit `canonical=https://sinovorex.com` (inherited from root layout `pageMeta(path:"/")`, `app/layout.tsx:16`, `lib/seo.tsx:22`). Mixed signal with noindex. | `alternates: { canonical: null }` in `app/quote/problem/page.tsx:7`, `app/quote/thanks/page.tsx:7`, `app/not-found.tsx:6`. |
| Medium | `http://www` takes 2 hops (→ https www → apex). | Configure www→apex redirect at the Vercel domain level instead of `next.config.mjs:45`. |
| Medium | Sitemap lastmod is hand-maintained (`data.ts:35-43`, `content/*.ts` `updated`). | Bump on edit, or derive from git at build. |
| Low | 404 has two robots metas. | Drop `robots` in `app/not-found.tsx:6`. |
| Low | HSTS lacks `includeSubDomains; preload`. | Extend header in `next.config.mjs`. |
| Low | IndexNow only manual. | Run post-deploy (Vercel deploy hook / CI). |
| Low | Prod CSP allows `vercel.live`, `wss://ws-us3.pusher.com`. | Gate to preview/dev. |
| Low | `/sourcing-for` returns 404 though 3 children + breadcrumbs imply a hub. | Add a hub page. |
| Info | hreflang not needed (single locale). | — |

## Content Quality — 74

**Works:** content is accurate and specific (AQL table verified against ISO 2859-1 Level II; worked 3,000-bag example correct; fee ranges, Incoterms, transit times); service pages 80–84 % unique, sourcing-for 75–81 %, guides pairwise overlap 0.05–0.06 — **no thin or duplicate pages**; /about explains verification via gsxt.gov.cn; readability Flesch 43–62 (fits B2B); almost no AI-typical phrasing. E-E-A-T 52 (Experience 30, Expertise 72, Authority 18, Trust 72).

| Sev | Finding | Fix |
|---|---|---|
| High | No proof of real work or people (see Top issue 1). | Fill `data.ts` fields; add one named person; replace illustrative cases with real anonymised ones; publish a redacted sample inspection/audit report. |
| Medium | Guides have no human author/byline. | Person author + "Written by X, role, date" once TEAM populated. |
| Medium | Guides shorter than ranking competitors (1.2–1.5k vs 2.5–4k words); sourcing-for pages 841–953 words. | Extend cost guide and Amazon page (FBA prep, DDP-to-FBA cost example). |
| Medium | Market figures in guides unsourced ("5–10 %", "US$200–350/day", MOQs). | 1–3 named sources per guide, attribution in the same sentence. |
| Medium | Own rates blank (`data.ts:125` `commissionRange`, `:127` `inspectionRate`). | Fill; UI already renders (`Trade.tsx:233-235`). |
| Low | AI-generated product photos (`data.ts:96`). | Replace with real photos as available. |
| Low | No office/address evidence. | Office/team photo or GBP link on /about. |

## On-Page SEO — 86

**Works:** 21 unique titles (42–61 chars) and descriptions; one intent-matched H1 per page; self-canonical, OG and Twitter tags everywhere; real breadcrumbs; templated-metadata risk low.

| Sev | Finding | Fix |
|---|---|---|
| Medium | Guides under-linked (5–9 inlinks); homepage links 1 guide; footer only links /guides (`links.ts:4`); 2 services have no related guides (`app/services/[slug]/page.tsx:33`). | Footer + homepage guide links, `related` entries, in-body contextual links. |
| Medium | 4 titles start "China Sourcing Agent…" — homepage vs product-sourcing compete. | Retitle product-sourcing e.g. "Find Manufacturers in China: Supplier Sourcing" (`content/services.ts:22`). |
| Low | Duplicate H2s: "What you receive" ×2 on order-follow-up/shipping (`services.ts:282,366` + `page.tsx:88`); "How we help" ×2 on amazon-sellers (`audiences.ts:25`, `ArticleView.tsx:52`). | Rename. |
| Low | Hotels description 160 chars; /terms 61, /privacy 90. | Trim / extend. |
| Low | Marquee repeats 6 service names ×8 in accessible text (`Hero.tsx:150`). | `aria-hidden` on the MarqueeBands wrapper. |

## Schema & Structured Data — 80

**Works:** all JSON-LD valid, server-rendered, absolute URLs; consistent `@id` graph (#organization, #website, per-page #service/#article/#webpage); BreadcrumbList on 19/21 pages matching visible crumbs; Service on all 6 services; Article on all 5 guides with dates matching visible "Updated"; CollectionPage/AboutPage/ContactPage/ItemList; logo as ImageObject.

**FAQPage is correctly absent.** Google stopped showing FAQ rich results for all sites on 2026-05-07 (after restricting them to government/health sites in Aug 2023). Keep visible FAQs unmarked; the markup itself isn't harmful if added later for other engines.

| Sev | Finding | Fix |
|---|---|---|
| Medium | Organization has no `taxID`, `foundingDate`, `sameAs` — data empty (`data.ts:22,26,28`); code at `lib/seo.tsx:51-53` already emits them when set. | Fill data. |
| Medium | Article `author` = Organization (`ArticleView.tsx:23`). | Person author with `sameAs` once TEAM populated. |
| Low | /services hub builds id-less Service objects with different names (`app/services/page.tsx:24`). | Reference `{"@id": ".../services/<slug>#service"}`. |
| Low | Logo is the 180 px apple-icon (`lib/seo.tsx:42`). | ≥512 px wordmark PNG; optionally `["Organization","ProfessionalService"]`, `alternateName`. |
| Low | Homepage has no WebPage node / dateModified. (The "2026-01-01" date the audit tool reported was a heuristic guess, not on the site.) | WebPage node with `dateModified: PAGE_UPDATED.home` in `app/page.tsx`. |
| Low | /privacy, /terms lack BreadcrumbList/WebPage; guides share the OG image as Article image. | Cosmetic. |

## Performance — 82

| Page (lab) | Desktop LCP | Mobile LCP | CLS | Mobile TBT |
|---|---|---|---|---|
| Home | 1.35 s | 3.08 s | 0 | 705 ms |
| /services/product-sourcing | 0.94 s | 2.20 s | 0 | 135 ms |
| /guides/china-sourcing-agent-cost | 0.90 s | 2.58 s | 0 | 241 ms |

TTFB 340–430 ms. **Loader fix confirmed** (was 4.3 s / 6.6 s). **Works:** CLS 0 everywhere; globe is `dynamic({ssr:false})` 2D canvas, honours reduced-motion; ~210 KB brotli JS/page; no third-party scripts unless env vars set; self-hosted fonts; immutable `/_next/static`.

| Sev | Finding | Fix |
|---|---|---|
| Medium | Homepage mobile TBT 705 ms / LCP 3.1 s — framer-motion `useScroll`, springs, mouse parallax (`Hero.tsx:26-45`), 1,707 DOM nodes. | Lazy-mount below-fold sections; disable parallax on touch; dedupe marquee. |
| Medium | Intro curtain still delays first-visit paint ~0.75–1.3 s (`globals.css:61,72-73`, `chrome.tsx:12-21`). | Remove, or ≤300 ms and drop the 0.8 s H1 delay. |
| Low | `world-dots.svg` (200 KB, below fold) + logo SVGs preloaded on every page (`GlobalReach.tsx:38`). | Remove preload. |
| Low | `/brand/*`, `/products/*`, `/world-dots.svg`, OG PNG served `max-age=0`. | Long `Cache-Control` via `headers()`. |
| Low | Unused `app/fonts/Geist*.woff` (134 KB). | Delete. |

## Images — 78

**Works:** no missing alt text or dimensions; descriptive product alts, decorative `alt=""`; `next/image` AVIF/WebP with `sizes` (~6 KB delivered vs 97–143 KB source); 1200×630 OG/Twitter image.

| Sev | Finding | Fix |
|---|---|---|
| Medium | Subpages carry only logo images; guides have none; no real photos, sample reports or video. | Real factory/inspection photos with descriptive alts, redacted report images, short videos. |
| Low | One shared 184 KB OG PNG for all pages. | Re-encode (~60 KB); optional per-page OG. |
| Low | Logo SVGs 24–28 KB. | SVGO. |

## AI Search Readiness — 70 (GEO 64 · Agentic 84)

**Works:** all AI crawlers (GPTBot, OAI-SearchBot, ClaudeBot, PerplexityBot, Google-Extended, CCBot, bingbot) get 200 with identical HTML — no WAF/challenge; all content incl. FAQs and tables in server HTML; good llms.txt; guides open with 40–60-word direct answers, key takeaways, real tables; clear entity on /about; clean accessibility tree (0 unnamed controls on / and /quote); quote form is native POST, submittable without JS.

Estimated platform readiness: Google AIO 62 · Perplexity 58 · ChatGPT 45 · Copilot 40 (the last two held back by Bing).

| Sev | Finding | Fix |
|---|---|---|
| High | Not in Bing; no off-site brand mentions/profiles; `sameAs: []`. | Bing WMT + sitemap + IndexNow; LinkedIn, GBP, YouTube, B2B directories → `sameAs`. |
| Medium | Guide statistics unsourced; no named experts. | See Content. |
| Low | Homepage FAQ answers vague ("a few weeks", "most countries"). | Concrete ranges + links to guides (`Trade.tsx:258-280`). |
| Low | Tables rendered twice (desktop table + mobile cards, `Blocks.tsx:72-104`) — duplicated rows in extracted text. | Single `<table>` stacked with CSS. |
| Low | No Content-Signal, Markdown delivery, WebMCP, `.well-known` files, llms-full.txt. | Optional drafts — no known ranking effect. |
| Info | Lighthouse Agentic Browsing fraction not measured (PSI 429). | Run `npx lighthouse --only-categories=agentic-browsing`. |

## Search Experience (SXO) — 68

| Query | SERP page type | Sino Vorex page | Fit |
|---|---|---|---|
| china sourcing agent | ~75 % informational guides | Homepage + product-sourcing | Medium — add `/guides/china-sourcing-agent` pillar (2,500+ words) |
| pre-shipment inspection china | Guides + service pages | QI service + AQL guide | Aligned |
| factory audit china | Guides + service pages | Factory-vetting + checklist | Aligned |
| sourcing agent for amazon sellers | Seller-tool blog guides | /sourcing-for/amazon-sellers (910 w) | Medium — deepen |
| china sourcing agent cost | Guides | Cost guide (1,537 w) | Aligned — add own rates, deepen |
| shipping from china | "Shipping to US/UK" guides | Shipping service page | Medium — destination guides; retarget service page to "freight forwarding" |

Persona scores (home / QI service / cost guide / quote): Amazon FBA seller 60/70/62/55 · Hotel procurement 66/62/59/74 · First-time importer 73/72/78/70. `/quote` doesn't fit inspection-only, audit-only or FBA buyers (`QuoteForm.tsx:111-124`) → add service chips, FBA toggle, `?service=` prefill.

## Visual & Mobile — 80

**Works:** no horizontal overflow at 1366 or 390 px; H1 in first viewport and opacity 1 on all pages; 16 px body; header CTA everywhere; chat button hidden ≥xl.

| Sev | Finding | Fix |
|---|---|---|
| Medium | Mobile home: globe takes ~430 px; H1 at y=509, "Get a Quote" at y=796/844. | Shrink globe below `md` or move CTA up. |
| Medium | Quote inputs/submit 15 px → iOS zoom; labels/placeholders 10 px. | 16 px inputs, ≥12 px labels (`QuoteForm.tsx`). |
| Medium | Small tap targets: breadcrumbs 21 px high, /quote email/phone 20 px, checkbox 16×16, footer links 17 px. | ≥44 px hit areas (padding). |
| Low | Floating chat button overlaps form fields on /quote and guides (mobile). | Hide on /quote; add bottom padding. |
| Low | /quote form below the fold on mobile. | Form first, explainer after. |

Screenshots: `screenshots/{home,product-sourcing,guide-cost,quote}-{desktop,mobile}[-full].png`, `home-*-t0.png` (loader frame), `quote-mobile-form.png`.
