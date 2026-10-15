"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { BadgeCheck } from "lucide-react";
import { COMPANY, EXPERTISE, WHY_US } from "./data";
import { BrandMark, EASE, Eyebrow, Reveal, SplitWords } from "./primitives";

function ChinaClock() {
  const [time, setTime] = useState<string | null>(null);
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", { timeZone: "Asia/Shanghai", hour: "2-digit", minute: "2-digit", });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return <span className="tabular-nums">{time ?? "--:--"}</span>;
}

export function About() {
  const listRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start 75%", "end 55%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 100, damping: 25 });

  return (
    <section id="about" className="relative scroll-mt-24 bg-paper px-4 py-24 sm:px-6 md:py-36">
      <div className="mx-auto grid max-w-[1280px] gap-16 lg:grid-cols-2 lg:gap-24">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <Eyebrow>Who we are</Eyebrow>
          <h2 className="font-display text-[clamp(38px,5.5vw,76px)] font-medium leading-[0.95] tracking-[-0.045em] text-ink">
            <SplitWords text="Based in China." />
            <br />
            <span className="font-serif font-normal italic tracking-[-0.02em] text-flame"><SplitWords text="Working for you." delay={0.2} /></span>
          </h2>
          <Reveal delay={0.1}>
            <p className="mt-8 text-[19px] leading-relaxed text-ink/75">
              Sino Vorex is a sourcing and export partner for buyers around the world, working with manufacturers across China.
            </p>
            <p className="mt-5 text-[16px] leading-relaxed text-ink/70">
              We find factories, check them and their goods, follow production and arrange shipping, so you can buy from China with fewer surprises. Our team works in Chinese and English, close to the factories.
            </p>
          </Reveal>
          <motion.div
            className="mt-8 flex flex-wrap gap-2"
            initial="hidden" whileInView="show" viewport={{ once: true, margin: "-40px" }}
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06, delayChildren: 0.2 } } }}
          >
            {EXPERTISE.map((t) => (
              <motion.span
                key={t}
                variants={{ hidden: { opacity: 0, scale: 0.8, y: 10 }, show: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.6, ease: EASE } } }}
                className="cursor-default rounded-full border border-ink/10 px-4 py-2 text-[13px] font-medium text-ink/80 transition-colors duration-300 hover:border-flame hover:bg-flame hover:text-white"
              >
                {t}
              </motion.span>
            ))}
          </motion.div>
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
                <div className="mt-1 text-[15px] text-white/70">{COMPANY.legalNameEn}</div>
              </div>
              <dl className="relative mt-6 grid gap-3 border-t border-white/10 pt-5 text-[14px] sm:grid-cols-2">
                {COMPANY.licenceNo && (
                  <div className="sm:col-span-2"><dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/65">Unified Social Credit Code</dt><dd className="mt-1 font-mono text-white/90">{COMPANY.licenceNo}</dd></div>
                )}
                <div><dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/65">Office</dt><dd className="mt-1 text-white/90">{COMPANY.address}</dd></div>
                <div><dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/65">Contact</dt><dd className="mt-1 space-y-0.5"><a href={`mailto:${COMPANY.email}`} className="block text-white/90 hover:text-flame">{COMPANY.email}</a><a href={COMPANY.phoneHref} className="block text-white/90 hover:text-flame">{COMPANY.phoneDisplay}</a></dd></div>
              </dl>
            </div>
          </Reveal>

          <Reveal y={16}>
            <div className="mb-6 font-mono text-[11px] uppercase tracking-[0.25em] text-ink/65">Why Sino Vorex</div>
          </Reveal>
          <div ref={listRef} className="relative">
            <div className="absolute bottom-6 left-[27px] top-6 w-px bg-ink/10" />
            <motion.div style={{ scaleY: progress }} className="absolute bottom-6 left-[27px] top-6 w-px origin-top bg-flame" />
            {WHY_US.map(({ title, desc, icon: Icon }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.9, delay: i * 0.08, ease: EASE }}
                className="group relative flex gap-6 py-6"
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
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
