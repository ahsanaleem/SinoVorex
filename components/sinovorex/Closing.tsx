"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, Mail } from "lucide-react";
import { ChatButtons } from "./ChatButtons";
import { COMPANY } from "./data";
import { SiteFooter } from "./SiteFooter";
import { EASE, Magnetic, PillButton, Reveal, SplitWords, useScrollTo } from "./primitives";

export function CTA({ onContact }: { onContact: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center center"] });
  const scale = useTransform(scrollYProgress, [0, 1], [0.88, 1]);
  const radius = useTransform(scrollYProgress, [0, 1], [80, 40]);

  return (
    <section id="contact" className="bg-white px-2 py-24 sm:px-3 md:py-32">
      <motion.div
        ref={ref}
        data-theme="dark"
        style={{ scale, borderRadius: radius }}
        className="relative mx-auto max-w-[1400px] overflow-hidden bg-gradient-to-br from-[#FF7A3D] via-flame to-flame-deep px-6 py-24 text-center text-white md:py-36"
      >
        {/* Orbiting rings */}
        {[520, 760, 1000].map((s, i) => (
          <div
            key={s}
            className="pointer-events-none absolute left-1/2 top-1/2 rounded-full border border-dashed border-white/20"
            style={{ width: s, height: s, marginLeft: -s / 2, marginTop: -s / 2, animation: `sv-spin ${40 + i * 20}s linear infinite ${i % 2 ? "reverse" : ""}` }}
          >
            <span className="absolute left-1/2 top-0 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow-[0_0_20px_rgba(255,255,255,0.8)]" />
          </div>
        ))}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(140,40,0,0.35)_100%)]" />

        <div className="relative">
          <Reveal y={16}>
            <span className="inline-block rounded-full border border-white/30 bg-white/10 px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.25em] backdrop-blur">Get in touch</span>
          </Reveal>
          <h2 className="mx-auto mt-8 max-w-[1000px] font-display text-[clamp(40px,7.5vw,112px)] font-medium leading-[0.92] tracking-[-0.05em]">
            <SplitWords text="Tell us what" />
            {" "}<br />
            <span className="font-serif font-normal italic tracking-[-0.02em]"><SplitWords text="you want to source" delay={0.2} /></span>
          </h2>
          <Reveal delay={0.2}>
            <p className="mx-auto mt-8 max-w-[540px] text-[18px] leading-relaxed text-white/80">
              Send your product details and we&apos;ll reply within 24 hours with next steps and the information we need for a quote.
            </p>
          </Reveal>
          <Reveal delay={0.3} className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Magnetic>
              <PillButton variant="light" onClick={onContact} icon={<ArrowUpRight size={18} />}>Request a Quote</PillButton>
            </Magnetic>
            <ChatButtons tone="onFlame" />
            <a href={`mailto:${COMPANY.email}`} className="group inline-flex items-center gap-2 text-[16px] font-medium text-white">
              <Mail size={18} />
              <span className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1px] bg-left-bottom bg-no-repeat pb-0.5 transition-[background-size] duration-500 ease-apple group-hover:bg-[length:100%_1px]">{COMPANY.email}</span>
            </a>
          </Reveal>
          <Reveal delay={0.4}>
            <div className="mt-12 font-mono text-[12px] uppercase tracking-[0.2em] text-white/70">
              Gusu District, Suzhou, China · <a href={COMPANY.phoneHref} className="underline-offset-4 hover:underline">{COMPANY.phoneDisplay}</a>
            </div>
          </Reveal>
        </div>
      </motion.div>
    </section>
  );
}

export function Footer({ onContact }: { onContact: () => void }) {
  const scrollTo = useScrollTo();
  return (
    <SiteFooter onQuote={onContact} onTop={() => scrollTo("top")}>
      <motion.div
        initial={{ y: "40%", opacity: 0 }}
        whileInView={{ y: "0%", opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.4, ease: EASE }}
        className="pointer-events-none select-none text-center font-display text-[19vw] font-semibold leading-[0.75] tracking-[-0.06em] text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.12)]"
        aria-hidden
      >
        Sino Vorex
      </motion.div>
    </SiteFooter>
  );
}
