"use client";

import { useState } from "react";
import { NumField, Panel, SelectField, fmt, n } from "./ui";

/** Default tax settings per destination. Duty depends on the product, so the duty rate is always the user's to set. */
const DESTINATIONS: Record<string, { label: string; dutyBasis: "cif" | "fob"; vat: number; duty?: number; note: string }> = {
  custom: { label: "Other / custom", dutyBasis: "cif", vat: 0, note: "Set the duty basis and VAT for your country." },
  us: { label: "United States", dutyBasis: "fob", vat: 0, note: "US duty is charged on the goods value, not freight. There's no VAT, but expect small customs fees (MPF, HMF) and any extra tariffs on Chinese goods." },
  uk: { label: "United Kingdom", dutyBasis: "cif", vat: 20, note: "Import VAT is usually 20%, charged on the value plus shipping, insurance and duty." },
  eu: { label: "European Union", dutyBasis: "cif", vat: 21, note: "VAT depends on the country, roughly 17% to 27%. 21% is a common rate." },
  uae: { label: "United Arab Emirates", dutyBasis: "cif", vat: 5, duty: 5, note: "Most goods pay 5% duty on CIF, plus 5% VAT." },
  sa: { label: "Saudi Arabia", dutyBasis: "cif", vat: 15, duty: 5, note: "Many goods pay 5% duty, some more. VAT is 15%." },
  pk: { label: "Pakistan", dutyBasis: "cif", vat: 18, note: "Add regulatory duty, additional customs duty and advance income tax where they apply. Sales tax is commonly 18%." },
  ng: { label: "Nigeria", dutyBasis: "cif", vat: 7.5, note: "Duty depends on the ECOWAS tariff band. VAT is 7.5%, plus other levies." },
  ke: { label: "Kenya", dutyBasis: "cif", vat: 16, note: "Duty depends on the EAC tariff band. VAT is 16%, plus import levies." },
};

/** Landed cost: goods + agent fee + freight + insurance + duty + VAT + other costs, per unit and in total. */
export function LandedCostCalculator() {
  const [dest, setDest] = useState("uk");
  const [unitPrice, setUnitPrice] = useState<number | "">(4);
  const [qty, setQty] = useState<number | "">(1000);
  const [agentPct, setAgentPct] = useState<number | "">(8);
  const [inspection, setInspection] = useState<number | "">(270);
  const [freight, setFreight] = useState<number | "">(900);
  const [insPct, setInsPct] = useState<number | "">(0.5);
  const [dutyPct, setDutyPct] = useState<number | "">(4);
  const [vatPct, setVatPct] = useState<number | "">(20);
  const [basis, setBasis] = useState<"cif" | "fob">("cif");
  const [local, setLocal] = useState<number | "">(250);
  const d = DESTINATIONS[dest];

  const chooseDest = (k: string) => {
    const x = DESTINATIONS[k];
    setDest(k); setBasis(x.dutyBasis); setVatPct(x.vat);
    if (x.duty !== undefined) setDutyPct(x.duty);
  };

  const goods = n(unitPrice) * Math.floor(n(qty));
  const agent = goods * (n(agentPct) / 100);
  const insurance = (goods + n(freight)) * (n(insPct) / 100);
  const cif = goods + n(freight) + insurance;
  const duty = (basis === "cif" ? cif : goods) * (n(dutyPct) / 100);
  const vat = (cif + duty) * (n(vatPct) / 100);
  const total = goods + agent + n(inspection) + n(freight) + insurance + duty + vat + n(local);
  const units = Math.floor(n(qty));

  const lines: [string, number][] = [
    ["Goods (FOB China)", goods],
    ["Sourcing agent fee", agent],
    ["Inspection", n(inspection)],
    ["Freight", n(freight)],
    ["Cargo insurance", insurance],
    [`Import duty (${basis === "cif" ? "on CIF value" : "on goods value"})`, duty],
    ["Import VAT / sales tax", vat],
    ["Customs broker and local delivery", n(local)],
  ];

  return (
    <Panel>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <SelectField label="Destination" value={dest} onChange={chooseDest}>
          {Object.entries(DESTINATIONS).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
        </SelectField>
        <NumField label="Unit price" hint="FOB, USD" value={unitPrice} onChange={setUnitPrice} suffix="USD" />
        <NumField label="Quantity" value={qty} onChange={setQty} step="1" suffix="units" />
        <NumField label="Sourcing agent fee" value={agentPct} onChange={setAgentPct} suffix="%" />
        <NumField label="Inspection" value={inspection} onChange={setInspection} suffix="USD" />
        <NumField label="Freight" hint="total quote" value={freight} onChange={setFreight} suffix="USD" />
        <NumField label="Cargo insurance" hint="of goods + freight" value={insPct} onChange={setInsPct} suffix="%" />
        <NumField label="Import duty rate" hint="for your product" value={dutyPct} onChange={setDutyPct} suffix="%" />
        <NumField label="Import VAT / sales tax" value={vatPct} onChange={setVatPct} suffix="%" />
        <SelectField label="Duty charged on" value={basis} onChange={(v) => setBasis(v as "cif" | "fob")}>
          <option value="cif">CIF value (goods + freight + insurance)</option>
          <option value="fob">Goods value only (e.g. USA)</option>
        </SelectField>
        <NumField label="Broker and local delivery" value={local} onChange={setLocal} suffix="USD" />
      </div>
      <p className="mt-3 text-[13px] leading-relaxed text-ink/60">{d.note}</p>

      <div aria-live="polite" className="mt-8 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <table className="w-full text-left text-[15px]">
          <caption className="sr-only">Landed cost breakdown</caption>
          <tbody>
            {lines.map(([k, v]) => (
              <tr key={k} className="border-b border-ink/[0.07]">
                <th scope="row" className="py-2.5 font-normal text-ink/75">{k}</th>
                <td className="py-2.5 text-right font-medium tabular-nums text-ink">US${fmt(v)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="rounded-2xl bg-ink p-6 text-white" data-theme="dark">
          <div className="text-[13px] font-semibold uppercase tracking-[0.06em] text-white/60">Landed cost per unit</div>
          <div className="mt-2 font-display text-[44px] font-medium leading-none">US${units ? fmt(total / units) : "0.00"}</div>
          <div className="mt-5 text-[14px] text-white/70">Total landed cost <span className="font-semibold text-white">US${fmt(total)}</span></div>
          <div className="mt-1 text-[14px] text-white/70">{goods ? `${fmt((total / goods - 1) * 100, 0)}% on top of the product price` : ""}</div>
        </div>
      </div>
      <p className="mt-4 text-[13px] leading-relaxed text-ink/60">An estimate only. Duty rates depend on your product&apos;s tariff code and can change; confirm them with your customs broker before you order.</p>
    </Panel>
  );
}
