"use client";

import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { motion, animate, useInView, useMotionValue, useSpring, type Variants } from "framer-motion";
import Lenis from "lenis";
import { clsx } from "clsx";

export const EASE = [0.22, 1, 0.36, 1] as const;

/* ── Smooth scroll (Lenis) ─────────────────────────────────── */
const LenisContext = createContext<Lenis | null>(null);
export const useLenis = () => useContext(LenisContext);

export function SmoothScroll({ children }: { children: ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const l = new Lenis({ duration: 1.15, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
    let raf = 0;
    const loop = (t: number) => { l.raf(t); raf = requestAnimationFrame(loop); };
    raf = requestAnimationFrame(loop);
    setLenis(l);
    return () => { cancelAnimationFrame(raf); l.destroy(); };
  }, []);
  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>;
}

export function useScrollTo() {
  const lenis = useLenis();
  return (id: string) => {
    const el = id === "top" ? 0 : document.getElementById(id);
    if (el === null) return;
    if (lenis) lenis.scrollTo(el as HTMLElement | number, { offset: id === "top" ? 0 : -24 });
    else if (el === 0) window.scrollTo({ top: 0, behavior: "smooth" });
    else el.scrollIntoView({ behavior: "smooth" });
  };
}

/* ── Reveal on scroll ──────────────────────────────────────── */
export function Reveal({ children, delay = 0, y = 40, className }: { children: ReactNode; delay?: number; y?: number; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 1, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

/* ── Word-by-word masked text reveal ───────────────────────── */
const wordsContainer = (stagger: number, delay: number): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: stagger, delayChildren: delay } },
});
const wordVariant: Variants = {
  hidden: { y: "115%", rotate: 3 },
  show: { y: "0%", rotate: 0, transition: { duration: 1, ease: EASE } },
};

export function SplitWords({
  text, className, delay = 0, stagger = 0.06, play,
}: { text: string; className?: string; delay?: number; stagger?: number; play?: boolean }) {
  const trigger = play === undefined
    ? { initial: "hidden", whileInView: "show", viewport: { once: true, margin: "-60px" } }
    : { initial: "hidden", animate: play ? "show" : "hidden" };
  return (
    <motion.span className={clsx("inline", className)} variants={wordsContainer(stagger, delay)} {...trigger}>
      {text.split(" ").map((w, i) => (
        <span key={i} className="inline-block overflow-hidden pb-[0.12em] -mb-[0.12em] align-bottom">
          <motion.span className="inline-block origin-bottom-left" variants={wordVariant}>
            {w}{" "}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}

/* ── Magnetic hover wrapper ────────────────────────────────── */
export function Magnetic({ children, strength = 0.35, className }: { children: ReactNode; strength?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useSpring(useMotionValue(0), { stiffness: 220, damping: 15, mass: 0.4 });
  const y = useSpring(useMotionValue(0), { stiffness: 220, damping: 15, mass: 0.4 });
  return (
    <motion.div
      ref={ref}
      className={clsx("inline-block", className)}
      style={{ x, y }}
      onMouseMove={(e) => {
        const r = ref.current!.getBoundingClientRect();
        x.set((e.clientX - r.left - r.width / 2) * strength);
        y.set((e.clientY - r.top - r.height / 2) * strength);
      }}
      onMouseLeave={() => { x.set(0); y.set(0); }}
    >
      {children}
    </motion.div>
  );
}

/* ── Count-up number ───────────────────────────────────────── */
export function CountUp({ to, suffix = "", className }: { to: number; suffix?: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  useEffect(() => {
    if (!inView) return;
    const c = animate(0, to, {
      duration: 2.2, ease: EASE,
      onUpdate: (v) => { if (ref.current) ref.current.textContent = String(Math.round(v)); },
    });
    return () => c.stop();
  }, [inView, to]);
  return (
    <span className={className}>
      <span ref={ref}>0</span>
      <span className="text-flame">{suffix}</span>
    </span>
  );
}

/* ── Section eyebrow label ─────────────────────────────────── */
export function Eyebrow({ children, dark = false }: { children: ReactNode; dark?: boolean }) {
  return (
    <Reveal y={16} className="mb-6">
      <span className={clsx(
        "inline-flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.25em]",
        dark ? "text-white/70" : "text-ink/70",
      )}>
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-flame opacity-60" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-flame" />
        </span>
        {children}
      </span>
    </Reveal>
  );
}

/* ── Arrow pill button ─────────────────────────────────────── */
export function PillButton({
  children, onClick, variant = "dark", icon, className,
}: { children: ReactNode; onClick?: () => void; variant?: "dark" | "light" | "flame" | "ghost"; icon?: ReactNode; className?: string }) {
  const styles = {
    dark:  "bg-ink text-white",
    light: "bg-white text-ink",
    flame: "bg-flame text-white",
    ghost: "bg-transparent text-ink ring-1 ring-inset ring-ink/15 hover:ring-ink/40",
  }[variant];
  const dot = {
    dark: "bg-flame text-white", light: "bg-ink text-white", flame: "bg-white text-flame", ghost: "bg-ink text-white",
  }[variant];
  return (
    <button
      onClick={onClick}
      className={clsx(
        "group relative inline-flex items-center gap-4 overflow-hidden rounded-full py-2 pl-7 pr-2 text-[15px] font-medium tracking-tight transition-[box-shadow,transform] duration-500 ease-apple hover:shadow-[0_18px_40px_-12px_rgba(255,107,43,0.55)] active:scale-[0.97]",
        styles, className,
      )}
    >
      <span className="relative z-10 block overflow-hidden">
        <span className="block transition-transform duration-500 ease-apple group-hover:-translate-y-full">{children}</span>
        <span className="absolute inset-0 block translate-y-full transition-transform duration-500 ease-apple group-hover:translate-y-0">{children}</span>
      </span>
      <span className={clsx("relative z-10 grid h-11 w-11 place-items-center overflow-hidden rounded-full", dot)}>
        <span className="transition-transform duration-500 ease-apple group-hover:translate-x-[150%] group-hover:-translate-y-[150%]">{icon}</span>
        <span className="absolute -translate-x-[150%] translate-y-[150%] transition-transform duration-500 ease-apple group-hover:translate-x-0 group-hover:translate-y-0">{icon}</span>
      </span>
    </button>
  );
}

/* ── Sino Vorex brand assets (public/brand, from SinoVorex-Logo) ── */
/** Full horizontal logo: globe mark + SINO VOREX + TRADE CONSULTING (435×120). */
export function BrandLogo({ dark = false, className }: { dark?: boolean; className?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`/brand/sinovorex-logo-horizontal-on-${dark ? "dark" : "light"}.svg`}
      alt="Sino Vorex — Sourcing & Export"
      width={434} height={120}
      draggable={false}
      className={clsx("block select-none", className)}
    />
  );
}

/** Globe mark on its own (square). */
export function BrandMark({ dark = false, className }: { dark?: boolean; className?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`/brand/sinovorex-mark-on-${dark ? "dark" : "light"}.svg`}
      alt=""
      aria-hidden
      width={512} height={512}
      draggable={false}
      className={clsx("block select-none", className)}
    />
  );
}
