"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Loader2, Paperclip, X } from "lucide-react";
import { COMPANY } from "./data";
import { EASE, useLenis } from "./primitives";
import { track } from "./analytics";

const EMPTY = {
  name: "", email: "", company: "", phone: "",
  product: "", quantity: "", targetPrice: "", destination: "", incoterm: "Not sure", message: "",
};
export const MAX_FILES = 3;
export const MAX_TOTAL_BYTES = 8 * 1024 * 1024;
const ACCEPT = "image/jpeg,image/png,image/webp,application/pdf";
const INCOTERM_OPTIONS = ["Not sure", "FOB", "CIF", "DDP", "EXW"];

const fieldCls = "peer w-full rounded-2xl border border-ink/10 bg-paper px-4 pb-3 pt-7 text-[15px] text-ink outline-none transition-all duration-300 placeholder:text-transparent focus:border-flame focus:bg-white focus:shadow-[0_0_0_4px_rgba(255,107,43,0.12)]";

function Field({
  label, required, textarea, hint, ...props
}: { label: string; required?: boolean; textarea?: boolean; hint?: string } & React.InputHTMLAttributes<HTMLInputElement> & React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <label className="relative block">
      {textarea
        ? <textarea {...props} required={required} placeholder={label} rows={3} className={`${fieldCls} min-h-[100px] resize-none`} />
        : <input {...props} required={required} placeholder={label} className={fieldCls} />}
      <span className="pointer-events-none absolute left-4 top-2.5 font-mono text-[10px] uppercase tracking-[0.18em] text-ink/70 transition-colors peer-focus:text-flame">
        {label}{required && " *"}{hint && <span className="normal-case tracking-normal text-ink/55"> · {hint}</span>}
      </span>
    </label>
  );
}

const fmtSize = (b: number) => (b > 1024 * 1024 ? `${(b / 1024 / 1024).toFixed(1)} MB` : `${Math.max(1, Math.round(b / 1024))} KB`);

export function ContactModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [form, setForm] = useState(EMPTY);
  const [files, setFiles] = useState<File[]>([]);
  const [consent, setConsent] = useState(false);
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const fileInput = useRef<HTMLInputElement>(null);
  const lenis = useLenis();

  useEffect(() => {
    if (!open) return;
    lenis?.stop();
    track("quote_form_open");
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => {
      lenis?.start();
      window.removeEventListener("keydown", onKey);
      setTimeout(() => { setSent(false); setError(""); setForm(EMPTY); setFiles([]); setConsent(false); setHoneypot(""); }, 400);
    };
  }, [open, onClose, lenis]);

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
      files.forEach((f) => body.append("files", f, f.name));
      const res = await fetch("/api/contact", { method: "POST", body });
      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error);
      }
      track("generate_lead", { form: "quote_request", incoterm: form.incoterm, attachments: files.length });
      setSent(true);
    } catch (err) {
      setError((err instanceof Error && err.message) || `Something went wrong. Please try again or email ${COMPANY.email}.`);
    } finally {
      setSending(false);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[9000] flex items-center justify-center p-3" data-lenis-prevent>
          <motion.div
            className="absolute inset-0 bg-ink/60 backdrop-blur-md"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            onClick={onClose}
          />
          <motion.div
            role="dialog" aria-modal="true" aria-label="Request a quote"
            initial={{ opacity: 0, y: 60, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.97 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="relative max-h-[94vh] w-full max-w-[680px] overflow-y-auto rounded-[32px] bg-white p-6 shadow-[0_40px_120px_-20px_rgba(14,14,22,0.5)] sm:p-10"
          >
            <button
              onClick={onClose} aria-label="Close"
              className="absolute right-5 top-5 grid h-10 w-10 place-items-center rounded-full bg-ink/[0.05] text-ink/70 transition-all duration-300 hover:rotate-90 hover:bg-ink hover:text-white"
            >
              <X size={18} />
            </button>

            <AnimatePresence mode="wait">
              {!sent ? (
                <motion.div key="form" exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.25 }}>
                  <div className="font-mono text-[11px] uppercase tracking-[0.25em] text-flame">Quote request</div>
                  <h2 className="mt-3 pr-12 font-display text-[clamp(28px,5vw,40px)] font-medium leading-[1] tracking-[-0.04em] text-ink">
                    Request a free <span className="font-serif font-normal italic text-flame">quote</span>
                  </h2>
                  <p className="mt-3 text-[14px] text-ink/70">The more detail you share, the more accurate our quote. Fields marked * are required.</p>

                  <form onSubmit={submit} className="mt-6 space-y-3">
                    <input
                      type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden
                      value={honeypot} onChange={(e) => setHoneypot(e.target.value)}
                      className="absolute -left-[9999px] h-0 w-0 opacity-0"
                    />

                    <fieldset className="space-y-3">
                      <legend className="mb-2 font-mono text-[11px] uppercase tracking-[0.2em] text-ink/70">Your product</legend>
                      <Field label="Product" required value={form.product} onChange={set("product")} hint="what you want to source" />
                      <div className="grid gap-3 sm:grid-cols-2">
                        <Field label="Quantity" required value={form.quantity} onChange={set("quantity")} hint="e.g. 2,000 pcs" />
                        <Field label="Target price" value={form.targetPrice} onChange={set("targetPrice")} hint="per unit, USD" />
                      </div>
                      <div className="grid gap-3 sm:grid-cols-2">
                        <Field label="Destination" required value={form.destination} onChange={set("destination")} hint="country / port" />
                        <label className="relative block">
                          <select value={form.incoterm} onChange={set("incoterm")} className={`${fieldCls} appearance-none`}>
                            {INCOTERM_OPTIONS.map((o) => <option key={o}>{o}</option>)}
                          </select>
                          <span className="pointer-events-none absolute left-4 top-2.5 font-mono text-[10px] uppercase tracking-[0.18em] text-ink/70">Incoterm</span>
                          <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-ink/60">▾</span>
                        </label>
                      </div>
                      <Field label="Details" textarea value={form.message} onChange={set("message")} hint="material, size, colour, packaging, deadline" />

                      <div>
                        <input ref={fileInput} type="file" multiple accept={ACCEPT} className="sr-only" id="quote-files" onChange={(e) => addFiles(e.target.files)} />
                        <label
                          htmlFor="quote-files"
                          onDragOver={(e) => e.preventDefault()}
                          onDrop={(e) => { e.preventDefault(); addFiles(e.dataTransfer.files); }}
                          className="flex cursor-pointer items-center gap-3 rounded-2xl border border-dashed border-ink/20 bg-paper px-4 py-4 text-[14px] text-ink/75 transition-colors hover:border-flame hover:text-ink"
                        >
                          <Paperclip size={18} className="shrink-0 text-flame" />
                          <span>
                            <span className="font-medium text-ink">Attach photos, drawings or specs</span>
                            <span className="block text-[12px] text-ink/65">JPG, PNG, WebP or PDF · up to {MAX_FILES} files, {fmtSize(MAX_TOTAL_BYTES)} total</span>
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
                      <legend className="mb-2 font-mono text-[11px] uppercase tracking-[0.2em] text-ink/70">Your details</legend>
                      <div className="grid gap-3 sm:grid-cols-2">
                        <Field label="Full name" required autoComplete="name" value={form.name} onChange={set("name")} />
                        <Field label="Company" autoComplete="organization" value={form.company} onChange={set("company")} />
                      </div>
                      <div className="grid gap-3 sm:grid-cols-2">
                        <Field label="Email address" type="email" required autoComplete="email" value={form.email} onChange={set("email")} />
                        <Field label="Phone / WhatsApp" type="tel" autoComplete="tel" value={form.phone} onChange={set("phone")} />
                      </div>
                    </fieldset>

                    <label className="flex items-start gap-3 pt-1 text-[13px] leading-relaxed text-ink/75">
                      <input type="checkbox" required checked={consent} onChange={(e) => setConsent(e.target.checked)} className="mt-0.5 h-4 w-4 shrink-0 accent-[#FF6B2B]" />
                      <span>
                        I agree that Sino Vorex may use these details to reply to my request, as described in the{" "}
                        <Link href="/privacy" target="_blank" className="font-medium text-ink underline underline-offset-2 hover:text-flame">privacy policy</Link>. *
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
                      className="group mt-2 flex w-full items-center justify-center gap-3 rounded-full bg-ink py-4 text-[15px] font-medium text-white transition-all duration-500 hover:bg-flame hover:shadow-[0_18px_40px_-12px_rgba(255,107,43,0.6)] disabled:opacity-70"
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
                    <button onClick={onClose} className="rounded-full border border-ink/15 px-6 py-3 text-[14px] font-medium text-ink transition-colors hover:border-flame hover:text-flame">
                      Close
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
