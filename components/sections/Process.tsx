"use client";
import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  useSpring,
} from "framer-motion";
import {
  Search, Map, Palette, Code2, ShieldCheck, Rocket, TrendingUp,
} from "lucide-react";

// ─── Data ──────────────────────────────────────────────────────────────────
const STEPS = [
  {
    title: "Discovery",
    desc: "We dive deep into your vision, audience, and market so we're building exactly the right thing before writing a single line of code.",
    icon: Search,
    color: "#0EA5E9",
    features: ["User Research", "Market Analysis", "Stakeholder Interviews", "Goal Mapping"],
  },
  {
    title: "Strategy",
    desc: "We architect a crystal-clear roadmap — tech stack, system design, and sprint planning that keeps delivery fast and predictable.",
    icon: Map,
    color: "#0EA5E9",
    features: ["System Architecture", "Tech Stack Selection", "Sprint Planning", "Risk Assessment"],
  },
  {
    title: "UI/UX Design",
    desc: "From wireframes to polished design systems, every pixel is intentional and every micro-interaction earns its place.",
    icon: Palette,
    color: "#0EA5E9",
    features: ["Wireframing", "Interactive Prototypes", "Design Systems", "Usability Testing"],
  },
  {
    title: "Development",
    desc: "Our engineers write clean, well-tested code with CI/CD pipelines and rigorous code reviews baked into every sprint.",
    icon: Code2,
    color: "#0EA5E9",
    features: ["Clean Architecture", "CI/CD Pipelines", "Code Reviews", "API Development"],
  },
  {
    title: "QA & Testing",
    desc: "Rigorous testing across devices, browsers, and edge cases ensures your users never encounter a bug in production.",
    icon: ShieldCheck,
    color: "#0EA5E9",
    features: ["Automated Testing", "Performance Audits", "Security Reviews", "Cross-platform QA"],
  },
  {
    title: "Launch",
    desc: "Zero-downtime deployments, monitoring, and a thorough launch checklist that makes go-live feel effortless.",
    icon: Rocket,
    color: "#0EA5E9",
    features: ["Zero-downtime Deploy", "Monitoring & Alerts", "Launch Checklist", "Stakeholder Demo"],
  },
  {
    title: "Scale & Grow",
    desc: "Post-launch we analyze data, iterate rapidly on features, and scale infrastructure as your user base takes off.",
    icon: TrendingUp,
    color: "#0EA5E9",
    features: ["Growth Analytics", "Feature Iteration", "Infra Scaling", "Performance Tuning"],
  },
];

// ─── Individual Step ───────────────────────────────────────────────────────
function StepCard({ step, index }: { step: (typeof STEPS)[number]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, amount: 0.25 });
  const isLeft = index % 2 === 0;

  // clip-path: wipe FROM the dot side → outward
  // Left card: dot is on the RIGHT → reveal inset from left decreases (99%→0%)
  // Right card: dot is on the LEFT  → reveal inset from right decreases (99%→0%)
  const clipHidden = isLeft ? "inset(0% 0% 0% 99%)" : "inset(0% 99% 0% 0%)";
  const clipVisible = "inset(0% 0% 0% 0%)";

  return (
    <div ref={cardRef} className="relative flex items-start mb-16 md:mb-20">

      {/* ── Timeline dot ── */}
      <div className="absolute left-4 md:left-1/2 -translate-x-1/2 top-8 z-20 flex items-center justify-center">

        {/* Continuous outer pulse */}
        <motion.div
          className="absolute rounded-full"
          style={{ background: step.color }}
          animate={isInView
            ? { width: [20, 54, 20], height: [20, 54, 20], opacity: [0.45, 0, 0.45] }
            : { width: 20, height: 20, opacity: 0 }}
          transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut", delay: index * 0.18 }}
        />
        <motion.div
          className="absolute rounded-full"
          style={{ background: step.color }}
          animate={isInView
            ? { width: [20, 34, 20], height: [20, 34, 20], opacity: [0.6, 0, 0.6] }
            : { width: 20, height: 20, opacity: 0 }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut", delay: index * 0.18 + 0.5 }}
        />

        {/* One-shot shockwave rings on entry */}
        <motion.div
          className="absolute rounded-full pointer-events-none"
          style={{ border: `2.5px solid ${step.color}`, background: "transparent" }}
          initial={{ width: 6, height: 6, opacity: 0 }}
          animate={isInView ? { width: [6, 120], height: [6, 120], opacity: [1, 0] } : {}}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
        />
        <motion.div
          className="absolute rounded-full pointer-events-none"
          style={{ border: `1.5px solid ${step.color}80`, background: "transparent" }}
          initial={{ width: 6, height: 6, opacity: 0 }}
          animate={isInView ? { width: [6, 80], height: [6, 80], opacity: [0.7, 0] } : {}}
          transition={{ duration: 0.75, delay: 0.35, ease: "easeOut" }}
        />

        {/* 8-particle radial burst */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full pointer-events-none"
            style={{
              width: 3.5, height: 3.5, background: step.color,
              boxShadow: `0 0 8px ${step.color}`,
            }}
            initial={{ x: 0, y: 0, opacity: 0 }}
            animate={isInView ? {
              x: Math.cos((angle * Math.PI) / 180) * 44,
              y: Math.sin((angle * Math.PI) / 180) * 44,
              opacity: [0, 1, 0],
              scale: [0.4, 1.6, 0],
            } : {}}
            transition={{ duration: 0.85, delay: 0.25 + i * 0.03, ease: "easeOut" }}
          />
        ))}

        {/* Dot core — glowing */}
        <motion.div
          className="relative w-[22px] h-[22px] rounded-full border-[2.5px] border-[#050814] z-10 flex items-center justify-center"
          style={{
            background: `radial-gradient(circle at 35% 35%, #fff8, ${step.color})`,
            boxShadow: `0 0 18px ${step.color}ee, 0 0 36px ${step.color}66, 0 0 60px ${step.color}22`,
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
          transition={{ type: "spring", stiffness: 280, damping: 18, delay: 0.05 }}
        >
          <div className="w-1.5 h-1.5 rounded-full bg-white/90" />
        </motion.div>
      </div>

      {/* ── Connector: grows from dot → card, with recurring energy bead ── */}
      <div className={`absolute top-[2.15rem] hidden md:block h-[2px] z-10 ${
        isLeft ? "right-[calc(50%+11px)] w-[12%]" : "left-[calc(50%+11px)] w-[12%]"
      }`}>
        {/* Line — expands from dot outward */}
        <motion.div
          className="h-full rounded-full"
          style={{
            transformOrigin: isLeft ? "right" : "left",
            background: `linear-gradient(${isLeft ? "to left" : "to right"}, ${step.color}ff, ${step.color}cc, ${step.color}40)`,
            boxShadow: `0 0 14px ${step.color}99, 0 0 4px ${step.color}cc`,
          }}
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ delay: 0.18, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        />

        {/* One-shot launcher bead (dot → card, triggers card reveal) */}
        <motion.div
          className="absolute top-1/2 -translate-y-1/2 rounded-full pointer-events-none"
          style={{
            width: 10, height: 10,
            background: step.color,
            boxShadow: `0 0 16px ${step.color}, 0 0 28px ${step.color}99`,
          }}
          initial={isLeft ? { right: "0%", opacity: 0 } : { left: "0%", opacity: 0 }}
          animate={isInView
            ? (isLeft
                ? { right: ["0%", "100%"], opacity: [0, 1, 1, 0] }
                : { left:  ["0%", "100%"], opacity: [0, 1, 1, 0] })
            : { opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease: "easeIn",
            opacity: { times: [0, 0.1, 0.8, 1] } }}
        />

        {/* Recurring small bead — keeps showing the live connection */}
        <motion.div
          className="absolute top-1/2 -translate-y-1/2 rounded-full pointer-events-none"
          style={{
            width: 5, height: 5,
            background: step.color,
            boxShadow: `0 0 8px ${step.color}`,
          }}
          initial={isLeft ? { right: "0%", opacity: 0 } : { left: "0%", opacity: 0 }}
          animate={isInView
            ? (isLeft
                ? { right: ["0%", "100%"], opacity: [0, 0.9, 0] }
                : { left:  ["0%", "100%"], opacity: [0, 0.9, 0] })
            : { opacity: 0 }}
          transition={{ duration: 1.6, delay: 1.4, repeat: Infinity, repeatDelay: 2.8, ease: "linear" }}
        />
      </div>

      {/* ── Card: clip-path wipe from dot side → outward (no distortion) ── */}
      <div
        className={`pl-14 md:pl-0 ${
          isLeft ? "md:w-[46%] md:mr-auto md:pr-14" : "md:w-[46%] md:ml-auto md:pl-14"
        }`}
      >
        <motion.div
          className="group relative rounded-2xl border border-white/[0.08] p-6 overflow-hidden cursor-default"
          style={{ background: `linear-gradient(135deg, ${step.color}0e 0%, #050f1c 100%)` }}
          initial={{ clipPath: clipHidden, opacity: 0 }}
          animate={isInView
            ? { clipPath: clipVisible, opacity: 1 }
            : { clipPath: clipHidden, opacity: 0 }}
          transition={{ delay: 0.62, duration: 0.9, ease: [0.22, 1, 0.36, 1],
            opacity: { duration: 0.15, delay: 0.62 } }}
          whileHover={{ y: -5, transition: { type: "spring", stiffness: 300, damping: 22 } }}
        >
          {/* Hover glow border */}
          <motion.div
            className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-500"
            style={{ boxShadow: `inset 0 0 0 1px ${step.color}50, 0 0 50px ${step.color}15` }}
          />

          {/* Step number watermark */}
          <div
            className="absolute right-3 top-1 text-[88px] font-black leading-none select-none pointer-events-none"
            style={{ color: step.color, opacity: 0.04 }}
          >
            {String(index + 1).padStart(2, "0")}
          </div>

          {/* Top row: icon + step label */}
          <div className="flex items-start justify-between mb-4">
            <motion.div
              className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: `${step.color}18` }}
              whileHover={{ scale: 1.12, rotate: 6, background: `${step.color}28` }}
              transition={{ type: "spring", stiffness: 260, damping: 18 }}
            >
              <step.icon size={20} style={{ color: step.color }} />
            </motion.div>

            <div className={`text-right ${isLeft ? "" : "text-left order-first"}`}>
              <span
                className="text-[9px] font-mono uppercase tracking-[0.28em] block"
                style={{ color: step.color }}
              >
                Step {String(index + 1).padStart(2, "0")}
              </span>
            </div>
          </div>

          {/* Title */}
          <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight mb-2 leading-tight">
            {step.title}
          </h3>

          {/* Description */}
          <p className="text-white/45 text-sm leading-relaxed mb-5">{step.desc}</p>

          {/* Divider */}
          <div
            className="h-px mb-4"
            style={{ background: `linear-gradient(to right, ${step.color}40, transparent)` }}
          />

          {/* Feature pills */}
          <div className="flex flex-wrap gap-1.5">
            {step.features.map((f, fi) => (
              <motion.span
                key={f}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                transition={{ delay: 0.3 + fi * 0.07, type: "spring", stiffness: 200 }}
                className="text-[10px] font-medium px-2.5 py-1 rounded-full"
                style={{
                  background: `${step.color}14`,
                  color: step.color,
                  border: `1px solid ${step.color}35`,
                }}
              >
                {f}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

// ─── Section ───────────────────────────────────────────────────────────────
export function Process() {
  const sectionRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 80%", "end 20%"],
  });
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 60, damping: 22 });
  const lineHeight = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);

  return (
    <section
      ref={sectionRef}
      id="process"
      className="relative py-32 md:py-40 px-6 md:px-12 bg-[#050814] overflow-hidden"
    >
      {/* ── Ambient background orbs ── */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute -left-40 top-1/4 w-[500px] h-[500px] rounded-full blur-[120px] opacity-[0.06]"
          style={{ background: "#0EA5E9" }}
        />
        <div
          className="absolute -right-40 top-2/3 w-[500px] h-[500px] rounded-full blur-[120px] opacity-[0.05]"
          style={{ background: "#8B5CF6" }}
        />
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full blur-[100px] opacity-[0.04]"
          style={{ background: "#EC4899" }}
        />
      </div>

      <div className="max-w-5xl mx-auto relative">

        {/* ── Header ── */}
        <motion.div
          className="text-center mb-24 md:mb-32"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.25em] text-[#0EA5E9] mb-5">
            <motion.span
              className="w-1.5 h-1.5 rounded-full bg-[#0EA5E9]"
              animate={{ scale: [1, 1.6, 1], opacity: [1, 0.4, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            Our Process
          </div>

          <h2 className="text-5xl md:text-7xl font-bold tracking-tight text-white leading-none mb-5">
            How we{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: "linear-gradient(135deg, #0EA5E9 0%, #8B5CF6 50%, #EC4899 100%)" }}
            >
              build
            </span>
          </h2>
          <p className="text-white/40 text-lg max-w-xl mx-auto">
            A proven 7-step framework that turns your idea into a shipped, scalable product.
          </p>

          {/* Step count pills */}
          <div className="flex items-center justify-center gap-2 mt-8">
            {STEPS.map((s, i) => (
              <motion.div
                key={s.title}
                className="w-6 h-1.5 rounded-full"
                style={{ background: s.color }}
                initial={{ opacity: 0, scaleX: 0 }}
                whileInView={{ opacity: 0.5, scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06, duration: 0.4 }}
              />
            ))}
          </div>
        </motion.div>

        {/* ── Timeline + Steps ── */}
        <div ref={timelineRef} className="relative">

          {/* Static faint background line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px -translate-x-1/2 bg-white/[0.06]" />

          {/* Scroll-linked glowing fill line */}
          <motion.div
            className="absolute left-4 md:left-1/2 top-0 w-px -translate-x-1/2 origin-top overflow-hidden"
            style={{ height: lineHeight }}
          >
            <div
              className="w-full h-full"
              style={{
                background: "linear-gradient(to bottom, #0EA5E9, #8B5CF6, #EC4899, #10B981, #F59E0B, #06B6D4, #0EA5E9)",
                boxShadow: "0 0 18px rgba(14,165,233,0.6)",
              }}
            />
          </motion.div>

          {/* Steps */}
          {STEPS.map((step, i) => (
            <StepCard key={step.title} step={step} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Process;
