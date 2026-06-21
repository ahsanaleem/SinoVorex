"use client";

import { useState, useEffect, useRef } from "react";

const NAV_LINKS = ["Services", "About", "Global Reach", "Contact"];

const SERVICES = [
  {
    icon: "⬡",
    title: "China Market Entry",
    desc: "Navigate regulatory frameworks, supplier networks, and market positioning for foreign businesses entering China.",
  },
  {
    icon: "⬡",
    title: "Export Consulting",
    desc: "Strategic guidance for Chinese enterprises expanding into global markets with compliance and trade documentation.",
  },
  {
    icon: "⬡",
    title: "Trade Compliance",
    desc: "End-to-end compliance management including customs, tariffs, and international trade law advisory.",
  },
  {
    icon: "⬡",
    title: "Supply Chain Advisory",
    desc: "Optimise sourcing, logistics, and supplier relationships across the Yangtze River Delta and beyond.",
  },
  {
    icon: "⬡",
    title: "Business Formation",
    desc: "Complete setup support for WFOEs, joint ventures, and representative offices in Suzhou and greater China.",
  },
  {
    icon: "⬡",
    title: "Market Intelligence",
    desc: "Data-driven insights on sector trends, competitor landscapes, and trade opportunity mapping.",
  },
];

const STATS = [
  { value: "200+", label: "Clients Served" },
  { value: "40+", label: "Countries Reached" },
  { value: "98%", label: "Success Rate" },
  { value: "12+", label: "Years Experience" },
];

const NODES = [
  { x: 50, y: 50, label: "Suzhou HQ", size: 14, primary: true },
  { x: 15, y: 25, label: "London", size: 8 },
  { x: 80, y: 20, label: "New York", size: 8 },
  { x: 85, y: 55, label: "Tokyo", size: 9 },
  { x: 70, y: 75, label: "Singapore", size: 8 },
  { x: 25, y: 70, label: "Dubai", size: 7 },
  { x: 30, y: 35, label: "Frankfurt", size: 7 },
  { x: 60, y: 85, label: "Sydney", size: 7 },
  { x: 10, y: 55, label: "São Paulo", size: 6 },
  { x: 75, y: 40, label: "Seoul", size: 7 },
];

function VortexCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const tRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      ctx.clearRect(0, 0, w, h);

      const cx = w / 2;
      const cy = h / 2;
      const t = (tRef.current += 0.008);

      for (let arm = 0; arm < 3; arm++) {
        const armOffset = (arm * Math.PI * 2) / 3;
        ctx.beginPath();
        for (let i = 0; i < 200; i++) {
          const r = i * 1.4;
          const angle = i * 0.08 + armOffset + t;
          const x = cx + r * Math.cos(angle);
          const y = cy + r * Math.sin(angle);
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        const grad = ctx.createLinearGradient(cx - 80, cy, cx + 80, cy);
        grad.addColorStop(0, "rgba(255,107,43,0.9)");
        grad.addColorStop(1, "rgba(255,107,43,0)");
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }

      for (let i = 0; i < 40; i++) {
        const angle = (i / 40) * Math.PI * 2 + t * (i % 3 === 0 ? 1.2 : 0.8);
        const radius = 40 + (i % 5) * 30 + Math.sin(t + i) * 10;
        const x = cx + radius * Math.cos(angle);
        const y = cy + radius * Math.sin(angle);
        const alpha = 0.3 + 0.4 * Math.sin(t * 2 + i);
        ctx.beginPath();
        ctx.arc(x, y, i % 7 === 0 ? 2.5 : 1.2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,107,43,${alpha})`;
        ctx.fill();
      }

      const glow = ctx.createRadialGradient(cx, cy, 0, cx, cy, 60);
      glow.addColorStop(0, "rgba(255,107,43,0.25)");
      glow.addColorStop(1, "rgba(255,107,43,0)");
      ctx.beginPath();
      ctx.arc(cx, cy, 60, 0, Math.PI * 2);
      ctx.fillStyle = glow;
      ctx.fill();

      ctx.beginPath();
      ctx.arc(cx, cy, 5, 0, Math.PI * 2);
      ctx.fillStyle = "#FF6B2B";
      ctx.fill();

      animRef.current = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ width: "100%", height: "100%", display: "block" }}
    />
  );
}

function NetworkMap() {
  const [active, setActive] = useState<number | null>(null);
  const [pulse, setPulse] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setPulse((p) => (p + 1) % NODES.length), 800);
    return () => clearInterval(id);
  }, []);

  return (
    <div style={{ position: "relative", width: "100%", paddingBottom: "55%", background: "rgba(10,15,30,0.6)", borderRadius: 16, border: "1px solid rgba(255,107,43,0.15)", overflow: "hidden" }}>
      <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} viewBox="0 0 100 55" preserveAspectRatio="xMidYMid meet">
        {[10, 20, 30, 40, 50, 60, 70, 80, 90].map((x) => (
          <line key={x} x1={x} y1="0" x2={x} y2="55" stroke="rgba(255,107,43,0.04)" strokeWidth="0.2" />
        ))}
        {[10, 20, 30, 40, 50].map((y) => (
          <line key={y} x1="0" y1={y} x2="100" y2={y} stroke="rgba(255,107,43,0.04)" strokeWidth="0.2" />
        ))}

        {NODES.slice(1).map((node, i) => (
          <line
            key={i}
            x1={NODES[0].x} y1={NODES[0].y}
            x2={node.x} y2={node.y}
            stroke="rgba(255,107,43,0.2)"
            strokeWidth="0.3"
            strokeDasharray="1 1"
          />
        ))}

        {NODES.map((node, i) => (
          <g key={i} onMouseEnter={() => setActive(i)} onMouseLeave={() => setActive(null)} style={{ cursor: "pointer" }}>
            {pulse === i && (
              <circle cx={node.x} cy={node.y} r={node.size * 1.5} fill="none" stroke="rgba(255,107,43,0.4)" strokeWidth="0.4">
                <animate attributeName="r" from={node.size * 0.8} to={node.size * 2.5} dur="1s" repeatCount="1" />
                <animate attributeName="opacity" from="0.8" to="0" dur="1s" repeatCount="1" />
              </circle>
            )}
            <circle
              cx={node.x} cy={node.y}
              r={active === i ? node.size * 0.8 : node.size * 0.5}
              fill={node.primary ? "#FF6B2B" : active === i ? "#FF6B2B" : "rgba(255,107,43,0.4)"}
              style={{ transition: "all 0.3s" }}
            />
            <text
              x={node.x} y={node.y - node.size * 0.8}
              textAnchor="middle"
              fontSize="2.2"
              fill="rgba(245,245,245,0.7)"
              fontFamily="'Barlow Condensed', sans-serif"
            >
              {node.label}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}

export default function TradevorexHome() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [visibleStats, setVisibleStats] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisibleStats(true); },
      { threshold: 0.3 }
    );
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  const styles: Record<string, React.CSSProperties> = {
    root: {
      fontFamily: "'Barlow Condensed', 'Barlow', sans-serif",
      background: "#0A0F1E",
      color: "#F5F5F5",
      minHeight: "100vh",
      overflowX: "hidden",
    },
    nav: {
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "0 5vw",
      height: 64,
      background: scrolled ? "rgba(10,15,30,0.95)" : "transparent",
      backdropFilter: scrolled ? "blur(12px)" : "none",
      borderBottom: scrolled ? "1px solid rgba(255,107,43,0.15)" : "none",
      transition: "all 0.4s ease",
    },
    logo: {
      fontSize: 22,
      fontWeight: 700,
      letterSpacing: "0.12em",
      textTransform: "uppercase",
      color: "#F5F5F5",
    },
    logoAccent: { color: "#FF6B2B" },
    navLinks: {
      display: "flex", gap: 36, listStyle: "none", margin: 0, padding: 0,
    },
    navLink: {
      fontSize: 13, fontWeight: 600, letterSpacing: "0.15em",
      textTransform: "uppercase", color: "rgba(245,245,245,0.65)",
      cursor: "pointer", transition: "color 0.2s",
      textDecoration: "none",
    },
    ctaBtn: {
      background: "#FF6B2B",
      color: "#0A0F1E",
      border: "none",
      padding: "10px 24px",
      fontSize: 12,
      fontWeight: 700,
      letterSpacing: "0.15em",
      textTransform: "uppercase",
      cursor: "pointer",
      fontFamily: "inherit",
      clipPath: "polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)",
      transition: "all 0.2s",
    },
    hero: {
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      position: "relative",
      padding: "100px 5vw 60px",
      textAlign: "center",
      overflow: "hidden",
    },
    heroBg: {
      position: "absolute", inset: 0,
      background: "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(255,107,43,0.07) 0%, transparent 70%)",
    },
    heroCanvas: {
      position: "absolute", inset: 0, zIndex: 1,
    },
    heroContent: { position: "relative", zIndex: 2, maxWidth: 900 },
    badge: {
      display: "inline-block",
      fontSize: 11, fontWeight: 700, letterSpacing: "0.25em",
      textTransform: "uppercase",
      color: "#FF6B2B",
      border: "1px solid rgba(255,107,43,0.4)",
      padding: "6px 18px",
      marginBottom: 28,
      animation: "fadeUp 0.8s ease forwards",
    },
    heroTitle: {
      fontSize: "clamp(42px, 9vw, 96px)",
      fontWeight: 800,
      lineHeight: 0.95,
      letterSpacing: "-0.02em",
      textTransform: "uppercase",
      margin: "0 0 24px",
      animation: "fadeUp 0.9s ease 0.1s both",
    },
    heroTitleAccent: { color: "#FF6B2B", display: "block" },
    heroSub: {
      fontSize: "clamp(14px, 2vw, 18px)",
      color: "rgba(245,245,245,0.55)",
      maxWidth: 560,
      margin: "0 auto 40px",
      lineHeight: 1.6,
      letterSpacing: "0.02em",
      fontWeight: 400,
      animation: "fadeUp 1s ease 0.2s both",
    },
    heroBtns: {
      display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap",
      animation: "fadeUp 1s ease 0.3s both",
    },
    btnPrimary: {
      background: "#FF6B2B",
      color: "#0A0F1E",
      border: "none",
      padding: "15px 36px",
      fontSize: 13, fontWeight: 700,
      letterSpacing: "0.15em",
      textTransform: "uppercase",
      cursor: "pointer",
      fontFamily: "inherit",
      clipPath: "polygon(12px 0%, 100% 0%, calc(100% - 12px) 100%, 0% 100%)",
    },
    btnOutline: {
      background: "transparent",
      color: "#F5F5F5",
      border: "1px solid rgba(245,245,245,0.25)",
      padding: "15px 36px",
      fontSize: 13, fontWeight: 700,
      letterSpacing: "0.15em",
      textTransform: "uppercase",
      cursor: "pointer",
      fontFamily: "inherit",
    },
    section: {
      padding: "100px 5vw",
      maxWidth: 1200,
      margin: "0 auto",
    },
    sectionLabel: {
      fontSize: 11, fontWeight: 700, letterSpacing: "0.3em",
      textTransform: "uppercase", color: "#FF6B2B",
      marginBottom: 12,
    },
    sectionTitle: {
      fontSize: "clamp(28px, 4vw, 52px)",
      fontWeight: 800, letterSpacing: "-0.01em",
      textTransform: "uppercase",
      margin: "0 0 16px",
    },
    sectionSub: {
      color: "rgba(245,245,245,0.5)",
      fontSize: 16, lineHeight: 1.6,
      maxWidth: 520, marginBottom: 56,
    },
    servicesGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
      gap: 2,
    },
    serviceCard: {
      background: "rgba(30,58,95,0.12)",
      border: "1px solid rgba(255,107,43,0.1)",
      padding: "36px 32px",
      position: "relative",
      overflow: "hidden",
      transition: "all 0.3s",
      cursor: "default",
    },
    serviceIcon: {
      fontSize: 28, color: "#FF6B2B", marginBottom: 16,
      display: "block",
    },
    serviceTitle: {
      fontSize: 18, fontWeight: 700, letterSpacing: "0.04em",
      textTransform: "uppercase", marginBottom: 12,
    },
    serviceDesc: {
      fontSize: 14, color: "rgba(245,245,245,0.5)",
      lineHeight: 1.7, fontWeight: 400,
    },
    statsRow: {
      display: "grid",
      gridTemplateColumns: "repeat(4, 1fr)",
      gap: 1,
      margin: "0",
      background: "rgba(255,107,43,0.08)",
      border: "1px solid rgba(255,107,43,0.12)",
    },
    statItem: {
      padding: "48px 32px",
      textAlign: "center",
      borderRight: "1px solid rgba(255,107,43,0.08)",
    },
    statValue: {
      fontSize: "clamp(36px, 5vw, 60px)",
      fontWeight: 900,
      color: "#FF6B2B",
      letterSpacing: "-0.02em",
      lineHeight: 1,
      marginBottom: 8,
      transition: "all 0.6s ease",
    },
    statLabel: {
      fontSize: 12, fontWeight: 600,
      letterSpacing: "0.2em", textTransform: "uppercase",
      color: "rgba(245,245,245,0.45)",
    },
    divider: {
      height: 1,
      background: "linear-gradient(90deg, transparent, rgba(255,107,43,0.3), transparent)",
      margin: "0 5vw",
    },
    footer: {
      borderTop: "1px solid rgba(255,107,43,0.1)",
      padding: "48px 5vw",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      flexWrap: "wrap",
      gap: 24,
    },
    footerLogo: {
      fontSize: 18, fontWeight: 700,
      letterSpacing: "0.15em", textTransform: "uppercase",
    },
    footerText: {
      fontSize: 12, color: "rgba(245,245,245,0.35)",
      letterSpacing: "0.05em",
    },
    tag: {
      display: "inline-block",
      padding: "4px 12px",
      fontSize: 11, fontWeight: 600,
      letterSpacing: "0.15em", textTransform: "uppercase",
      background: "rgba(255,107,43,0.1)",
      color: "#FF6B2B",
      border: "1px solid rgba(255,107,43,0.2)",
      marginRight: 8, marginBottom: 8,
    },
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;600;700;800;900&family=Barlow:wght@400;500;600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { background: #0A0F1E; }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .service-card:hover {
          background: rgba(255,107,43,0.06) !important;
          border-color: rgba(255,107,43,0.35) !important;
          transform: translateY(-2px);
        }
        .service-card:hover .service-corner {
          opacity: 1 !important;
        }
        .nav-link:hover { color: #FF6B2B !important; }
        .cta-btn:hover { background: #ff8a55 !important; }
        .btn-primary:hover { background: #ff8a55 !important; }
        @media (max-width: 768px) {
          .nav-links { display: none !important; }
          .stats-row { grid-template-columns: repeat(2, 1fr) !important; }
          .stat-item { border-right: none !important; border-bottom: 1px solid rgba(255,107,43,0.08); }
          .about-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <div style={styles.root}>
        {/* NAV */}
        <nav style={styles.nav}>
          <div style={styles.logo}>
            TRADE<span style={styles.logoAccent}>VOREX</span>
          </div>
          <ul className="nav-links" style={styles.navLinks}>
            {NAV_LINKS.map((l) => (
              <li key={l}>
                <a className="nav-link" style={styles.navLink} href={`#${l.toLowerCase().replace(" ", "-")}`}>{l}</a>
              </li>
            ))}
          </ul>
          <button className="cta-btn" style={styles.ctaBtn}>Get Started</button>
        </nav>

        {/* HERO */}
        <section style={styles.hero}>
          <div style={styles.heroBg} />
          <div style={styles.heroCanvas}>
            <VortexCanvas />
          </div>
          <div style={styles.heroContent}>
            <div style={styles.badge}>Suzhou · China · Global Trade Consulting</div>
            <h1 style={styles.heroTitle}>
              The Force Behind
              <span style={styles.heroTitleAccent}>Global Trade</span>
            </h1>
            <p style={styles.heroSub}>
              Suzhou Tradevorex connects Chinese enterprises with global markets — and the world with China. Precision consulting. Measurable results.
            </p>
            <div style={styles.heroBtns}>
              <button className="btn-primary" style={styles.btnPrimary}>Start Consulting</button>
              <button style={styles.btnOutline}>Our Services ↓</button>
            </div>
          </div>

          <div style={{ position: "absolute", bottom: 36, left: "50%", transform: "translateX(-50%)", zIndex: 2, display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
            <div style={{ width: 1, height: 48, background: "linear-gradient(180deg, rgba(255,107,43,0.6), transparent)" }} />
            <span style={{ fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(245,245,245,0.3)" }}>Scroll</span>
          </div>
        </section>

        {/* STATS */}
        <div ref={statsRef}>
          <div className={`stats-row ${visibleStats ? "stat-visible" : ""}`} style={{ ...styles.statsRow, maxWidth: "100%" }}>
            {STATS.map((s, i) => (
              <div key={i} style={styles.statItem} className="stat-item">
                <div style={styles.statValue} className="stat-value">{s.value}</div>
                <div style={styles.statLabel}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={styles.divider} />

        {/* SERVICES */}
        <div id="services" style={styles.section}>
          <div style={styles.sectionLabel}>// What We Do</div>
          <h2 style={styles.sectionTitle}>Trade Consulting<br />At Every Level</h2>
          <p style={styles.sectionSub}>
            From market entry to full-scale international expansion — we provide the intelligence and execution your trade strategy demands.
          </p>
          <div style={styles.servicesGrid}>
            {SERVICES.map((s, i) => (
              <div key={i} className="service-card" style={styles.serviceCard}>
                <div style={{ position: "absolute", top: 0, left: 0, width: 3, height: "100%", background: "linear-gradient(180deg, #FF6B2B, transparent)", opacity: 0, transition: "opacity 0.3s" }} className="service-corner" />
                <span style={styles.serviceIcon}>{s.icon}</span>
                <div style={styles.serviceTitle}>{s.title}</div>
                <div style={styles.serviceDesc}>{s.desc}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={styles.divider} />

        {/* ABOUT */}
        <div id="about" style={{ ...styles.section, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }} className="about-grid">
          <div>
            <div style={styles.sectionLabel}>// Who We Are</div>
            <h2 style={{ ...styles.sectionTitle, marginBottom: 24 }}>
              Rooted in Suzhou.<br />Reaching the World.
            </h2>
            <p style={{ ...styles.sectionSub, marginBottom: 24 }}>
              Suzhou Tradevorex is a specialist trade consulting firm based in Suzhou, Jiangsu — the heart of China&apos;s manufacturing and export economy.
            </p>
            <p style={{ fontSize: 14, color: "rgba(245,245,245,0.45)", lineHeight: 1.8, marginBottom: 32 }}>
              We serve both Chinese enterprises looking to expand overseas and foreign businesses seeking to establish or grow in China. Our team combines deep local expertise with international business acumen to deliver results that matter.
            </p>
            <div>
              {["China Trade Law", "Customs & Tariffs", "Suzhou FTZ", "RCEP Strategy", "B2B Sourcing", "Cross-border Payments"].map((t) => (
                <span key={t} style={styles.tag}>{t}</span>
              ))}
            </div>
          </div>
          <div style={{ position: "relative" }}>
            <div style={{ position: "absolute", inset: -20, background: "radial-gradient(ellipse at center, rgba(255,107,43,0.08), transparent 70%)", borderRadius: "50%" }} />
            <div style={{ background: "rgba(30,58,95,0.15)", border: "1px solid rgba(255,107,43,0.12)", padding: "40px 36px", borderRadius: 4 }}>
              <div style={{ fontSize: 13, color: "rgba(245,245,245,0.4)", letterSpacing: "0.1em", marginBottom: 20, textTransform: "uppercase" }}>Why Tradevorex</div>
              {[
                ["Local Knowledge", "Deep roots in Suzhou's business and regulatory ecosystem"],
                ["Global Network", "Active connections across 40+ trade markets worldwide"],
                ["Full-Cycle Support", "From strategy through execution and compliance"],
                ["Bilingual Expertise", "Chinese and English advisory with no communication gaps"],
              ].map(([title, desc], i) => (
                <div key={i} style={{ display: "flex", gap: 16, marginBottom: 24, paddingBottom: 24, borderBottom: i < 3 ? "1px solid rgba(255,107,43,0.07)" : "none" }}>
                  <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#FF6B2B", flexShrink: 0, marginTop: 6 }} />
                  <div>
                    <div style={{ fontSize: 15, fontWeight: 700, letterSpacing: "0.05em", marginBottom: 4, textTransform: "uppercase" }}>{title}</div>
                    <div style={{ fontSize: 13, color: "rgba(245,245,245,0.45)", lineHeight: 1.6 }}>{desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div style={styles.divider} />

        {/* GLOBAL REACH */}
        <div id="global-reach" style={styles.section}>
          <div style={styles.sectionLabel}>// Global Reach</div>
          <h2 style={{ ...styles.sectionTitle, marginBottom: 16 }}>Connected Across<br />Every Major Market</h2>
          <p style={styles.sectionSub}>
            Our network spans key trade hubs across Asia, Europe, the Americas and beyond — with Suzhou at the center.
          </p>
          <NetworkMap />
        </div>

        <div style={styles.divider} />

        {/* CONTACT CTA */}
        <div id="contact" style={{ ...styles.section, textAlign: "center" }}>
          <div style={styles.sectionLabel}>// Get In Touch</div>
          <h2 style={{ ...styles.sectionTitle, marginBottom: 20 }}>Ready to Move<br />Your Trade Forward?</h2>
          <p style={{ ...styles.sectionSub, margin: "0 auto 48px" }}>
            Whether you&apos;re entering China or expanding globally, our team is ready to build your strategy.
          </p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap", marginBottom: 40 }}>
            <button className="btn-primary" style={{ ...styles.btnPrimary, padding: "16px 48px", fontSize: 14 }}>
              Book a Free Consultation
            </button>
            <button style={{ ...styles.btnOutline, padding: "16px 48px", fontSize: 14 }}>
              info@tradevorex.com
            </button>
          </div>
          <div style={{ fontSize: 13, color: "rgba(245,245,245,0.3)", letterSpacing: "0.08em" }}>
            Suzhou Industrial Park · Jiangsu, China · +86 512 XXXX XXXX
          </div>
        </div>

        {/* FOOTER */}
        <footer style={styles.footer}>
          <div style={styles.footerLogo}>
            TRADE<span style={{ color: "#FF6B2B" }}>VOREX</span>
          </div>
          <div style={styles.footerText}>
            苏州智贸通贸易咨询服务有限公司 &nbsp;·&nbsp; Suzhou Tradevorex Consulting Co., Ltd.
          </div>
          <div style={styles.footerText}>
            © 2026 Tradevorex. All rights reserved.
          </div>
        </footer>
      </div>
    </>
  );
}
