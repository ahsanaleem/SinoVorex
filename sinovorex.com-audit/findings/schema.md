# Schema / Structured Data - sinovorex.com (re-audit 2026-10-22)

Score: 80/100 (was 48)

Method: fetched all 21 sitemap URLs live, parsed every JSON-LD block, resolved every {"@id"} reference. All blocks are valid JSON, server-rendered, @context https://schema.org, absolute URLs. 0 unresolved @id refs. No Microdata/RDFa. No deprecated types, no FAQPage.

## Detection per page
- / : 1 block, @graph = Organization + WebSite (no WebPage node, no dates)
- /privacy, /terms : same Org+WebSite only (no BreadcrumbList, no WebPage)
- /services : BreadcrumbList + ItemList(6 Service, provider -> org)
- /services/* (6) : BreadcrumbList + Service (@id #service, provider -> org, serviceType, areaServed)
- /guides : BreadcrumbList + CollectionPage
- /guides/* (5) : BreadcrumbList + Article (datePublished/dateModified 2026-10-20, author+publisher -> org @id, image, mainEntityOfPage)
- /sourcing-for/* (3) : BreadcrumbList + WebPage (dateModified)
- /about : BreadcrumbList + AboutPage; /quote : BreadcrumbList + ContactPage
Generators: lib/seo.tsx, app/layout.tsx:42, app/services/[slug]/page.tsx:40, components/sinovorex/ArticleView.tsx:11-41.

## Fixed since last audit
- Page-specific schema now exists (was Org only); BreadcrumbList on 19 of 21 pages; WebSite entity added; Service schema on all 6 services; Org logo is now ImageObject; Org uses shared @id graph.

## What works
- Consistent @id graph (#organization, #website, per-page #service/#article/#webpage), publisher/provider/author all resolve.
- Breadcrumb names/URLs match visible crumbs; last item includes item URL; absolute URLs.
- Article dates are ISO 8601 and match og:article:published_time/modified_time and visible "Updated" dates.
- `<` escaped in JsonLd (lib/seo.tsx:70). FAQs are visible on-page but NOT marked up as FAQPage - correct (see below).

## Findings

### 1. Homepage "publication_date 2026-01-01" is a false signal, not site data - Info
Evidence: no datePublished/dateModified, article:published_time, <time>, or "2026-01-01" string anywhere in homepage HTML or source (grep of repo: none). render_page.py uses htmldate `find_date`, which falls back to a guessed date when the page has none. Real dates are 2026-10-20 (data.ts PAGE_UPDATED). Not a site bug, but the homepage does expose no machine-readable date.
Fix (optional, Low): add a WebPage node to the homepage graph at app/layout.tsx:42 is wrong (layout is global); instead in app/page.tsx add
`<JsonLd data={graph({"@type":"WebPage","@id":"https://sinovorex.com/#webpage","url":"https://sinovorex.com","name":"<home title>","isPartOf":{"@id":WEBSITE_ID},"about":{"@id":ORG_ID},"dateModified":PAGE_UPDATED.home,"inLanguage":"en"})} />`.

### 2. Organization missing taxID, foundingDate, sameAs - Medium (High for entity/GEO trust)
Evidence: live Org node has none. components/sinovorex/data.ts:22 licenceNo "", :26 foundedYear "", :28 sameAs []. lib/seo.tsx:51-53 correctly omits them when empty (no placeholders), so code is fine; data is missing.
Fix: fill data.ts:22 (18-char USCC -> taxID), :26 (year), :28 (LinkedIn company page, Google Business Profile, Made-in-China/Global Sources). Unchanged from previous audit (REMAIN).

### 3. Organization type is generic; logo is a 180x180 app icon - Low
Evidence: lib/seo.tsx:36-42 "Organization", logo = /apple-icon.png 180x180 (valid, >=112px, but a square app icon, not the wordmark).
Fix: change lib/seo.tsx:42 to a wordmark/PNG logo >=512px square; optionally `"@type": ["Organization","ProfessionalService"]` at line 37 since it sells services (no rich result, helps entity classification). Also add `"alternateName": COMPANY.legalNameEnGloss` (data.ts:11) at line 40 to link the Chinese legalName to the English gloss.

### 4. Service nodes lack offers/areaServed typing and /services ItemList items lack @id - Low
Evidence: app/services/[slug]/page.tsx:42-52 has no `@id` link from ItemList (app/services/page.tsx:24 builds a second, id-less Service object with different `name`, duplicating the entity).
Fix: in app/services/page.tsx:24 use `item: { "@id": `${abs("/services/"+s.slug)}#service` }` so the hub references the same entity. Do not add price (none published). Add `"isPartOf"/"mainEntityOfPage": abs(path)` optional.

### 5. Breadcrumb on /sourcing-for/* skips a level - Low
Evidence: crumbs = Home > Page (e.g. /sourcing-for/amazon-sellers), but URL implies a "sourcing-for" parent. Valid markup and matches visible crumbs, and no /sourcing-for hub exists (check it 404s or redirects).
Fix: either leave, or create a hub /sourcing-for and use Home > Industries > Page.

### 6. Privacy/Terms have no BreadcrumbList or WebPage - Low
Evidence: only Org+WebSite. Fix: add WebPage with dateModified PAGE_UPDATED.privacy/terms (data.ts:41-42). Cosmetic.

### 7. Article author is the Organization - Medium (E-E-A-T, not an error)
Evidence: ArticleView.tsx:23 author -> ORG_ID. Valid (Google accepts Organization author), but there is no named person (TEAM is empty, data.ts:32), and datePublished equals dateModified on all 5 guides (all 2026-10-20), accurate since all were published that day.
Fix: once TEAM is populated, set author to a Person with url/sameAs and add `reviewedBy`. Keep dateModified honest: only bump when content materially changes.

### 8. FAQPage - Info, correctly absent
Visible FAQ lists (FaqList in ArticleView.tsx:56, services page "Common questions") have no FAQPage JSON-LD. Google retired FAQ rich results for all sites on 2026-05-07 (after restricting them to gov/health in Aug 2023), so there is no SERP benefit; leaving it out is right. Do not add. If genuine user-submitted Q&A is ever added, use QAPage.

### 9. Missing opportunities (optional)
- Article.image is the shared OG image (ArticleView.tsx:22); per-guide images improve Article/Discover eligibility (Low).
- No Review/AggregateRating - correctly absent (no real reviews; do not fabricate).
- WebSite SearchAction: not recommended (no site search; Google dropped sitelinks search box).

## Validation checklist
@context https URL: pass. Types valid/non-deprecated: pass. Required props: pass (Article headline/image/dates/author; Breadcrumb position/name/item; Service name/provider). Placeholders: none. Absolute URLs: pass. ISO 8601 dates: pass. @id consistency: pass.
