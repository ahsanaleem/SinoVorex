import type { CSSProperties } from "react";
import { ArrowDown, ArrowUpRight, MousePointerClick, Sparkle } from "lucide-react";
import { SERVICES } from "./data";
import { HeroGlobeIsland } from "./HeroGlobeIsland";
import { QuotePill, ScrollPill } from "./islands";

const d = (s: number) => ({ "--d": `${s}s` }) as CSSProperties;

/* ── Hero (server-rendered; the globe and the buttons are the only client code) ── */
export function Hero() {
  return (
    <section id="top" className="relative flex min-h-[100svh] flex-col overflow-hidden bg-paper">
      {/* Aurora blobs (animated on desktop only) */}
      <div className="pointer-events-none absolute -left-[10%] top-[5%] h-[55vw] max-h-[720px] w-[55vw] max-w-[720px]">
        <div className="h-full w-full rounded-full bg-[radial-gradient(circle,rgba(255,107,43,0.18),transparent_65%)] blur-2xl lg:animate-blob" />
      </div>
      <div className="pointer-events-none absolute -right-[5%] top-[10%] h-[50vw] max-h-[720px] w-[50vw] max-w-[720px]">
        <div className="h-full w-full rounded-full bg-[radial-gradient(circle,rgba(255,176,120,0.3),transparent_65%)] blur-2xl lg:animate-blob-slow" />
      </div>

      {/* Grid lines */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(14,14,22,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(14,14,22,0.05)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:radial-gradient(ellipse_70%_60%_at_40%_50%,black_30%,transparent_100%)]" />

      {/* Interactive globe (client island, loads after the page) */}
      <div className="absolute inset-0"><HeroGlobeIsland /></div>

      <div className="pointer-events-none relative z-10 mx-auto flex w-full max-w-[1400px] flex-1 flex-col justify-start px-5 pb-14 pt-[calc(108px+min(59vw,27svh))] sm:px-6 lg:justify-center lg:px-10 lg:pb-24 lg:pt-32">
        <div className="max-w-[720px] [&>*]:pointer-events-auto">
          <div className="sv-fade mb-7 inline-flex items-center gap-2.5 rounded-full border border-ink/10 bg-white/70 py-1.5 pl-1.5 pr-4 text-[13px] font-medium text-ink/80 shadow-sm" style={d(0.05)}>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-ink px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.15em] text-white">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-flame" /> SinoVorex
            </span>
            The force behind global trade
          </div>

          {/* Plain text with a transform-only CSS entrance: crawlable with normal spaces, painted on the first frame. */}
          <h1 className="font-display text-[clamp(42px,6.2vw,96px)] font-medium leading-[0.95] tracking-[-0.045em] text-ink">
            <span className="sv-rise block">China Sourcing Agent</span>{" "}
            <span className="sv-rise sv-rise-2 block font-serif font-normal italic tracking-[-0.02em] text-flame">for Global Buyers</span>
          </h1>

          <p className="sv-rise sv-rise-2 mt-7 max-w-[540px] text-[clamp(16px,1.6vw,19px)] leading-relaxed text-ink/70">
            Based in Suzhou, we find factories across China, check them and their goods, and ship your order worldwide.
            <span className="text-ink"> One team, from factory floor to your port.</span>
          </p>

          <div className="sv-fade mt-9 flex flex-col items-start gap-3 sm:flex-row" style={d(0.2)}>
            <QuotePill icon={<ArrowUpRight size={18} />}>Get a Quote</QuotePill>
            <ScrollPill to="how-it-works" icon={<ArrowDown size={18} />}>How it works</ScrollPill>
          </div>

          <div className="sv-fade mt-12 hidden flex-wrap items-center gap-x-6 gap-y-3 font-mono text-[11px] uppercase tracking-[0.2em] text-ink/70 sm:flex" style={d(0.3)}>
            {["Sourcing", "Quality inspection", "Shipping"].map((t, i) => (
              <span key={t} className="flex items-center gap-6">
                {i > 0 && <span className="h-1 w-1 rounded-full bg-flame" />}
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Globe hint */}
      <div className="sv-fade pointer-events-none absolute bottom-10 right-28 z-10 hidden items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-ink/70 lg:flex" style={d(0.8)}>
        <MousePointerClick size={14} className="text-flame" />
        Drag to spin · Click to ship
      </div>

      {/* Scroll cue */}
      <a href="#how-it-works" aria-label="Scroll down" className="sv-fade absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 lg:block" style={d(0.6)}>
        <span className="flex h-12 w-7 justify-center rounded-full border border-ink/20 pt-2">
          <span className="h-2 w-1 animate-scroll-cue rounded-full bg-flame" />
        </span>
      </a>
    </section>
  );
}

/* ── Rotated marquee bands (decorative, CSS-only) ─────────────── */
export function MarqueeBands() {
  const items = SERVICES.map((s) => s.title);
  const Row = ({ dark }: { dark: boolean }) => (
    <div className={dark ? "bg-ink text-white" : "bg-flame text-white"}>
      <div className={`flex w-max py-5 ${dark ? "animate-marquee" : "animate-marquee-reverse"}`}>
        {[0, 1].map((k) => (
          <div key={k} className="flex shrink-0 items-center">
            {items.map((t, i) => (
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
  // Decorative: the service names are already linked in the Services section, so screen readers and crawlers skip this.
  return (
    <div aria-hidden className="relative z-20 h-[170px] overflow-hidden md:h-[220px]">
      <div className="absolute -inset-x-[5%] top-1/2 -translate-y-1/2 rotate-[2.5deg] opacity-90"><Row dark={false} /></div>
      <div className="absolute -inset-x-[5%] top-1/2 -translate-y-1/2 -rotate-[2.5deg] shadow-[0_30px_60px_-20px_rgba(14,14,22,0.45)]"><Row dark /></div>
    </div>
  );
}
