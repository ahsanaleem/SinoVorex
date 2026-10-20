"use client";

import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import { clsx } from "clsx";

export type Heading = { id: string; text: string };

/** Highlights the section currently being read. */
function useActive(ids: string[]) {
  const [active, setActive] = useState<string | null>(null);
  useEffect(() => {
    const els = ids.map((id) => document.getElementById(id)).filter((e): e is HTMLElement => !!e);
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); }),
      { rootMargin: "-20% 0px -70% 0px" },
    );
    els.forEach((e) => obs.observe(e));
    return () => obs.disconnect();
  }, [ids]);
  return active;
}

/** Desktop: sticky list with the current section highlighted. */
export function TocSidebar({ heads }: { heads: Heading[] }) {
  const active = useActive(heads.map((h) => h.id));
  return (
    <nav aria-label="On this page" className="hidden rounded-[24px] border border-ink/[0.07] bg-white p-5 lg:block">
      <div className="text-[13px] font-semibold uppercase tracking-[0.06em] text-ink/55">On this page</div>
      <ul className="mt-2 space-y-0.5 text-[14px] leading-snug">
        {heads.map((h) => (
          <li key={h.id}>
            <a href={`#${h.id}`} aria-current={active === h.id ? "location" : undefined}
              className={clsx("flex items-start gap-2.5 rounded-xl px-2.5 py-1.5 transition-colors", active === h.id ? "bg-flame/10 font-medium text-ink" : "text-ink/65 hover:bg-paper hover:text-ink")}>
              <span className={clsx("mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full", active === h.id ? "bg-flame" : "bg-ink/20")} />
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

/** Phones and tablets: a collapsible "On this page" list at the top of the article. */
export function TocMobile({ heads }: { heads: Heading[] }) {
  const [open, setOpen] = useState(false);
  return (
    <nav aria-label="On this page" className="rounded-[24px] border border-ink/[0.07] bg-white lg:hidden">
      <button type="button" onClick={() => setOpen((o) => !o)} aria-expanded={open}
        className="flex w-full items-center justify-between gap-3 p-5 text-left">
        <span>
          <span className="block text-[15px] font-semibold text-ink">On this page</span>
          <span className="text-[13px] text-ink/60">{heads.length} sections · tap to jump</span>
        </span>
        <ChevronDown size={20} className={clsx("text-flame transition-transform", open && "rotate-180")} />
      </button>
      <ul hidden={!open} className="space-y-1 border-t border-ink/[0.07] p-3 text-[15px]">
        {heads.map((h) => (
          <li key={h.id}>
            <a href={`#${h.id}`} onClick={() => setOpen(false)} className="flex items-start gap-3 rounded-xl px-3 py-2.5 text-ink/80 hover:bg-paper">
              <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-flame" />{h.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

/** Thin bar under the header showing how far through the page the reader is. */
export function ReadingProgress() {
  const [p, setP] = useState(0);
  useEffect(() => {
    const on = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      setP(max > 0 ? Math.min(1, h.scrollTop / max) : 0);
    };
    on();
    window.addEventListener("scroll", on, { passive: true });
    window.addEventListener("resize", on);
    return () => { window.removeEventListener("scroll", on); window.removeEventListener("resize", on); };
  }, []);
  return (
    <div aria-hidden className="fixed inset-x-0 top-0 z-[200] h-[3px]">
      <div className="h-full origin-left bg-flame transition-transform duration-150" style={{ transform: `scaleX(${p})` }} />
    </div>
  );
}
