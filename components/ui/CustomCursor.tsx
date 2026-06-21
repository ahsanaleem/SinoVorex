"use client";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

export function CustomCursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  // dot: snappy — almost tracks cursor 1:1
  const springX = useSpring(x, { stiffness: 500, damping: 40, mass: 0.3 });
  const springY = useSpring(y, { stiffness: 500, damping: 40, mass: 0.3 });
  // ring: lags behind for the trailing feel
  const ringX = useSpring(x, { stiffness: 100, damping: 20, mass: 0.5 });
  const ringY = useSpring(y, { stiffness: 100, damping: 20, mass: 0.5 });
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    // skip on touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };

    const over = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      setHovering(!!target.closest("a, button, [data-cursor='hover']"));
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
    };
  }, [x, y]);

  return (
    <>
      {/* Dot — tight spring, mix-blend-difference */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-white pointer-events-none z-[9999] mix-blend-difference"
        style={{ x: springX, y: springY, translateX: "-50%", translateY: "-50%" }}
      />
      {/* Ring — slow spring, animates size on hover */}
      <motion.div
        className="fixed top-0 left-0 rounded-full border border-white/40 pointer-events-none z-[9998] mix-blend-difference"
        animate={{ width: hovering ? 60 : 32, height: hovering ? 60 : 32 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        style={{ x: ringX, y: ringY, translateX: "-50%", translateY: "-50%" }}
      />
    </>
  );
}

export default CustomCursor;
