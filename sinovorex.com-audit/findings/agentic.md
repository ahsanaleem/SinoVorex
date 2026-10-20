# Agent Readiness Audit — sinovorex.com

**Score: 78/100**

Checked 2026-10-19. Tools: `lighthouse_agentic.py` (PSI, failed — quota),
`agentic_check.py` (full JSON in `agentic_check.json`), `agent_ux_check.py`
(full JSON in `agent_ux_check.json`), plus manual review of
`components/sinovorex/ContactModal.tsx`, `components/sinovorex/Nav.tsx`,
`app/robots.ts`, `app/layout.tsx`, and live `curl` probes of all 9 pages
(`/`, 6 `/services/*`, `/privacy`, `/terms`).

The site has a genuinely solid foundation for agents — real server-rendered
text on every page, a clean accessibility tree, a reachable and permissive
`robots.txt`, real 404s — but none of the optional agent-discovery layer
(llms.txt, Content-Signal, Markdown, WebMCP, `/.well-known`) is present, and
the one transactional surface on the site (the "Get a Quote" lead form) only
exists in the DOM after a client-side click, so agents that don't execute a
click action never see it.

---

## 1. Lighthouse Agentic Browsing fraction — not obtained

```
"C:/Users/User/.claude/plugins/cache/agricidaniel-claude-seo/claude-seo/2.4.2/scripts/claude-seo" run lighthouse_agentic.py https://sinovorex.com --strategy both --json
```

Both `psi-mobile` and `psi-desktop` returned **HTTP 429 — "Quota exceeded for
quota metric 'Queries' and limit 'Queries per day'"** on the shared anonymous
PSI quota. No Lighthouse version or `X/N` fraction could be retrieved for
either form factor. This is a testing-environment limitation, not evidence
about the site.

**To get the real fraction:** configure a Google API key (`/seo google
setup`) to move off the shared quota, or run Lighthouse locally:
```
npx lighthouse@latest https://sinovorex.com --only-categories=agentic-browsing --output=json
```
then `lighthouse_agentic.py --from-json <file>`. Do not substitute the
Agent-UX heuristic below for this number — they measure different things.

---

## 2. Agent-UX heuristic (local 0-100, separate from Lighthouse)

**Homepage (`/`), default (closed) state: 100/100, `score_status: complete`**

| Metric | Value |
|---|---|
| Real `<button>` elements | 38 |
| Real `<a href>` elements | 30 |
| `div onclick` widgets (anti-pattern) | 0 |
| Semantic landmarks | 18 |
| Inputs missing ARIA / missing `<label>` | 0 / 0 |
| Accessibility-tree nodes | 1,923 (66 interactive) |
| Unnamed interactive nodes | 0 |

**Caveat (important):** `agent_ux_check.py` snapshots the page as first
rendered. It scores the homepage with the quote-request modal **closed** and
the mobile hamburger menu **closed**, because both are conditionally mounted
by React and don't exist in the DOM until a click fires. The 100/100 score is
real for what it measured (the always-visible homepage shell: hero, services
grid, desktop nav, footer) but it does **not** certify the modal's contents
or the mobile overlay menu — see §4. I did not re-run `agent_ux_check.py`
against the 6 service pages / privacy / terms individually (time-boxed); I
instead verified their text presence and server-rendering status directly
(§3), since they share the same `Nav`/layout shell already scored above.

---

## 3. Server rendering, robots.txt, discovery files (`agentic_check.py`)

### What works

- **Server-rendered content on every page tested.** `server-rendered` check:
  **pass** on `/` (1,488 words without JS). Spot-checked directly with
  `agentic_check.py` on three more templates — all pass, no JS-shell marker:
  - `/services/product-sourcing`: 267 words without JS
  - `/privacy`: 528 words without JS
  - `/terms`: 318 words without JS
  - (all 6 `/services/*` and `/privacy`, `/terms` confirmed `HTTP 200` with
    real page-specific text and a page-specific `<link rel="canonical">` via
    direct `curl`)
- **`robots.txt` reachable and simple:** `HTTP 200`, one group (`User-agent:
  *`), `Allow: /`, `Disallow: /api/`, valid `Sitemap:` pointer. No AI
  crawler is blocked at the root — training (`GPTBot`, `ClaudeBot`, `CCBot`),
  search (`OAI-SearchBot`, `Claude-SearchBot`, `PerplexityBot`), and
  user-triggered tokens (`ChatGPT-User`, `Claude-User`, `Perplexity-User`,
  `Google-Agent`) all fall through to the permissive `*` group.
- **Real 404s:** an unknown path returns `404` with a distinct body, not a
  catch-all `200` (`http-404`: pass). This matters because a catch-all `200`
  would also break the `llms-txt`/`ard-schema` Lighthouse audits.
- **No `div onclick` anti-patterns, no unnamed interactive elements, no
  inputs missing labels anywhere the tools reached.**
- Honeypot field in the quote form (`name="website"`) is correctly
  `aria-hidden` and visually off-screen, so it's excluded from the
  accessibility tree — it won't confuse a legitimate agent, only scripted
  spam.

### Findings by priority

**P1 — No deliberate robots.txt groups or Content-Signal (opportunity, not
a defect).**
Evidence: `robots-ai-groups` → `named_groups: []`; `content-signal` →
`lines: []`. Every agent (training, search, and user-triggered) currently
gets the identical blanket `Allow: /`. That is a valid, permissive policy —
it is not broken — but it means there is no way to say "yes to AI search
citation, no to training" or vice versa without editing the single `*`
group.
*Fix:* if Sino Vorex wants to differentiate, add named groups per token and
a `Content-Signal` line (e.g. `Content-Signal: search=yes, ai-input=yes,
ai-train=no`) to each. This is a Cloudflare/IETF-draft preference Google has
said it does not act on — it signals intent, it does not enforce it.

**P1 — No `llms.txt` (opportunity).**
Evidence: `GET /llms.txt` → `404`; `GET /llms-full.txt` → `404`.
Lighthouse drops this audit from the Agentic Browsing fraction when absent
rather than failing it. No consumer agent is confirmed to read it (Google
Search ignores it); it is a community convention, not a standard.
*Fix (optional):* publish one with an H1, a `>` one-line summary, and
Markdown links to the 6 service pages, `/privacy`, `/terms`.

**P1 — No Markdown delivery (opportunity).**
Evidence: no `Vary: Accept`, no `rel="alternate" type="text/markdown"`, and
`/index.md` → `404`. No primary source shows a consumer agent sending
`Accept: text/markdown` today, so this is a low-regret, low-urgency item.

**P2 — The "Get a Quote" form only exists in the DOM after a click; it is
invisible to any agent that doesn't perform that click.** See §4 — this is
the most concrete, site-specific finding in this audit.

**P2 — No WebMCP tool registered for the quote-request form.**
Evidence: `webmcp-tools` → `registerTool_call_sites: 0`, `forms: 0` (the
static scanner also can't see the form — same root cause as the item
above). WebMCP is a W3C Community Group draft, not a standard (WebKit
opposes it, Mozilla is neutral, and only ChatGPT desktop's browser calls
tools by default per the vendor matrix, checked 2026-09-23). This is a real
"transactional form with no agent tool" gap worth knowing about, but it is
an enhancement, not a missing baseline.

**P2/P3 — No `/.well-known` discovery files (`api-catalog`,
`oauth-protected-resource`, `oauth-authorization-server`, `agent-card.json`,
`ucp`), no `ai-catalog.json`.**
All `404`, and the tool correctly marks all of these `status: na` — Sino
Vorex runs no API, no OAuth-protected resource, no A2A agent, and is not an
e-commerce storefront (UCP). Nothing to fix here; listed only for
completeness.

---

## 4. The quote-request modal and nav — accessibility-tree detail

Reviewed directly: `components/sinovorex/ContactModal.tsx`,
`components/sinovorex/Nav.tsx`.

**What's good, once opened:**
- The dialog uses `role="dialog" aria-modal="true" aria-label="Request a
  quote"` — a real modal pattern, not an unlabelled `<div>`.
- Every field uses a real `<label>` wrapping its `<input>`/`<textarea>`
  (floating-label pattern that still keeps the native label-input
  association) with `required` set natively on required fields (axe's
  `label` rule is satisfied).
- Fields are grouped under two `<fieldset>`/`<legend>` pairs ("Your
  product", "Your details") — good structure for a long form.
- The close button (`<button aria-label="Close">`) and the hamburger
  (`<button aria-label="Open/Close menu">`) both have real accessible
  names; the error banner uses `role="alert"`.
- The honeypot is `aria-hidden` (see §3).
- Desktop nav links are real `<a href="/#id">` elements always present in
  the HTML (just CSS-hidden under the `xl` breakpoint) — not JS-conditional.

**The finding:** `ContactModal` is only mounted in JSX when its `open` state
is `true` (`{open && (<div role="dialog">...)}`), and `open` starts `false`.
Confirmed live: a raw `curl` of `https://sinovorex.com/` contains the text
"Request a quote" only as link/CTA copy (e.g. `Request a quote for your
product`), **not** `role="dialog"`, **not** the `id="quote-files"` file
input, and none of the form's labels or `<fieldset>`s. The same applies to
the mobile hamburger overlay (`{menuOpen && (...)}`). Both require a click
on a real, well-labelled `<button>` before they exist in the DOM at all.

**Why this matters, scoped honestly:** agents that execute JavaScript and
can click real elements (most interactive "computer use" style browsing —
the audience this skill is written for) will have no trouble: "Get a Quote"
is a genuine `<button>` with an accessible name, not a disguised `<div>`.
But any agent that only fetches and parses static or server-rendered HTML
(a one-shot summarizer, a non-interactive crawler, or a fetch-only
"user-triggered" mode) will never see that Sino Vorex has a quote-request
form at all, let alone what fields it asks for — because the only mention
of it in the raw document is marketing copy, not form markup. This is a
reasonable, standard engineering pattern (lazy-mount a modal), not a broken
one, but it is the single biggest gap between "this page reads as
agent-ready" and "an agent can actually describe or fill this form without
taking an action first."

*Fix options, in order of effort:*
1. Lowest effort: none required if the only goal is interactive-agent
   support — the button and dialog are already correctly built for that.
2. If fetch-only/summarizer agents should be able to describe the offer:
   give the quote request its own real route (e.g. `/quote`) that
   server-renders the same form, and have the modal link to it as a
   progressive enhancement (deep-linkable, crawlable, still openable
   in-place for JS clients).
3. If WebMCP is worth adopting for this one form (P2 above): register an
   imperative tool bound to the same `/api/contact` handler the UI already
   calls, so a tool-calling agent can submit a quote request without
   needing to drive the UI at all. Read `references/webmcp.md` before
   drafting; keep a human-confirmation step since this sends a real lead
   email.

---

## 5. Access policy (reported separately, never merged)

- **Training:** allowed. `GPTBot`, `ClaudeBot`, `CCBot` all fall through to
  the permissive `*` group (`Allow: /`, `Disallow: /api/` only); no
  `Content-Signal: ai-train` line exists to state a preference either way.
- **Search (AI citation/indexing):** allowed. `OAI-SearchBot`,
  `Claude-SearchBot`, `PerplexityBot` are unblocked at the root; honouring
  `robots.txt` for these is a vendor-documented behaviour, not an
  enforcement guarantee.
- **User-triggered (an agent acting on a person's request):** allowed by
  `robots.txt`, but `robots.txt` is not the real control here —
  `Claude-User` is documented to honour it, while `Perplexity-User` and
  `Google-Agent` are documented to generally ignore it, and `ChatGPT-User`'s
  compliance "may not apply" per vendor docs (source: `vendor-matrix.md`,
  checked 2026-09-23). Nothing on this site is private, so this is informational,
  not a gap: there is no path here that should be gated by authentication
  instead of `robots.txt`.

---

## 6. Standards-status notes (dated per `vendor-matrix.md`, checked 2026-09-23)

- **WebMCP:** W3C Community Group draft, not a shipped standard. Chrome ran
  an origin trial (M149–M156, no ship milestone announced); WebKit opposes
  it on the grounds that agents should use the accessibility tree instead
  of a parallel tool layer; Mozilla is neutral/not implementing. Only
  ChatGPT desktop's built-in browser is documented to call WebMCP tools by
  default among the vendors tracked.
- **Content-Signal:** a preference under Cloudflare's CC0 policy and an
  IETF individual draft that expired 2026-04-04; not enforcement. No Google
  statement was found, and Google's robots.txt spec does not list the
  field.
- **ai-catalog.json (Agentic Resource Discovery):** ARD spec 1.0, checked by
  Lighthouse 13.5's `ard-schema` audit, but not applicable here — Sino Vorex
  has no MCP server, A2A agent, or published skills to list.
- **llms.txt:** community convention (llmstxt.org), not a standard; Google
  Search does not use it; Lighthouse checks its format if present.

No claim in this report should be read as a promise of ranking, citation,
or traffic impact from any item above.

---

## 7. Score rationale: 78/100

Strong floor (server rendering, accessibility tree, permissive and reachable
robots.txt, real 404s, no anti-pattern widgets) keeps this well above a
failing score. Points withheld for: the quote-request form's total absence
from static/server-rendered HTML (§4, the most concrete site-specific gap);
the full agent-discovery layer being unaddressed across the board
(Content-Signal, llms.txt, Markdown, WebMCP, well-known docs) — each one
individually an opportunity rather than a defect, but together they mean
Sino Vorex has made no deliberate statement to any AI agent about how it
wants to be used; and the inability to confirm the Lighthouse Agentic
Browsing fraction and CLS (both blocked by PSI quota, not a finding about
the site itself).
