# GEO / AI Search Readiness: sinovorex.com

Audit date: 2026-10-19. Pages checked: /, 6 x /services/*, /privacy, /terms (all HTTP 200, served by Vercel, Next.js SSR).
Method: robots.txt/llms.txt/RSL probes using curl; every page fetched with render_page.py (`--mode auto`, raw SSR was used and no SPA shell was detected); source code read (app/robots.ts, components/sinovorex/Trade.tsx); off-site checks on Wikipedia, Wikidata, Bing, YouTube, LinkedIn, Reddit and Wayback.

## GEO Readiness Score: 46 / 100

| Dimension | Weight | Score | Weighted |
|---|---|---|---|
| Citability | 25% | 40 | 10.0 |
| Structural Readability | 20% | 55 | 11.0 |
| Multi-Modal Content | 15% | 35 | 5.3 |
| Authority & Brand Signals | 20% | 20 | 4.0 |
| Technical Accessibility | 20% | 80 | 16.0 |
| **Total** | | | **46** |

Platform estimates: Google AI Overviews 45, Perplexity 40, ChatGPT Search 35, Bing Copilot 30. ChatGPT and Copilot score lower because both lean on the Bing index, and a `site:sinovorex.com` query on Bing returned no sinovorex.com pages.

## What works

- **Crawler access is open.** robots.txt (`User-Agent: * / Allow: / / Disallow: /api/`) lets in every AI crawler. No bot is named, so the wildcard rule covers all of them. The sitemap is listed and holds all 9 URLs.
- **Content is server-rendered.** Every page returns its full text in the raw HTML (`is_spa: false`), so crawlers that do not run JavaScript (GPTBot, ClaudeBot, PerplexityBot and others) can read it.
- **Organization JSON-LD is on every page** with name, legalName (苏州智贸通贸易咨询服务有限公司), full Suzhou PostalAddress, phone, email, and a ContactPoint listing English and Chinese. This is a strong base for entity matching.
- **The homepage has some quotable answers:** sea freight "approx. 15–45 days", plain definitions of the FOB, CIF and DDP Incoterms, how the commission works, deposit and balance terms, and how MOQs are set.
- **Each page has a unique title, description and canonical.** Service H1s follow the "X in China" pattern, which matches how people search.
- **Category images have descriptive alt text** (for example "Packaging: boxes & cartons, paper & poly bags, labels & stickers, printed packaging").

## AI crawler access

| Crawler | What it governs | Status |
|---|---|---|
| OAI-SearchBot | ChatGPT Search citations | Allowed (wildcard) |
| Claude-SearchBot | Claude search citations | Allowed (wildcard) |
| PerplexityBot | Perplexity search | Allowed (wildcard) |
| Googlebot | Google Search and AI Overviews | Allowed (wildcard) |
| Bingbot | Bing and Copilot grounding | Allowed (wildcard) |
| Applebot | Siri, Spotlight, Safari | Allowed (wildcard) |
| GPTBot | OpenAI training only | Allowed (optional to block) |
| ClaudeBot | Anthropic training only | Allowed (optional to block) |
| Google-Extended | Gemini/Vertex training and grounding; not Search or AIO | Allowed (optional) |
| Applebot-Extended | Apple Intelligence training only | Allowed (optional) |
| CCBot, cohere-ai | Training | Allowed (optional) |

No change is needed. Blocking the training crawlers is a business choice and does not affect search visibility.

## llms.txt / RSL

- `/llms.txt`: 404. `/llms-full.txt`: 404.
- RSL licensing: `/license.xml` and `/.well-known/rsl.xml` both return 404, and robots.txt has no License directive.
- llms.txt is an optional proposal. Google Search ignores it and no major AI search engine has said it uses it, so the 404 is **Info** severity only. Adding a short file is a low-cost nice-to-have.

## Findings

### GEO-01: 6 of the 7 FAQ answers are missing from the HTML (High)
- **Evidence:** The SSR HTML has all 7 questions ("Can I get samples before ordering?", "How do payments work?", "How long does an order take?", "Who pays for shipping?", "What happens if goods are faulty?", "Which countries do you ship to?") but only the first answer (MOQ). `components/sinovorex/Trade.tsx` lines ~228-248 use `{isOpen && (...)}` inside `AnimatePresence`, so closed answers are never mounted. Crawlers that do not run JavaScript get no answers. Even Googlebot only sees them after a click it will not make.
- **Why it matters:** These are exactly the question-and-answer pairs AI engines quote, such as "how long does sourcing from China take" or "what happens if goods are faulty".
- **Fix:** Always render every answer in the DOM and collapse it with CSS (`hidden`, height 0 plus `overflow-hidden`, or native `<details>`/`<summary>`). Mark each question as an `<h3>` inside the button, or next to it. Effort: about 1 hour.

### GEO-02: No off-site brand footprint; the entity is unknown to AI engines (High)
- **Evidence:** Wikipedia search for "Sino Vorex": 0 hits. Wikidata: 0 entities. A Bing search for "Sino Vorex" OR "sinovorex" returned only unrelated results. Bing `site:sinovorex.com` returned no sinovorex.com pages. `youtube.com/@sinovorex`: 404. Wayback Machine: no snapshots. LinkedIn returned 999 (bot block, so unconfirmed) and Reddit blocked the scripted search (unconfirmed). The Organization schema has no `sameAs`. The only external links on the site are wa.me WhatsApp links.
- **Why it matters:** Brand mentions on YouTube, Reddit and Wikipedia-type sources track AI citations far more closely than backlinks do. If an engine cannot confirm "Sino Vorex" as a real entity, it is unlikely to recommend it.
- **Fix:** (1) Submit the site in Bing Webmaster Tools (you can import from Google Search Console) and send the sitemap through IndexNow. (2) Create a LinkedIn company page, a YouTube channel (inspection walkthrough videos), and listings on Google Business Profile and B2B directories (Made-in-China, Global Sources, Kompass, Clutch). (3) Add their URLs to `sameAs` in the Organization JSON-LD. (4) Take part genuinely in r/Entrepreneur, r/FulfillmentByAmazon and r/smallbusiness sourcing threads. Effort: 1-2 days to set up, then ongoing. Wikipedia is not realistic yet because notability needs independent coverage. A Wikidata item can come later, once third-party sources exist.

### GEO-03: Service pages are thin (~150 words) and half of each is shared boilerplate (High)
- **Evidence:** Extracted word counts: product-sourcing 158, factory-vetting 152, quality-inspection 155, order-follow-up 147, shipping-coordination 149, samples-consolidation 148. On every service page, the 6-step "Where this fits in the process" list is identical and makes up about 45% of the text. Each page has only a 1-sentence intro, 4 bullets and 1 "What you receive" line.
- **Why it matters:** None of these pages has a standalone answer of about 130-170 words that an engine could quote for queries like "what does a pre-shipment inspection in China include" or "how does a sourcing agent vet a factory". Perplexity and AIO will cite competitors' longer pages instead.
- **Fix:** Add 400-800 words of unique content to each page, opening with a direct 40-60 word answer. Add question H2s such as "What does a pre-shipment inspection check?", "How long does it take?", "What does it cost?" and "What do you need from me?". Use concrete specifics: AQL levels (for example AQL 2.5/4.0 under ISO 2859-1), inspection timing (at 80-100% production), report turnaround, a sample report outline, and freight transit by lane. Effort: 1-2 days of writing.

### GEO-04: No quantified proof, named people or dates (Medium)
- **Evidence:** No founding year, team members, founder bio, case studies, client counts, orders handled, testimonials or certifications appear on any page. The services carry no datePublished or dateModified, and there are no visible "updated" dates. The homepage's only numbers are the transit ranges and the "reply within 24 hours" promise. Fees are described ("commission on order value") but no range is given.
- **Fix:** Add an About/Team section naming a responsible person, with a photo, role and years in sourcing. Add 2-3 anonymised case studies with numbers (product, MOQ, defect rate found, days to ship). Publish a typical commission range (for example "typically 5-10% depending on order size") and add a "Last updated" date to the service pages. Effort: half a day plus content gathering.

### GEO-05: Homepage section headings are slogans, not questions or topics (Medium)
- **Evidence:** The H1 is "The Force Behind Global Trade", and the H2s include "Checked before you pay the balance", "Based in China. Working for you." and "Connected across every major market". The headings contain `&nbsp;` between every word (likely from a word-animation component), so the raw text is "The\xa0Force\xa0Behind...". The FAQ questions are buttons, not headings.
- **Fix:** Use an H1 that names the entity and the category, for example "China Sourcing Agent & Export Partner for Global Buyers". Keep the slogan as a styled subline. Use normal spaces in heading text (split words visually with spans, not NBSP), and turn the FAQ questions into H3s. Effort: 1-2 hours.

### GEO-06: Placeholder and loader text in the SSR HTML (Low)
- **Evidence:** The raw HTML contains the loader text "Loading experience 000". The route widget renders "870 km Local time --:-- vs. China time —" (default China → Seoul) before hydration. A decorative "SinoVorex" footer wordmark (aria-hidden) gives a third spelling of the brand.
- **Fix:** Mark the loader `aria-hidden` and keep its text out of the main content, or render it only on the client. Server-render a real default time or leave it empty. Keep the brand spelled "Sino Vorex" everywhere in crawlable text. Effort: under 1 hour.

### GEO-07: Schema gaps for AI entity and service understanding (Medium)
- **Evidence:** Every page carries only the same Organization block. There is no `sameAs`, `foundingDate`, `founder`, `Service` (per service page), `FAQPage`, `BreadcrumbList` or `WebSite`. Service pages declare `og:type=article` but have no article dates. /privacy and /terms inherit the homepage's og:title and og:url.
- **Fix:** Add `Service` JSON-LD to each service page (serviceType, provider pointing to the Organization @id, areaServed "Worldwide"), plus `BreadcrumbList`. Add an `@id` and `sameAs` to the Organization. FAQPage markup is fine to include for machine readability, even though Google now shows FAQ rich results only for authoritative government and health sites. Change the services' `og:type` to `website`. Coordinate with findings/schema.md. Effort: 2-3 hours.

### GEO-08: Little multi-modal evidence (Medium)
- **Evidence:** Each service page has only 2 images, both of the logo. The homepage has 4 illustrative category images ("Images are illustrative") and a map. There is no video, no sample inspection report, no tables, and no real photos of factories, inspections or the team. `public/hero-bg.mp4` exists but is not in the HTML.
- **Fix:** Add a sample inspection report (redacted PDF or images with a written summary), real factory and inspection photos with descriptive alt text, an HTML `<table>` of transit times and costs by lane (sea, air, rail to the EU, US and Korea), and 1-2 short YouTube videos embedded on the service pages. This also builds the YouTube signal from GEO-02. Effort: 1-3 days.

### GEO-09: llms.txt missing (Info)
- **Evidence:** `/llms.txt` returns 404.
- **Note:** Optional. Google Search ignores it, and it has no confirmed ranking or citation effect on the major engines.
- **Fix (optional):** Add a ~20-line `public/llms.txt` with a one-paragraph description of the company, the 6 service URLs with one-line summaries, contact details, and the legal entity name. Effort: 15 minutes.

## Top 5 highest-impact changes

| # | Change | Impact | Effort |
|---|---|---|---|
| 1 | Render all FAQ answers in the SSR HTML (GEO-01) | High | ~1 h |
| 2 | Submit to Bing Webmaster Tools and IndexNow; create LinkedIn, YouTube and directory profiles; add `sameAs` (GEO-02) | High | 1-2 days |
| 3 | Expand each service page to 500+ unique words with question H2s and direct answers (GEO-03) | High | 1-2 days |
| 4 | Add proof: named team, case studies with numbers, a fee range, updated dates (GEO-04) | Medium-High | 0.5-1 day |
| 5 | Add Service, Breadcrumb and FAQPage schema and an entity-clear H1 (GEO-05, GEO-07) | Medium | 3-4 h |

## Structured findings (for audit-data.json, category "AI Search Readiness")

```json
{
  "category": "AI Search Readiness",
  "score": 46,
  "dimensions": {"citability": 40, "structural_readability": 55, "multimodal": 35, "authority_brand": 20, "technical_accessibility": 80},
  "platform_scores": {"google_aio": 45, "chatgpt_search": 35, "perplexity": 40, "bing_copilot": 30},
  "crawler_access": {"all": "allowed via wildcard", "named_rules": []},
  "llms_txt": "missing (404, optional)",
  "rsl": "missing",
  "findings": [
    {"id": "GEO-01", "severity": "high", "title": "6 of 7 FAQ answers not in SSR HTML (conditional render in Trade.tsx)"},
    {"id": "GEO-02", "severity": "high", "title": "No off-site entity footprint; not found in Bing index; no sameAs"},
    {"id": "GEO-03", "severity": "high", "title": "Service pages ~150 words, ~45% shared boilerplate"},
    {"id": "GEO-04", "severity": "medium", "title": "No named people, case studies, quantified proof or dates"},
    {"id": "GEO-05", "severity": "medium", "title": "Slogan headings with NBSP; FAQ questions not headings"},
    {"id": "GEO-07", "severity": "medium", "title": "Only Organization schema; no Service/FAQPage/Breadcrumb/sameAs"},
    {"id": "GEO-08", "severity": "medium", "title": "No video, tables, sample reports or real photos"},
    {"id": "GEO-06", "severity": "low", "title": "Loader and placeholder text in SSR HTML"},
    {"id": "GEO-09", "severity": "info", "title": "llms.txt missing (optional)"}
  ]
}
```

Limitations: LinkedIn (HTTP 999) and Reddit (blocked) could not be checked automatically, and the Bing results came from scraping, so treat them as directional. Check them by hand in Bing Webmaster Tools and with a logged-in LinkedIn search. DataForSEO tools were not available, so no live ChatGPT visibility sampling was done.
