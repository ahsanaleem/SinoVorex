# Schema.org / Structured Data Audit — sinovorex.com

**Score: 48/100**

Sitewide `Organization` markup is well-formed and sits in the right place (`app/layout.tsx`),
but it is the *only* structured data on the entire site — none of the six service pages,
the homepage sections, or the legal pages carry any page-specific schema, and there is no
BreadcrumbList or WebSite entity despite both having a ready-made on-page equivalent
(visual breadcrumbs, a single-page nav). No deprecated types (HowTo, SpecialAnnouncement,
CourseInfo/EstimatedSalary/LearningVideo) and no FAQPage are present — that part is clean.

---

## 1. Detection results

| Source | JSON-LD blocks | Microdata/RDFa |
|---|---|---|
| `/` (homepage) | 1 | none |
| `/services/product-sourcing` | 1 (identical) | none |
| `/services/factory-vetting` | 1 (identical) | none |
| `/services/quality-inspection` | 1 (identical) | none |
| `/services/samples-consolidation` | 1 (identical) | none |
| `/services/shipping-coordination` | 1 (identical) | none |
| `/services/order-follow-up` | 1 (identical) | none |
| `/privacy` | 1 (identical) | none |
| `/terms` | 1 (identical) | none |

Verified live via `render_page.py --mode never --json` on `/`, `/services/product-sourcing`,
`/privacy`, `/terms` — every page returns `block_count: 1`, same 847-byte block, `types:
["ContactPoint","Organization","PostalAddress"]`, `valid: true`. This matches the source: the
block is emitted **once**, in `app/layout.tsx` lines 28–42 and 60, inside `<head>`, so Next.js'
root layout applies it to every route with no per-page variation. There is no SPA-injected
schema to worry about (confirmed raw vs. rendered HTML match — this is a standard Next.js SSG
site, not a client-side-only SPA).

Emitted block (as rendered on the homepage):
```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Sino Vorex",
  "legalName": "苏州智贸通贸易咨询服务有限公司",
  "url": "https://sinovorex.com",
  "logo": "https://sinovorex.com/brand/sinovorex-app-icon.svg",
  "email": "business@sinovorex.com",
  "telephone": "+8613770504359",
  "description": "Sino Vorex helps buyers worldwide source, check and ship products from factories across China: product sourcing, factory vetting, quality inspection and shipping coordination.",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "G239, No. 504 Shantang Street, Gusu District",
    "addressLocality": "Suzhou",
    "addressRegion": "Jiangsu",
    "addressCountry": "CN"
  },
  "areaServed": "Worldwide",
  "contactPoint": [
    {
      "@type": "ContactPoint",
      "contactType": "sales",
      "email": "business@sinovorex.com",
      "telephone": "+8613770504359",
      "availableLanguage": ["English", "Chinese"]
    }
  ]
}
```

Also confirmed, by reading source:
- No FAQPage, HowTo, SpecialAnnouncement, or other deprecated/retired type anywhere in the repo.
- A homepage FAQ section (`components/sinovorex/data.ts` → `FAQ`, rendered by
  `components/sinovorex/Trade.tsx`'s `FeesAndFaq`, 7 Q&A pairs) exists **visually** but has no
  FAQPage JSON-LD — i.e. there is nothing to flag for removal. Since Google retired FAQ rich
  results for all sites (May 7, 2026), this is correctly left unmarked. See §4 for the
  recommendation stance on this content.
- Service pages render a visible breadcrumb trail (`Home / Services / {title}`) in
  `app/services/[slug]/page.tsx` line 34–36, but no matching BreadcrumbList JSON-LD.
- No WebSite entity, no per-service Service schema, no AggregateRating/Review (none exists on
  the site — correct, nothing fabricated).

---

## 2. Validation results — existing `Organization` block

| Check | Result |
|---|---|
| `@context` is `https://schema.org` | ✅ Pass |
| `@type` valid, not deprecated | ✅ Pass (`Organization`) |
| Required properties present (`name`, `url`) | ✅ Pass |
| Property value types correct | ✅ Pass |
| No placeholder text | ✅ Pass |
| URLs absolute | ✅ Pass (`url`, `logo` both `https://sinovorex.com/...`) |
| Dates ISO 8601 | N/A (no date properties) |

**Findings on this block (none are Critical — the block is valid and fine to ship):**

- **[Info] `logo` points to an SVG.** `https://sinovorex.com/brand/sinovorex-app-icon.svg`.
  Google's Organization/logo guidance wants a clear, roughly square image (min 112×112px) in a
  broadly-supported raster format for Knowledge Panel use; SVG support is inconsistent across
  consumers (some rich-result/AI crawlers skip SVG `logo` values entirely). The repo already has
  `app/apple-icon.png`, a 180×180 square PNG served at `https://sinovorex.com/apple-icon.png`
  (verified 200 OK, `image/png`) — swap to that for `logo` to avoid relying on SVG support.
  **Severity: Info.**

- **[Info] No `sameAs`.** No social/profile links are listed (WhatsApp is a messaging channel,
  not a profile page, so it doesn't belong in `sameAs`; if/when Sino Vorex gets a LinkedIn
  company page, Alibaba storefront, etc., add those URLs here to help Google and AI engines
  consolidate the entity). **Severity: Info — no profiles exist yet to link.**

- **[Low] `@type: Organization` is a safe but under-specific choice for a business with a single
  fixed registered address.** `ProfessionalService` (a `LocalBusiness` subtype) carries every
  property already in use (`address`, `telephone`, `email`, `areaServed`) plus optional
  `priceRange`/`openingHoursSpecification`, and better signals "this is a services business
  operating from a real office" rather than a generic brand entity. This is not required — the
  current markup is valid — but it is a stronger fit. **Severity: Low / optional upgrade.**

---

## 3. Missing schema opportunities

| # | Severity | Opportunity | Why |
|---|---|---|---|
| 1 | **Critical** | `BreadcrumbList` on all 6 `/services/*` pages | Visible breadcrumb nav already exists in markup (`Home / Services / {title}`) with zero matching JSON-LD — this is the single highest-value, lowest-risk gap: it's a direct Google rich-result (breadcrumb trail in SERP) and the on-page UI already gives you the exact trail to encode. |
| 2 | **Moderate** | `Service` schema on each of the 6 `/services/*` pages | Each page is a single, well-defined service (`SERVICES` array in `components/sinovorex/data.ts`) with its own title, description and "what's included" — ideal `Service` entities with `provider` pointing back to the Organization. Strengthens topical/entity understanding for Google and AI/LLM crawlers; no dedicated Google SERP rich result for generic `Service`, so this is Moderate, not Critical. |
| 3 | **Moderate** | `WebSite` entity on the homepage | No `WebSite` node exists anywhere. Adding one (linked to the Organization via `publisher`) is standard best practice for sitewide entity clarity; omit `potentialAction`/`SearchAction` since the site has no on-site search box — don't fabricate one. |
| 4 | **Low** | Link `Organization` + `WebSite` + `BreadcrumbList` via shared `@id` in a `@graph` | Once more than one node exists, giving each a stable `@id` (e.g. `https://sinovorex.com/#organization`) and referencing it from the others (`provider`, `publisher`) avoids duplicate/ambiguous entities across pages. |
| 5 | **Info** | Existing homepage FAQ content (`FAQ` array, 7 Q&As) is unmarked | Per current guidance, Google retired FAQ rich results for all sites (May 7, 2026) — adding `FAQPage` now would carry no Google SERP benefit. Any AI/GEO-overview benefit from marking it up is **unconfirmed**. Recommendation: leave as-is unless the user explicitly wants to test for AI-surface visibility with that caveat accepted. Not included in the generated JSON-LD below. |
| 6 | **Info** | `/privacy` and `/terms` have no dedicated `WebPage` schema | Legal pages don't need anything beyond the inherited sitewide `Organization` block. No action needed; noted only for completeness. |

---

## 4. Generated JSON-LD — ready to paste

### 4a. Updated Organization block (homepage + sitewide) — `app/layout.tsx`

Replace the `orgJsonLd` object (lines 28–42) with this. Changes: `@id` added for graph linking,
`logo` switched from the SVG to the 180×180 PNG apple-icon already in the repo. Everything else
is unchanged — this is a drop-in replacement for the existing, already-valid block, not a
rewrite of working code.

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://sinovorex.com/#organization",
  "name": "Sino Vorex",
  "legalName": "苏州智贸通贸易咨询服务有限公司",
  "url": "https://sinovorex.com",
  "logo": "https://sinovorex.com/apple-icon.png",
  "email": "business@sinovorex.com",
  "telephone": "+8613770504359",
  "description": "Sino Vorex helps buyers worldwide source, check and ship products from factories across China: product sourcing, factory vetting, quality inspection and shipping coordination.",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "G239, No. 504 Shantang Street, Gusu District",
    "addressLocality": "Suzhou",
    "addressRegion": "Jiangsu",
    "addressCountry": "CN"
  },
  "areaServed": "Worldwide",
  "contactPoint": [
    {
      "@type": "ContactPoint",
      "contactType": "sales",
      "email": "business@sinovorex.com",
      "telephone": "+8613770504359",
      "availableLanguage": ["English", "Chinese"]
    }
  ]
}
```
Implementation note: `COMPANY.licenceNo` is currently an empty string in `components/sinovorex/data.ts`,
so the conditional `taxID` field never renders — no change needed there; just fill in `licenceNo`
once the 统一社会信用代码 is available and the existing conditional will pick it up automatically.

### 4b. WebSite block (add alongside Organization, homepage only — `app/layout.tsx` or `app/page.tsx`)

```json
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://sinovorex.com/#website",
  "url": "https://sinovorex.com",
  "name": "Sino Vorex",
  "publisher": { "@id": "https://sinovorex.com/#organization" }
}
```
File: inject as a second `<script type="application/ld+json">` in `app/layout.tsx` next to the
existing one (or move both into a `@graph` array — see §4e). No `SearchAction` included; the site
has no search box, and fabricating one would fail validation checklist item 5 (no placeholder/
unsupported functionality).

### 4c. BreadcrumbList — one per service page, file: `app/services/[slug]/page.tsx`

This page is dynamic (`generateStaticParams` over `SERVICES`), so build the breadcrumb from `s.title`
and `s.slug` already available in the component (lines 24–27) rather than hardcoding six copies.
Add a `<script>` tag alongside the existing `<nav aria-label="Breadcrumb">` (around line 34), e.g.:

```tsx
const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://sinovorex.com/" },
    { "@type": "ListItem", position: 2, name: "Services", item: "https://sinovorex.com/#services" },
    { "@type": "ListItem", position: 3, name: s.title, item: `https://sinovorex.com/services/${s.slug}` },
  ],
};
```
and render it with `<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />`
inside the returned JSX (e.g. right before the `<article>` on line 32).

Resolved example for `/services/product-sourcing`:
```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://sinovorex.com/" },
    { "@type": "ListItem", "position": 2, "name": "Services", "item": "https://sinovorex.com/#services" },
    { "@type": "ListItem", "position": 3, "name": "Product Sourcing", "item": "https://sinovorex.com/services/product-sourcing" }
  ]
}
```
Note: position 2's `item` uses the homepage's `#services` anchor (where the services section lives
on `/`, per `app/page.tsx` → `TradevorexHome`) since there is no standalone `/services` index page;
this matches the actual link target used by the visible breadcrumb (`Link href="/#services"` in
`app/services/[slug]/page.tsx` line 35).

### 4d. Service schema — one per service page, same file: `app/services/[slug]/page.tsx`

Built from the already-available `s` object (`Service` type in `components/sinovorex/data.ts`) —
no new content, just encoding what's already written for each service. Add alongside the
breadcrumb script:

```tsx
const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: `${s.title} in China`,
  description: s.desc,
  serviceType: s.title,
  provider: { "@id": "https://sinovorex.com/#organization" },
  areaServed: "Worldwide",
  url: `https://sinovorex.com/services/${s.slug}`,
};
```

Resolved example for `/services/quality-inspection`:
```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Quality Inspection in China",
  "description": "Goods are checked against your specifications before they leave the factory, with a photo report so problems are caught early.",
  "serviceType": "Quality Inspection",
  "provider": { "@id": "https://sinovorex.com/#organization" },
  "areaServed": "Worldwide",
  "url": "https://sinovorex.com/services/quality-inspection"
}
```
Repeat for all six slugs (`product-sourcing`, `factory-vetting`, `quality-inspection`,
`samples-consolidation`, `shipping-coordination`, `order-follow-up`) — the `s` variable already
loops correctly per-route via `generateStaticParams`, so one code change in the shared template
covers all six pages; no per-page file edits needed since they share the single dynamic route.

### 4e. Optional: combine via `@graph` instead of multiple `<script>` tags

If preferred, `app/layout.tsx` can emit Organization + WebSite as one block:
```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://sinovorex.com/#organization",
      "name": "Sino Vorex",
      "legalName": "苏州智贸通贸易咨询服务有限公司",
      "url": "https://sinovorex.com",
      "logo": "https://sinovorex.com/apple-icon.png",
      "email": "business@sinovorex.com",
      "telephone": "+8613770504359",
      "description": "Sino Vorex helps buyers worldwide source, check and ship products from factories across China: product sourcing, factory vetting, quality inspection and shipping coordination.",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "G239, No. 504 Shantang Street, Gusu District",
        "addressLocality": "Suzhou",
        "addressRegion": "Jiangsu",
        "addressCountry": "CN"
      },
      "areaServed": "Worldwide",
      "contactPoint": [
        {
          "@type": "ContactPoint",
          "contactType": "sales",
          "email": "business@sinovorex.com",
          "telephone": "+8613770504359",
          "availableLanguage": ["English", "Chinese"]
        }
      ]
    },
    {
      "@type": "WebSite",
      "@id": "https://sinovorex.com/#website",
      "url": "https://sinovorex.com",
      "name": "Sino Vorex",
      "publisher": { "@id": "https://sinovorex.com/#organization" }
    }
  ]
}
```

---

## 5. What works

- Single, valid, well-formed `Organization` block with correct `@context` (`https://schema.org`),
  absolute URLs, no placeholder text, and a complete real address/phone/email — exactly what's on
  the business licence, nothing fabricated.
- Delivered via a clean SSG Next.js root layout (`app/layout.tsx`), so it is genuinely present in
  the raw server-rendered HTML on every page — confirmed live, not just in source — no SPA
  client-injection gap to worry about.
- No deprecated types anywhere (`HowTo`, `SpecialAnnouncement`, `CourseInfo`, `EstimatedSalary`,
  `LearningVideo`) and no `FAQPage` to walk back — the site correctly has visible FAQ content
  without the now-pointless FAQPage markup.
- `contactPoint.availableLanguage` correctly lists both English and Chinese, matching the real
  bilingual service described on the site.

---

## 6. Score: 48/100

Rationale: the one schema block that exists is fully valid (no validation failures), which keeps
this from scoring low, but structured-data coverage is minimal — 1 entity type across 9 pages,
no BreadcrumbList despite ready-made visual breadcrumbs, no Service markup for a 6-page service
catalog, and no WebSite entity. The gap is coverage/opportunity, not correctness.
