# Agent Readiness Audit - sinovorex.com (re-audit 2026-10-22)

Category score: 84/100 (previous 78/100, 2026-10-19)

## Measurements
- Lighthouse Agentic Browsing: not obtained. PSI mobile and desktop both HTTP 429 (shared daily quota). No X/N, no Lighthouse version. Not a site defect. Run `npx lighthouse@latest https://sinovorex.com --only-categories=agentic-browsing --output=json` or configure a Google API key.
- Agent-UX heuristic (separate from Lighthouse), status complete: `/` 100/100 (38 buttons, 55 links, 91 interactive nodes, 0 unnamed, 0 unlabeled inputs); `/quote` 100/100 (42 interactive nodes, 0 unnamed, 0 unlabeled; 11 inputs lack ARIA attributes but all are wrapped in `<label>` with visible text).
- agentic_check (facts checked 2026-09-23): server-rendered pass (1,827 words without JS), robots reachable pass, llms.txt pass, real 404 pass, others info/not present.

## Access policy (robots.txt: `User-agent: *  Allow: /  Disallow: /api/`)
- Training crawlers (GPTBot, ClaudeBot, Google-Extended, CCBot): allowed via * group; no named groups, no Content-Signal.
- Search crawlers (Googlebot, Bingbot, OAI-SearchBot, PerplexityBot): allowed.
- User-triggered agents (ChatGPT-User, Claude-User, Perplexity-User): allowed at root. Vendors differ on honouring robots.txt for these.

## Old findings status
- FIXED: llms.txt (was 404, now 200, 4,353 bytes, passes Lighthouse rules; lists services and guides).
- FIXED: quote form only reachable after a JS click in a modal. Now a real page `/quote` (`app/quote/page.tsx`, `components/sinovorex/QuoteForm.tsx`) with a server-rendered `<form action="/api/contact" method="post" enctype="multipart/form-data">` (QuoteForm.tsx:102), so non-JS agents can see and submit it.
- REMAIN: no Content-Signal, no Markdown delivery (index.md 404, no Vary: Accept, no alternate link), no WebMCP, no ai-catalog.json (404), no /.well-known documents (security.txt, api-catalog, mcp.json all 404). All opportunities, not defects.
- NEW: llms-full.txt 404 (optional).

## Findings
No P0/P1 defects.

P2 (usability of quote form for agents)
- Label association is implicit (input wrapped in `<label>` with a `<span>` caption, QuoteForm.tsx:27-32; incoterm at :118-122). Works in the accessibility tree (0 unlabeled). Placeholders are `text-transparent` and differ from labels ("Product" placeholder vs label), harmless. Improvement: add `autoComplete` on remaining fields and `aria-describedby` for hints (QuoteForm.tsx:32). Low effort.
- Honeypot field `website` (QuoteForm.tsx:104) is `aria-hidden` and `tabIndex=-1` but still in the DOM; an agent that fills every field would trigger spam rejection. Add a visible-to-AT-free hiding (`hidden`/`display:none` is bad for bots but fine; current off-screen approach is correct). Document that agents should leave `website` empty; no change required beyond awareness.
- Submit handler uses JS fetch (QuoteForm.tsx:71) with native POST fallback. Good. The multipart upload input is `sr-only` with an external label (QuoteForm.tsx:130, id `quote-files`), fine.

P3 (optional discovery layer; draft/proposal status as of 2026-09-23 vendor matrix)
- Content-Signal (Cloudflare policy, IETF draft; Google does not act on it): add to `app/robots.ts:6` only if you want a stated preference. Next.js `MetadataRoute.Robots` has no Content-Signal field; would need a `route.ts` returning text robots.
- WebMCP (W3C CG draft, not a standard; WebKit opposes): annotate the `/quote` form with `toolname`/`tooldescription` or register an imperative tool. Opportunity only.
- Markdown delivery (community practice, no consumer agent confirmed): optional `.md` siblings or Accept negotiation.
- ai-catalog.json and /.well-known/api-catalog: drafts, low value for a lead-gen site with no public API. Skip unless you expose one.
- Named robots groups: only needed if training and search policy should differ.

## What works
Full server rendering, clean a11y tree on both pages, real 404s, valid sitemap and llms.txt, native-POST quote form, `/api/` disallowed from crawling.
No ranking, citation or traffic effects are promised by any item above.
