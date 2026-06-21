"use client";
import { useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from "framer-motion";
import {
  Smartphone, Globe, Brain, Cloud, Link2, Gamepad2, Layers,
  TrendingUp, CheckCircle2, Sparkles, X,
} from "lucide-react";
import { EASE } from "@/lib/motion";

type Category = "all" | "mobile" | "web" | "ai" | "cloud" | "web3" | "game";

type TechItem = {
  label: string;
  color: string;
  ring: 0 | 1 | 2;
  angle: number;
  category: Exclude<Category, "all">;
  desc: string;
  years: number;
  projects: number;
  useCases: string[];
};

const CATEGORIES: { id: Category; label: string; icon: React.ElementType; color: string }[] = [
  { id: "all",    label: "All Tech", icon: Layers,     color: "#06B6D4" },
  { id: "mobile", label: "Mobile",   icon: Smartphone, color: "#EC4899" },
  { id: "web",    label: "Web",      icon: Globe,      color: "#06B6D4" },
  { id: "ai",     label: "AI / ML",  icon: Brain,      color: "#8B5CF6" },
  { id: "cloud",  label: "Cloud",    icon: Cloud,      color: "#10B981" },
  { id: "web3",   label: "Web3",     icon: Link2,      color: "#F59E0B" },
  { id: "game",   label: "Game",     icon: Gamepad2,   color: "#EF4444" },
];

const TECH: TechItem[] = [
  // Ring 0 — inner (5 items)
  { label: "Flutter",      color: "#54C5F8", ring: 0, angle: 0,   category: "mobile",
    desc: "Google's UI toolkit for native cross-platform apps from a single Dart codebase.",
    years: 5, projects: 28, useCases: ["Cross-platform", "MVP builds", "Real-time UI"] },
  { label: "React Native", color: "#61DAFB", ring: 0, angle: 72,  category: "mobile",
    desc: "Build native iOS & Android apps using React with one shared codebase.",
    years: 6, projects: 42, useCases: ["iOS & Android", "Code reuse", "Hot reload"] },
  { label: "Swift",        color: "#F05138", ring: 0, angle: 144, category: "mobile",
    desc: "Apple's powerful, type-safe language for first-class iOS and macOS apps.",
    years: 7, projects: 35, useCases: ["iOS native", "Performance", "ARKit"] },
  { label: "Kotlin",       color: "#7F52FF", ring: 0, angle: 216, category: "mobile",
    desc: "Modern, concise language for Android and JVM backend services.",
    years: 6, projects: 31, useCases: ["Android native", "Backend", "Coroutines"] },
  { label: "Node.js",      color: "#68A063", ring: 0, angle: 288, category: "web",
    desc: "Async JavaScript runtime for scalable backend services and APIs.",
    years: 8, projects: 65, useCases: ["APIs", "Microservices", "Real-time"] },

  // Ring 1 — middle (6 items)
  { label: "Python",       color: "#FFD343", ring: 1, angle: 30,  category: "ai",
    desc: "Versatile language ideal for ML, AI, and data-science workflows.",
    years: 8, projects: 60, useCases: ["ML/AI", "Data pipelines", "Automation"] },
  { label: "AWS",          color: "#FF9900", ring: 1, angle: 90,  category: "cloud",
    desc: "Industry-leading cloud platform with the broadest set of services.",
    years: 7, projects: 70, useCases: ["EC2 · Lambda", "S3 · RDS", "DevOps"] },
  { label: "Azure",        color: "#0078D4", ring: 1, angle: 150, category: "cloud",
    desc: "Microsoft's enterprise cloud with deep AD and Office integrations.",
    years: 5, projects: 38, useCases: ["Enterprise", "AD integration", "Hybrid"] },
  { label: "TensorFlow",   color: "#FF6F00", ring: 1, angle: 210, category: "ai",
    desc: "End-to-end open-source platform for deep learning at production scale.",
    years: 5, projects: 22, useCases: ["Neural nets", "Vision", "NLP"] },
  { label: "Blockchain",   color: "#F7931A", ring: 1, angle: 270, category: "web3",
    desc: "Decentralized ledger tech powering Web3 applications and DeFi.",
    years: 5, projects: 20, useCases: ["DeFi", "Tokens", "DAOs"] },
  { label: "Unity",        color: "#9CA3AF", ring: 1, angle: 330, category: "game",
    desc: "Cross-platform game engine for 2D, 3D, VR, and AR experiences.",
    years: 5, projects: 14, useCases: ["3D games", "VR/AR", "Simulations"] },

  // Ring 2 — outer (8 items)
  { label: "React",        color: "#61DAFB", ring: 2, angle: 22,  category: "web",
    desc: "The most popular library for building component-based, reactive UIs.",
    years: 8, projects: 75, useCases: ["SPAs", "Dashboards", "Component libs"] },
  { label: "Next.js",      color: "#E5E7EB", ring: 2, angle: 67,  category: "web",
    desc: "Full-stack React framework with SSR, SSG, and edge functions.",
    years: 5, projects: 52, useCases: ["E-commerce", "Marketing sites", "Edge APIs"] },
  { label: "GCP",          color: "#4285F4", ring: 2, angle: 112, category: "cloud",
    desc: "Google's cloud with best-in-class data, analytics, and ML services.",
    years: 5, projects: 32, useCases: ["BigQuery", "Firebase", "Vertex AI"] },
  { label: "Docker",       color: "#2496ED", ring: 2, angle: 157, category: "cloud",
    desc: "Container platform for consistent dev → prod deployments.",
    years: 7, projects: 80, useCases: ["Containers", "K8s", "CI/CD"] },
  { label: "TypeScript",   color: "#3178C6", ring: 2, angle: 202, category: "web",
    desc: "Typed superset of JavaScript that catches bugs at compile time.",
    years: 7, projects: 88, useCases: ["Type safety", "Refactoring", "Tooling"] },
  { label: "Solidity",     color: "#627EEA", ring: 2, angle: 247, category: "web3",
    desc: "The most-used language for writing Ethereum smart contracts.",
    years: 4, projects: 16, useCases: ["Smart contracts", "DeFi", "NFTs"] },
  { label: "Three.js",     color: "#DDDDDD", ring: 2, angle: 292, category: "web",
    desc: "WebGL 3D library for browser-based interactive experiences.",
    years: 4, projects: 18, useCases: ["3D viz", "WebGL", "Interactive art"] },
  { label: "Unreal",       color: "#4B93FF", ring: 2, angle: 337, category: "game",
    desc: "AAA-quality engine for photoreal 3D and cinematic experiences.",
    years: 4, projects: 8, useCases: ["AAA games", "Cinematic", "Arch viz"] },
];

const CX = 320;
const CY = 320;
const RADII: [number, number, number] = [130, 210, 290];

const RING_DOTS = [
  { r: RADII[0], duration: 14, color: "#06e5ff", idx: 0 as const, dashLen: 14, count: 2 },
  { r: RADII[1], duration: 20, color: "#8B5CF6", idx: 1 as const, dashLen: 20, count: 2 },
  { r: RADII[2], duration: 28, color: "#EC4899", idx: 2 as const, dashLen: 26, count: 3 },
];

function getPos(ring: 0 | 1 | 2, angleDeg: number) {
  const r = RADII[ring];
  const rad = (angleDeg - 90) * (Math.PI / 180);
  return { x: CX + r * Math.cos(rad), y: CY + r * Math.sin(rad) };
}

// ─── Tech badge ─────────────────────────────────────────────────────────────
function TechBadge({
  tech, isSelected, isHovered, isDimmed, onHover, onSelect,
}: {
  tech: TechItem;
  isSelected: boolean;
  isHovered: boolean;
  isDimmed: boolean;
  onHover: (label: string | null) => void;
  onSelect: (label: string) => void;
}) {
  const { x, y } = getPos(tech.ring, tech.angle);
  const active = isSelected || isHovered;

  return (
    <motion.button
      className={`absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer select-none ${active ? "z-20" : "z-10"}`}
      style={{ left: x, top: y }}
      animate={{
        scale: isSelected ? 1.28 : isHovered ? 1.18 : isDimmed ? 0.78 : 1,
        opacity: isDimmed && !active ? 0.18 : 1,
      }}
      transition={{ type: "spring", stiffness: 240, damping: 22 }}
      onMouseEnter={() => onHover(tech.label)}
      onMouseLeave={() => onHover(null)}
      onClick={() => onSelect(tech.label)}
      whileTap={{ scale: 0.94 }}
    >
      {/* Pulse ring when selected */}
      {isSelected && (
        <motion.div
          className="absolute inset-0 rounded-xl"
          style={{ border: `1.5px solid ${tech.color}` }}
          animate={{ scale: [1, 1.8, 1], opacity: [0.7, 0, 0.7] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
        />
      )}

      <div
        className="rounded-xl px-3 py-2 text-xs font-semibold tracking-wide whitespace-nowrap border relative"
        style={{
          color: tech.color,
          background: active
            ? `linear-gradient(135deg, ${tech.color}25, ${tech.color}0D)`
            : `${tech.color}0D`,
          borderColor: isSelected ? tech.color : active ? `${tech.color}60` : `${tech.color}22`,
          boxShadow: isSelected
            ? `0 0 30px 8px ${tech.color}35, inset 0 0 16px ${tech.color}20`
            : isHovered
            ? `0 0 22px 6px ${tech.color}28`
            : "none",
          transition: "background 0.2s, border-color 0.2s, box-shadow 0.25s",
        }}
      >
        {tech.label}
      </div>

      {/* Quick hover tooltip */}
      <AnimatePresence>
        {isHovered && !isSelected && (
          <motion.div
            className="absolute left-1/2 -translate-x-1/2 top-full mt-2 z-30 pointer-events-none"
            initial={{ opacity: 0, y: 4, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.9 }}
            transition={{ duration: 0.15 }}
          >
            <div
              className="rounded-lg px-2.5 py-1 text-[10px] text-white/70 whitespace-nowrap font-mono"
              style={{
                background: "rgba(4,7,18,0.95)",
                border: `1px solid ${tech.color}40`,
                boxShadow: "0 6px 18px rgba(0,0,0,0.5)",
              }}
            >
              Click to learn more
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
}

// ─── Center hub: default OR expanded detail ─────────────────────────────────
function CenterHub({
  selected, onClose, activeCategoryLabel, activeColor,
}: {
  selected: TechItem | null;
  onClose: () => void;
  activeCategoryLabel: string;
  activeColor: string;
}) {
  return (
    <motion.div
      className="absolute z-30"
      style={{ left: CX, top: CY }}
      animate={{
        x: selected ? -160 : -50,
        y: selected ? -120 : -50,
      }}
      transition={{ type: "spring", stiffness: 200, damping: 26 }}
    >
      <AnimatePresence mode="wait">
        {selected ? (
          /* ── Expanded detail card ── */
          <motion.div
            key="detail"
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="relative rounded-2xl overflow-hidden"
            style={{
              width: 320,
              minHeight: 240,
              background: `linear-gradient(135deg, ${selected.color}15 0%, rgba(5,8,20,0.95) 60%)`,
              border: `1.5px solid ${selected.color}55`,
              boxShadow: `0 30px 60px rgba(0,0,0,0.6), 0 0 50px ${selected.color}25, inset 0 1px 0 rgba(255,255,255,0.06)`,
              backdropFilter: "blur(20px)",
            }}
          >
            {/* Background glow */}
            <div
              className="absolute -top-16 -right-16 w-40 h-40 rounded-full pointer-events-none"
              style={{
                background: `radial-gradient(circle, ${selected.color}45, transparent 65%)`,
                filter: "blur(35px)",
              }}
            />

            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-3 right-3 w-7 h-7 rounded-full flex items-center justify-center bg-white/[0.06] hover:bg-white/[0.12] transition-colors z-10"
            >
              <X size={13} className="text-white/70" />
            </button>

            <div className="relative p-5">
              {/* Tech name + category */}
              <div className="mb-3">
                <div className="flex items-center gap-2 mb-1">
                  <motion.div
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ background: selected.color, boxShadow: `0 0 6px ${selected.color}` }}
                    animate={{ opacity: [1, 0.3, 1] }}
                    transition={{ duration: 1.8, repeat: Infinity }}
                  />
                  <span
                    className="text-[10px] font-mono uppercase tracking-widest"
                    style={{ color: selected.color }}
                  >
                    {selected.category} Stack
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-white tracking-tight leading-tight">
                  {selected.label}
                </h3>
              </div>

              {/* Description */}
              <p className="text-white/55 text-xs leading-relaxed mb-4">
                {selected.desc}
              </p>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-2 mb-4">
                <div
                  className="rounded-lg px-3 py-2"
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.06)",
                  }}
                >
                  <div className="flex items-center gap-1 mb-0.5">
                    <TrendingUp size={9} style={{ color: selected.color }} />
                    <span className="text-[8px] text-white/35 uppercase tracking-widest font-mono">
                      Years
                    </span>
                  </div>
                  <div className="text-lg font-bold font-mono" style={{ color: selected.color }}>
                    {selected.years}+
                  </div>
                </div>
                <div
                  className="rounded-lg px-3 py-2"
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.06)",
                  }}
                >
                  <div className="flex items-center gap-1 mb-0.5">
                    <CheckCircle2 size={9} style={{ color: selected.color }} />
                    <span className="text-[8px] text-white/35 uppercase tracking-widest font-mono">
                      Projects
                    </span>
                  </div>
                  <div className="text-lg font-bold font-mono" style={{ color: selected.color }}>
                    {selected.projects}
                  </div>
                </div>
              </div>

              {/* Use cases */}
              <div>
                <div className="flex items-center gap-1 mb-1.5">
                  <Sparkles size={9} style={{ color: selected.color }} />
                  <span className="text-[8px] text-white/40 uppercase tracking-widest font-mono">
                    Common use cases
                  </span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {selected.useCases.map((uc, i) => (
                    <motion.span
                      key={uc}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.06 + 0.15, duration: 0.25 }}
                      className="rounded-full px-2 py-0.5 text-[10px] font-medium"
                      style={{
                        background: `${selected.color}15`,
                        color: selected.color,
                        border: `1px solid ${selected.color}30`,
                      }}
                    >
                      {uc}
                    </motion.span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          /* ── Default APPVIX core ── */
          <motion.div
            key="default"
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            transition={{ duration: 0.3 }}
            className="relative"
          >
            {/* Pulse rings */}
            <motion.div
              className="absolute rounded-full"
              style={{ inset: -22, border: `1px solid ${activeColor}44` }}
              animate={{ scale: [1, 1.4, 1], opacity: [0.6, 0, 0.6] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeOut" }}
            />
            <motion.div
              className="absolute rounded-full"
              style={{ inset: -46, border: `1px solid ${activeColor}22` }}
              animate={{ scale: [1, 1.4, 1], opacity: [0.4, 0, 0.4] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeOut", delay: 1 }}
            />

            {/* Core */}
            <div
              className="w-[100px] h-[100px] rounded-full flex flex-col items-center justify-center"
              style={{
                background: `radial-gradient(circle, ${activeColor}1c 0%, ${activeColor}05 65%, transparent 100%)`,
                border: `1.5px solid ${activeColor}55`,
                boxShadow: `0 0 50px 12px ${activeColor}18, inset 0 0 24px ${activeColor}10`,
              }}
            >
              <span
                className="font-bold text-base font-mono tracking-wider"
                style={{ color: activeColor, textShadow: `0 0 12px ${activeColor}80` }}
              >
                APPVIX
              </span>
              <span className="text-[8px] text-white/35 mt-0.5 uppercase tracking-widest font-mono">
                {activeCategoryLabel}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ─── Main section ───────────────────────────────────────────────────────────
export default function TechStack() {
  const ref = useRef<HTMLElement>(null);
  const [activeCat, setActiveCat] = useState<Category>("all");
  const [hovered, setHovered] = useState<string | null>(null);
  const [selected, setSelected] = useState<string | null>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end 0.5"],
  });
  const smooth = useSpring(scrollYProgress, { stiffness: 80, damping: 25, mass: 0.5 });
  const fade  = useTransform(smooth, [0, 0.18], [0, 1]);
  const slide = useTransform(smooth, [0, 0.22], [40, 0]);
  const orbScale = useTransform(smooth, [0.05, 0.32], [0.85, 1]);

  const isCategoryActive = (tech: TechItem) =>
    activeCat === "all" || tech.category === activeCat;

  const filteredCount =
    activeCat === "all" ? TECH.length : TECH.filter(isCategoryActive).length;

  const selectedTech = TECH.find((t) => t.label === selected) ?? null;
  const hoveredTech  = TECH.find((t) => t.label === hovered) ?? null;
  const focusedTech  = selectedTech ?? hoveredTech;
  const focusedPos   = focusedTech ? getPos(focusedTech.ring, focusedTech.angle) : null;

  const activeCatObj   = CATEGORIES.find((c) => c.id === activeCat) ?? CATEGORIES[0];
  const activeCatColor = activeCatObj.color;
  const activeCatLabel = activeCatObj.label;

  // Deselect if active category filters out current selection
  if (selected && selectedTech && !isCategoryActive(selectedTech)) {
    setSelected(null);
  }

  const toggleSelect = (label: string) =>
    setSelected((prev) => (prev === label ? null : label));

  return (
    <section id="tech" ref={ref} className="relative py-section px-6 overflow-hidden">
      {/* Ambient bg orbs */}
      <div
        className="absolute top-1/4 left-0 w-96 h-96 rounded-full opacity-[0.07] pointer-events-none"
        style={{ background: "radial-gradient(circle, #06B6D4, transparent 70%)", filter: "blur(80px)" }}
      />
      <div
        className="absolute bottom-0 right-0 w-96 h-96 rounded-full opacity-[0.06] pointer-events-none"
        style={{ background: "radial-gradient(circle, #8B5CF6, transparent 70%)", filter: "blur(80px)" }}
      />

      <div className="max-w-7xl mx-auto relative">
        {/* ── Header ── */}
        <motion.div
          className="text-center mb-10"
          style={{ opacity: fade, y: slide, willChange: "transform, opacity" }}
        >
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-mono text-[#06B6D4] mb-5 bg-white/[0.04] border border-white/[0.08]">
            <motion.span
              className="w-1.5 h-1.5 rounded-full bg-[#06B6D4]"
              animate={{ scale: [1, 1.8, 1], opacity: [1, 0.3, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              style={{ boxShadow: "0 0 6px #06B6D4" }}
            />
            <span className="uppercase tracking-widest">Tech Stack</span>
          </div>
          <h2 className="text-display-lg font-bold text-white mb-4">
            Powered by{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: "linear-gradient(135deg, #06B6D4, #8B5CF6, #EC4899)" }}
            >
              cutting-edge tech
            </span>
          </h2>
          <p className="text-white/45 text-lg max-w-xl mx-auto">
            We choose the right tool for every job — click any technology to see how we use it.
          </p>
        </motion.div>

        {/* ── Category filter tabs ── */}
        <motion.div
          className="flex flex-wrap justify-center gap-2 mb-10"
          style={{ opacity: fade }}
        >
          {CATEGORIES.map((cat) => {
            const isActive = activeCat === cat.id;
            const count = cat.id === "all" ? TECH.length : TECH.filter((t) => t.category === cat.id).length;
            return (
              <motion.button
                key={cat.id}
                onClick={() => { setActiveCat(cat.id); }}
                whileTap={{ scale: 0.95 }}
                whileHover={{ y: -2 }}
                className="relative px-4 py-2 rounded-full text-xs font-semibold inline-flex items-center gap-2 transition-colors"
                style={{
                  color: isActive ? cat.color : "rgba(255,255,255,0.5)",
                  background: isActive ? `${cat.color}14` : "rgba(255,255,255,0.025)",
                  border: `1px solid ${isActive ? `${cat.color}50` : "rgba(255,255,255,0.06)"}`,
                  boxShadow: isActive ? `0 0 18px ${cat.color}25` : "none",
                }}
              >
                {isActive && (
                  <motion.span
                    layoutId="cat-pill-bg"
                    className="absolute inset-0 rounded-full"
                    style={{ background: `radial-gradient(ellipse, ${cat.color}12, transparent 70%)` }}
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
                <cat.icon size={13} className="relative" />
                <span className="relative">{cat.label}</span>
                <span
                  className="relative text-[9px] font-mono px-1.5 py-0.5 rounded-full"
                  style={{
                    background: isActive ? `${cat.color}20` : "rgba(255,255,255,0.05)",
                    color: isActive ? cat.color : "rgba(255,255,255,0.4)",
                  }}
                >
                  {count}
                </span>
              </motion.button>
            );
          })}
        </motion.div>

        {/* ── Orbital visualization ── */}
        <motion.div
          className="flex flex-col items-center gap-6"
          style={{ scale: orbScale, opacity: fade, willChange: "transform, opacity" }}
        >
          <div className="relative" style={{ width: CX * 2, height: CY * 2 }}>
            {/* SVG: rings, traveling dots, connection line */}
            <svg
              className="absolute inset-0 pointer-events-none"
              width={CX * 2}
              height={CY * 2}
              style={{ overflow: "visible" }}
            >
              <defs>
                <filter id="lineGlowF" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="3" result="b" />
                  <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
                </filter>
              </defs>

              {/* Static dashed orbit rings — slowly rotate */}
              {RADII.map((r, i) => (
                <motion.circle
                  key={`ring-${i}`}
                  cx={CX}
                  cy={CY}
                  r={r}
                  fill="none"
                  stroke={`${activeCatColor}14`}
                  strokeWidth="1"
                  strokeDasharray="3 9"
                  animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
                  transition={{ duration: 60 + i * 25, repeat: Infinity, ease: "linear" }}
                  style={{ transformOrigin: `${CX}px ${CY}px` }}
                />
              ))}

              {/* Multiple traveling glow dots per ring */}
              {RING_DOTS.map(({ r, duration, color, idx, dashLen, count }) => {
                const circ = 2 * Math.PI * r;
                const gap = (circ - dashLen * count) / count;
                return Array.from({ length: count }).map((_, k) => (
                  <circle
                    key={`dot-${idx}-${k}`}
                    cx={CX}
                    cy={CY}
                    r={r}
                    fill="none"
                    stroke={color}
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeDasharray={`${dashLen} ${(circ - dashLen).toFixed(1)}`}
                    strokeDashoffset={(-k * (dashLen + gap)).toFixed(1)}
                    style={{
                      animation: `orbit-dot-${idx} ${duration}s linear infinite`,
                      filter: `drop-shadow(0 0 4px ${color}) drop-shadow(0 0 9px ${color}80)`,
                    }}
                  />
                ));
              })}

              {/* Connection line from focused tech → center */}
              <AnimatePresence>
                {focusedTech && focusedPos && (
                  <motion.g key="connector">
                    <motion.line
                      x1={CX} y1={CY} x2={focusedPos.x} y2={focusedPos.y}
                      stroke={focusedTech.color}
                      strokeWidth="1.5"
                      strokeDasharray="6 4"
                      initial={{ opacity: 0 }}
                      animate={{
                        opacity: 0.7,
                        strokeDashoffset: [0, -40],
                      }}
                      exit={{ opacity: 0 }}
                      transition={{
                        opacity: { duration: 0.2 },
                        strokeDashoffset: { duration: 1.6, repeat: Infinity, ease: "linear" },
                      }}
                      filter="url(#lineGlowF)"
                    />
                  </motion.g>
                )}
              </AnimatePresence>

              {/* Flowing particle along connection (only when selected) */}
              {selectedTech && focusedPos && (
                <>
                  {[0, 0.33, 0.66].map((offset) => (
                    <motion.circle
                      key={offset}
                      r="3"
                      fill={selectedTech.color}
                      style={{ filter: `drop-shadow(0 0 6px ${selectedTech.color})` }}
                      animate={{
                        cx: [CX, focusedPos.x],
                        cy: [CY, focusedPos.y],
                        opacity: [0, 1, 0],
                      }}
                      transition={{
                        duration: 1.6,
                        delay: offset * 1.6,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    />
                  ))}
                </>
              )}
            </svg>

            {/* Center hub */}
            <CenterHub
              selected={selectedTech}
              onClose={() => setSelected(null)}
              activeCategoryLabel={activeCatLabel}
              activeColor={activeCatColor}
            />

            {/* Tech badges */}
            {TECH.map((tech) => (
              <TechBadge
                key={tech.label}
                tech={tech}
                isSelected={selected === tech.label}
                isHovered={hovered === tech.label && selected !== tech.label}
                isDimmed={!isCategoryActive(tech)}
                onHover={setHovered}
                onSelect={toggleSelect}
              />
            ))}
          </div>

          {/* Click hint when nothing selected */}
          <AnimatePresence>
            {!selectedTech && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                className="flex items-center gap-2 text-[11px] text-white/40 font-mono"
              >
                <motion.div
                  className="w-1 h-1 rounded-full bg-[#06B6D4]"
                  animate={{ scale: [1, 2, 1], opacity: [1, 0, 1] }}
                  transition={{ duration: 1.6, repeat: Infinity }}
                />
                Click any technology to see how we use it
              </motion.div>
            )}
          </AnimatePresence>

          {/* Stats bar */}
          <div className="flex items-center gap-6 text-xs font-mono mt-4">
            <span className="text-white/35">
              <motion.span
                key={filteredCount}
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className="font-semibold mr-1"
                style={{ color: activeCatColor }}
              >
                {filteredCount}
              </motion.span>
              technologies
            </span>
            <span className="w-px h-3 bg-white/[0.08]" />
            <span className="text-white/35">
              <span className="text-white/55 font-semibold mr-1">7</span>
              categories
            </span>
            <span className="w-px h-3 bg-white/[0.08]" />
            <span className="text-white/35">
              <span className="text-white/55 font-semibold mr-1">150+</span>
              deployments
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
