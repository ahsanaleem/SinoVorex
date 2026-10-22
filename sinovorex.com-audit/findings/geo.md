# GEO / AI Search Readiness: sinovorex.com (re-audit)

Audit date: 2026-10-22. Previous audit: 2026-10-19 (GEO score 46).
Pages checked: all 21 URLs in crawl.json (all HTTP 200, SSR on Vercel hkg1). Raw HTML was fetched with crawler user agents for /, /services/quality-inspection, /guides/china-sourcing-agent-cost, /about and /sourcing-for/amazon-sellers.
Method: curl probes of robots.txt, llms.txt and RSL; a UA matrix covering GPTBot, OAI-SearchBot, ClaudeBot, Claude-SearchBot, PerplexityBot, Google-Extended, bingbot, Googlebot and CCBot; passage review of the crawl.json text; a JSON-LD parse; source review (lib/seo.tsx, components/sinovorex/data.ts, Trade.tsx, Blocks.tsx, app/llms.txt/route.ts, app/layout.tsx); off-site checks on Bing, Wikipedia, Wikidata, YouTube, LinkedIn, Reddit and Wayback.

## GEO Readiness Score: 64 / 100 (was 46)

| Dimension | Weight | Score | Weighted |
|---|---|---|---|
| Citability | 25% | 72 | 18.0 |
| Structural Readability | 20% | 82 | 16.4 |
| Multi-Modal Content | 15% | 40 | 6.0 |
| Authority & Brand Signals | 20% | 28 | 5.6 |
| Technical Accessibility | 20% | 92 | 18.4 |
| **Total** | | | **64** |

Platform estimates: Google AI Overviews 62, Perplexity 58, ChatGPT Search 45, Bing Copilot 40. The site is in neither the ChatGPT nor the Copilot index. `site:sinovorex.com` on Bing still returns no sinovorex.com pages, only unrelated fallback results, and both of those engines lean on Bing.

## What works

- **Crawler access is open, and no CDN or WAF blocks bots.** robots.txt is `User-Agent: * / Allow: / / Disallow: /api/` with the sitemap listed. Every AI UA tested got HTTP 200 with a byte-identical body: 203,016 B on / and 134,826 B on /services/quality-inspection. No Vercel challenge was served.
- **SSR is complete.** The full article text, tables and FAQ answers are in the raw HTML. The loader text, the placeholder `--:--` time and the NBSP headings are gone.
- **llms.txt is good** (app/llms.txt/route.ts). It returns 200 text/plain, is force-static, and has an H1, a blockquote summary, contact details and fee model, and linked lists of the 6 services, 5 guides, 3 audiences and the company pages, each with a one-line description. RSL (`/license.xml`, `/.well-known/rsl.xml`) returns 404. That is Info only.
- **The guides are highly citable.** Each opens with a 40-60 word direct answer, followed by a "Key takeaways" box. Example: "For an order of 3,000 units, an inspector checks 125, and at AQL 2.5 the order passes with up to 7 major defects." The guides also have real HTML `<table>`s (an AQL table, pricing models, a US$10,000 worked example), "Updated 20 October 2026" dates, and Q&A blocks.
- **The service pages grew from about 150 words to 1,100-1,660 words** of unique content, with topical H2s, an "At a glance" box, timing and charging sections, and FAQs.
- **The schema is connected.** There is an Organization `@id` (`/#organization`), WebSite, Service, Article (datePublished/dateModified, author → org @id), AboutPage, BreadcrumbList and ItemList.
- **The entity is clear.** The H1 "China Sourcing Agent for Global Buyers" names the category. /about states what the company is and is not (not a manufacturer, forwarder or lab), gives the legal name, the bilingual address, and how to verify the company on gsxt.gov.cn.
- **IndexNow is ready.** The key file `/c45690fe483bb9f595b7bd03894d610e.txt` returns 200, and scripts/indexnow.mjs exists.

## AI crawler access

| Crawler | Governs | robots.txt | Live fetch |
|---|---|---|---|
| OAI-SearchBot | ChatGPT Search | Allowed (wildcard) | 200 |
| Claude-SearchBot | Claude search | Allowed | 200 |
| PerplexityBot | Perplexity | Allowed | 200 |
| Googlebot | Search and AI Overviews | Allowed | 200 |
| bingbot | Bing and Copilot | Allowed | 200 |
| GPTBot | OpenAI training only | Allowed (optional) | 200 |
| ClaudeBot | Anthropic training only | Allowed (optional) | 200 |
| Google-Extended | Gemini training/grounding (not Search/AIO) | Allowed (optional) | 200 |
| CCBot | Common Crawl training | Allowed (optional) | 200 |

## Status of the 2026-10-19 findings

| ID | Finding | Status |
|---|---|---|
| GEO-01 | FAQ answers missing from HTML | **FIXED.** All 7 answers are in SSR. Trade.tsx:275 now collapses with CSS grid-rows, the questions are `<h3>`, and FaqList uses `<details>` |
| GEO-02 | No off-site footprint / not in Bing | **REMAINS.** See GEO-02 below |
| GEO-03 | Thin service pages | **FIXED.** 1,106-1,658 words each |
| GEO-04 | No people, proof or dates | **PARTIAL.** Dates and a market fee range were added. There is still no team, founding year, licence number or real case study |
| GEO-05 | Slogan H1, NBSP | **FIXED** |
| GEO-06 | Loader and placeholder text | **FIXED** |
| GEO-07 | Schema gaps | **MOSTLY FIXED.** sameAs, foundingDate and taxID are wired in lib/seo.tsx:51-53 but empty in data.ts |
| GEO-08 | No multi-modal evidence | **PARTIAL.** Tables were added. The images are still logo only, with no photos, video or sample report |
| GEO-09 | llms.txt missing | **FIXED** |

## Findings

### GEO-02: Entity still unknown off-site, and the site is not in Bing (High, REMAINS)
- **Evidence:** Wikipedia search for "Sino Vorex": 0 hits. Wikidata: 0 entities. `youtube.com/@sinovorex`: 404. `linkedin.com/company/sinovorex`: 404. Bing `site:sinovorex.com` (both scraped and through WebFetch) returns only unrelated fallback pages, and Bing "Sino Vorex" also returns only unrelated pages. Reddit and DuckDuckGo blocked the scripted search, and Wayback returned 429, so those three are unconfirmed. `COMPANY.sameAs` is `[]` (components/sinovorex/data.ts:28). No `msvalidate.01` or google-site-verification meta is in the production HTML, because the env vars `NEXT_PUBLIC_BING_SITE_VERIFICATION` and `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` are unset (app/layout.tsx:11-18). DNS verification may be in use, which is unconfirmed.
- **Fix:** (1) Verify the site in Bing Webmaster Tools (set the env var or use DNS), submit sitemap.xml, and run `node scripts/indexnow.mjs` for all 21 URLs. (2) Create a LinkedIn company page, a Google Business Profile, a YouTube channel, and Made-in-China / Global Sources / Kompass listings. (3) Add the profile URLs to data.ts:28, which already feeds schema `sameAs` and the /about page. (4) Take part genuinely in Reddit sourcing threads. Effort: 1-2 days, then ongoing.

### GEO-04: No named people, registration number, founding year or real case data (Medium, PARTIAL)
- **Evidence:** `TEAM = []` (data.ts:32), `licenceNo: ""` (data.ts:22) and `foundedYear: ""` (data.ts:26). The Article author is the Organization only. The "Example" sections on the service pages are labelled "Illustrative example". "How Sino Vorex charges" gives no rate of its own ("confirmed in writing in your quote").
- **Fix:** Fill in licenceNo and foundedYear, which already flow into the footer, /about and schema. Add at least one named person with a role and photo to TEAM, and use them as Article `author`/`reviewedBy` (components/sinovorex/ArticleView.tsx:23). Publish your own typical commission band and 1-2 anonymised real orders with numbers. Effort: half a day plus gathering the information.

### GEO-10 (NEW): Market statistics carry no source attribution (Medium)
- **Evidence:** In the guides, "Commonly advertised at about 5 to 10%", "US$200 to 350 per person per day" and the MOQ ranges have no citation. Across all 5 guides there is only one outbound source link (gsxt.gov.cn, components/sinovorex/content/guides.ts:160). ISO 2859-1 is named but not linked.
- **Fix:** Add 1-3 attributed sources per guide, for example ISO 2859-1 / ANSI/ASQ Z1.4 and published inspection-company rate cards. Phrase each figure with its attribution in the same sentence ("…according to X's 2026 price list"). Effort: 2-3 hours.

### GEO-08: Multi-modal evidence is still thin (Medium, PARTIAL)
- **Evidence:** Every subpage has 2 images, both the logo. There is no factory or inspection photography, no sample report, and no video.
- **Fix:** Add a redacted sample inspection report (an image or PDF with an HTML summary) to /services/quality-inspection and the AQL guide, real site photos with descriptive alt text, and 1-2 short YouTube walkthroughs. The videos also feed GEO-02. Effort: 1-3 days.

### GEO-11 (NEW): Homepage FAQ answers are vague (Low)
- **Evidence:** "Production commonly takes a few weeks", "MOQs are set by each factory", "to most countries". Each is about 25-35 words with no specifics, while the guides contain the specifics.
- **Fix:** Put a concrete figure in each answer (for example "typically 25-45 days of production plus 15-45 days by sea") and link the matching guide. The source is the FAQ data used by components/sinovorex/Trade.tsx:258-280. Effort: 30 minutes.

### GEO-12 (NEW): Every data table is rendered twice in the HTML (Low)
- **Evidence:** components/sinovorex/Blocks.tsx:72-104 outputs a desktop `<table>` plus a mobile `<ul>` card list holding the same cells. The extracted text repeats every row (visible in the AQL and cost guides), which adds noise to passage extraction.
- **Fix:** Render one `<table>` and stack it on phones with CSS (`display:block` rows plus `data-label` pseudo-elements). Effort: 1 hour.

### GEO-09b: llms.txt could carry key facts (Info)
- Optionally add a "Key facts" block to app/llms.txt/route.ts: the AQL defaults, inspection timing and transit ranges, plus the registration number once it is filled in.

## Top 5 changes

| # | Change | Impact | Effort |
|---|---|---|---|
| 1 | Bing Webmaster verification, sitemap and IndexNow submission | High (ChatGPT/Copilot) | 1 h |
| 2 | Off-site profiles plus `sameAs` (data.ts:28) | High | 1-2 days |
| 3 | licenceNo, foundedYear, a named TEAM member as author | Medium | 0.5 day |
| 4 | Source attribution for market figures in the guides | Medium | 2-3 h |
| 5 | Real photos, a sample report and a short video | Medium | 1-3 days |

## Structured findings (audit-data.json, "AI Search Readiness")

```json
{
  "category": "AI Search Readiness",
  "score": 64,
  "previous_score": 46,
  "dimensions": {"citability": 72, "structural_readability": 82, "multimodal": 40, "authority_brand": 28, "technical_accessibility": 92},
  "platform_scores": {"google_aio": 62, "chatgpt_search": 45, "perplexity": 58, "bing_copilot": 40},
  "crawler_access": {"all": "allowed via wildcard; all AI UAs receive HTTP 200, identical body, no WAF challenge"},
  "llms_txt": "present, well-formed (app/llms.txt/route.ts)",
  "rsl": "missing (info)",
  "bing_indexed": false,
  "findings": [
    {"id": "GEO-02", "severity": "high", "status": "remains", "title": "No off-site entity footprint; not in Bing index; sameAs empty; verification tokens unset"},
    {"id": "GEO-04", "severity": "medium", "status": "partial", "title": "No named team, licence no., founding year or real case data"},
    {"id": "GEO-10", "severity": "medium", "status": "new", "title": "Market statistics in guides lack source attribution"},
    {"id": "GEO-08", "severity": "medium", "status": "partial", "title": "Only logo images; no photos, video or sample report"},
    {"id": "GEO-11", "severity": "low", "status": "new", "title": "Homepage FAQ answers vague"},
    {"id": "GEO-12", "severity": "low", "status": "new", "title": "Tables duplicated in DOM (desktop table + mobile cards)"},
    {"id": "GEO-09b", "severity": "info", "status": "new", "title": "llms.txt could include key facts"}
  ],
  "fixed": ["GEO-01", "GEO-03", "GEO-05", "GEO-06", "GEO-07 (mostly)", "GEO-09"]
}
```

Limitations: the Bing results were scraped and are directional; confirm them in Bing Webmaster Tools. Reddit, DuckDuckGo and Wayback blocked the automated checks. No DataForSEO access was available, so no live ChatGPT citation sampling was done.
