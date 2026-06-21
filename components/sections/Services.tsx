"use client";
import { useRef, useState, useCallback } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useInView,
  AnimatePresence,
} from "framer-motion";
import {
  Smartphone, Brain, Cloud, Palette, Link2,
  Server, Gamepad2, TrendingUp, ArrowRight,
} from "lucide-react";

const C = "#06B6D4"; // single brand cyan for all cards

const SERVICES = [
  {
    icon: Smartphone,
    title: "Mobile Apps",
    desc: "Native iOS & Android and cross-platform apps that users love.",
    expandedDesc: "We craft high-performance mobile apps that users love — from polished MVPs to enterprise-scale products shipped seamlessly on iOS and Android.",
    color: C,
    features: ["iOS & Android Native", "React Native / Flutter", "App Store Launch", "Push & Offline Support"],
  },
  {
    icon: Brain,
    title: "AI Solutions",
    desc: "Intelligent systems, ML pipelines, and LLM-powered products.",
    expandedDesc: "From LLM-powered chatbots to computer vision pipelines, we build AI that solves real business problems at production scale.",
    color: C,
    features: ["LLM Integration", "ML Pipelines", "Computer Vision", "NLP & Chatbots"],
  },
  {
    icon: Cloud,
    title: "SaaS Platforms",
    desc: "Scalable multi-tenant SaaS from MVP to enterprise grade.",
    expandedDesc: "We architect multi-tenant SaaS platforms designed for rapid growth — with billing, SSO, and the infrastructure to handle scale.",
    color: C,
    features: ["Multi-tenant Architecture", "Subscription Billing", "API-first Design", "Enterprise SSO"],
  },
  {
    icon: Palette,
    title: "UI/UX Design",
    desc: "Research-driven interfaces with pixel-perfect execution.",
    expandedDesc: "Beautiful, research-backed interfaces built to convert and delight — from wireframes to production-ready design systems.",
    color: C,
    features: ["User Research", "Interaction Design", "Design Systems", "Rapid Prototyping"],
  },
  {
    icon: Link2,
    title: "Blockchain",
    desc: "Smart contracts, DeFi protocols, and Web3 dApps.",
    expandedDesc: "Secure, audited smart contracts and decentralized applications built for the next generation of the internet.",
    color: C,
    features: ["Smart Contracts", "DeFi Protocols", "NFT Platforms", "Web3 dApps"],
  },
  {
    icon: Server,
    title: "Cloud Engineering",
    desc: "AWS, Azure, GCP infrastructure built for scale.",
    expandedDesc: "Battle-tested cloud infrastructure that scales from day one — with CI/CD, observability, and 99.99% uptime baked in.",
    color: C,
    features: ["AWS / Azure / GCP", "Kubernetes & Docker", "CI/CD Pipelines", "99.99% Uptime SLA"],
  },
  {
    icon: Gamepad2,
    title: "Game Dev",
    desc: "Unity & Unreal Engine games with stunning visuals.",
    expandedDesc: "From casual mobile games to immersive 3D worlds — we build games with stunning visuals and addictive gameplay loops.",
    color: C,
    features: ["Unity & Unreal", "Mobile Gaming", "Multiplayer Systems", "Game Economy Design"],
  },
  {
    icon: TrendingUp,
    title: "Digital Transformation",
    desc: "End-to-end modernization of legacy systems and processes.",
    expandedDesc: "We help enterprises modernize from the inside out — replacing legacy systems with scalable, cloud-native architectures.",
    color: C,
    features: ["Legacy Modernization", "Process Automation", "Cloud Migration", "Change Management"],
  },
];

// ─── ServiceCard ──────────────────────────────────────────────────────────────
function ServiceCard({
  service,
  index,
  isHovered,
  isAnyHovered,
  onHover,
  onLeave,
}: {
  service: (typeof SERVICES)[number];
  index: number;
  isHovered: boolean;
  isAnyHovered: boolean;
  onHover: (i: number) => void;
  onLeave: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [spotPos, setSpotPos] = useState({ x: 50, y: 50 });
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  const onMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    setSpotPos({
      x: ((e.clientX - r.left) / r.width) * 100,
      y: ((e.clientY - r.top) / r.height) * 100,
    });
  }, []);

  return (
    <motion.div
      layout
      ref={ref}
      /* entrance + dimming via a single animate prop */
      animate={
        isInView
          ? {
              opacity: isAnyHovered && !isHovered ? 0.35 : 1,
              y: 0,
              scale: isHovered ? 1.18 : isAnyHovered ? 0.95 : 1,
            }
          : { opacity: 0, y: 52, scale: 1 }
      }
      transition={{
        layout: { type: "spring", stiffness: 230, damping: 30 },
        opacity: {
          duration: isAnyHovered ? 0.2 : 0.55,
          delay: isInView && !isAnyHovered ? index * 0.055 : 0,
        },
        y:     { duration: 0.55, delay: isInView ? index * 0.055 : 0 },
        scale: { type: "spring", stiffness: 220, damping: 22 },
      }}
      onMouseMove={onMouseMove}
      onMouseEnter={() => onHover(index)}
      onMouseLeave={onLeave}
      className="relative cursor-pointer rounded-2xl"
      style={{ zIndex: isHovered ? 50 : 1, willChange: "transform, opacity", transformOrigin: "center center" }}
    >
      {/* ── Animated conic-gradient border ── */}
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.4 }}
        style={{
          background: `conic-gradient(from 180deg at 50% 50%, ${service.color}, #3b82f6, #8b5cf6, #ec4899, ${service.color})`,
          padding: "1.5px",
          borderRadius: "1rem",
        }}
      />

      {/* ── Card body ── */}
      <motion.div
        className="relative h-full rounded-2xl border border-white/[0.08] overflow-hidden flex flex-col min-h-full"
        animate={{
          background: isHovered
            ? `linear-gradient(145deg, ${service.color}14 0%, #07090f 55%)`
            : "rgba(255,255,255,0.025)",
          boxShadow: isHovered
            ? `0 0 80px ${service.color}28, 0 0 28px ${service.color}12, inset 0 1px 0 rgba(255,255,255,0.06)`
            : "none",
        }}
        transition={{ duration: 0.45, ease: "easeOut" }}
      >
        {/* Cursor spotlight */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              key="spot"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="pointer-events-none absolute inset-0 rounded-2xl"
              style={{
                background: `radial-gradient(520px circle at ${spotPos.x}% ${spotPos.y}%, ${service.color}1a, transparent 60%)`,
              }}
            />
          )}
        </AnimatePresence>

        {/* ── Content ── */}
        <div className="relative z-10 p-6 flex flex-col flex-1">
          {/* Icon */}
          <motion.div
            animate={
              isHovered
                ? { width: 68, height: 68, background: `${service.color}25` }
                : { width: 48, height: 48, background: `${service.color}18` }
            }
            transition={{ type: "spring", stiffness: 210, damping: 22 }}
            className="rounded-2xl flex items-center justify-center mb-4 flex-shrink-0"
          >
            <motion.div
              animate={isHovered ? { scale: 1.18, rotate: 8 } : { scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 220, damping: 16 }}
            >
              <service.icon
                size={isHovered ? 30 : 22}
                style={{ color: service.color, transition: "all 0.3s ease" }}
              />
            </motion.div>
          </motion.div>

          {/* Title */}
          <motion.h3
            animate={isHovered ? { fontSize: "1.35rem" } : { fontSize: "1rem" }}
            transition={{ type: "spring", stiffness: 210, damping: 22 }}
            className="font-bold text-foreground tracking-tight mb-2"
          >
            {service.title}
          </motion.h3>

          {/* Description */}
          <p className="text-foreground/50 leading-relaxed text-sm">
            {isHovered ? service.expandedDesc : service.desc}
          </p>

          {/* ── Expanded content (only when card is large) ── */}
          <AnimatePresence>
            {isHovered && (
              <motion.div
                key="expanded"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ delay: 0.14, duration: 0.38 }}
                className="mt-auto pt-5 space-y-4"
              >
                {/* Features grid */}
                <div className="grid grid-cols-2 gap-x-4 gap-y-2.5">
                  {service.features.map((feat, fi) => (
                    <motion.div
                      key={feat}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.22 + fi * 0.065, duration: 0.3 }}
                      className="flex items-center gap-2"
                    >
                      <span
                        className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                        style={{
                          background: service.color,
                          boxShadow: `0 0 7px ${service.color}cc`,
                        }}
                      />
                      <span className="text-xs text-foreground/62 truncate">{feat}</span>
                    </motion.div>
                  ))}
                </div>

                {/* Divider */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.48, duration: 0.42, ease: "easeOut" }}
                  className="h-px origin-left"
                  style={{
                    background: `linear-gradient(90deg, ${service.color}55, transparent)`,
                  }}
                />

                {/* CTA */}
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.54 }}
                  whileHover={{ x: 5 }}
                  className="flex items-center gap-2 text-sm font-semibold group/btn"
                  style={{ color: service.color }}
                >
                  Get Started
                  <motion.span
                    animate={{ x: [0, 5, 0] }}
                    transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
                  >
                    <ArrowRight size={14} />
                  </motion.span>
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Compact arrow (non-hovered) */}
          <AnimatePresence>
            {!isHovered && (
              <motion.div
                key="arrow"
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -4 }}
                transition={{ duration: 0.2 }}
                className="absolute bottom-5 right-5"
              >
                <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M3 8h10M9 4l4 4-4 4"
                    stroke={service.color}
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Services Section ─────────────────────────────────────────────────────────
export default function Services() {
  const ref = useRef<HTMLElement>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end 0.5"],
  });
  const smooth = useSpring(scrollYProgress, { stiffness: 80, damping: 25, mass: 0.5 });
  const headerOpacity = useTransform(smooth, [0, 0.15], [0, 1]);
  const headerY = useTransform(smooth, [0, 0.2], [40, 0]);

  return (
    <section id="services" ref={ref} className="relative py-section px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          style={{ opacity: headerOpacity, y: headerY, willChange: "transform, opacity" }}
        >
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-mono text-brand-cyan mb-5 bg-white/[0.04] border border-white/[0.08]">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-cyan" />
            Our Services
          </div>
          <h2 className="text-display-lg font-bold text-foreground mb-4">
            Everything you need to{" "}
            <span className="text-gradient-cyan">build & scale</span>
          </h2>
          <p className="text-foreground/45 text-lg max-w-2xl mx-auto">
            From ideation to deployment, we cover the full spectrum of digital product development.
          </p>
        </motion.div>

        {/* Services grid — dense flow so cards fill gaps when one expands */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
          style={{ gridAutoRows: "minmax(225px, auto)" }}
        >
          {SERVICES.map((service, i) => (
            <ServiceCard
              key={service.title}
              service={service}
              index={i}
              isHovered={hoveredIndex === i}
              isAnyHovered={hoveredIndex !== null}
              onHover={(idx) => setHoveredIndex(idx)}
              onLeave={() => setHoveredIndex(null)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
