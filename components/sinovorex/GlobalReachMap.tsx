"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowUpRight, Clock, Pause, Play, Plane, Timer } from "lucide-react";
import { clsx } from "clsx";
import { CITY_DATA, HQ, MAP_H, MAP_W, REGIONS, distanceFromHQ, routePath } from "./data";
import { openQuote } from "./islands";

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
            <path
              key={`r-${c.label}`}
              d={routePath(c.pin)}
              fill="none"
              stroke="rgba(255,255,255,0.14)"
              strokeWidth="0.18"
              strokeDasharray="0.8 0.6"
              className="sv-route-in"
              style={{ animationDelay: `${i * 0.06}s` }}
            />
          ))}

          {/* Highlighted active route */}
          <path
            key={`a-${active.label}`}
            d={routePath(active.pin)}
            fill="none"
            stroke="#FF6B2B"
            strokeWidth="0.45"
            strokeLinecap="round"
            filter="url(#glow)"
            pathLength={1}
            strokeDasharray="1"
            className="sv-draw"
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
                {show && (
                    <g className="sv-fade-quick">
                      <rect x={x - c.label.length * 0.72 - 1.2} y={y - 6} width={c.label.length * 1.44 + 2.4} height="3.6" rx="1.8" fill={on ? "#FF6B2B" : "rgba(255,255,255,0.92)"} />
                      <text x={x} y={y - 3.5} textAnchor="middle" fontSize="2.1" fontWeight="600" fill={on ? "#FFFFFF" : "#0E0E16"} style={{ fontFamily: "var(--font-display), sans-serif" }}>{c.label}</text>
                    </g>
                  )}
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
function CityDetail({ city }: { city: City }) {
  const now = useNow();
  const km = distanceFromHQ(city.lat, city.lng);
  const local = now ? new Intl.DateTimeFormat("en-GB", { timeZone: city.tz, hour: "2-digit", minute: "2-digit" }).format(now) : " ";
  const diffH = now ? (offsetMinutes(city.tz, now) - offsetMinutes("Asia/Shanghai", now)) / 60 : null;
  const diff = diffH === null ? " " : diffH === 0 ? "Same time" : `${diffH > 0 ? "+" : "−"}${Math.abs(diffH)}h`;

  const stats = [
    { icon: Plane, label: "From Shanghai", value: `≈ ${km.toLocaleString("en-US")} km` },
    { icon: Clock, label: "Local time", value: local },
    { icon: Timer, label: "vs. China time", value: diff },
  ];

  return (
      <div
        key={city.label}
        className="sv-fade grid gap-6 rounded-[24px] border border-white/10 bg-gradient-to-br from-white/[0.06] to-white/[0.02] p-6 md:grid-cols-[1.2fr_1fr] md:p-7"
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
          <button type="button" onClick={openQuote} className="group mt-5 inline-flex items-center gap-2 rounded-full bg-flame px-5 py-2.5 text-[14px] font-medium text-white transition-transform hover:scale-[1.03]">
              Get a quote to {city.label}
              <ArrowUpRight size={16} className="transition-transform duration-500 group-hover:rotate-45" />
            </button>
        </div>
        <div className="grid grid-cols-1 gap-2 self-end sm:grid-cols-3 md:grid-cols-1">
          {stats.map(({ icon: Icon, label, value }) => (
            <div
              key={label}
              className="flex items-center justify-between gap-1 rounded-2xl bg-white/[0.04] px-4 py-3 sm:flex-col sm:items-start sm:px-3 md:flex-row md:items-center md:justify-between md:px-4"
            >
              <span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.15em] text-white/70">
                <Icon size={14} className="text-flame" />{label}
              </span>
              <span className="font-display text-[17px] font-medium tabular-nums text-white">{value}</span>
            </div>
          ))}
        </div>
      </div>
  );
}

/* ── Explorer: region filter, city list, auto-tour ─────────── */
export function GlobalReachExplorer() {
  const [region, setRegion] = useState<Region>("All");
  const [activeLabel, setActiveLabel] = useState<string>(CITY_DATA[0].label);
  const [touring, setTouring] = useState(true);
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { rootMargin: "-20% 0px -20% 0px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);

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
    <div ref={ref} className="grid grid-cols-1 gap-4 lg:grid-cols-[320px_minmax(0,1fr)]">
      {/* City selector */}
      <div className="order-2 flex min-w-0 flex-col rounded-[24px] border border-white/10 bg-white/[0.03] p-3 lg:order-1">
        <div className="flex flex-wrap gap-1.5 p-1">
          {REGIONS.map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => pickRegion(r)}
              aria-pressed={region === r}
              className={clsx("rounded-full px-3.5 py-1.5 text-[12px] font-medium transition-colors duration-300", region === r ? "bg-flame text-white" : "text-white/65 hover:text-white")}
            >
              {r}
            </button>
          ))}
        </div>
        <div className="my-2 h-px bg-white/10" />
        <ul ref={listRef} className="relative -mx-1 flex flex-1 gap-1 overflow-x-auto px-1 pb-1 [scrollbar-width:none] lg:mx-0 lg:block lg:space-y-0.5 lg:overflow-visible lg:p-0" data-lenis-prevent-horizontal>
          {cities.map((c) => {
            const on = c.label === active.label;
            return (
              <li key={c.label} data-city={c.label} className="shrink-0 lg:shrink">
                <button type="button" onClick={() => pick(c)} className={clsx("group relative flex w-full items-center gap-3 overflow-hidden rounded-2xl px-4 py-3 text-left transition-colors duration-300", on && "bg-white/[0.07]")}>
                  <span className={clsx("relative h-2 w-2 shrink-0 rounded-full transition-all duration-300", on ? "scale-125 bg-flame shadow-[0_0_10px_#FF6B2B]" : "bg-white/20 group-hover:bg-white/50")} />
                  <span className="relative flex-1">
                    <span className={clsx("block text-[15px] font-medium transition-colors", on ? "text-white" : "text-white/65 group-hover:text-white")}>{c.label}</span>
                    <span className="block text-[11px] text-white/65">{c.region}</span>
                  </span>
                  <span className="relative hidden font-mono text-[11px] tabular-nums text-white/70 lg:inline">{distanceFromHQ(c.lat, c.lng).toLocaleString("en-US")} km</span>
                  {on && touring && inView && (
                    <span key={`tour-${c.label}`} className="sv-grow absolute bottom-0 left-4 right-4 h-[2px] origin-left rounded bg-flame" style={{ animationDuration: `${TOUR_MS}ms` }} />
                  )}
                </button>
              </li>
            );
          })}
        </ul>
        <button
          type="button"
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
        <CityDetail city={active} />
      </div>
    </div>
  );
}
