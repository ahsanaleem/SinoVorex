"use client";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef, ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
  intensity?: "subtle" | "normal" | "strong";
  id?: string;
}

export function ScrollScene({ children, className = "", intensity = "normal", id }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const smooth = useSpring(scrollYProgress, { stiffness: 80, damping: 25, mass: 0.5 });
  const m = intensity === "subtle" ? 0.5 : intensity === "strong" ? 1.5 : 1;

  const y = useTransform(smooth, [0, 0.5, 1], [80 * m, 0, -80 * m]);
  const opacity = useTransform(smooth, [0, 0.15, 0.85, 1], [0, 1, 1, 0.3]);
  const scale = useTransform(smooth, [0, 0.2, 0.8, 1], [0.95, 1, 1, 0.97]);

  return (
    <motion.section
      ref={ref}
      id={id}
      style={{ y, opacity, scale, willChange: "transform, opacity" }}
      className={className}
    >
      {children}
    </motion.section>
  );
}

export default ScrollScene;