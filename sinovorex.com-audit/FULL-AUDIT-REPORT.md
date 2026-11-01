# Full SEO Audit: sinovorex.com, 2026-11-01

**SEO Health Score: 85/100** (2026-10-22: 81, before that: 59)
**Business type:** B2B service, a China sourcing agent (Suzhou), selling to buyers worldwide. Hybrid: a physical office, but no local-pack intent.
**Scope:** all 45 URLs in `sitemap.xml` crawled (45 × 200, all server-rendered); homepage Lighthouse 12.6 mobile (local run, lab data only). PageSpeed Insights hit its daily quota. No Google/Moz credentials, so there is no field CWV, GSC or backlink data.

| Category | Weight | Score | Δ vs 10-22 |
|---|---|---|---|
| Technical SEO | 22% | 92 | +2 |
| Content Quality | 23% | 70 | +4 |
| On-Page SEO | 20% | 90 | +3 |
| Schema / Structured Data | 10% | 88 | +3 |
| Performance (CWV, lab) | 10% | 95 | +10 |
| AI Search Readiness | 10% | 78 | +3 |
| Images | 5% | 85 | 0 |

## Executive summary

The technical base is very strong. Every page returns 200 and is server-rendered, with its own canonical, a unique title, meta description and H1, and full schema. The sitemap is complete. Mobile Lighthouse scores Performance 99 (LCP 1.5 s, TBT 30 ms, CLS 0). Since the last audit the site has grown from about 25 to 45 pages: a China sourcing agent pillar guide, guides on shipping to the USA, UK and Europe, five market pages, and four tools. It also fixed the canonicals on its noindex pages and removed the intro curtain.

The score is now held back by **trust and proof, not code**. The licence number, founding year, team, `sameAs` profiles, commission range and inspection rate are all still empty. Articles are authored by the Organization rather than a person. The guides cite no external sources. All three service case stories are still labelled "Illustrative example".

### Top 5 issues
1. **Trust data empty** (High): in `components/sinovorex/data.ts`, `licenceNo` (:22), `foundedYear` (:26), `sameAs: []` (:28), `TEAM = []` (:32), `commissionRange` (:147) and `inspectionRate` (:149) are all empty. The UI and schema are already wired to show them.
2. **No named author or byline** (High): Article JSON-LD has `author: {"@id": "#organization"}`. A YMYL-adjacent topic (money, suppliers, customs) needs a person who is accountable.
3. **No cited sources in any guide** (High): the only off-site links in `/guides/china-sourcing-agent-cost` are WhatsApp links. Duty rates, freight ranges and AQL tables have no source.
4. **Proof is illustrative** (High): there are 3 "Illustrative example" cases (`content/services.ts:82,150,215`), and `/case-studies` is still deliberately 404 because `CASE_STUDIES` is empty.
5. **No off-site entity** (High): `sameAs` is empty, and there are no LinkedIn, Google Business Profile or directory profiles that AI engines and Google can use to confirm the brand. Search Console and Bing verification can't be confirmed from the HTML (no meta tags in the markup; it may have been done through DNS).

### Top 5 quick wins
1. Darken the flame colour used for text and buttons: `#FF6B2B` on white has a contrast ratio of 2.84:1 (it needs 4.5:1, or 3:1 for large text). Use `flame.deep #E8501A` or darker for text. The footer's `#7a7a7f` on `#0e0e16` is 4.49:1 and needs a slightly lighter shade. *15 min.*
2. Remove the `<div>` children inside `<ol>` in `#how-it-works` (`components/sinovorex/Services.tsx:32`). *10 min.*
3. Redirect `http://www` to apex in one hop: it currently takes 2 hops. Set the www→apex redirect on the Vercel domain. *10 min.*
4. Trim 6 titles over 60 characters (`/services`, `/sourcing-for`, `/guides/yiwu-market-guide`, `/markets/uae`, `/markets/saudi-arabia`, `/markets/pakistan`). *15 min.*
5. Add internal links to weakly linked pages. `/guides/keqiao-textile-market` has 3 inlinks, `/sourcing-for/*` has 4–5, `/guides/shipping-from-china-to-uk` and `-europe` have 6 each, and `/guides/sourcing-from-china-small-business` has 8. Most other pages have 45, because the footer and nav link them. *30 min.*

---

## Technical SEO: 92

**What works**
- HTTPS on everything; HSTS `max-age=63072000; includeSubDomains`; a strict CSP; `X-Frame-Options`, `nosniff`, `Referrer-Policy` and `Permissions-Policy` headers.
- `http://` → `https://` takes 1 hop, and trailing slashes 308 to the version without them. Real 404s return 404 with `noindex`.
- `robots.txt` allows everything except `/api/` and lists the sitemap. AI crawlers are not blocked.
- The sitemap has 45 URLs and matches the crawl exactly. Every internal link that isn't a query string is in the sitemap, and `lastmod` values vary by page (10-16 → 10-25).
- Every canonical is self-referencing. `/quote?service=*` canonicalises to `/quote`. `/quote/thanks` is `noindex, follow` and has no stray canonical (fixed since 10-22).
- Vercel edge (hkg1) is serving from cache; the root document TTFB in Lighthouse is 170 ms.

**Findings**
| Severity | Finding | Fix |
|---|---|---|
| Medium | Search Console and Bing verification not visible in the HTML (`NEXT_PUBLIC_*_SITE_VERIFICATION` unset in production) | Confirm it was done through DNS. If not, set the env vars in Vercel, submit the sitemap and run `npm run indexnow` |
| Low | `http://www.sinovorex.com` takes 2 redirect hops | Add a www→apex redirect at the domain level in Vercel |
| Low | Lighthouse SEO flags `robots.txt` as invalid because of the unknown directive `Content-Signal: search=yes, ai-input=yes` | Google ignores unknown lines, so there's no ranking impact. Keep it if you want the AI-use signal; otherwise remove it to get Lighthouse SEO to 100 |
| Low | Some first fetches were slow (2–13 s on cold ISR paths, measured from the audit location) | Make sure all sitemap routes are statically generated (`generateStaticParams`) and warm the cache after deploy |

## Content Quality: 70

**What works**
- Pages are substantial: guides run 1,000–2,650 words, service pages 1,160–1,620, market pages 980–1,170. The new pillar guide `/guides/china-sourcing-agent` has 2,653 words.
- There is no templated duplication. Shared 5-word shingles between sibling pages are 9–15% (UK vs Europe shipping is 24%), so the market and audience pages are genuinely distinct.
- The writing is clear and specific (AQL sample sizes, the SABER and customs process, Incoterms), and every page has a strong quote CTA.

**Findings**
| Severity | Finding | Fix |
|---|---|---|
| High | Experience and trust signals are absent: no licence number, founding year, team, photos of people or office | Fill in `data.ts`. Add 2–3 real people with photos and LinkedIn profiles to `TEAM` |
| High | No author: Articles are attributed to the Organization, and there is no byline or reviewer | Add a Person as `author` in `ArticleView.tsx` (around :29), show a byline with credentials and add a "Reviewed by" line |
| High | No external citations in any guide | Add 1–3 primary sources per guide (USTR or CBP for US duties, HMRC, EU TARIC, SASO/SABER, ISO 2859-1 for AQL, the Canton Fair official site) |
| High | All proof is illustrative, and `/case-studies` is hidden | Publish 2–3 real anonymised orders with numbers, plus a redacted sample inspection report and factory-audit PDF |
| Medium | Pricing is vague: "commission on order value" with no range (`commissionRange` empty) | Publish a range (for example 5–10%) and a per-man-day inspection rate. Pricing is a top query for this niche, and the cost guide would back it up |
| Medium | Market pages have about 620–800 words of main content each | Add country-specific detail: ports and transit times, a top-HS-code duty table, local certification steps and payment methods |

## On-Page SEO: 90

**What works**: there are no duplicate titles, descriptions or H1s across 45 pages. Each page has one H1, and descriptions run 120–160 characters on almost every page. Breadcrumbs appear on every non-home page. Service CTAs deep-link to `/quote?service=…`.

**Findings**
| Severity | Finding | Fix |
|---|---|---|
| Medium | Weak internal linking to 8 pages (3–9 inlinks; others have 45) | Link the market-hub guides (Keqiao, Guangzhou fabric), the UK and Europe shipping guides and the audience pages from the homepage, `/guides`, related service pages and in-body copy. Consider adding `/sourcing-for/*` to the footer |
| Low | 6 titles are 61–65 characters and get truncated | Drop the "\| SinoVorex" suffix or shorten, e.g. "China Sourcing Agent for UAE Buyers \| Dubai Shipping" |
| Low | `/privacy` and `/terms` titles are under 30 characters | Fine for legal pages, no action needed |

## Schema / Structured Data: 88

**What works**: every page has an `@graph` with Organization + ProfessionalService (PostalAddress, ContactPoint, a 512 px logo ImageObject), BreadcrumbList, page-specific types (Article, CollectionPage, AboutPage, ContactPage, ItemList, Service, and SoftwareApplication with an Offer on the tools), and `datePublished` and `dateModified` on articles. All JSON-LD parses.

**Findings**
| Severity | Finding | Fix |
|---|---|---|
| Medium | Article `author` is the Organization | Add a `Person` node (name, jobTitle, `sameAs` LinkedIn, `worksFor` → `#organization`) |
| Medium | Organization has no `sameAs`, `taxID` or `foundingDate` (empty data) | These fill in automatically once `data.ts` is completed |
| Info | Do not add FAQPage expecting rich results. Google retired them for all sites on 2026-05-07 | No action |

## Performance: 95 (lab)

Lighthouse 12.6, mobile, homepage: **Performance 99, Accessibility 93, Best Practices 100, SEO 92.**
LCP 1.5 s (the hero subheading `p.sv-rise`), FCP 1.2 s, TBT 30 ms, CLS 0, TTI 2.0 s, Speed Index 3.7 s, transfer 292 KB.

| Severity | Finding | Fix |
|---|---|---|
| Low | Speed Index is 3.7 s, held up by the hero animations and globe paint | Fine for now. Shorten the `sv-rise` and `sv-fade` (0.9 s) durations on mobile, or skip them when `prefers-reduced-motion` is set |
| Low | The homepage HTML is 328 KB (about 172 KB is the RSC flight payload, about 50 KB inline SVG), and the DOM has 1,479 elements | Move the large inline SVGs (world dots, marquee logos) to cached `/public` files, and keep below-the-fold sections as server components to shrink the payload |
| Low | About 11 KB of legacy JS polyfills | Set a modern `browserslist` |
| Info | No field data (CrUX/PSI quota). | Re-run with a PSI API key once traffic builds up |

## Images: 85

All `<img>` elements have `alt`. The four homepage product tiles use `next/image` `fill` (no width or height attributes, but they sit in sized containers, so CLS is 0). Images are served as AVIF/WebP through `/_next/image`. The remaining gap is that the photography is generic product imagery. There are no real photos of the team, the office, an inspection in progress or a factory visit, which would also strengthen E-E-A-T.

## AI Search Readiness: 78

**What works**: `robots.txt` allows all crawlers and sets `Content-Signal: search=yes, ai-input=yes`. `/llms.txt` and `/llms-full.txt` are live and accurate. Pages are server-rendered with clear H2/H3 structure, definitional openings, tables and FAQs. Entity facts (the legal Chinese name, address and contacts) are consistent across llms.txt, the footer and the schema.

| Severity | Finding | Fix |
|---|---|---|
| High | No brand corroboration off-site (`sameAs` empty, no known profiles or mentions) | Create a LinkedIn company page, a Google Business Profile (Suzhou), 1–2 B2B directory listings and a YouTube channel, and get mentioned on Reddit or in trade forums |
| Medium | Claims can't be cited because they have no sources or first-party data | Publish original data (e.g. "AQL failure rates across our inspections, 2026") so engines can quote it |
| Low | No `/.well-known/ai-catalog.json` and no WebMCP annotations on the quote form | Optional; low priority |

## Accessibility (Lighthouse 93)
- **Colour contrast** fails on flame `#FF6B2B` text and buttons on white (2.84:1), and on white text over flame buttons. It also fails on the footer's `#7a7a7f` on `#0e0e16` (4.49:1). Tailwind `flame` is defined at `tailwind.config.ts:16`.
- **List semantics**: `section#how-it-works ol` has `<div>` children (`Services.tsx:32`).

## Progress since 2026-10-22
Fixed or done: noindex-page canonicals; `/guides/china-sourcing-agent` pillar (2,653 words); shipping guides for the USA, UK and Europe; `/sourcing-for` hub (was 404); five market pages; four tools; 512 px logo; varied sitemap lastmod; intro curtain removed (mobile Performance now 99); HSTS `includeSubDomains`; service CTAs prefill `?service=`.
Still open: trust data, a named author, real case studies, off-site profiles, the www double hop, source citations.
