"use client";
import { motion, useMotionValue, useSpring, useTransform, MotionValue } from "framer-motion";
import { useRef, ReactNode, MouseEvent } from "react";
import { cn } from "@/lib/utils";

interface Props {
  children: ReactNode;
  className?: string;
  tilt?: boolean;
  spotlight?: boolean;
  glow?: boolean;
  onClick?: () => void;
}

export function GlassCard({ children, className = "", tilt = true, spotlight = true, glow = false, onClick }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const rotX = useSpring(useTransform(mouseY, [0, 1], [8, -8]), { stiffness: 150, damping: 20 });
  const rotY = useSpring(useTransform(mouseX, [0, 1], [-8, 8]), { stiffness: 150, damping: 20 });

  const spotX = useTransform(mouseX, (v) => `${v * 100}%`);
  const spotY = useTransform(mouseY, (v) => `${v * 100}%`);

  // hoisted out of JSX to satisfy Rules of Hooks
  const spotBackground = useTransform(
    [spotX, spotY] as MotionValue<string>[],
    ([x, y]: string[]) =>
      `radial-gradient(400px circle at ${x} ${y}, rgba(9,146,194,0.15), transparent 60%)`
  );

  const handleMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    mouseX.set((e.clientX - left) / width);
    mouseY.set((e.clientY - top) / height);
  };

  const handleLeave = () => {
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      onClick={onClick}
      style={tilt ? { rotateX: rotX, rotateY: rotY, transformStyle: "preserve-3d" } : {}}
      className={cn(
        "relative rounded-2xl bg-white/[0.03] border border-white/[0.08] overflow-hidden group",
        glow && "shadow-[0_0_30px_6px_rgba(9,146,194,0.15)]",
        className
      )}
    >
      {/* Animated conic gradient border on hover */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
        <div className="absolute inset-[-1px] rounded-2xl bg-[conic-gradient(from_0deg,transparent,#0992C2,#38BDF8,#143E82,transparent)] animate-[spin_4s_linear_infinite] opacity-60" />
        <div className="absolute inset-[1px] rounded-2xl bg-[#0A1124]" />
      </div>

      {/* Cursor spotlight */}
      {spotlight && (
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{ background: spotBackground }}
        />
      )}

      {/* Content lifted in Z for depth */}
      <div className="relative z-10" style={{ transform: "translateZ(40px)" }}>
        {children}
      </div>
    </motion.div>
  );
}

export default GlassCard;
