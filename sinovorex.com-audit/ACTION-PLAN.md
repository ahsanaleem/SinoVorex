# Action Plan: sinovorex.com (2026-11-01)

SEO Health Score **85/100** (10-22: 81). No Critical items. Ordered by impact ÷ effort.

## Critical
None. All 45 indexable pages return 200, are server-rendered, canonicalised and in the sitemap.

## High (this week)
1. **Fill in the trust data** in `components/sinovorex/data.ts`: `licenceNo` (:22), `foundedYear` (:26), `sameAs` (:28), `TEAM` (:32), `commissionRange` (:147), `inspectionRate` (:149). *30 min, plus gathering the data.*
2. **Named author**: put a real person in `TEAM`, change the Article `author` to a Person in `ArticleView.tsx` (~:29), and show a byline and "Reviewed by" on guides. *2 h.*
3. **Cite sources** in every guide: 1–3 primary sources each (CBP/USITC, HMRC, EU TARIC, SASO/SABER, ISO 2859-1, the Canton Fair official site). *1 day.*
4. **Real proof**: replace the 3 "Illustrative example" notes (`content/services.ts:82,150,215`) with real anonymised orders, fill `content/case-studies.ts` so `/case-studies` goes live, and publish a redacted inspection and audit report. *1–3 days.*
5. **Off-site entity and verification**: LinkedIn page, Google Business Profile, 1–2 B2B directories → `sameAs`. Confirm GSC and Bing verification (no meta tags live), submit the sitemap and run `npm run indexnow`. *1–2 days.*

## Medium (within a month)
6. **Contrast**: use `flame.deep` (#E8501A) or darker for flame text and button backgrounds behind white text, and lighten the footer's `#7a7a7f` slightly (`tailwind.config.ts:16`). *15 min.*
7. **Internal links** to under-linked pages: Keqiao (3 inlinks), `/sourcing-for/*` (4–5), the UK and Europe shipping guides (6), the small-business guide (8), freight-forwarder-vs-agent (9). *30 min.*
8. **Publish pricing ranges** (commission %, inspection per man-day) on the service pages and in the cost guide. *1 h.*
9. **Deepen the market pages** (620–800 main words) with ports, transit times, duty tables for top HS codes and local certification steps. *1–2 days.*
10. **Real photography** of the team, office, inspections and factory visits, with descriptive alt text. *Ongoing.*
11. **Original data asset**, e.g. inspection failure-rate statistics, so AI engines and journalists have something to cite. *1–2 days.*

## Low (backlog)
- Redirect `http://www` to apex in a single hop (it currently takes 2) via the Vercel domain redirect.
- Shorten 6 titles over 60 characters (/services, /sourcing-for, /guides/yiwu-market-guide, /markets/uae, /markets/saudi-arabia, /markets/pakistan).
- Fix `<ol>` with `<div>` children in `Services.tsx:32`.
- Decide on `Content-Signal` in robots.txt. Lighthouse SEO flags it (92 → 100 if removed), but Google ignores it.
- Shrink the homepage HTML (328 KB): move the large inline SVGs to static files and cut the client-component payload; set a modern `browserslist` (11 KB of polyfills).
- Shorten the hero `sv-rise`/`sv-fade` animations on mobile (Speed Index 3.7 s).
- Make sure every sitemap route is pre-rendered and warm it after deploy (several cold fetches took 2–13 s).
- Optional: `/.well-known/ai-catalog.json`, WebMCP annotations on the quote form.
- Don't add FAQPage markup expecting rich results (Google retired them on 2026-05-07).

## Monitoring
- Capture a drift baseline: `/claude-seo:seo-drift baseline https://sinovorex.com`.
- Add a PSI API key (the daily quota was exhausted today) and Google API credentials to get CrUX, GSC and GA4 data at the next audit.
- Re-audit in about 6 weeks, after the trust data and off-site profiles are live.
