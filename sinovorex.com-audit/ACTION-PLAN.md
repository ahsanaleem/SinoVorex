# Action Plan — sinovorex.com

Health score today: **59/100**. No Critical (indexing-blocking) issues. Ordered by dependency: fixes that unblock others come first.

Each item lists **why** (the observation it rests on), **depends on / unblocks**, **how we'd know it failed**, and a **leading indicator** to watch without re-auditing.

## Phase 1 — Quick fixes (Week 1, ~1–2 days of dev)

| # | Action | Where | Why | Depends / unblocks | Failure check | Leading indicator |
|---|---|---|---|---|---|---|
| 1.1 | Fill `licenceNo` (统一社会信用代码) | `components/sinovorex/data.ts:20` | Rendering code already exists in footer, About, SubpageShell and schema `taxID`; empty string hides it | Unblocks trust content (3.1), schema `taxID` | `curl` homepage HTML: no "统一社会信用代码" | Code visible on every page; schema shows `taxID` |
| 1.2 | Add `www` DNS (CNAME → `cname.vercel-dns.com`), add in Vercel, 308 → apex | DNS / Vercel | `www` is NXDOMAIN | — | `curl -I https://www.sinovorex.com` ≠ 308 | Redirect works from a phone on mobile data |
| 1.3 | Render all FAQ answers + Incoterm panels in the DOM; FAQ questions as H3 | `components/sinovorex/Trade.tsx:185-190, 242-247` | `{isOpen && …}` drops 6/7 answers from HTML | Unblocks AI citability | Raw HTML lacks answer #2 text | Answers quoted in Google/Perplexity results |
| 1.4 | Hero visible by default; loader as overlay (or skip) | `chrome.tsx:8-39`, `Hero.tsx:27-31` | H1 at opacity 0 for ~2.5–3.5 s → LCP 4.3 s / 6.6 s | Unblocks Performance score | Lab LCP on / still > 2.5 s desktop | CrUX LCP (once traffic) < 2.5 s |
| 1.5 | Homepage H1 + title target "China sourcing agent"; slogan as tagline; normal spaces; meta description ≤ 150 chars | `Hero.tsx:77-83`, `app/layout.tsx` | Head term on zero pages | Pairs with 3.x content | Term absent from H1/title | GSC impressions for "sourcing agent" queries |
| 1.6 | Verify Google Search Console + Bing Webmaster Tools; submit sitemap; add IndexNow | external + small route | Bing shows 0 pages; feeds ChatGPT Search/Copilot | Unblocks field data, backlink data, `/seo google` | Bing still 0 indexed after 2 weeks | Indexed-page count in both consoles |
| 1.7 | Per-route sitemap `lastmod`; drop `priority`/`changefreq` | `app/sitemap.ts` | All 9 URLs share one `new Date()` | — | All lastmods identical again | — |
| 1.8 | Per-page OG/Twitter metadata; service `og:type=website`; restore og:image | `app/privacy`, `app/terms`, `app/services/[slug]/page.tsx:17-20` | Legal pages inherit homepage OG | — | Share preview of /privacy shows homepage title | — |
| 1.9 | Security headers (CSP, nosniff, frame, referrer, permissions) | `next.config.mjs` | Only HSTS present | — | `curl -I` lacks headers | securityheaders.com grade |

## Phase 2 — High-impact improvements (Weeks 2–3)

| # | Action | Where | Why | Depends / unblocks | Failure check | Leading indicator |
|---|---|---|---|---|---|---|
| 2.1 | Rewrite the 6 service pages: 800–1,500 unique words each; unique H2s; only the relevant process step; checklist, what the report contains, timing, price basis, example | `data.ts` SERVICES + `app/services/[slug]/page.tsx` | 147–194 words, 0.45–0.48 overlap | Needs 1.1 / 3.1 proof assets to cite | Pairwise overlap still > 0.3 | Service-page impressions in GSC |
| 2.2 | Retarget service H1/titles to searched terms ("Factory Audit…", "Pre-shipment Inspection & QC…", "Shipping from China: Sea, Air & Rail…") | same | Current phrasing has little search demand | Do together with 2.1 | — | Queries per page in GSC |
| 2.3 | Publish price ranges + worked $10k example | homepage fees section / service pages | Competitors publish 5–10% and $199–320/man-day | — | — | Quote-form submissions |
| 2.4 | BreadcrumbList + Service + WebSite JSON-LD with `@id` graph; PNG logo | `app/services/[slug]/page.tsx`, `app/layout.tsx` (code in findings/schema.md §4) | Only Organization exists | — | Rich Results Test errors | Breadcrumb trail shown in Google results |
| 2.5 | Mobile nav menu on subpages; 48 px hamburger | `SubpageShell.tsx`, `Nav.tsx` | Subpages have no menu on mobile | — | — | Mobile pages/session |
| 2.6 | Code-split heavy client JS; `next/image` or `<picture>` with AVIF/WebP + `sizes` | Hero/HeroGlobe/PageLoader, product images | ~212 KB shared JS on every route; same 1200 px image on mobile | After 1.4 | Service-page mobile LCP still > 2.5 s | CrUX |
| 2.7 | Server-rendered `/quote` route (modal can still open it) | new route + `ContactModal.tsx` | Form invisible to fetch-only agents | — | — | — |

## Phase 3 — Content & authority (Month 2)

| # | Action | Why | Depends / unblocks | Failure check | Leading indicator |
|---|---|---|---|---|---|
| 3.1 | /about with named team, founding year, office/warehouse photos; 2–3 real case studies with numbers; redacted sample inspection + factory-audit reports; replace AI product images | Experience 25, Authority 15 — the biggest score drag and the main buyer objection | After 1.1; feeds 2.1, 3.2 and link building | Still no named person or real photo on site | Time on /about; quote conversion rate |
| 3.2 | `/guides/` hub: what a sourcing agent costs & red flags; small business / low MOQ; factory audit checklist; pre-shipment inspection & AQL; freight forwarder vs sourcing agent | Guides are ~65% of the "china sourcing agent" SERP; site has none | Uses proof from 3.1; internal links to 2.1 pages | Guides not indexed after 4 weeks | Guide impressions/clicks in GSC |
| 3.3 | Audience pages: Amazon sellers, small businesses, hotel & café procurement (with compliance notes + multi-item upload) | Weakest personas 44–53 | After 2.1 | — | Conversions by landing page |
| 3.4 | Off-site entity: LinkedIn company page, Google Business Profile, Made-in-China / Global Sources / Kompass listings, trade association membership; add all to `sameAs` | Authority/brand 20/100; zero external mentions | After 1.6 | Brand search still shows unrelated results | Branded search results; referring domains (Bing WMT) |
| 3.5 | Transit-time table by route, short YouTube videos (inspection walkthrough), optional `llms.txt` | Multi-modal 35/100 | After 3.1 | — | — |

## Phase 4 — Monitoring (ongoing)

- Run `/seo drift baseline https://sinovorex.com` after Phase 1 ships, then `/seo drift compare` after each release.
- Once GSC/PSI keys are configured, re-run `/seo google` for CrUX field data to replace these lab numbers.
- Add a free Moz API key and re-run `/seo backlinks` in 2–3 months.
- Housekeeping: delete unused template code (`components/three/*`, `components/sections/*`) and ~18 MB orphan assets in `public/`.
