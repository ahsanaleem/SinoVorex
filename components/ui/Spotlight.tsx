"use client";
import { useRef, useCallback } from "react";
import { cn } from "@/lib/utils";

interface SpotlightProps {
  className?: string;
  size?: number;
  color?: string;
}

export default function Spotlight({
  className,
  size = 500,
  color = "rgba(6,229,255,0.06)",
}: SpotlightProps) {
  const divRef = useRef<HTMLDivElement>(null);

  const onMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const el = divRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      el.style.background = `radial-gradient(${size}px circle at ${x}px ${y}px, ${color}, transparent 80%)`;
    },
    [size, color]
  );

  const onMouseLeave = useCallback(() => {
    const el = divRef.current;
    if (el) el.style.background = "transparent";
  }, []);

  return (
    <div
      ref={divRef}
      className={cn("pointer-events-none absolute inset-0 rounded-inherit", className)}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{ pointerEvents: "none" }}
    />
  );
}

export function SpotlightSection({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const divRef = useRef<HTMLDivElement>(null);

  const onMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = divRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--spotlight-x", `${e.clientX - rect.left}px`);
    el.style.setProperty("--spotlight-y", `${e.clientY - rect.top}px`);
  }, []);

  return (
    <div
      ref={divRef}
      className={cn("relative", className)}
      onMouseMove={onMouseMove}
      style={
        {
          "--spotlight-x": "50%",
          "--spotlight-y": "50%",
        } as React.CSSProperties
      }
    >
      {children}
    </div>
  );
}
