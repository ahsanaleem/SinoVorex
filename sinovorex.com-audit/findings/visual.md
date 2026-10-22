# Visual / Mobile audit — sinovorex.com (2026-10-22)

Score: 80/100. Screenshots in sinovorex.com-audit/screenshots/ (*-desktop.png 1366x768, *-mobile.png 390x844, *-full.png, home-*-t0.png = loader frame at 300ms, quote-mobile-form.png).

## What works
- No horizontal scroll on any of the 4 pages at either viewport (scrollWidth = viewport). Only decorative overflow (hero blobs, marquee) that is clipped.
- H1 is server-rendered, opacity 1, in the first viewport on all pages (desktop top 193-250px; mobile top 182-509px).
- Body font 16px; H1 84/64px desktop, 34-42px mobile. Nav collapses to a hamburger (56px circle) on mobile.
- Primary CTA "Get a Quote" is in the header on every page; the home hero has it in the first viewport on desktop (y=591-651).
- Floating WhatsApp button is hidden at xl (FloatingChat.tsx:33) so it does not collide on desktop; header holds the chat icon instead.

## Findings
1. Intro loader covers the home page on first visit (Low/Medium). A full-screen dark .sv-intro overlay (components/sinovorex/chrome.tsx:12, app/globals.css:61) is visible 0-~1.35s (0.75s delay + 0.6s lift), measured fully gone by ~2s. The H1 is NOT gated: it is in the DOM, opacity 1, and the overlay is pointer-events-none. It only hides content visually, so crawlers and Googlebot see it normally, but first-time visitors get ~1.5s of a dark screen and LCP is likely measured at overlay exit. It is skipped on repeat visits (data-intro-seen via localStorage, layout.tsx:23) and under prefers-reduced-motion (globals.css:77). Fix: shorten to <=0.6s total, or drop it on mobile.
2. Mobile home hero pushes the H1 and CTA down (Medium). The globe takes the top ~430px; the H1 starts at y=509 and "Get a Quote" at y=796 of 844, so the button is clipped at the fold with the chat FAB beside it. Fix: shrink the globe on <md (hero component) or put the CTA above the globe, so H1 + CTA fit within ~700px.
3. Quote form inputs are 15px on mobile (Medium). Product/quantity/price/destination/incoterm/message/name/company/email/phone and the submit button compute to fs=15px. iOS Safari zooms the page on focus when inputs are under 16px. Fix: text-[16px] on fields in components/sinovorex/QuoteForm.tsx.
4. Tiny text (Medium/Low). Form labels and placeholders on /quote are 10px mono caps (QuoteForm.tsx). The home nav strip, logo tagline and "How it works" labels are 10-11px. The step lists, "Service 01 of 6", footer legal line (incl. the Chinese entity name) and numbered markers are 12-13px. Raise form labels to >=12px.
5. Small tap targets (Medium). Mobile, below 44px: breadcrumb links "Home" 36x21 and "Services/Guides" 42-52x21; inline links 20px high; on /quote, the email and phone links are 20px high, the privacy-policy link is 37px, and the consent checkbox is 16x16. Footer links on /quote are 17px high (desktop footer link stack). Desktop nav items are 33-37px high. Fix: pad breadcrumb and footer links to a min-h of 44px and enlarge the checkbox hit area with its label.
6. Floating chat FAB overlaps content (Low). The 56px button (fixed bottom-4 right-4, z-130, FloatingChat.tsx:33) sits over the right edge of form fields and text on /quote and in the guide pages (visible over "Name" and "Email/WhatsApp" rows). It does not cover the submit button or the hero CTA, but it clips the right end of lines. Fix: add pb-24 to long-form pages or hide it on /quote (the form is already the conversion point).
7. Decorative animate-ping span overflows to x=402 on /services and /guides mobile (Low). It is clipped and causes no scroll, but sits inside an overflow-visible parent; ensure it stays within overflow-hidden.
8. Sticky ToC sidebar on service and guide pages (desktop only) is fine; on mobile it becomes a "tap to jump" collapsible. No overlap with the header (header 73px sticky).

## Per-page above-the-fold
- /: desktop good (H1, subhead, both CTAs, globe, all in 768px); mobile see #2.
- /services/product-sourcing: H1 and header CTA visible; mobile shows the in-page "Get a free quote" at y=467, visible.
- /guides/china-sourcing-agent-cost: H1 at y=234 mobile; the in-page CTA at y=599 mobile, visible.
- /quote: H1 plus the form's intro; the form starts below the fold on mobile (the "what happens next" block comes first). Consider placing the form before the explainer on mobile.
