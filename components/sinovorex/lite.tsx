import type { CSSProperties, ReactNode } from "react";
import { clsx } from "clsx";

/*
 * Server-rendered animation helpers (no JavaScript bundle). An inline script in app/layout.tsx adds `js` to <html>
 * and an IntersectionObserver that adds `in` to `.rv` and `.sw` elements as they scroll into view; globals.css does
 * the animating. Without JavaScript, everything is simply visible.
 * Use these in server components only: a client re-render would reset the `in` class.
 */

type Vars = CSSProperties & Record<`--${string}`, string>;

/** Fades and slides its children in when scrolled into view. */
export function Reveal({ children, delay = 0, y = 40, className }: { children: ReactNode; delay?: number; y?: number; className?: string }) {
  const style: Vars = { "--rv-d": `${delay}s`, "--rv-y": `${y}px` };
  return <div className={clsx("rv", className)} style={style}>{children}</div>;
}

/** Style for putting the `rv` class straight on an element (cards, list items). */
export const rvStyle = (delay = 0, y = 40): Vars => ({ "--rv-d": `${delay}s`, "--rv-y": `${y}px` });

/** Word-by-word rising text. Real spaces between words, so the text reads normally to crawlers. */
export function SplitWords({ text, delay = 0, className }: { text: string; delay?: number; className?: string }) {
  const words = text.split(" ");
  const style: Vars = { "--sw-d": `${delay}s` };
  return (
    <span className={clsx("sw", className)} style={style}>
      {words.map((w, i) => (
        <span key={i}>
          <span className="sw-w"><span style={{ "--i": String(i) } as Vars}>{w}</span></span>
          {i < words.length - 1 && " "}
        </span>
      ))}
    </span>
  );
}

/** Small label above section headings. */
export function Eyebrow({ children, dark = false }: { children: ReactNode; dark?: boolean }) {
  return (
    <Reveal y={16} className="mb-6">
      <span className={clsx("inline-flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.25em]", dark ? "text-white/70" : "text-ink/70")}>
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-flame opacity-60" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-flame" />
        </span>
        {children}
      </span>
    </Reveal>
  );
}

/** Visual for the arrow pill buttons; wrap it in a <button> or <a>. */
export const pillCls = (variant: "dark" | "light" | "flame" | "ghost" = "dark") => clsx(
  "group relative inline-flex items-center gap-4 overflow-hidden rounded-full py-2 pl-7 pr-2 text-[15px] font-medium tracking-tight transition-[box-shadow,transform] duration-500 ease-apple hover:shadow-[0_18px_40px_-12px_rgba(255,107,43,0.55)] active:scale-[0.97]",
  { dark: "bg-ink text-white", light: "bg-white text-ink", flame: "bg-flame text-white", ghost: "bg-transparent text-ink ring-1 ring-inset ring-ink/15 hover:ring-ink/40" }[variant],
);

export function PillInner({ children, icon, variant = "dark" }: { children: ReactNode; icon: ReactNode; variant?: "dark" | "light" | "flame" | "ghost" }) {
  const dot = { dark: "bg-flame text-white", light: "bg-ink text-white", flame: "bg-white text-flame", ghost: "bg-ink text-white" }[variant];
  return (
    <>
      <span className="relative z-10 block overflow-hidden">
        <span className="block transition-transform duration-500 ease-apple group-hover:-translate-y-full">{children}</span>
        <span aria-hidden className="absolute inset-0 block translate-y-full transition-transform duration-500 ease-apple group-hover:translate-y-0">{children}</span>
      </span>
      <span className={clsx("relative z-10 grid h-11 w-11 place-items-center overflow-hidden rounded-full", dot)}>
        <span className="transition-transform duration-500 ease-apple group-hover:translate-x-[150%] group-hover:-translate-y-[150%]">{icon}</span>
        <span aria-hidden className="absolute -translate-x-[150%] translate-y-[150%] transition-transform duration-500 ease-apple group-hover:translate-x-0 group-hover:translate-y-0">{icon}</span>
      </span>
    </>
  );
}
