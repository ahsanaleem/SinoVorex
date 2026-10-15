"use client";

import { useEffect, useRef, useState } from "react";
import { motion, animate, useScroll, useSpring } from "framer-motion";
import { EASE } from "./primitives";

/* ── Page loader: counter + curtain lift ───────────────────── */
export function PageLoader({ onDone }: { onDone: () => void }) {
  const countRef = useRef<HTMLSpanElement>(null);
  const [exiting, setExiting] = useState(false);
  const [repeat, setRepeat] = useState(false);
  const onDoneRef = useRef(onDone);
  onDoneRef.current = onDone;

  useEffect(() => {
    // Full intro (~1.5s) on the first visit of a session; a quick fade afterwards.
    let seen = false;
    try { seen = sessionStorage.getItem("sv-intro") === "1"; sessionStorage.setItem("sv-intro", "1"); } catch { /* storage blocked */ }
    setRepeat(seen);
    document.documentElement.style.overflow = "hidden";
    const c = animate(0, 100, {
      duration: seen ? 0.15 : 0.9, ease: [0.65, 0, 0.35, 1],
      onUpdate: (v) => { if (countRef.current) countRef.current.textContent = String(Math.round(v)).padStart(3, "0"); },
      onComplete: () => setExiting(true),
    });
    return () => { c.stop(); document.documentElement.style.overflow = ""; };
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-[100000] flex flex-col items-center justify-center bg-ink text-white"
      initial={{ y: 0 }}
      animate={exiting ? { y: "-100%", borderBottomLeftRadius: "50% 12%", borderBottomRightRadius: "50% 12%" } : { y: 0 }}
      transition={{ duration: repeat ? 0.45 : 0.6, ease: [0.76, 0, 0.24, 1] }}
      onAnimationComplete={() => {
        if (!exiting) return;
        document.documentElement.style.overflow = "";
        onDoneRef.current();
      }}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_50%_50%,rgba(255,107,43,0.16),transparent_70%)]" />

      <div className="relative">
        {[0, 1].map((k) => (
          <motion.span
            key={k}
            className="pointer-events-none absolute left-1/2 top-[30%] h-52 w-52 rounded-full border border-flame/50"
            style={{ x: "-50%", y: "-50%" }}
            initial={{ scale: 0.4, opacity: 0 }}
            animate={{ scale: [0.4, 1.8], opacity: [0.8, 0] }}
            transition={{ duration: 1.4, delay: 0.1 + k * 0.5, repeat: Infinity, ease: "easeOut" }}
          />
        ))}
        <motion.div
          initial={{ scale: 0.82, opacity: 0, filter: "blur(12px)", clipPath: "inset(100% 0% 0% 0%)" }}
          animate={{ scale: 1, opacity: 1, filter: "blur(0px)", clipPath: "inset(0% 0% 0% 0%)" }}
          transition={{ duration: 0.7, ease: EASE }}
          className="relative"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/brand/sinovorex-logo-stacked-on-dark.svg" alt="Sino Vorex — sourcing and export from China" width={367} height={300} className="h-auto w-[280px] md:w-[380px]" />
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.4 }}
        className="mt-8 font-mono text-[11px] uppercase tracking-[0.35em] text-white/70"
      >
        Sourcing &amp; Export · China
      </motion.div>

      <div className="absolute bottom-10 left-6 right-6 flex items-end justify-between font-mono text-xs text-white/70 md:left-12 md:right-12">
        <span>Loading experience</span>
        <span className="font-display text-6xl font-light tabular-nums tracking-tight text-white md:text-8xl">
          <span ref={countRef}>000</span>
        </span>
      </div>
    </motion.div>
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
