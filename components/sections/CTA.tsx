"use client";
import { useRef, useState, useEffect } from "react";
import { motion, useInView, useMotionValue, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ArrowRight, Mail, Phone, MapPin } from "lucide-react";
import MagneticButton from "@/components/ui/MagneticButton";
import { EASE_APPLE, staggerContainerVariants, fadeUpVariants } from "@/lib/motion";

// ─── Data ──────────────────────────────────────────────────────────────────
const SOCIAL = [
  { label: "Twitter / X", href: "#", icon: "𝕏" },
  { label: "LinkedIn", href: "#", icon: "in" },
  { label: "GitHub", href: "#", icon: "GH" },
  { label: "Dribbble", href: "#", icon: "Dr" },
];

const FOOTER_LINKS = {
  Company: ["About", "Careers", "Blog", "Press"],
  Services: ["Mobile Apps", "AI Solutions", "SaaS", "UI/UX Design"],
  Tech: ["Web3", "AR/VR", "Cloud", "Game Dev"],
  Legal: ["Privacy Policy", "Terms of Service", "Security"],
};

const STATS = [
  { num: "50+", label: "Products Shipped" },
  { num: "40+", label: "Global Clients" },
  { num: "4yr", label: "In Business" },
  { num: "98%", label: "Client Retention" },
];

// ─── Floating particle ─────────────────────────────────────────────────────
function Particle({ x, y, size, delay, color, duration }: {
  x: string; y: string; size: number; delay: number; color: string; duration: number;
}) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{ left: x, top: y, width: size, height: size, background: color,
        filter: `blur(${size > 3 ? 1 : 0}px)` }}
      animate={{ y: [0, -40, 0], opacity: [0, 0.7, 0], scale: [0.5, 1, 0.5] }}
      transition={{ duration, delay, repeat: Infinity, ease: "easeInOut" }}
    />
  );
}

const PARTICLES = [
  { x: "8%",  y: "25%", size: 3, delay: 0,    color: "#06B6D4", duration: 4.0 },
  { x: "88%", y: "20%", size: 5, delay: 0.6,  color: "#8B5CF6", duration: 3.5 },
  { x: "25%", y: "72%", size: 2, delay: 1.2,  color: "#06B6D4", duration: 4.5 },
  { x: "75%", y: "78%", size: 4, delay: 1.8,  color: "#10B981", duration: 3.8 },
  { x: "12%", y: "55%", size: 2, delay: 0.9,  color: "#8B5CF6", duration: 5.0 },
  { x: "92%", y: "60%", size: 3, delay: 2.2,  color: "#06B6D4", duration: 3.2 },
  { x: "50%", y: "10%", size: 4, delay: 1.5,  color: "#EC4899", duration: 4.2 },
  { x: "38%", y: "88%", size: 2, delay: 0.4,  color: "#8B5CF6", duration: 4.8 },
  { x: "65%", y: "35%", size: 3, delay: 2.8,  color: "#06B6D4", duration: 3.6 },
  { x: "18%", y: "40%", size: 2, delay: 1.0,  color: "#EC4899", duration: 4.3 },
];

// ─── CTA Section ──────────────────────────────────────────────────────────
export default function CTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef    = useRef<HTMLDivElement>(null);
  const footerRef  = useRef<HTMLElement>(null);

  const isInView     = useInView(sectionRef as React.RefObject<Element>, { once: true, margin: "-80px" });
  const footerInView = useInView(footerRef  as React.RefObject<Element>, { once: true, margin: "-60px" });

  // Mouse spotlight
  const [spotPos, setSpotPos]   = useState({ x: 50, y: 50 });
  const [cardHovered, setCardHovered] = useState(false);

  // Border rotation angle
  const angle = useMotionValue(0);
  useEffect(() => {
    let frame: number;
    let a = 0;
    const tick = () => { a = (a + 0.4) % 360; angle.set(a); frame = requestAnimationFrame(tick); };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [angle]);

  const onCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = cardRef.current?.getBoundingClientRect();
    if (!r) return;
    setSpotPos({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 });
  };

  return (
    <>
      {/* ══════════════════════════════════════════════════
           CTA Section
      ══════════════════════════════════════════════════ */}
      <section
        id="contact"
        ref={sectionRef}
        className="relative py-32 px-6 overflow-hidden bg-[#050814]"
      >
        {/* ── Background particles ── */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {PARTICLES.map((p, i) => <Particle key={i} {...p} />)}
        </div>

        {/* ── Background mesh grid ── */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.025]"
          style={{
            backgroundImage: `linear-gradient(rgba(6,182,212,0.8) 1px, transparent 1px),
              linear-gradient(90deg, rgba(6,182,212,0.8) 1px, transparent 1px)`,
            backgroundSize: "80px 80px",
          }} />

        {/* ── Deep ambient glow ── */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[400px] rounded-full blur-[130px] opacity-[0.08]"
            style={{ background: "linear-gradient(135deg, #06B6D4, #8B5CF6)" }} />
        </div>

        {/* ── Main CTA card ── */}
        <div className="max-w-3xl mx-auto relative">
          {/* Animated rotating gradient border */}
          <motion.div
            className="absolute -inset-[1.5px] rounded-3xl pointer-events-none z-0"
            style={{
              background: `conic-gradient(from ${angle}deg at 50% 50%, #06B6D4, #8B5CF6, #EC4899, #10B981, #06B6D4)`,
              opacity: cardHovered ? 0.6 : 0.25,
            }}
            transition={{ opacity: { duration: 0.4 } }}
          />

          {/* Card body */}
          <div
            ref={cardRef}
            onMouseMove={onCardMouseMove}
            onMouseEnter={() => setCardHovered(true)}
            onMouseLeave={() => setCardHovered(false)}
            className="relative z-10 rounded-3xl overflow-hidden"
            style={{ background: "linear-gradient(145deg, #070e1f 0%, #050814 100%)" }}
          >
            {/* Mouse spotlight inside card */}
            <AnimatePresence>
              {cardHovered && (
                <motion.div
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="absolute inset-0 pointer-events-none z-0"
                  style={{
                    background: `radial-gradient(500px circle at ${spotPos.x}% ${spotPos.y}%, rgba(6,182,212,0.07), transparent 60%)`,
                  }}
                />
              )}
            </AnimatePresence>

            <div className="relative z-10 px-10 py-16 text-center">
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-mono text-[#06B6D4] mb-8 border border-[#06B6D4]/20 bg-[#06B6D4]/[0.06]"
              >
                <motion.span className="w-1.5 h-1.5 rounded-full bg-[#06B6D4]"
                  animate={{ scale: [1, 1.8, 1], opacity: [1, 0.3, 1] }}
                  transition={{ duration: 2, repeat: Infinity }} />
                Available for new projects
              </motion.div>

              {/* Headline */}
              <motion.h2
                initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="text-[clamp(2.8rem,6vw,5rem)] font-black tracking-tight text-white leading-[1.05] mb-6"
              >
                Let&apos;s build something{" "}
                <motion.span
                  className="bg-clip-text text-transparent inline-block"
                  style={{ backgroundImage: "linear-gradient(135deg, #06B6D4 0%, #8B5CF6 50%, #EC4899 100%)" }}
                  animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                >
                  legendary
                </motion.span>
              </motion.h2>

              {/* Sub */}
              <motion.p
                initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.65, delay: 0.2 }}
                className="text-white/45 text-lg max-w-xl mx-auto mb-10 leading-relaxed"
              >
                Whether you&apos;re a startup with a vision or an enterprise ready for transformation —
                we&apos;re the team that makes it real. Let&apos;s talk.
              </motion.p>

              {/* Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.65, delay: 0.3 }}
                className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
              >
                <MagneticButton variant="primary" href="mailto:hello@appvix.com">
                  Start a Project
                  <ArrowRight size={16} />
                </MagneticButton>
                <MagneticButton variant="outline" href="tel:+1234567890">
                  Schedule a Call
                </MagneticButton>
              </motion.div>

              {/* Divider */}
              <motion.div
                initial={{ scaleX: 0 }} animate={isInView ? { scaleX: 1 } : {}}
                transition={{ duration: 0.9, delay: 0.4 }}
                className="h-px mb-10 mx-auto max-w-md"
                style={{ background: "linear-gradient(to right, transparent, rgba(255,255,255,0.08), transparent)" }}
              />

              {/* Contact info */}
              <motion.div
                initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="flex flex-wrap items-center justify-center gap-5 text-sm text-white/35 mb-12"
              >
                {[
                  { icon: Mail,   label: "hello@appvix.com" },
                  { icon: Phone,  label: "+1 (555) 000-0000" },
                  { icon: MapPin, label: "SF · Dubai · London" },
                ].map(({ icon: Icon, label }) => (
                  <motion.div key={label}
                    className="flex items-center gap-2 cursor-pointer group"
                    whileHover={{ scale: 1.05, color: "#06B6D4" }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Icon size={14} className="text-[#06B6D4]/50 group-hover:text-[#06B6D4] transition-colors" />
                    <span className="group-hover:text-white/70 transition-colors">{label}</span>
                  </motion.div>
                ))}
              </motion.div>

            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
           Footer
      ══════════════════════════════════════════════════ */}
      <footer ref={footerRef} className="relative px-6 pb-10 bg-[#050814]">
        <motion.div
          className="h-px mb-12"
          style={{ background: "linear-gradient(90deg, transparent, #06B6D4, #8B5CF6, transparent)" }}
          initial={{ scaleX: 0, opacity: 0 }}
          animate={footerInView ? { scaleX: 1, opacity: 1 } : {}}
          transition={{ duration: 1.2, ease: EASE_APPLE }}
        />

        <motion.div
          className="max-w-7xl mx-auto"
          variants={staggerContainerVariants}
          initial="hidden"
          animate={footerInView ? "visible" : "hidden"}
        >
          <div className="grid grid-cols-2 md:grid-cols-6 gap-8 mb-12">
            <div className="col-span-2">
              <motion.div variants={fadeUpVariants} className="mb-4">
                <Image src="/logo.svg" alt="APPVIX" width={120} height={32} className="h-8 w-auto" />
              </motion.div>
              <motion.p variants={fadeUpVariants}
                className="text-sm text-white/30 leading-relaxed mb-5 max-w-xs">
                A global digital agency crafting exceptional mobile, AI, and web products since 2018.
              </motion.p>
              <motion.div variants={fadeUpVariants} className="flex gap-3">
                {SOCIAL.map((s) => (
                  <motion.a key={s.label} href={s.href} aria-label={s.label}
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold text-white/35 border border-white/[0.06]"
                    style={{ background: "rgba(255,255,255,0.02)" }}
                    whileHover={{ color: "#06B6D4", borderColor: "rgba(6,182,212,0.3)", background: "rgba(6,182,212,0.06)", y: -2 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {s.icon}
                  </motion.a>
                ))}
              </motion.div>
            </div>

            {Object.entries(FOOTER_LINKS).map(([heading, links]) => (
              <motion.div key={heading} variants={fadeUpVariants}>
                <h4 className="text-xs font-semibold text-white/50 uppercase tracking-widest mb-4">{heading}</h4>
                <ul className="space-y-2.5">
                  {links.map((link) => (
                    <li key={link}>
                      <motion.a href="#" className="text-sm text-white/30"
                        whileHover={{ color: "#06B6D4", x: 3 }}
                        transition={{ type: "spring", stiffness: 400 }}>
                        {link}
                      </motion.a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          <motion.div variants={fadeUpVariants}
            className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-white/[0.04] text-xs text-white/20">
            <span>© {new Date().getFullYear()} APPVIX. All rights reserved.</span>
            <div className="flex items-center gap-1 text-white/15">
              <span>Built with</span>
              <motion.span animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 1.5, repeat: Infinity }}
                className="text-[#EC4899]">♥</motion.span>
              <span>by APPVIX</span>
            </div>
          </motion.div>
        </motion.div>
      </footer>
    </>
  );
}
