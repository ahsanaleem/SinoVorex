"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Camera, Check, ClipboardCheck, Factory, Plane, Plus, Ship, TrainFront } from "lucide-react";
import { clsx } from "clsx";
import { FAQ, FEES, INCOTERMS, PRODUCTS, QC_POINTS, SHIPPING_MODES } from "./data";
import { EASE, Eyebrow, PillButton, Reveal, SplitWords } from "./primitives";

function SectionHead({ eyebrow, line1, line2, intro, dark = false }: { eyebrow: string; line1: string; line2: string; intro: string; dark?: boolean }) {
  return (
    <div className="mb-12 grid gap-6 md:mb-16 lg:grid-cols-[1.3fr_1fr] lg:items-end">
      <div>
        <Eyebrow dark={dark}>{eyebrow}</Eyebrow>
        <h2 className={clsx("font-display text-[clamp(34px,5vw,68px)] font-medium leading-[0.95] tracking-[-0.045em]", dark ? "text-white" : "text-ink")}>
          <SplitWords text={line1} />
          {" "}<br />
          <span className="font-serif font-normal italic tracking-[-0.02em] text-flame"><SplitWords text={line2} delay={0.2} /></span>
        </h2>
      </div>
      <Reveal delay={0.2}>
        <p className={clsx("max-w-[460px] text-[17px] leading-relaxed lg:ml-auto", dark ? "text-white/70" : "text-ink/70")}>{intro}</p>
      </Reveal>
    </div>
  );
}

/* ── Products & industries ─────────────────────────────────── */
export function Products({ onQuote }: { onQuote: () => void }) {
  return (
    <section id="products" className="scroll-mt-24 bg-white px-4 py-24 sm:px-6 md:py-32">
      <div className="mx-auto max-w-[1280px]">
        <SectionHead eyebrow="Products & industries" line1="What we" line2="source for you" intro="These are the categories we source most. Need something else? Send us the details and we'll tell you honestly whether we can help." />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {PRODUCTS.map((p, i) => {
            const Icon = p.icon;
            return (
              <motion.article
                key={p.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.9, delay: i * 0.08, ease: EASE }}
                className="group flex flex-col overflow-hidden rounded-[28px] border border-ink/[0.07] bg-paper transition-shadow duration-500 hover:shadow-[0_30px_60px_-30px_rgba(14,14,22,0.3)]"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-[#FFE9DD] via-[#FFF4EE] to-paper">
                  {p.photo ? (
                    <>
                      <Image
                        src={p.photo}
                        alt={`${p.title}: ${p.items.join(", ").toLowerCase()}`}
                        fill
                        sizes="(min-width: 1024px) 300px, (min-width: 640px) 50vw, 100vw"
                        className="object-cover transition-transform [transition-duration:1200ms] ease-apple group-hover:scale-[1.06]"
                      />
                      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/25 to-transparent" />
                      <span className="absolute bottom-3 left-3 grid h-11 w-11 place-items-center rounded-2xl bg-white/90 text-flame shadow-lg backdrop-blur transition-transform duration-500 ease-apple group-hover:-rotate-6">
                        <Icon size={20} strokeWidth={1.7} />
                      </span>
                    </>
                  ) : (
                    <div className="grid h-full place-items-center">
                      <span className="grid h-24 w-24 place-items-center rounded-[28px] bg-white text-flame shadow-[0_20px_40px_-20px_rgba(255,107,43,0.6)] transition-transform duration-700 ease-apple group-hover:-rotate-6 group-hover:scale-110">
                        <Icon size={40} strokeWidth={1.5} />
                      </span>
                    </div>
                  )}
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="font-display text-[22px] font-medium tracking-[-0.03em] text-ink">{p.title}</h3>
                  <p className="mt-1 text-[14px] text-ink/65">{p.desc}</p>
                  <ul className="mt-4 space-y-1.5">
                    {p.items.map((it) => (
                      <li key={it} className="flex items-center gap-2 text-[14px] text-ink/80">
                        <Check size={14} className="shrink-0 text-flame" />{it}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.article>
            );
          })}
        </div>
        <p className="mt-4 text-[12px] text-ink/60">Images are illustrative of each category.</p>
        <ul className="mt-8 flex flex-wrap justify-center gap-2 text-[14px]">
          {[
            ["Hotel, restaurant & café procurement", "/sourcing-for/hotels-restaurants"],
            ["Amazon & e-commerce sellers", "/sourcing-for/amazon-sellers"],
            ["Small businesses", "/sourcing-for/small-businesses"],
          ].map(([label, href]) => (
            <li key={href}>
              <Link href={href} className="group inline-flex items-center gap-1.5 rounded-full border border-ink/10 bg-paper px-4 py-2 font-medium text-ink/80 transition-colors hover:border-flame hover:text-ink">
                {label}<ArrowUpRight size={14} className="text-flame transition-transform group-hover:rotate-45" />
              </Link>
            </li>
          ))}
        </ul>
        <Reveal className="mt-8 flex justify-center">
          <PillButton onClick={onQuote} icon={<Plus size={18} />}>Request a quote for your product</PillButton>
        </Reveal>
      </div>
    </section>
  );
}

/* ── Quality control ───────────────────────────────────────── */
export function QualityControl() {
  const icons = [Factory, ClipboardCheck, Camera];
  return (
    <section id="quality" className="scroll-mt-24 bg-paper px-4 py-24 sm:px-6 md:py-32">
      <div className="mx-auto max-w-[1280px]">
        <SectionHead eyebrow="Quality control" line1="Checked before" line2="you pay the balance" intro="Most problems with China orders are found too late. We check the factory before you order and the goods before they ship." />
        <div className="grid gap-4 md:grid-cols-3">
          {QC_POINTS.map((q, i) => {
            const Icon = icons[i];
            return (
              <motion.div
                key={q.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.9, delay: i * 0.1, ease: EASE }}
                className="group relative overflow-hidden rounded-[28px] border border-ink/[0.07] bg-white p-8"
              >
                <span className="grid h-14 w-14 place-items-center rounded-2xl bg-flame/10 text-flame transition-colors duration-500 group-hover:bg-flame group-hover:text-white">
                  <Icon size={24} strokeWidth={1.6} />
                </span>
                <h3 className="mt-8 font-display text-[24px] font-medium tracking-[-0.03em] text-ink">{q.title}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-ink/70">{q.desc}</p>
                <span className="absolute right-6 top-6 font-mono text-xs text-ink/50">0{i + 1}</span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ── Shipping & logistics ──────────────────────────────────── */
export function Shipping() {
  const [term, setTerm] = useState(0);
  const icons = [Ship, Plane, TrainFront];
  return (
    <section id="shipping" className="scroll-mt-24 bg-paper px-2 pb-24 sm:px-3 md:pb-32">
      <div data-theme="dark" className="relative overflow-hidden rounded-[32px] bg-ink px-4 py-20 text-white sm:px-6 md:rounded-[48px] md:py-28">
        <div className="pointer-events-none absolute -right-40 top-0 h-[480px] w-[480px] rounded-full bg-flame/20 blur-[120px]" />
        <div className="relative mx-auto max-w-[1280px]">
          <SectionHead dark eyebrow="Shipping & logistics" line1="Sea, air or rail," line2="door to port" intro="We arrange freight with partner forwarders and quote it with your order. Transit times below are typical ranges and vary by route and season." />

          <div className="grid gap-4 md:grid-cols-3">
            {SHIPPING_MODES.map((m, i) => {
              const Icon = icons[i];
              return (
                <motion.div
                  key={m.mode}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.9, delay: i * 0.1, ease: EASE }}
                  className="rounded-[24px] border border-white/10 bg-white/[0.04] p-7"
                >
                  <div className="flex items-center justify-between">
                    <span className="grid h-12 w-12 place-items-center rounded-2xl bg-flame text-white"><Icon size={22} strokeWidth={1.6} /></span>
                    <span className="rounded-full bg-white/10 px-3 py-1 font-mono text-[11px] text-white/80">{m.time}</span>
                  </div>
                  <h3 className="mt-6 font-display text-[24px] font-medium tracking-[-0.03em]">{m.mode}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-white/70">{m.desc}</p>
                </motion.div>
              );
            })}
          </div>

          <Reveal className="mt-14">
            <div className="rounded-[24px] border border-white/10 bg-white/[0.03] p-6 md:p-8">
              <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
                <div>
                  <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/70">Incoterms we quote on</div>
                  <h3 className="mt-2 font-display text-[28px] font-medium tracking-[-0.03em]">Who pays for what</h3>
                </div>
                <div role="tablist" aria-label="Incoterms" className="flex gap-1 rounded-full bg-white/[0.06] p-1">
                  {INCOTERMS.map((t, i) => (
                    <button
                      key={t.term}
                      role="tab"
                      id={`incoterm-tab-${t.term}`}
                      aria-controls={`incoterm-${t.term}`}
                      aria-selected={term === i}
                      onClick={() => setTerm(i)}
                      className={clsx("relative rounded-full px-5 py-2 font-mono text-[13px] transition-colors", term === i ? "text-white" : "text-white/70 hover:text-white")}
                    >
                      {term === i && <motion.span layoutId="incoterm-pill" className="absolute inset-0 rounded-full bg-flame" transition={{ type: "spring", stiffness: 400, damping: 34 }} />}
                      <span className="relative">{t.term}</span>
                    </button>
                  ))}
                </div>
              </div>
              {/* Every panel is in the HTML (crawlers and AI engines read all three); only the selected one is shown. */}
              {INCOTERMS.map((t, i) => (
                <div key={t.term} id={`incoterm-${t.term}`} role="tabpanel" aria-labelledby={`incoterm-tab-${t.term}`} hidden={term !== i}>
                  <h4 className="font-display text-[20px] font-medium text-flame">{t.term} · {t.name}</h4>
                  <p className="mt-2 max-w-[760px] text-[16px] leading-relaxed text-white/80">{t.desc}</p>
                </div>
              ))}
              <Link href="/services/shipping-coordination" className="mt-5 inline-flex items-center gap-1.5 text-[14px] font-medium text-white/80 underline-offset-4 hover:text-white hover:underline">
                Shipping from China: transit times, FCL vs LCL and documents <ArrowUpRight size={14} className="text-flame" />
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ── Fees & payment + FAQ ──────────────────────────────────── */
export function FeesAndFaq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="scroll-mt-24 bg-white px-4 py-24 sm:px-6 md:py-32">
      <div className="mx-auto grid max-w-[1280px] gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <div id="fees" className="scroll-mt-24 lg:sticky lg:top-28 lg:self-start">
          <Eyebrow>Fees & payment</Eyebrow>
          <h2 className="font-display text-[clamp(34px,4.5vw,60px)] font-medium leading-[0.95] tracking-[-0.045em] text-ink">
            <SplitWords text="Clear fees," />
            {" "}<br />
            <span className="font-serif font-normal italic tracking-[-0.02em] text-flame"><SplitWords text="agreed upfront" delay={0.2} /></span>
          </h2>
          <Reveal delay={0.1}>
            <p className="mt-6 text-[17px] leading-relaxed text-ink/75">{FEES.summary}</p>
            {(FEES.commissionRange || FEES.inspectionRate) && (
              <dl className="mt-5 grid gap-3 sm:grid-cols-2">
                {FEES.commissionRange && <div className="rounded-2xl bg-flame/[0.08] p-4"><dt className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink/70">Commission</dt><dd className="mt-1 text-[18px] font-medium text-ink">{FEES.commissionRange}</dd></div>}
                {FEES.inspectionRate && <div className="rounded-2xl bg-flame/[0.08] p-4"><dt className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink/70">Inspections &amp; audits</dt><dd className="mt-1 text-[18px] font-medium text-ink">{FEES.inspectionRate}</dd></div>}
              </dl>
            )}
            <Link href="/guides/china-sourcing-agent-cost" className="mt-4 inline-flex items-center gap-1.5 text-[15px] font-medium text-flame underline-offset-4 hover:underline">
              How sourcing agents charge, with a worked example <ArrowUpRight size={15} />
            </Link>
            <div className="mt-6 rounded-[24px] border border-ink/[0.08] bg-paper p-6">
              <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink/70">Accepted payment</div>
              <ul className="mt-3 flex flex-wrap gap-2">
                {FEES.payments.map((p) => <li key={p} className="rounded-full border border-ink/10 bg-white px-4 py-1.5 text-[14px] text-ink/80">{p}</li>)}
              </ul>
              <div className="mt-5 font-mono text-[11px] uppercase tracking-[0.2em] text-ink/70">Deposits</div>
              <p className="mt-2 text-[15px] leading-relaxed text-ink/75">{FEES.deposit}</p>
            </div>
          </Reveal>
        </div>

        <div>
          <Eyebrow>Frequently asked</Eyebrow>
          <h2 className="sr-only">Frequently asked questions</h2>
          <ul className="divide-y divide-ink/10 border-y border-ink/10">
            {FAQ.map((f, i) => {
              const isOpen = open === i;
              return (
                <li key={f.q}>
                  <h3>
                    <button
                      onClick={() => setOpen(isOpen ? null : i)}
                      aria-expanded={isOpen}
                      aria-controls={`faq-${i}`}
                      className="flex w-full items-center justify-between gap-6 py-6 text-left"
                    >
                      <span className="font-display text-[19px] font-medium tracking-[-0.02em] text-ink md:text-[21px]">{f.q}</span>
                      <span className={clsx("grid h-9 w-9 shrink-0 place-items-center rounded-full border transition-all duration-500 ease-apple", isOpen ? "rotate-45 border-flame bg-flame text-white" : "border-ink/15 text-ink")}>
                        <Plus size={16} />
                      </span>
                    </button>
                  </h3>
                  {/* Answers are always rendered (so crawlers see them) and collapsed with CSS. */}
                  <div id={`faq-${i}`} className={clsx("grid transition-[grid-template-rows,opacity] duration-500 ease-apple", isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0")}>
                    <div className="overflow-hidden">
                      <p className="max-w-[640px] pb-6 text-[16px] leading-relaxed text-ink/75">{f.a}</p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
          <p className="mt-6 text-[15px] text-ink/70">
            More detail in our <Link href="/guides" className="font-medium text-flame underline-offset-4 hover:underline">guides to sourcing from China</Link>.
          </p>
        </div>
      </div>
    </section>
  );
}
