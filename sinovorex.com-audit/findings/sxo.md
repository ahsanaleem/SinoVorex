# SXO Findings: sinovorex.com (re-audit 2026-10-22)

**SXO Gap Score (category): 68 / 100** (previous audit 2026-10-19: homepage 46, services avg 30)
SXO Gap Score is separate from the SEO Health Score.

Method: WebSearch for the 6 target queries (about 9 organic results each), page types classified with the claude-seo page-type taxonomy, compared against the 21-page crawl (`scratchpad/crawl.json`) and the source code. `/quote` was re-rendered with `render_page.py --mode auto` (HTTP 200, `is_spa: false`, SSR).

---

## 1. Page-type match per target query (primary finding)

| Query | What ranks (SERP consensus) | Sino Vorex page | Match |
|---|---|---|---|
| china sourcing agent | Informational guides on agency or SaaS sites, about 7/9 (~75%): smartscout, tonysourcing "Ultimate Guide", china2west, prowess, speculativechic. Plus 1 Fiverr gig | `/` (service landing) and `/services/product-sourcing`. Both have "China Sourcing Agent" in the title | **MEDIUM** (was HIGH). No "what is / how to choose" pillar guide, and two pages compete for the term |
| pre-shipment inspection china | Inspection-firm guides plus service pages, roughly 60/40: hqts x2, china2west x2, ship4wd guides; qima and v-trust service pages | `/services/quality-inspection` (1,341 words, AQL, PSI/DUPRO table) and `/guides/pre-shipment-inspection-aql` | **ALIGNED** |
| factory audit china | Guides plus service pages: epicsourcing x2, china2west x2, hqts, qcadvisor, jingsourcing (with a cost figure of ~$209 per auditor-day); proqc and mwtsourcing service pages | `/services/factory-vetting` (H1 now "Factory Audit & Supplier Verification") and `/guides/factory-audit-checklist` | **ALIGNED** |
| sourcing agent for amazon sellers | SaaS blog guides, about 9/9: smartscout x3, helium10 x4 locales, supplyia, sellerassistant | `/sourcing-for/amazon-sellers` (910 words, "2 min read" hybrid landing page) | **MEDIUM**. The type is close, but the page is short; the SERP rewards explainer depth |
| china sourcing agent cost | Cost guides, about 8/9: epicsourcing x3, cosmosourcing, breakingac, statrys, globalsources Q&A, plus 1 forum thread | `/guides/china-sourcing-agent-cost` (1,537 words, worked US$10k example) | **ALIGNED**. Competitor guides are deeper (~2.5-4k words), and the page does not state Sino Vorex's own rate |
| shipping from china | Destination-specific informational guides, about 8/9 and mostly "to the US": searates, Drip Capital x2, Wise, ship24, container-news, DHL | `/services/shipping-coordination` (service page titled "Shipping from China: Sea, Air & Rail Freight") | **MEDIUM**. A service page is competing on an informational, destination-led SERP |

## 2. Status of the 2026-10-19 findings

- **FIXED:**
  - C1: a guides hub and 5 guides now exist.
  - C2: service pages went from 183-194 words to 1,106-1,658 words, with At a glance, tables, an example and FAQs.
  - H1: the homepage H1 is now "China Sourcing Agent for Global Buyers" (`components/sinovorex/Hero.tsx:81-84`).
  - H4 (vocabulary part): AQL, ISO 2859-1, PSI/DUPRO/PPI and "Factory Audit" are now used.
  - H5: three `/sourcing-for/*` pages exist.
  - M1 (mostly): Service, BreadcrumbList, Article, WebSite and AboutPage schema are now present.
  - M2: the shipping page is renamed.
  - M4: visible "Updated" dates and per-page dates (`components/sinovorex/data.ts:34`).
  - M5: hotel compliance table and Excel/CSV item-list upload.
  - L2: the process block is now a single "Step X of 6" line.
  - L1 (probably fixed): the hero is now plain text with a CSS entrance. It was not re-captured.
- **PARTIAL:**
  - H3: market fee ranges are published in the cost guide, but Sino Vorex's own rate is still blank (`components/sinovorex/data.ts:125` `commissionRange: ""`, `:127` `inspectionRate: ""`).
  - H4: there is still no downloadable sample report.
- **REMAIN:**
  - H2: no testimonials, real case studies (all examples are labelled "Illustrative example"), named team or reviews.
  - M3: no real factory or inspection photos. Subpages have 2 images each, and those are logo marks.
  - No FAQPage schema on any page.

## 3. Findings

**H-1 (High). Trust layer is still missing.** Evidence: `components/sinovorex/content/services.ts:80,148,213` labels every case as "Illustrative example". Guides use the Organization as author (`components/sinovorex/ArticleView.tsx:23`). There are no reviews, client logos or named people. Ranking guides (tonysourcing, cosmosourcing) carry founder bylines. Fix:
- Add 2-3 real anonymised cases.
- Add a named author with a role and photo to guides, and change `author` to a Person.
- Add a redacted sample inspection report PDF and a sample audit report PDF on `/services/quality-inspection` and `/services/factory-vetting`.

**M-1 (Medium). Head term: cannibalisation, and no pillar guide.** Evidence: `services.ts:22` seoTitle "China Sourcing Agent: Find & Compare Factories" duplicates the homepage target, and the SERP is about 75% informational guides. Fix:
- Retitle that service page to "Product Sourcing in China: Find & Compare Factories".
- Publish a `/guides/china-sourcing-agent` pillar (what it is, services, how to choose, red flags, process; 2,500+ words) that links to `/` and `/quote`.

**M-2 (Medium). "Shipping from china" type mismatch.** Evidence: the SERP is "to the US" cost/time guides, while `services.ts:300-301` is a service page. Fix:
- Add `/guides/shipping-from-china-to-usa` (and UK/EU versions), covering cost per CBM, transit, duties and DDP.
- Retarget the service page to "freight forwarding from China".

**M-3 (Medium). Own pricing undisclosed.** The SERP and the site's own cost guide set an expectation of 5-10% and US$200-350 per day. Fix: fill in `data.ts:125-127`. The UI already renders these values (`components/sinovorex/Trade.tsx:233-235`).

**M-4 (Medium). /quote does not fit inspection-only, audit-only or FBA buyers.** Evidence: `components/sinovorex/QuoteForm.tsx:111-124` requires product, quantity and destination. It has no service selector and no marketplace or FBA field. Fix:
- Add a "What do you need?" chip group (Sourcing / Factory audit only / Inspection only / Shipping only) and an "Amazon FBA destination" toggle.
- Prefill it from `?service=` on service-page CTAs.
- Add 2-3 trust lines beside the form (verify-us link, "fee confirmed in writing").

**M-5 (Medium). Persona and guide depth.** Evidence: `/sourcing-for/*` pages are 841-953 words and guides are 1,199-1,537 words, against 2,500-4,000 words for competitors. Fix: add an FBA prep and shipping section plus a DDP-to-FBA cost example to the Amazon page, and extend the cost guide with Sino Vorex's own example.

**L-1 (Low). Decorative marquee repeats the 6 service names 8 times in the accessible DOM.** Only copy k=1 is hidden (`components/sinovorex/Hero.tsx:139`). Fix: add `aria-hidden` to the MarqueeBands wrapper (`Hero.tsx:150`).

**L-2 (Low). No FAQPage markup for the on-page FAQs.** Add it (for AI extraction, not for rich results). See `/seo schema`.

## 4. User stories (each cites a SERP signal)

1. **Awareness, first-time importer.** "What is a sourcing agent, and do I need one?" Signal: smartscout and tonysourcing definition guides top "china sourcing agent". Gap: there is no pillar guide.
2. **Consideration, cost-sensitive SMB.** "What will I pay on a $10k order?" Signal: 8/9 cost guides; epicsourcing gives 3-10% / 5-15%. Gap: the site gives market ranges but not its own rate.
3. **Consideration, risk-averse buyer.** "How do I know this agent is real?" Signal: the "check reviews, ask for references" advice in the SERP summary. Partly met by the about page's "How to verify us" (gsxt.gov.cn); references and reviews are missing.
4. **Decision, FBA seller.** "Will you check FNSKU and carton limits and ship to FBA?" Signal: the helium10, smartscout and supplyia SERP. Met by the FBA checklist on the Amazon page, but the quote form has no FBA option.
5. **Decision, QC buyer.** "Show me the report I will get." Signal: the hqts, qima and v-trust PSI pages. Gap: there is no sample report.

## 5. SXO Gap Score

| Dimension | Home | /services/quality-inspection | /guides/china-sourcing-agent-cost |
|---|---|---|---|
| Page type (15) | 10 | 14 | 15 |
| Content depth (15) | 11 | 13 | 12 |
| UX signals (15) | 13 | 13 | 13 |
| Schema (15) | 10 | 12 | 11 |
| Media (15) | 6 | 4 | 4 |
| Authority (15) | 7 | 7 | 6 |
| Freshness (10) | 5 | 9 | 9 |
| **Total** | **62** | **72** | **70** |

Category score: 68.

## 6. Persona scoring (Relevance / Clarity / Trust / Action, 25 pts each)

| Persona | Home | QI service | Cost guide | /quote |
|---|---|---|---|---|
| Amazon FBA seller | 15/18/12/15 = **60** | 19/20/13/18 = **70** | 14/20/12/16 = **62** | 12/18/12/13 = **55** |
| Hotel procurement manager | 18/18/13/17 = **66** | 14/18/13/17 = **62** | 13/19/12/15 = **59** | 20/19/13/22 = **74** |
| First-time importer | 20/20/13/20 = **73** | 18/20/14/20 = **72** | 22/22/14/20 = **78** | 18/20/13/19 = **70** |

Weakest first:
- **FBA on /quote (55).** Add a service selector and an FBA toggle (M-4).
- **Hotel on the cost guide (59).** Add a "multi-supplier fit-out" fee example.
- **FBA on the homepage (60).** Promote the Amazon link from the products strip into the hero or "who we help".
- **Hotel on the QI service page (62).** Add a "per-supplier inspection for mixed orders" note.
- **Trust is 12-14 everywhere.** This is fixed by H-1.

## 7. Limitations

- WebSearch is not a live Google SERP. PAA, AI Overview, ads and exact positions could not be seen, and results are US-only.
- No GSC, ranking or conversion data was available.
- The quote form was assessed from source and was not submitted.
- The mobile hero was not re-screenshotted.

Cross-skill: `/seo content` (E-E-A-T, bylines), `/seo schema` (FAQPage, Person author). Local intent is absent. A PDF report is available via `/seo google report`.

## 8. Structured findings (Search Experience)

```json
{"category":"Search Experience","score":68,
 "findings":[
  {"id":"SXO-H1","severity":"high","title":"No real cases, reviews, named authors or sample reports","status":"remains"},
  {"id":"SXO-M1","severity":"medium","title":"'china sourcing agent' cannibalised by /services/product-sourcing; no pillar guide","status":"new"},
  {"id":"SXO-M2","severity":"medium","title":"'shipping from china' informational SERP vs service page","status":"new"},
  {"id":"SXO-M3","severity":"medium","title":"Own commission/inspection rate blank (data.ts:125-127)","status":"partial"},
  {"id":"SXO-M4","severity":"medium","title":"/quote lacks service selector and FBA option","status":"new"},
  {"id":"SXO-M5","severity":"medium","title":"Persona pages and guides shallower than SERP competitors","status":"new"},
  {"id":"SXO-L1","severity":"low","title":"Marquee repeats service names 8x in accessible DOM","status":"new"},
  {"id":"SXO-L2","severity":"low","title":"No FAQPage markup","status":"remains"}]}
```
