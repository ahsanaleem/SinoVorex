"use client";
import { useScroll, useTransform, useSpring, MotionValue } from "framer-motion";
import { RefObject } from "react";

export function useScrollReveal(ref: RefObject<HTMLElement>) {
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const smooth = useSpring(scrollYProgress, { stiffness: 100, damping: 30, mass: 0.5 });

  return {
    progress: smooth,
    opacity: useTransform(smooth, [0, 0.2, 0.8, 1], [0, 1, 1, 0]),
    y: useTransform(smooth, [0, 0.5, 1], [100, 0, -100]),
    scale: useTransform(smooth, [0, 0.3, 0.7, 1], [0.8, 1, 1, 0.9]),
    blur: useTransform(smooth, [0, 0.2, 0.8, 1], ["blur(20px)", "blur(0px)", "blur(0px)", "blur(20px)"]),
    rotateX: useTransform(smooth, [0, 0.5, 1], [15, 0, -15]),
  };
}

export function useParallax(scrollProgress: MotionValue<number>, distance = 100) {
  return useTransform(scrollProgress, [0, 1], [distance, -distance]);
}