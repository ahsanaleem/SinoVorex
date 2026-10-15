"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Copy, MessageCircle, X } from "lucide-react";
import { clsx } from "clsx";
import { COMPANY } from "./data";
import { EASE } from "./primitives";
import { track } from "./analytics";

const WA_TEXT = encodeURIComponent("Hello Sino Vorex, I'd like to source a product from China.");
const waHref = `${COMPANY.whatsappHref}?text=${WA_TEXT}`;

function WeChatGlyph({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M8.7 3C4.9 3 2 5.6 2 8.8c0 1.8 1 3.4 2.5 4.5L4 15.5l2.4-1.3c.7.2 1.5.3 2.3.3h.5a5.3 5.3 0 0 1-.2-1.4c0-3.3 3-5.9 6.8-5.9h.4C15.6 4.9 12.5 3 8.7 3Zm-2.2 3.6a.9.9 0 1 1 0 1.8.9.9 0 0 1 0-1.8Zm4.5 0a.9.9 0 1 1 0 1.8.9.9 0 0 1 0-1.8ZM15.8 8.4c-3.3 0-5.9 2.2-5.9 4.9s2.6 4.9 5.9 4.9c.6 0 1.2-.1 1.8-.2l2 1.1-.5-1.8c1.4-.9 2.4-2.4 2.4-4 0-2.7-2.6-4.9-5.7-4.9Zm-2 2.9a.8.8 0 1 1 0 1.5.8.8 0 0 1 0-1.5Zm4 0a.8.8 0 1 1 0 1.5.8.8 0 0 1 0-1.5Z" />
    </svg>
  );
}

function useCopy() {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try { await navigator.clipboard.writeText(COMPANY.wechatId); } catch { /* clipboard blocked: ID is still visible */ }
    setCopied(true);
    track("wechat_copy");
    setTimeout(() => setCopied(false), 1800);
  };
  return { copied, copy };
}

/** Inline WhatsApp + WeChat buttons (used in the contact panel). */
export function ChatButtons({ tone = "onFlame" }: { tone?: "onFlame" | "light" }) {
  const { copied, copy } = useCopy();
  const base = "inline-flex items-center gap-2 rounded-full px-5 py-3 text-[15px] font-medium transition-colors duration-300";
  const styles = tone === "onFlame"
    ? "border border-white/40 text-white hover:bg-white hover:text-flame"
    : "border border-ink/15 text-ink hover:border-ink";
  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      <a href={waHref} target="_blank" rel="noopener noreferrer" onClick={() => track("whatsapp_click")} className={clsx(base, styles)}>
        <MessageCircle size={18} /> WhatsApp
      </a>
      <button type="button" onClick={copy} className={clsx(base, styles)} aria-label={`Copy WeChat ID ${COMPANY.wechatId}`}>
        <WeChatGlyph /> {copied ? "WeChat ID copied" : `WeChat: ${COMPANY.wechatId}`}
      </button>
    </div>
  );
}

/** Header WhatsApp button for large screens (where a floating button would cover content). */
export function HeaderWhatsApp() {
  return (
    <a
      href={waHref} target="_blank" rel="noopener noreferrer" onClick={() => track("whatsapp_click", { placement: "header" })}
      aria-label="Chat with us on WhatsApp" title="WhatsApp"
      className="hidden h-11 w-11 place-items-center rounded-full bg-[#25D366] text-white shadow-[0_8px_20px_-8px_rgba(37,211,102,0.8)] transition-transform duration-300 hover:scale-105 xl:grid"
    >
      <MessageCircle size={20} />
    </a>
  );
}

/** Floating chat launcher, bottom-right on phones and tablets (desktop uses HeaderWhatsApp). */
export function FloatingChat({ ready = true }: { ready?: boolean }) {
  const [open, setOpen] = useState(false);
  const { copied, copy } = useCopy();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => { if (!ref.current?.contains(e.target as Node)) setOpen(false); };
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => { document.removeEventListener("mousedown", onDoc); document.removeEventListener("keydown", onKey); };
  }, [open]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.6, y: 20 }}
      animate={ready ? { opacity: 1, scale: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 1.2, ease: EASE }}
      className="fixed bottom-4 right-4 z-[130] flex flex-col items-end gap-3 md:bottom-6 md:right-6 xl:hidden"
    >
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.97 }}
            transition={{ duration: 0.25, ease: EASE }}
            className="w-[280px] origin-bottom-right rounded-[24px] border border-ink/[0.08] bg-white p-4 shadow-[0_30px_60px_-20px_rgba(14,14,22,0.35)]"
            role="dialog"
            aria-label="Chat with Sino Vorex"
          >
            <div className="px-1 pb-3 text-[14px] font-medium text-ink">Chat with us</div>
            <a
              href={waHref} target="_blank" rel="noopener noreferrer"
              onClick={() => track("whatsapp_click")}
              className="flex items-center gap-3 rounded-2xl bg-[#25D366] px-4 py-3 text-white transition-transform duration-300 hover:scale-[1.02]"
            >
              <MessageCircle size={20} />
              <span className="flex-1">
                <span className="block text-[15px] font-medium">WhatsApp</span>
                <span className="block text-[12px] text-white/85">{COMPANY.phoneDisplay}</span>
              </span>
            </a>
            <button
              type="button" onClick={copy}
              className="mt-2 flex w-full items-center gap-3 rounded-2xl bg-[#07C160] px-4 py-3 text-left text-white transition-transform duration-300 hover:scale-[1.02]"
            >
              <WeChatGlyph size={20} />
              <span className="flex-1">
                <span className="block text-[15px] font-medium">WeChat</span>
                <span className="block text-[12px] text-white/85">ID: {COMPANY.wechatId}</span>
              </span>
              {copied ? <Check size={18} /> : <Copy size={18} />}
            </button>
            <p className="px-1 pt-2 text-[12px] text-ink/65">{copied ? "WeChat ID copied. Add us in WeChat." : "Tap WeChat to copy our ID."}</p>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-label={open ? "Close chat options" : "Chat on WhatsApp or WeChat"}
        className="relative grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-[0_14px_30px_-8px_rgba(37,211,102,0.7)] transition-transform duration-300 hover:scale-105"
      >
        {!open && <span className="absolute inset-0 animate-ping rounded-full bg-[#25D366] opacity-30" />}
        <AnimatePresence mode="wait" initial={false}>
          <motion.span key={open ? "x" : "c"} initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }} className="relative">
            {open ? <X size={22} /> : <MessageCircle size={24} />}
          </motion.span>
        </AnimatePresence>
      </button>
    </motion.div>
  );
}
