"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { ArrowUp, ArrowUpRight, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { ChatButtons } from "./ChatButtons";
import { COMPANY, NAV_LINKS, SERVICES } from "./data";
import { FOOTER_GUIDES, FOOTER_RESOURCES } from "./links";
import { BrandLogo, EASE, Magnetic, PillButton, Reveal, SplitWords, useScrollTo } from "./primitives";

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
    <footer data-theme="dark" className="relative overflow-hidden bg-ink px-4 pt-20 text-white sm:px-6">
      <div className="mx-auto max-w-[1280px]">
        <div className="grid gap-12 border-b border-white/10 pb-16 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-[1.3fr_0.8fr_1fr_1fr_1.2fr_1.2fr]">
          <div>
            <BrandLogo dark className="h-20 w-auto md:h-24" />
            <p className="mt-6 max-w-[340px] text-[15px] leading-relaxed text-white/65">
              Sourcing, quality inspection and shipping from factories across China, for buyers worldwide.
            </p>
            <button onClick={onContact} className="group mt-8 inline-flex items-center gap-2 text-[15px] font-medium text-flame">
              Request a quote
              <ArrowUpRight size={16} className="transition-transform duration-500 ease-apple group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </button>
          </div>
          <div>
            <div className="mb-5 font-mono text-[11px] uppercase tracking-[0.25em] text-white/65">Navigate</div>
            <ul className="space-y-3">
              {NAV_LINKS.map(({ label, id }) => (
                <li key={id}>
                  <a href={`/#${id}`} onClick={(e) => { e.preventDefault(); history.replaceState(null, "", `#${id}`); scrollTo(id); }} className="group relative text-[16px] text-white/70 transition-colors hover:text-white">
                    {label}
                    <span className="absolute -bottom-0.5 left-0 h-px w-full origin-right scale-x-0 bg-flame transition-transform duration-500 ease-apple group-hover:origin-left group-hover:scale-x-100" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="mb-5 font-mono text-[11px] uppercase tracking-[0.25em] text-white/65">Services</div>
            <ul className="space-y-3 text-[15px]">
              {SERVICES.map((s) => <li key={s.slug}><Link href={`/services/${s.slug}`} className="inline-block py-1 text-white/70 transition-colors hover:text-white">{s.title}</Link></li>)}
            </ul>
          </div>
          <div>
            <div className="mb-5 font-mono text-[11px] uppercase tracking-[0.25em] text-white/65">Resources</div>
            <ul className="space-y-3 text-[15px]">
              {FOOTER_RESOURCES.map(([label, href]) => <li key={href}><Link href={href} className="inline-block py-1 text-white/70 transition-colors hover:text-white">{label}</Link></li>)}
            </ul>
          </div>
          <div>
            <div className="mb-5 font-mono text-[11px] uppercase tracking-[0.25em] text-white/65">Guides</div>
            <ul className="space-y-3 text-[15px]">
              {FOOTER_GUIDES.map(([label, href]) => <li key={href}><Link href={href} className="inline-block py-1 text-white/70 transition-colors hover:text-white">{label}</Link></li>)}
            </ul>
          </div>
          <div>
            <div className="mb-5 font-mono text-[11px] uppercase tracking-[0.25em] text-white/65">Contact</div>
            <ul className="space-y-4 text-[15px] text-white/70">
              <li className="flex gap-3"><MapPin size={18} className="mt-0.5 shrink-0 text-flame" /><span>{COMPANY.address}<span className="mt-0.5 block text-white/65">{COMPANY.addressZh}</span></span></li>
              <li><a href={`mailto:${COMPANY.email}`} className="flex gap-3 transition-colors hover:text-white"><Mail size={18} className="mt-0.5 shrink-0 text-flame" />{COMPANY.email}</a></li>
              <li><a href={COMPANY.phoneHref} className="flex gap-3 transition-colors hover:text-white"><Phone size={18} className="mt-0.5 shrink-0 text-flame" />{COMPANY.phoneDisplay}</a></li>
              <li><a href={COMPANY.whatsappHref} target="_blank" rel="noopener noreferrer" className="flex gap-3 transition-colors hover:text-white"><MessageCircle size={18} className="mt-0.5 shrink-0 text-flame" />WhatsApp</a></li>
              <li className="flex gap-3"><MessageCircle size={18} className="mt-0.5 shrink-0 text-flame" />WeChat: {COMPANY.wechatId}</li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-4 py-8 text-[13px] text-white/65 md:flex-row md:items-center md:justify-between">
          <div className="space-y-1">
            <div>{COMPANY.brand} is a brand of {COMPANY.legalNameZh} ({COMPANY.legalNameEnGloss})</div>
            <div className="flex flex-wrap gap-x-4 gap-y-1">
              {COMPANY.licenceNo && <span>统一社会信用代码 {COMPANY.licenceNo}</span>}
              {COMPANY.icp && <a href="https://beian.miit.gov.cn/" target="_blank" rel="noopener noreferrer" className="hover:text-white">{COMPANY.icp}</a>}
              <Link href="/privacy" className="hover:text-white">Privacy policy</Link>
              <Link href="/terms" className="hover:text-white">Terms of service</Link>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <span>© {new Date().getFullYear()} Sino Vorex. All rights reserved.</span>
            <button onClick={() => scrollTo("top")} aria-label="Back to top" className="grid h-10 w-10 place-items-center rounded-full border border-white/15 text-white transition-all duration-500 ease-apple hover:-translate-y-1 hover:border-flame hover:bg-flame">
              <ArrowUp size={16} />
            </button>
          </div>
        </div>
      </div>

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
    </footer>
  );
}
