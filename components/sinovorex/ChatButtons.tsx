"use client";

import { useState } from "react";
import { MessageCircle } from "lucide-react";
import { clsx } from "clsx";
import { COMPANY } from "./data";
import { track } from "./analytics";

const WA_TEXT = encodeURIComponent("Hello Sino Vorex, I'd like to source a product from China.");
export const waHref = `${COMPANY.whatsappHref}?text=${WA_TEXT}`;

export function WeChatGlyph({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M8.7 3C4.9 3 2 5.6 2 8.8c0 1.8 1 3.4 2.5 4.5L4 15.5l2.4-1.3c.7.2 1.5.3 2.3.3h.5a5.3 5.3 0 0 1-.2-1.4c0-3.3 3-5.9 6.8-5.9h.4C15.6 4.9 12.5 3 8.7 3Zm-2.2 3.6a.9.9 0 1 1 0 1.8.9.9 0 0 1 0-1.8Zm4.5 0a.9.9 0 1 1 0 1.8.9.9 0 0 1 0-1.8ZM15.8 8.4c-3.3 0-5.9 2.2-5.9 4.9s2.6 4.9 5.9 4.9c.6 0 1.2-.1 1.8-.2l2 1.1-.5-1.8c1.4-.9 2.4-2.4 2.4-4 0-2.7-2.6-4.9-5.7-4.9Zm-2 2.9a.8.8 0 1 1 0 1.5.8.8 0 0 1 0-1.5Zm4 0a.8.8 0 1 1 0 1.5.8.8 0 0 1 0-1.5Z" />
    </svg>
  );
}

export function useCopy() {
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
