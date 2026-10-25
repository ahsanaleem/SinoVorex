"use client";

import { useState } from "react";
import { AQLS, LEVELS, aqlPlan, type Aql, type Level } from "@/lib/aql";
import { NumField, Panel, SelectField, n } from "./ui";

type ClassAql = Aql | "none";
const CLASSES: { key: "critical" | "major" | "minor"; label: string; hint: string }[] = [
  { key: "critical", label: "Critical defects", hint: "unsafe or illegal" },
  { key: "major", label: "Major defects", hint: "likely to cause a return" },
  { key: "minor", label: "Minor defects", hint: "small, usually accepted" },
];

/** AQL sample size and accept/reject numbers per defect class, from ISO 2859-1 single sampling, normal inspection. */
export function AqlCalculator() {
  const [lot, setLot] = useState<number | "">(3000);
  const [level, setLevel] = useState<Level>("II");
  const [aqls, setAqls] = useState<Record<string, ClassAql>>({ critical: "none", major: "2.5", minor: "4.0" });

  const lotSize = Math.floor(n(lot));
  const valid = lotSize >= 2;
  // "Not allowed" classes use the major plan's sample, with zero defects accepted.
  const base = valid ? aqlPlan(lotSize, level, aqls.major === "none" ? "2.5" : (aqls.major as Aql)) : null;

  return (
    <Panel>
      <div className="grid gap-4 sm:grid-cols-2">
        <NumField label="Lot size" hint="units in the order" value={lot} onChange={setLot} step="1" min={2} />
        <SelectField label="Inspection level" value={level} onChange={(v) => setLevel(v as Level)}>
          {LEVELS.map((l) => <option key={l} value={l}>{l === "II" ? "II (normal, most common)" : l.startsWith("S") ? `${l} (special, small samples)` : l}</option>)}
        </SelectField>
      </div>
      <div className="mt-4 grid gap-4 sm:grid-cols-3">
        {CLASSES.map((c) => (
          <SelectField key={c.key} label={`${c.label} AQL`} value={aqls[c.key]} onChange={(v) => setAqls((a) => ({ ...a, [c.key]: v as ClassAql }))}>
            <option value="none">Not allowed (0)</option>
            {AQLS.map((a) => <option key={a} value={a}>{a}</option>)}
          </SelectField>
        ))}
      </div>

      <div aria-live="polite" className="mt-8">
        {!valid ? (
          <p className="rounded-2xl bg-paper p-4 text-[15px] text-ink/70">Enter a lot size of 2 units or more.</p>
        ) : (
          <>
            <p className="text-[15px] text-ink/70">
              Lot of <strong className="text-ink">{lotSize.toLocaleString("en-US")}</strong> units at inspection level {level} gives sample size code letter <strong className="text-ink">{base?.codeLetter}</strong>.
            </p>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              {CLASSES.map((c) => {
                const a = aqls[c.key];
                const r = a === "none" ? base && { ...base, accept: 0, reject: 1 } : aqlPlan(lotSize, level, a);
                if (!r) return null;
                return (
                  <div key={c.key} className="rounded-2xl bg-paper p-5">
                    <div className="text-[13px] font-semibold uppercase tracking-[0.06em] text-ink/55">{c.label}</div>
                    <div className="mt-1 text-[13px] text-ink/50">{a === "none" ? "No defects allowed" : `AQL ${a}`}</div>
                    <div className="mt-4 font-display text-[34px] font-medium leading-none text-ink">{r.sampleSize.toLocaleString("en-US")}</div>
                    <div className="text-[13px] text-ink/60">units to inspect{r.fullInspection ? " (every unit)" : ""}</div>
                    <div className="mt-4 flex gap-4 text-[15px]">
                      <span><span className="font-semibold text-emerald-700">Accept</span> ≤ {r.accept}</span>
                      <span><span className="font-semibold text-red-600">Reject</span> ≥ {r.reject}</span>
                    </div>
                  </div>
                );
              })}
            </div>
            <p className="mt-4 text-[13px] leading-relaxed text-ink/60">
              The lot passes for a defect class if the defects found in the sample are at or below the accept number, and fails at the reject number. Each class is judged on its own sample size and limits. Where they differ, many inspectors simply check the largest sample, which covers the others.
            </p>
          </>
        )}
      </div>
    </Panel>
  );
}
