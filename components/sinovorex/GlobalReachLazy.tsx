"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { CITY_DATA } from "./data";

const Explorer = dynamic(() => import("./GlobalReachMap").then((m) => m.GlobalReachExplorer), { ssr: false });

/** The interactive map loads only when it comes near the screen, so it costs nothing on first load. */
export function GlobalReachLazy() {
  const ref = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || !("IntersectionObserver" in window)) { setShow(true); return; }
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setShow(true); io.disconnect(); } }, { rootMargin: "600px 0px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    // Reserves the map's real height, so loading it never moves the sections below (or a #faq link target).
    <div ref={ref} className="min-h-[960px] md:min-h-[910px] lg:min-h-[780px]">
      {show ? <Explorer /> : (
        // Same information as plain text until the map loads (also what crawlers read).
        <p className="rounded-[24px] border border-white/10 bg-white/[0.03] p-6 text-[15px] leading-relaxed text-white/70">
          Markets we ship to from China: {CITY_DATA.map((c) => `${c.label} (${c.country})`).join(", ")}.
        </p>
      )}
    </div>
  );
}
