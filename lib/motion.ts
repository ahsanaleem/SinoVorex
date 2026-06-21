import { Variants, Transition } from "framer-motion";

// ── Easing curves ─────────────────────────────────────────────────
export const EASE = [0.22, 1, 0.36, 1] as const;
export const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;
export const EASE_IN_OUT = [0.65, 0, 0.35, 1] as const;

// ── Spring presets ────────────────────────────────────────────────
export const SPRING_SOFT: Transition = { type: "spring", stiffness: 100, damping: 20, mass: 0.8 };
export const SPRING_SNAPPY: Transition = { type: "spring", stiffness: 300, damping: 30, mass: 0.5 };
export const SPRING_MAGNETIC: Transition = { type: "spring", stiffness: 150, damping: 15, mass: 0.5 };

// ── Container variants (parent of staggered children) ─────────────
export const staggerContainer = (stagger = 0.08, delayChildren = 0.1): Variants => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: stagger, delayChildren },
  },
});

// ── Fade up (the workhorse) ───────────────────────────────────────
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.9, ease: EASE },
  },
};

// ── Word-by-word reveal (for headlines) ───────────────────────────
export const wordReveal: Variants = {
  hidden: { opacity: 0, y: 60, filter: "blur(20px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 1.1, ease: EASE_OUT_EXPO },
  },
};

// ── Scale in (for cards / mockups) ────────────────────────────────
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.92, y: 30 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 1, ease: EASE },
  },
};

// ── Slide from side (for split layouts) ───────────────────────────
export const slideFromLeft: Variants = {
  hidden: { opacity: 0, x: -60, filter: "blur(8px)" },
  visible: { opacity: 1, x: 0, filter: "blur(0px)", transition: { duration: 0.9, ease: EASE } },
};
export const slideFromRight: Variants = {
  hidden: { opacity: 0, x: 60, filter: "blur(8px)" },
  visible: { opacity: 1, x: 0, filter: "blur(0px)", transition: { duration: 0.9, ease: EASE } },
};

// ── Floating idle animation (for cards that should feel alive) ────
export const floatIdle = {
  y: [0, -12, 0],
  transition: { duration: 6, repeat: Infinity, ease: "easeInOut" as const },
};

// ── Glow pulse (CTAs) ─────────────────────────────────────────────
export const glowPulse = {
  boxShadow: [
    "0 0 20px rgba(9, 146, 194, 0.3)",
    "0 0 40px rgba(9, 146, 194, 0.6)",
    "0 0 20px rgba(9, 146, 194, 0.3)",
  ],
  transition: { duration: 2.5, repeat: Infinity, ease: "easeInOut" as const },
};

// ── Slide down (navbar entrance) ─────────────────────────────────
export const slideDown: Variants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASE },
  },
};

// ── Backward-compat aliases (used by existing components) ─────────
export const EASE_APPLE = EASE;
export const EASE_SPRING = { stiffness: 150, damping: 15, mass: 0.5 };
export const EASE_SPRING_SOFT = { stiffness: 100, damping: 20, mass: 0.8 };

export const fadeUpVariants = fadeUp;
export const wordRevealVariants = wordReveal;
export const scaleInVariants = scaleIn;
export const slideDownVariants = slideDown;
export const slideRightVariants = slideFromLeft;
export const tiltSpring = SPRING_MAGNETIC;

export const staggerContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};
export const staggerContainerFastVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

export const fadeInVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6, ease: EASE } },
};

export const cardHoverVariants = {
  rest: { scale: 1, y: 0 },
  hover: { scale: 1.02, y: -4, transition: { type: "spring", ...EASE_SPRING } },
};
