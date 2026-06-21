"use client";

import { useState, useEffect, useRef } from "react";

/* ── Custom Cursor ─────────────────────────────────────────── */
function CustomCursor() {
  const dotRef  = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const mouse   = useRef({ x: -200, y: -200 });
  const ring    = useRef({ x: -200, y: -200 });
  const scale   = useRef(1);
  const dotScale = useRef(1);
  const raf     = useRef(0);

  useEffect(() => {
    const onMove = (e: MouseEvent) => { mouse.current = { x: e.clientX, y: e.clientY }; };
    const onOver = (e: MouseEvent) => {
      const hovering = !!(e.target as HTMLElement).closest("a, button, [role='button'], input, select, label, [style*='cursor: pointer']");
      (onOver as any)._hover = hovering;
    };
    (onOver as any)._hover = false;
    const tick = () => {
      const hov: boolean = (onOver as any)._hover;
      ring.current.x  += (mouse.current.x - ring.current.x) * 0.12;
      ring.current.y  += (mouse.current.y - ring.current.y) * 0.12;
      scale.current    += ((hov ? 1.9 : 1) - scale.current) * 0.14;
      dotScale.current += ((hov ? 0.4 : 1) - dotScale.current) * 0.14;
      if (dotRef.current)
        dotRef.current.style.transform = `translate(${mouse.current.x}px,${mouse.current.y}px) translate(-50%,-50%) scale(${dotScale.current.toFixed(3)})`;
      if (ringRef.current)
        ringRef.current.style.transform = `translate(${ring.current.x.toFixed(2)}px,${ring.current.y.toFixed(2)}px) translate(-50%,-50%) scale(${scale.current.toFixed(3)})`;
      raf.current = requestAnimationFrame(tick);
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    raf.current = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  const base: React.CSSProperties = { position: "fixed", top: 0, left: 0, pointerEvents: "none", willChange: "transform" };
  return (
    <>
      <div ref={dotRef} style={{ ...base, width: 8, height: 8, borderRadius: "50%", background: "#FF6B2B", zIndex: 99999 }} />
      <div ref={ringRef} style={{ ...base, width: 34, height: 34, borderRadius: "50%", border: "1.5px solid rgba(255,107,43,0.65)", zIndex: 99998 }} />
    </>
  );
}

/* ── Data ──────────────────────────────────────────────────── */
const NAV_LINKS = ["Services", "About", "Global Reach", "Contact"];

const SERVICES = [
  { num: "01", title: "China Market Entry",   detail: "WFOE · JV · RO Setup",          desc: "Navigate regulatory frameworks, supplier networks, and market positioning for foreign businesses entering China." },
  { num: "02", title: "Export Consulting",    detail: "Export License · HS Code",       desc: "Strategic guidance for Chinese enterprises expanding into global markets with compliance and trade documentation." },
  { num: "03", title: "Trade Compliance",     detail: "Customs · Tariffs · OFAC",       desc: "End-to-end compliance management including customs, tariffs, and international trade law advisory." },
  { num: "04", title: "Supply Chain",         detail: "YRD Sourcing · Logistics",       desc: "Optimise sourcing, logistics, and supplier relationships across the Yangtze River Delta and beyond." },
  { num: "05", title: "Business Formation",   detail: "Suzhou FTZ · Registration",      desc: "Complete setup support for WFOEs, joint ventures, and representative offices in Suzhou and greater China." },
  { num: "06", title: "Market Intelligence",  detail: "Analytics · Competitor Intel",   desc: "Data-driven insights on sector trends, competitor landscapes, and trade opportunity mapping." },
];

const STATS = [
  { value: 200, suffix: "+", label: "Clients Served" },
  { value: 40,  suffix: "+", label: "Countries Reached" },
  { value: 98,  suffix: "%", label: "Success Rate" },
  { value: 12,  suffix: "+", label: "Years Experience" },
];

const WHY_US = [
  { title: "Local Knowledge",    desc: "Deep roots in Suzhou's business and regulatory ecosystem" },
  { title: "Global Network",     desc: "Active connections across 40+ trade markets worldwide" },
  { title: "Full-Cycle Support", desc: "From strategy through execution and compliance" },
  { title: "Bilingual Expertise",desc: "Chinese and English advisory with no communication gaps" },
];

/* ── NetworkMap constants ──────────────────────────────────── */
const HQ_X = 50, HQ_Y = 57, ARC_R = 44, VB_H = 62;

const CITY_DATA = [
  { label: "São Paulo", region: "Americas",    info: "Latin American Hub",    specialty: "Agriculture, energy commodities & emerging-market consumer goods", angle: 170 },
  { label: "London",    region: "Europe",      info: "UK Financial Centre",   specialty: "Financial services, luxury goods & pharmaceutical imports",        angle: 151.25 },
  { label: "Frankfurt", region: "Europe",      info: "EU Trade Gateway",      specialty: "Automotive components, industrial equipment & machinery",           angle: 132.5 },
  { label: "Dubai",     region: "Middle East", info: "MENA Logistics Hub",    specialty: "Re-export logistics, electronics & building materials",             angle: 113.75 },
  { label: "New York",  region: "Americas",    info: "North American Markets",specialty: "Consumer electronics, apparel & precision instruments",             angle: 95 },
  { label: "Seoul",     region: "Asia-Pacific",info: "Northeast Asia",        specialty: "Semiconductor materials, EV battery components & display panels",   angle: 76.25 },
  { label: "Tokyo",     region: "Asia-Pacific",info: "Japan Markets",         specialty: "Precision manufacturing, robotics & specialty chemicals",           angle: 57.5 },
  { label: "Singapore", region: "Asia-Pacific",info: "Southeast Asian Hub",   specialty: "Port logistics, commodities trading & financial clearance",         angle: 38.75 },
  { label: "Sydney",    region: "Oceania",     info: "Australia & New Zealand",specialty: "Mining exports, agricultural commodities & education services",   angle: 20 },
];

function arcPos(angle: number) {
  const rad = (angle * Math.PI) / 180;
  return {
    x: parseFloat((HQ_X + ARC_R * Math.cos(rad)).toFixed(2)),
    y: parseFloat((HQ_Y - ARC_R * Math.sin(rad)).toFixed(2)),
  };
}

/* ── AnimatedNumber ────────────────────────────────────────── */
function AnimatedNumber({ target, suffix, active }: { target: number; suffix: string; active: boolean }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) return;
    const duration = 1600;
    const startTime = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setCount(Math.round(eased * target));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [active, target]);
  return <>{count}{suffix}</>;
}

/* ── VortexCanvas ──────────────────────────────────────────── */
function VortexCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef   = useRef<number>(0);
  const tRef      = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width  = canvas.offsetWidth  * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      const w = canvas.offsetWidth, h = canvas.offsetHeight;
      ctx.clearRect(0, 0, w, h);
      const cx = w / 2, cy = h / 2;
      const t = (tRef.current += 0.007);

      for (let arm = 0; arm < 3; arm++) {
        const off = (arm * Math.PI * 2) / 3;
        ctx.beginPath();
        for (let i = 0; i < 220; i++) {
          const r = i * 1.5;
          const angle = i * 0.078 + off + t;
          const x = cx + r * Math.cos(angle);
          const y = cy + r * Math.sin(angle);
          i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }
        const grad = ctx.createLinearGradient(cx - 100, cy, cx + 100, cy);
        grad.addColorStop(0, "rgba(255,107,43,0.95)");
        grad.addColorStop(0.5, "rgba(255,160,80,0.55)");
        grad.addColorStop(1, "rgba(255,107,43,0)");
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.8;
        ctx.stroke();
      }

      for (let i = 0; i < 55; i++) {
        const angle  = (i / 55) * Math.PI * 2 + t * (i % 3 === 0 ? 1.3 : 0.7);
        const radius = 50 + (i % 6) * 28 + Math.sin(t * 1.5 + i) * 12;
        const x = cx + radius * Math.cos(angle);
        const y = cy + radius * Math.sin(angle);
        const alpha = 0.25 + 0.45 * Math.sin(t * 2.2 + i);
        ctx.beginPath();
        ctx.arc(x, y, i % 7 === 0 ? 2.8 : 1.4, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,${100 + (i % 4) * 15},43,${alpha})`;
        ctx.fill();
      }

      const glow = ctx.createRadialGradient(cx, cy, 0, cx, cy, 80);
      glow.addColorStop(0, "rgba(255,107,43,0.3)");
      glow.addColorStop(0.5, "rgba(255,107,43,0.08)");
      glow.addColorStop(1, "rgba(255,107,43,0)");
      ctx.beginPath();
      ctx.arc(cx, cy, 80, 0, Math.PI * 2);
      ctx.fillStyle = glow;
      ctx.fill();

      ctx.beginPath();
      ctx.arc(cx, cy, 5, 0, Math.PI * 2);
      ctx.fillStyle = "#FF6B2B";
      ctx.fill();

      animRef.current = requestAnimationFrame(draw);
    };

    draw();
    return () => { cancelAnimationFrame(animRef.current); window.removeEventListener("resize", resize); };
  }, []);

  return <canvas ref={canvasRef} style={{ width: "100%", height: "100%", display: "block" }} />;
}

/* ── NetworkMap ────────────────────────────────────────────── */
function NetworkMap() {
  const [hovered, setHovered]   = useState<number | null>(null);
  const [selected, setSelected] = useState<number | null>(null);
  const arcStart = arcPos(170);
  const arcEnd   = arcPos(20);

  return (
    <div>
      <div style={{ position: "relative", width: "100%", paddingBottom: `${VB_H}%`, background: "rgba(3,6,18,0.9)", borderRadius: 16, border: "1px solid rgba(255,107,43,0.18)", overflow: "hidden", boxShadow: "0 0 60px rgba(255,107,43,0.06), inset 0 1px 0 rgba(255,255,255,0.04)" }}>
        <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} viewBox={`0 0 100 ${VB_H}`} preserveAspectRatio="xMidYMid meet">
          <defs>
            <radialGradient id="hq-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgba(255,107,43,0.4)" />
              <stop offset="100%" stopColor="rgba(255,107,43,0)" />
            </radialGradient>
            <radialGradient id="map-bg" cx="50%" cy="50%" r="70%">
              <stop offset="0%" stopColor="rgba(255,107,43,0.03)" />
              <stop offset="100%" stopColor="rgba(0,0,0,0)" />
            </radialGradient>
          </defs>

          <rect width="100" height={VB_H} fill="url(#map-bg)" />

          {[10,20,30,40,50,60,70,80,90].map((x) => (
            <line key={`gx${x}`} x1={x} y1="0" x2={x} y2={VB_H} stroke="rgba(255,107,43,0.05)" strokeWidth="0.2" />
          ))}
          {[10,20,30,40,50].map((y) => (
            <line key={`gy${y}`} x1="0" y1={y} x2="100" y2={y} stroke="rgba(255,107,43,0.05)" strokeWidth="0.2" />
          ))}

          <path d={`M ${arcStart.x} ${arcStart.y} A ${ARC_R} ${ARC_R} 0 0 0 ${arcEnd.x} ${arcEnd.y}`}
            fill="none" stroke="rgba(255,107,43,0.14)" strokeWidth="0.4" strokeDasharray="1.2 0.7" />

          {CITY_DATA.map((city, i) => {
            const pos = arcPos(city.angle);
            const isActive = hovered === i || selected === i;
            return (
              <line key={i} x1={HQ_X} y1={HQ_Y} x2={pos.x} y2={pos.y}
                stroke={isActive ? "rgba(255,107,43,0.8)" : "rgba(255,107,43,0.2)"}
                strokeWidth={isActive ? "0.7" : "0.3"}
                strokeDasharray={isActive ? "2 0.8" : "1.5 1"}
                style={{ transition: "stroke 0.25s, stroke-width 0.25s" }}
              />
            );
          })}

          {CITY_DATA.map((city, i) => {
            const pos = arcPos(city.angle);
            const dur = (1.5 + (i % 5) * 0.28).toFixed(2);
            const begin = (i * 0.22).toFixed(2);
            const isActive = hovered === i || selected === i;
            return (
              <circle key={i} r={isActive ? "1.2" : "0.8"} fill={isActive ? "#ffaa77" : "#FF6B2B"}>
                <animateMotion dur={`${dur}s`} begin={`${begin}s`} repeatCount="indefinite" path={`M${HQ_X},${HQ_Y} L${pos.x},${pos.y}`} />
                <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.06;0.88;1" dur={`${dur}s`} begin={`${begin}s`} repeatCount="indefinite" />
              </circle>
            );
          })}

          {CITY_DATA.map((city, i) => {
            const pos = arcPos(city.angle);
            const isActive = hovered === i || selected === i;
            return (
              <g key={i} onMouseEnter={() => setHovered(i)} onMouseLeave={() => setHovered(null)}
                onClick={() => setSelected((s) => (s === i ? null : i))} style={{ cursor: "pointer" }}>
                {isActive && (
                  <circle cx={pos.x} cy={pos.y} r="5" fill="none" stroke="rgba(255,107,43,0.45)" strokeWidth="0.4">
                    <animate attributeName="r" values="4;7;4" dur="1.8s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.9;0.1;0.9" dur="1.8s" repeatCount="indefinite" />
                  </circle>
                )}
                <circle cx={pos.x} cy={pos.y} r={isActive ? "3.2" : "2.6"}
                  fill={isActive ? "#FF6B2B" : "rgba(255,107,43,0.55)"}
                  style={{ transition: "r 0.2s, fill 0.2s" }}
                />
                <text x={pos.x} y={pos.y - 4.5} textAnchor="middle" fontSize="2.4"
                  fontWeight={isActive ? "700" : "500"}
                  fill={isActive ? "#FFFFFF" : "rgba(245,245,245,0.7)"}
                  fontFamily="'Barlow Condensed', sans-serif"
                  style={{ transition: "fill 0.2s" }}>
                  {city.label}
                </text>
              </g>
            );
          })}

          <circle cx={HQ_X} cy={HQ_Y} r="14" fill="url(#hq-glow)" />
          <circle cx={HQ_X} cy={HQ_Y} r="8" fill="none" stroke="rgba(255,107,43,0.25)" strokeWidth="0.45">
            <animate attributeName="r" values="8;14;8" dur="2.8s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.8;0;0.8" dur="2.8s" repeatCount="indefinite" />
          </circle>
          <circle cx={HQ_X} cy={HQ_Y} r="6" fill="none" stroke="rgba(255,107,43,0.35)" strokeWidth="0.4">
            <animate attributeName="r" values="6;10;6" dur="2.8s" begin="0.9s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.8;0;0.8" dur="2.8s" begin="0.9s" repeatCount="indefinite" />
          </circle>
          <circle cx={HQ_X} cy={HQ_Y} r="5.2" fill="#FF6B2B" />
          <circle cx={HQ_X} cy={HQ_Y} r="2.8" fill="rgba(255,210,175,0.6)" />
          <text x={HQ_X} y={HQ_Y - 7.5} textAnchor="middle" fontSize="2.7" fontWeight="700"
            fill="rgba(255,255,255,0.95)" fontFamily="'Barlow Condensed', sans-serif">
            Suzhou HQ
          </text>
        </svg>

        {hovered !== null && (() => {
          const pos  = arcPos(CITY_DATA[hovered].angle);
          const city = CITY_DATA[hovered];
          return (
            <div style={{
              position: "absolute",
              left: `${pos.x}%`,
              top: `${(pos.y / VB_H) * 100}%`,
              transform: "translate(-50%, -155%)",
              background: "rgba(4,8,20,0.97)",
              border: "1px solid rgba(255,107,43,0.55)",
              padding: "12px 18px",
              pointerEvents: "none",
              zIndex: 20,
              minWidth: 150,
              backdropFilter: "blur(12px)",
              borderRadius: 8,
              boxShadow: "0 8px 32px rgba(0,0,0,0.6), 0 0 16px rgba(255,107,43,0.12)",
            }}>
              <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#FFFFFF", marginBottom: 3 }}>{city.label}</div>
              <div style={{ fontSize: 10, color: "#FF6B2B", letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: 4 }}>{city.region}</div>
              <div style={{ fontSize: 10, color: "rgba(245,245,245,0.4)", letterSpacing: "0.06em" }}>Click to explore →</div>
            </div>
          );
        })()}
      </div>

      {selected !== null && (() => {
        const city = CITY_DATA[selected];
        return (
          <div key={selected} style={{
            marginTop: 16,
            background: "rgba(4,8,22,0.95)",
            border: "1px solid rgba(255,107,43,0.35)",
            padding: "24px 32px",
            display: "flex",
            alignItems: "flex-start",
            gap: 32,
            flexWrap: "wrap",
            borderRadius: 12,
            backdropFilter: "blur(12px)",
            boxShadow: "0 0 40px rgba(255,107,43,0.08)",
            animation: "fadeUp 0.28s ease",
          }}>
            <div style={{ minWidth: 140 }}>
              <div style={{ fontSize: 10, color: "#FF6B2B", letterSpacing: "0.22em", textTransform: "uppercase", marginBottom: 6 }}>{city.region}</div>
              <div style={{ fontSize: 24, fontWeight: 800, letterSpacing: "0.03em", textTransform: "uppercase", marginBottom: 4 }}>{city.label}</div>
              <div style={{ fontSize: 11, color: "rgba(245,245,245,0.35)", letterSpacing: "0.06em" }}>{city.info}</div>
            </div>
            <div style={{ flex: 1, minWidth: 200, borderLeft: "1px solid rgba(255,107,43,0.18)", paddingLeft: 32 }}>
              <div style={{ fontSize: 10, color: "rgba(245,245,245,0.35)", letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: 8 }}>Trade Speciality</div>
              <div style={{ fontSize: 14, color: "rgba(245,245,245,0.85)", lineHeight: 1.75 }}>{city.specialty}</div>
            </div>
            <button onClick={() => setSelected(null)} style={{
              background: "none", border: "1px solid rgba(255,107,43,0.25)",
              color: "rgba(245,245,245,0.45)", cursor: "pointer",
              fontSize: 11, padding: "8px 16px", fontFamily: "inherit",
              letterSpacing: "0.12em", textTransform: "uppercase",
              borderRadius: 6, flexShrink: 0, transition: "all 0.2s",
            }}
              onMouseEnter={(e) => { const t = e.currentTarget; t.style.borderColor = "rgba(255,107,43,0.7)"; t.style.color = "#F5F5F5"; }}
              onMouseLeave={(e) => { const t = e.currentTarget; t.style.borderColor = "rgba(255,107,43,0.25)"; t.style.color = "rgba(245,245,245,0.45)"; }}>
              Close ×
            </button>
          </div>
        );
      })()}

      <div style={{ marginTop: 20, display: "flex", flexWrap: "wrap", gap: 8 }}>
        {CITY_DATA.map((city, i) => (
          <button key={i}
            onClick={() => setSelected((s) => (s === i ? null : i))}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            style={{
              background: selected === i ? "rgba(255,107,43,0.2)" : "rgba(255,107,43,0.05)",
              border: `1px solid ${selected === i ? "rgba(255,107,43,0.7)" : "rgba(255,107,43,0.15)"}`,
              color: selected === i ? "#FF6B2B" : "rgba(245,245,245,0.5)",
              padding: "6px 16px", fontSize: 11, fontWeight: 600,
              letterSpacing: "0.12em", textTransform: "uppercase",
              cursor: "pointer", fontFamily: "inherit",
              borderRadius: 6, transition: "all 0.2s",
            }}>
            {city.label}
          </button>
        ))}
      </div>
    </div>
  );
}

/* ── Contact Modal ─────────────────────────────────────────── */
function ContactModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [sent, setSent]     = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError]   = useState("");

  useEffect(() => {
    if (!open) { setSent(false); setError(""); setForm({ name: "", email: "", phone: "", message: "" }); }
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((p) => ({ ...p, [k]: e.target.value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Send failed");
      setSent(true);
    } catch {
      setError("Something went wrong. Please try again or email us directly.");
    } finally {
      setSending(false);
    }
  };

  const inputStyle: React.CSSProperties = {
    width: "100%", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,107,43,0.2)",
    borderRadius: 8, padding: "14px 16px", color: "#F5F5F5",
    fontSize: 14, fontFamily: "inherit", outline: "none",
    transition: "border-color 0.2s",
  };
  const labelStyle: React.CSSProperties = {
    fontSize: 10, fontWeight: 700, letterSpacing: "0.22em",
    textTransform: "uppercase", color: "rgba(245,245,245,0.4)", marginBottom: 8, display: "block",
  };

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.75)", zIndex: 9000, backdropFilter: "blur(6px)" }}
      />
      {/* Panel */}
      <div style={{
        position: "fixed", top: "50%", left: "50%", transform: "translate(-50%,-50%)",
        zIndex: 9001, width: "min(520px, 94vw)",
        background: "rgba(5,9,20,0.98)", border: "1px solid rgba(255,107,43,0.3)",
        borderRadius: 20, padding: "44px 40px 40px",
        boxShadow: "0 40px 100px rgba(0,0,0,0.7), 0 0 40px rgba(255,107,43,0.08)",
      }}>
        {/* Close */}
        <button
          onClick={onClose}
          style={{ position: "absolute", top: 18, right: 20, background: "none", border: "none", color: "rgba(245,245,245,0.4)", fontSize: 22, cursor: "pointer", lineHeight: 1, fontFamily: "inherit", transition: "color 0.2s" }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#F5F5F5")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(245,245,245,0.4)")}
        >×</button>

        {/* Orange top accent */}
        <div style={{ position: "absolute", top: 0, left: 40, right: 40, height: 3, background: "linear-gradient(90deg, #FF6B2B, rgba(255,107,43,0))", borderRadius: "0 0 4px 4px" }} />

        {!sent ? (
          <>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.28em", textTransform: "uppercase", color: "#FF6B2B", marginBottom: 10 }}>// Get In Touch</div>
            <h2 style={{ fontSize: "clamp(22px, 3vw, 30px)", fontWeight: 900, textTransform: "uppercase", letterSpacing: "-0.01em", margin: "0 0 28px", lineHeight: 1.1 }}>
              Book a Free<br />
              <span style={{ background: "linear-gradient(135deg, #FF6B2B, #FFB347)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Consultation</span>
            </h2>

            <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: 18 }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                <div>
                  <label style={labelStyle}>Full Name *</label>
                  <input
                    required value={form.name} onChange={set("name")} placeholder="Your name"
                    style={inputStyle}
                    onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(255,107,43,0.6)")}
                    onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(255,107,43,0.2)")}
                  />
                </div>
                <div>
                  <label style={labelStyle}>Phone Number</label>
                  <input
                    type="tel" value={form.phone} onChange={set("phone")} placeholder="+1 234 567 890"
                    style={inputStyle}
                    onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(255,107,43,0.6)")}
                    onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(255,107,43,0.2)")}
                  />
                </div>
              </div>

              <div>
                <label style={labelStyle}>Email Address *</label>
                <input
                  required type="email" value={form.email} onChange={set("email")} placeholder="you@company.com"
                  style={inputStyle}
                  onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(255,107,43,0.6)")}
                  onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(255,107,43,0.2)")}
                />
              </div>

              <div>
                <label style={labelStyle}>Message *</label>
                <textarea
                  required value={form.message} onChange={set("message")}
                  placeholder="Tell us about your trade goals or requirements…"
                  rows={4}
                  style={{ ...inputStyle, resize: "vertical", minHeight: 110 }}
                  onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(255,107,43,0.6)")}
                  onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(255,107,43,0.2)")}
                />
              </div>

              {error && (
                <div style={{ background: "rgba(255,60,60,0.1)", border: "1px solid rgba(255,60,60,0.3)", borderRadius: 8, padding: "12px 16px", fontSize: 13, color: "#ff8080" }}>
                  {error}
                </div>
              )}

              <button
                type="submit" disabled={sending}
                style={{
                  background: sending ? "rgba(255,107,43,0.6)" : "#FF6B2B",
                  color: "#050914", border: "none", borderRadius: 8,
                  padding: "15px 32px", fontSize: 13, fontWeight: 700,
                  letterSpacing: "0.18em", textTransform: "uppercase",
                  cursor: sending ? "default" : "pointer", fontFamily: "inherit",
                  transition: "background 0.2s, transform 0.2s",
                  marginTop: 4,
                }}
                onMouseEnter={(e) => { if (!sending) e.currentTarget.style.background = "#ff8a55"; }}
                onMouseLeave={(e) => { if (!sending) e.currentTarget.style.background = "#FF6B2B"; }}
              >
                {sending ? "Sending…" : "Send Message →"}
              </button>

              <p style={{ fontSize: 11, color: "rgba(245,245,245,0.25)", textAlign: "center", margin: 0, letterSpacing: "0.04em" }}>
                We typically respond within 24 hours.
              </p>
            </form>
          </>
        ) : (
          <div style={{ textAlign: "center", padding: "24px 0" }}>
            <div style={{ fontSize: 48, marginBottom: 20 }}>✓</div>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.28em", textTransform: "uppercase", color: "#FF6B2B", marginBottom: 12 }}>Message Sent</div>
            <h3 style={{ fontSize: 24, fontWeight: 900, textTransform: "uppercase", margin: "0 0 16px" }}>Thank You, {form.name || "there"}!</h3>
            <p style={{ fontSize: 14, color: "rgba(245,245,245,0.5)", lineHeight: 1.7, maxWidth: 320, margin: "0 auto 32px" }}>
              We&apos;ve received your enquiry and will be in touch within 24 hours.
            </p>
            <button
              onClick={onClose}
              style={{ background: "rgba(255,107,43,0.12)", border: "1px solid rgba(255,107,43,0.35)", color: "#FF6B2B", borderRadius: 8, padding: "12px 28px", fontSize: 12, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", cursor: "pointer", fontFamily: "inherit" }}
            >
              Close
            </button>
          </div>
        )}
      </div>
    </>
  );
}

/* ── Main Component ────────────────────────────────────────── */
export default function TradevorexHome() {
  const [scrolled, setScrolled]     = useState(false);
  const [visibleStats, setVisibleStats] = useState(false);
  const [modalOpen, setModalOpen]   = useState(false);
  const statsRef   = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed]     = useState<Set<number>>(new Set());
  const revealRefs = useRef<(Element | null)[]>([]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisibleStats(true); },
      { threshold: 0.2 }
    );
    if (statsRef.current) obs.observe(statsRef.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const idx = revealRefs.current.indexOf(entry.target);
          if (idx !== -1) setRevealed((prev) => { const s = new Set(prev); s.add(idx); return s; });
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });

    revealRefs.current.forEach((el) => { if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);

  const revealRef = (idx: number) => (el: Element | null) => {
    revealRefs.current[idx] = el;
  };

  const revealStyle = (idx: number, delay = 0): React.CSSProperties => ({
    opacity: revealed.has(idx) ? 1 : 0,
    transform: revealed.has(idx) ? "translateY(0)" : "translateY(36px)",
    transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
  });

  return (
    <>
      <CustomCursor />
      <ContactModal open={modalOpen} onClose={() => setModalOpen(false)} />
      <style suppressHydrationWarning>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { background: #050914; }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes blob1 {
          0%,100% { transform: translate(0,0) scale(1); }
          33%      { transform: translate(30px,-20px) scale(1.08); }
          66%      { transform: translate(-20px,15px) scale(0.94); }
        }
        @keyframes blob2 {
          0%,100% { transform: translate(0,0) scale(1); }
          33%      { transform: translate(-25px,18px) scale(1.05); }
          66%      { transform: translate(20px,-10px) scale(0.96); }
        }
        @keyframes gradShift {
          0%   { background-position: 0% 50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes borderPulse {
          0%,100% { opacity: 0.4; }
          50%      { opacity: 1; }
        }
        @keyframes spin { to { transform: rotate(360deg); } }

        .nav-link:hover { color: #FF6B2B !important; }
        .cta-btn:hover  { background: rgba(255,107,43,0.18) !important; color: #FF6B2B !important; }

        .service-card {
          position: relative;
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,107,43,0.1);
          border-radius: 16px;
          padding: 36px 32px 32px;
          overflow: hidden;
          transition: transform 0.35s ease, border-color 0.35s ease, background 0.35s ease, box-shadow 0.35s ease;
          cursor: default;
        }
        .service-card::before {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: 16px;
          background: linear-gradient(135deg, rgba(255,107,43,0.08) 0%, transparent 60%);
          opacity: 0;
          transition: opacity 0.35s ease;
        }
        .service-card:hover {
          transform: translateY(-6px);
          border-color: rgba(255,107,43,0.45);
          background: rgba(255,107,43,0.04);
          box-shadow: 0 20px 60px rgba(0,0,0,0.5), 0 0 30px rgba(255,107,43,0.08);
        }
        .service-card:hover::before { opacity: 1; }
        .service-card:hover .svc-num { color: rgba(255,107,43,0.25); }
        .service-card:hover .svc-bar { transform: scaleX(1); }
        .service-card:hover .svc-detail { opacity: 1; transform: translateY(0); }

        .svc-num {
          position: absolute; top: 20px; right: 24px;
          font-size: 64px; font-weight: 900;
          color: rgba(255,255,255,0.04);
          letter-spacing: -0.04em;
          transition: color 0.35s ease;
          line-height: 1;
          user-select: none;
          font-family: 'Barlow Condensed', sans-serif;
        }
        .svc-bar {
          position: absolute; top: 0; left: 0; right: 0; height: 3px;
          background: linear-gradient(90deg, #FF6B2B, rgba(255,107,43,0));
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.4s cubic-bezier(0.22,1,0.36,1);
          border-radius: 16px 16px 0 0;
        }
        .svc-detail {
          font-size: 10px; font-weight: 600;
          letter-spacing: 0.2em; text-transform: uppercase;
          color: #FF6B2B;
          margin-top: 20px;
          opacity: 0;
          transform: translateY(6px);
          transition: opacity 0.3s ease 0.05s, transform 0.3s ease 0.05s;
        }

        .btn-primary {
          background: #FF6B2B; color: #050914;
          border: none; padding: 16px 40px;
          font-size: 13px; font-weight: 700;
          letter-spacing: 0.15em; text-transform: uppercase;
          cursor: pointer; font-family: inherit;
          clip-path: polygon(12px 0%, 100% 0%, calc(100% - 12px) 100%, 0% 100%);
          transition: background 0.2s, transform 0.2s;
        }
        .btn-primary:hover { background: #ff8a55; transform: translateY(-2px); }

        .btn-outline {
          background: transparent; color: rgba(245,245,245,0.8);
          border: 1px solid rgba(245,245,245,0.2); padding: 16px 40px;
          font-size: 13px; font-weight: 600;
          letter-spacing: 0.15em; text-transform: uppercase;
          cursor: pointer; font-family: inherit;
          border-radius: 4px;
          transition: border-color 0.2s, color 0.2s, transform 0.2s;
        }
        .btn-outline:hover { border-color: rgba(255,107,43,0.5); color: #FF6B2B; transform: translateY(-2px); }

        .stat-item { transition: transform 0.3s ease; }
        .stat-item:hover { transform: scale(1.04); }

        .why-item {
          display: flex; gap: 18px; align-items: flex-start;
          padding: 20px 0;
          border-bottom: 1px solid rgba(255,107,43,0.07);
          transition: background 0.2s;
        }
        .why-item:last-child { border-bottom: none; }

        @media (max-width: 900px) {
          .nav-links   { display: none !important; }
          .about-grid  { grid-template-columns: 1fr !important; }
          .stats-grid  { grid-template-columns: repeat(2, 1fr) !important; }
          .hero-btns   { flex-direction: column; align-items: center; }
        }
        @media (max-width: 600px) {
          .services-grid { grid-template-columns: 1fr !important; }
          .stats-grid    { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <div style={{ fontFamily: "'Barlow Condensed', 'Barlow', sans-serif", background: "#050914", color: "#F5F5F5", minHeight: "100vh", overflowX: "hidden" }}>

        {/* ── NAV ── */}
        <nav style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "0 5vw", height: 66,
          background: scrolled ? "rgba(5,9,20,0.92)" : "transparent",
          backdropFilter: scrolled ? "blur(16px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(255,107,43,0.12)" : "none",
          transition: "all 0.4s ease",
        }}>
          <div style={{ fontSize: 22, fontWeight: 800, letterSpacing: "0.14em", textTransform: "uppercase" }}>
            TRADE<span style={{ color: "#FF6B2B" }}>VOREX</span>
          </div>
          <ul className="nav-links" style={{ display: "flex", gap: 40, listStyle: "none", margin: 0, padding: 0 }}>
            {NAV_LINKS.map((l) => (
              <li key={l}>
                <a className="nav-link" style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(245,245,245,0.6)", cursor: "pointer", transition: "color 0.2s", textDecoration: "none" }}
                  href={`#${l.toLowerCase().replace(/\s+/g, "-")}`}>{l}</a>
              </li>
            ))}
          </ul>
          <button className="cta-btn" onClick={() => setModalOpen(true)} style={{
            background: "transparent", border: "1px solid rgba(255,107,43,0.5)",
            color: "rgba(245,245,245,0.85)", padding: "9px 22px",
            fontSize: 11, fontWeight: 700, letterSpacing: "0.18em",
            textTransform: "uppercase", cursor: "pointer", fontFamily: "inherit",
            borderRadius: 4, transition: "all 0.2s",
          }}>Get Started</button>
        </nav>

        {/* ── HERO ── */}
        <section style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", padding: "120px 5vw 80px", textAlign: "center", overflow: "hidden" }}>
          {/* Blob gradients */}
          <div style={{ position: "absolute", inset: 0, overflow: "hidden", zIndex: 0 }}>
            <div style={{ position: "absolute", width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle, rgba(255,107,43,0.12) 0%, transparent 70%)", top: "10%", left: "20%", animation: "blob1 14s ease-in-out infinite" }} />
            <div style={{ position: "absolute", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(255,107,43,0.07) 0%, transparent 70%)", bottom: "15%", right: "15%", animation: "blob2 18s ease-in-out infinite" }} />
          </div>

          {/* VortexCanvas */}
          <div style={{ position: "absolute", inset: 0, zIndex: 1 }}>
            <VortexCanvas />
          </div>

          {/* Dot grid overlay */}
          <div style={{
            position: "absolute", inset: 0, zIndex: 2, pointerEvents: "none",
            backgroundImage: "radial-gradient(circle, rgba(255,107,43,0.15) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
            maskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%)",
            WebkitMaskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%)",
          }} />

          <div style={{ position: "relative", zIndex: 3, maxWidth: 960 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 11, fontWeight: 700, letterSpacing: "0.28em", textTransform: "uppercase", color: "#FF6B2B", border: "1px solid rgba(255,107,43,0.35)", padding: "7px 20px", marginBottom: 36, borderRadius: 40, background: "rgba(255,107,43,0.06)", backdropFilter: "blur(8px)", animation: "fadeUp 0.8s ease forwards" }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#FF6B2B", display: "inline-block", animation: "borderPulse 2s ease infinite" }} />
              Suzhou · China · Global Trade Consulting
            </div>

            <h1 style={{ fontSize: "clamp(48px, 10vw, 104px)", fontWeight: 900, lineHeight: 0.92, letterSpacing: "-0.02em", textTransform: "uppercase", margin: "0 0 28px", animation: "fadeUp 0.9s ease 0.1s both" }}>
              The Force Behind
              <span style={{ display: "block", background: "linear-gradient(135deg, #FF6B2B 0%, #FFB347 50%, #FF6B2B 100%)", backgroundSize: "200% 200%", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", animation: "gradShift 4s ease infinite" }}>
                Global Trade
              </span>
            </h1>

            <p style={{ fontSize: "clamp(15px, 2.2vw, 19px)", color: "rgba(245,245,245,0.55)", maxWidth: 580, margin: "0 auto 48px", lineHeight: 1.65, letterSpacing: "0.02em", fontWeight: 400, animation: "fadeUp 1s ease 0.2s both" }}>
              Suzhou Tradevorex connects Chinese enterprises with global markets — and the world with China. Precision consulting. Measurable results.
            </p>

            <div className="hero-btns" style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap", animation: "fadeUp 1s ease 0.3s both" }}>
              <button className="btn-primary" onClick={() => setModalOpen(true)}>Start Consulting</button>
              <button className="btn-outline">Our Services ↓</button>
            </div>

            {/* Floating stat chips */}
            <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", marginTop: 48, animation: "fadeUp 1s ease 0.45s both" }}>
              {["200+ Clients", "40+ Countries", "12+ Years"].map((t) => (
                <div key={t} style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(245,245,245,0.45)", border: "1px solid rgba(255,255,255,0.08)", padding: "6px 16px", borderRadius: 40, background: "rgba(255,255,255,0.03)", backdropFilter: "blur(8px)" }}>
                  {t}
                </div>
              ))}
            </div>
          </div>

          {/* Scroll indicator */}
          <div style={{ position: "absolute", bottom: 40, left: "50%", transform: "translateX(-50%)", zIndex: 4, display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
            <div style={{ width: 1, height: 52, background: "linear-gradient(180deg, rgba(255,107,43,0.8), transparent)" }} />
            <span style={{ fontSize: 9, letterSpacing: "0.28em", textTransform: "uppercase", color: "rgba(245,245,245,0.28)" }}>Scroll</span>
          </div>
        </section>

        {/* ── STATS ── */}
        <div ref={statsRef} style={{ background: "rgba(255,107,43,0.04)", borderTop: "1px solid rgba(255,107,43,0.1)", borderBottom: "1px solid rgba(255,107,43,0.1)" }}>
          <div className="stats-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", maxWidth: "100%" }}>
            {STATS.map((s, i) => (
              <div key={i} className="stat-item" style={{ padding: "52px 32px", textAlign: "center", borderRight: i < 3 ? "1px solid rgba(255,107,43,0.08)" : "none", position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", bottom: 0, left: "50%", transform: "translateX(-50%)", width: visibleStats ? "60%" : "0%", height: 2, background: "linear-gradient(90deg, transparent, #FF6B2B, transparent)", transition: `width 1.2s ease ${i * 0.15}s` }} />
                <div style={{ fontSize: "clamp(38px, 5vw, 64px)", fontWeight: 900, color: "#FF6B2B", letterSpacing: "-0.03em", lineHeight: 1, marginBottom: 10 }}>
                  <AnimatedNumber target={s.value} suffix={s.suffix} active={visibleStats} />
                </div>
                <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(245,245,245,0.4)" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── SERVICES ── */}
        <div id="services" style={{ padding: "120px 5vw", maxWidth: 1280, margin: "0 auto" }}>
          <div ref={revealRef(0) as any} style={revealStyle(0)}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.32em", textTransform: "uppercase", color: "#FF6B2B", marginBottom: 14 }}>// What We Do</div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 24, marginBottom: 64 }}>
              <h2 style={{ fontSize: "clamp(32px, 5vw, 60px)", fontWeight: 900, letterSpacing: "-0.01em", textTransform: "uppercase", lineHeight: 1.05, margin: 0 }}>
                Trade Consulting<br />
                <span style={{ background: "linear-gradient(135deg, #FF6B2B, #FFB347)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>At Every Level</span>
              </h2>
              <p style={{ color: "rgba(245,245,245,0.45)", fontSize: 15, lineHeight: 1.7, maxWidth: 440, fontWeight: 400 }}>
                From market entry to full-scale international expansion — we provide the intelligence and execution your trade strategy demands.
              </p>
            </div>
          </div>

          <div className="services-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 16 }}>
            {SERVICES.map((s, i) => (
              <div key={i} className="service-card" ref={revealRef(10 + i) as any} style={{ ...revealStyle(10 + i, i * 80) }}>
                <div className="svc-bar" />
                <div className="svc-num">{s.num}</div>
                <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: "#FF6B2B", marginBottom: 16 }}>Service {s.num}</div>
                <div style={{ fontSize: 20, fontWeight: 800, letterSpacing: "0.03em", textTransform: "uppercase", marginBottom: 14, lineHeight: 1.2 }}>{s.title}</div>
                <div style={{ fontSize: 14, color: "rgba(245,245,245,0.5)", lineHeight: 1.75, fontWeight: 400 }}>{s.desc}</div>
                <div className="svc-detail">{s.detail}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ height: 1, background: "linear-gradient(90deg, transparent, rgba(255,107,43,0.25), transparent)", margin: "0 5vw" }} />

        {/* ── ABOUT ── */}
        <div id="about" style={{ padding: "120px 5vw", maxWidth: 1280, margin: "0 auto" }}>
          <div className="about-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
            <div ref={revealRef(20) as any} style={revealStyle(20)}>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.32em", textTransform: "uppercase", color: "#FF6B2B", marginBottom: 14 }}>// Who We Are</div>
              <h2 style={{ fontSize: "clamp(30px, 4.5vw, 56px)", fontWeight: 900, letterSpacing: "-0.01em", textTransform: "uppercase", margin: "0 0 28px", lineHeight: 1.05 }}>
                Rooted in Suzhou.<br />
                <span style={{ background: "linear-gradient(135deg, #FF6B2B, #FFB347)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Reaching the World.</span>
              </h2>
              <p style={{ fontSize: 16, color: "rgba(245,245,245,0.55)", lineHeight: 1.8, marginBottom: 20, fontWeight: 400 }}>
                Suzhou Tradevorex is a specialist trade consulting firm based in Suzhou, Jiangsu — the heart of China's manufacturing and export economy.
              </p>
              <p style={{ fontSize: 14, color: "rgba(245,245,245,0.38)", lineHeight: 1.85, marginBottom: 36, fontWeight: 400 }}>
                We serve both Chinese enterprises looking to expand overseas and foreign businesses seeking to establish or grow in China. Our team combines deep local expertise with international business acumen to deliver results that matter.
              </p>
              <div>
                {["China Trade Law", "Customs & Tariffs", "Suzhou FTZ", "RCEP Strategy", "B2B Sourcing", "Cross-border Payments"].map((t) => (
                  <span key={t} style={{ display: "inline-block", padding: "5px 14px", fontSize: 10, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", background: "rgba(255,107,43,0.08)", color: "#FF6B2B", border: "1px solid rgba(255,107,43,0.2)", marginRight: 8, marginBottom: 8, borderRadius: 4 }}>{t}</span>
                ))}
              </div>
            </div>

            <div ref={revealRef(21) as any} style={{ ...revealStyle(21, 120) }}>
              <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,107,43,0.12)", borderRadius: 20, padding: "36px 40px", position: "relative", overflow: "hidden", boxShadow: "inset 0 1px 0 rgba(255,255,255,0.04)" }}>
                <div style={{ position: "absolute", top: 0, right: 0, width: 200, height: 200, borderRadius: "50%", background: "radial-gradient(circle, rgba(255,107,43,0.07), transparent 70%)", pointerEvents: "none" }} />
                <div style={{ fontSize: 11, color: "rgba(245,245,245,0.35)", letterSpacing: "0.18em", marginBottom: 28, textTransform: "uppercase", fontWeight: 700 }}>Why Tradevorex</div>
                {WHY_US.map(({ title, desc }, i) => (
                  <div key={i} className="why-item">
                    <div style={{ width: 36, height: 36, borderRadius: "50%", background: "rgba(255,107,43,0.1)", border: "1px solid rgba(255,107,43,0.25)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: 13, fontWeight: 700, color: "#FF6B2B" }}>
                      {String(i + 1).padStart(2, "0")}
                    </div>
                    <div>
                      <div style={{ fontSize: 15, fontWeight: 700, letterSpacing: "0.05em", textTransform: "uppercase", marginBottom: 5 }}>{title}</div>
                      <div style={{ fontSize: 13, color: "rgba(245,245,245,0.45)", lineHeight: 1.65 }}>{desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div style={{ height: 1, background: "linear-gradient(90deg, transparent, rgba(255,107,43,0.25), transparent)", margin: "0 5vw" }} />

        {/* ── GLOBAL REACH ── */}
        <div id="global-reach" style={{ padding: "120px 5vw", maxWidth: 1280, margin: "0 auto" }}>
          <div ref={revealRef(30) as any} style={{ ...revealStyle(30), marginBottom: 52 }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.32em", textTransform: "uppercase", color: "#FF6B2B", marginBottom: 14 }}>// Global Reach</div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 24 }}>
              <h2 style={{ fontSize: "clamp(30px, 4.5vw, 56px)", fontWeight: 900, letterSpacing: "-0.01em", textTransform: "uppercase", lineHeight: 1.05, margin: 0 }}>
                Connected Across<br />
                <span style={{ background: "linear-gradient(135deg, #FF6B2B, #FFB347)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Every Major Market</span>
              </h2>
              <p style={{ color: "rgba(245,245,245,0.45)", fontSize: 15, lineHeight: 1.7, maxWidth: 400, fontWeight: 400 }}>
                Our network spans key trade hubs across Asia, Europe, the Americas and beyond — with Suzhou at the center.
              </p>
            </div>
          </div>
          <NetworkMap />
        </div>

        <div style={{ height: 1, background: "linear-gradient(90deg, transparent, rgba(255,107,43,0.25), transparent)", margin: "0 5vw" }} />

        {/* ── CONTACT CTA ── */}
        <div id="contact" style={{ padding: "140px 5vw", maxWidth: 1280, margin: "0 auto", textAlign: "center", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: "120%", height: "120%", background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(255,107,43,0.06) 0%, transparent 70%)", pointerEvents: "none" }} />
          <div ref={revealRef(40) as any} style={{ ...revealStyle(40), position: "relative" }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.32em", textTransform: "uppercase", color: "#FF6B2B", marginBottom: 20 }}>// Get In Touch</div>
            <h2 style={{ fontSize: "clamp(36px, 6vw, 80px)", fontWeight: 900, letterSpacing: "-0.02em", textTransform: "uppercase", margin: "0 0 24px", lineHeight: 0.95 }}>
              Ready to Move<br />
              <span style={{ background: "linear-gradient(135deg, #FF6B2B, #FFB347)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Your Trade Forward?</span>
            </h2>
            <p style={{ color: "rgba(245,245,245,0.45)", fontSize: 16, lineHeight: 1.7, maxWidth: 500, margin: "0 auto 56px", fontWeight: 400 }}>
              Whether you&apos;re entering China or expanding globally, our team is ready to build your strategy.
            </p>
            <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap", marginBottom: 48 }}>
              <button className="btn-primary" style={{ padding: "18px 52px", fontSize: 14 }} onClick={() => setModalOpen(true)}>Book a Free Consultation</button>
              <button className="btn-outline" style={{ padding: "18px 52px", fontSize: 14 }} onClick={() => setModalOpen(true)}>info@tradevorex.com</button>
            </div>
            <div style={{ fontSize: 12, color: "rgba(245,245,245,0.28)", letterSpacing: "0.1em" }}>
              Suzhou Industrial Park · Jiangsu, China · +86 512 XXXX XXXX
            </div>
          </div>
        </div>

        {/* ── FOOTER ── */}
        <footer style={{ borderTop: "1px solid rgba(255,107,43,0.1)", padding: "48px 5vw", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 24 }}>
          <div style={{ fontSize: 18, fontWeight: 800, letterSpacing: "0.16em", textTransform: "uppercase" }}>
            TRADE<span style={{ color: "#FF6B2B" }}>VOREX</span>
          </div>
          <div style={{ fontSize: 12, color: "rgba(245,245,245,0.3)", letterSpacing: "0.05em" }}>
            苏州智贸通贸易咨询服务有限公司 &nbsp;·&nbsp; Suzhou Tradevorex Consulting Co., Ltd.
          </div>
          <div style={{ fontSize: 12, color: "rgba(245,245,245,0.28)", letterSpacing: "0.05em" }}>
            © 2026 Tradevorex. All rights reserved.
          </div>
        </footer>
      </div>
    </>
  );
}
