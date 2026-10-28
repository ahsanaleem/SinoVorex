"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { clsx } from "clsx";
import { NAV_LINKS } from "./data";
import { BrandLogo, BrandMark } from "./brand";
import { HeaderWhatsApp } from "./ChatButtons";
import { getLenis, openQuote, scrollToId } from "./islands";

/* Homepage nav. No animation library: a passive scroll listener and CSS transitions. */
export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    // Smooth scrolling and touch momentum produce tiny back-and-forth movements, so the header only
    // hides/shows after a deliberate run in one direction, and the compact style has a dead band.
    const HIDE_AFTER = 400, TRAVEL = 24;
    let prev = window.scrollY, anchor = prev, raf = 0;
    const update = () => {
      raf = 0;
      // Clamp out iOS rubber-band overscroll, which reports negative / past-the-end positions.
      const y = Math.min(Math.max(window.scrollY, 0), document.documentElement.scrollHeight - window.innerHeight);
      setScrolled((s) => (s ? y > 20 : y > 60));
      if (y < HIDE_AFTER) { setHidden(false); anchor = y; }
      else if (y !== prev) {
        // Reset the anchor whenever the direction changes, then measure travel from it.
        if ((y > prev) !== (prev > anchor)) anchor = prev;
        if (y - anchor > TRAVEL) setHidden(true);
        else if (anchor - y > TRAVEL) setHidden(false);
      }
      prev = y;
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { window.removeEventListener("scroll", onScroll); cancelAnimationFrame(raf); };
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); }),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    NAV_LINKS.forEach(({ id }) => { const el = document.getElementById(id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);

  // Shared links like /#faq: scroll there once the page has loaded.
  useEffect(() => {
    const id = decodeURIComponent(location.hash.slice(1));
    if (!id || !document.getElementById(id)) return;
    const t1 = setTimeout(() => scrollToId(id), 50);
    // Sections render lazily on the way down; correct the position once if the target has moved.
    const t2 = setTimeout(() => {
      const top = document.getElementById(id)?.getBoundingClientRect().top ?? 0;
      if (Math.abs(top) > 120) scrollToId(id);
    }, 1200);
    // ...unless the visitor has started scrolling themselves.
    const cancel = () => clearTimeout(t2);
    const evs = ["wheel", "touchstart", "keydown"] as const;
    evs.forEach((e) => addEventListener(e, cancel, { once: true, passive: true }));
    return () => { clearTimeout(t1); clearTimeout(t2); evs.forEach((e) => removeEventListener(e, cancel)); };
  }, []);

  useEffect(() => {
    const lenis = getLenis();
    if (menuOpen) { lenis?.stop(); document.documentElement.style.overflow = "hidden"; }
    else { lenis?.start(); document.documentElement.style.overflow = ""; }
  }, [menuOpen]);

  const go = (id: string) => { const wasOpen = menuOpen; setMenuOpen(false); setTimeout(() => scrollToId(id), wasOpen ? 350 : 0); };
  /** Real links (shareable, crawlable) that still use smooth scrolling on this page. */
  const onLink = (id: string) => (e: React.MouseEvent) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
    e.preventDefault();
    history.replaceState(null, "", id === "top" ? location.pathname : `#${id}`);
    go(id);
  };

  return (
    <>
      <header
        className={clsx(
          "fixed inset-x-0 top-0 z-[150] flex justify-center px-3 pt-3 transition-transform duration-500 ease-apple will-change-transform md:pt-4",
          hidden && !menuOpen && "-translate-y-[110px]",
        )}
      >
        <nav
          className={clsx(
            "sv-fade flex w-full items-center justify-between rounded-full transition-[max-width,padding,background-color,border-color,box-shadow] duration-500 ease-apple",
            scrolled
              ? "max-w-[1240px] border border-ink/[0.07] bg-white/70 py-2 pl-5 pr-2 shadow-[0_10px_40px_-12px_rgba(14,14,22,0.18)] backdrop-blur-xl"
              : "max-w-[1400px] border border-transparent bg-transparent py-3 pl-4 pr-3 md:px-6",
          )}
        >
          <a href="/" onClick={onLink("top")} className="flex items-center transition-transform duration-500 ease-apple hover:scale-[1.03]" aria-label="SinoVorex, back to top">
            <BrandLogo
              dark={menuOpen && !scrolled}
              className={clsx("w-auto transition-[height] duration-700 ease-apple", scrolled ? "h-11 md:h-12" : "h-12 md:h-16")}
            />
          </a>

          <ul className="hidden items-center gap-0.5 xl:flex">
            {NAV_LINKS.map(({ label, id }) => (
              <li key={id}>
                <a
                  href={`/#${id}`}
                  onClick={onLink(id)}
                  aria-current={active === id ? "true" : undefined}
                  className={clsx(
                    "block rounded-full px-3.5 py-2 text-[14px] font-medium transition-colors duration-300 hover:bg-ink/[0.06] hover:text-ink",
                    active === id ? "bg-ink/[0.06] text-ink" : "text-ink/70",
                  )}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <HeaderWhatsApp />
            <button
              type="button"
              onClick={openQuote}
              className="group hidden items-center gap-2 rounded-full bg-ink py-2.5 pl-5 pr-2.5 text-[14px] font-medium text-white transition-shadow duration-500 hover:shadow-[0_10px_30px_-8px_rgba(255,107,43,0.6)] sm:inline-flex"
            >
              Get a Quote
              <span className="grid h-7 w-7 place-items-center rounded-full bg-flame transition-transform duration-500 ease-apple group-hover:rotate-45">
                <ArrowUpRight size={15} />
              </span>
            </button>
            <button
              type="button"
              onClick={() => setMenuOpen((o) => !o)}
              className="grid h-12 w-12 place-items-center rounded-full bg-ink text-white xl:hidden"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
            >
              {menuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile menu: a circle that grows from the menu button (CSS clip-path). */}
      <div
        id="mobile-menu"
        data-theme="dark"
        {...(menuOpen ? {} : { inert: "" as unknown as boolean })} /* React 18 only renders inert as a string */
        aria-hidden={!menuOpen}
        className={clsx(
          "fixed inset-0 z-[140] flex flex-col justify-between bg-ink px-6 pb-10 pt-28 text-white transition-[clip-path,visibility] duration-700 [transition-timing-function:cubic-bezier(0.76,0,0.24,1)] xl:hidden",
          menuOpen ? "visible [clip-path:circle(150%_at_calc(100%-40px)_40px)]" : "invisible [clip-path:circle(0%_at_calc(100%-40px)_40px)]",
        )}
      >
        <ul className="space-y-2">
          {NAV_LINKS.map(({ label, id }, i) => (
            <li key={id} className="overflow-hidden">
              <a
                href={`/#${id}`}
                onClick={onLink(id)}
                style={{ transitionDelay: menuOpen ? `${0.15 + i * 0.07}s` : "0s" }}
                className={clsx(
                  "flex w-full items-baseline gap-4 py-1 text-left font-display text-[40px] font-medium leading-tight tracking-[-0.03em] transition-transform duration-500 ease-apple",
                  menuOpen ? "translate-y-0" : "translate-y-full",
                )}
              >
                <span className="font-mono text-xs text-flame">0{i + 1}</span>
                {label}
              </a>
            </li>
          ))}
        </ul>
        <BrandMark dark className="pointer-events-none absolute -bottom-16 -right-16 w-72 opacity-[0.07]" />
        <div className={clsx("relative space-y-6 transition-opacity duration-500", menuOpen ? "opacity-100 delay-500" : "opacity-0")}>
          <button type="button" onClick={() => { setMenuOpen(false); openQuote(); }} className="w-full rounded-full bg-flame py-4 text-base font-medium">
            Request a Quote
          </button>
          <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-white/70">Sourcing & export from China</p>
        </div>
      </div>
    </>
  );
}
