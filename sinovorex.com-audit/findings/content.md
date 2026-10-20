# Content Quality, E-E-A-T and On-Page SEO: sinovorex.com

Audit date: 2026-10-19. Status: FINAL.
Pages fetched live with render_page.py (raw mode; none were SPA shells): /, 6 x /services/*, /privacy, /terms.
Source checked: components/sinovorex/data.ts, Trade.tsx, Hero.tsx, About.tsx, Closing.tsx, SubpageShell.tsx, app/layout.tsx, app/services/[slug]/page.tsx, app/sitemap.ts.

## Scores

| Area | Score |
|---|---|
| Content Quality (overall) | 42 / 100 |
| E-E-A-T composite | 35 / 100 |
| AI citation readiness | 38 / 100 |
| On-Page SEO | 61 / 100 |

E-E-A-T breakdown (this skill's internal weighting, not Google's):

| Factor | Weight | Score | Basis |
|---|---|---|---|
| Experience | 20% | 25 | No case studies, client stories, real report samples or real photos. Product images are AI-generated (data.ts:84 comment). |
| Expertise | 25% | 40 | Process, Incoterms, QC and freight content is accurate but generic. No named people or credentials. |
| Authoritativeness | 25% | 15 | No testimonials, client logos, reviews, memberships, press, or `sameAs` profiles. |
| Trustworthiness | 30% | 55 | Real legal entity name, address, phone, WhatsApp/WeChat, PIPL/GDPR privacy policy, terms, commission model explained. Licence number is empty, so it is not shown. |

Weighted: 0.2x25 + 0.25x40 + 0.25x15 + 0.3x55 = 35.

## Per-page data

| Page | Title (chars) | Meta desc chars | H1 | Visible words | Main-content words |
|---|---|---|---|---|---|
| / | Sino Vorex — China Sourcing & Export Partner (44) | 175 | The Force Behind Global Trade | 1,490 | 653 |
| /services/product-sourcing | Product Sourcing in China \| Sino Vorex (38) | 122 | Product Sourcing in China | 267 | 158 |
| /services/factory-vetting | Factory Vetting in China \| Sino Vorex (37) | 128 | Factory Vetting in China | 260 | 152 |
| /services/quality-inspection | Quality Inspection in China \| Sino Vorex (40) | 126 | Quality Inspection in China | 263 | 155 |
| /services/samples-consolidation | Samples & Consolidation in China \| Sino Vorex (45) | 115 | Samples & Consolidation in China | 257 | 148 |
| /services/shipping-coordination | Shipping Coordination in China \| Sino Vorex (43) | 126 | Shipping Coordination in China | 258 | 149 |
| /services/order-follow-up | Order Follow-up in China \| Sino Vorex (37) | 125 | Order Follow-up in China | 255 | 147 |
| /privacy | Privacy Policy \| Sino Vorex (27) | 90 | Privacy Policy | 528 | 458 |
| /terms | Terms of Service \| Sino Vorex (29) | 61 | Terms of Service | 318 | 243 |

Every page has exactly one H1, a self-referencing canonical and a clean H2/H3 hierarchy.

Readability (Flesch Reading Ease / FK grade): home 65.7 / 7.4 (good for B2B). Service pages 40-47 / 11-12. That score is inflated because the text is mostly list fragments without sentence punctuation; the prose itself is plain and short. Privacy 49.4, Terms 55.0.

Templated metadata (metadata_template.py, 9 pages): `site_risk: low`, `templated_ratio: 0.0`, `shared_cta_phrases: {}`. Only the `brand_suffix_in_description` signal fired (low) on /privacy and /terms. Both are false positives: "Sino Vorex" sits inside a written sentence and was not appended to it.

## What works

- Honest, specific, claim-free copy. No made-up stats, and fees are explained (commission, confirmed in writing; FEES in data.ts). The site also tells buyers to pay the balance only after inspection. That is real buyer-protection advice and builds trust.
- Real legal entity disclosed: 苏州智贸通贸易咨询服务有限公司, full Chinese and English address, phone, WhatsApp and WeChat, in the footer on every page and in the Organization JSON-LD (app/layout.tsx).
- Privacy policy covers PIPL, GDPR and cross-border transfer, names the data controller and is dated (16 October 2026). Terms are clear.
- Good on-page basics. Unique titles and descriptions, one H1 per page, logical headings, canonicals, sitemap and robots, descriptive alt text on product images, and an "Images are illustrative" disclaimer.
- Internal linking is complete. The homepage, footer and each service page's "Other services" block link to all 6 service pages, and service pages have a visible breadcrumb.
- The homepage covers enough ground (653 main-content words, above the 500 floor): process, services, product categories, QC, shipping modes with transit ranges, Incoterms, fees and FAQ.

## Findings

### C1. No verifiable proof that the company has done this work (Critical, E-E-A-T)
Evidence: no case studies, testimonials, client logos, named team members, founder bio, founding year, photos of staff or office, or sample inspection or audit reports anywhere on the 9 pages. `COMPANY.licenceNo` is `""` (components/sinovorex/data.ts:20), so the 统一社会信用代码 is never shown (Closing.tsx:117, SubpageShell.tsx footer) and no `taxID` goes into the schema (layout.tsx). The product photos are AI-generated (data.ts:84 comment). The /about URL returns 404. This business takes buyers' deposits through an intermediary in another country, so buyers will check its trust signals closely. The QRG treats a lack of who-is-behind-this information as a main reason to rate a page low.
Recommendation:
1. Fill `licenceNo` in data.ts. It then shows in the footer and as `taxID` automatically. Consider linking to a scan of the business licence.
2. Add a "Who we are" block to About.tsx (or a new /about route): founder or team names, roles, languages, years in sourcing, photos.
3. Publish 2-3 short case studies, e.g. "Hotel tableware for a Dubai hotel group: 3 factories audited, 1 rejected, 2.1% defect rate found at PSI." Anonymised is fine.
4. Add a redacted sample inspection report and factory audit report (PDF or images) on /services/quality-inspection and /services/factory-vetting.
5. Replace the AI-generated images in public/products/ with real photos from inspections and factory visits.
6. When you have real testimonials, add them with name, company and country. Do not invent any.

### H1. Service pages are thin (High, Content)
Evidence: 147-158 main-content words per page (255-267 including chrome), against an 800-word topical floor for service pages. Each page's own content is just `desc`, 4 `includes` bullets, 1 `youReceive` sentence and 2-3 `detail` tags, about 70-90 words (data.ts:37-62). Everything else is shared.
Recommendation: add per-service fields to the `Service` type in data.ts and render them in app/services/[slug]/page.tsx: "Who it's for", "How it works" (service-specific steps), "What the report contains", "Typical timeline and cost basis", "Common problems we catch", 3-5 service-specific FAQs and a real example. Aim for 600-1,000 words of useful content per service. Examples: AQL levels and the checklist for quality inspection; licence, export record and capacity checks for factory vetting; LCL vs FCL and the consolidation warehouse for samples and consolidation.

### H2. The 6 service pages are near-duplicates (High, Content/Duplication)
Evidence: pairwise 5-word-shingle Jaccard similarity is 0.45-0.48 across all 15 pairs. All 6 have the same H2 set ("What's included", "What you receive", "Where this fits in the process", "Other services", "Tell us what you want to source"). The 6-step PROCESS block is repeated word for word on every page (page.tsx:73-84). Most of each page is shared template text.
Recommendation: build out H1 so unique text is more than 70% of each page. Turn "Where this fits in the process" into a single highlighted step with a link back to /#how-it-works, not the full 6-step list. Give each page H2s specific to the service.

### H3. Main commercial keywords are missing from the page text (High, On-Page)
Evidence: "China sourcing agent" and "sourcing agent" appear 0 times on all 9 pages. "Sourcing from China", "import from China" and "freight from China" appear 0 times. "Factory audit" and "pre-shipment inspection" appear once each, on the homepage only. These phrases exist only in `metadata.keywords` (app/layout.tsx), which Google ignores. Homepage H1 is "The Force Behind Global Trade" (Hero.tsx:77-83), a slogan with no topic words. Homepage title uses "Sourcing & Export Partner" rather than the phrase buyers search for.
Recommendation:
- Homepage title: `China Sourcing Agent for Factory Sourcing, Inspection & Shipping | Sino Vorex` (trim to about 60 chars, e.g. `China Sourcing Agent: Sourcing, QC & Shipping | Sino Vorex`).
- Homepage H1: keep the slogan visually but put the topic in the H1, e.g. "China sourcing agent: from factory floor to your port", with the slogan as the eyebrow or `<p>`.
- About.tsx paragraph: "Sino Vorex is a China sourcing agent based in Suzhou..." (this also gives the location an entity signal).
- Service H1s and titles should use the searched phrase: "Quality Inspection in China" already works. Change to "Pre-shipment Inspection & Quality Control in China", "Factory Audit & Supplier Verification in China", "Shipping from China: Sea, Air & Rail Freight", "Product Sourcing Agent in China". Note that "Shipping Coordination in China" and "Order Follow-up in China" are phrases nobody searches for.
- Remove `keywords` from layout.tsx or leave it. It has no effect.

### H4. FAQ and Incoterms content is missing from the HTML crawlers and AI systems read (High, AI citation)
Evidence: FAQ answers render only when opened (`{isOpen && ...}`, Trade.tsx:242-247), with `open` starting at 0. The live HTML contains only the first answer ("MOQs are set..."); answers 2-7 ("Sample and courier...", "Under FOB...", "most countries...") are missing. Incoterms works the same way: only FOB is rendered and CIF and DDP are missing (Trade.tsx:185-190). There is no FAQPage schema. Google may render some JS, but AI crawlers usually do not.
Recommendation: always render the answers in the DOM and hide them with CSS (`grid-rows-[0fr]`/`[1fr]`, or `<details>/<summary>`) instead of unmounting them. Do the same for the Incoterm panels. Add FAQPage JSON-LD built from `FAQ` in data.ts. Add per-service FAQs (see H1).

### M1. Social metadata inherited or missing on subpages (Medium, On-Page)
Evidence: /privacy and /terms output `og:title` "Sino Vorex — From factory floor to your port", the homepage `og:description` and `og:url` = https://sinovorex.com. They inherit the root openGraph because the pages define no `openGraph` (app/privacy/page.tsx, app/terms/page.tsx). Service pages override `openGraph` in generateMetadata (app/services/[slug]/page.tsx:17-20) and the live HTML has no `og:image`, so link shares show no image. `twitter:title` is the homepage title on every page, because the `twitter` block in layout.tsx is never overridden.
Recommendation: add `openGraph: { title, description, url }` and `twitter: { title, description }` to privacy, terms and the service generateMetadata. Set `images: ["/opengraph-image.png"]` explicitly in the service openGraph, or add a per-route opengraph-image.

### M2. No Service or BreadcrumbList schema (Medium, On-Page / AI citation)
Evidence: every page carries only the global Organization block. Service pages have a visible breadcrumb (page.tsx:31-33) but no BreadcrumbList. There is no `Service` markup.
Recommendation: in app/services/[slug]/page.tsx, add JSON-LD `Service` (name, description, provider -> Organization @id, areaServed "Worldwide", serviceType) and `BreadcrumbList`. In layout.tsx, give the Organization an `@id`, plus `sameAs` (LinkedIn, Alibaba or other profiles once they exist), `foundingDate`, `address.postalCode`, and `taxID` once licenceNo is filled.

### M3. Generic, low-specificity copy (Medium, Content / AI-quality markers)
Evidence: the copy is honest but has the QRG low-effort markers. It describes what any sourcing agent does ("We find suitable manufacturers across China and compare quotes"). There is nothing original: no numbers, no named industrial clusters (Yiwu, Ningbo, Foshan, Dongguan, Suzhou textiles), no inspection standard (AQL / ISO 2859-1), no report contents, no turnaround times per service. "Connected across every major market" and "The Force Behind Global Trade" are filler. This content is not wrong, but nothing in it is worth quoting or citing.
Recommendation: add facts that can be checked and quoted. For example: "Inspections follow ISO 2859-1 AQL sampling (Level II, 2.5 major / 4.0 minor by default)". "Inspection reports are delivered within 24 hours of the visit". "Based in Suzhou, about 1 hour from Shanghai port; we regularly visit factories in Jiangsu and Zhejiang". Only publish figures that are true. Put them in the `Service` data in data.ts.

### M4. Breadcrumb and step links point to homepage anchors; no standalone About or Contact page (Medium, Internal linking)
Evidence: breadcrumb "Services" links to `/#services` (page.tsx:32). The PROCESS steps on service pages are not linked to the matching service pages (PROCESS has no slug, data.ts:66-73). Body copy has no in-text contextual links. /about returns 404, so trust content has no URL of its own to rank or be cited.
Recommendation: add a `slug` to the PROCESS entries that map to services (Sourcing -> product-sourcing, Samples -> samples-consolidation, Production -> order-follow-up, Inspection -> quality-inspection, Shipping -> shipping-coordination) and link them. Add in-text cross-links, e.g. the factory-vetting copy mentions inspection and links to /services/quality-inspection. Create /about (team, licence, office), and later /case-studies or /guides.

### L1. Homepage meta description is long (Low, On-Page)
Evidence: 175 chars, which gets truncated at about 155-160. Service descriptions (115-128) are fine but are copies of `desc` body text, with no keyword or CTA.
Recommendation: e.g. "China sourcing agent in Suzhou. We find and audit factories, inspect goods before you pay the balance, and ship by sea, air or rail. Reply within 24h." (about 150). Add an optional `metaDescription` field per service in data.ts.

### L2. Sitemap lastModified is always the build time (Low, Freshness)
Evidence: app/sitemap.ts sets `lastModified: now` for every URL, so each deploy claims every page changed.
Recommendation: use real content dates (constants, or git dates) and the legal pages' `updated` date.

### L3. No llms.txt; no dates on service pages (Low, AI citation)
Evidence: /llms.txt returns 404. Service pages show no "last updated" date and no author.
Recommendation: add public/llms.txt with a company summary, the service URLs and contact details. Optionally show "Reviewed by [name], [role], [date]" on service pages once named team members exist.

### L4. The registered address needs supporting evidence (Low, Trust)
Evidence: the address (G239, No. 504 Shantang Street, Gusu District) is a unit number in a historic district. International buyers doing due diligence will check it on maps and may not find a recognisable office.
Recommendation: add office or team photos and, if the team actually works from a different operational address, say so ("Registered office: ...; operations: ...").

### L5. The Chinese legal name has no English rendering (Low, Trust)
Evidence: data.ts:10 notes there is no official English legal name. Non-Chinese readers cannot read or search 苏州智贸通贸易咨询服务有限公司.
Recommendation: add a pinyin or descriptive gloss next to it in the footer and privacy page, e.g. "(Suzhou Zhimaotong Trade Consulting Service Co., Ltd., unofficial translation)".

## Structured findings (audit-data.json, category "Content Quality")

```json
{
  "category": "Content Quality",
  "scores": {"content_quality": 42, "eeat": 35, "experience": 25, "expertise": 40, "authoritativeness": 15, "trustworthiness": 55, "ai_citation_readiness": 38, "on_page_seo": 61},
  "metadata_template": {"site_risk": "low", "templated_ratio": 0.0, "shared_cta_phrases": {}, "notes": "brand_suffix_in_description on /privacy and /terms are false positives"},
  "findings": [
    {"id": "C1", "severity": "critical", "title": "No verifiable proof of operations: licence no. empty, no team, case studies, testimonials; AI product images", "files": ["components/sinovorex/data.ts:20", "components/sinovorex/data.ts:84", "components/sinovorex/About.tsx"]},
    {"id": "H1", "severity": "high", "title": "Service pages thin (~150 main-content words vs 800 floor)", "files": ["components/sinovorex/data.ts:37-62", "app/services/[slug]/page.tsx"]},
    {"id": "H2", "severity": "high", "title": "Service pages near-duplicate (5-gram Jaccard 0.45-0.48)", "files": ["app/services/[slug]/page.tsx:73-84"]},
    {"id": "H3", "severity": "high", "title": "'China sourcing agent' 0 occurrences; homepage H1 is a slogan", "files": ["components/sinovorex/Hero.tsx:77-83", "app/layout.tsx"]},
    {"id": "H4", "severity": "high", "title": "FAQ answers 2-7 and CIF/DDP not in server HTML; no FAQPage schema", "files": ["components/sinovorex/Trade.tsx:185-190", "components/sinovorex/Trade.tsx:242-247"]},
    {"id": "M1", "severity": "medium", "title": "OG/Twitter metadata inherited (privacy/terms) or og:image missing (services)", "files": ["app/privacy/page.tsx", "app/terms/page.tsx", "app/services/[slug]/page.tsx:17-20"]},
    {"id": "M2", "severity": "medium", "title": "No Service/BreadcrumbList schema; Organization lacks @id/sameAs/taxID", "files": ["app/services/[slug]/page.tsx", "app/layout.tsx"]},
    {"id": "M3", "severity": "medium", "title": "Generic copy, no quotable specifics", "files": ["components/sinovorex/data.ts"]},
    {"id": "M4", "severity": "medium", "title": "Anchor-only breadcrumb, unlinked process steps, no /about", "files": ["app/services/[slug]/page.tsx:32", "components/sinovorex/data.ts:66-73"]},
    {"id": "L1", "severity": "low", "title": "Homepage meta description 175 chars", "files": ["app/layout.tsx"]},
    {"id": "L2", "severity": "low", "title": "Sitemap lastModified = build time", "files": ["app/sitemap.ts"]},
    {"id": "L3", "severity": "low", "title": "No llms.txt; no dates/reviewer on service pages", "files": ["public/"]},
    {"id": "L4", "severity": "low", "title": "Registered address needs supporting office evidence", "files": ["components/sinovorex/data.ts:17-18"]},
    {"id": "L5", "severity": "low", "title": "Legal name only in Chinese", "files": ["components/sinovorex/data.ts:10"]}
  ]
}
```
