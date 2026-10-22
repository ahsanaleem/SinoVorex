# Content Quality, E-E-A-T and On-Page SEO: sinovorex.com (re-audit)

Audit date: 2026-10-22. Status: FINAL. Previous audit: 2026-10-19 (Content 42, On-Page 61).
Data: crawl.json (21 pages, full visible text), source code in app/, components/sinovorex/ and lib/.
Method: 5-word shingle Jaccard (with the shingles shared by all pages removed), Flesch/FK on text split into sentences, metadata_template.py on all 21 title/description pairs, and keyword and phrase counts on visible text.

## Scores

| Area | Old | New |
|---|---|---|
| Content Quality | 42 | 74 |
| On-Page SEO | 61 | 86 |
| E-E-A-T composite | 35 | 52 |
| AI citation readiness | 38 | 78 |

E-E-A-T (this skill's own internal weights, not Google's):

| Factor | Weight | Score | Basis |
|---|---|---|---|
| Experience | 20% | 30 | The service "Example" blocks are labelled "Illustrative example". That is honest, but it is not proof. No real case studies, client names, sample reports or real photos. Homepage product photos are AI-generated (data.ts:96). |
| Expertise | 25% | 72 | The content is accurate and specific. The AQL table matches ISO 2859-1 Level II (every row checked, 32-315 units, Ac/Re at 2.5 and 4.0). The 3,000-bag example is correct (sample of 125, 9 defects > Ac 7, so the lot fails). Also covers fee ranges, Incoterms, transit times and Chinese holidays. No named author or expert. |
| Authoritativeness | 25% | 18 | No sameAs links (data.ts:28 is empty), and no reviews, testimonials, memberships or press. |
| Trustworthiness | 30% | 72 | /about gives gsxt.gov.cn verification steps, a "what we are not" section and an English gloss of the legal name. Full contact details are on every page. Fee advice is honest, including "pay the balance after inspection". Privacy policy and terms are dated. The Unified Social Credit Code is still empty (data.ts:22), so it does not appear anywhere. |

Weighted total: 6 + 18 + 4.5 + 21.6 = 50. I rounded this up to 52 because the examples are honestly labelled as illustrative.

## Status of the old findings

| Old | Title | Status |
|---|---|---|
| C1 | No verifiable proof of operations | PARTLY FIXED. /about, the verification route and the legal-name gloss were added. Still missing: licence no., founding year, team, sameAs, case studies, real photos. Now rated High (see F1). |
| H1 | Service pages thin (~150 words) | FIXED. Each page now has 1,106-1,658 words. |
| H2 | Service pages near-duplicate (Jaccard 0.45-0.48) | FIXED. Body Jaccard is now 0.05-0.07, and 80-84% of each page's text appears nowhere else on the site. |
| H3 | Commercial keywords missing; slogan H1 | FIXED. "China sourcing agent" appears 18 times and "sourcing agent" 69 times. Homepage H1 is "China Sourcing Agent for Global Buyers". |
| H4 | FAQ / Incoterms missing from HTML | FIXED. All 7 FAQ answers and the CIF/DDP text are in the server HTML. |
| M1 | OG/Twitter tags inherited | FIXED. All 21 pages have their own og:title and an og:image. |
| M2 | No Service/Breadcrumb schema | FIXED. Service, BreadcrumbList, Article, AboutPage, ContactPage and CollectionPage are present, with 0 schema errors. |
| M3 | Generic copy | LARGELY FIXED. Pages now have numbers, standards, tables and worked examples. |
| M4 | Anchor breadcrumbs, no /about | FIXED. There is now a /services hub, /about, real breadcrumbs and links inside the text. |
| L1 | Homepage description 175 chars | FIXED (now 144). |
| L2 | Sitemap lastmod = build time | FIXED (uses PAGE_UPDATED, data.ts:35). |
| L3 | No llms.txt, no dates | FIXED (app/llms.txt/route.ts; pages show "Updated" dates). There is still no author (F3). |
| L4 | Address needs office evidence | REMAINS (F8). |
| L5 | Legal name only in Chinese | FIXED. |

## Duplication

| Group | Pairs | Full-text Jaccard | Body Jaccard (shared site text removed) | Text unique vs rest of site |
|---|---|---|---|---|
| 6 service pages | 15 | 0.07-0.09 | 0.05-0.07 | 80-84% |
| 3 sourcing-for pages | 3 | 0.11-0.12 | 0.08-0.09 | 75-81% |
| 5 guides | 10 | 0.06-0.08 | 0.05-0.06 | 79-81% |

Cross-checks (body Jaccard): sourcing-for/small-businesses vs the small-business guide 0.08; factory-vetting vs the factory audit checklist 0.06; quality-inspection vs the AQL guide 0.07.

There is no thin or duplicate content. Word counts:
- Home: 1,793.
- Service pages: 1,106-1,658.
- Guides: 1,199-1,537. Three of the five are slightly under the 1,500-word blog floor, but they cover their topics fully.
- Sourcing-for pages: 841-953.
- /about: 599.
- /services hub: 404, and /quote: 329. Both are fine for a hub page and a form page.

## Readability

Flesch Reading Ease is 43-62 and FK grade is 9-13, with average sentences of 16-24 words. The prose is plain and short, which suits B2B buyers. Two pages score lower: the /services hub (FRE 36, average sentence 30 words, mostly list fragments) and /sourcing-for/hotels-restaurants (FRE 44). No action is needed.

## AI phrasing and imagery

- The wording is clean. It has 0 em dashes and none of "delve", "seamless", "landscape", "elevate", "unlock" or "robust". Minor: "whether you" appears 9 times across 5 pages, "leverage" 3 times and "navigate" once. Low priority.
- One filler H2 is still on the homepage: "Connected across every major market" (GlobalReach.tsx:245). Low priority.
- The AI-generated product images (public/products/*.jpg, data.ts:96) are still on the homepage, captioned "Images are illustrative" (Trade.tsx:86). The caption is honest, but the images add no experience signal.

## Templated metadata

metadata_template.py on all 21 pages: site_risk low, templated_ratio 0.0, shared_cta_phrases {}. The only flag is brand_suffix_in_description on /privacy and /terms. Both are false positives: the brand name sits inside a sentence and was not appended.

## Findings

### F1. Still no proof of real work or real people (High, E-E-A-T). REMAINS from C1
Evidence:
- These fields are all empty: licenceNo "" (components/sinovorex/data.ts:22), foundedYear "" (data.ts:26), sameAs [] (data.ts:28) and TEAM [] (data.ts:32).
- All three service "Example" blocks are labelled "Illustrative example" (content/services.ts:79, 147, 212).
- The site has 0 mentions of a case study, testimonial, client name or years of experience.
- The code that displays these fields is already written (about/page.tsx:42,52,53,106; About.tsx:77; Closing.tsx:130; SubpageShell.tsx:132; lib/seo.tsx:51-53). Only the data is missing.

Downgraded from Critical because it does not block indexing. But this business takes buyers' deposits, so missing proof is still the main limit on trust and conversions.

Fix:
1. Fill in licenceNo and foundedYear from the business licence.
2. Add at least one named person with a role and a photo to TEAM.
3. Add sameAs links: LinkedIn company page, Google Business Profile, and Alibaba/Made-in-China profiles if you have them.
4. As real jobs are completed, replace each illustrative example with a real, anonymised one (e.g. "Q3 2026, 4,000 tote bags, Zhejiang ...").
5. Publish a redacted sample inspection report on /services/quality-inspection.

### F2. Guides have too few internal links (Medium, Internal linking). NEW
Evidence:
- Each guide has 5-9 inlinks, while every nav and footer page has 21.
- The homepage links to only one guide (china-sourcing-agent-cost), and the footer links only to the /guides hub (links.ts:4).
- /services/order-follow-up and /services/samples-consolidation show no "Guides on this topic" block, because no guide lists them in `related` (app/services/[slug]/page.tsx:33).
- The freight-forwarder guide is the weakest, with 5 inlinks.

Fix:
1. List all 5 guides in the footer, either in FOOTER_RESOURCES (links.ts) or in a new list.
2. Add a strip of 3-5 guide cards on the homepage near the FAQ.
3. Add `related` paths so order-follow-up and samples-consolidation each get a guide. The freight-forwarder guide fits shipping-coordination and samples-consolidation, and the small-business guide fits samples-consolidation.
4. Link to the matching guide from inside service-page paragraphs, e.g. link "Incoterms" on shipping-coordination to the freight-forwarder guide.

### F3. Guides have no human author (Medium, E-E-A-T). NEW
Evidence: the Article schema names the Organization as author (ArticleView.tsx:23), and the guides show no byline. These guides give how-to advice where buyers' money and supplier risk are at stake. Under the QRG test of who is responsible for the content, they are weaker without a named author.
Fix: once TEAM has a real person, set `author` on each guide to that Person (@id, jobTitle, sameAs LinkedIn). In ArticleView.tsx, show "Written by X, role, reviewed DATE" under the H1.

### F4. The homepage and product-sourcing compete for the same head term (Medium, Keyword targeting). NEW
Evidence: four page titles start with "China Sourcing Agent":
- "China Sourcing Agent for Global Buyers" (home)
- "China Sourcing Agent: Find & Compare Factories" (product-sourcing)
- "China Sourcing Agent for Small Businesses"
- "China Sourcing Agent for Amazon FBA Sellers"

Fix: let the homepage own "China sourcing agent". Give product-sourcing a title for its own intent, e.g. "Find Manufacturers in China: Supplier Sourcing | Sino Vorex", with the H1 "Find and compare factories in China". The audience pages are fine because their modifiers set a different intent. Keep linking from them to the homepage with "China sourcing agent" as the anchor text.

### F5. The same H2 appears twice on a page (Low, On-Page). NEW
Evidence:
- "What you receive" appears twice on /services/order-follow-up and on /services/shipping-coordination. One comes from the template (app/services/[slug]/page.tsx:88) and the other from the content (content/services.ts:282 and :366).
- "How we help" appears twice on /sourcing-for/amazon-sellers (ArticleView.tsx:52 and content/audiences.ts:25).

Fix: rename the content H2s:
- services.ts:282 → "Reports and updates you get"
- services.ts:366 → "Shipping documents you get"
- audiences.ts:25 → "What we do for Amazon sellers"

### F6. AI-generated images and no real photos (Low, Experience). REMAINS
Evidence: data.ts:96 and public/products/*.jpg. Every subpage has only 2 images (logo and OG image).
Fix: replace them with real photos from factory visits and inspections, with descriptive alt text and file names.

### F7. Minor metadata issues (Low, On-Page). NEW
- /terms description is 61 chars and /privacy is 90. That is fine for legal pages; lengthening them is optional.
- /sourcing-for/hotels-restaurants description is 160 chars and may be truncated.
- Guide titles leave out the brand. This is acceptable; keep as is.

### F8. No evidence of the office address (Low, Trust). REMAINS (old L4)
Add an office or team photo, or a Google Business Profile link, on /about.

## On-Page SEO summary (86/100)

What works:
- All 21 pages have unique titles (42-61 chars) and descriptions (61-160 chars).
- Each page has one H1 that matches its intent, and service H1s lead with the keyword.
- Every page has a self-referencing canonical and its own OG/Twitter data.
- Breadcrumbs plus BreadcrumbList, and rich schema with 0 errors.
- All images have alt text.
- Pages show visible "Updated" dates, tables of contents and "Key takeaways" blocks.
- FAQ answers are in the server-rendered HTML, and llms.txt exists.

Deductions: head-term overlap (F4), too few links to guides (F2), duplicate H2s (F5) and minor metadata (F7).

## Structured findings (audit-data.json, category "Content Quality")

```json
{
  "category": "Content Quality",
  "scores": {"content_quality": 74, "on_page_seo": 86, "eeat": 52, "experience": 30, "expertise": 72, "authoritativeness": 18, "trustworthiness": 72, "ai_citation_readiness": 78},
  "previous": {"content_quality": 42, "on_page_seo": 61},
  "duplication": {"services_body_jaccard": "0.05-0.07", "sourcing_for_body_jaccard": "0.08-0.09", "guides_body_jaccard": "0.05-0.06"},
  "metadata_template": {"site_risk": "low", "templated_ratio": 0.0, "shared_cta_phrases": {}},
  "fixed": ["H1", "H2", "H3", "H4", "M1", "M2", "M3", "M4", "L1", "L2", "L3", "L5"],
  "findings": [
    {"id": "F1", "severity": "high", "status": "remains", "title": "No licence no., team, sameAs or real case studies", "files": ["components/sinovorex/data.ts:22", "components/sinovorex/data.ts:26", "components/sinovorex/data.ts:28", "components/sinovorex/data.ts:32", "components/sinovorex/content/services.ts:79"]},
    {"id": "F2", "severity": "medium", "status": "new", "title": "Guides have 5-9 inlinks vs 21", "files": ["components/sinovorex/links.ts:4", "app/services/[slug]/page.tsx:33"]},
    {"id": "F3", "severity": "medium", "status": "new", "title": "Guides authored by Organization, no byline", "files": ["components/sinovorex/ArticleView.tsx:23"]},
    {"id": "F4", "severity": "medium", "status": "new", "title": "Home and product-sourcing both target 'China sourcing agent'", "files": ["components/sinovorex/content/services.ts"]},
    {"id": "F5", "severity": "low", "status": "new", "title": "Duplicate H2s on 3 pages", "files": ["components/sinovorex/content/services.ts:282", "components/sinovorex/content/services.ts:366", "components/sinovorex/content/audiences.ts:25"]},
    {"id": "F6", "severity": "low", "status": "remains", "title": "AI-generated product images", "files": ["components/sinovorex/data.ts:96"]},
    {"id": "F7", "severity": "low", "status": "new", "title": "Minor description lengths", "files": []},
    {"id": "F8", "severity": "low", "status": "remains", "title": "Address lacks office evidence", "files": ["app/about/page.tsx"]}
  ]
}
```
