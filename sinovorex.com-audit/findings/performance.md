# Performance Audit — sinovorex.com

Method: PageSpeed Insights API was unreachable for this audit (shared public quota exhausted:
`429 Quota exceeded ... pagespeedonline.googleapis.com`, confirmed in both this session and a prior
agent's `sinovorex.com-audit/lighthouse.json`). No Google API key / CrUX is configured, so field data
is unavailable. `npx lighthouse` could not be installed (npm registry fetch failed in this sandboxed
network). All metrics below are **lab measurements** from a custom Python/Playwright script driving the
Chromium build already cached under `C:\Users\User\AppData\Local\ms-playwright\chromium-1234`, using the
browser's native `PerformanceObserver` APIs (`largest-contentful-paint`, `layout-shift`, `longtask`,
`event` timing) plus CDP network-condition emulation. This is a single-run lab proxy, not CrUX field
data — treat absolute numbers as directional, the relative pattern (homepage much worse than the
service page, desktop fine but mobile poor) as the reliable signal. INP values are a synthetic
approximation (two scripted clicks + Event Timing API), not real-user INP; marked explicitly below.

Mobile emulation: 412×823 viewport, CPU throttled 4×, network ~1.6 Mbps down / 150 ms RTT
(approximates a mid-tier Android on 4G, not identical to Lighthouse's exact mobile preset).
Desktop emulation: 1350×940 viewport, no throttling.

## Score

| Page | Estimated Performance Score (0-100, lab composite) |
|---|---|
| Homepage (`/`) | **52 / 100** |
| Service page (`/services/product-sourcing`) | **80 / 100** |
| **Site overall (blended, homepage-weighted)** | **~60 / 100** |

These are this agent's lab-composite estimates (weighted the same way Lighthouse weights LCP heaviest,
then TBT/long-tasks, then CLS) because no PSI/Lighthouse score could be generated. Re-run
`pagespeed_check.py` once the shared quota resets, or with a configured Google API key, for an
authoritative score.

## Core Web Vitals (measured, lab)

| Page | Device | LCP | CLS | INP (synthetic) | Verdict |
|---|---|---|---|---|---|
| Homepage | Desktop (no throttle) | **4252 ms — Poor** (>4000 ms) | 0.00003 — Good | 160 ms — Good (borderline) | LCP fails |
| Homepage | Mobile (4×CPU, slow 4G) | **6576 ms — Poor** | 0 — Good | 1224 ms — Poor | LCP + INP fail |
| Service page | Desktop (no throttle) | **1756 ms — Good** | 0 — Good | not captured (no measurable event) | Pass |
| Service page | Mobile (4×CPU, slow 4G) | **3804 ms — Needs Improvement** (2.5-4s) | 0 — Good | 64 ms — Good | CLS/INP pass, LCP borderline |

TTFB (supporting data, all "Good", <0.8s threshold): homepage desktop 484 ms, homepage mobile 574 ms,
service desktop 321 ms, service mobile 439 ms. Hosted on Vercel edge (`hkg1`), `X-Vercel-Cache: HIT` —
origin/server response time is not the bottleneck anywhere.

Long tasks (lab proxy for INP/TBT): homepage desktop 8 tasks / 672 ms total (one early task ~130-200ms
range); homepage mobile 4 tasks / 1734 ms total (one single 760 ms task very early in the timeline);
service page desktop 1 task / 76 ms; service page mobile 10 tasks / 1227 ms. The homepage's mobile
profile shows materially more main-thread contention than the service page.

## What Works

1. **CLS is effectively solved.** Measured 0 (or ~0.00003, noise-level) on every page/device
   combination. No unsized images, no late-injected banners, no layout jumps were observed. Likely
   due to explicit `width`/`height` on `<img>` tags, `min-h-[100svh]` (dynamic viewport unit, avoids
   mobile URL-bar jump) on the Hero section, and the full-screen `PageLoader` being `position: fixed`
   (an overlay, not a layout participant).
2. **TTFB is good everywhere** (321-574 ms, well under the 800 ms "good" threshold), confirming the
   Vercel edge/CDN deployment with cache hits is not a bottleneck.
3. **Fonts are self-hosted and preloaded correctly.** `app/layout.tsx:45-47` builds all three font
   families (`Inter_Tight`, `Instrument_Serif`, `JetBrains_Mono`) via `next/font/google` with
   `display: "swap"`; the rendered `<head>` confirms `<link rel="preload" as="font">` for all 4 woff2
   files (comment in the code even explains this is self-hosted because Google Fonts is blocked in
   mainland China — good operational reasoning that also happens to help CWV). No FOIT risk.
4. **Static assets are Brotli-compressed and immutably cached.** Verified via `curl` headers:
   `Content-Encoding: br`, `Cache-Control: public,max-age=31536000,immutable` on `/_next/static/*`.
   Real wire-transfer size for the homepage's JS is ~212 KB (not the ~668 KB decoded/parsed size) —
   the network payload itself is lean; the problem is CPU time, not bytes.
5. **`components/three/HeroOrb.tsx` / `NeuralNetwork.tsx` (the actual Three.js / `@react-three/fiber`
   code) are dead code** — grep confirms they're only imported by `components/sections/AITech.tsx`,
   which no route (`app/page.tsx` → `TradevorexHome.tsx`, `app/services/[slug]/page.tsx`) imports. The
   "3D globe" in the live hero is `components/sinovorex/HeroGlobe.tsx`, a hand-rolled 2D `<canvas>`
   renderer with manual trig/projection — no `three`, `@react-three/fiber`, or `@react-three/drei`
   bytes ship to the browser today. Likewise `public/portfolio/3inbox.svg` (14 MB!), `Brands.svg`
   (1.8 MB), `1giftee.svg` (812 KB), `public/hero-bg.mp4` (720 KB) and the `frame_*.jpg`/`video_frame*`
   stills are unreferenced by any current route (confirmed by grep and by the network capture showing
   zero requests to them) — they cost nothing in production today, but see Finding 5 below.
6. **`reduce-motion` handled in `HeroGlobe.tsx:343-346`**: with `prefers-reduced-motion: reduce`, the
   globe renders one static frame instead of a perpetual `requestAnimationFrame` loop — good for both
   battery/CPU and respecting user preference.

## Findings (prioritized by severity)

### 1. [CRITICAL] Homepage LCP fails on both mobile and desktop because the Hero's content is deliberately hidden behind a full-screen branded intro animation
**Evidence:**
- `components/sinovorex/chrome.tsx:8-39` (`PageLoader`): on first visit, a full-screen opaque
  (`bg-ink`) curtain with a counting animation runs for `duration: seen ? 0.15 : 0.9` seconds, then the
  curtain itself exits (`transition: { duration: repeat ? 0.45 : 0.6 }`) before calling `onDone()`. That
  is a **hard-coded ≥1.5 s delay** before `ready` flips true, on every first visit in the session
  (`sessionStorage` gates only the *repeat* visit, not the first).
- `components/TradevorexHome.tsx:38` wires `onDone={() => setLoaded(true)}`, and `loaded` is passed
  down as `ready` to `Hero`.
- `components/sinovorex/Hero.tsx:27-31` (`fade()` helper): every piece of Hero content —
  including the H1 `"The Force Behind Global Trade"` (the largest text block on the page, and the
  element most likely to be the LCP candidate once rendered) — starts at `opacity: 0` and only
  animates to `opacity: 1` when `ready` is true, with its own `duration: 1` fade transition stacked on
  top of the loader delay.
- Net effect: the real content cannot complete painting before roughly **intro (0.9s) + curtain exit
  (0.6s) + fade-in (~0.1-1.1s delay/duration) ≈ 2.5-3.5s minimum**, purely from deliberate animation
  timing, before any network/JS-execution cost is even counted. This lines up with the measured
  LCP values (4252 ms desktop unthrottled, 6576 ms mobile throttled).
- Confirms by elimination: the service page (`/services/product-sourcing`) uses `SubpageShell.tsx`,
  which renders **no `PageLoader`**, and its LCP is correspondingly far better (1756 ms desktop, 3804 ms
  mobile) despite sharing the same JS bundle weight — isolating the intro animation, not JS payload, as
  the dominant cause on the homepage.
**Impact:** This is the single biggest lever on the site's Core Web Vitals. Google's field data (CrUX,
once traffic qualifies) will very likely show the homepage failing LCP at the 75th percentile, which
hurts the page-experience ranking signal and real conversion (every added second of LCP delay
measurably increases bounce rate).
**Recommendation:**
- Stop gating the Hero's **first paint** behind `ready`. Render the H1/subhead/CTA content at
  `opacity: 1` by default in the server-rendered HTML (or with a near-zero-cost CSS-only fade that
  starts as soon as the DOM paints), and reserve the animated "reveal" treatment only for secondary
  visual flourishes (badge pill, marquee, scroll cue). If the branded intro must stay for brand reasons,
  have it play **as an overlay on top of already-rendered content** instead of blocking that content's
  render — visually the user still sees the curtain first, but LCP is measured against what's
  underneath, since Chrome's LCP algorithm only credits paints of elements with non-zero opacity.
- At minimum, shorten the first-visit intro duration (0.9 s + 0.6 s is long) and/or skip it entirely for
  users who arrive via deep link / from search (i.e., treat all organic entries like the `repeat` case,
  using sessionStorage logic already in place, extended to "referrer is a search engine or this is not
  the root path").
- Expected impact: should bring homepage LCP from "Poor" to "Good" (sub-2.5s) on desktop and likely
  into "Needs Improvement" or "Good" on mobile, without touching any other code.

### 2. [HIGH] Large shared client JS bundle (framer-motion + lenis + lucide-react + React/Next runtime) is parsed/executed on every route, including simple content pages
**Evidence:** Both the homepage and the service page load the identical shared chunks
(`474-a548856d6b7f9b67.js`, `fd9d1056-b11b2651f33aae7f.js`, `117-4f5b424f20efdcae.js`,
`582-8843917318fd1b3a.js`, `275-a4eaba4eddcab6a2.js`) — verified via Playwright network capture and
re-confirmed with `curl -H "Accept-Encoding: br"`:
```
474-...   : 65,364 B brotli-on-wire (198,529 B decoded)
fd9d1056- : 55,068 B brotli-on-wire (172,834 B decoded)
117-...   : 32,959 B brotli-on-wire (124,364 B decoded)
582-...   : 12,537 B brotli-on-wire ( 33,868 B decoded)
275-...   : 8,116 B brotli-on-wire ( 19,607 B decoded)
```
Total ≈ **212 KB brotli / ~668 KB decoded** of JS shipped to every page, service page included
(`/services/product-sourcing` is a 41 KB-HTML content page but still pays the same JS tax). Grep
confirms `framer-motion`, `lucide-react`, and `lenis`/`"use client"` `useLenis()` are imported across
nearly every component in `components/sinovorex/*` (`About.tsx`, `ChatButtons.tsx`, `chrome.tsx`,
`Closing.tsx`, `ContactModal.tsx`, `GlobalReach.tsx`, `Hero.tsx`, `Nav.tsx`, `primitives.tsx`,
`Services.tsx`, `Trade.tsx`), so none of it is page-specific — it's effectively baked into the root
layout's client bundle.
**Impact:** Elevated main-thread parse/compile/execute cost on every navigation (contributes to the
homepage's 672 ms / 1734 ms long-task totals above, and to the service page's 1227 ms of long tasks on
throttled mobile despite its trivial DOM). This is the "needs improvement" LCP driver on the service
page's mobile result (3804 ms) once the (much smaller) intro-animation problem from Finding 1 is
excluded.
**Recommendation:**
- Audit whether `framer-motion`'s full `motion`/`AnimatePresence` surface is needed everywhere, or
  whether simple scroll-reveal effects (`Reveal` in `primitives.tsx`) could be replaced with
  CSS `@starting-style`/`animation-timeline: view()` or a lighter `IntersectionObserver` + CSS class
  toggle, removing `framer-motion` from the critical path for content-only pages like
  `/services/[slug]`.
- Consider code-splitting `Hero`/`HeroGlobe`/`PageLoader` into a dynamically-imported chunk
  (`next/dynamic(() => import(...), { ssr: false })`) so that `/services/*` and `/privacy`, `/terms`
  pages — which never render the Hero — don't pull their JS into the same shared chunk group.
- Expected impact: moderate — likely 20-40% reduction in shared JS parse/exec time on non-homepage
  routes, directly improving their LCP/INP headroom.

### 3. [MEDIUM] Homepage DOM size (~1,570 elements) is at the upper edge of the "excessive DOM" guideline
**Evidence:** Measured `document.querySelectorAll('*').length` = 1577 (mobile) / 1567 (desktop) on
the homepage, versus the commonly-cited "excessive" threshold of 1,500 elements (service page is a
healthy 219-220).
**Impact:** Minor relative to Findings 1-2, but a large DOM increases style/layout recalculation cost
for every animation frame the `HeroGlobe` canvas and Framer Motion scroll-linked transforms trigger
(e.g., `useScroll`/`useTransform` on `scrollYProgress` in `Hero.tsx`), compounding the long-task totals
measured above.
**Recommendation:** Not urgent in isolation, but worth remembering if more sections/animations are
added to the single-page homepage — consider virtualizing or lazily mounting below-the-fold sections
(`Products`, `QualityControl`, `Shipping`, `GlobalReach`, `FeesAndFaq`) only as they approach the
viewport, rather than all at initial mount.

### 4. [LOW] Mobile INP during the load window is poor (synthetic 1224 ms on homepage)
**Evidence:** Scripted clicks fired ~500 ms apart during/just after the throttled-mobile load produced
a worst-case Event Timing duration of 1224 ms, coinciding with the homepage's single largest long task
(760 ms, starting at ~1.8 s into the timeline — i.e., during the `PageLoader` counter/curtain
animation window). This is a synthetic approximation (scripted clicks, not real user interaction
sampling) and should not be read as a CrUX-grade INP figure, but it is a legitimate signal that
interactions attempted *during* the intro animation are likely to feel janky on lower-end mobile
hardware.
**Recommendation:** Resolving Finding 1 (shortening/removing the blocking intro) should resolve most of
this automatically, since it removes the heaviest early long task window. Once CrUX/field INP data is
available (requires a configured Google API key / sufficient CrUX traffic), re-validate with real p75
INP instead of this synthetic proxy.

### 5. [LOW / housekeeping] ~17 MB of unused legacy assets remain in `public/`
**Evidence:** `public/portfolio/3inbox.svg` (14 MB), `Brands.svg` (1.8 MB), `1giftee.svg` (812 KB),
`public/hero-bg.mp4` (720 KB), `video_frame.png`/`video_frame2.png` (364 KB/304 KB), and five
`frame_*.jpg` stills (216 KB each) are not imported by any file reachable from `app/page.tsx` or
`app/services/[slug]/page.tsx` (confirmed by grep for each filename across `app/` and `components/`,
and by the Playwright network capture showing zero requests to any of them on either page). They do
**not** currently affect sinovorex.com's CWV — Next.js only ships referenced `public/` assets when
explicitly linked — but they bloat the git repo/deploy artifact and create a real risk if a future edit
accidentally re-wires `components/sections/Portfolio.tsx` (which still imports the 14 MB SVG) back into
a route.
**Recommendation:** Delete or move these to a non-deployed assets archive if the Portfolio/AITech/HeroOrb
template sections are permanently retired; if they might return, at minimum compress `3inbox.svg` (a
14 MB SVG is almost certainly an embedded raster image inside an SVG wrapper — re-export as WebP/AVIF)
before it's ever wired back in.

## Evidence Files
- Lab measurement script and raw output (not part of the git repo, scratch artifacts):
  `C:/Users/User/AppData/Local/Temp/claude/C--Users-User-Downloads-SinoVorex/fc5473a4-8238-48e3-9931-2f17d5650e0f/scratchpad/perf_measure.py`
  and `.../perf_results.json`
- Source files cited: `components/sinovorex/chrome.tsx`, `components/sinovorex/Hero.tsx`,
  `components/TradevorexHome.tsx`, `components/sinovorex/SubpageShell.tsx`,
  `components/sinovorex/HeroGlobe.tsx`, `app/layout.tsx`, `package.json`
- Prior agent's PSI attempt confirming quota exhaustion: `sinovorex.com-audit/lighthouse.json`,
  `sinovorex.com-audit/lighthouse.err`
