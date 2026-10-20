"use client";

import { useRef } from "react";
import dynamic from "next/dynamic";
import { motion, useMotionValue, useScroll, useSpring, useTransform } from "framer-motion";
import { ArrowDown, ArrowUpRight, MousePointerClick, Sparkle } from "lucide-react";
import { SERVICES } from "./data";
import { EASE, Magnetic, PillButton, useScrollTo } from "./primitives";

// Decorative canvas globe: loaded after the page, never part of the server HTML or the LCP.
const HeroGlobe = dynamic(() => import("./HeroGlobe").then((m) => m.HeroGlobe), { ssr: false });

/* ── Hero ──────────────────────────────────────────────────── */
export function Hero({ ready, onContact }: { ready: boolean; onContact: () => void }) {
  const ref = useRef<HTMLElement>(null);
  const scrollTo = useScrollTo();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "35%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const globeY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const globeOpacity = useTransform(scrollYProgress, [0.3, 0.9], [1, 0]);

  const mx = useSpring(useMotionValue(0), { stiffness: 40, damping: 20 });
  const my = useSpring(useMotionValue(0), { stiffness: 40, damping: 20 });
  const blobX = useTransform(mx, (v) => v * 60);
  const blobY = useTransform(my, (v) => v * 60);
  const blobX2 = useTransform(mx, (v) => v * -40);
  const blobY2 = useTransform(my, (v) => v * -40);

  const fade = (delay: number) => ({
    initial: { opacity: 0, y: 24 },
    animate: ready ? { opacity: 1, y: 0 } : {},
    transition: { duration: 1, delay, ease: EASE },
  });

  return (
    <section
      id="top"
      ref={ref}
      onMouseMove={(e) => {
        mx.set(e.clientX / window.innerWidth - 0.5);
        my.set(e.clientY / window.innerHeight - 0.5);
      }}
      className="relative flex min-h-[100svh] flex-col overflow-hidden bg-paper"
    >
      {/* Aurora blobs */}
      <motion.div style={{ x: blobX, y: blobY }} className="pointer-events-none absolute -left-[10%] top-[5%] h-[55vw] max-h-[720px] w-[55vw] max-w-[720px]">
        <div className="h-full w-full animate-blob rounded-full bg-[radial-gradient(circle,rgba(255,107,43,0.18),transparent_65%)] blur-2xl" />
      </motion.div>
      <motion.div style={{ x: blobX2, y: blobY2 }} className="pointer-events-none absolute -right-[5%] top-[10%] h-[50vw] max-h-[720px] w-[50vw] max-w-[720px]">
        <div className="h-full w-full animate-blob-slow rounded-full bg-[radial-gradient(circle,rgba(255,176,120,0.3),transparent_65%)] blur-2xl" />
      </motion.div>

      {/* Grid lines */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(14,14,22,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(14,14,22,0.05)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:radial-gradient(ellipse_70%_60%_at_40%_50%,black_30%,transparent_100%)]" />

      {/* Interactive globe */}
      <motion.div
        style={{ y: globeY, opacity: globeOpacity }}
        initial={{ scale: 0.9 }}
        animate={ready ? { scale: 1 } : {}}
        transition={{ duration: 1.6, ease: EASE }}
        className="absolute inset-0"
      >
        <HeroGlobe ready={ready} />
      </motion.div>

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="pointer-events-none relative z-10 mx-auto flex w-full max-w-[1400px] flex-1 flex-col justify-start px-5 pb-14 pt-[calc(116px+min(84vw,40svh))] sm:px-6 lg:justify-center lg:px-10 lg:pb-24 lg:pt-32"
      >
        <div className="max-w-[720px] [&>*]:pointer-events-auto">
          <motion.div {...fade(0.1)} className="mb-7 inline-flex items-center gap-2.5 rounded-full border border-ink/10 bg-white/70 py-1.5 pl-1.5 pr-4 text-[13px] font-medium text-ink/80 shadow-sm backdrop-blur-md">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-ink px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.15em] text-white">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-flame" /> Sino Vorex
            </span>
            The force behind global trade
          </motion.div>

          {/* Plain text (no per-word spans) with a transform-only CSS entrance: crawlable with normal spaces, painted on the first frame. */}
          <h1 className="font-display text-[clamp(42px,6.2vw,96px)] font-medium leading-[0.95] tracking-[-0.045em] text-ink">
            <span className="sv-rise block">China Sourcing Agent</span>{" "}
            <span className="sv-rise sv-rise-2 block font-serif font-normal italic tracking-[-0.02em] text-flame">for Global Buyers</span>
          </h1>

          <p className="sv-rise sv-rise-2 mt-7 max-w-[540px] text-[clamp(16px,1.6vw,19px)] leading-relaxed text-ink/70">
            Based in Suzhou, we find factories across China, check them and their goods, and ship your order worldwide.
            <span className="text-ink"> One team, from factory floor to your port.</span>
          </p>

          <motion.div {...fade(0.9)} className="mt-9 flex flex-col items-start gap-3 sm:flex-row">
            <Magnetic strength={0.25}>
              <PillButton onClick={onContact} icon={<ArrowUpRight size={18} />}>Get a Quote</PillButton>
            </Magnetic>
            <Magnetic strength={0.25}>
              <PillButton variant="ghost" onClick={() => scrollTo("how-it-works")} icon={<ArrowDown size={18} />}>How it works</PillButton>
            </Magnetic>
          </motion.div>

          <motion.div {...fade(1.05)} className="mt-12 hidden flex-wrap items-center gap-x-6 gap-y-3 font-mono text-[11px] uppercase tracking-[0.2em] text-ink/70 sm:flex">
            {["Sourcing", "Quality inspection", "Shipping"].map((t, i) => (
              <span key={t} className="flex items-center gap-6">
                {i > 0 && <span className="h-1 w-1 rounded-full bg-flame" />}
                {t}
              </span>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Globe hint */}
      <motion.div
        {...fade(1.6)}
        className="pointer-events-none absolute bottom-10 right-28 z-10 hidden items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-ink/70 lg:flex"
      >
        <MousePointerClick size={14} className="text-flame" />
        Drag to spin · Click to ship
      </motion.div>

      {/* Scroll cue */}
      <div className="absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 lg:block">
        <motion.button {...fade(1.3)} onClick={() => scrollTo("how-it-works")} aria-label="Scroll down" className="block">
          <span className="flex h-12 w-7 justify-center rounded-full border border-ink/20 pt-2">
            <span className="h-2 w-1 animate-scroll-cue rounded-full bg-flame" />
          </span>
        </motion.button>
      </div>
    </section>
  );
}

/* ── Rotated marquee bands ─────────────────────────────────── */
export function MarqueeBands() {
  const items = SERVICES.map((s) => s.title);
  const Row = ({ dark }: { dark: boolean }) => (
    <div className={dark ? "bg-ink text-white" : "bg-flame text-white"}>
      <div className={`flex w-max py-5 ${dark ? "animate-marquee" : "animate-marquee-reverse"}`}>
        {[0, 1].map((k) => (
          <div key={k} className="flex shrink-0 items-center" aria-hidden={k === 1}>
            {[...items, ...items].map((t, i) => (
              <span key={i} className="flex items-center gap-8 pr-8 font-display text-[clamp(22px,3vw,40px)] font-medium tracking-[-0.03em]">
                <span className={i % 2 ? "font-serif font-normal italic" : ""}>{t}</span>
                <Sparkle size={22} className={dark ? "text-flame" : "text-ink"} fill="currentColor" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
  return (
    <div className="relative z-20 h-[170px] overflow-hidden md:h-[220px]">
      <div className="absolute -inset-x-[5%] top-1/2 -translate-y-1/2 rotate-[2.5deg] opacity-90"><Row dark={false} /></div>
      <div className="absolute -inset-x-[5%] top-1/2 -translate-y-1/2 -rotate-[2.5deg] shadow-[0_30px_60px_-20px_rgba(14,14,22,0.45)]"><Row dark /></div>
    </div>
  );
}
