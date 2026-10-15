import type { ReactNode } from "react";
import { SubpageShell } from "./SubpageShell";

export function LegalPage({ title, updated, children }: { title: string; updated: string; children: ReactNode }) {
  return (
    <SubpageShell quoteCta={false}>
      <article className="px-4 pb-24 pt-14 sm:px-6 md:pt-20">
        <div className="mx-auto max-w-[760px]">
          <h1 className="font-display text-[clamp(40px,6vw,72px)] font-medium leading-[0.95] tracking-[-0.045em]">{title}</h1>
          <p className="mt-4 font-mono text-[12px] uppercase tracking-[0.2em] text-ink/70">Last updated {updated}</p>
          <div className="mt-10 space-y-5 text-[16px] leading-relaxed text-ink/80 [&_a]:text-flame [&_a]:underline [&_h2]:pt-6 [&_h2]:font-display [&_h2]:text-[24px] [&_h2]:font-medium [&_h2]:tracking-[-0.02em] [&_h2]:text-ink [&_li]:ml-5 [&_li]:list-disc [&_ul]:space-y-1.5">
            {children}
          </div>
        </div>
      </article>
    </SubpageShell>
  );
}
