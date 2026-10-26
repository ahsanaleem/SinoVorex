"use client";

/*
 * Small client "islands" for the otherwise server-rendered homepage. None of them import framer-motion,
 * so the first load stays light. Heavier widgets (quote modal, floating chat) load only when needed.
 */
import { useEffect, useState, type ReactNode } from "react";
import dynamic from "next/dynamic";
import { pillCls, PillInner } from "./lite";

/** Opens the quote modal from anywhere on the page (see QuoteModalHost). */
export const openQuote = () => window.dispatchEvent(new Event("sv:quote"));

type LenisLike = { scrollTo: (t: HTMLElement | number, o?: { offset?: number }) => void; stop: () => void; start: () => void; destroy: () => void; raf: (t: number) => void };
export const getLenis = () => (window as unknown as { __lenis?: LenisLike }).__lenis;

/** Smooth-scrolls to a section, through Lenis on desktop or natively elsewhere. */
export function scrollToId(id: string) {
  const el = id === "top" ? 0 : document.getElementById(id);
  if (el === null) return;
  const lenis = getLenis();
  if (lenis) lenis.scrollTo(el as HTMLElement | number, { offset: id === "top" ? 0 : -24 });
  else if (el === 0) window.scrollTo({ top: 0, behavior: "smooth" });
  else el.scrollIntoView({ behavior: "smooth" });
}

/** A pill button that opens the quote modal. */
export function QuotePill({ children, icon, variant = "dark", className }: { children: ReactNode; icon: ReactNode; variant?: "dark" | "light" | "flame" | "ghost"; className?: string }) {
  return <button type="button" onClick={openQuote} className={`${pillCls(variant)} ${className ?? ""}`}><PillInner icon={icon} variant={variant}>{children}</PillInner></button>;
}

/** A pill button that scrolls to a section on the page. */
export function ScrollPill({ to, children, icon, variant = "ghost" }: { to: string; children: ReactNode; icon: ReactNode; variant?: "dark" | "light" | "flame" | "ghost" }) {
  return (
    <a href={`#${to}`} onClick={(e) => { e.preventDefault(); scrollToId(to); }} className={pillCls(variant)}>
      <PillInner icon={icon} variant={variant}>{children}</PillInner>
    </a>
  );
}

/** Any element that opens the quote modal. */
export function QuoteTrigger({ children, className }: { children: ReactNode; className?: string }) {
  return <button type="button" onClick={openQuote} className={className}>{children}</button>;
}

/** Scrolls back to the top of the page. */
export function BackToTop({ children, className }: { children: ReactNode; className?: string }) {
  return <button type="button" aria-label="Back to top" onClick={() => scrollToId("top")} className={className}>{children}</button>;
}

const ContactModal = dynamic(() => import("./ContactModal").then((m) => m.ContactModal), { ssr: false });

/** Listens for openQuote() and shows the quote modal (its code loads on first use). */
export function QuoteModalHost() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const on = () => { setMounted(true); setOpen(true); };
    window.addEventListener("sv:quote", on);
    return () => window.removeEventListener("sv:quote", on);
  }, []);
  return mounted ? <ContactModal open={open} onClose={() => setOpen(false)} /> : null;
}

const FloatingChat = dynamic(() => import("./FloatingChat").then((m) => m.FloatingChat), { ssr: false });

/** Mounts children once the browser is idle after loading. */
function useIdle(timeout = 3000) {
  const [idle, setIdle] = useState(false);
  useEffect(() => {
    const w = window as Window & { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number };
    if (w.requestIdleCallback) w.requestIdleCallback(() => setIdle(true), { timeout });
    else { const t = setTimeout(() => setIdle(true), 1500); return () => clearTimeout(t); }
  }, [timeout]);
  return idle;
}

export function IdleFloatingChat() {
  return useIdle() ? <FloatingChat /> : null;
}

/** Smooth scrolling on desktop with a mouse only. Lenis loads as a separate chunk, after the page is idle. */
export function LenisInit() {
  const idle = useIdle();
  useEffect(() => {
    if (!idle || window.matchMedia("(prefers-reduced-motion: reduce), (pointer: coarse), (max-width: 1024px)").matches) return;
    let raf = 0, lenis: LenisLike | undefined;
    import("lenis").then(({ default: Lenis }) => {
      lenis = new Lenis({ duration: 1.15, easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) }) as unknown as LenisLike;
      (window as unknown as { __lenis?: LenisLike }).__lenis = lenis;
      const loop = (t: number) => { lenis!.raf(t); raf = requestAnimationFrame(loop); };
      raf = requestAnimationFrame(loop);
    });
    return () => { cancelAnimationFrame(raf); lenis?.destroy(); delete (window as unknown as { __lenis?: LenisLike }).__lenis; };
  }, [idle]);
  return null;
}

/** Live China time, rendered only on the client (no placeholder in the server HTML). */
export function ChinaClock() {
  const [time, setTime] = useState<string | null>(null);
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", { timeZone: "Asia/Shanghai", hour: "2-digit", minute: "2-digit" });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 15000);
    return () => clearInterval(id);
  }, []);
  return time ? <span className="tabular-nums">{time}</span> : null;
}
