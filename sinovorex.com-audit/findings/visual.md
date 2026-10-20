# Visual / Mobile / Images Audit — sinovorex.com

Captured with Playwright (Chromium) via the managed claude-seo venv, system proxy bypassed
(`NO_PROXY=*`, `--no-proxy-server` not needed since the proxy was bypassed via env for the
managed venv browser). Screenshots in `screenshots/`:

- `home-desktop.png` / `home-desktop-full.png` — homepage, 1920x1080, loaded ~2s post-idle (loader finished, hero fully rendered)
- `home-mobile.png` / `home-mobile-full.png` — homepage, 375x812 @2x DPR, captured right after the default 1s post-networkidle wait used by `capture_screenshot.py` — **caught mid page-loader/fade-in, see Finding V1**
- `home-mobile-wait1s.png` — same as above, explicit 1s wait (blank, confirms timing)
- `home-mobile-wait4s.png` — explicit 4s wait (fully rendered — confirms Finding V1 is a timing issue, not a broken layout)
- `home-mobile-scrolled-full.png` — full-page mobile capture with simulated incremental scrolling (600px steps) so Framer Motion `whileInView` reveals fire correctly; this is the reliable reference for full-page mobile layout
- `sourcing-desktop.png` / `sourcing-desktop-full.png` — `/services/product-sourcing`, 1920x1080
- `sourcing-mobile.png` / `sourcing-mobile-full.png` — `/services/product-sourcing`, 375x812 @2x DPR (this subpage has no intro loader, renders immediately and correctly)

Source reviewed (not modified): `components/sinovorex/Hero.tsx`, `HeroGlobe.tsx`, `chrome.tsx`
(PageLoader), `Nav.tsx`, `SubpageShell.tsx`, `Trade.tsx`, `primitives.tsx`, `GlobalReach.tsx`,
`data.ts`, and `public/` assets.

---

## Visual / Above-the-fold notes

**Desktop homepage (1920x1080):** H1 "The Force Behind Global Trade", subhead, primary CTA
"Get a Quote" and secondary "How it works" are all comfortably above the fold, next to a fully
rendered interactive 3D/canvas globe (dark sphere, orange trade-route arcs, "CHINA" /
"GUANGZHOU" labels). Nav bar is clean, sticky, with a visible pill CTA. No overlap, no clipped
text, generous whitespace. This is a strong above-the-fold result on desktop.

**Mobile homepage (375x812):** Once the loader/fade-in sequence finishes (see V1), the same
content works well: logo + hamburger, then the globe (repositioned above the text per the
`HeroGlobe` mobile branch: `cx=W*0.5, cy=96+R*1.1`), badge, H1, subhead, and the primary
"Get a Quote" pill button all appear before the viewport edge at 4s; the secondary "How it
works" button is just at/below the fold edge. Good hierarchy, no element overlap.

**Subpage homepage, `/services/product-sourcing` (both viewports):** No loader (uses the
lighter `SubpageShell`), renders immediately and correctly on both desktop and mobile. Desktop
hero has H1, descriptive paragraph, two info cards ("What's included" / "What you receive"),
and a 6-step process strip, all above or just below the fold. Mobile stacks cleanly with no
overflow. The page relies on the sticky header's "Get a Quote" button as the primary CTA since
there is no inline hero CTA button on this template — only the header pill and the bottom
"Request a Quote" banner (see V5).

**Full-page scroll-through (homepage, mobile, `home-mobile-scrolled-full.png`):** confirms
How-it-works → Services (6 cards) → Products (4 photo cards) → Shipping (dark CTA block) →
About → FAQ → footer all render correctly, single-column, no overlap, no obvious clipped text,
when scrolled naturally.

## Mobile responsiveness notes

- No horizontal scroll/overflow observed on either page at 375px in any captured screenshot.
- Touch targets: header hamburger button is 44x44px (`h-11 w-11`, `Nav.tsx:107`) — under the
  48x48px recommendation (minor). The floating WhatsApp/WeChat chat launcher is 56x56px
  (`h-14 w-14`, `ChatButtons.tsx:132`) — compliant. "Get a Quote" pills are tall (py-2/py-2.5
  with large hit area) — compliant.
- Base body copy renders at ~16-17px CSS (`text-[17px]`, `text-[14px]` for secondary labels in
  some cards) — mostly fine; a few micro-labels (process step eyebrows, badge pills) are
  11-13px, which is acceptable for secondary/decorative labels but would fail a strict 16px
  rule if treated as primary content.
- **Mobile subpages have no navigation menu** (see V2) — the hamburger pattern that exists on
  the homepage (`Nav.tsx`) is not present in `SubpageShell.tsx`, which only shows logo, chat
  icon, and "Get a Quote".
- On `/services/product-sourcing` mobile, the floating green chat bubble visually sits over
  the bottom-right of the "What's included" white card (not over interactive text, but it does
  overlap decorative card padding) — cosmetic only, not blocking any tap target.

## Page loader / 3D globe hero evaluation

- The loader (`chrome.tsx` `PageLoader`) is a full-screen counter (0→100) + curtain-lift
  animation, ~0.9s count-up on first visit per session (`sessionStorage` gates a faster 0.15s
  replay on subsequent page loads within the session), plus a further ~0.6s curtain exit
  animation, and only then does it call `onDone()` which flips `ready` and starts the Hero's
  own staggered `fade()` entrance (`Hero.tsx` delays from 0.1s up to 1.6s, each a 1s fade/slide).
  End-to-end, a first-time visitor can be looking at a visually incomplete hero (blank cream
  background, or partially faded-in text) for **roughly 2.5-4 seconds** after the page is
  otherwise network-idle.
- This is confirmed directly: a mobile screenshot taken 1s after network-idle is blank cream
  (`home-mobile-wait1s.png`); the same page after 4s is fully rendered with globe, heading and
  CTA (`home-mobile-wait4s.png`). **The blank `home-mobile.png` capture is a timing artifact of
  the screenshot tool's fixed 1s wait, not a broken mobile layout** — but the underlying
  multi-second delay before the hero is visually complete is real and worth flagging for LCP /
  perceived-performance reasons (see V1).
- The globe itself (`HeroGlobe.tsx`) is a canvas animation (drag-to-spin, click-to-launch
  shipments), pauses via `IntersectionObserver` when off-screen and respects
  `prefers-reduced-motion` (skips the animation loop, renders one static frame) — good
  accessibility/performance hygiene. It also exposes `role="img"` with a descriptive
  `aria-label` as a non-visual fallback.
- Minor: the full-page screenshot taken via a straight viewport-resize (no real scroll) showed
  large apparent blank regions between sections, because many sections use Framer Motion
  `whileInView` reveal animations keyed to real scroll/IntersectionObserver events that never
  fire during an instant resize-based capture. A simulated-scroll capture
  (`home-mobile-scrolled-full.png`) shows all sections render correctly. This is a testing
  artifact, not a site defect, but it's worth knowing if anyone else screenshots this site with
  a naive full-page tool and assumes content is missing.

## Image SEO review (homepage)

All images on the homepage are plain `<img>` tags (no `next/image`), so there is no automatic
responsive `srcset`, format negotiation, or blur-up placeholder — this is a deliberate opt-out
(`eslint-disable-next-line @next/next/no-img-element` on every instance).

| Image | Alt text | Format | Dimensions set | Lazy loading |
|---|---|---|---|---|
| Page loader logo (`chrome.tsx:61`) | `"Sino Vorex — sourcing and export from China"` — descriptive | SVG | `width={350} height={300}` | not set (defaults to eager — correct, it's the first paint element) |
| Nav/footer `BrandLogo` (`primitives.tsx:181-188`) | `"Sino Vorex — Sourcing & Export"` — descriptive | SVG | `width={434} height={120}` | not set (eager — correct for an above-the-fold/footer logo) |
| `BrandMark` watermark (`primitives.tsx:195-203`) | `alt="" aria-hidden` — correctly marked decorative | SVG | `width={512} height={512}` | not set |
| `GlobalReach.tsx:38` world-dots background | `"World map showing shipping routes from China to partner markets"` | SVG | none (fills via CSS `absolute inset-0 h-full w-full`) | not set | 
| Product photos, `Trade.tsx:50-57` (4x, `/products/*.jpg`) | `` `${title}: ${items.join(", ").toLowerCase()}` `` — descriptive, includes category + item list | **JPG** (not WebP/AVIF) | `width={1200} height={896}` (matches the `aspect-[4/3]` CSS box almost exactly: 1200/896 = 1.339 vs 4/3 = 1.333) | `loading="lazy"` — correct, these are below the fold |
| `HeroGlobe` canvas | `role="img"` + descriptive `aria-label` (not an `<img>`, but functions as the accessible fallback) | Canvas (no file) | sized via CSS/JS, no static dimensions to reserve — canvas starts at 0 then is sized in a `useEffect`, so there is a brief 0-height window before `size()` runs, but it's wrapped in an absolutely-positioned parent so it doesn't shift surrounding layout | n/a |

**CLS:** No image-driven layout shift expected — every raster/SVG `<img>` ships explicit
`width`/`height` attributes that closely match their rendered aspect ratio, so the browser can
reserve space before the asset loads. The canvas globe is absolutely positioned, so it also
can't push content around.

**Format/weight:** Product photos are optimized JPGs (97KB–143KB for 1200x896), reasonable but
not state-of-the-art — no WebP/AVIF variant, no `<picture>` fallback, and no responsive
`srcset`/`sizes`, so a 375px-wide phone downloads the exact same 1200px-wide JPEG as a 1920px
desktop. Because `next/image` was explicitly opted out of (per the inline eslint-disable
comments), none of Next's automatic resizing/format-negotiation/CDN caching applies to these
four images.

**Orphaned/unused assets found in `public/`:** `logo.png` (31KB), `frame_0.5s.jpg` …
`frame_4.5s.jpg` (5 files, ~218KB each, ~1.1MB total), `video_frame.png` (372KB),
`video_frame2.png` (311KB) — none of these are referenced anywhere in `components/` (grep
across `.tsx`/`.ts` found zero hits). They don't cost page weight since nothing requests them,
but they're dead weight in the repo/deploy and, if ever picked up by a sitemap/image-sitemap
generator or crawled directly, would surface as orphan, alt-less images with no supporting
page context.

---

## Images score: 78/100

**What works**
- Every image has deliberate, mostly descriptive alt text (or correctly empty `alt=""` +
  `aria-hidden` for pure decoration) — no missing-alt images found.
- Explicit `width`/`height` on every raster/vector `<img>`, closely matched to rendered
  aspect ratio — solid CLS protection.
- Correct `loading="lazy"` on below-the-fold product photos; above-the-fold brand/logo assets
  are left eager by default.
- Logo/brand assets are SVG — zero raster weight, perfectly sharp at any DPR, no format concerns.
- Product JPGs are reasonably compressed for their dimensions (not bloated multi-MB files).

**What's holding the score back**
- No modern formats (WebP/AVIF) or `<picture>` fallback for the 4 product photos.
- No responsive `srcset`/`sizes` — mobile downloads full 1200px-wide images.
- `next/image` deliberately bypassed everywhere, forfeiting automatic optimization/CDN caching.
- ~1.1MB+ of unused orphan raster assets sitting in `public/`.

---

## Findings

### V1 — Hero is visually blank for ~2.5-4s on first load (loader + staggered fade), mobile especially
- **Severity:** Medium
- **Evidence:** `home-mobile-wait1s.png` (blank cream background, 1s after network-idle) vs.
  `home-mobile-wait4s.png` (fully rendered hero, 4s after network-idle). Root cause in code:
  `chrome.tsx` `PageLoader` (0.9s count-up + 0.6s curtain exit before `onDone()`) chained into
  `Hero.tsx`'s own `fade()` helper, whose individual elements delay up to 1.6s with 1s
  transitions each — i.e., the last hero element (scroll cue / globe hint) doesn't finish
  animating in until roughly `0.9 + 0.6 + 1.6 + 1.0 ≈ 4.1s` after the loader starts counting.
- **Recommendation:** Keep the loader experience, but shorten the cumulative delay stack for
  first paint of the primary heading/CTA specifically — e.g., let the H1 and "Get a Quote"
  button start fading in as soon as the curtain *starts* lifting rather than only after
  `onDone()` fires, or shrink the per-element stagger delays (currently up to 1.6s) so the
  CTA is visible well under ~1.5s post-interactive. This mainly matters for LCP/INP-adjacent
  perceived-performance and for first-time visitors (repeat visits already get the fast 0.15s
  loader path via `sessionStorage`).

### V2 — No mobile navigation menu on service/legal subpages
- **Severity:** Medium
- **Evidence:** `SubpageShell.tsx:18-32` header only renders the logo, a `hidden ... sm:inline-flex`
  "Home" link (so it's hidden below the `sm` breakpoint), `HeaderWhatsApp` (itself `hidden ...
  xl:grid`, so also absent on mobile), and the "Get a Quote" button. There is no hamburger /
  mobile menu component on this shell, unlike `Nav.tsx` used on the homepage. Confirmed visually
  in `sourcing-mobile.png` — the header only shows logo + "Get a Quote".
- **Recommendation:** Add the same mobile hamburger menu (or at minimum a "Home" text link and
  links to the other service pages / main sections) to `SubpageShell` so mobile visitors
  landing on a service or legal page (e.g., from search or a shared link) aren't stuck with
  only "go back to the homepage logo" as their navigation option.

### V3 — Header hamburger tap target is 44x44px, just under the 48px guideline
- **Severity:** Low
- **Evidence:** `Nav.tsx:107` — `className="grid h-11 w-11 place-items-center rounded-full ..."` (44px).
- **Recommendation:** Bump to `h-12 w-12` (48px) for comfortable thumb reach; low priority
  given the button is otherwise isolated with generous surrounding padding.

### V4 — Product images not served in modern formats / no responsive srcset
- **Severity:** Low–Medium (performance/SEO, not a visual bug)
- **Evidence:** `Trade.tsx:50-57`, `data.ts:78-81` — `public/products/*.jpg`, plain `<img src=...>`
  with a single fixed 1200x896 source, no `srcset`, no WebP/AVIF.
- **Recommendation:** Either re-enable `next/image` for just these four photos (safe since they
  are simple content photos, not canvas/animated elements) or hand-roll a `<picture>` with
  AVIF/WebP sources and a `sizes` attribute, so mobile devices fetch a smaller variant instead
  of the full 1200px desktop asset.

### V5 — Unused orphan image assets in `public/`
- **Severity:** Low
- **Evidence:** `public/logo.png`, `public/frame_0.5s.jpg` … `frame_4.5s.jpg`, `public/video_frame.png`,
  `public/video_frame2.png` — zero references found via repo-wide grep across `.tsx`/`.ts`.
- **Recommendation:** Delete these from `public/` (or confirm they're intentionally reserved
  for a future video/animation feature) to avoid orphan-image bloat and accidental indexing.

### V6 — No single inline hero CTA button on `/services/product-sourcing`
- **Severity:** Low (informational)
- **Evidence:** `sourcing-desktop.png` — the hero only carries descriptive text and the "What's
  included"/"What you receive" cards; the only CTAs on the page are the sticky header "Get a
  Quote" pill and the bottom gradient "Request a Quote" banner from `SubpageShell.tsx:36-46`.
  This isn't broken, but a visitor who doesn't scroll and whose eye doesn't land on the header
  pill has to scroll the full page before hitting a dedicated large CTA again.
- **Recommendation:** Consider adding a secondary inline CTA directly under the hero
  intro paragraph (mirrors the homepage Hero's dual-button pattern) to reinforce conversion
  intent earlier on service pages.

### V7 — Full-page automated screenshots can falsely appear to show empty sections
- **Severity:** Informational / tooling note (not a site defect)
- **Evidence:** `home-mobile-full.png` (naive resize-based full-page capture) shows ~12,000px
  of blank space between the "Factory Vetting / Quality Inspection" marquee and the "Products"
  caption; `home-mobile-scrolled-full.png` (same URL, same viewport, captured via simulated
  incremental scrolling) shows the same region fully populated with the Services and Products
  sections. Root cause: those sections use Framer Motion `whileInView` reveal animations gated
  on real scroll/IntersectionObserver events, which don't fire during an instant viewport
  resize.
- **Recommendation:** No site change needed. Documenting this so future automated QA/screenshot
  tooling against this site knows to scroll (or to disable `prefers-reduced-motion`-safe reveal
  animations) before trusting a full-page capture.

---

## Not fully verified (turn budget — flag for follow-up)
- Desktop above-the-fold and mobile above-the-fold were only visually spot-checked against
  screenshots; no automated Lighthouse/CrUX CLS or LCP timing numbers were pulled for this pass
  (that overlaps with the Performance agent's `findings/performance.md`, not duplicated here).
- Tablet (768x1024) viewport was not captured for either page — only desktop/laptop-scale and
  mobile were covered per the task's explicit ask (desktop + mobile only), so tablet rendering
  is unverified.
- The `/services/product-sourcing` full-page mobile capture (`sourcing-mobile-full.png`) was
  taken with the naive resize method (not the simulated-scroll method used for the homepage);
  given V7, treat any apparent gaps in that file as unverified/possibly a scroll-reveal
  artifact rather than a confirmed defect — it was not re-verified with simulated scrolling due
  to turn budget.
- Did not test real hamburger-menu-open state screenshots (mobile nav overlay) on the homepage,
  nor the `ContactModal` open state, on either viewport.
