import { BadgeCheck } from "lucide-react";
import { COMPANY, EXPERTISE, WHY_US } from "./data";
import { BrandMark } from "./brand";
import { ChinaClock } from "./islands";
import { Eyebrow, Reveal, SplitWords, rvStyle } from "./lite";

/* Server-rendered; the China clock is the only client code. */
export function About() {

  return (
    <section id="about" className="cv-auto relative scroll-mt-24 bg-paper px-4 py-24 sm:px-6 md:py-36">
      <div className="mx-auto grid max-w-[1280px] gap-16 lg:grid-cols-2 lg:gap-24">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <Eyebrow>Who we are</Eyebrow>
          <h2 className="font-display text-[clamp(38px,5.5vw,76px)] font-medium leading-[0.95] tracking-[-0.045em] text-ink">
            <SplitWords text="Based in China." />
            {" "}<br />
            <span className="font-serif font-normal italic tracking-[-0.02em] text-flame"><SplitWords text="Working for you." delay={0.2} /></span>
          </h2>
          <Reveal delay={0.1}>
            <p className="mt-8 text-[19px] leading-relaxed text-ink/75">
              SinoVorex is a sourcing and export partner for buyers around the world, working with manufacturers across China.
            </p>
            <p className="mt-5 text-[16px] leading-relaxed text-ink/70">
              We find factories, check them and their goods, follow production and arrange shipping, so you can buy from China with fewer surprises. Our team works in Chinese and English, close to the factories.
            </p>
          </Reveal>
          <div className="mt-8 flex flex-wrap gap-2">
            {EXPERTISE.map((t, i) => (
              <span
                key={t}
                style={rvStyle(0.2 + i * 0.06, 10)}
                className="rv cursor-default rounded-full border border-ink/10 px-4 py-2 text-[13px] font-medium text-ink/80 transition-colors duration-300 hover:border-flame hover:bg-flame hover:text-white"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        <div>
          <Reveal>
            <div data-theme="dark" className="relative mb-12 overflow-hidden rounded-[28px] bg-ink p-8 text-white">
              <div className="pointer-events-none absolute -bottom-20 -right-14 w-[280px] opacity-[0.12] [animation:sv-spin_60s_linear_infinite]">
                <BrandMark dark />
              </div>
              <div className="relative flex items-start justify-between font-mono text-[11px] uppercase tracking-[0.2em] text-white/65">
                <span className="flex items-center gap-2"><BadgeCheck size={14} className="text-flame" />Company details</span>
                <span className="flex items-center gap-2"><span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />China time <ChinaClock /></span>
              </div>
              <div className="relative mt-8">
                <div className="font-display text-[26px] font-medium leading-tight tracking-[-0.03em]">{COMPANY.legalNameZh}</div>
                <div className="mt-1 text-[14px] text-white/60">{COMPANY.legalNameEnGloss} (unofficial English rendering)</div>
                <div className="mt-1 text-[15px] text-white/70">Operating as {COMPANY.brand}</div>
              </div>
              <dl className="relative mt-6 grid gap-3 border-t border-white/10 pt-5 text-[14px] sm:grid-cols-2">
                {COMPANY.licenceNo && (
                  <div className="sm:col-span-2"><dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/65">Unified Social Credit Code</dt><dd className="mt-1 font-mono text-white/90">{COMPANY.licenceNo}</dd></div>
                )}
                <div><dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/65">Registered address</dt><dd className="mt-1 text-white/90">{COMPANY.addressZh}<span className="mt-0.5 block text-[13px] text-white/70">{COMPANY.address}</span></dd></div>
                <div><dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/65">Contact</dt><dd className="mt-1 space-y-0.5"><a href={`mailto:${COMPANY.email}`} className="block text-white/90 hover:text-flame">{COMPANY.email}</a><a href={COMPANY.phoneHref} className="block text-white/90 hover:text-flame">{COMPANY.phoneDisplay}</a></dd></div>
              </dl>
            </div>
          </Reveal>

          <Reveal y={16}>
            <div className="mb-6 font-mono text-[11px] uppercase tracking-[0.25em] text-ink/65">Why SinoVorex</div>
          </Reveal>
          <div className="relative">
            <div className="absolute bottom-6 left-[27px] top-6 w-px bg-gradient-to-b from-flame via-flame/40 to-ink/10" />
            {WHY_US.map(({ title, desc, icon: Icon }, i) => (
              <div
                key={title}
                style={rvStyle(i * 0.08, 30)}
                className="rv group relative flex gap-6 py-6"
              >
                <span className="relative z-10 grid h-14 w-14 shrink-0 place-items-center rounded-full border border-ink/10 bg-white text-flame transition-all duration-500 ease-apple group-hover:scale-110 group-hover:border-flame group-hover:bg-flame group-hover:text-white">
                  <Icon size={22} strokeWidth={1.6} />
                </span>
                <div className="pt-1">
                  <div className="flex items-baseline gap-3">
                    <span className="font-mono text-xs text-flame">0{i + 1}</span>
                    <h3 className="font-display text-[24px] font-medium tracking-[-0.03em] text-ink transition-transform duration-500 ease-apple group-hover:translate-x-1">{title}</h3>
                  </div>
                  <p className="mt-2 text-[16px] leading-relaxed text-ink/70">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
