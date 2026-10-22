# Performance and Images audit - sinovorex.com (re-audit 2026-10-22)

Method: PSI API not used (shared quota exhausted last audit, no key). Lab data from Playwright/Chromium with PerformanceObserver (LCP, layout-shift, longtask), single cold run, 6 s window. Mobile = 412x823, 4x CPU, 1.6 Mbps/150 ms RTT. Desktop = 1350x940 unthrottled. TBT = long-task time above 50 ms after FCP (proxy; INP not measurable without real interaction). No field data.

## Scores
- Performance: **82/100** (was ~60)
- Images: **78/100**

## Measured (lab)
| Page | Device | LCP | CLS | TBT | JS wire | Result |
|---|---|---|---|---|---|---|
| Home | Desktop | 1.35 s (H1 span) | 0 | 5 ms | 213 KB | Pass |
| Home | Mobile | 3.08 s (hero paragraph) | 0 | 705 ms | 213 KB | LCP needs improvement, TBT poor (throttled) |
| /services/product-sourcing | Desktop | 0.94 s | 0 | 0 | 207 KB | Pass |
| /services/product-sourcing | Mobile | 2.20 s | 0 | 135 ms | 207 KB | Pass |
| /guides/china-sourcing-agent-cost | Desktop | 0.90 s | 0 | 7 ms | 207 KB | Pass |
| /guides/china-sourcing-agent-cost | Mobile | 2.58 s | 0 | 241 ms | 207 KB | Borderline |

TTFB 340-430 ms everywhere (Vercel hkg1, HIT). DOM: home 1,707 elements (just over the 1,500 guideline), others 640-700.

## Loader issue: FIXED
Last audit: LCP 4.3 s desktop / 6.6 s mobile. Now 1.35 s / 3.08 s. The JS-gated intro and opacity-0 hero fade are gone:
- `components/sinovorex/chrome.tsx:12-21` IntroCurtain is pure CSS, server-rendered, `pointer-events-none`, hidden on repeat visits via `html[data-intro-seen]` (`app/globals.css:61-67`).
- H1 in `components/sinovorex/Hero.tsx` uses `.sv-rise` (`globals.css:70-74`), a transform-only animation with no opacity:0, so the text is in the first paint.
- Residual: on first visit `.sv-rise` delay is 0.8 s and the curtain lifts at ~1.35 s, so desktop first-visit LCP (1.35 s) is bounded by the curtain. Mobile LCP element is the hero paragraph at 3.08 s, which is the throttled-CPU hydration cost (TBT 705 ms), not a hidden element. The curtain is a cosmetic cost of ~0.75 s on every first visit; removing it would put desktop LCP near 0.9 s.

## What works
- CLS 0 on all six runs. Image dimensions set, `min-h-[100svh]` hero.
- Hero globe is `dynamic(..., { ssr: false })` (`Hero.tsx:10`), a hand-rolled 2D canvas (no three.js shipped); respects reduced motion. Not in LCP.
- JS is lean: ~207-213 KB brotli per page, largest chunk 55 KB. No third-party requests observed (Plausible/GA gated by env in `app/layout.tsx:48-57`).
- Fonts self-hosted via `next/font` with swap and preloaded.
- Static assets `max-age=31536000, immutable`; brotli on SVG/JS.
- Product photos go through `next/image` (`Trade.tsx:51`): AVIF/WebP enabled (`next.config.mjs:30`), served at w=384 for 5-7 KB each versus 97-143 KB originals; below the fold so lazy.
- OG/Twitter images exist (1200x630 PNG, 184 KB), with alt text files and `og:image` wired in `lib/seo.tsx:8,24`.

## Findings
1. **Medium - Homepage mobile TBT 705 ms / LCP 3.1 s under 4x throttle.** Hero runs framer-motion `useScroll`/springs/mouse parallax plus hydration of ~1,700 DOM nodes. Fix: lazy-mount below-fold sections (`dynamic`/in-view), drop mouse-parallax springs on touch (`Hero.tsx:26-32,41-45`), shorten DOM. Retest with real PSI.
2. **Medium - Intro curtain still delays first-visit paint ~0.75-1.3 s** (`chrome.tsx`, `globals.css:61`; `.sv-rise` delay at `globals.css:72-73`). Fix: remove the curtain, or cut to <=300 ms and drop the 0.8 s H1 delay.
3. **Low - Five SVGs preloaded on every page**, including `world-dots.svg` (200 KB raw, below the fold) and three logo variants, competing with critical resources. Source: `<link rel="preload" as="image">` in head, likely from `priority`-style hints in `GlobalReach.tsx:38`/brand components. Remove the world-dots preload; keep only the used logo.
4. **Low - HTML `Cache-Control: max-age=0, must-revalidate`** (Vercel default; fine with edge HIT). Non-hashed assets (`/brand/*.svg`, `/world-dots.svg`, `/products/*.jpg`, OG PNG) share it, so repeat visits revalidate. Add `headers()` rules in `next.config.mjs` for `/brand/*`, `/world-dots.svg` with `max-age=2592000`.
5. **Low - Unused `app/fonts/GeistVF.woff` + `GeistMonoVF.woff` (134 KB)** not referenced; delete.
6. **Low - Homepage DOM 1,707** (marquee bands duplicate items, `Hero.tsx` MarqueeBands: 2x2 copies).

## Images
- Formats/sizes: product JPGs 97-143 KB at 1200x896, optimised on the fly by next/image to AVIF/WebP (OK). `world-dots.svg` 200 KB raw (br-compressed on wire); could be simplified/ converted to a smaller sprite. Logo SVGs 24-28 KB each (probably embedded paths/raster; run SVGO).
- Alt text: product cards have descriptive alts (`Trade.tsx:54`); decorative logos/marks use `alt=""` correctly (`chrome.tsx:15`, `brand.tsx:22`); world map alt is meaningful (`GlobalReach.tsx:38`). About-page team photo alt is just the person name (`about/page.tsx:114`), acceptable; no `TEAM` photos currently.
- Lazy-loading: next/image lazy by default; about `<img loading="lazy">`. Raw `<img>` used for logos/SVG (fine for SVG; no next/image benefit).
- Header logo `BrandLogo` (`brand.tsx:8`) is an `<img>` with no `fetchpriority`; it is not LCP, fine.
- OG images: single shared 1200x630 PNG for all 21 pages (`lib/seo.tsx:8`). Valid, but no per-page/guide imagery, and 184 KB PNG could be ~60 KB JPEG/WebP-quality. Low priority. Article schema also reuses it (`ArticleView.tsx:22`).
- No images on guide pages (text only), so no image alt/sizing risk there; no content imagery for guides is a missed engagement/Image-search opportunity (Low).

## Old findings status
FIXED: loader hiding H1 / LCP 4.3-6.6 s; mobile service-page LCP 3.8 s now 2.2 s. REMAIN: homepage mobile main-thread cost (TBT 705 ms; earlier a 760 ms task). NEW: preload of world-dots.svg, unused Geist fonts, new pages (guide, services) all pass.
