"use client";
import { useEffect, useState } from "react";

export interface PerfTier {
  tier: "high" | "mid" | "low";
  isMobile: boolean;
  reducedMotion: boolean;
  particleCount: number;
  enableBlur: boolean;
  enable3D: boolean;
}

const DEFAULT: PerfTier = {
  tier: "high",
  isMobile: false,
  reducedMotion: false,
  particleCount: 50,
  enableBlur: true,
  enable3D: true,
};

export function usePerformance(): PerfTier {
  const [perf, setPerf] = useState<PerfTier>(DEFAULT);

  useEffect(() => {
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const cores = navigator.hardwareConcurrency || 4;
    // deviceMemory is not in standard TS lib; cast to any
    const memory = (navigator as { deviceMemory?: number }).deviceMemory ?? 4;

    let tier: "high" | "mid" | "low" = "high";
    if (isMobile || cores <= 4 || memory <= 4) tier = "mid";
    if (cores <= 2 || memory <= 2 || reducedMotion) tier = "low";

    setPerf({
      tier,
      isMobile,
      reducedMotion,
      particleCount: tier === "high" ? 50 : tier === "mid" ? 20 : 0,
      enableBlur: tier !== "low",
      enable3D: tier === "high" && !isMobile,
    });
  }, []);

  return perf;
}