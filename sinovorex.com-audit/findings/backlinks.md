# Backlink Profile: sinovorex.com

Audit date: 2026-10-19. Status: FINAL (Tier 0 — no Moz / Bing / DataForSEO keys configured; `backlinks_auth.py --check` confirms tier 0, "Basic: Common Crawl + Verify only").

## What was measurable

| Check | Tool | Result |
|---|---|---|
| Domain-level web graph presence (PageRank, harmonic centrality) | Common Crawl Web Graph (`commoncrawl_graph.py sinovorex.com`) | **Not found.** `in_crawl: false`, `in_rankings: false`, all rank/centrality fields `null`, against the latest release `cc-main-2026-jan-feb-mar`. |
| Same check on the pre-rebrand domain, for context | `commoncrawl_graph.py tradevorex.com` | Also **not found** — same `in_crawl: false` / `in_rankings: false` result. |
| Site liveness / crawlability sanity check | `curl --noproxy '*'` | `https://sinovorex.com/` returns HTTP 200; `robots.txt` allows `/` (disallows `/api/`) and references `https://sinovorex.com/sitemap.xml`; sitemap lists the homepage and 6 `/services/*` pages with `lastmod` 2026-10-18. |
| Known-backlink verification | `verify_backlinks.py` | **Not run** — this script requires a `--links` JSON file of candidate source URLs (`[{"source_url": "..."}]`). No known or claimed backlinks were supplied for this audit, and Tier 0 has no API that can *discover* a referring-domain list (Common Crawl's `--top-referrers` flag is explicitly a "legacy no-op" in this build; it returns rank/presence only, not an edge list). |
| Moz DA/PA, spam score, referring domains, anchor text | Moz API | Not available — no `MOZ_API_KEY` configured. |
| Bing inbound links | Bing Webmaster API | Not available — no `BING_WEBMASTER_API_KEY` configured, and even if it were, Bing Webmaster data is only valid for a property actually verified in that Bing account, not for comparing against an arbitrary competitor. |
| DataForSEO (referring domains, domain quality distribution, anchor naturalness, toxic ratio, link velocity, follow/nofollow, geography) | DataForSEO MCP | Not available at this tier. |

Report data was passed through `validate_backlink_report.py`: **status PASS** (1 info-level note, already applied below: do not interpret "not in Common Crawl" as "low authority" — it means uncrawled, not penalized).

## Findings

### C1. Zero referring-domain visibility — true backlink count is unknown (Critical, Data coverage)
**Evidence:** At Tier 0 there is no source capable of listing a single referring domain for sinovorex.com. Common Crawl's web graph only returns domain-level PageRank/harmonic-centrality *if* the domain was crawled, and here it was not (`in_crawl: false`). The verification crawler can only confirm or refute a list of URLs the analyst already knows about, and none were supplied. Moz/Bing/DataForSEO, which are the only sources in this skill that actually enumerate referring domains, are not configured.
**Recommendation:** Do not report a referring-domain count or a numeric backlink health score from this audit — any number would be fabricated. To get real visibility, do one of:
1. Sign up for the free Moz API tier (2,500 rows/month, https://moz.com/products/api) and re-run `moz_api.py domains https://sinovorex.com --json`. This is free and is the fastest unblock.
2. Verify sinovorex.com in Bing Webmaster Tools (free, https://www.bing.com/webmasters) and run `bing_webmaster.py links https://sinovorex.com --json`.
3. If any outreach, directory, or press links are already known (e.g. from past PR, supplier directories, or Google Search Console "Links" report), supply them as a JSON list and re-run `verify_backlinks.py --target https://sinovorex.com --links <file> --json` to confirm which are still live.

### H1. Domain is completely absent from Common Crawl — consistent with a brand-new, unindexed site (High, Authority / Discoverability)
**Evidence:** Both the current domain (sinovorex.com) and the prior brand (tradevorex.com) return `in_crawl: false` and `in_rankings: false` against Common Crawl's latest release (cc-main-2026-jan-feb-mar). Per `validate_backlink_report.py`'s own rule, this must **not** be read as "low authority" — Common Crawl simply hasn't fetched the domain yet, which is expected for a very new site/rebrand (git history shows the "Rebrand to Sino Vorex" commit, and the current sitemap's `lastmod` is 2026-10-18, i.e. yesterday relative to this audit). It is also possible Common Crawl never indexed tradevorex.com because that brand itself was short-lived.
**Confidence:** 0.50 (Common Crawl, domain-level, source: https://commoncrawl.org/web-graphs, quarterly release cadence).
**Recommendation:** This is a discoverability/age issue, not a link-quality issue — treat it as "no data yet" and recheck in 2-3 months once the site has had time to be crawled and to accumulate any inbound links. In parallel, submit the sitemap in Google Search Console and Bing Webmaster Tools now so both engines discover the new domain faster (this also unlocks the free Bing links report referenced in C1).

### H2. No inbound-link acquisition infrastructure visible on-site (High, Link building readiness)
**Evidence:** `robots.txt` and the sitemap are correctly configured and the site is live (HTTP 200), so there is nothing *blocking* crawlers from finding the site once links exist. But the sitemap only contains the homepage and 6 `/services/*` pages — there is no blog, resources, guides, or case-study hub that would normally be the asset other sites link to. (Consistent with the content-findings report: no case studies, testimonials, or named-author content exist yet — see `findings/content.md` C1/H1.)
**Recommendation:** Before investing in outreach, create at least one linkable asset class relevant to B2B China sourcing, for example:
- A "China sourcing cost/Incoterms calculator" or a downloadable factory-audit checklist (PDF) — these attract natural links from procurement blogs and import/export forums.
- 2-3 anonymized case studies (as already recommended in the content audit) — these are frequently cited/linked by review sites and B2B marketplaces.
- A short "glossary" or "FAQ" hub for Incoterms/AQL/freight terms, which tends to attract links from logistics and trade-education sites.

## Practical link-acquisition recommendations for a B2B China sourcing agency

These are prioritized by typical cost/effort vs. relevance for this vertical. None of these were measured — they are standard practice recommendations, not derived from the (empty) backlink data above.

1. **B2B directories and marketplaces (High priority, low cost).** Claim/complete listings on Alibaba, Global Sources, Made-in-China, ImportGenius-type directories, Clutch, GoodFirms, and sourcing-agent-specific directories (e.g. "best China sourcing agents" listicles). These are typically dofollow or at minimum drive referral traffic and brand search volume, and they are the links a buyer doing diligence on a new agency actually expects to see.
2. **Industry associations and chambers of commerce (Medium-High priority).** Membership in a trade association (e.g. a sourcing/import-export chamber, or a Suzhou/Jiangsu foreign trade association given the company's registered address) often comes with a member directory link — relevant, high-trust anchor for a new entity with no track record yet.
3. **Guest contributions to logistics/procurement trade publications** (e.g. supply-chain or import/export trade blogs) on topics like Incoterms selection, AQL sampling, or factory-audit red flags. This doubles as the "expertise" content the content-audit (C1/M3) already flagged as missing — write it once, publish both on-site and as a guest piece.
4. **Press / launch coverage for the rebrand.** A short "Tradevorex is now Sino Vorex" press item distributed to startup/SME and trade-press outlets can pick up a handful of referring domains and is a natural, low-risk link source for a company that just rebranded.
5. **Supplier/partner reciprocal mentions — but avoid reciprocal link schemes.** If Sino Vorex has verified factory or freight-forwarder partners, a mention on the partner's "our clients/partners" page is legitimate, but do not set up systematic two-way "partners" link pages with unrelated sites; that pattern is exactly what Moz Spam Score and manual reviewers penalize.
6. **Avoid any paid link networks or PBNs.** Given the company handles buyer deposits and trust is already the weakest area per the content audit (E-E-A-T composite 35/100), a toxic-link penalty on top of a trust deficit would compound the credibility problem. Keep link building to verifiable, relevant, editorially-earned placements.
7. **Re-run this analysis quarterly with at least a free Moz key once the site has a few months of age** — at the moment there are zero data sources that can show referring-domain count, quality distribution, anchor naturalness, toxic ratio, link velocity, follow/nofollow ratio, or geography, so none of those 7 scoring factors can be weighted. Re-running after (a) Moz/Bing keys are added and (b) the site has been live long enough to be crawled will convert this from "insufficient data" to an actual scored audit.

## Backlink Health Score

**Not Assessed / INSUFFICIENT DATA.** 0 of 7 scoring factors (referring domain count, domain quality distribution, anchor text naturalness, toxic link ratio, link velocity trend, follow/nofollow ratio, geographic relevance) have any data source at this tier for this domain. Per the Tier 0 rule, no numeric score is produced — producing one with 0/7 factors populated would be misleading. This was confirmed by `validate_backlink_report.py` (status PASS, score left `null`).

## Source confidence legend

- Common Crawl (domain-level): confidence 0.50, source https://commoncrawl.org/web-graphs, quarterly releases, used here: `cc-main-2026-jan-feb-mar`.
- Direct HTTP check (`curl --noproxy '*'`): confidence 0.95 (directly observed, not inferred).
- Moz / Bing / DataForSEO: not used this run (no credentials / no known-links input).

## Cross-references

- For E-E-A-T / trust-signal gaps that make link building harder right now (no case studies, no named team, empty licence number), see `findings/content.md`, finding C1.
- For crawlability/sitemap basics (already healthy and not a blocker to link building), see `findings/sitemap.md`.
- This report does not duplicate on-page content or technical-crawlability analysis — see `/seo content` and `/seo technical` outputs for those.
