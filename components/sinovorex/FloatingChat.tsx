"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Copy, MessageCircle, X } from "lucide-react";
import { clsx } from "clsx";
import { COMPANY } from "./data";
import { track } from "./analytics";
import { WeChatGlyph, useCopy, waHref } from "./ChatButtons";

/** Floating chat launcher, bottom-right on phones and tablets (desktop uses HeaderWhatsApp). CSS animations only. */
export function FloatingChat() {
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
    <div
      ref={ref}
      className="sv-fade fixed bottom-4 right-4 z-[130] flex flex-col items-end gap-3 md:bottom-6 md:right-6 xl:hidden"
    >
        {open && (
          <div
            className="sv-fade-quick w-[280px] origin-bottom-right rounded-[24px] border border-ink/[0.08] bg-white p-4 shadow-[0_30px_60px_-20px_rgba(14,14,22,0.35)]"
            role="dialog"
            aria-label="Chat with SinoVorex"
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
          </div>
        )}

      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-label={open ? "Close chat options" : "Chat on WhatsApp or WeChat"}
        className="relative grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-[0_14px_30px_-8px_rgba(37,211,102,0.7)] transition-transform duration-300 hover:scale-105"
      >
        {!open && <span className="absolute inset-0 animate-ping rounded-full bg-[#25D366] opacity-30" />}
        <span key={open ? "x" : "c"} className="sv-fade-quick relative">
          {open ? <X size={22} /> : <MessageCircle size={24} />}
        </span>
      </button>
    </div>
  );
}
