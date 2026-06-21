"use client";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useRef, ReactNode, MouseEvent } from "react";
import { SPRING_MAGNETIC } from "@/lib/motion";
import { cn } from "@/lib/utils";

interface Props {
  children: ReactNode;
  strength?: number;
  className?: string;
  onClick?: () => void;
  href?: string;
  variant?: "primary" | "ghost" | "outline";
  disabled?: boolean;
}

export function MagneticButton({
  children,
  strength = 0.35,
  className = "",
  onClick,
  href,
  variant = "primary",
  disabled,
}: Props) {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const xSpring = useSpring(x, SPRING_MAGNETIC);
  const ySpring = useSpring(y, SPRING_MAGNETIC);

  const handleMove = (e: MouseEvent<HTMLButtonElement>) => {
    if (!ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    x.set((e.clientX - (left + width / 2)) * strength);
    y.set((e.clientY - (top + height / 2)) * strength);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  const variantClass =
    variant === "primary"
      ? "bg-gradient-to-r from-[#0992C2] to-[#143E82] text-white shadow-[0_0_30px_rgba(9,146,194,0.4)] hover:shadow-[0_0_60px_rgba(9,146,194,0.7)]"
      : variant === "ghost"
      ? "bg-white/[0.03] border border-white/10 text-white hover:bg-white/[0.06]"
      : "bg-white/[0.03] border border-white/10 text-white/70 hover:text-white hover:border-white/20";

  const btn = (
    <motion.button
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      onClick={onClick}
      style={{ x: xSpring, y: ySpring }}
      whileTap={{ scale: 0.96 }}
      disabled={disabled}
      className={cn(
        "relative px-8 py-4 rounded-full font-medium tracking-tight transition-shadow duration-500 overflow-hidden group",
        variantClass,
        disabled && "opacity-50 pointer-events-none",
        className
      )}
    >
      {/* shimmer sweep */}
      <span
        className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform ease-out bg-gradient-to-r from-transparent via-white/20 to-transparent"
        style={{ transitionDuration: "1200ms" }}
      />
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </motion.button>
  );

  if (href) {
    return (
      <a href={href} className="inline-block">
        {btn}
      </a>
    );
  }

  return btn;
}

export default MagneticButton;
