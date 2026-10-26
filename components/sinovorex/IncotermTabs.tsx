"use client";

import { useState } from "react";
import { clsx } from "clsx";
import { INCOTERMS } from "./data";

/* Incoterm tabs (the only interactive part of the Shipping section). */
export function IncotermTabs() {
  const [term, setTerm] = useState(0);
  return (
    <>
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/70">Incoterms we quote on</div>
          <h3 className="mt-2 font-display text-[28px] font-medium tracking-[-0.03em]">Who pays for what</h3>
        </div>
        <div role="tablist" aria-label="Incoterms" className="flex gap-1 rounded-full bg-white/[0.06] p-1">
          {INCOTERMS.map((t, i) => (
            <button
              key={t.term}
              type="button"
              role="tab"
              id={`incoterm-tab-${t.term}`}
              aria-controls={`incoterm-${t.term}`}
              aria-selected={term === i}
              onClick={() => setTerm(i)}
              className={clsx("rounded-full px-5 py-2 font-mono text-[13px] transition-colors duration-300", term === i ? "bg-flame text-white" : "text-white/70 hover:text-white")}
            >
              {t.term}
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
    </>
  );
}
