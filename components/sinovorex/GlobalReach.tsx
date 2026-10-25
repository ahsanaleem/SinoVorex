"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { ArrowUpRight, Clock, Pause, Play, Plane, Timer } from "lucide-react";
import { clsx } from "clsx";
import { CITY_DATA, HQ, MAP_H, MAP_W, REGIONS, distanceFromHQ, routePath } from "./data";
import { EASE, Eyebrow, Reveal, SplitWords } from "./primitives";

type City = (typeof CITY_DATA)[number];
type Region = (typeof REGIONS)[number];
const TOUR_MS = 5000;

/* ── Time helpers ──────────────────────────────────────────── */
function offsetMinutes(tz: string, d: Date) {
  return (Date.parse(d.toLocaleString("en-US", { timeZone: tz })) - Date.parse(d.toLocaleString("en-US", { timeZone: "UTC" }))) / 60000;
}
function useNow() {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 1000 * 15);
    return () => clearInterval(id);
  }, []);
  return now;
}

/* ── Map ───────────────────────────────────────────────────── */
function WorldMap({ cities, active, onPick }: { cities: readonly City[]; active: City; onPick: (c: City) => void }) {
  const [hover, setHover] = useState<string | null>(null);
  const [hx, hy] = HQ.pin;

  return (
    <div className="relative overflow-hidden rounded-[24px] border border-white/10 bg-[#07070D]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_70%_at_82%_40%,rgba(255,107,43,0.14),transparent_70%)]" />
      <div className="relative" style={{ aspectRatio: `${MAP_W} / ${MAP_H}` }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/world-dots.svg" loading="lazy" decoding="async" width={147} height={70} alt="World map showing shipping routes from China to partner markets" className="absolute inset-0 h-full w-full opacity-[0.16]" draggable={false} />

        <svg viewBox={`0 0 ${MAP_W} ${MAP_H}`} className="absolute inset-0 h-full w-full">
          <defs>
            <linearGradient id="route-grad" x1="0" x2="1">
              <stop offset="0%" stopColor="#FF6B2B" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#FFB088" />
            </linearGradient>
            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="0.6" result="b" />
              <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>

          {/* Faint routes to every visible hub */}
          {cities.map((c, i) => (
            <motion.path
              key={`r-${c.label}`}
              d={routePath(c.pin)}
              fill="none"
              stroke="rgba(255,255,255,0.14)"
              strokeWidth="0.18"
              strokeDasharray="0.8 0.6"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1.2, delay: i * 0.06, ease: EASE }}
            />
          ))}

          {/* Highlighted active route */}
          <motion.path
            key={`a-${active.label}`}
            d={routePath(active.pin)}
            fill="none"
            stroke="#FF6B2B"
            strokeWidth="0.45"
            strokeLinecap="round"
            filter="url(#glow)"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.1, ease: EASE }}
          />
          <circle key={`dot-${active.label}`} r="0.7" fill="#FFF3EA" filter="url(#glow)">
            <animateMotion dur="2.4s" begin="1s" repeatCount="indefinite" path={routePath(active.pin)} />
            <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.1;0.85;1" dur="2.4s" begin="1s" repeatCount="indefinite" />
          </circle>

          {/* City pins */}
          {cities.map((c) => {
            const [x, y] = c.pin;
            const on = c.label === active.label;
            const show = on || hover === c.label;
            return (
              <g key={`p-${c.label}`} className="cursor-pointer" onClick={() => onPick(c)} onMouseEnter={() => setHover(c.label)} onMouseLeave={() => setHover(null)}>
                <circle cx={x} cy={y} r="3.2" fill="transparent" />
                {on && (
                  <circle cx={x} cy={y} r="1.2" fill="none" stroke="#FF6B2B" strokeWidth="0.25">
                    <animate attributeName="r" values="1.2;4;1.2" dur="2s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="1;0;1" dur="2s" repeatCount="indefinite" />
                  </circle>
                )}
                <circle cx={x} cy={y} r={on ? 1.15 : 0.75} fill={on ? "#FF6B2B" : "#0E0E16"} stroke={on ? "#FFE0CC" : "#FF6B2B"} strokeWidth={on ? 0.3 : 0.25} style={{ transition: "all .3s" }} />
                <AnimatePresence>
                  {show && (
                    <motion.g initial={{ opacity: 0, y: 1 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
                      <rect x={x - c.label.length * 0.72 - 1.2} y={y - 6} width={c.label.length * 1.44 + 2.4} height="3.6" rx="1.8" fill={on ? "#FF6B2B" : "rgba(255,255,255,0.92)"} />
                      <text x={x} y={y - 3.5} textAnchor="middle" fontSize="2.1" fontWeight="600" fill={on ? "#FFFFFF" : "#0E0E16"} style={{ fontFamily: "var(--font-display), sans-serif" }}>{c.label}</text>
                    </motion.g>
                  )}
                </AnimatePresence>
              </g>
            );
          })}

          {/* China origin (Shanghai port) */}
          <g>
            {[0, 1].map((b) => (
              <circle key={b} cx={hx} cy={hy} r="1.5" fill="none" stroke="#FF6B2B" strokeWidth="0.25">
                <animate attributeName="r" values="1.5;6;1.5" dur="3s" begin={`${b * 1.5}s`} repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.9;0;0.9" dur="3s" begin={`${b * 1.5}s`} repeatCount="indefinite" />
              </circle>
            ))}
            <circle cx={hx} cy={hy} r="1.6" fill="#FF6B2B" filter="url(#glow)" />
            <circle cx={hx} cy={hy} r="0.7" fill="#FFF3EA" />
            <text x={hx + 2.6} y={hy + 0.8} fontSize="2.3" fontWeight="600" fill="#FFFFFF" style={{ fontFamily: "var(--font-display), sans-serif" }}>China</text>
          </g>
        </svg>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-white/10 px-5 py-3 font-mono text-[10px] uppercase tracking-[0.18em] text-white/65">
        <span className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full bg-flame shadow-[0_0_10px_#FF6B2B]" />China (Shanghai port)</span>
        <span className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full border-2 border-flame" />Destination</span>
        <span className="flex items-center gap-2"><span className="h-[2px] w-5 rounded bg-flame" />Selected route</span>
        <span className="ml-auto hidden text-white/65 sm:inline">Tap a pin or a city to explore</span>
      </div>
    </div>
  );
}

/* ── Detail card ───────────────────────────────────────────── */
function CityDetail({ city, onQuote }: { city: City; onQuote?: () => void }) {
  const now = useNow();
  const km = distanceFromHQ(city.lat, city.lng);
  const local = now ? new Intl.DateTimeFormat("en-GB", { timeZone: city.tz, hour: "2-digit", minute: "2-digit" }).format(now) : " ";
  const diffH = now ? (offsetMinutes(city.tz, now) - offsetMinutes("Asia/Shanghai", now)) / 60 : null;
  const diff = diffH === null ? "00a0" : diffH === 0 ? "Same time" : `${diffH > 0 ? "+" : "−"}${Math.abs(diffH)}h`;

  const stats = [
    { icon: Plane, label: "From Shanghai", value: `≈ ${km.toLocaleString("en-US")} km` },
    { icon: Clock, label: "Local time", value: local },
    { icon: Timer, label: "vs. China time", value: diff },
  ];

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={city.label}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.45, ease: EASE }}
        className="grid gap-6 rounded-[24px] border border-white/10 bg-gradient-to-br from-white/[0.06] to-white/[0.02] p-6 md:grid-cols-[1.2fr_1fr] md:p-7"
      >
        <div>
          <div className="flex items-center gap-3">
            <span className="rounded-full bg-flame/15 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-flame">{city.region}</span>
            <span className="text-[13px] text-white/65">{city.country}</span>
          </div>
          <h3 className="mt-4 font-display text-[clamp(30px,4vw,44px)] font-medium leading-none tracking-[-0.04em] text-white">
            China <span className="font-serif font-normal italic text-flame">→</span> {city.label}
          </h3>
          <p className="mt-5 max-w-[440px] text-[16px] leading-relaxed text-white/80">
            Sea, air and rail options depend on the route and your goods. Tell us what you&apos;re ordering and we&apos;ll quote freight to {city.label}.
          </p>
          {onQuote && (
            <button onClick={onQuote} className="group mt-5 inline-flex items-center gap-2 rounded-full bg-flame px-5 py-2.5 text-[14px] font-medium text-white transition-transform hover:scale-[1.03]">
              Get a quote to {city.label}
              <ArrowUpRight size={16} className="transition-transform duration-500 group-hover:rotate-45" />
            </button>
          )}
        </div>
        <div className="grid grid-cols-1 gap-2 self-end sm:grid-cols-3 md:grid-cols-1">
          {stats.map(({ icon: Icon, label, value }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.1 + i * 0.06, ease: EASE }}
              className="flex items-center justify-between gap-1 rounded-2xl bg-white/[0.04] px-4 py-3 sm:flex-col sm:items-start sm:px-3 md:flex-row md:items-center md:justify-between md:px-4"
            >
              <span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.15em] text-white/70">
                <Icon size={14} className="text-flame" />{label}
              </span>
              <span className="font-display text-[17px] font-medium tabular-nums text-white">{value}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

/* ── Section ───────────────────────────────────────────────── */
export function GlobalReach({ onQuote }: { onQuote?: () => void }) {
  const [region, setRegion] = useState<Region>("All");
  const [activeLabel, setActiveLabel] = useState<string>(CITY_DATA[0].label);
  const [touring, setTouring] = useState(true);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-20%" });

  const cities = useMemo(() => CITY_DATA.filter((c) => region === "All" || c.region === region), [region]);
  const active = cities.find((c) => c.label === activeLabel) ?? cities[0];

  useEffect(() => {
    if (!touring || !inView || cities.length < 2) return;
    const id = setTimeout(() => {
      const i = cities.findIndex((c) => c.label === active.label);
      setActiveLabel(cities[(i + 1) % cities.length].label);
    }, TOUR_MS);
    return () => clearTimeout(id);
  }, [touring, inView, cities, active.label]);

  // Keep the active chip visible when the list scrolls horizontally (mobile)
  const listRef = useRef<HTMLUListElement>(null);
  useEffect(() => {
    const list = listRef.current;
    const el = list?.querySelector<HTMLElement>(`[data-city="${active.label}"]`);
    if (list && el && list.scrollWidth > list.clientWidth) list.scrollTo({ left: el.offsetLeft - 8, behavior: "smooth" });
  }, [active.label]);

  const pick = (c: City) => { setActiveLabel(c.label); setTouring(false); };
  const pickRegion = (r: Region) => {
    setRegion(r);
    const first = CITY_DATA.find((c) => r === "All" || c.region === r);
    if (first) setActiveLabel(first.label);
  };

  return (
    <section id="global-reach" className="cv-auto bg-white px-2 sm:px-3">
      <div data-theme="dark" className="relative overflow-hidden rounded-[32px] bg-ink px-4 py-24 text-white sm:px-6 md:rounded-[48px] md:py-32">
        <div className="pointer-events-none absolute left-1/2 top-0 h-[500px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-flame/20 blur-[120px]" />
        <div ref={ref} className="relative mx-auto max-w-[1280px]">
          <div className="mb-12 grid gap-8 lg:grid-cols-[1.3fr_1fr] lg:items-end">
            <div>
              <Eyebrow dark>Where we ship</Eyebrow>
              <h2 className="font-display text-[clamp(38px,5.5vw,76px)] font-medium leading-[0.95] tracking-[-0.045em]">
                <SplitWords text="Connected across" />
                {" "}<br />
                <span className="font-serif font-normal italic tracking-[-0.02em] text-flame"><SplitWords text="every major market" delay={0.2} /></span>
              </h2>
            </div>
            <Reveal delay={0.2}>
              <p className="max-w-[440px] text-[17px] leading-relaxed text-white/65 lg:ml-auto">
                We ship from China to buyers across Asia, Europe, the Americas and beyond. Pick a market to see the route, distance and time difference.
              </p>
            </Reveal>
          </div>

          <Reveal>
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-[320px_minmax(0,1fr)]">
              {/* City selector */}
              <div className="order-2 flex min-w-0 flex-col rounded-[24px] border border-white/10 bg-white/[0.03] p-3 lg:order-1">
                <div className="flex flex-wrap gap-1.5 p-1">
                  {REGIONS.map((r) => (
                    <button
                      key={r}
                      onClick={() => pickRegion(r)}
                      className={clsx("relative rounded-full px-3.5 py-1.5 text-[12px] font-medium transition-colors", region === r ? "text-white" : "text-white/65 hover:text-white")}
                    >
                      {region === r && <motion.span layoutId="region-pill" className="absolute inset-0 rounded-full bg-flame" transition={{ type: "spring", stiffness: 400, damping: 34 }} />}
                      <span className="relative">{r}</span>
                    </button>
                  ))}
                </div>
                <div className="my-2 h-px bg-white/10" />
                <ul ref={listRef} className="relative -mx-1 flex flex-1 gap-1 overflow-x-auto px-1 pb-1 [scrollbar-width:none] lg:mx-0 lg:block lg:space-y-0.5 lg:overflow-visible lg:p-0" data-lenis-prevent-horizontal>
                  <AnimatePresence initial={false} mode="popLayout">
                    {cities.map((c) => {
                      const on = c.label === active.label;
                      return (
                        <motion.li key={c.label} data-city={c.label} layout className="shrink-0 lg:shrink" initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 12 }} transition={{ duration: 0.3, ease: EASE }}>
                          <button onClick={() => pick(c)} className="group relative flex w-full items-center gap-3 overflow-hidden rounded-2xl px-4 py-3 text-left">
                            {on && <motion.span layoutId="city-active" className="absolute inset-0 rounded-2xl bg-white/[0.07]" transition={{ type: "spring", stiffness: 400, damping: 36 }} />}
                            <span className={clsx("relative h-2 w-2 shrink-0 rounded-full transition-all duration-300", on ? "scale-125 bg-flame shadow-[0_0_10px_#FF6B2B]" : "bg-white/20 group-hover:bg-white/50")} />
                            <span className="relative flex-1">
                              <span className={clsx("block text-[15px] font-medium transition-colors", on ? "text-white" : "text-white/65 group-hover:text-white")}>{c.label}</span>
                              <span className="block text-[11px] text-white/65">{c.region}</span>
                            </span>
                            <span className="relative hidden font-mono text-[11px] tabular-nums text-white/70 lg:inline">{distanceFromHQ(c.lat, c.lng).toLocaleString("en-US")} km</span>
                            {on && touring && inView && (
                              <motion.span key={`tour-${c.label}`} className="absolute bottom-0 left-4 right-4 h-[2px] origin-left rounded bg-flame" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: TOUR_MS / 1000, ease: "linear" }} />
                            )}
                          </button>
                        </motion.li>
                      );
                    })}
                  </AnimatePresence>
                </ul>
                <button
                  onClick={() => setTouring((t) => !t)}
                  className="mt-2 flex items-center justify-center gap-2 rounded-2xl border border-white/10 py-2.5 text-[12px] font-medium text-white/70 transition-colors hover:border-flame hover:text-white"
                >
                  {touring ? <Pause size={14} /> : <Play size={14} />}
                  {touring ? "Pause auto-tour" : "Resume auto-tour"}
                </button>
              </div>

              {/* Map + details */}
              <div className="order-1 min-w-0 space-y-4 lg:order-2">
                <WorldMap cities={cities} active={active} onPick={pick} />
                <CityDetail city={active} onQuote={onQuote} />
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
