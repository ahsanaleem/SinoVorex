# SXO Findings: sinovorex.com

**SXO Gap Score (homepage): 46 / 100** | **SXO Gap Score (/services/* average): 30 / 100**
(SXO Gap Score is separate from the SEO Health Score.)

Analysed 2026-10-19. Pages rendered with `render_page.py --mode always` and parsed with `parse_html.py`: `/`, plus all six `/services/*` pages (product-sourcing, factory-vetting, quality-inspection, order-follow-up, shipping-coordination, samples-consolidation). All returned HTTP 200, `is_spa: false` (Next.js SSR, served by Vercel hkg1).

---

## 1. Primary finding: page type and depth mismatch

| Target query | SERP dominant type (consensus) | Best-matching Sino Vorex URL | Mismatch |
|---|---|---|---|
| china sourcing agent | Hybrid: long guide on an agency site with a CTA (about 6/9 results, ~65%). Examples: tonysourcing "Ultimate Guide" (~2,500 words), cosmosourcing guide (~3,500-4,000 words), smartscout, china2west | `/` (brand homepage) | **HIGH** |
| sourcing agent china for small business | Blog/Hybrid guides (~7/9, ~75%): epicsourcing posts, jingsourcing, globalsources knowledge, plus a UK business forum thread | none (no page exists) | **CRITICAL** (no page to rank) |
| quality inspection china | Hybrid guide (~6/9) plus inspection-firm service pages (hqts) and a "best 8 inspection companies" listicle | `/services/quality-inspection` (191 words) | **HIGH** (type is close, depth is far off) |
| factory audit china | Split between Service and Hybrid (~50/50): proqc service page (~2,500 words, ISO standards, sample reports), jingsourcing (published $/auditor-day, checklist, comparison table), hqts guide, epicsourcing | `/services/factory-vetting` (189 words; never says "audit" in H1 or title) | **HIGH** |
| china shipping coordination | Weak exact-match demand. SERP is freight-forwarder service pages (fulfillbot), "forwarder vs shipping agent" explainers, Upwork | `/services/shipping-coordination` (185 words) | **MEDIUM** (wrong vocabulary: the market searches "freight forwarder China" / "shipping agent China") |
| china sourcing agent for amazon | Blog guides (smartscout, supplyia) plus Fiverr gigs (product-type listings) | none | **HIGH** |

**What this means:** Google rewards *educational hybrids*, meaning 1,500-4,000-word pages from sourcing firms that answer "what is it / what does it cost / red flags / process" and then sell. Sino Vorex has a polished brand homepage (H1 "The Force Behind Global Trade") and six ~185-word templated service stubs. None of them is the page type that ranks. On the service pages, about 60% of the text is the shared "Where this fits in the process" block, so the unique copy per page is roughly 70-80 words.

---

## 2. What works (keep)

- **Clear commercial path.** "Get a Quote" is the primary hero CTA, with "How it works" as the secondary. WhatsApp, email and phone are in the footer and chat buttons. The quote modal captures product, Incoterm and contact details.
- **6-step process** (Inquiry > Sourcing > Samples > Production > Inspection > Shipping), with a "what you do / what we do" split at each step. This matches the "sourcing agent working process" H2 that top guides use.
- **Honest risk positioning.** "Most problems with China orders are found too late", plus advice to pay the balance only after inspection. This matches the scam and red-flag intent in the SERP.
- **Verifiable entity data.** The Organization schema has legalName (苏州智贸通贸易咨询服务有限公司), a Suzhou street address, telephone and availableLanguage. About.tsx shows the Unified Social Credit Code. This directly answers the SERP advice to search the registered name on China's enterprise credit system, and it is the site's strongest trust asset.
- **FAQ already covers PAA-style questions** (MOQ, samples, payments, lead time, who pays shipping, faulty goods, countries).
- **Hotel & Café category** with concrete subitems (tableware, linens, amenities, café equipment). This is a niche few competitors call out.
- Service pages have a unique title, meta description, canonical, a visible breadcrumb and an "Other services" cross-link grid.

---

## 3. Findings (severity / evidence / recommendation)

### CRITICAL

**C1. No ranking-format content for head and mid-tail queries**
- Evidence: the sitemap contains only `/`, 6 services, `/privacy` and `/terms`. There is no guide, blog or resource section. Top results for every core query are long guides (2,500-4,000 words) with sections on cost, red flags and process.
- Recommendation: build a `/guides/` hub. Start with: "China Sourcing Agent: What We Do, What It Costs, Red Flags" (pillar), "Sourcing from China for Small Businesses (low MOQ)", "Factory Audit in China: Checklist and Cost", "Pre-Shipment Inspection in China: AQL Explained", "Freight Forwarder vs Sourcing Agent: Who Ships Your Goods". Each guide should end in a service CTA (Hybrid type). Then run `/seo content` for E-E-A-T.

**C2. Service pages are thin, templated stubs (183-194 words)**
- Evidence: word counts are product-sourcing 194, factory-vetting 189, quality-inspection 191, order-follow-up 183, shipping-coordination 185, samples-consolidation 183. Each page's unique content is 1 description, 4 bullets and 1 "What you receive" sentence. Ranking service pages such as proqc (~2,500 words) and jingsourcing (~1,300 words, with pricing, a checklist, a comparison table and photos) are 7-13x deeper.
- Recommendation: expand each page to 900-1,500 words in Service-page structure: overview > who it is for > checklist of what we check > sample report (image or PDF) > pricing basis > timeline > example case > FAQ (4-6 questions) > CTA. Add a `includes`-style data model for checklists and FAQs per service in `components/sinovorex/data.ts`.

### HIGH

**H1. Homepage H1 is a brand slogan with no keyword**
- Evidence: H1 = "The Force Behind Global Trade". Keywords appear only in the eyebrow pill ("China / Sourcing & Export Partner") and the title tag. The parser also concatenates SplitWords spans ("TheForceBehindGlobalTrade"), so the text-only reading has no spaces.
- Recommendation: make the H1 "China Sourcing Agent for Global Buyers" (or similar), keep the slogan as a visual tagline (non-heading), and add a `aria-label`/plain text fallback on SplitWords so the accessible name keeps its spaces.

**H2. No social proof or case studies (trust gap)**
- Evidence: the codebase has no testimonials, reviews, client logos, case studies, years in business, order counts or named team members (grep for testimon/review/case/client/years returned nothing customer-facing). Ranking competitors show 40+ years and ISO 9001 (proqc), founder bylines (cosmosourcing, tonysourcing) and Trustpilot pages, and the SERP for scam/verify intent tells buyers to ask for 3 client references.
- Recommendation: add 2-3 anonymised case studies (category, order size, problem caught at inspection, outcome), named team members with a photo and languages, and a Trustpilot or Google review link once reviews exist. Keep the licence code and add a link to verify it on gsxt.gov.cn.

**H3. Pricing is opaque compared with competitors who publish numbers**
- Evidence: the site says "We charge a commission on the order value. The rate depends on..." but gives no figure. SERP results publish 5-10% commission (tonysourcing, epicsourcing), $200/auditor-day for audits (jingsourcing) and $199-$320 per inspection man-day (v-trust).
- Recommendation: publish ranges, for example "commission typically X-Y% of order value; inspection from $___/man-day; factory audit from $___". Add a worked example (a "$10,000 order" breakdown).

**H4. Quality inspection and factory vetting pages omit SERP vocabulary and evidence**
- Evidence: neither page mentions AQL, ISO 2859-1, PSI/DUPRO/IPI, social compliance or BSCI. "Factory audit" (the searched term) is absent; the site uses "Factory Vetting". No sample report is offered.
- Recommendation: retitle to "Factory Audit & Vetting in China | Sino Vorex" and "Quality Inspection in China (Pre-Shipment, AQL) | Sino Vorex". Add an AQL table, inspection types, a downloadable redacted sample report, and real photos from inspections.

**H5. No persona landing paths for Amazon / e-commerce sellers or SMBs**
- Evidence: SERPs for "for amazon" and "for small business" are a dedicated content type (smartscout, supplyia, epicsourcing). The site never mentions Amazon, FBA, FNSKU labelling, Shopify or small first orders, apart from the MOQ FAQ line.
- Recommendation: create `/sourcing-for/amazon-sellers`, `/sourcing-for/small-business` and `/sourcing-for/hotels-cafes` (Hybrid pages), linked from the homepage products section.

### MEDIUM

**M1. Schema does not reflect the services or the FAQ**
- Evidence: every page carries only Organization. There is no Service/ProfessionalService on /services/*, no FAQPage for the existing 7 Q&As, no BreadcrumbList despite the visible breadcrumb, and no WebSite. Service pages set `og:type=article`.
- Recommendation: add Service schema (provider = Organization @id, areaServed, serviceType), BreadcrumbList, and FAQPage (useful for AI Overview extraction even though the FAQ rich result is restricted). Set og:type to website. Run `/seo schema`.

**M2. "Shipping Coordination" does not match how the market searches**
- Evidence: the SERP for this phrase returns freight-forwarder pages and "freight forwarder vs shipping agent" explainers, so the market's terms are "freight forwarder", "DDP" and "consolidation".
- Recommendation: rename the H1/title to "Freight Forwarding & Shipping from China (FOB, CIF, DDP)", and add a section on DDP and Amazon FBA delivery plus a port/transit table.

**M3. Media is illustrative only**
- Evidence: the 4 category images carry the caption "Images are illustrative of each category". Service pages have 2 images each (logo marks). There are no factory, inspection or warehouse photos and no video.
- Recommendation: use real on-site photos and video (an inspection in progress, a carton drop test, a warehouse consolidation) with descriptive alt text. Competitors use 6+ real audit photos.

**M4. Freshness signals are missing or artificial**
- Evidence: there are no visible dates. htmldate fell back to 2026-01-01. `app/sitemap.ts` sets `lastModified: new Date()` on every build, so every URL claims to be fresh on every deploy.
- Recommendation: use real content dates per page, and show "Updated <month year>" on the guides and pricing.

**M5. Hotel procurement path is shallow**
- Evidence: the Hotel & Café card lists items but has no compliance mentions (food-contact LFGB/FDA for tableware, fire-retardant textiles), no multi-SKU or BOQ upload in the quote form, and no hospitality example.
- Recommendation: build a `/sourcing-for/hotels-cafes` page with a compliance checklist, typical MOQs per item type, a spreadsheet/BOQ upload in the quote modal, and a mixed-supplier consolidation example (this ties to the samples-consolidation service).

### LOW

**L1. Mobile first paint may look empty (needs verification)**
- Evidence: the existing `screenshots/home-mobile.png` shows only the background grid and loader shape, with no hero text. This is probably screenshot timing during the loader/SplitWords animation. Text is present in the SSR HTML.
- Recommendation: confirm in the CWV/visual audit. Keep the hero text visible without waiting for JS animation (start at opacity 1 when reduced motion is set or JS is late).

**L2. Duplicate "process" block dominates service page text**
- Evidence: the 6-step PROCESS list repeats verbatim on all six service pages.
- Recommendation: replace it with a highlighted mini-process ("You are here: step 05") plus unique content.

---

## 4. User stories (signal-cited)

1. **Awareness.** As a *first-time importer*, I want to understand what a sourcing agent does and whether I need one, because I am afraid of being scammed, but I am blocked by an **information gap** (the site assumes I already know).
   *Source: guide H2s "What is a China sourcing agent / Do you need one / Risks" across tonysourcing, cosmosourcing, smartscout; the AI-style answer for "china sourcing agent" leads with a definition.*
2. **Consideration.** As a *small-business buyer*, I want to know what an agent costs on a $5-10k order, because my margin is thin, but I am blocked by **price sensitivity** (no rate is published).
   *Source: query "how much does a China sourcing agent charge" returns dedicated cost guides (epicsourcing 2026, supplyia) quoting 5-15%; "for small business" SERP.*
3. **Consideration.** As a *risk-averse buyer*, I want proof that an agent is legitimate, because "anyone can call themselves a sourcing agent", but I am blocked by a **trust gap** (no reviews, references or case studies).
   *Source: "scam / verify" SERP (epicsourcing red flags, Trustpilot pages, newbuyingagent); advice to check the business licence and request 3 references.*
4. **Decision.** As a *QC-focused buyer*, I want to see a sample inspection report and AQL level before booking, because I need to show my boss what we will get, but I am blocked by **technical confusion / missing evidence**.
   *Source: "quality inspection china" and "pre-shipment inspection cost" SERPs (AQL, ISO 2859-1, $/man-day, sample-report CTAs on proqc).*
5. **Decision.** As an *Amazon FBA seller*, I want an agent who handles FBA labelling and ships DDP to Amazon warehouses, but I am blocked because the site never mentions Amazon.
   *Source: "china sourcing agent for amazon" SERP (smartscout, supplyia, Fiverr FBA gigs); fulfillbot DDP/forwarder pages.*

---

## 5. Gap analysis (SXO Gap Score)

| Dimension | Homepage | Services avg | Evidence |
|---|---|---|---|
| Page Type (0-15) | 8 | 9 | Homepage is a Landing/Service hybrid; the head-term SERP wants a Hybrid guide. Service pages are the right type but far too short |
| Content Depth (0-15) | 8 | 3 | 1,410 words on the homepage, with no cost, red-flag or "what is" content; service pages 183-194 words |
| UX Signals (0-15) | 11 | 9 | Clear CTA above the fold, process, FAQ, WhatsApp; slogan H1; service pages lack an FAQ and a mid-page CTA |
| Schema (0-15) | 6 | 3 | Organization only; no Service, FAQPage, BreadcrumbList or WebSite |
| Media (0-15) | 6 | 2 | 4 illustrative category photos plus a globe; service pages show only icons/logos |
| Authority (0-15) | 4 | 3 | Licence code and address (good); zero testimonials, cases, team or reviews |
| Freshness (0-10) | 3 | 1 | No visible dates; sitemap lastModified = build time |
| **Total** | **46** | **30** | |

---

## 6. Persona scoring (homepage + relevant service page; weakest first)

| Persona (SERP evidence) | Relevance | Clarity | Trust | Action | Total |
|---|---|---|---|---|---|
| Amazon / e-commerce seller ("for amazon" SERP, Fiverr FBA gigs) | 8 | 12 | 8 | 16 | **44** |
| QC / audit buyer (inspection and audit SERPs, AQL, $/man-day) | 12 | 14 | 6 | 14 | **46** |
| Cost comparer (fee-guide SERP) | 10 | 12 | 10 | 14 | **46** |
| Small-business owner ("for small business" SERP, MOQ FAQ) | 12 | 13 | 9 | 18 | **52** |
| Hotel / café procurement manager (hospitality B2B sourcing results) | 15 | 14 | 9 | 15 | **53** |
| First-time importer (definition/process guides) | 18 | 19 | 10 | 20 | **67** |

Improvements, weakest first:
- **Amazon seller (44):** add an Amazon/FBA page covering FNSKU labelling, poly-bag and suffocation warnings, carton labels, DDP to FBA, and small-MOQ private label. Add "Amazon FBA" as a destination option in the quote modal.
- **QC/audit buyer (46):** add a downloadable sample report, the AQL table, inspection types (IPI/DUPRO/PSI), a $/man-day price, and a "Factory audit" keyword in the title and H1.
- **Cost comparer (46):** publish the commission range and a worked $10k example; add a "Sino Vorex vs inspection company vs DIY" comparison table (jingsourcing uses this format).
- **SMB owner (52):** add a "Small first orders welcome" section with real low-MOQ examples per category, and a trial-order or sample-only package.
- **Hotel procurement (53):** add a compliance checklist (food-contact, FR textiles), BOQ upload, a hospitality case study, and multi-supplier consolidation.
- **First-time importer (67):** add a "New to importing from China?" explainer linking to the guides, plus an Incoterms explainer (the existing "Who pays for what" block is a good start).

---

## 7. Limitations

- WebSearch is not a live Google SERP. People Also Ask, ads, AI Overview citations, local pack and exact positions **could not be observed**. "Consensus" is based on the organic result set returned (about 9 per query) and on reading the top pages. PAA-style signals were inferred from follow-up queries (cost, scam, Amazon, inspection cost). Validate with a rank tracker or DataForSEO before prioritising.
- Results may be geo-personalised. US-only search was used, while the business targets buyers worldwide.
- No Search Console, analytics, conversion or backlink data was used, so authority is judged from on-page signals only.
- The quote modal was assessed from source, not by submitting it.
- The mobile screenshot issue (L1) was not re-captured.

Cross-skill: `/seo content` (E-E-A-T, guides), `/seo schema` (Service, FAQPage, BreadcrumbList), `/seo page` (thin service pages). Local intent is absent from these SERPs, so `/seo local` is not required. A PDF report is available via `/seo google report`.

---

## 8. Structured findings (audit-data.json, category "Search Experience")

```json
{
  "category": "Search Experience",
  "sxo_gap_score": {"homepage": 46, "services_avg": 30},
  "findings": [
    {"id": "SXO-C1", "severity": "critical", "title": "No guide/hybrid content for core queries; SERPs dominated by 2.5-4k word agency guides", "url": "https://sinovorex.com/sitemap.xml"},
    {"id": "SXO-C2", "severity": "critical", "title": "Service pages are 183-194 word templated stubs", "url": "https://sinovorex.com/services/*"},
    {"id": "SXO-H1", "severity": "high", "title": "Homepage H1 is slogan without keyword", "url": "https://sinovorex.com/"},
    {"id": "SXO-H2", "severity": "high", "title": "No testimonials, case studies, team or reviews", "url": "https://sinovorex.com/"},
    {"id": "SXO-H3", "severity": "high", "title": "No published commission/inspection pricing vs competitors publishing 5-10% and $/man-day", "url": "https://sinovorex.com/#faq"},
    {"id": "SXO-H4", "severity": "high", "title": "Inspection/vetting pages lack AQL, 'factory audit' term, sample report", "url": "https://sinovorex.com/services/quality-inspection"},
    {"id": "SXO-H5", "severity": "high", "title": "No Amazon seller / small business / hotel persona pages", "url": "https://sinovorex.com/"},
    {"id": "SXO-M1", "severity": "medium", "title": "Only Organization schema; no Service, FAQPage, BreadcrumbList; og:type article on services", "url": "https://sinovorex.com/services/*"},
    {"id": "SXO-M2", "severity": "medium", "title": "'Shipping coordination' vocabulary mismatches 'freight forwarder/DDP' SERP", "url": "https://sinovorex.com/services/shipping-coordination"},
    {"id": "SXO-M3", "severity": "medium", "title": "Only illustrative imagery; no real factory/inspection media", "url": "https://sinovorex.com/"},
    {"id": "SXO-M4", "severity": "medium", "title": "No visible dates; sitemap lastModified = build time", "url": "https://sinovorex.com/sitemap.xml"},
    {"id": "SXO-M5", "severity": "medium", "title": "Hotel procurement path lacks compliance and BOQ upload", "url": "https://sinovorex.com/#products"},
    {"id": "SXO-L1", "severity": "low", "title": "Mobile screenshot shows empty hero (verify animation/loader timing)", "url": "https://sinovorex.com/"},
    {"id": "SXO-L2", "severity": "low", "title": "Duplicate process block dominates service page text", "url": "https://sinovorex.com/services/*"}
  ]
}
```

Sources: tonysourcing.com/?p=14905, cosmosourcing.com/blog/china-sourcing-agent-guide, jingsourcing.com/b-factory-audit/, proqc.com/services/factory-supplier-audits/audit-china/, epicsourcing.co.uk/post/china-sourcing-agent-cost-uk-2026, epicsourcing.co/post/how-to-spot-a-fake-china-sourcing-agent-red-flags, smartscout.com/amazon-selling-guides/what-is-a-china-sourcing-agent-for-amazon, supplyia.com/amazon-sourcing-agent/, hqts.com/china-factory-audit, chinaimportal.com/blog/quality-control-inspections-china/, v-trust.com (PSI), fulfillbot.com/freight-forwarding-from-china/, globalsources.com/knowledge/best-china-sourcing-agent-for-your-business/.
