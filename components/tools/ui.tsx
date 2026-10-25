import type { ReactNode } from "react";

/** Shared input styling for the calculators. 16px text so phones don't zoom in. */
export const inputCls =
  "w-full rounded-xl border border-ink/15 bg-white px-3.5 py-2.5 text-[16px] text-ink outline-none transition focus:border-flame focus:ring-4 focus:ring-flame/15";

export function NumField({ label, value, onChange, step = "any", min = 0, suffix, hint }: {
  label: string; value: number | ""; onChange: (v: number | "") => void; step?: string; min?: number; suffix?: string; hint?: string;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[13px] font-semibold text-ink/75">{label}{hint && <span className="font-normal text-ink/50"> · {hint}</span>}</span>
      <span className="relative block">
        <input
          type="number" inputMode="decimal" step={step} min={min} value={value}
          onChange={(e) => onChange(e.target.value === "" ? "" : Number(e.target.value))}
          className={`${inputCls} ${suffix ? "pr-14" : ""}`}
        />
        {suffix && <span className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-[14px] text-ink/50">{suffix}</span>}
      </span>
    </label>
  );
}

export function SelectField({ label, value, onChange, children }: { label: string; value: string; onChange: (v: string) => void; children: ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[13px] font-semibold text-ink/75">{label}</span>
      <select value={value} onChange={(e) => onChange(e.target.value)} className={`${inputCls} appearance-none bg-[length:12px] pr-9`}>
        {children}
      </select>
    </label>
  );
}

export function Panel({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`rounded-[28px] border border-ink/[0.07] bg-white p-5 md:p-8 ${className}`}>{children}</div>;
}

export const n = (v: number | "") => (v === "" || Number.isNaN(v) ? 0 : v);
export const fmt = (v: number, digits = 2) => v.toLocaleString("en-US", { minimumFractionDigits: digits, maximumFractionDigits: digits });
