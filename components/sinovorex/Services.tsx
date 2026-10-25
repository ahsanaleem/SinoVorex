"use client";

import { useRef, useState } from "react";
import { motion, useMotionTemplate, useMotionValue, useMotionValueEvent, useScroll, useSpring } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { clsx } from "clsx";
import Link from "next/link";
import { BUSINESS_SERVICES, PROCESS, SERVICES } from "./data";
import { EASE, Eyebrow, Reveal, SplitWords } from "./primitives";

/* Gentle looping motion per step icon, played once the timeline reaches it. */
const STEP_ICON_ANIM = [
  { animate: { y: [0, -4, 0] },                     duration: 1.6 }, // inquiry: message bubble bounces
  { animate: { x: [0, 4, -3, 0], y: [0, -2, 1, 0] }, duration: 2.4 }, // sourcing: magnifier searches
  { animate: { rotate: [0, -10, 8, 0] },             duration: 2.2 }, // samples: box wobbles
  { animate: { scale: [1, 1.12, 1] },                duration: 1.8 }, // production: factory pulses
  { animate: { rotate: [0, 8, -4, 0], y: [0, -2, 0] }, duration: 2.0 }, // inspection: clipboard tilts
  { animate: { rotate: [-6, 6, -6], y: [0, -2, 0] }, duration: 2.6 }, // shipping: ship rocks on waves
];

/* ── How it works: connected timeline that fills as you scroll ─ */
export function HowItWorks() {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 60%"] });
  const fill = useSpring(scrollYProgress, { stiffness: 90, damping: 24 });
  const [reached, setReached] = useState(0);
  useMotionValueEvent(fill, "change", (v) => setReached(Math.min(PROCESS.length, Math.floor(v * PROCESS.length + 0.35))));

  return (
    <section id="how-it-works" className="relative scroll-mt-24 bg-paper px-4 py-20 sm:px-6 md:py-28">
      <div className="mx-auto max-w-[1280px]">
        <div className="mb-14 grid gap-6 lg:grid-cols-[1.3fr_1fr] lg:items-end">
          <div>
            <Eyebrow>How it works</Eyebrow>
            <h2 className="font-display text-[clamp(34px,5vw,68px)] font-medium leading-[0.95] tracking-[-0.045em] text-ink">
              <SplitWords text="Ordering from China," />
              {" "}<br />
              <span className="font-serif font-normal italic tracking-[-0.02em] text-flame"><SplitWords text="step by step" delay={0.2} /></span>
            </h2>
          </div>
          <Reveal delay={0.2}>
            <p className="max-w-[440px] text-[17px] leading-relaxed text-ink/70 lg:ml-auto">
              Six steps from your first message to goods at your door. Here's what we do at each step, and the few things we need from you.
            </p>
            <div className="mt-5 flex gap-5 text-[13px] font-medium lg:justify-end">
              <span className="flex items-center gap-2 text-ink"><span className="h-2.5 w-2.5 rounded-full bg-flame" />We do</span>
              <span className="flex items-center gap-2 text-ink"><span className="h-2.5 w-2.5 rounded-full border-2 border-ink" />You do</span>
            </div>
          </Reveal>
        </div>

        <ol ref={ref} className="relative grid gap-8 lg:grid-cols-6 lg:grid-rows-[auto_auto_auto_1fr_1fr] lg:gap-x-4 lg:gap-y-0">
          {/* Track + fill: horizontal on desktop, vertical on mobile */}
          <div className="pointer-events-none absolute left-[8.33%] right-[8.33%] top-[36px] hidden h-[2px] rounded bg-ink/10 lg:block">
            <motion.div style={{ scaleX: fill }} className="h-full origin-left rounded bg-flame" />
          </div>
          <div className="pointer-events-none absolute bottom-10 left-[35px] top-10 w-[2px] rounded bg-ink/10 lg:hidden">
            <motion.div style={{ scaleY: fill }} className="h-full w-full origin-top rounded bg-flame" />
          </div>

          {PROCESS.map((p, i) => {
            const Icon = p.icon;
            const on = i < reached;
            const current = i === reached - 1;
            const anim = STEP_ICON_ANIM[i % STEP_ICON_ANIM.length];
            return (
              <motion.li
                key={p.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.8, delay: i * 0.08, ease: EASE }}
                className="group relative flex gap-5 lg:row-span-5 lg:grid lg:grid-rows-subgrid lg:justify-items-center lg:gap-0 lg:text-center"
              >
                {/* Icon node */}
                <div className="relative z-10 shrink-0">
                  {current && <span className="absolute inset-0 animate-ping rounded-full bg-flame/30" />}
                  <span
                    className={clsx(
                      "relative grid h-[72px] w-[72px] place-items-center rounded-full border-2 transition-all duration-500 ease-apple group-hover:scale-105",
                      on ? "border-flame bg-flame text-white shadow-[0_14px_30px_-10px_rgba(255,107,43,0.7)]" : "border-ink/10 bg-white text-ink/60",
                    )}
                  >
                    <motion.span
                      className="grid place-items-center"
                      animate={on ? anim.animate : { x: 0, y: 0, rotate: 0, scale: 1 }}
                      transition={on ? { duration: anim.duration, repeat: Infinity, ease: "easeInOut", delay: 0.3 } : { duration: 0.3 }}
                    >
                      <Icon size={28} strokeWidth={1.6} />
                    </motion.span>
                  </span>
                  <span className={clsx(
                    "absolute -right-1 -top-1 grid h-7 w-7 place-items-center rounded-full border-2 border-paper font-mono text-[11px] font-medium transition-colors duration-500",
                    on ? "bg-ink text-white" : "bg-ink/10 text-ink/70",
                  )}>
                    {i + 1}
                  </span>
                </div>

                {/* Text: a normal column on mobile; on desktop its children join the shared subgrid rows */}
                <div className="flex-1 pb-2 lg:contents">
                  <h3 className="font-display text-[22px] font-medium tracking-[-0.03em] text-ink lg:mt-6">
                    <Link href={p.href} className="underline-offset-4 transition-colors hover:text-flame hover:underline">{p.title}</Link>
                  </h3>
                  <p className="mt-1.5 text-[14px] leading-relaxed text-ink/70 lg:px-1">{p.desc}</p>
                  <div className="mt-4 grid rounded-2xl border border-ink/[0.07] bg-white text-left text-[13px] transition-colors duration-500 group-hover:border-flame/30 lg:row-span-2 lg:mt-5 lg:w-full lg:grid-rows-subgrid">
                    <div className="px-4 pb-3 pt-3.5">
                      <div className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.15em] text-flame">
                        <span className="h-2 w-2 rounded-full bg-flame" />We do
                      </div>
                      <p className="mt-1 leading-snug text-ink/85">{p.we}</p>
                    </div>
                    <div className="border-t border-ink/[0.07] px-4 pb-3.5 pt-3">
                      <div className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.15em] text-ink">
                        <span className="h-2 w-2 rounded-full border-2 border-ink" />You do
                      </div>
                      <p className="mt-1 leading-snug text-ink/85">{p.you}</p>
                    </div>
                  </div>
                </div>
              </motion.li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

function ServiceCard({ s, i }: { s: (typeof SERVICES)[number]; i: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(-400), my = useMotionValue(-400);
  const rx = useSpring(0, { stiffness: 160, damping: 18 }), ry = useSpring(0, { stiffness: 160, damping: 18 });
  const spotlight = useMotionTemplate`radial-gradient(420px circle at ${mx}px ${my}px, rgba(255,107,43,0.16), transparent 70%)`;
  const featured = i === 0;
  const Icon = s.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 1, delay: (i % 3) * 0.12, ease: EASE }}
      style={{ perspective: 1000 }}
    >
      <Link href={`/services/${s.slug}`} className="block h-full rounded-[28px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-flame focus-visible:ring-offset-4" aria-label={`${s.title}: learn more`}>
      <motion.div
        ref={ref}
        data-theme={featured ? "dark" : undefined}
        style={{ rotateX: rx, rotateY: ry }}
        onMouseMove={(e) => {
          const r = ref.current!.getBoundingClientRect();
          const x = e.clientX - r.left, y = e.clientY - r.top;
          mx.set(x); my.set(y);
          ry.set((x / r.width - 0.5) * 6);
          rx.set((0.5 - y / r.height) * 6);
        }}
        onMouseLeave={() => { mx.set(-400); my.set(-400); rx.set(0); ry.set(0); }}
        className={clsx(
          "group relative flex h-full min-h-[340px] flex-col overflow-hidden rounded-[28px] border p-8 transition-[border-color,box-shadow] duration-500 [transform-style:preserve-3d] md:p-9",
          featured
            ? "border-white/10 bg-ink text-white hover:shadow-[0_40px_80px_-30px_rgba(255,107,43,0.5)]"
            : "border-ink/[0.07] bg-white text-ink hover:border-flame/30 hover:shadow-[0_40px_80px_-30px_rgba(14,14,22,0.25)]",
        )}
      >
        <motion.div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" style={{ background: spotlight }} />
        {featured && <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-flame/25 blur-3xl" />}

        <div className="relative flex items-start justify-between">
          <span className={clsx(
            "grid h-14 w-14 place-items-center rounded-2xl transition-all duration-500 ease-apple group-hover:-rotate-6 group-hover:scale-110",
            featured ? "bg-flame text-white" : "bg-flame/10 text-flame group-hover:bg-flame group-hover:text-white",
          )}>
            <Icon size={24} strokeWidth={1.6} />
          </span>
          <span className={clsx("font-mono text-xs", featured ? "text-white/70" : "text-ink/50")}>/{s.num}</span>
        </div>

        <h3 className="relative pt-14 font-display text-[26px] font-medium leading-tight tracking-[-0.03em]">{s.title}</h3>
        <p className={clsx("relative mt-3 text-[15px] leading-relaxed", featured ? "text-white/70" : "text-ink/70")}>{s.desc}</p>

        <div className="relative mt-auto flex items-center justify-between gap-3 pt-6">
          <div className="flex flex-wrap gap-1.5">
            {s.detail.map((d) => (
              <span key={d} className={clsx(
                "rounded-full px-3 py-1 font-mono text-[10px] uppercase tracking-[0.12em]",
                featured ? "bg-white/10 text-white/70" : "bg-ink/[0.04] text-ink/70",
              )}>{d}</span>
            ))}
          </div>
          <span className={clsx("flex shrink-0 items-center gap-2 text-[13px] font-medium", featured ? "text-white" : "text-ink")}>
            <span className="hidden sm:inline">Learn more</span>
            <span className={clsx(
              "grid h-10 w-10 place-items-center rounded-full transition-all duration-500 ease-apple group-hover:rotate-45",
              featured ? "bg-white text-ink" : "bg-ink/[0.05] text-ink group-hover:bg-ink group-hover:text-white",
            )}>
              <ArrowUpRight size={18} />
            </span>
          </span>
        </div>
      </motion.div>
      </Link>
    </motion.div>
  );
}

export function Services() {
  return (
    <section id="services" className="relative bg-paper px-4 pb-24 pt-8 sm:px-6 md:pb-36">
      <div className="mx-auto max-w-[1280px]">
        <div className="mb-14 grid gap-8 md:mb-20 lg:grid-cols-[1.3fr_1fr] lg:items-end">
          <div>
            <Eyebrow>What we do</Eyebrow>
            <h2 className="font-display text-[clamp(38px,6vw,84px)] font-medium leading-[0.95] tracking-[-0.045em] text-ink">
              <SplitWords text="From factory floor" />
              {" "}<br />
              <span className="font-serif font-normal italic tracking-[-0.02em] text-flame"><SplitWords text="to your port" delay={0.2} /></span>
            </h2>
          </div>
          <Reveal delay={0.2}>
            <p className="max-w-[460px] text-[17px] leading-relaxed text-ink/70 lg:ml-auto">
              We find the right factories in China, check them and their goods, and get your order shipped. Use one service or all of them.
            </p>
          </Reveal>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s, i) => <ServiceCard key={s.num} s={s} i={i} />)}
        </div>

        {/* Beyond sourcing: company set-up, visas and business trips. */}
        <div className="mt-16 rounded-[32px] border border-ink/[0.07] bg-white p-6 md:p-10">
          <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="font-mono text-[11px] uppercase tracking-[0.25em] text-flame">Also</div>
              <h3 className="mt-2 font-display text-[clamp(26px,3vw,38px)] font-medium leading-tight tracking-[-0.035em] text-ink">Doing business in China</h3>
            </div>
            <Link href="/services#business" className="inline-flex items-center gap-1.5 text-[15px] font-medium text-flame hover:underline">See all services <ArrowUpRight size={15} /></Link>
          </div>
          <ul className="mt-8 grid gap-3 md:grid-cols-3">
            {BUSINESS_SERVICES.map((s) => {
              const Icon = s.icon;
              return (
                <li key={s.slug}>
                  <Link href={`/services/${s.slug}`} className="group flex h-full gap-4 rounded-2xl bg-paper p-5 transition-colors hover:bg-flame/[0.08]">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-flame text-white"><Icon size={20} strokeWidth={1.7} /></span>
                    <span>
                      <span className="flex items-center gap-1.5 font-display text-[18px] font-medium text-ink">{s.title}<ArrowUpRight size={15} className="text-flame transition-transform group-hover:rotate-45" /></span>
                      <span className="mt-1 block text-[14px] leading-relaxed text-ink/70">{s.desc}</span>
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
