"use client";
import { useScroll, useTransform, MotionValue } from "framer-motion";
import { useRef } from "react";

export function useScrollProgress(): {
  ref: React.RefObject<HTMLElement>;
  progress: MotionValue<number>;
} {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref as React.RefObject<HTMLElement>,
    offset: ["start end", "end start"],
  });
  return { ref, progress: scrollYProgress };
}

export function usePageScrollProgress() {
  const { scrollYProgress } = useScroll();
  return scrollYProgress;
}
