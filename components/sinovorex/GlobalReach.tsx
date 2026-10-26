import { Eyebrow, Reveal, SplitWords } from "./lite";
import { GlobalReachLazy } from "./GlobalReachLazy";

/* ── Where we ship (server-rendered shell; the interactive map is a client island) ── */
export function GlobalReach() {
  return (
    <section id="global-reach" className="cv-auto bg-white px-2 sm:px-3">
      <div data-theme="dark" className="relative overflow-hidden rounded-[32px] bg-ink px-4 py-24 text-white sm:px-6 md:rounded-[48px] md:py-32">
        <div className="pointer-events-none absolute left-1/2 top-0 h-[500px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-flame/20 blur-[120px]" />
        <div className="relative mx-auto max-w-[1280px]">
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
            <GlobalReachLazy />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
