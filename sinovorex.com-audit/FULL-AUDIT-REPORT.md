# SEO Audit — sinovorex.com

**Date:** 2026-10-19 · **Business type:** B2B service / sourcing agency (China sourcing, inspection & export for buyers worldwide) · **Stack:** Next.js App Router on Vercel · **Pages:** 9 (/, 6 × /services/*, /privacy, /terms)

## SEO Health Score: 59 / 100

| Category | Weight | Score | Source |
|---|---|---|---|
| Technical SEO | 22% | 78 | findings/technical.md, sitemap.md |
| Content Quality | 23% | 42 | findings/content.md, sxo.md |
| On-Page SEO | 20% | 61 | findings/content.md |
| Schema / Structured Data | 10% | 48 | findings/schema.md |
| Performance (CWV) | 10% | 60 | findings/performance.md (lab only) |
| AI Search Readiness | 10% | 56 | findings/geo.md (46) + agentic.md (78), weighted 70/30 |
| Images | 5% | 78 | findings/visual.md |

Technical was lowered from the agent's 80 to 78 after the `www` DNS failure was independently confirmed (Google DNS returns NXDOMAIN for `www.sinovorex.com`).

### Data limitations
- **No field data.** No Google API key, so no CrUX / Search Console / GA4. PageSpeed Insights' anonymous quota was exhausted; performance numbers are single-run Playwright lab measurements on this machine — directional only.
- **No backlink data.** No Moz/Bing keys; the domain is not yet in Common Crawl (new / just rebranded). Backlinks are *not scored*.
- **SERP analysis** used web search, not a live Google SERP (no PAA / AI Overview / positions).
- **Skipped:** local SEO (worldwide B2B, no local intent in SERPs), drift (no baseline), e-commerce, Google/Matomo agents (no credentials).

### Severity recalibration
Specialist agents marked several items "Critical". Under this audit's definition (Critical = blocks indexing or causes penalties), **no issue is Critical** — every page is indexable, returns 200, is server-rendered and canonicalised. Those items are reported below as High.

---

## Executive Summary

The technical foundation is sound: server-rendered pages, correct canonicals, valid robots.txt and sitemap, clean URLs, real 404s, zero layout shift. The site is held back by **what it says and proves**, not by how it's built:

**Top 5 issues**
1. **No proof of track record** (E-E-A-T). Business licence number field is empty (`components/sinovorex/data.ts:20`), no team, founding year, case studies, testimonials, sample reports or /about page; product photos are AI-generated. For a China intermediary, buyer trust is the conversion bottleneck *and* the ranking bottleneck.
2. **Service pages are thin and near-duplicate.** 147–194 words each; ~45–60% is the same 6-step process block; pairwise overlap 0.45–0.48.
3. **Pages don't target what people search.** "China sourcing agent" appears on zero pages (only in the ignored `keywords` meta). Homepage H1 is a slogan. No guide content exists, yet guides dominate the SERP for the head terms.
4. **Homepage LCP is poor (4.3 s desktop / 6.6 s mobile lab)** because the intro loader + hero fade hide the H1 for ~2.5–3.5 s.
5. **6 of 7 FAQ answers (and CIF/DDP Incoterm panels) are absent from the HTML** — only mounted when opened, so crawlers and AI engines never see them.

**Top 5 quick wins**
1. Fill `licenceNo` in `data.ts` — footer, About, and schema `taxID` already render it.
2. Render all FAQ / Incoterm answers in the DOM (CSS-hide or `<details>`) — ~1 h.
3. Add the `www` DNS record (CNAME → `cname.vercel-dns.com`) and redirect to apex.
4. Make the hero visible by default; let the loader overlay it rather than gate it.
5. Verify in Google Search Console + Bing Webmaster Tools and submit the sitemap (Bing currently shows zero indexed pages, which also starves ChatGPT Search and Copilot).

---

## Technical SEO — 78

**Works:** SSR on all pages (`is_spa: false`); robots.txt allows `/`, disallows `/api/`, declares sitemap; sitemap valid and exactly matches the 9 real pages, all 200; self-referencing canonicals; http→https 308; true 404 via `app/not-found.tsx`; HSTS; correct viewport; self-hosted fonts (works in mainland China).

| Sev | Finding | Fix |
|---|---|---|
| High | `www.sinovorex.com` has no DNS record (NXDOMAIN, confirmed via dns.google). Typed or linked `www` URLs fail. | Add `www` CNAME → `cname.vercel-dns.com`, add domain in Vercel, 308 → apex. |
| Medium | Only HSTS; no CSP, X-Content-Type-Options, X-Frame-Options, Referrer-Policy, Permissions-Policy. `next.config.mjs` is empty. | Add `async headers()` in `next.config.mjs` (snippet in technical.md). |
| Medium | Sitemap `lastmod` identical for all URLs — `app/sitemap.ts:6` uses one `new Date()`. | Per-route real dates (hardcoded map or git-derived). |
| Medium | No IndexNow. | Add key file + ping on deploy (helps Bing, see AI Search). |
| Low | Homepage canonical `https://sinovorex.com` vs sitemap `https://sinovorex.com/` (cosmetic). | Align. |
| Low | `keywords` meta in `app/layout.tsx` (ignored by Google). | Remove; put the terms in visible copy instead. |
| Info | `priority`/`changefreq` in sitemap (ignored since 2023); unused three.js/portfolio template code and ~17 MB orphan assets in `public/`. | Optional cleanup. |

## Content Quality — 42

E-E-A-T 35 (Experience 25 · Expertise 40 · Authoritativeness 15 · Trust 55). Copy is honest, clear and readable (homepage Flesch 65.7, 653 words); legal entity, address and PIPL/GDPR-aware privacy policy are present.

| Sev | Finding | Fix |
|---|---|---|
| High | **No evidence of experience.** Empty licence number, no team/founder/founding year, no case studies, testimonials, client logos, sample inspection/audit reports; /about 404; AI product images. | Fill licence + link to gsxt.gov.cn verification; add /about with named people and office photos; publish 2–3 real case studies and redacted sample reports; replace AI images with real photos. |
| High | **Thin service pages** (147–194 words vs ~800 floor; ~70–90 unique words each). | Add per-service fields in `data.ts` (who it's for, steps, report contents, timing, cost basis, problems caught, example) and render in `app/services/[slug]/page.tsx`. |
| High | **Near-duplicate service pages** — same H2s, full 6-step process block repeated (`page.tsx:73-84`). | Unique H2s per service; show only the relevant process step. |
| High | **No guide content** while guides own ~65% of the SERP for "china sourcing agent" (2,500–4,000-word pages). | `/guides/` hub: sourcing agent cost & red flags, small business / low MOQ, factory audit checklist, pre-shipment inspection & AQL, freight forwarder vs sourcing agent. |
| High | **Opaque pricing** — competitors publish 5–10% commission and $199–320/inspection man-day. | Publish ranges + a worked $10k order example. |
| Medium | No quotable specifics (AQL / ISO 2859-1, inspection types PSI/DUPRO/IPI, report turnaround). | Add only true specifics. |
| Medium | No audience pages for Amazon sellers, small businesses, hotel procurement (weakest personas: Amazon 44, QC buyer 46, cost comparer 46). | `/sourcing-for/...` pages; hotel path needs compliance notes (food-contact, fire-retardant textiles) and multi-item spreadsheet upload. |
| Low | Legal name only in Chinese; no visible dates/reviewer on service pages. | Add English gloss; "last updated" dates. |

## On-Page SEO — 61

**Works:** one H1 per page, clean heading order, unique titles/descriptions, self-canonicals, visible breadcrumbs, strong internal linking to all service pages.

| Sev | Finding | Fix |
|---|---|---|
| High | Head terms missing from visible text; homepage H1 "The Force Behind Global Trade" (`Hero.tsx:77-83`, also uses non-breaking spaces between words). | H1 e.g. "China Sourcing Agent for Global Buyers"; keep slogan as non-heading tagline; normal spaces. |
| High | Service H1s/titles don't match searched phrases ("Shipping Coordination in China", "Order Follow-up in China"; factory-vetting never says "factory audit"). | Retarget: "Pre-shipment Inspection & Quality Control in China", "Factory Audit & Supplier Verification in China", "Shipping from China: Sea, Air & Rail Freight". |
| High | FAQ answers 2–7 and CIF/DDP panels not in HTML (`Trade.tsx:185-190, 242-247`, `{isOpen && …}`). | Always render; hide with CSS/`<details>`; make questions H3s. |
| Medium | /privacy and /terms inherit homepage og:title/og:url; service pages lose og:image (override at `page.tsx:17-20`); service pages use `og:type=article` with no dates. | Per-page OG/Twitter metadata; `og:type=website`. |
| Medium | Breadcrumb "Services" links to `/#services`; process steps don't link to their service pages. | Add a /services index page; cross-link steps. |
| Low | Homepage meta description 175 chars. | ~150 chars. |
| Low | Placeholder text in server HTML: "Loading experience 000", "Local time --:--"; brand spelled "SinoVorex" in footer wordmark. | Keep out of SSR HTML; spell "Sino Vorex" consistently. |

## Schema / Structured Data — 48

One valid `Organization` block (from `app/layout.tsx:28-42`) on every page. No deprecated types. The visible FAQ is unmarked — **leave it that way**: FAQ rich results were retired for all sites on 2026-05-07, so new FAQPage markup has no Google SERP benefit.

| Sev | Finding | Fix (ready-to-paste JSON-LD in schema.md §4) |
|---|---|---|
| Medium | No BreadcrumbList despite visible breadcrumbs on service pages. | Template in `app/services/[slug]/page.tsx` (one edit covers all 6). |
| Medium | No `Service` schema per service page. | Same file, built from `SERVICES`. |
| Medium | No `WebSite` entity; no `@id` linking; no `sameAs` (no profiles exist yet). | `@graph` in layout.tsx; add `sameAs` once profiles exist. |
| Low | Logo is SVG; `taxID` missing (licence empty). | Use `/apple-icon.png`; fill licence. Consider `ProfessionalService` type. |

## Performance (CWV) — 60 (lab)

| Page | Device | LCP | INP (synthetic) | CLS |
|---|---|---|---|---|
| / | Desktop | 4.25 s Poor | 160 ms Good | 0 Good |
| / | Mobile (4× CPU, slow 4G) | 6.58 s Poor | 1,224 ms Poor | 0 Good |
| /services/product-sourcing | Desktop | 1.76 s Good | — | 0 Good |
| /services/product-sourcing | Mobile | 3.80 s Needs Improvement | 64 ms Good | 0 Good |

TTFB 321–574 ms (Vercel edge cache hit). Brotli + immutable caching on static assets. The "3D globe" is a light Canvas2D renderer, not three.js.

| Sev | Finding | Fix |
|---|---|---|
| High | **Loader gates LCP.** `PageLoader` (`chrome.tsx:8-39`, ~1.5 s) then `Hero.tsx:27-31` keeps H1 at opacity 0 until `ready`, plus ~1 s fade. Service pages (no loader) are fine with the same JS. Also locks scroll/pointer and coincides with the 760 ms long task behind the mobile INP. | Render hero visible by default; play the intro as an overlay or skip it for organic entries. |
| High | ~212 KB brotli shared JS (framer-motion, lenis, lucide) on every route. | `next/dynamic` for Hero/HeroGlobe/PageLoader; CSS for simple reveals. |
| Medium | Homepage DOM ~1,570 elements. | Trim decorative nodes. |

## Images — 78

**Works:** deliberate alt text everywhere (decorative images correctly `alt=""` + `aria-hidden`); explicit width/height (CLS-safe); lazy loading below the fold; SVG logos; 97–143 KB JPGs.

| Sev | Finding | Fix |
|---|---|---|
| Medium | No WebP/AVIF, no `srcset`/`sizes` (mobile downloads the 1200 px image); `next/image` bypassed via eslint-disable. | Use `next/image` or `<picture>` with AVIF/WebP + `sizes`. |
| Medium | Product images are AI-generated and labelled "illustrative". | Real factory/inspection photos (also an E-E-A-T fix). |
| Low | ~1.1 MB orphan rasters + ~17 MB orphan SVG/video in `public/`. | Delete. |

## Visual / Mobile

Desktop: H1, subhead, both CTAs and globe above the fold. Mobile: no horizontal overflow at 375 px; layout good once loaded. (Blank `home-mobile.png` and the gaps in `home-mobile-full.png` are screenshot-timing artifacts of the loader and scroll-reveal animations — `home-mobile-wait4s.png` and `home-mobile-scrolled-full.png` show the correct render.)

| Sev | Finding | Fix |
|---|---|---|
| Medium | **No mobile nav menu on service/legal pages** (`SubpageShell.tsx` shows only logo + Get a Quote). | Reuse `Nav.tsx` menu. |
| Low | Hamburger tap target 44 px (48 px guideline). | Enlarge. |
| Low | No inline hero CTA on service pages. | Add one. |

## AI Search Readiness — 56

GEO 46 (Citability 40 · Structure 55 · Multi-modal 35 · Authority/Brand 20 · Technical 80) · Agent readiness 78. All AI search and training crawlers allowed; content server-rendered; agent-UX heuristic 100/100 on the homepage DOM.

| Sev | Finding | Fix |
|---|---|---|
| High | **No off-site entity presence.** Bing `site:sinovorex.com` returns nothing (ChatGPT Search and Copilot rely on Bing); no LinkedIn/YouTube/directory profiles, no Wikidata, no Wayback snapshots, no `sameAs`. | Bing Webmaster Tools + IndexNow; LinkedIn company page, Google Business Profile, Made-in-China / Global Sources / Kompass listings; link via `sameAs`. |
| High | FAQ answers missing from HTML (same as On-Page). | — |
| Medium | Quote form only mounts on click (`ContactModal.tsx`), invisible to fetch-only agents; same for mobile menu. | Server-rendered `/quote` route the modal can also open. |
| Medium | No tables, video, or sample reports. `public/hero-bg.mp4` unused. | Transit-time table by route, sample report, short videos. |
| Info | No `llms.txt`, Markdown delivery, Content-Signal, WebMCP. | Optional; llms.txt is ~15 min. Google Search ignores it. |

## Backlinks — not scored

Not in Common Crawl (`cc-main-2026-jan-feb-mar`), nor is tradevorex.com — consistent with a new domain, not a quality problem. Referring domains, anchors and toxicity could not be measured without Moz/Bing data. Recommended: free Moz API key or Bing Webmaster Tools for link data; earn links via B2B directories, trade associations/chambers, trade-press guest articles and linkable assets (guides, sample reports). Avoid paid link networks.

---

See **ACTION-PLAN.md** for sequencing, and `findings/*.md` for full evidence, file:line citations and code snippets.
