"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

/* ── Intro curtain ─────────────────────────────────────────
 * Pure CSS (globals.css: .sv-intro): server-rendered, never blocks input or scroll, and the hero
 * underneath is visible in the HTML from the first paint, so it does not delay LCP.
 * Hidden on repeat visits via html[data-intro-seen] (set in app/layout.tsx) and for reduced motion. */
export function IntroCurtain() {
  return (
    <div aria-hidden className="sv-intro pointer-events-none fixed inset-0 z-[100000] flex flex-col items-center justify-center bg-ink">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_50%_50%,rgba(255,107,43,0.16),transparent_70%)]" />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/brand/sinovorex-logo-stacked-on-dark.svg" alt="" width={350} height={300} className="sv-intro-logo relative h-auto w-[240px] md:w-[340px]" />
      <div className="sv-intro-logo mt-8 font-mono text-[11px] uppercase tracking-[0.35em] text-white/70">From factory floor to your port</div>
    </div>
  );
}

/* ── Custom cursor (fine pointers only) ────────────────────── */
export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine)");
    setEnabled(mq.matches);
    if (!mq.matches) return;
    document.documentElement.classList.add("has-custom-cursor");

    const mouse = { x: -200, y: -200 }, ring = { x: -200, y: -200 };
    let scale = 1, dotScale = 1, hover = false, dark = false, raf = 0;

    const onMove = (e: MouseEvent) => { mouse.x = e.clientX; mouse.y = e.clientY; };
    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      hover = !!t.closest("a, button, [role='button'], input, textarea, select, label, [data-cursor='hover']");
      dark = !!t.closest("[data-theme='dark']");
    };
    const tick = () => {
      ring.x += (mouse.x - ring.x) * 0.15;
      ring.y += (mouse.y - ring.y) * 0.15;
      scale += ((hover ? 1.8 : 1) - scale) * 0.15;
      dotScale += ((hover ? 0 : 1) - dotScale) * 0.2;
      if (dotRef.current) dotRef.current.style.transform = `translate(${mouse.x}px,${mouse.y}px) translate(-50%,-50%) scale(${dotScale.toFixed(3)})`;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ring.x.toFixed(2)}px,${ring.y.toFixed(2)}px) translate(-50%,-50%) scale(${scale.toFixed(3)})`;
        ringRef.current.style.background = hover ? "rgba(255,107,43,0.14)" : "transparent";
        ringRef.current.style.borderColor = hover ? "rgba(255,107,43,0.9)" : dark ? "rgba(255,255,255,0.5)" : "rgba(14,14,22,0.35)";
      }
      raf = requestAnimationFrame(tick);
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    raf = requestAnimationFrame(tick);
    return () => {
      document.documentElement.classList.remove("has-custom-cursor");
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      cancelAnimationFrame(raf);
    };
  }, []);

  if (!enabled) return null;
  return (
    <>
      <div ref={dotRef} className="pointer-events-none fixed left-0 top-0 z-[99999] h-2 w-2 rounded-full bg-flame will-change-transform" />
      <div ref={ringRef} className="pointer-events-none fixed left-0 top-0 z-[99998] h-9 w-9 rounded-full border-[1.5px] transition-[background,border-color] duration-300 will-change-transform" />
    </>
  );
}

/* ── Scroll progress bar ───────────────────────────────────── */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 24, mass: 0.3 });
  return <motion.div style={{ scaleX }} className="fixed inset-x-0 top-0 z-[200] h-[3px] origin-left bg-gradient-to-r from-flame via-[#FF9A5C] to-flame" />;
}
