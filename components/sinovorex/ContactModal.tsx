"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { EASE } from "./primitives";
import { getLenis } from "./islands";
import { track } from "./analytics";
import { QuoteForm } from "./QuoteForm";

export function ContactModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  useEffect(() => {
    if (!open) return;
    const lenis = getLenis();
    lenis?.stop();
    track("quote_form_open");
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => {
      lenis?.start();
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

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
            {/* Unmounted on close, so the form starts fresh each time it opens. */}
            <QuoteForm onClose={onClose} />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
