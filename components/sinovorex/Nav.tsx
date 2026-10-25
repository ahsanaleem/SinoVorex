"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { clsx } from "clsx";
import { NAV_LINKS } from "./data";
import { BrandLogo, BrandMark, EASE, useLenis, useScrollTo } from "./primitives";
import { HeaderWhatsApp } from "./ChatButtons";

export function Nav({ onContact, ready }: { onContact: () => void; ready: boolean }) {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const [hoverLink, setHoverLink] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const scrollTo = useScrollTo();
  const lenis = useLenis();

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 40);
    setHidden(y > prev && y > 400 && !menuOpen);
  });

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); }),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    NAV_LINKS.forEach(({ id }) => { const el = document.getElementById(id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (menuOpen) lenis?.stop(); else lenis?.start();
  }, [menuOpen, lenis]);

  const go = (id: string) => { setMenuOpen(false); setTimeout(() => scrollTo(id), menuOpen ? 350 : 0); };
  /** Real links (shareable, crawlable) that still use smooth scrolling on this page. */
  const onLink = (id: string) => (e: React.MouseEvent) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
    e.preventDefault();
    history.replaceState(null, "", id === "top" ? location.pathname : `#${id}`);
    go(id);
  };

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={ready ? { y: hidden ? -110 : 0, opacity: 1 } : {}}
        transition={{ duration: 0.7, ease: EASE }}
        className="fixed inset-x-0 top-0 z-[150] flex justify-center px-3 pt-3 md:pt-4"
      >
        <nav
          className={clsx(
            "flex w-full items-center justify-between rounded-full transition-all duration-700 ease-apple",
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

          <ul className="hidden items-center gap-0.5 xl:flex" onMouseLeave={() => setHoverLink(null)}>
            {NAV_LINKS.map(({ label, id }) => {
              const highlighted = hoverLink ? hoverLink === id : active === id;
              return (
                <li key={id}>
                  <a
                    href={`/#${id}`}
                    onClick={onLink(id)}
                    aria-current={active === id ? "true" : undefined}
                    onMouseEnter={() => setHoverLink(id)}
                    className={clsx("relative block rounded-full px-3.5 py-2 text-[14px] font-medium transition-colors duration-300", highlighted ? "text-ink" : "text-ink/70")}
                  >
                    {highlighted && (
                      <motion.span layoutId="nav-pill" className="absolute inset-0 rounded-full bg-ink/[0.06]" transition={{ type: "spring", stiffness: 380, damping: 32 }} />
                    )}
                    <span className="relative">{label}</span>
                  </a>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-2">
            <HeaderWhatsApp />
            <button
              onClick={onContact}
              className="group hidden items-center gap-2 rounded-full bg-ink py-2.5 pl-5 pr-2.5 text-[14px] font-medium text-white transition-shadow duration-500 hover:shadow-[0_10px_30px_-8px_rgba(255,107,43,0.6)] sm:inline-flex"
            >
              Get a Quote
              <span className="grid h-7 w-7 place-items-center rounded-full bg-flame transition-transform duration-500 ease-apple group-hover:rotate-45">
                <ArrowUpRight size={15} />
              </span>
            </button>
            <button
              onClick={() => setMenuOpen((o) => !o)}
              className="grid h-12 w-12 place-items-center rounded-full bg-ink text-white xl:hidden"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span key={menuOpen ? "x" : "m"} initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.25 }}>
                  {menuOpen ? <X size={18} /> : <Menu size={18} />}
                </motion.span>
              </AnimatePresence>
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            data-theme="dark"
            className="fixed inset-0 z-[140] flex flex-col justify-between bg-ink px-6 pb-10 pt-28 text-white xl:hidden"
            initial={{ clipPath: "circle(0% at calc(100% - 40px) 40px)" }}
            animate={{ clipPath: "circle(150% at calc(100% - 40px) 40px)" }}
            exit={{ clipPath: "circle(0% at calc(100% - 40px) 40px)" }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          >
            <ul className="space-y-2">
              {NAV_LINKS.map(({ label, id }, i) => (
                <li key={id} className="overflow-hidden">
                  <motion.a
                    href={`/#${id}`}
                    onClick={onLink(id)}
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    exit={{ y: "100%" }}
                    transition={{ duration: 0.6, delay: 0.15 + i * 0.07, ease: EASE }}
                    className="flex w-full items-baseline gap-4 py-1 text-left font-display text-[40px] font-medium leading-tight tracking-[-0.03em]"
                  >
                    <span className="font-mono text-xs text-flame">0{i + 1}</span>
                    {label}
                  </motion.a>
                </li>
              ))}
            </ul>
            <BrandMark dark className="pointer-events-none absolute -bottom-16 -right-16 w-72 opacity-[0.07]" />
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="relative space-y-6">
              <button onClick={() => { setMenuOpen(false); onContact(); }} className="w-full rounded-full bg-flame py-4 text-base font-medium">
                Request a Quote
              </button>
              <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-white/70">Sourcing & export from China</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
