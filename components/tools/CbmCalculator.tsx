"use client";

import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { NumField, Panel, SelectField, fmt, n } from "./ui";

type Row = { id: number; l: number | ""; w: number | ""; h: number | ""; qty: number | ""; kg: number | "" };

/** Practical loading limits (volume most cargo reaches; typical payload). Real limits depend on the cargo and local road rules. */
const CONTAINERS = [
  { name: "20-foot", cbm: 28, kg: 25000 },
  { name: "40-foot", cbm: 58, kg: 26500 },
  { name: "40-foot high cube", cbm: 68, kg: 26500 },
];
const IN_TO_CM = 2.54, LB_TO_KG = 0.45359237;

/** Shipment volume (CBM), weights and container fit for one or more carton sizes. */
export function CbmCalculator() {
  const [unit, setUnit] = useState<"metric" | "imperial">("metric");
  const [rows, setRows] = useState<Row[]>([{ id: 1, l: 60, w: 40, h: 40, qty: 100, kg: 12 }]);
  const set = (id: number, k: keyof Row) => (v: number | "") => setRows((rs) => rs.map((r) => (r.id === id ? { ...r, [k]: v } : r)));

  const len = unit === "metric" ? 1 : IN_TO_CM, wt = unit === "metric" ? 1 : LB_TO_KG;
  const lines = rows.map((r) => {
    const cartonCbm = (n(r.l) * len * n(r.w) * len * n(r.h) * len) / 1_000_000;
    const qty = Math.floor(n(r.qty));
    return { cbm: cartonCbm * qty, kg: n(r.kg) * wt * qty, volKg: ((n(r.l) * len * n(r.w) * len * n(r.h) * len) / 6000) * qty, cartons: qty };
  });
  const total = lines.reduce((a, b) => ({ cbm: a.cbm + b.cbm, kg: a.kg + b.kg, volKg: a.volKg + b.volKg, cartons: a.cartons + b.cartons }), { cbm: 0, kg: 0, volKg: 0, cartons: 0 });
  const chargeableAir = Math.max(total.kg, total.volKg);
  const lclTons = Math.max(total.cbm, total.kg / 1000);
  const fit = CONTAINERS.find((c) => total.cbm <= c.cbm && total.kg <= c.kg);
  const suggestion = total.cbm === 0 ? "" : total.cbm < 13 ? "Usually cheapest as LCL (shared container)." : fit ? `Fits in a ${fit.name} container.` : "More than one 40-foot high cube. Ask us to plan the load.";

  return (
    <Panel>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <p className="text-[15px] text-ink/70">Enter the size and weight of one carton, and how many cartons. Add a row for each carton size.</p>
        <div className="w-44"><SelectField label="Units" value={unit} onChange={(v) => setUnit(v as "metric" | "imperial")}><option value="metric">cm and kg</option><option value="imperial">inches and lb</option></SelectField></div>
      </div>

      <div className="mt-6 space-y-4">
        {rows.map((r, i) => (
          <div key={r.id} className="grid grid-cols-2 gap-3 rounded-2xl bg-paper p-4 sm:grid-cols-[repeat(5,minmax(0,1fr))_auto] sm:items-end">
            <NumField label="Length" value={r.l} onChange={set(r.id, "l")} suffix={unit === "metric" ? "cm" : "in"} />
            <NumField label="Width" value={r.w} onChange={set(r.id, "w")} suffix={unit === "metric" ? "cm" : "in"} />
            <NumField label="Height" value={r.h} onChange={set(r.id, "h")} suffix={unit === "metric" ? "cm" : "in"} />
            <NumField label="Cartons" value={r.qty} onChange={set(r.id, "qty")} step="1" />
            <NumField label="Weight per carton" value={r.kg} onChange={set(r.id, "kg")} suffix={unit === "metric" ? "kg" : "lb"} />
            <button type="button" onClick={() => setRows((rs) => rs.filter((x) => x.id !== r.id))} disabled={rows.length === 1}
              aria-label={`Remove carton row ${i + 1}`} className="grid h-11 w-11 place-items-center rounded-xl border border-ink/15 text-ink/60 hover:border-red-300 hover:text-red-600 disabled:opacity-30">
              <Trash2 size={16} />
            </button>
          </div>
        ))}
        <button type="button" onClick={() => setRows((rs) => [...rs, { id: Date.now(), l: "", w: "", h: "", qty: "", kg: "" }])}
          className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-ink/15 px-4 text-[15px] font-medium text-ink hover:border-flame">
          <Plus size={16} /> Add another carton size
        </button>
      </div>

      <div aria-live="polite" className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {[
          ["Total volume", `${fmt(total.cbm, 3)} CBM`, `${total.cartons.toLocaleString("en-US")} cartons`],
          ["Gross weight", `${fmt(total.kg, 1)} kg`, `${fmt(total.kg / LB_TO_KG, 0)} lb`],
          ["Air chargeable weight", `${fmt(chargeableAir, 1)} kg`, `Volumetric ${fmt(total.volKg, 1)} kg (÷ 6,000)`],
          ["LCL charged on", `${fmt(lclTons, 3)} W/M`, "The greater of CBM or tonnes"],
        ].map(([k, v, sub]) => (
          <div key={k} className="rounded-2xl bg-paper p-5">
            <div className="text-[13px] font-semibold uppercase tracking-[0.06em] text-ink/55">{k}</div>
            <div className="mt-2 font-display text-[26px] font-medium leading-tight text-ink">{v}</div>
            <div className="text-[13px] text-ink/60">{sub}</div>
          </div>
        ))}
      </div>

      <div className="mt-6">
        <div className="text-[13px] font-semibold uppercase tracking-[0.06em] text-ink/55">Container fit</div>
        <ul className="mt-3 space-y-3">
          {CONTAINERS.map((c) => {
            const pct = Math.max(total.cbm / c.cbm, total.kg / c.kg) * 100;
            return (
              <li key={c.name}>
                <div className="flex justify-between text-[14px] text-ink/80"><span>{c.name} (about {c.cbm} CBM, {c.kg.toLocaleString("en-US")} kg)</span><span className="font-semibold">{fmt(pct, 0)}%</span></div>
                <div className="mt-1.5 h-2.5 overflow-hidden rounded-full bg-ink/[0.07]">
                  <div className={`h-full rounded-full ${pct > 100 ? "bg-red-500" : "bg-flame"}`} style={{ width: `${Math.min(pct, 100)}%` }} />
                </div>
              </li>
            );
          })}
        </ul>
        {suggestion && <p className="mt-4 rounded-2xl bg-flame/[0.08] p-4 text-[15px] font-medium text-ink">{suggestion}</p>}
      </div>
    </Panel>
  );
}
