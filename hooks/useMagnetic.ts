"use client";
import { useRef, useState, useCallback } from "react";

const RADIUS = 80;

export function useMagnetic() {
  const ref = useRef<HTMLElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const onMouseMove = useCallback((e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < RADIUS) {
      const strength = (RADIUS - dist) / RADIUS;
      setOffset({ x: dx * strength * 0.4, y: dy * strength * 0.4 });
    }
  }, []);

  const onMouseLeave = useCallback(() => {
    setOffset({ x: 0, y: 0 });
  }, []);

  return { ref, offset, onMouseMove, onMouseLeave };
}
