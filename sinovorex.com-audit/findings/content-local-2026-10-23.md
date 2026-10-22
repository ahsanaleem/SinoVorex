# Content Quality & E-E-A-T: sinovorex.com, local working tree (2026-10-23)

**Scope:** the uncommitted working tree, built with `next build` and crawled at `localhost:3123`, 26 indexable pages. The live site is unchanged since 2026-10-22 (same ETag), so `findings/content.md` still describes production.
**Method:** visible text from the HTML the server returns. Duplication is measured as 5-word-shingle Jaccard after removing shingles that appear on at least 60% of pages. Readability uses Flesch Reading Ease. Facts were spot-checked in the new shipping guides, and trust fields read from source.
**Caveat:** these scores are claude-seo heuristics, not Google signals. Google publishes no numeric E-E-A-T weights.

## Content Quality Score: 79/100 (live: 74)

## E-E-A-T Breakdown (51/100)

Weights are this skill's model, with Trust weighted most.

| Factor | Score | Key signals |
|---|---|---|
| Experience | 6/20 | All three service examples are still labelled "Illustrative example" (`content/services.ts:81,149,214`). The cost tables are illustrative too (`guides.ts:47,57`, `audiences.ts:57`). There are no real orders, photos, sample reports or testimonials. The homepage images are AI-generated ("Images are illustrative", `Trade.tsx:87`). |
| Expertise | 19/25 | Content is accurate and specific. Spot-checked: US de minimis for China ended in 2025, the ISF is due 24 h before loading, formal entry applies over US$2,500, UK import VAT is 20% with postponed VAT accounting, and EU VAT runs 17–27%. The AQL table matches ISO 2859-1. Seven authoritative outbound sources are now cited (ISO, ICC Incoterms, USITC HTS, UK Trade Tariff, EU Access2Markets, TARIC, gsxt.gov.cn). There is still no named author. |
| Authoritativeness | 5/25 | `sameAs: []` (`data.ts:30`). No profiles, reviews, press or memberships, and no Bing presence (see geo.md). |
| Trustworthiness | 21/30 | Present: registered address in Chinese and English, full contact details, /about verification route via gsxt.gov.cn, honest fee advice, dated legal pages, visible "Updated" dates, HTTPS. Missing: `licenceNo` (`data.ts:22`), `foundedYear` (`:26`), and your own `commissionRange`/`inspectionRate` (`:126,128`). |

**Who / How / Why test:** *Who* fails, with no person anywhere. *How* is partial: the processes are documented, but there is no first-hand evidence. *Why* passes: the pages are written for buyers, avoid keyword stuffing, and openly warn about bad agents.

## AI Citation Readiness: 83/100 (live: 78)

- Every guide opens with a 40–60-word answer summary and a "Key takeaways" list, uses real `<table>`s and has a Q&A block.
- The new pillar guide `/guides/china-sourcing-agent` (2,611 words) gives a definition-first answer to the head term.
- Homepage FAQ answers are now concrete: "2–4 months, 3–10 days air, 15–45 days sea", MOQ ranges, named regions.
- Remaining gaps: market figures such as the "5–10%" commission and the US$200–350/day rate still have no named source. Tables are still output twice (desktop table plus mobile cards, `Blocks.tsx`).

## What changed vs live (verified in the build)

| Live finding | Local status |
|---|---|
| F2: guides 5–9 inlinks | **Fixed.** `FOOTER_GUIDES` (`links.ts:22`) links all 9 guides from every page (32 inlinks each). |
| F4: 4 titles start "China Sourcing Agent" | **Fixed.** Product-sourcing is now "Find Manufacturers in China: Product Sourcing", and the Amazon and small-business pages were retitled. Only the homepage and pillar guide target the head term (pillar = informational, home = commercial, which is a reasonable split). |
| F5: duplicate H2s | **Fixed** on amazon-sellers ("What we do for Amazon sellers"; the InShort box is now "At a glance"). |
| F7: hotels description 160 chars | **Fixed** (141). Privacy/terms descriptions lengthened (142/140). |
| SXO: no pillar guide; "shipping from china" mismatch | **Fixed.** Pillar guide plus USA/UK/EU shipping guides (1,108–1,307 words each, pairwise overlap 0.05–0.12, so they aren't templated copies). |
| Amazon page thin (910 words) | **Fixed** (1,296). FBA prep list and a landed-cost table were added. |
| `/sourcing-for` 404 | **Fixed.** Hub page added. |
| F3: no human author | **Code ready, data missing.** `ArticleView.tsx` now emits a Person author and a byline from `TEAM[0]`, but `TEAM` is empty, so it falls back to the Organization. |
| F1: no proof / trust data | **Remains** (see below). |

## Content metrics (local build)

| Page group | Words | FRE | Body Jaccard |
|---|---|---|---|
| Home | 1,872 | 51 | n/a |
| 6 service pages | 1,101–1,539 (all ≥ 800 floor) | 49–58 | 0.01–0.03 |
| 9 guides | 1,089–2,611 | 55–64 | 0.00–0.12 |
| 3 sourcing-for pages | 894–1,296 | 46–61 | 0.01–0.03 |
| Hubs (/services, /sourcing-for, /guides) | 378–861 | 32–50 | n/a |

- No thin or duplicate pages.
- Six guides are under the 1,500-word blog floor (1,089–1,352). That floor is a coverage guide, not a target, and these cover their topics. The freight-forwarder guide (1,089) is the best candidate to extend.
- The hub pages have low FRE because they are made of list fragments (average sentence 31–34 words). That is expected for an index page.
- AI-typical phrasing is close to nil: 0–3 hits per page ("whether you", "leverage"), and 0 em dashes.

## Issues found

| Sev | Issue | Evidence | Fix |
|---|---|---|---|
| High | No proof of real work or people | `licenceNo`, `foundedYear`, `sameAs`, `TEAM`, `commissionRange`, `inspectionRate` empty (`data.ts:22,26,30,35,126,128`). All examples illustrative. | Fill in the data, since the rendering and schema code already exist. Add one real person: the guide byline and Person schema then switch on automatically. Replace each illustrative example with a real anonymised order as one completes. Publish a redacted inspection report. |
| Medium | No first-hand imagery | Guides and service pages show only logos; homepage photos are AI-generated. | Real factory, inspection and packing photos with descriptive alts, ideally the same photos referenced in the examples. |
| Medium | EU (and UK) guides miss product-safety obligations | EU guide covers EORI, VAT and duty but not GPSR (EU 2023/988, from Dec 2024: consumer products need an EU-based responsible person and traceability info), CE marking or EPR. UK guide doesn't mention UKCA/CE. Amazon sellers are blocked on exactly these. | Add a short "Product safety and labelling" H2 to both guides, linking to the official EU and GOV.UK pages. |
| Medium | Market figures unsourced | "5–10% commission", "US$200–350 per man-day", MOQ ranges (`guides.ts`, `guide-pillar.ts`). | Cite 1–2 public sources per figure, or label them "based on quotes we've seen in 2026". The second is also an Experience signal. |
| Low | Service examples' text could be mistaken for real cases | The label is present, but the prose ("A café group wanted…") reads as real. | Keep the label until you have real ones. Don't remove it without real data. |
| Low | `updated` dates bumped site-wide to 2026-10-23 | `PAGE_UPDATED` and per-article `updated`. | Fine where the content really changed (it did for the pages checked). Avoid future blanket bumps: Google says dates should reflect substantive changes. |

## Recommendations (in order)

1. Fill in the six empty fields in `data.ts` and add one `TEAM` member. This one data change turns on the byline, Person author, `taxID`, `foundingDate`, `sameAs` and the published rates. *(30 min once you have the details)*
2. Add a GPSR / CE / UKCA "product safety" section to the EU and UK shipping guides. *(1–2 h)*
3. Source or first-person-label the fee figures in the cost guide and pillar guide. *(1 h)*
4. Replace illustrative examples and AI images with real ones as orders complete. *(ongoing)*
5. Commit and deploy the working tree. These scores apply to the local build, not to the live site.
