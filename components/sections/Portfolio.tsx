"use client";
import { useState, useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { Counter } from "@/components/ui/Counter";
import { ArrowUpRight, ArrowLeft, ArrowRight, Sparkles } from "lucide-react";

/* ────────────────────────────────────────────────────────────────────────────
 *  THEME — strictly monochromatic
 * ────────────────────────────────────────────────────────────────────────── */
const ACCENT      = "#06B6D4";
const ACCENT_SOFT = "rgba(6,182,212,0.10)";
const ACCENT_MID  = "rgba(6,182,212,0.35)";
const BG_PAGE     = "#0A0E1A";
const BG_PANEL    = "#0F1629";

/* ────────────────────────────────────────────────────────────────────────────
 *  DATA
 * ────────────────────────────────────────────────────────────────────────── */
type Metric = { label: string; value: number; prefix?: string; suffix?: string };
type Case = {
  id: string;
  client: string;
  title: string;
  industry: string;
  year: string;
  desc: string;
  metrics: [Metric, Metric, Metric];
  tags: string[];
  mockup: string;
  views: string[];   // 3 view labels for the internal image carousel
};

const CASES: Case[] = [
  {
    id: "joya", client: "JOYA KSA", title: "JOYA", industry: "Social Gifting", year: "2024",
    desc: "Designed and engineered JOYA — a patent-holding social gifting platform (US Patent No. US 10,614,443 B1) that turns everyday moments into rewards. We built the full iOS & Android experience: a curated store discovery flow with 20+ luxury brands (Chanel, Gucci, Louis Vuitton, Calvin Klein), an occasion-based gifting journey, a points & loyalty engine, and an Arabic-first UI serving Saudi Arabia. The social layer lets users share Moments and discover community gift recommendations.",
    metrics: [
      { label: "Partner Brands", value: 20, prefix: "",  suffix: "+"      },
      { label: "US Patent",      value: 1,  prefix: "#", suffix: " Held"  },
      { label: "Occasions",      value: 7,  prefix: "",  suffix: " Types" },
    ],
    tags: ["React Native", "Node.js", "AWS", "Arabic UI"],
    mockup: "joya",
    views: ["Select Store", "Home", "Occasions"],
  },
  {
    id: "joya2", client: "JOYA KSA", title: "JOYA", industry: "Social Gifting", year: "2024",
    desc: "Designed and engineered JOYA — a patent-holding social gifting platform (US Patent No. US 10,614,443 B1) that turns everyday moments into rewards. We built the full iOS & Android experience: a curated store discovery flow with 20+ luxury brands (Chanel, Gucci, Louis Vuitton, Calvin Klein), an occasion-based gifting journey, a points & loyalty engine, and an Arabic-first UI serving Saudi Arabia. The social layer lets users share Moments and discover community gift recommendations.",
    metrics: [
      { label: "Partner Brands", value: 20, prefix: "",  suffix: "+"      },
      { label: "US Patent",      value: 1,  prefix: "#", suffix: " Held"  },
      { label: "Occasions",      value: 7,  prefix: "",  suffix: " Types" },
    ],
    tags: ["React Native", "Node.js", "AWS", "Arabic UI"],
    mockup: "joya",
    views: ["Select Store", "Home", "Occasions"],
  },
  {
    id: "giftee", client: "Giftee Global", title: "Giftee", industry: "Gifting Platform", year: "2024",
    desc: "Built the end-to-end mobile platform for Giftee — a social gifting app with a unique Gift-One-Get-One mechanic where every gift sent earns the sender a matching gift from partner brands. We shipped React Native iOS & Android apps, a real-time inbox with gift tracking, the Catch marketplace for discovering partner store gifts, and Stripe-powered one-tap gifting flows that grew the active user base 3× in the first quarter post-launch.",
    metrics: [
      { label: "User Growth",    value: 3,  prefix: "",  suffix: "× Q1"       },
      { label: "Partner Brands", value: 80, prefix: "",  suffix: "+"          },
      { label: "Gift Delivery",  value: 98, prefix: "",  suffix: "% Success"  },
    ],
    tags: ["React Native", "Node.js", "Stripe", "AWS"],
    mockup: "giftee",
    views: ["Home", "Inbox", "Catch"],
  },
  {
    id: "giftee2", client: "Giftee Global", title: "Giftee", industry: "Gifting Platform", year: "2024",
    desc: "Built the end-to-end mobile platform for Giftee — a social gifting app with a unique Gift-One-Get-One mechanic where every gift sent earns the sender a matching gift from partner brands. We shipped React Native iOS & Android apps, a real-time inbox with gift tracking, the Catch marketplace for discovering partner store gifts, and Stripe-powered one-tap gifting flows that grew the active user base 3× in the first quarter post-launch.",
    metrics: [
      { label: "User Growth",    value: 3,  prefix: "",  suffix: "× Q1"       },
      { label: "Partner Brands", value: 80, prefix: "",  suffix: "+"          },
      { label: "Gift Delivery",  value: 98, prefix: "",  suffix: "% Success"  },
    ],
    tags: ["React Native", "Node.js", "Stripe", "AWS"],
    mockup: "giftee",
    views: ["Home", "Inbox", "Catch"],
  },
];

/* ────────────────────────────────────────────────────────────────────────────
 *  MOCKUPS — each accepts viewIndex (0/1/2) and renders that variant
 * ────────────────────────────────────────────────────────────────────────── */
type MockupProps = { viewIndex: number };

function FinanceMockup({ viewIndex }: MockupProps) {
  const views = [
    { title: "Portfolio Value",  primary: "$284,920.40", sub: "↑ +24.8% this week" },
    { title: "Today's Trades",   primary: "$1.24M",      sub: "↑ 142 orders filled" },
    { title: "Watchlist Alerts", primary: "12 active",   sub: "3 triggered today"   },
  ];
  const v = views[viewIndex];
  return (
    <div className="w-full h-full relative overflow-hidden">
      <div className="absolute -top-12 -right-12 w-56 h-56 rounded-full blur-3xl opacity-20" style={{ background: ACCENT }} />
      <div className="absolute top-5 left-5">
        <div className="text-[10px] text-white/35 uppercase tracking-widest mb-1">{v.title}</div>
        <div className="text-xl font-bold text-white">{v.primary}</div>
        <div className="text-xs font-semibold mt-1" style={{ color: ACCENT }}>{v.sub}</div>
      </div>
      {viewIndex === 0 && (
        <div className="absolute top-5 right-5 flex gap-3">
          {[["BTC", "+5.2%"], ["ETH", "+3.1%"], ["SOL", "+8.4%"]].map(([n, p]) => (
            <div key={n} className="text-center">
              <div className="text-[9px] text-white/30">{n}</div>
              <div className="text-[10px] font-bold" style={{ color: ACCENT }}>{p}</div>
            </div>
          ))}
        </div>
      )}
      {viewIndex === 1 && (
        <div className="absolute top-5 right-5 px-2.5 py-1 rounded-full text-[10px] font-mono"
             style={{ background: ACCENT + "20", color: ACCENT, border: `1px solid ${ACCENT_MID}` }}>
          LIVE
        </div>
      )}
      {viewIndex === 2 && (
        <div className="absolute top-5 right-5 text-[10px] text-white/40 font-mono">8 / 50 alerts</div>
      )}
      <svg className="absolute bottom-0 left-0 w-full" viewBox="0 0 360 160" preserveAspectRatio="none" style={{ height: 150 }}>
        <defs>
          <linearGradient id="fgf" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={ACCENT} stopOpacity="0.32" />
            <stop offset="100%" stopColor={ACCENT} stopOpacity="0" />
          </linearGradient>
        </defs>
        {viewIndex === 0 && (
          <>
            <polygon points="0,140 50,110 100,125 150,75 200,90 250,45 300,65 360,40 360,160 0,160" fill="url(#fgf)" />
            <polyline points="0,140 50,110 100,125 150,75 200,90 250,45 300,65 360,40" fill="none" stroke={ACCENT} strokeWidth="2.2" />
            <circle cx="250" cy="45" r="5" fill={ACCENT} />
          </>
        )}
        {viewIndex === 1 && (
          <>
            {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => {
              const h = 30 + Math.abs(Math.sin(i * 1.3)) * 90;
              return <rect key={i} x={i * 44 + 10} y={150 - h} width="34" height={h} fill={ACCENT} opacity={0.3 + (i / 8) * 0.6} rx="3" />;
            })}
          </>
        )}
        {viewIndex === 2 && (
          <>
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <g key={i}>
                <rect x="10" y={20 + i * 22} width="340" height="16" rx="3" fill="rgba(255,255,255,0.04)" />
                <rect x="10" y={20 + i * 22} width={120 + i * 30} height="16" rx="3" fill={ACCENT} opacity={0.4 + i * 0.08} />
              </g>
            ))}
          </>
        )}
      </svg>
    </div>
  );
}

function HealthMockup({ viewIndex }: MockupProps) {
  const views = [
    { title: "Patient Dashboard", sub: "Dr. Sarah Chen"   },
    { title: "Vital Trends",      sub: "7-day overview"   },
    { title: "Appointments",      sub: "Today · 8 booked" },
  ];
  const v = views[viewIndex];
  return (
    <div className="w-full h-full relative overflow-hidden">
      <div className="absolute -top-10 -left-10 w-48 h-48 rounded-full blur-3xl opacity-15" style={{ background: ACCENT }} />
      <div className="absolute top-5 left-5">
        <div className="text-[10px] text-white/35 uppercase tracking-widest mb-1">{v.title}</div>
        <div className="text-sm font-semibold text-white">{v.sub}</div>
      </div>

      {viewIndex === 0 && (
        <>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[55%]">
            <svg width="120" height="120" viewBox="0 0 120 120">
              <circle cx="60" cy="60" r="48" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="7" />
              <circle cx="60" cy="60" r="48" fill="none" stroke={ACCENT} strokeWidth="7"
                strokeDasharray={`${0.82 * 302} 302`} strokeLinecap="round"
                transform="rotate(-90 60 60)" />
              <text x="60" y="58" textAnchor="middle" fill="white" fontSize="20" fontWeight="700">98%</text>
              <text x="60" y="74" textAnchor="middle" fill="rgba(255,255,255,0.38)" fontSize="9">Health Score</text>
            </svg>
          </div>
          <div className="absolute bottom-4 left-4 right-4 grid grid-cols-3 gap-1.5">
            {[["♥", "72", "BPM"], ["°", "98.6", "°F"], ["~", "95%", "SpO₂"]].map(([icon, val, unit]) => (
              <div key={unit} className="rounded-xl bg-white/[0.04] border border-white/[0.06] p-2 text-center">
                <div className="text-base leading-none mb-1" style={{ color: ACCENT }}>{icon}</div>
                <div className="text-xs font-bold text-white">{val}</div>
                <div className="text-[9px] text-white/35">{unit}</div>
              </div>
            ))}
          </div>
        </>
      )}

      {viewIndex === 1 && (
        <svg className="absolute bottom-0 left-0 right-0" viewBox="0 0 360 160" preserveAspectRatio="none" style={{ height: 160 }}>
          <defs>
            <linearGradient id="hgrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={ACCENT} stopOpacity="0.3" />
              <stop offset="100%" stopColor={ACCENT} stopOpacity="0" />
            </linearGradient>
          </defs>
          <polygon points="0,120 60,80 120,100 180,60 240,75 300,40 360,55 360,160 0,160" fill="url(#hgrad)" />
          <polyline points="0,120 60,80 120,100 180,60 240,75 300,40 360,55" fill="none" stroke={ACCENT} strokeWidth="2" />
          <polyline points="0,140 60,135 120,128 180,130 240,118 300,122 360,110" fill="none" stroke={ACCENT} strokeWidth="1.4" opacity="0.5" strokeDasharray="3 3" />
        </svg>
      )}

      {viewIndex === 2 && (
        <div className="absolute top-16 left-4 right-4 flex flex-col gap-2">
          {[
            { time: "09:00", name: "Mike Brown",  type: "Check-up" },
            { time: "10:30", name: "Lisa Wang",   type: "Follow-up" },
            { time: "13:15", name: "Tom Garcia",  type: "Lab Review" },
            { time: "15:45", name: "Anna Smith",  type: "Consultation" },
          ].map((a) => (
            <div key={a.time} className="flex items-center gap-2.5 p-2 rounded-lg bg-white/[0.03] border border-white/[0.05]">
              <div className="text-[10px] font-mono w-10" style={{ color: ACCENT }}>{a.time}</div>
              <div className="flex-1 min-w-0">
                <div className="text-[11px] text-white font-medium truncate">{a.name}</div>
                <div className="text-[9px] text-white/35">{a.type}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function ShopMockup({ viewIndex }: MockupProps) {
  const views = [
    { title: "Featured Products" },
    { title: "Active Cart"       },
    { title: "Sales Analytics"   },
  ];
  const v = views[viewIndex];
  return (
    <div className="w-full h-full relative overflow-hidden">
      <div className="absolute -bottom-12 -right-12 w-48 h-48 rounded-full blur-3xl opacity-15" style={{ background: ACCENT }} />
      <div className="absolute top-4 left-5 right-5 flex justify-between items-center">
        <div className="text-[10px] text-white/35 uppercase tracking-widest">{v.title}</div>
        {viewIndex === 0 && <div className="text-[10px] px-2 py-0.5 rounded-full border border-white/10 text-white/40">Filter ▾</div>}
        {viewIndex === 1 && <div className="text-[10px] px-2 py-0.5 rounded-full" style={{ background: ACCENT + "20", color: ACCENT, border: `1px solid ${ACCENT_MID}` }}>3 items</div>}
        {viewIndex === 2 && <div className="text-[10px] text-white/40 font-mono">Last 7d</div>}
      </div>

      {viewIndex === 0 && (
        <div className="absolute top-11 left-5 right-5 bottom-5 grid grid-cols-2 gap-2">
          {[
            { name: "AirPods Pro", price: "$249",  badge: "Hot"  },
            { name: "MacBook Air", price: "$1,099", badge: "New" },
            { name: "iPhone 15",   price: "$799",  badge: ""    },
            { name: "Apple Watch", price: "$399",  badge: "Sale" },
          ].map((p, i) => (
            <div key={i} className="rounded-xl bg-white/[0.04] border border-white/[0.06] p-2 relative overflow-hidden flex flex-col">
              {p.badge && (
                <span className="absolute top-1.5 right-1.5 text-[8px] px-1.5 py-0.5 rounded-full font-semibold"
                  style={{ background: ACCENT + "30", color: ACCENT, border: `1px solid ${ACCENT}50` }}>
                  {p.badge}
                </span>
              )}
              <div className="flex-1 rounded-lg mb-1.5" style={{ background: `linear-gradient(135deg, ${ACCENT}20, ${ACCENT}05)` }} />
              <div className="text-[9px] text-white/55 truncate">{p.name}</div>
              <div className="text-[10px] font-bold mt-0.5" style={{ color: ACCENT }}>{p.price}</div>
            </div>
          ))}
        </div>
      )}

      {viewIndex === 1 && (
        <div className="absolute top-11 left-5 right-5 bottom-5 flex flex-col gap-2">
          {[
            { name: "AirPods Pro Max", qty: 1, price: "$549" },
            { name: "USB-C Cable",     qty: 2, price: "$38"  },
            { name: "iPhone Case",     qty: 1, price: "$49"  },
          ].map((p, i) => (
            <div key={i} className="flex items-center gap-2.5 p-2 rounded-xl bg-white/[0.04] border border-white/[0.06]">
              <div className="w-10 h-10 rounded-lg flex-shrink-0" style={{ background: `linear-gradient(135deg, ${ACCENT}25, ${ACCENT}08)` }} />
              <div className="flex-1 min-w-0">
                <div className="text-[11px] text-white truncate">{p.name}</div>
                <div className="text-[9px] text-white/35">Qty: {p.qty}</div>
              </div>
              <div className="text-xs font-bold" style={{ color: ACCENT }}>{p.price}</div>
            </div>
          ))}
          <div className="mt-auto p-2 rounded-xl flex items-center justify-between"
               style={{ background: ACCENT + "12", border: `1px solid ${ACCENT_MID}` }}>
            <span className="text-[10px] text-white/65 uppercase">Subtotal</span>
            <span className="text-sm font-bold" style={{ color: ACCENT }}>$674.00</span>
          </div>
        </div>
      )}

      {viewIndex === 2 && (
        <div className="absolute top-12 left-5 right-5 bottom-5">
          <div className="text-2xl font-bold text-white mb-1">$48.2K</div>
          <div className="text-[10px] font-semibold mb-3" style={{ color: ACCENT }}>↑ +24.8% vs last week</div>
          <div className="flex items-end justify-between h-24 gap-1">
            {[40, 65, 50, 80, 60, 95, 75].map((h, i) => (
              <div key={i} className="flex-1 rounded-sm" style={{
                height: `${h}%`,
                background: `linear-gradient(to top, ${ACCENT}, ${ACCENT}40)`,
                boxShadow: i === 5 ? `0 0 8px ${ACCENT}` : "none",
              }} />
            ))}
          </div>
          <div className="flex justify-between text-[9px] text-white/30 mt-2">
            <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
          </div>
        </div>
      )}
    </div>
  );
}

function GamingMockup({ viewIndex }: MockupProps) {
  const views = [
    { title: "Guild: Phoenix" },
    { title: "Inventory"       },
    { title: "Active Quests"   },
  ];
  const v = views[viewIndex];
  return (
    <div className="w-full h-full relative overflow-hidden">
      <div className="absolute inset-0 opacity-10"
        style={{ backgroundImage: `radial-gradient(circle at 70% 30%, ${ACCENT} 0%, transparent 60%)` }} />
      <div className="absolute top-4 left-5">
        <div className="text-[10px] text-white/35 uppercase tracking-widest mb-1">{v.title}</div>
        <div className="text-sm font-bold text-white">Level 47 — Arcane Mage</div>
      </div>

      {viewIndex === 0 && (
        <>
          <div className="absolute top-[68px] left-5 right-5">
            <div className="flex justify-between text-[9px] text-white/30 mb-1">
              <span>XP Progress</span><span>8,420 / 10,000</span>
            </div>
            <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
              <div className="h-full rounded-full" style={{ width: "84%", background: ACCENT, boxShadow: `0 0 10px ${ACCENT}` }} />
            </div>
          </div>
          <div className="absolute top-24 left-5 right-5 grid grid-cols-3 gap-1.5">
            {[["⚔", "ATK", "1,847"], ["◆", "DEF", "932"], ["✦", "MAGIC", "2,103"]].map(([icon, stat, val]) => (
              <div key={stat} className="rounded-xl bg-white/[0.04] border border-white/[0.06] p-2 text-center">
                <div className="text-base leading-none mb-1" style={{ color: ACCENT }}>{icon}</div>
                <div className="text-[8px] text-white/35 uppercase tracking-widest">{stat}</div>
                <div className="text-[10px] font-bold" style={{ color: ACCENT }}>{val}</div>
              </div>
            ))}
          </div>
        </>
      )}

      {viewIndex === 1 && (
        <div className="absolute top-16 left-5 right-5">
          <div className="text-[9px] text-white/30 mb-2 uppercase tracking-widest">12 items equipped</div>
          <div className="grid grid-cols-4 gap-1.5">
            {["⚔", "◈", "♛", "◆", "⚗", "↟", "✶", "♢", "◇", "◯", "✦", "❖"].map((icon, i) => (
              <div key={i} className="aspect-square rounded-lg flex items-center justify-center text-base"
                   style={{
                     background: i % 3 === 0 ? `${ACCENT}15` : "rgba(255,255,255,0.04)",
                     border: i % 3 === 0 ? `1px solid ${ACCENT_MID}` : "1px solid rgba(255,255,255,0.06)",
                     color: ACCENT,
                   }}>
                {icon}
              </div>
            ))}
          </div>
        </div>
      )}

      {viewIndex === 2 && (
        <div className="absolute top-16 left-5 right-5 flex flex-col gap-2">
          {[
            { name: "Dragon's Crucible", reward: "2,400 XP", progress: 80 },
            { name: "Ancient Tome",      reward: "1,200 XP", progress: 45 },
            { name: "Shadow Trial",      reward: "3,800 XP", progress: 22 },
          ].map((q) => (
            <div key={q.name} className="p-2.5 rounded-xl bg-white/[0.04] border border-white/[0.06]">
              <div className="flex justify-between items-center mb-1.5">
                <span className="text-[11px] text-white font-semibold">{q.name}</span>
                <span className="text-[9px] font-mono" style={{ color: ACCENT }}>{q.reward}</span>
              </div>
              <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full rounded-full" style={{ width: `${q.progress}%`, background: ACCENT }} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function AIMockup({ viewIndex }: MockupProps) {
  const views = [
    { title: "AI Chat" },
    { title: "Insights"  },
    { title: "Workflows" },
  ];
  const v = views[viewIndex];
  return (
    <div className="w-full h-full relative overflow-hidden">
      <div className="absolute -top-10 right-0 w-36 h-36 rounded-full blur-3xl opacity-15" style={{ background: ACCENT }} />
      <div className="absolute top-4 left-5 right-5 flex items-center gap-2 pb-3 border-b border-white/[0.06]">
        <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold"
             style={{ background: ACCENT + "30", color: ACCENT, border: `1px solid ${ACCENT_MID}` }}>AI</div>
        <div>
          <div className="text-xs font-semibold text-white leading-none">{v.title}</div>
          <div className="flex items-center gap-1.5 mt-0.5">
            <div className="w-1.5 h-1.5 rounded-full" style={{ background: ACCENT, boxShadow: `0 0 6px ${ACCENT}` }} />
            <div className="text-[9px] text-white/35 font-mono">GPT-4 · Online</div>
          </div>
        </div>
      </div>

      {viewIndex === 0 && (
        <div className="absolute top-16 left-4 right-4 flex flex-col gap-2">
          {[
            { role: "user", text: "Summarize Q4 earnings"   },
            { role: "ai",   text: "Q4 revenue grew 34% YoY to $2.8B. Drivers: enterprise (+58%), launches (+22%)." },
            { role: "user", text: "Flag key risk factors"   },
          ].map((m, i) => (
            <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
              <div className="rounded-2xl px-3 py-1.5 max-w-[88%] text-[10px] leading-relaxed"
                style={m.role === "ai"
                  ? { background: ACCENT + "20", border: `1px solid ${ACCENT}40`, color: "rgba(255,255,255,0.82)" }
                  : { background: "rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.72)" }
                }>
                {m.text}
              </div>
            </div>
          ))}
        </div>
      )}

      {viewIndex === 1 && (
        <div className="absolute top-16 left-4 right-4">
          <div className="text-[9px] text-white/35 uppercase tracking-widest mb-2">Top insights</div>
          {[
            { text: "Revenue growth accelerating in Q4",   pct: 92 },
            { text: "Customer churn down 18% MoM",         pct: 78 },
            { text: "Enterprise pipeline up $4.2M",        pct: 65 },
            { text: "Support ticket volume normalizing",   pct: 51 },
          ].map((ins, i) => (
            <div key={i} className="mb-2 p-2 rounded-lg" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)" }}>
              <div className="flex justify-between items-center mb-1">
                <span className="text-[10px] text-white/80 truncate">{ins.text}</span>
                <span className="text-[9px] font-mono" style={{ color: ACCENT }}>{ins.pct}%</span>
              </div>
              <div className="h-0.5 bg-white/10 rounded-full">
                <div className="h-full rounded-full" style={{ width: `${ins.pct}%`, background: ACCENT }} />
              </div>
            </div>
          ))}
        </div>
      )}

      {viewIndex === 2 && (
        <div className="absolute top-16 left-4 right-4 flex flex-col gap-2">
          {[
            { name: "Daily Standup Brief", schedule: "Every 9:00 AM" },
            { name: "Earnings Summary",    schedule: "On document upload" },
            { name: "Customer Pulse",      schedule: "Weekly Mon"   },
          ].map((w, i) => (
            <div key={i} className="p-2.5 rounded-xl flex items-center gap-2"
                 style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
              <div className="w-6 h-6 rounded-md flex items-center justify-center text-[10px] font-bold"
                   style={{ background: ACCENT + "20", color: ACCENT }}>⚡</div>
              <div className="flex-1 min-w-0">
                <div className="text-[11px] text-white truncate">{w.name}</div>
                <div className="text-[9px] text-white/35">{w.schedule}</div>
              </div>
              <div className="w-7 h-3.5 rounded-full p-0.5" style={{ background: ACCENT + "30" }}>
                <div className="w-2.5 h-2.5 rounded-full ml-auto" style={{ background: ACCENT }} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function RealEstateMockup({ viewIndex }: MockupProps) {
  const views = [
    { title: "Map View" },
    { title: "All Listings" },
    { title: "Saved Properties" },
  ];
  const v = views[viewIndex];
  return (
    <div className="w-full h-full relative overflow-hidden">
      <div className="absolute top-4 left-5 z-10">
        <div className="text-[10px] text-white/35 uppercase tracking-widest mb-0.5">{v.title}</div>
        <div className="text-sm font-semibold text-white">Downtown · 14 results</div>
      </div>

      {viewIndex === 0 && (
        <>
          <svg className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 360 240" preserveAspectRatio="xMidYMid slice">
            {[60, 120, 180, 240, 300].map(x => <line key={x} x1={x} y1="0" x2={x} y2="240" stroke="white" strokeWidth="0.8" />)}
            {[60, 120, 180].map(y => <line key={y} x1="0" y1={y} x2="360" y2={y} stroke="white" strokeWidth="0.8" />)}
            <path d="M0,100 Q120,70 240,110 Q300,130 360,90" stroke="white" strokeWidth="2.5" fill="none" />
          </svg>
          <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse at 60% 50%, ${ACCENT}15, transparent 65%)` }} />
          {[
            { x: "22%", y: "40%", price: "$1.2M", hot: false },
            { x: "52%", y: "55%", price: "$890K", hot: true  },
            { x: "72%", y: "32%", price: "$2.1M", hot: false },
          ].map((pin, i) => (
            <div key={i} className="absolute flex flex-col items-center" style={{ left: pin.x, top: pin.y }}>
              <div className="px-2 py-0.5 rounded-full text-[9px] font-bold text-white mb-1 whitespace-nowrap"
                style={{
                  background: pin.hot ? ACCENT : "rgba(255,255,255,0.12)",
                  boxShadow: pin.hot ? `0 0 10px ${ACCENT}80` : "none",
                }}>
                {pin.price}
              </div>
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: pin.hot ? ACCENT : "rgba(255,255,255,0.4)" }} />
            </div>
          ))}
        </>
      )}

      {viewIndex === 1 && (
        <div className="absolute top-14 left-4 right-4 flex flex-col gap-2">
          {[
            { name: "Skyline Loft",      details: "3bd · 2ba",         price: "$890K" },
            { name: "Ocean View Villa",  details: "5bd · 4ba",         price: "$2.1M" },
            { name: "Downtown Studio",   details: "1bd · 1ba",         price: "$420K" },
            { name: "Garden Townhouse",  details: "4bd · 3ba",         price: "$1.2M" },
          ].map((p, i) => (
            <div key={i} className="flex items-center gap-2 p-2 rounded-xl bg-white/[0.04] border border-white/[0.06]">
              <div className="w-10 h-10 rounded-lg flex-shrink-0" style={{ background: `linear-gradient(135deg, ${ACCENT}30, ${ACCENT}08)` }} />
              <div className="flex-1 min-w-0">
                <div className="text-[11px] text-white truncate">{p.name}</div>
                <div className="text-[9px] text-white/35">{p.details}</div>
              </div>
              <div className="text-xs font-bold" style={{ color: ACCENT }}>{p.price}</div>
            </div>
          ))}
        </div>
      )}

      {viewIndex === 2 && (
        <div className="absolute top-14 left-4 right-4 grid grid-cols-2 gap-2">
          {[
            { name: "Skyline Loft",  price: "$890K" },
            { name: "Pine Cottage",  price: "$540K" },
            { name: "Marina Condo",  price: "$725K" },
            { name: "Heritage Home", price: "$1.5M" },
          ].map((p, i) => (
            <div key={i} className="p-2 rounded-xl bg-white/[0.04] border border-white/[0.06]">
              <div className="h-10 rounded-lg mb-1.5" style={{ background: `linear-gradient(135deg, ${ACCENT}30, ${ACCENT}08)` }} />
              <div className="text-[10px] text-white/65 truncate">{p.name}</div>
              <div className="flex items-center justify-between mt-0.5">
                <span className="text-[11px] font-bold" style={{ color: ACCENT }}>{p.price}</span>
                <span style={{ color: ACCENT }} className="text-xs">♥</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ── Phone-frame image mockup — wraps a real screenshot in a device frame ──────
function PhoneImageMockup({ src, alt }: { src: string; alt: string }) {
  const [loaded, setLoaded] = useState(false);
  const [error,  setError]  = useState(false);

  return (
    <div className="w-full h-full flex items-center justify-center">
      {/* Device frame */}
      <div
        className="relative flex-shrink-0"
        style={{
          width: 175, height: 355,
          borderRadius: 18,
          background: "linear-gradient(160deg,#2a2a2e 0%,#1a1a1e 100%)",
          boxShadow: "0 30px 70px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.12), inset 0 -1px 0 rgba(0,0,0,0.5)",
          padding: 3,
        }}
      >
        {/* Screen bezel */}
        <div style={{ borderRadius: 15, overflow: "hidden", width: "100%", height: "100%", background: "#000", position: "relative" }}>
          {/* Notch */}
          <div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", width: 70, height: 20, background: "#1a1a1e", borderRadius: "0 0 14px 14px", zIndex: 10 }} />

          {/* Status bar */}
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 20, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 14px", zIndex: 9, background: "rgba(0,0,0,0.3)" }}>
            <span style={{ fontSize: 7, fontWeight: 700, color: "#fff" }}>9:41</span>
            <div style={{ display: "flex", gap: 2, alignItems: "center" }}>
              {[3,3,3,2,1].map((h,i) => <div key={i} style={{ width: 2, height: h+2, background: "#fff", borderRadius: 1, opacity: 0.8 }} />)}
            </div>
          </div>

          {/* Screenshot */}
          {!error ? (
            <img
              src={src}
              alt={alt}
              onLoad={() => setLoaded(true)}
              onError={() => setError(true)}
              style={{
                width: "100%", height: "100%",
                objectFit: "cover", objectPosition: "top",
                display: "block",
                opacity: loaded ? 1 : 0,
                transition: "opacity 0.4s ease",
              }}
            />
          ) : (
            /* Fallback when image not found */
            <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 8, background: "#0f1225", padding: 16, textAlign: "center" }}>
              <div style={{ fontSize: 28 }}>📱</div>
              <div style={{ fontSize: 9, fontFamily: "monospace", color: "rgba(255,255,255,0.4)", lineHeight: 1.5 }}>
                Save screenshot to<br /><span style={{ color: ACCENT }}>/public/portfolio/</span>
              </div>
            </div>
          )}

          {/* Loading shimmer */}
          {!loaded && !error && (
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(120deg,#0f1225 0%,#1a2040 50%,#0f1225 100%)", backgroundSize: "200% 100%", animation: "shimmer 1.5s infinite" }} />
          )}

          {/* Subtle screen shine */}
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(160deg,rgba(255,255,255,0.06) 0%,transparent 25%)", pointerEvents: "none" }} />
        </div>

        {/* Side buttons */}
        <div style={{ position: "absolute", right: -3, top: 80, width: 3, height: 30, background: "#333", borderRadius: "0 2px 2px 0" }} />
        <div style={{ position: "absolute", left: -3, top: 70, width: 3, height: 20, background: "#333", borderRadius: "2px 0 0 2px" }} />
        <div style={{ position: "absolute", left: -3, top: 98, width: 3, height: 20, background: "#333", borderRadius: "2px 0 0 2px" }} />
      </div>
    </div>
  );
}

// ── Giftee Mockup — uses real screenshots from /public/portfolio/ ─────────────
const GIFTEE_PINK  = "#C8384A";
const GIFTEE_LIGHT = "#FFEEF0";
const GIFTEE_CREAM = "#FBF5F0";

const GIFTEE_SCREENS = [
  { src: "/portfolio/1giftee.svg", alt: "Giftee Home"  },
  { src: "/portfolio/2home.svg",   alt: "Giftee Inbox" },
  { src: "/portfolio/3inbox.svg",  alt: "Giftee Catch" },
];

function GifteeMockup({ viewIndex }: MockupProps) {
  const screen = GIFTEE_SCREENS[viewIndex] ?? GIFTEE_SCREENS[0];
  return <PhoneImageMockup src={screen.src} alt={screen.alt} />;
}

function GifteeMockupLEGACY({ viewIndex }: MockupProps) {
  return (
    <div className="w-full h-full flex items-center justify-center">
      {/* Phone frame */}
      <div
        className="relative overflow-hidden rounded-[16px] w-[170px] h-[340px] flex-shrink-0"
        style={{
          background: GIFTEE_CREAM,
          boxShadow: "0 20px 50px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.15)",
          border: "1px solid rgba(255,255,255,0.12)",
        }}
      >
        {/* Status bar */}
        <div className="flex justify-between items-center px-4 pt-2.5 pb-1" style={{ background: GIFTEE_CREAM }}>
          <span className="text-[8px] font-bold" style={{ color: "#111" }}>9:41</span>
          <div className="flex items-center gap-0.5">
            {[3,3,3,2].map((h, i) => (
              <div key={i} className="rounded-[1px]" style={{ width: 2.5, height: h + 3, background: "#111", opacity: 0.7 }} />
            ))}
            <span className="ml-0.5 text-[7px]" style={{ color: "#111" }}>▲▲▲</span>
          </div>
        </div>

        {/* ── View 0: Home ── */}
        {viewIndex === 0 && (
          <div className="flex flex-col h-full overflow-hidden" style={{ background: GIFTEE_CREAM }}>
            {/* Header */}
            <div className="px-3 py-1.5 flex items-center justify-between">
              <span className="text-[15px] font-black italic" style={{ color: GIFTEE_PINK }}>Giftee</span>
              <div className="flex items-center gap-1.5">
                <div className="w-5 h-5 rounded-full" style={{ background: GIFTEE_LIGHT, border: `1px solid ${GIFTEE_PINK}40` }}>
                  <div className="w-full h-full rounded-full flex items-center justify-center text-[8px]" style={{ color: GIFTEE_PINK }}>🛒</div>
                </div>
                <div className="w-5 h-5 rounded-full overflow-hidden" style={{ background: "#ddd" }}>
                  <div className="w-full h-full bg-gradient-to-b from-amber-300 to-amber-500 flex items-center justify-center text-[8px]">👤</div>
                </div>
              </div>
            </div>
            {/* Confetti */}
            <div className="absolute top-8 left-0 right-0 flex flex-wrap gap-x-3 gap-y-0.5 px-4 pointer-events-none">
              {["#EC4899","#10B981","#F59E0B","#3B82F6","#8B5CF6"].map((c, i) => (
                <motion.div
                  key={i}
                  className="rounded-sm"
                  style={{ width: 3, height: 6, background: c, rotate: `${i * 37}deg` }}
                  animate={{ y: [0, 15, 0], opacity: [0.8, 0.4, 0.8], rotate: [`${i*37}deg`, `${i*37+180}deg`] }}
                  transition={{ duration: 2 + i * 0.3, repeat: Infinity, delay: i * 0.2 }}
                />
              ))}
            </div>
            {/* Welcome */}
            <div className="px-3 mb-2">
              <p className="text-[9px]" style={{ color: "#555" }}>Welcome, <strong style={{ color: "#111" }}>Mohammed</strong></p>
            </div>
            {/* Hero card */}
            <div className="mx-3 rounded-2xl p-3 mb-2" style={{ background: "#F5F0EC" }}>
              <p className="text-[8px] leading-[1.4] font-light" style={{ color: "#333" }}>
                Make<br />Someone&apos;s <strong>Moments</strong><br />with
              </p>
              <div className="mt-1 text-[14px]">☕</div>
            </div>
            {/* What are you looking for */}
            <div className="px-3 mb-1.5">
              <p className="text-[8px] font-black" style={{ color: "#111" }}>What are you looking for?</p>
            </div>
            {/* Feature cards */}
            <div className="px-3 flex flex-col gap-1.5">
              <div className="rounded-xl p-2 flex items-center justify-between" style={{ background: "#FFF5EE", border: "1px solid #EEE" }}>
                <div>
                  <p className="text-[7.5px] font-black" style={{ color: "#111" }}>Gift One Get One</p>
                  <p className="text-[6.5px] mt-0.5" style={{ color: "#666" }}>Every gift you send. You<br />received the same</p>
                </div>
                <div className="text-[16px]">🎁</div>
              </div>
              <div className="grid grid-cols-2 gap-1.5">
                {[{ icon: "🎩", title: "Catch", sub: "Catch gift from\nstores" }, { icon: "📦", title: "Send a Gift", sub: "Send & receive\ngifts" }].map((f) => (
                  <div key={f.title} className="rounded-xl p-2" style={{ background: "#FFF5EE", border: "1px solid #EEE" }}>
                    <p className="text-[7px] font-black" style={{ color: "#111" }}>{f.title}</p>
                    <p className="text-[6px] mt-0.5 whitespace-pre-line" style={{ color: "#777" }}>{f.sub}</p>
                    <div className="text-[11px] mt-1">{f.icon}</div>
                  </div>
                ))}
              </div>
            </div>
            {/* Bottom nav */}
            <div className="mt-auto border-t flex justify-around py-2 px-2" style={{ borderColor: "#EEE", background: GIFTEE_CREAM }}>
              {[{ label: "Home", active: true, icon: "🏠" }, { label: "Favs", active: false, icon: "♡" }, { label: "Occasions", active: false, icon: "✨" }, { label: "Notif", active: false, icon: "🔔" }].map((n) => (
                <div key={n.label} className="flex flex-col items-center gap-0.5">
                  <span className="text-[10px]">{n.icon}</span>
                  <span className="text-[5.5px]" style={{ color: n.active ? GIFTEE_PINK : "#999" }}>{n.label}</span>
                  {n.active && <div className="w-3 h-0.5 rounded-full" style={{ background: GIFTEE_PINK }} />}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── View 1: Inbox ── */}
        {viewIndex === 1 && (
          <div className="flex flex-col h-full" style={{ background: "#FAFAFA" }}>
            {/* Header */}
            <div className="px-3 py-2 flex items-center gap-2">
              <span className="text-[10px]" style={{ color: GIFTEE_PINK }}>←</span>
              <span className="text-[11px] font-black" style={{ color: "#111" }}>Inbox</span>
            </div>
            {/* Search */}
            <div className="mx-3 mb-2 rounded-xl px-2.5 py-2 flex items-center gap-1.5" style={{ background: "#F2F2F2" }}>
              <span className="text-[9px]" style={{ color: GIFTEE_PINK }}>🔍</span>
              <span className="text-[8px]" style={{ color: "#AAA" }}>Search</span>
            </div>
            {/* Gift cards */}
            <div className="flex flex-col gap-3 px-3 overflow-auto">
              {[
                { from: "Mohammed Almosilih", time: "14 hrs ago", store: "Ecleel cafe", item: "Blue De Chanel", qty: 2, emoji: "🧴", color: "#B8D4F0" },
                { from: "Mohammed Almosilih", time: "14 hrs ago", store: "Ecleel cafe", item: "Body Massage",   qty: 2, emoji: "🕯️", color: "#D4EED4" },
              ].map((g, i) => (
                <div key={i} className="rounded-2xl overflow-hidden" style={{ background: "#FFF", border: "1px solid #EEE" }}>
                  {/* sender row */}
                  <div className="px-2 pt-2 pb-1 flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <div className="w-5 h-5 rounded-full flex items-center justify-center text-[8px] font-bold text-white" style={{ background: "#666" }}>M</div>
                      <div>
                        <p className="text-[7px] font-bold" style={{ color: "#111" }}>{g.from}</p>
                        <div className="flex items-center gap-0.5">
                          <span className="text-[6px]" style={{ color: GIFTEE_PINK }}>🎁</span>
                          <span className="text-[6px]" style={{ color: "#888" }}>{g.store}</span>
                        </div>
                      </div>
                    </div>
                    <span className="text-[6px]" style={{ color: "#BBB" }}>{g.time}</span>
                  </div>
                  {/* product image area */}
                  <div className="mx-2 rounded-xl h-16 flex items-center justify-center mb-1" style={{ background: g.color }}>
                    <span className="text-3xl">{g.emoji}</span>
                  </div>
                  {/* product footer */}
                  <div className="px-2 pb-2 flex items-center justify-between">
                    <span className="text-[8px] font-bold" style={{ color: "#111" }}>{g.item}</span>
                    <div className="w-4 h-4 rounded-full flex items-center justify-center text-[7px] font-bold text-white" style={{ background: GIFTEE_PINK }}>{g.qty}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── View 2: Catch ── */}
        {viewIndex === 2 && (
          <div className="flex flex-col h-full" style={{ background: "#FAFAFA" }}>
            {/* Header */}
            <div className="px-3 py-2 flex items-center gap-2">
              <span className="text-[10px]" style={{ color: GIFTEE_PINK }}>←</span>
              <span className="text-[11px] font-black" style={{ color: "#111" }}>Catch</span>
            </div>
            {/* Search */}
            <div className="mx-3 mb-1.5 rounded-xl px-2.5 py-1.5 flex items-center gap-1.5" style={{ background: "#F2F2F2" }}>
              <span className="text-[8px]" style={{ color: GIFTEE_PINK }}>🔍</span>
              <span className="text-[7px]" style={{ color: "#AAA" }}>Search</span>
            </div>
            {/* Filters */}
            <div className="flex gap-1.5 px-3 mb-2 overflow-x-auto">
              {["All", "Bouquets", "Roses", "Flowers"].map((f, i) => (
                <span
                  key={f}
                  className="text-[6.5px] px-2 py-1 rounded-full whitespace-nowrap font-semibold flex-shrink-0"
                  style={{
                    background: i === 0 ? GIFTEE_LIGHT : "transparent",
                    color: i === 0 ? GIFTEE_PINK : "#888",
                    border: i === 0 ? `1px solid ${GIFTEE_PINK}60` : "1px solid #DDD",
                  }}
                >{f}</span>
              ))}
            </div>
            {/* Product grid */}
            <div className="px-3 grid grid-cols-2 gap-2">
              {[
                { name: "COCO Chanel",  sub: "Perfume House",     emoji: "🌹", soldOut: true,  color: "#F0E4E4" },
                { name: "Cappuccino",   sub: "Coffematics",       emoji: "☕", soldOut: true,  color: "#E8DDD0" },
                { name: "di Gioia",     sub: "Perfume House",     emoji: "🌸", soldOut: false, color: "#F0E8D8" },
                { name: "Body Massage", sub: "Massage House",     emoji: "🕯️", soldOut: false, color: "#E0EEE0" },
              ].map((p) => (
                <div key={p.name} className="rounded-2xl overflow-hidden" style={{ background: "#FFF", border: "1px solid #EEE" }}>
                  <div className="relative h-14 flex items-center justify-center" style={{ background: p.color }}>
                    {p.soldOut && (
                      <div className="absolute top-1 right-1 rounded-md px-1 py-0.5 text-[5.5px] font-bold text-white" style={{ background: GIFTEE_PINK }}>
                        Sold Out
                      </div>
                    )}
                    <span className="text-2xl">{p.emoji}</span>
                    <div className="absolute -bottom-2.5 right-1.5 w-5 h-5 rounded-full bg-white flex items-center justify-center text-[9px] font-bold" style={{ color: GIFTEE_PINK, boxShadow: "0 2px 6px rgba(0,0,0,0.15)" }}>+</div>
                  </div>
                  <div className="p-1.5 pt-3">
                    <p className="text-[7px] font-black" style={{ color: "#111" }}>{p.name}</p>
                    <p className="text-[6px]" style={{ color: "#999" }}>{p.sub}</p>
                    <div className="mt-0.5 flex justify-end">
                      <span className="text-[9px]" style={{ color: GIFTEE_PINK }}>🎁</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ── JOYA Mockup — uses real screenshots from /public/portfolio/ ───────────────
const JOYA_NAVY = "#1B2B6B";
const JOYA_GOLD = "#C9A84C";

const JOYA_SCREENS = [
  { src: "/portfolio/home.svg",      alt: "JOYA Home"      },
  { src: "/portfolio/Brands.svg",    alt: "JOYA Brands"    },
  { src: "/portfolio/occasions.svg", alt: "JOYA Occasions" },
];

function JoyaMockup({ viewIndex }: MockupProps) {
  const screen = JOYA_SCREENS[viewIndex] ?? JOYA_SCREENS[0];
  return <PhoneImageMockup src={screen.src} alt={screen.alt} />;
}

function JoyaMockupLEGACY({ viewIndex }: MockupProps) {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div
        className="relative overflow-hidden rounded-[16px] w-[170px] h-[345px] flex-shrink-0"
        style={{
          background: "#FFFFFF",
          boxShadow: "0 20px 50px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.15)",
          border: "1px solid rgba(255,255,255,0.10)",
        }}
      >
        {/* Status bar */}
        <div className="flex justify-between items-center px-3 pt-2 pb-0.5" style={{ background: "#FFF" }}>
          <span className="text-[7.5px] font-bold" style={{ color: "#111" }}>9:41</span>
          <div className="flex items-center gap-0.5 text-[7px]" style={{ color: "#111" }}>▲▲▲ ⬛</div>
        </div>

        {/* ── View 0: Select Store ── */}
        {viewIndex === 0 && (
          <div className="flex flex-col h-full" style={{ background: "#FFF" }}>
            {/* Header */}
            <div className="px-3 pt-1 pb-2 flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className="text-[9px]" style={{ color: JOYA_NAVY }}>‹</span>
                <span className="text-[10px] font-bold" style={{ color: "#111" }}>Select Store</span>
              </div>
              <div className="flex items-center gap-1">
                {[false, true].map((active, i) => (
                  <div key={i} className="w-6 h-6 rounded-lg flex items-center justify-center" style={{ border: `1px solid ${active ? JOYA_NAVY : "#DDD"}`, background: active ? `${JOYA_NAVY}10` : "transparent" }}>
                    <div className="grid grid-cols-2 gap-[1.5px]">
                      {Array(4).fill(0).map((_, j) => (
                        <div key={j} className="w-[3px] h-[3px] rounded-[0.5px]" style={{ background: active ? JOYA_NAVY : "#999" }} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Step indicator */}
            <div className="flex items-center justify-center gap-1 px-4 mb-3">
              {[1, 2, 3].map((n) => (
                <div key={n} className="flex items-center gap-1">
                  <div
                    className="w-5 h-5 rounded-full flex items-center justify-center text-[7px] font-bold"
                    style={{
                      background: n === 1 ? JOYA_NAVY : "transparent",
                      color: n === 1 ? "#FFF" : "#AAA",
                      border: n !== 1 ? "1.5px solid #DDD" : "none",
                    }}
                  >{n}</div>
                  {n < 3 && <div className="h-px flex-1 w-6" style={{ background: n === 1 ? JOYA_NAVY : "#E0E0E0" }} />}
                </div>
              ))}
            </div>

            {/* Category filters */}
            <div className="flex gap-1.5 px-3 mb-2 overflow-x-hidden">
              {["All", "Fashion", "Beauty", "Jewellery"].map((f, i) => (
                <span
                  key={f}
                  className="text-[6.5px] px-2 py-1 rounded-lg whitespace-nowrap font-medium flex-shrink-0"
                  style={{
                    background: i === 1 ? `${JOYA_NAVY}15` : "#F2F2F2",
                    color: i === 1 ? JOYA_NAVY : "#888",
                    border: i === 1 ? `1px solid ${JOYA_NAVY}40` : "1px solid transparent",
                    fontWeight: i === 1 ? 700 : 400,
                  }}
                >{f}</span>
              ))}
            </div>

            {/* Search */}
            <div className="mx-3 mb-2.5 rounded-xl px-2.5 py-2 flex items-center gap-1.5" style={{ border: "1px solid #E8E8E8" }}>
              <span className="text-[8px]" style={{ color: "#AAA" }}>🔍</span>
              <span className="text-[7.5px]" style={{ color: "#BBB" }}>Search Stores</span>
            </div>

            {/* Store cards */}
            <div className="flex flex-col gap-2 px-3 overflow-hidden">
              {[
                { name: "CHANEL",     symbol: "CC", color: "#000", bg: "#FFF"  },
                { name: "BEVERLY HILLS\nPOLO CLUB", symbol: "🐎", color: JOYA_NAVY, bg: "#F8F9FF" },
              ].map((brand) => (
                <div
                  key={brand.name}
                  className="rounded-2xl flex flex-col items-center justify-center py-4"
                  style={{ background: brand.bg, border: "1px solid #EEE", minHeight: 70 }}
                >
                  <div className="flex items-center gap-1 mb-0.5">
                    <div className="w-4 h-4 rounded-full border flex items-center justify-center text-[8px] font-black" style={{ borderColor: brand.color, color: brand.color }}>
                      {brand.symbol === "CC" ? "⊗" : brand.symbol}
                    </div>
                  </div>
                  <span
                    className="text-[7.5px] font-black tracking-[0.15em] whitespace-pre-line text-center"
                    style={{ color: brand.color }}
                  >{brand.name}</span>
                  {/* heart + share row */}
                  <div className="flex gap-1.5 mt-2">
                    {["♡", "↑"].map((icon) => (
                      <div key={icon} className="w-4 h-4 rounded-full flex items-center justify-center text-[7px]" style={{ background: "#F0F0F0", color: "#888" }}>{icon}</div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── View 1: Home ── */}
        {viewIndex === 1 && (
          <div className="flex flex-col h-full overflow-hidden" style={{ background: "#FFF" }}>
            {/* Header */}
            <div className="px-3 py-1.5 flex items-center justify-between">
              <div className="flex items-center gap-1">
                <span className="text-[10px]" style={{ color: JOYA_GOLD }}>✦</span>
                <span className="text-[11px] font-black" style={{ color: JOYA_NAVY, letterSpacing: "-0.02em" }}>JOYA</span>
              </div>
              <div className="flex items-center gap-1">
                {["🔍", "🔔", "🛒", "💬"].map((icon) => (
                  <div key={icon} className="w-5 h-5 rounded-full flex items-center justify-center text-[8px]" style={{ background: "#F5F5F5" }}>{icon}</div>
                ))}
                <div className="rounded-full px-1.5 py-0.5 text-[5.5px] font-bold text-white ml-0.5" style={{ background: JOYA_NAVY }}>التوصيل</div>
              </div>
            </div>

            {/* Hero banner — Chanel N5 */}
            <div className="mx-2 mb-1.5 rounded-xl overflow-hidden h-20 flex items-center justify-center" style={{ background: `linear-gradient(135deg, #8B0000 0%, #C0392B 40%, #922B21 100%)` }}>
              <div className="text-center">
                <div className="text-[7px] font-bold text-white/80 tracking-widest">Nº5</div>
                <div className="text-[9px] font-black text-white tracking-[0.2em]">CHANEL</div>
                <div className="text-[5.5px] text-white/70 tracking-[0.15em]">PARIS · PARFUM</div>
              </div>
              <div className="text-3xl ml-2">🌹</div>
            </div>

            {/* Second banner — Joya Chanel flowers */}
            <div className="mx-2 mb-2 rounded-xl overflow-hidden h-10 flex items-center px-3 gap-2" style={{ background: `linear-gradient(135deg, #1a1a2e, #2d2d44)` }}>
              <span className="text-[9px] font-black text-white">JOYA</span>
              <div className="flex gap-1">
                <span className="text-[11px]">🌸</span><span className="text-[11px]">🌺</span><span className="text-[11px]">🌷</span>
              </div>
              <span className="text-[6.5px] text-white/60 ml-auto">CHANEL</span>
            </div>

            {/* Brands */}
            <div className="px-3 mb-1.5">
              <p className="text-[8px] font-bold mb-1.5" style={{ color: "#111" }}>Brands</p>
              <div className="flex gap-1.5 overflow-x-hidden">
                {["C&K", "CC", "GCC", "🐎", "LV"].map((b, i) => (
                  <div key={i} className="w-8 h-8 rounded-full border flex items-center justify-center text-[6px] font-black flex-shrink-0" style={{ borderColor: "#E8E8E8", color: JOYA_NAVY }}>{b}</div>
                ))}
              </div>
            </div>

            {/* Occasions strip */}
            <div className="px-3 mb-1">
              <p className="text-[8px] font-bold mb-1.5" style={{ color: "#111" }}>Occasions</p>
              <div className="flex gap-1.5 overflow-x-hidden">
                {["🎂", "🎓", "🏠", "👶", "💐"].map((icon, i) => (
                  <div key={i} className="w-10 h-10 rounded-xl flex items-center justify-center text-[14px] flex-shrink-0" style={{ background: "#F0F3FA", border: `1px solid ${JOYA_NAVY}15` }}>{icon}</div>
                ))}
              </div>
            </div>

            {/* Bottom nav */}
            <div className="mt-auto border-t flex justify-around py-2" style={{ borderColor: "#EEE" }}>
              {[{ label: "Home", icon: "🏠", active: true }, { label: "Moments", icon: "✨", active: false }, { label: "Social", icon: "👥", active: false }, { label: "Account", icon: "👤", active: false }].map((n) => (
                <div key={n.label} className="flex flex-col items-center gap-0.5">
                  <span className="text-[10px]">{n.icon}</span>
                  <span className="text-[5.5px] font-semibold" style={{ color: n.active ? JOYA_NAVY : "#999" }}>{n.label}</span>
                  {n.active && <div className="w-3 h-0.5 rounded-full" style={{ background: JOYA_NAVY }} />}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── View 2: Occasions ── */}
        {viewIndex === 2 && (
          <div className="flex flex-col h-full" style={{ background: "#FFF" }}>
            {/* Header */}
            <div className="px-3 pt-1 pb-2 flex items-center gap-1.5">
              <span className="text-[9px]" style={{ color: JOYA_NAVY }}>‹</span>
              <span className="text-[10px] font-bold" style={{ color: "#111" }}>Occasions</span>
            </div>

            {/* 3-col occasion grid */}
            <div className="px-2 grid grid-cols-3 gap-1.5">
              {[
                { icon: "📋", label: "New Job",    bg: "#1B2B6B" },
                { icon: "🏠", label: "New Home",   bg: "#1B2B6B" },
                { icon: "🎂", label: "Birthday",   bg: "#1B2B6B" },
                { icon: "🎓", label: "Graduation", bg: "#1B2B6B" },
                { icon: "💐", label: "Get Well",   bg: "#1B2B6B" },
                { icon: "👶", label: "New Baby",   bg: "#1B2B6B" },
                { icon: "⏳", label: "Retirement", bg: "#1B2B6B" },
              ].map((occ, i) => (
                <motion.div
                  key={occ.label}
                  className="flex flex-col items-center gap-1"
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.05, duration: 0.3 }}
                >
                  <div
                    className="w-full rounded-xl overflow-hidden flex items-center justify-center"
                    style={{ height: 52, background: `linear-gradient(155deg, ${occ.bg} 0%, #2d4299 100%)` }}
                  >
                    <div className="text-[22px]">{occ.icon}</div>
                  </div>
                  <span className="text-[6.5px] font-medium text-center" style={{ color: "#333" }}>{occ.label}</span>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const MOCKUP_MAP: Record<string, (p: MockupProps) => JSX.Element> = {
  finance:    FinanceMockup,
  health:     HealthMockup,
  shop:       ShopMockup,
  gaming:     GamingMockup,
  ai:         AIMockup,
  realestate: RealEstateMockup,
  giftee:     GifteeMockup,
  joya:       JoyaMockup,
};

/* ────────────────────────────────────────────────────────────────────────────
 *  INTERNAL IMAGE CAROUSEL — auto-rotates through 3 views per card
 * ────────────────────────────────────────────────────────────────────────── */
function ImageCarousel({ item, paused }: { item: Case; paused: boolean }) {
  const [viewIdx, setViewIdx] = useState(0);
  const Mockup = MOCKUP_MAP[item.mockup];

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => {
      setViewIdx((v) => (v + 1) % item.views.length);
    }, 3500);
    return () => clearInterval(id);
  }, [paused, item.views.length]);

  return (
    <div className="relative h-full w-full overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={item.id + "-" + viewIdx}
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.96 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 p-6"
        >
          <Mockup viewIndex={viewIdx} />
        </motion.div>
      </AnimatePresence>

      {/* View label pill — top-left */}
      <div className="absolute top-3 left-3 z-10 flex items-center gap-2 pointer-events-none">
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[9px] font-mono uppercase tracking-widest"
             style={{
               background: "rgba(10,14,26,0.85)",
               color: ACCENT,
               border: `1px solid ${ACCENT_MID}`,
               backdropFilter: "blur(8px)",
             }}>
          <Sparkles size={9} />
          {item.industry}
        </div>
      </div>

      {/* Active view pill — top-right (shows current view name) */}
      <div className="absolute top-3 right-3 z-10 pointer-events-none">
        <AnimatePresence mode="wait">
          <motion.div
            key={item.id + "-pill-" + viewIdx}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.25 }}
            className="px-2.5 py-1 rounded-full text-[9px] font-mono uppercase tracking-widest"
            style={{
              background: "rgba(10,14,26,0.85)",
              color: "rgba(255,255,255,0.7)",
              border: "1px solid rgba(255,255,255,0.08)",
              backdropFilter: "blur(8px)",
            }}
          >
            {item.views[viewIdx]}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Dot indicators — bottom-center */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 flex items-center gap-1.5">
        {item.views.map((_, i) => {
          const isActive = i === viewIdx;
          return (
            <button
              key={i}
              onClick={(e) => { e.stopPropagation(); setViewIdx(i); }}
              aria-label={`View ${item.views[i]}`}
              className="h-1.5 rounded-full transition-all duration-300"
              style={{
                width: isActive ? 20 : 6,
                background: isActive ? ACCENT : "rgba(255,255,255,0.25)",
                boxShadow: isActive ? `0 0 8px ${ACCENT}80` : "none",
              }}
            />
          );
        })}
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────────────────
 *  CASE CARD (vertical: image-top, content-bottom)
 * ────────────────────────────────────────────────────────────────────────── */
const cardContentVariants: Variants = {
  initial: { opacity: 0, y: 12 },
  enter:   {
    opacity: 1, y: 0,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1], staggerChildren: 0.07, delayChildren: 0.05 },
  },
};
const itemVariants: Variants = {
  initial: { opacity: 0, y: 10 },
  enter:   { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
};

function CaseCard({ item, isActive }: { item: Case; isActive: boolean }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="flex-shrink-0 rounded-3xl overflow-hidden flex flex-row"
      style={{
        width: "calc((100% - 24px) / 2)",  // 2 cards visible with 24px gap
        height: "min(540px, calc(100vh - 240px))",
        background: BG_PANEL,
        border: `1px solid ${isActive ? ACCENT_MID : "rgba(255,255,255,0.08)"}`,
        boxShadow: isActive
          ? `0 30px 60px -20px rgba(0,0,0,0.55), 0 0 50px ${ACCENT}25, inset 0 1px 0 rgba(255,255,255,0.04)`
          : `0 20px 50px -20px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.04)`,
        transition: "border-color 400ms, box-shadow 400ms",
      }}
    >
      {/* ── LEFT: Image area with internal carousel ── */}
      <div
        className="relative border-r flex-shrink-0 h-full"
        style={{
          width: "42%",
          background: `linear-gradient(140deg, ${BG_PANEL} 0%, #0A0E1A 100%)`,
          borderColor: "rgba(255,255,255,0.06)",
        }}
      >
        <ImageCarousel item={item} paused={hovered} />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse at center, transparent 50%, rgba(10,14,26,0.4) 100%)" }}
        />
      </div>

      {/* ── RIGHT: Content area ── */}
      <motion.div
        key={item.id + "-c"}
        variants={cardContentVariants}
        initial="initial"
        animate="enter"
        className="flex-1 p-5 flex flex-col min-h-0 min-w-0"
      >
        {/* Top meta */}
        <motion.div variants={itemVariants} className="flex items-center gap-2 mb-2 flex-wrap">
          <span className="text-[10px] text-white/50 font-mono truncate">{item.client}</span>
          <span className="w-1 h-1 rounded-full bg-white/20 flex-shrink-0" />
          <span className="text-[10px] text-white/50 font-mono">{item.year}</span>
        </motion.div>

        {/* Title */}
        <motion.h3
          variants={itemVariants}
          className="text-2xl font-bold text-white tracking-tight leading-[1.05] mb-2.5"
        >
          {item.title}
        </motion.h3>

        {/* Description — now richer, up to ~7 lines */}
        <motion.p
          variants={itemVariants}
          className="text-white/55 text-[12.5px] leading-[1.55] mb-4 overflow-hidden"
          style={{
            display: "-webkit-box",
            WebkitLineClamp: 7,
            WebkitBoxOrient: "vertical",
          }}
        >
          {item.desc}
        </motion.p>

        {/* Metrics row — pushed to bottom */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-3 gap-1.5 mb-3 mt-auto"
        >
          {item.metrics.map((m) => (
            <div
              key={m.label}
              className="rounded-lg p-2 border min-w-0"
              style={{ background: "rgba(255,255,255,0.02)", borderColor: "rgba(255,255,255,0.06)" }}
            >
              <div className="text-[7.5px] text-white/35 uppercase tracking-wider mb-0.5 font-mono truncate">
                {m.label}
              </div>
              <div className="text-base font-bold leading-none tabular-nums truncate" style={{ color: ACCENT }}>
                {m.prefix}
                <Counter to={m.value} suffix={m.suffix} duration={1.6} />
              </div>
            </div>
          ))}
        </motion.div>

        {/* Tags + CTA */}
        <motion.div variants={itemVariants} className="flex items-center justify-between gap-2">
          <div className="flex flex-wrap gap-1 flex-1 min-w-0">
            {item.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="text-[8.5px] font-mono px-1.5 py-0.5 rounded-full whitespace-nowrap"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  color: "rgba(255,255,255,0.55)",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
          <motion.a
            href={`#case-${item.id}`}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 350, damping: 22 }}
            className="group flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center"
            style={{
              background: ACCENT_SOFT,
              color: ACCENT,
              border: `1px solid ${ACCENT_MID}`,
            }}
            aria-label={`View ${item.title} case study`}
          >
            <ArrowUpRight size={13} className="group-hover:rotate-45 transition-transform duration-300" />
          </motion.a>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

/* ────────────────────────────────────────────────────────────────────────────
 *  MAIN PORTFOLIO — scroll-hijack horizontal carousel with 2 cards visible
 * ────────────────────────────────────────────────────────────────────────── */
export function Portfolio() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef   = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const [activeIdx, setActiveIdx]      = useState(0);
  const [scrollPct, setScrollPct]      = useState(0);
  const [maxScroll, setMaxScroll]      = useState(0);
  const [inCardsZone, setInCardsZone]  = useState(false);

  // RAF state
  const targetXRef  = useRef(0);
  const currentXRef = useRef(0);

  // ── Wheel hijack with native cursor tracking ──────────────────────────────
  // Native mouseenter/mouseleave update a closure variable synchronously,
  // so the wheel handler always has the correct cursor state.
  useEffect(() => {
    const section = sectionRef.current;
    const wrapper = wrapperRef.current;
    const track   = trackRef.current;
    if (!section || !wrapper || !track) return;

    let raf: number;
    let cursorOver = false;  // closure variable — updated synchronously by native events

    const getMax = () => Math.max(0, track.scrollWidth - wrapper.clientWidth);
    setMaxScroll(getMax());

    const tick = () => {
      currentXRef.current += (targetXRef.current - currentXRef.current) * 0.10;
      if (Math.abs(targetXRef.current - currentXRef.current) < 0.1) {
        currentXRef.current = targetXRef.current;
      }
      track.style.transform = `translateX(${-currentXRef.current}px)`;
      const max = getMax();
      const pct = max > 0 ? currentXRef.current / max : 0;
      setScrollPct(pct);
      setActiveIdx(Math.round(pct * (CASES.length - 1)));
      raf = requestAnimationFrame(tick);
    };

    // Native enter/leave — fire synchronously, before any wheel event
    const onEnter = () => { cursorOver = true;  setInCardsZone(true);  };
    const onLeave = () => { cursorOver = false; setInCardsZone(false); };
    wrapper.addEventListener("mouseenter", onEnter);
    wrapper.addEventListener("mouseleave", onLeave);

    // Wheel listener attached DIRECTLY to the wrapper — this is the only reliable
    // way to call preventDefault and block page scroll while over the cards.
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      e.stopPropagation();
      const max = getMax();
      targetXRef.current = Math.max(0, Math.min(max, targetXRef.current + e.deltaY * 1.4));
    };

    const onResize = () => setMaxScroll(getMax());

    // Attach to WRAPPER (not section) with passive:false so browser respects preventDefault
    wrapper.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("resize", onResize);
    raf = requestAnimationFrame(tick);

    return () => {
      wrapper.removeEventListener("wheel", onWheel);
      window.removeEventListener("resize", onResize);
      wrapper.removeEventListener("mouseenter", onEnter);
      wrapper.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, []);

  // These are still used for keyboard navigation and arrow-button clicks
  const enterCards = useCallback(() => setInCardsZone(true),  []);
  const leaveCards = useCallback(() => setInCardsZone(false), []);

  // ── Navigation: snap to a specific card index ─────────────────────────────
  const goTo = useCallback((i: number) => {
    const idx = Math.max(0, Math.min(CASES.length - 1, i));
    const max = maxScroll;
    targetXRef.current = max > 0 ? (idx / (CASES.length - 1)) * max : 0;
  }, [maxScroll]);

  const next = useCallback(() => goTo(activeIdx + 1), [activeIdx, goTo]);
  const prev = useCallback(() => goTo(activeIdx - 1), [activeIdx, goTo]);

  // ── Keyboard navigation ───────────────────────────────────────────────────
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const rect = sectionRef.current?.getBoundingClientRect();
      if (!rect) return;
      const inView = rect.top < window.innerHeight * 0.5 && rect.bottom > window.innerHeight * 0.5;
      if (!inView) return;
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft")  prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev]);

  return (
    <section
      ref={sectionRef}
      id="portfolio"
      className="relative py-20 md:py-28 px-5 md:px-10 overflow-hidden select-none"
      style={{ background: BG_PAGE }}
    >
      {/* Dot grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.30]"
        style={{
          backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
          maskImage: "radial-gradient(ellipse at center, black 30%, transparent 80%)",
          WebkitMaskImage: "radial-gradient(ellipse at center, black 30%, transparent 80%)",
        }}
      />
      {/* Single ambient accent */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${ACCENT}10 0%, transparent 70%)`,
          filter: "blur(80px)",
        }}
      />

      <div className="max-w-7xl mx-auto relative">
        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8"
        >
          <div>
            <div
              className="inline-flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.28em] mb-4 px-3 py-1.5 rounded-full"
              style={{ background: ACCENT_SOFT, color: ACCENT, border: `1px solid ${ACCENT_MID}` }}
            >
              <motion.span
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: ACCENT, boxShadow: `0 0 6px ${ACCENT}` }}
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              Case Studies
            </div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white leading-[1.05]">
              Built for impact
            </h2>
            <p className="text-white/45 mt-2.5 max-w-md text-sm md:text-base">
              Scroll to swipe through our work. Each card carousel shows multiple product views.
            </p>
          </div>

          {/* Counter — desktop */}
          <div className="hidden md:flex items-baseline gap-3 font-mono">
            <span className="text-5xl font-bold tabular-nums" style={{ color: ACCENT }}>
              {String(activeIdx + 1).padStart(2, "0")}
            </span>
            <span className="text-2xl text-white/30">/</span>
            <span className="text-2xl text-white/40 tabular-nums">
              {String(CASES.length).padStart(2, "0")}
            </span>
          </div>
        </motion.div>

        {/* ── Carousel: 2-card track ── cursor-gated scroll hijack ── */}
        <div
          ref={wrapperRef}
          onMouseEnter={enterCards}
          onMouseLeave={leaveCards}
          className="overflow-hidden relative"
          style={{
            transition: "box-shadow 300ms",
            boxShadow: inCardsZone ? `0 0 0 1px ${ACCENT}25, 0 0 60px -10px ${ACCENT}30` : "none",
            borderRadius: 28,
          }}
        >
          <div
            ref={trackRef}
            className="flex gap-6 will-change-transform"
            style={{ transition: "none" }}
          >
            {CASES.map((c, i) => (
              <CaseCard key={c.id} item={c} isActive={i === activeIdx} />
            ))}
          </div>
        </div>

        {/* ── Bottom controls: progress bar + arrows + dots ── */}
        <div className="mt-8 flex flex-col gap-5">
          {/* Progress bar */}
          <div className="h-[2px] rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.06)" }}>
            <motion.div
              className="h-full rounded-full"
              style={{
                width: `${Math.max(8, scrollPct * 100)}%`,
                background: `linear-gradient(90deg, ${ACCENT}, ${ACCENT}80)`,
                boxShadow: `0 0 10px ${ACCENT}80`,
              }}
              transition={{ duration: 0.1 }}
            />
          </div>

          {/* Arrows + dots */}
          <div className="flex items-center justify-between">
            <NavArrow direction="prev" onClick={prev} disabled={activeIdx === 0} />

            <div className="flex items-center gap-2">
              {CASES.map((c, i) => {
                const isActive = i === activeIdx;
                return (
                  <button
                    key={c.id}
                    onClick={() => goTo(i)}
                    aria-label={`Go to ${c.title}`}
                    className="h-2 rounded-full transition-all duration-400 ease-out"
                    style={{
                      width: isActive ? 32 : 8,
                      background: isActive ? ACCENT : "rgba(255,255,255,0.18)",
                      boxShadow: isActive ? `0 0 12px ${ACCENT}80` : "none",
                    }}
                  />
                );
              })}
            </div>

            <NavArrow direction="next" onClick={next} disabled={activeIdx === CASES.length - 1} />
          </div>

          {/* Scroll hint — changes when cursor is over cards */}
          <div className="hidden md:flex items-center justify-center gap-2 text-[10px] font-mono uppercase tracking-widest transition-colors duration-300"
               style={{ color: inCardsZone ? ACCENT : "rgba(255,255,255,0.30)" }}>
            <motion.span
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: inCardsZone ? ACCENT : "rgba(255,255,255,0.30)" }}
              animate={inCardsZone ? { scale: [1, 1.6, 1], opacity: [1, 0.4, 1] } : { scale: 1 }}
              transition={{ duration: 1.3, repeat: Infinity }}
            />
            <span>{inCardsZone ? "Scroll to swipe cards" : "Hover the cards to enable swipe"}</span>
            <motion.span
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            >→</motion.span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Nav arrow ─────────────────────────────────────────────────────────── */
function NavArrow({ direction, onClick, disabled }: { direction: "prev" | "next"; onClick: () => void; disabled?: boolean }) {
  const Icon = direction === "prev" ? ArrowLeft : ArrowRight;
  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      whileHover={disabled ? {} : { scale: 1.05 }}
      whileTap={disabled ? {} : { scale: 0.92 }}
      transition={{ type: "spring", stiffness: 400, damping: 22 }}
      aria-label={direction === "prev" ? "Previous" : "Next"}
      className="group relative w-12 h-12 rounded-full flex items-center justify-center transition-all"
      style={{
        background: "rgba(255,255,255,0.03)",
        border: `1px solid rgba(255,255,255,0.08)`,
        opacity: disabled ? 0.35 : 1,
        cursor: disabled ? "not-allowed" : "pointer",
      }}
      onMouseEnter={(e) => {
        if (disabled) return;
        e.currentTarget.style.background = ACCENT_SOFT;
        e.currentTarget.style.borderColor = ACCENT_MID;
        e.currentTarget.style.boxShadow = `0 0 24px ${ACCENT}40`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = "rgba(255,255,255,0.03)";
        e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      <span
        className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ boxShadow: `inset 0 0 12px ${ACCENT}50` }}
      />
      <Icon size={18} className="text-white/60 group-hover:text-white transition-colors" />
    </motion.button>
  );
}

export default Portfolio;
