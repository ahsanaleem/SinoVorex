"use client";
import { useState, useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";

/* ─────────────────────────────────────────────────────────────────────────────
 *  SINGLE ACCENT — every tinted element uses this + opacity variants only
 * ────────────────────────────────────────────────────────────────────────── */
const C = "#06B6D4";
const BG = "#0A0E1A";

/* ─────────────────────────────────────────────────────────────────────────────
 *  DATA — 6 testimonials split into 2 rows of 3
 * ────────────────────────────────────────────────────────────────────────── */
const TESTIMONIALS = [
  {
    quote: "APPVIX didn't just build our app — they fundamentally changed how we think about product. The AI integration they built is now our biggest competitive advantage. Their senior engineers challenged every assumption and delivered a fintech platform that handles real-money transactions with zero downtime.",
    author: "Sarah Chen",
    role: "CTO",
    company: "FinLedger",
    avatar: "SC",
    project: "AI Fintech App",
    year: "2024",
    rating: 5,
  },
  {
    quote: "Working with APPVIX felt like having a world-class product team embedded in our company. Their attention to detail, speed of execution, and proactive communication is unmatched. They shipped our telehealth platform in 4 months — including HIPAA compliance — and the launch was flawless.",
    author: "Marcus Williams",
    role: "Founder & CEO",
    company: "MediSync",
    avatar: "MW",
    project: "Telehealth Platform",
    year: "2024",
    rating: 5,
  },
  {
    quote: "The team delivered a platform handling 2M+ daily transactions without breaking a sweat. Their architecture decisions — event-driven microservices on AWS, Redis caching layers, and Stripe integration — saved us months of painful scaling headaches and cut infrastructure costs by 40%.",
    author: "Priya Sharma",
    role: "VP Engineering",
    company: "CartFlow",
    avatar: "PS",
    project: "Ecommerce Infrastructure",
    year: "2023",
    rating: 5,
  },
  {
    quote: "From the first design sprint to launch day, APPVIX was an exceptional partner. They pushed us to build something genuinely great rather than just checking boxes. The multiplayer backend they architected supports 1M+ concurrent players with sub-100ms latency — impressive by any standard.",
    author: "James Rodriguez",
    role: "Chief Product Officer",
    company: "Nexus Arena",
    avatar: "JR",
    project: "Gaming Platform",
    year: "2024",
    rating: 5,
  },
  {
    quote: "Our LLM platform went from concept to enterprise-ready in just 4 months. The caliber of engineers APPVIX put on our project is what you'd expect from a top-tier FAANG team. Custom RAG pipelines, real-time streaming, sub-2s query response — they nailed every technical requirement.",
    author: "Yuki Tanaka",
    role: "Co-founder",
    company: "Cognix AI",
    avatar: "YT",
    project: "LLM SaaS Platform",
    year: "2024",
    rating: 5,
  },
  {
    quote: "APPVIX rebuilt our entire property-matching engine using ML, and the results blew us away. Match quality improved by 68%, user session time doubled, and we closed $2.4B in transactions in the first year. They deeply understood our domain and delivered architecture that will scale for years.",
    author: "David Park",
    role: "CEO",
    company: "EstateAI",
    avatar: "DP",
    project: "Real Estate AI",
    year: "2023",
    rating: 5,
  },
];

const ROW1 = TESTIMONIALS.slice(0, 3);
const ROW2 = TESTIMONIALS.slice(3, 6);

/* ─────────────────────────────────────────────────────────────────────────────
 *  STAR RATING — animate in sequentially
 * ────────────────────────────────────────────────────────────────────────── */
function Stars({ rating, visible }: { rating: number; visible: boolean }) {
  return (
    <div className="flex gap-1 items-center">
      {Array.from({ length: 5 }).map((_, i) => (
        <motion.svg
          key={i}
          width="13" height="13" viewBox="0 0 24 24" fill="none"
          initial={{ scale: 0, opacity: 0 }}
          animate={visible ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
          transition={{ delay: 0.15 + i * 0.08, type: "spring", stiffness: 280, damping: 18 }}
        >
          <path
            d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
            fill={i < rating ? C : "rgba(255,255,255,0.10)"}
            style={i < rating ? { filter: `drop-shadow(0 0 3px ${C}90)` } : undefined}
          />
        </motion.svg>
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
 *  SINGLE CARD
 * ────────────────────────────────────────────────────────────────────────── */
function TestimonialCard({
  t, visible, onHover, onLeave,
}: {
  t: (typeof TESTIMONIALS)[number];
  visible: boolean;
  onHover: () => void;
  onLeave: () => void;
}) {
  const [hovered, setHovered] = useState(false);

  const enter = () => { setHovered(true);  onHover(); };
  const leave = () => { setHovered(false); onLeave(); };

  return (
    <div
      onMouseEnter={enter}
      onMouseLeave={leave}
      style={{
        width: 380,
        flexShrink: 0,
        padding: "28px",
        borderRadius: 16,
        display: "flex",
        flexDirection: "column",
        background: "rgba(255,255,255,0.03)",
        border: `1px solid ${hovered ? "rgba(6,182,212,0.38)" : "rgba(6,182,212,0.09)"}`,
        boxShadow: hovered
          ? `0 8px 48px rgba(6,182,212,0.18), 0 0 0 1px rgba(6,182,212,0.22), inset 0 1px 0 rgba(255,255,255,0.04)`
          : "0 4px 24px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.03)",
        transform: hovered ? "scale(1.03) translateY(-4px)" : "scale(1) translateY(0)",
        transition: "transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease",
        cursor: "pointer",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Subtle inner glow on hover */}
      {hovered && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            background: `radial-gradient(350px circle at 40% 40%, rgba(6,182,212,0.07), transparent 65%)`,
            borderRadius: 16,
          }}
        />
      )}

      {/* ── Top: quote mark + stars ── */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 20 }}>
        {/* Quote mark with pulse glow on hover */}
        <span
          style={{
            fontSize: 64,
            fontWeight: 900,
            lineHeight: 0.75,
            color: C,
            userSelect: "none",
            opacity: hovered ? 0.85 : 0.22,
            transition: "opacity 0.3s ease",
            animation: hovered ? "quotePulse 1.5s ease-in-out infinite" : "none",
          }}
        >
          &ldquo;
        </span>
        <Stars rating={t.rating} visible={visible} />
      </div>

      {/* ── Quote text ── */}
      <p
        style={{
          flex: 1,
          fontSize: 15,
          lineHeight: 1.72,
          color: "rgba(255,255,255,0.76)",
          marginBottom: 24,
        }}
      >
        {t.quote}
      </p>

      {/* ── Divider ── */}
      <div
        style={{
          height: 1,
          marginBottom: 20,
          background: `linear-gradient(to right, rgba(6,182,212,0.40), transparent)`,
        }}
      />

      {/* ── Author row ── */}
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        {/* Avatar — initials only, cyan border + cyan text */}
        <div
          style={{
            width: 42,
            height: 42,
            borderRadius: "50%",
            flexShrink: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 13,
            fontWeight: 700,
            color: C,
            background: "rgba(6,182,212,0.10)",
            border: `1.5px solid ${C}`,
            boxShadow: hovered ? `0 0 14px rgba(6,182,212,0.35)` : "none",
            transition: "box-shadow 0.3s ease",
          }}
        >
          {t.avatar}
        </div>

        {/* Name + role */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 14, fontWeight: 600, color: "rgba(255,255,255,0.95)", lineHeight: 1.2 }}>
            {t.author}
          </div>
          <div style={{ fontSize: 12, color: "rgba(255,255,255,0.40)", marginTop: 3 }}>
            {t.role} · {t.company}
          </div>
        </div>

        {/* Industry badge + year */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 5, flexShrink: 0 }}>
          <span
            style={{
              fontSize: 9,
              fontFamily: "monospace",
              textTransform: "uppercase",
              letterSpacing: "0.18em",
              padding: "3px 8px",
              borderRadius: 100,
              color: C,
              border: `1px solid rgba(6,182,212,0.35)`,
              background: "rgba(6,182,212,0.07)",
              whiteSpace: "nowrap",
            }}
          >
            {t.project}
          </span>
          <span style={{ fontSize: 9, fontFamily: "monospace", color: "rgba(255,255,255,0.25)" }}>
            {t.year}
          </span>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
 *  MARQUEE ROW  — direction: "left" | "right"
 * ────────────────────────────────────────────────────────────────────────── */
function MarqueeRow({
  items,
  direction,
  duration,
  visible,
  delay = 0,
}: {
  items: (typeof TESTIMONIALS);
  direction: "left" | "right";
  duration: number;
  visible: boolean;
  delay?: number;
}) {
  const [paused, setPaused] = useState(false);
  // Duplicate for seamless loop
  const doubled = [...items, ...items, ...items];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      style={{ overflow: "hidden", padding: "10px 0" }}
    >
      <div
        style={{
          display: "flex",
          gap: 20,
          width: "max-content",
          animationName: direction === "left" ? "marqueeLeft" : "marqueeRight",
          animationDuration: `${duration}s`,
          animationTimingFunction: "linear",
          animationIterationCount: "infinite",
          animationPlayState: paused ? "paused" : "running",
          willChange: "transform",
        }}
      >
        {doubled.map((t, i) => (
          <TestimonialCard
            key={`${t.company}-${i}`}
            t={t}
            visible={visible}
            onHover={() => setPaused(true)}
            onLeave={() => setPaused(false)}
          />
        ))}
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
 *  SECTION
 * ────────────────────────────────────────────────────────────────────────── */
export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView   = useInView(sectionRef, { once: true, amount: 0.15 });

  // Inject CSS keyframes once
  useEffect(() => {
    const id = "appvix-marquee-keyframes";
    if (document.getElementById(id)) return;
    const style = document.createElement("style");
    style.id = id;
    style.textContent = `
      @keyframes marqueeLeft {
        0%   { transform: translateX(0); }
        100% { transform: translateX(-33.333%); }
      }
      @keyframes marqueeRight {
        0%   { transform: translateX(-33.333%); }
        100% { transform: translateX(0); }
      }
      @keyframes quotePulse {
        0%, 100% { opacity: 0.6; }
        50%       { opacity: 1;   }
      }
    `;
    document.head.appendChild(style);
    return () => { document.getElementById(id)?.remove(); };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      style={{ background: BG, overflow: "hidden", position: "relative" }}
    >
      {/* ── Ambient glow — single cyan ── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background: `
            radial-gradient(700px circle at 20% 50%, rgba(6,182,212,0.05), transparent 55%),
            radial-gradient(600px circle at 80% 60%, rgba(6,182,212,0.04), transparent 55%)
          `,
        }}
      />

      {/* ── Header ── */}
      <div style={{ position: "relative", zIndex: 10, padding: "100px 24px 60px", textAlign: "center", maxWidth: 800, margin: "0 auto" }}>
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Eye-brow badge */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              fontSize: 10,
              fontFamily: "monospace",
              textTransform: "uppercase",
              letterSpacing: "0.28em",
              color: C,
              marginBottom: 20,
              padding: "6px 14px",
              borderRadius: 100,
              border: `1px solid rgba(6,182,212,0.28)`,
              background: "rgba(6,182,212,0.08)",
            }}
          >
            <motion.span
              style={{ width: 6, height: 6, borderRadius: "50%", background: C, display: "inline-block", flexShrink: 0 }}
              animate={{ scale: [1, 1.6, 1], opacity: [1, 0.3, 1] }}
              transition={{ duration: 2.2, repeat: Infinity }}
            />
            Testimonials
          </div>

          {/* Heading — no multi-color; "world-class" gets a subtle cyan underline */}
          <h2
            style={{
              fontSize: "clamp(2.6rem, 6vw, 5rem)",
              fontWeight: 700,
              letterSpacing: "-0.04em",
              lineHeight: 1.0,
              color: "#fff",
              marginBottom: 16,
            }}
          >
            Trusted by{" "}
            <span style={{ position: "relative", display: "inline-block" }}>
              world-class
              {/* Cyan underline drawn in */}
              <motion.span
                initial={{ scaleX: 0 }}
                animate={isInView ? { scaleX: 1 } : {}}
                transition={{ duration: 0.9, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  position: "absolute",
                  left: 0,
                  bottom: -4,
                  right: 0,
                  height: 3,
                  borderRadius: 2,
                  background: `linear-gradient(to right, ${C}, rgba(6,182,212,0.4))`,
                  transformOrigin: "left center",
                  display: "block",
                  boxShadow: `0 0 12px rgba(6,182,212,0.5)`,
                }}
              />
            </span>
            {" "}teams
          </h2>

          {/* Sub */}
          <p style={{ fontSize: 16, color: "rgba(255,255,255,0.40)", lineHeight: 1.7, maxWidth: 520, margin: "0 auto 24px" }}>
            Don&apos;t take our word for it — hear from the founders, CTOs, and engineers who shipped with us.
          </p>

          {/* Scroll hint */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.9, duration: 0.6 }}
            style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, fontSize: 10, fontFamily: "monospace", color: "rgba(255,255,255,0.25)", textTransform: "uppercase", letterSpacing: "0.2em" }}
          >
            <span>Hover any card to pause</span>
            <motion.span
              animate={{ x: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            >→</motion.span>
          </motion.div>
        </motion.div>
      </div>

      {/* ── Marquee rows ── */}
      <div style={{ position: "relative", paddingBottom: 80 }}>
        {/* Left + right edge fades */}
        <div style={{
          position: "absolute", top: 0, bottom: 0, left: 0, width: 140, zIndex: 20, pointerEvents: "none",
          background: `linear-gradient(to right, ${BG}, transparent)`,
        }} />
        <div style={{
          position: "absolute", top: 0, bottom: 0, right: 0, width: 140, zIndex: 20, pointerEvents: "none",
          background: `linear-gradient(to left, ${BG}, transparent)`,
        }} />

        {/* Single row — scrolls left */}
        <MarqueeRow
          items={ROW1}
          direction="left"
          duration={38}
          visible={isInView}
          delay={0.2}
        />
      </div>

      {/* ── Bottom stats bar ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 48,
          paddingBottom: 80,
          flexWrap: "wrap",
        }}
      >
        {[
          { value: "200+", label: "Projects shipped" },
          { value: "98%",  label: "Client satisfaction" },
          { value: "5.0",  label: "Average rating" },
          { value: "4yr",  label: "In business" },
        ].map((s, i) => (
          <div key={i} style={{ textAlign: "center" }}>
            <div style={{ fontSize: 32, fontWeight: 700, fontFamily: "monospace", color: C, lineHeight: 1 }}>
              {s.value}
            </div>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.35)", marginTop: 6, textTransform: "uppercase", letterSpacing: "0.18em", fontFamily: "monospace" }}>
              {s.label}
            </div>
          </div>
        ))}
      </motion.div>
    </section>
  );
}
