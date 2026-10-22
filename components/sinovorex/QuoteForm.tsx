"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Loader2, Paperclip, X } from "lucide-react";
import { COMPANY, SERVICES } from "./data";
import { EASE } from "./primitives";
import { track } from "./analytics";

const EMPTY = {
  name: "", email: "", company: "", phone: "",
  product: "", quantity: "", targetPrice: "", destination: "", incoterm: "Not sure", message: "",
};
/** "What do you need?" chips. Service pages link to /quote?service=<slug> to preselect one. */
const SERVICE_OPTIONS = SERVICES.map((s) => ({ slug: s.slug, label: s.title }));
export const MAX_FILES = 3;
export const MAX_TOTAL_BYTES = 8 * 1024 * 1024;
// Images, PDFs and spreadsheets (multi-item procurement lists). Keep in sync with app/api/contact/route.ts.
const ACCEPT = "image/jpeg,image/png,image/webp,application/pdf,.xlsx,.xls,.csv,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel,text/csv";
const INCOTERM_OPTIONS = ["Not sure", "FOB", "CIF", "DDP", "EXW"];

const fieldCls = "peer w-full rounded-2xl border border-ink/10 bg-paper px-4 pb-3 pt-8 text-[16px] text-ink outline-none transition-all duration-300 placeholder:text-transparent focus:border-flame focus:bg-white focus:shadow-[0_0_0_4px_rgba(255,107,43,0.12)]";

function Field({
  label, required, textarea, hint, ...props
}: { label: string; required?: boolean; textarea?: boolean; hint?: string } & React.InputHTMLAttributes<HTMLInputElement> & React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <label className="relative block">
      {textarea
        ? <textarea {...props} required={required} placeholder={label} rows={3} className={`${fieldCls} min-h-[100px] resize-none`} />
        : <input {...props} required={required} placeholder={label} className={fieldCls} />}
      <span className="pointer-events-none absolute left-4 top-2.5 text-[12px] font-semibold text-ink/70 transition-colors peer-focus:text-flame">
        {label}{!required && <span className="font-normal text-ink/55"> (optional)</span>}{hint && <span className="font-normal text-ink/55"> · {hint}</span>}
      </span>
    </label>
  );
}

const fmtSize = (b: number) => (b > 1024 * 1024 ? `${(b / 1024 / 1024).toFixed(1)} MB` : `${Math.max(1, Math.round(b / 1024))} KB`);

/** The quote request form. Used in the quote modal and on the server-rendered /quote page. */
export function QuoteForm({ onClose, showHeader = true }: { onClose?: () => void; showHeader?: boolean }) {
  const [form, setForm] = useState(EMPTY);
  const [files, setFiles] = useState<File[]>([]);
  const [consent, setConsent] = useState(false);
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [services, setServices] = useState<string[]>([]);
  const [fba, setFba] = useState(false);
  const fileInput = useRef<HTMLInputElement>(null);

  // Preselect the service a visitor came from (e.g. /quote?service=quality-inspection).
  useEffect(() => {
    const slug = new URLSearchParams(location.search).get("service");
    const match = SERVICE_OPTIONS.find((o) => o.slug === slug);
    if (match) setServices([match.label]);
  }, []);
  const toggleService = (label: string) =>
    setServices((cur) => (cur.includes(label) ? cur.filter((x) => x !== label) : [...cur, label]));

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((p) => ({ ...p, [k]: e.target.value }));

  const addFiles = (list: FileList | null) => {
    if (!list) return;
    const next = [...files, ...Array.from(list)].slice(0, MAX_FILES);
    const total = next.reduce((n, f) => n + f.size, 0);
    if (total > MAX_TOTAL_BYTES) { setError(`Attachments can be up to ${fmtSize(MAX_TOTAL_BYTES)} in total.`); return; }
    setError("");
    setFiles(next);
    if (fileInput.current) fileInput.current.value = "";
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setError("");
    try {
      const body = new FormData();
      Object.entries(form).forEach(([k, v]) => body.append(k, v));
      body.append("website", honeypot);
      body.append("consent", consent ? "yes" : "");
      services.forEach((s) => body.append("services", s));
      if (fba) body.append("fba", "yes");
      files.forEach((f) => body.append("files", f, f.name));
      const res = await fetch("/api/contact", { method: "POST", body });
      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error);
      }
      track("generate_lead", { form: "quote_request", incoterm: form.incoterm, attachments: files.length, services: services.join(", ") || "none", fba: fba ? "yes" : "no" });
      setSent(true);
    } catch (err) {
      setError((err instanceof Error && err.message) || `Something went wrong. Please try again or email ${COMPANY.email}.`);
    } finally {
      setSending(false);
    }
  };

  return (
    <AnimatePresence mode="wait">
      {!sent ? (
        <motion.div key="form" exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.25 }}>
          {showHeader && (
            <>
              <div className="font-mono text-[11px] uppercase tracking-[0.25em] text-flame">Quote request</div>
              <h2 className="mt-3 pr-12 font-display text-[clamp(28px,5vw,40px)] font-medium leading-[1] tracking-[-0.04em] text-ink">
                Request a free <span className="font-serif font-normal italic text-flame">quote</span>
              </h2>
              <p className="mt-3 text-[14px] text-ink/70">The more you tell us, the more accurate our quote will be.</p>
            </>
          )}

          <form onSubmit={submit} action="/api/contact" method="post" encType="multipart/form-data" className="mt-6 space-y-3">
            <input
              type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden
              value={honeypot} onChange={(e) => setHoneypot(e.target.value)}
              className="absolute -left-[9999px] h-0 w-0 opacity-0"
            />

            <fieldset>
              <legend className="mb-3 text-[14px] font-semibold text-ink">What do you need help with? <span className="font-normal text-ink/55">(pick any)</span></legend>
              <div className="flex flex-wrap gap-2">
                {SERVICE_OPTIONS.map((o) => (
                  <label key={o.slug} className="cursor-pointer">
                    <input type="checkbox" name="services" value={o.label} checked={services.includes(o.label)} onChange={() => toggleService(o.label)} className="peer sr-only" />
                    <span className="inline-flex min-h-[44px] items-center rounded-full border border-ink/15 bg-paper px-4 text-[14px] text-ink/80 transition-colors hover:border-ink/40 peer-checked:border-flame peer-checked:bg-flame peer-checked:text-white peer-focus-visible:ring-2 peer-focus-visible:ring-flame peer-focus-visible:ring-offset-2">{o.label}</span>
                  </label>
                ))}
              </div>
              <label className="mt-3 flex min-h-[44px] cursor-pointer items-center gap-3 text-[15px] text-ink/80">
                <input type="checkbox" name="fba" value="yes" checked={fba} onChange={(e) => setFba(e.target.checked)} className="h-5 w-5 shrink-0 accent-[#FF6B2B]" />
                The goods are going to Amazon FBA
              </label>
            </fieldset>

            <fieldset className="space-y-3 pt-2">
              <legend className="mb-2 text-[14px] font-semibold text-ink">Your product</legend>
              <Field label="Product" name="product" required value={form.product} onChange={set("product")} hint="what you want to buy, inspect or ship" />
              <div className="grid gap-3 sm:grid-cols-2">
                <Field label="Quantity" name="quantity" value={form.quantity} onChange={set("quantity")} hint="e.g. 2,000 pcs" />
                <Field label="Target price" name="targetPrice" value={form.targetPrice} onChange={set("targetPrice")} hint="per unit, USD" />
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <Field label="Destination" name="destination" value={form.destination} onChange={set("destination")} hint="country / port" />
                <label className="relative block">
                  <select name="incoterm" value={form.incoterm} onChange={set("incoterm")} className={`${fieldCls} appearance-none`}>
                    {INCOTERM_OPTIONS.map((o) => <option key={o}>{o}</option>)}
                  </select>
                  <span className="pointer-events-none absolute left-4 top-2.5 text-[12px] font-semibold text-ink/70">Incoterm</span>
                  <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-ink/60">▾</span>
                </label>
              </div>
              <Field label="Details" name="message" textarea value={form.message} onChange={set("message")} hint="material, size, colour, packaging, deadline" />

              <div>
                <input ref={fileInput} type="file" name="files" multiple accept={ACCEPT} className="sr-only" id="quote-files" onChange={(e) => addFiles(e.target.files)} />
                <label
                  htmlFor="quote-files"
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => { e.preventDefault(); addFiles(e.dataTransfer.files); }}
                  className="flex cursor-pointer items-center gap-3 rounded-2xl border border-dashed border-ink/20 bg-paper px-4 py-4 text-[14px] text-ink/75 transition-colors hover:border-flame hover:text-ink"
                >
                  <Paperclip size={18} className="shrink-0 text-flame" />
                  <span>
                    <span className="font-medium text-ink">Attach photos, drawings, specs or an item list</span>
                    <span className="block text-[12px] text-ink/65">JPG, PNG, WebP, PDF, Excel or CSV · up to {MAX_FILES} files, {fmtSize(MAX_TOTAL_BYTES)} total</span>
                  </span>
                </label>
                {files.length > 0 && (
                  <ul className="mt-2 space-y-1.5">
                    {files.map((f, i) => (
                      <li key={`${f.name}-${i}`} className="flex items-center justify-between gap-3 rounded-xl bg-paper px-3 py-2 text-[13px] text-ink/80">
                        <span className="truncate">{f.name} <span className="text-ink/55">· {fmtSize(f.size)}</span></span>
                        <button type="button" onClick={() => setFiles(files.filter((_, j) => j !== i))} aria-label={`Remove ${f.name}`} className="text-ink/60 hover:text-flame"><X size={14} /></button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </fieldset>

            <fieldset className="space-y-3 pt-2">
              <legend className="mb-2 text-[14px] font-semibold text-ink">Your details</legend>
              <div className="grid gap-3 sm:grid-cols-2">
                <Field label="Full name" name="name" required autoComplete="name" value={form.name} onChange={set("name")} />
                <Field label="Company" name="company" autoComplete="organization" value={form.company} onChange={set("company")} />
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <Field label="Email address" name="email" type="email" required autoComplete="email" value={form.email} onChange={set("email")} />
                <Field label="Phone / WhatsApp" name="phone" type="tel" autoComplete="tel" value={form.phone} onChange={set("phone")} />
              </div>
            </fieldset>

            <label className="flex items-start gap-3 pt-1 text-[13px] leading-relaxed text-ink/75">
              <input type="checkbox" name="consent" value="yes" required checked={consent} onChange={(e) => setConsent(e.target.checked)} className="mt-0.5 h-5 w-5 shrink-0 accent-[#FF6B2B]" />
              <span>
                I agree that Sino Vorex may use these details to reply to my request, as described in the{" "}
                <Link href="/privacy" target="_blank" className="font-medium text-ink underline underline-offset-2 hover:text-flame">privacy policy</Link>.
              </span>
            </label>

            <AnimatePresence>
              {error && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
                  role="alert"
                  className="overflow-hidden rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-[14px] text-red-700">
                  {error}
                </motion.div>
              )}
            </AnimatePresence>

            <button
              type="submit" disabled={sending}
              className="group mt-2 flex w-full items-center justify-center gap-3 rounded-full bg-ink py-4 text-[16px] font-medium text-white transition-all duration-500 hover:bg-flame hover:shadow-[0_18px_40px_-12px_rgba(255,107,43,0.6)] disabled:opacity-70"
            >
              {sending ? <><Loader2 size={18} className="animate-spin" /> Sending…</> : <>Send quote request <ArrowUpRight size={18} className="transition-transform duration-500 group-hover:rotate-45" /></>}
            </button>
            <p className="pt-1 text-center text-[13px] text-ink/70">We typically respond within 24 hours.</p>
          </form>
        </motion.div>
      ) : (
        <motion.div key="sent" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: EASE }} className="py-8 text-center">
          <svg viewBox="0 0 80 80" className="mx-auto h-20 w-20" aria-hidden>
            <motion.circle cx="40" cy="40" r="36" fill="none" stroke="#FF6B2B" strokeWidth="3"
              initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.7, ease: EASE }} />
            <motion.path d="M25 41 L36 52 L56 30" fill="none" stroke="#FF6B2B" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"
              initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.5, delay: 0.5, ease: EASE }} />
          </svg>
          <div className="mt-6 font-mono text-[11px] uppercase tracking-[0.25em] text-flame">Request sent</div>
          <h3 className="mt-3 font-display text-3xl font-medium tracking-[-0.03em] text-ink">Thank you, {form.name || "there"}!</h3>
          <p className="mx-auto mt-4 max-w-[360px] text-[15px] leading-relaxed text-ink/70">
            We&apos;ve received your quote request and will reply within 24 hours. For anything urgent, message us on WhatsApp.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-2">
            <a href={COMPANY.whatsappHref} target="_blank" rel="noopener noreferrer" className="rounded-full bg-[#25D366] px-6 py-3 text-[14px] font-medium text-white">WhatsApp us</a>
            {onClose && (
              <button onClick={onClose} className="rounded-full border border-ink/15 px-6 py-3 text-[14px] font-medium text-ink transition-colors hover:border-flame hover:text-flame">
                Close
              </button>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
