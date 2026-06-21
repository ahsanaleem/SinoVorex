"use client";
import dynamic from "next/dynamic";
import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { staggerContainerVariants, fadeUpVariants, scaleInVariants } from "@/lib/motion";

const NeuralNetwork = dynamic(() => import("@/components/three/NeuralNetwork"), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-transparent" />,
});

const TECH_CARDS = [
  { title: "AI & Machine Learning", desc: "LLMs, Computer Vision, NLP, and custom ML pipelines at production scale.", icon: "🧠", color: "#06e5ff" },
  { title: "Web3 & Blockchain", desc: "Smart contracts, DeFi protocols, tokenomics, and cross-chain infrastructure.", icon: "⛓", color: "#f59e0b" },
  { title: "AR / VR", desc: "Spatial computing experiences for enterprise training, retail, and entertainment.", icon: "🥽", color: "#ec4899" },
  { title: "Metaverse", desc: "Virtual worlds, avatars, and persistent social experiences built on open standards.", icon: "🌐", color: "#8b5cf6" },
  { title: "IoT & Edge", desc: "Connected device ecosystems with real-time data streams and edge inference.", icon: "📡", color: "#10b981" },
  { title: "Automation", desc: "RPA, workflow orchestration, and AI agents that replace manual processes at scale.", icon: "⚙️", color: "#3b82f6" },
];

export default function AITech() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef as React.RefObject<Element>, { once: true, margin: "-100px" });
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const neural3DY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <section id="ai" ref={sectionRef} className="relative py-section px-6 overflow-hidden">
      {/* 3D Neural network background */}
      <div className="absolute inset-0 pointer-events-none md:block hidden opacity-30">
        <motion.div className="absolute inset-0" style={{ y: neural3DY }}>
          <NeuralNetwork />
        </motion.div>
      </div>

      {/* Radial glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-brand-violet opacity-[0.04] blur-[120px]" />
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          variants={staggerContainerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.div
            variants={fadeUpVariants}
            className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 text-xs font-mono text-brand-cyan mb-5"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-brand-cyan" />
            Emerging Tech
          </motion.div>
          <motion.h2
            variants={fadeUpVariants}
            className="text-display-lg font-bold text-foreground mb-4"
          >
            We live at the{" "}
            <span className="text-gradient-cyan">bleeding edge</span>
          </motion.h2>
          <motion.p
            variants={fadeUpVariants}
            className="text-foreground/45 text-lg max-w-2xl mx-auto"
          >
            While others catch up, we&apos;re already shipping. Our teams specialize in the technologies
            defining the next decade of digital products.
          </motion.p>
        </motion.div>

        {/* Tech cards grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          variants={staggerContainerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {TECH_CARDS.map((card, i) => (
            <motion.div
              key={card.title}
              variants={scaleInVariants}
              custom={i}
              whileHover={{ scale: 1.02, y: -4 }}
              transition={{ type: "spring", stiffness: 150, damping: 15 }}
              className="glass rounded-2xl p-6 relative overflow-hidden group"
            >
              {/* Hover glow */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl pointer-events-none"
                style={{
                  background: `radial-gradient(200px circle at 50% 0%, ${card.color}10, transparent 70%)`,
                }}
              />

              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-4"
                style={{ background: `${card.color}15` }}
              >
                {card.icon}
              </div>
              <h3
                className="text-lg font-semibold mb-2 tracking-tight"
                style={{ color: card.color }}
              >
                {card.title}
              </h3>
              <p className="text-sm text-foreground/45 leading-relaxed">{card.desc}</p>

              {/* Animated bottom line */}
              <motion.div
                className="absolute bottom-0 left-0 right-0 h-px"
                style={{ background: `linear-gradient(90deg, transparent, ${card.color}50, transparent)` }}
                animate={{ scaleX: [0, 1, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: i * 0.4 }}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
