"use client";

import { useState } from "react";
import { clsx } from "clsx";
import { INCOTERMS, STEPS } from "@/lib/incoterms";
import { Panel } from "./ui";

/** Pick an Incoterm and see who pays for each step from the factory to your door, and where risk passes. */
export function IncotermsExplorer() {
  const [code, setCode] = useState("FOB");
  const t = INCOTERMS.find((x) => x.code === code) ?? INCOTERMS[3];

  return (
    <Panel>
      <div role="radiogroup" aria-label="Choose an Incoterm" className="flex flex-wrap gap-2">
        {INCOTERMS.map((x) => (
          <button key={x.code} type="button" role="radio" aria-checked={x.code === code} onClick={() => setCode(x.code)}
            className={clsx("min-h-[44px] rounded-full px-4 font-mono text-[14px] font-medium transition-colors", x.code === code ? "bg-flame text-white" : "bg-paper text-ink/75 hover:bg-flame/10")}>
            {x.code}
          </button>
        ))}
      </div>

      <div aria-live="polite" className="mt-6">
        <h2 className="font-display text-[26px] font-medium tracking-[-0.03em] text-ink">{t.code}: {t.name}</h2>
        <p className="mt-1 text-[13px] font-semibold uppercase tracking-[0.06em] text-ink/50">{t.modes} · Risk passes: {t.riskAt.toLowerCase()}</p>
        <p className="mt-3 max-w-[68ch] text-[16px] leading-relaxed text-ink/80">{t.summary}</p>
        {t.note && <p className="mt-2 max-w-[68ch] text-[15px] text-ink/65">{t.note}</p>}

        <div className="mt-6 flex flex-wrap gap-4 text-[13px] font-medium">
          <span className="flex items-center gap-2"><span className="h-3 w-3 rounded-full bg-ink" />The factory pays</span>
          <span className="flex items-center gap-2"><span className="h-3 w-3 rounded-full bg-flame" />You pay</span>
          <span className="flex items-center gap-2"><span className="h-0.5 w-5 bg-red-500" />Risk passes to you</span>
        </div>

        <ol className="mt-4 space-y-2">
          {STEPS.map((s, i) => (
            <li key={s}>
              <div className={clsx("flex items-center justify-between gap-3 rounded-xl px-4 py-3 text-[15px]", t.pays[i] === "S" ? "bg-ink text-white" : "bg-flame/10 text-ink")}>
                <span><span className="mr-3 font-mono text-[12px] opacity-60">{String(i + 1).padStart(2, "0")}</span>{s}</span>
                <span className="shrink-0 text-[13px] font-semibold">{t.pays[i] === "S" ? "Factory" : "You"}</span>
              </div>
              {i === t.riskAfter && (
                <div className="my-2 flex items-center gap-3 text-[13px] font-semibold text-red-600">
                  <span className="h-0.5 flex-1 bg-red-500" />Risk passes to you here<span className="h-0.5 flex-1 bg-red-500" />
                </div>
              )}
            </li>
          ))}
        </ol>
      </div>
    </Panel>
  );
}
