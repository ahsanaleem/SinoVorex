"use client";
import {
  motion, useMotionValue, useSpring, useTransform,
  useScroll, AnimatePresence,
} from "framer-motion";
import { useRef, useEffect, useState, useCallback } from "react";
import { ArrowUpRight, ArrowRight, Check, Zap, Globe } from "lucide-react";

// ── Theme ─────────────────────────────────────────────────────────────────────
const BG     = "#020617";
const CYAN   = "#06B6D4";
const VIOLET = "#8B5CF6";
const PINK   = "#EC4899";
const GREEN  = "#10B981";
const AMBER  = "#F59E0B";

// ── Stage data ────────────────────────────────────────────────────────────────
const STAGES = [
  {
    id: "discover",
    num: "01",
    label: "Discover",
    sub: "Research & strategy",
    color: AMBER,
    icon: "◎",
    duration: "Week 1–2",
  },
  {
    id: "design",
    num: "02",
    label: "Design",
    sub: "UI/UX & systems",
    color: VIOLET,
    icon: "◈",
    duration: "Week 3–4",
  },
  {
    id: "build",
    num: "03",
    label: "Build",
    sub: "Engineering",
    color: CYAN,
    icon: "◉",
    duration: "Week 5–12",
  },
  {
    id: "test",
    num: "04",
    label: "Test",
    sub: "QA & performance",
    color: GREEN,
    icon: "◑",
    duration: "Week 13–14",
  },
  {
    id: "ship",
    num: "05",
    label: "Ship",
    sub: "Deploy & scale",
    color: PINK,
    icon: "◐",
    duration: "Week 15–16",
  },
] as const;

// ── Cycling words ─────────────────────────────────────────────────────────────
const WORDS = ["PRODUCTS.", "PLATFORMS.", "EXPERIENCES.", "SYSTEMS.", "SOLUTIONS."];

// ─────────────────────────────────────────────────────────────────────────────
// Light Trails — exact port of Light Trails.html, VP shifted to right side
// Same bezier, same halfW, same 3-pass render — brand cyan/violet instead of amber
// ─────────────────────────────────────────────────────────────────────────────
function LightTrails() {
  const bgRef = useRef<HTMLCanvasElement>(null);
  const fxRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const bgEl = bgRef.current!;
    const fxEl = fxRef.current!;
    const bctx = bgEl.getContext("2d")!;
    const ctx  = fxEl.getContext("2d")!;
    const reduce = matchMedia("(prefers-reduced-motion:reduce)").matches;

    let W = 0, H = 0, DPR = 1, S = 1, rafId = 0;

    // VP matches reference screenshot: center-right, ~38% down
    const VP = { x: 0.62, y: 0.36 };

    // Bezier road spine — tuned to match the reference exactly:
    // trails converge at VP, sweep right then arc down-left (highway perspective)
    const P0 = { x: 0.62, y: 0.36 };
    const P1 = { x: 0.78, y: 0.42 };
    const P2 = { x: 0.52, y: 0.72 };
    const P3 = { x: 0.22, y: 1.12 };

    function bez(t: number) {
      const u=1-t, a=u*u*u, b=3*u*u*t, c=3*u*t*t, d=t*t*t;
      return { x:(a*P0.x+b*P1.x+c*P2.x+d*P3.x)*W, y:(a*P0.y+b*P1.y+c*P2.y+d*P3.y)*H };
    }
    function bezTan(t: number) {
      const u=1-t;
      return {
        x:(3*u*u*(P1.x-P0.x)+6*u*t*(P2.x-P1.x)+3*t*t*(P3.x-P2.x))*W,
        y:(3*u*u*(P1.y-P0.y)+6*u*t*(P2.y-P1.y)+3*t*t*(P3.y-P2.y))*H,
      };
    }

    // EXACT original halfW — creates the characteristic wide fan at the bottom
    function halfW(t: number) { return (0.012 + 0.95 * Math.pow(t, 1.6)) * W; }

    function lanePoint(t: number, u: number, wander: number) {
      const c = bez(t), tan = bezTan(t);
      const len = Math.hypot(tan.x, tan.y) || 1;
      const px = -tan.y/len, py = tan.x/len;
      const off = (u + (wander ? wander * Math.sin(t*6.0 + u*3.1) : 0)) * halfW(t);
      return { x: c.x + px*off, y: c.y + py*off };
    }

    // ── Particles — same as original HTML ─────────────────────────────────────
    interface Part { u:number; t:number; speed:number; len:number; wander:number; bright:number; hue:number; sat:number; }

    // Brand colours: cyan 185°, violet 260°, pink 328° (replacing amber 24-48°)
    function spawn(p: Partial<Part>): Part {
      const r = Math.random();
      const hue = r < 0.55 ? 185 + Math.random()*12   // cyan
                : r < 0.82 ? 258 + Math.random()*14   // violet
                :             325 + Math.random()*15; // pink
      return Object.assign(p as Part, {
        u:      Math.sign(Math.random()*2-1) * Math.pow(Math.abs(Math.random()*2-1), 0.8),
        t:      -(Math.random()*0.15),
        speed:  0.14 + Math.random()*0.18,   // original speed range
        len:    0.02  + Math.random()*0.075, // original length range
        wander: (Math.random()*2-1)*0.04,
        bright: 0.55  + Math.random()*0.45,
        hue,
        sat:    75 + Math.random()*25,
      });
    }

    const COUNT = reduce ? 70 : 200; // original count
    const parts: Part[] = [];

    function initParts() {
      parts.length = 0;
      for (let i=0; i<COUNT; i++) { const p=spawn({}); p.t=Math.random(); parts.push(p); }
    }

    // ── Static background — exact same structure as original ──────────────────
    function drawBG() {
      bctx.clearRect(0,0,W,H);
      bctx.fillStyle = "#020617"; bctx.fillRect(0,0,W,H);

      const vx = VP.x*W, vy = VP.y*H;

      // Very large warm radial glow — matches reference's big amber dome in cyan
      const g = bctx.createRadialGradient(vx,vy,0, vx,vy, Math.max(W,H)*0.75);
      g.addColorStop(0,    "rgba(6,182,212,0.65)");
      g.addColorStop(0.08, "rgba(6,182,212,0.45)");
      g.addColorStop(0.20, "rgba(6,140,200,0.28)");
      g.addColorStop(0.38, "rgba(80,30,160,0.14)");
      g.addColorStop(0.60, "rgba(20,10,50,0.04)");
      g.addColorStop(1,    "rgba(2,6,23,0)");
      bctx.fillStyle=g; bctx.fillRect(0,0,W,H);

      // Bright hot-core (reference has a very bright glowing centre)
      const c = bctx.createRadialGradient(vx,vy,0, vx,vy, Math.max(W,H)*0.12);
      c.addColorStop(0,    "rgba(230,250,255,0.95)");
      c.addColorStop(0.30, "rgba(6,182,212,0.55)");
      c.addColorStop(0.70, "rgba(6,182,212,0.10)");
      c.addColorStop(1,    "rgba(6,182,212,0)");
      bctx.fillStyle=c; bctx.fillRect(0,0,W,H);

      // Faint guide rails (same as original)
      bctx.save(); bctx.globalCompositeOperation="lighter";
      [-1,-0.55,-0.2,0.2,0.55,1].forEach((u,i) => {
        bctx.beginPath();
        for (let t=0.02; t<=1; t+=0.02) {
          const pt = lanePoint(t,u,0);
          t<0.04 ? bctx.moveTo(pt.x,pt.y) : bctx.lineTo(pt.x,pt.y);
        }
        const edge = Math.abs(u)>0.9;
        bctx.strokeStyle = i%2===0
          ? `rgba(6,182,212,${edge?0.10:0.05})`
          : `rgba(139,92,246,${edge?0.08:0.04})`;
        bctx.lineWidth = (edge?2.0:1.2)*S; bctx.stroke();
      });
      bctx.restore();

      // Vignette — dark edges, lighter in centre
      const v = bctx.createRadialGradient(W*0.62,H*0.36,H*0.10, W*0.5,H*0.5,Math.max(W,H)*0.82);
      v.addColorStop(0,"rgba(0,0,0,0)"); v.addColorStop(1,"rgba(0,0,0,0.78)");
      bctx.fillStyle=v; bctx.fillRect(0,0,W,H);
    }

    function resize() {
      DPR=Math.min(window.devicePixelRatio||1,2);
      W=window.innerWidth|0; H=window.innerHeight|0; S=H/1080;
      [bgEl,fxEl].forEach(cv=>{cv.width=W*DPR;cv.height=H*DPR;});
      bctx.setTransform(DPR,0,0,DPR,0,0); ctx.setTransform(DPR,0,0,DPR,0,0);
      drawBG();
    }
    window.addEventListener("resize",resize);

    // ── Draw streak — EXACT 3-pass from original HTML ─────────────────────────
    function drawStreak(p: Part) {
      const tHead=p.t, tTail=p.t-p.len;
      if (tHead<=0) return;
      const depthA = Math.min(1,tHead*5) * (1-Math.pow(Math.max(0,(tHead-0.82)/0.18),1.5));
      if (depthA<=0) return;
      const a = depthA * p.bright;
      const w = (0.6 + 4.6*tHead) * S;  // original width formula

      const pts:{x:number;y:number}[] = [];
      for (let i=0; i<=4; i++) {
        const tt = tTail + (tHead-tTail)*(i/4);
        if (tt<=0) continue;
        pts.push(lanePoint(tt, p.u, p.wander));
      }
      if (pts.length<2) return;

      ctx.lineCap="round"; ctx.lineJoin="round";
      ctx.beginPath(); ctx.moveTo(pts[0].x,pts[0].y);
      for (let i=1;i<pts.length;i++) ctx.lineTo(pts[i].x,pts[i].y);

      // Original 3-pass render
      ctx.strokeStyle=`hsla(${p.hue},${p.sat}%,55%,${a*0.45})`;
      ctx.lineWidth=w*2.6; ctx.stroke();

      ctx.strokeStyle=`hsla(${p.hue},${p.sat}%,62%,${a*0.7})`;
      ctx.lineWidth=w*1.25; ctx.stroke();

      ctx.strokeStyle=`hsla(${p.hue+6},100%,${78+10*p.bright}%,${a})`;
      ctx.lineWidth=Math.max(0.6,w*0.5); ctx.stroke();
    }

    // ── Loop — exact same as original ────────────────────────────────────────
    let clock = 0;
    function step(dt: number) {
      clock += dt;
      ctx.globalCompositeOperation="destination-out";
      ctx.fillStyle=`rgba(0,0,0,${reduce?1:0.10})`; ctx.fillRect(0,0,W,H);
      ctx.globalCompositeOperation="lighter";
      for (const p of parts) {
        p.t += p.speed*dt;
        if (p.t-p.len>1.05) spawn(p);
        drawStreak(p);
      }
      // Pulsing source bloom (original pulsing bloom)
      const vx=VP.x*W, vy=VP.y*H;
      const pulse = 0.5+0.5*Math.sin(clock*0.7);
      const r = Math.max(W,H)*(0.05+0.012*pulse);
      const bloom=ctx.createRadialGradient(vx,vy,0,vx,vy,r);
      bloom.addColorStop(0,`rgba(200,242,255,${0.16+0.08*pulse})`);
      bloom.addColorStop(1,"rgba(6,182,212,0)");
      ctx.fillStyle=bloom; ctx.fillRect(vx-r,vy-r,r*2,r*2);
    }

    let last=performance.now();
    function frame(now:number){ step(Math.min(0.05,(now-last)/1000)); last=now; rafId=requestAnimationFrame(frame); }

    resize(); initParts();
    for (let k=0;k<120;k++) step(1/60); // warm-up like original
    if (!reduce) { last=performance.now(); rafId=requestAnimationFrame(frame); }

    return()=>{ cancelAnimationFrame(rafId); window.removeEventListener("resize",resize); };
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full" style={{ background: "#020617" }}>
      <canvas ref={bgRef} className="absolute inset-0 w-full h-full" style={{ zIndex: 0 }} />
      <canvas ref={fxRef} className="absolute inset-0 w-full h-full" style={{ zIndex: 1 }} />
      {/* Left text shield — protects text area, reveals full animation on right */}
      <div className="absolute inset-0" style={{ zIndex: 2,
        background: "linear-gradient(to right,#020617 0%,#020617f5 8%,#020617d0 18%,#02061780 30%,#02061730 42%,transparent 55%)" }} />
      <div className="absolute bottom-0 left-0 right-0 h-44" style={{ zIndex: 2,
        background: "linear-gradient(to top,#020617,transparent)" }} />
      <div className="absolute top-0 left-0 right-0 h-20" style={{ zIndex: 2,
        background: "linear-gradient(to bottom,#020617,transparent)" }} />
    </div>
  );
}

// ── Cycling word ──────────────────────────────────────────────────────────────
function CyclingWord() {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setIdx(i => (i + 1) % WORDS.length), 2600);
    return () => clearInterval(id);
  }, []);
  return (
    <AnimatePresence mode="wait">
      <motion.span key={WORDS[idx]} className="inline-block"
        style={{ background: `linear-gradient(100deg,${CYAN},${VIOLET},${PINK})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}
        initial={{ clipPath: "inset(0 0 100% 0)", opacity: 0 }}
        animate={{ clipPath: "inset(0 0 0% 0)", opacity: 1 }}
        exit={{ clipPath: "inset(100% 0 0% 0)", opacity: 0 }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      >{WORDS[idx]}</motion.span>
    </AnimatePresence>
  );
}

// ── Line reveal ───────────────────────────────────────────────────────────────
function LineReveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <div className="overflow-hidden">
      <motion.div initial={{ y: "108%", opacity: 0 }} animate={{ y: "0%", opacity: 1 }}
        transition={{ duration: 1, delay, ease: [0.16, 1, 0.3, 1] }}>
        {children}
      </motion.div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Stage preview animations
// ─────────────────────────────────────────────────────────────────────────────

// 01 Discover — animated requirements checklist
function DiscoverPreview() {
  const items = [
    "User research interviews",
    "Competitive analysis",
    "Technical feasibility",
    "Product roadmap v1",
    "Success metrics defined",
  ];
  const [done, setDone] = useState(0);
  useEffect(() => {
    setDone(0);
    const id = setInterval(() => setDone(d => { if (d >= items.length) { clearInterval(id); return d; } return d + 1; }), 500);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="space-y-2 py-1">
      {items.map((item, i) => (
        <motion.div key={item} className="flex items-center gap-2.5"
          initial={{ opacity: 0, x: -10 }} animate={{ opacity: i < done ? 1 : 0.25, x: 0 }}
          transition={{ duration: 0.4, delay: i * 0.08 }}>
          <motion.div
            className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0"
            style={{ background: i < done ? `${AMBER}25` : "rgba(255,255,255,0.05)", border: `1px solid ${i < done ? AMBER : "rgba(255,255,255,0.12)"}` }}
            animate={{ scale: i === done - 1 ? [1, 1.3, 1] : 1 }}
            transition={{ duration: 0.3 }}
          >
            {i < done && <Check size={8} style={{ color: AMBER }} />}
          </motion.div>
          <span className="text-[11px] font-mono" style={{ color: i < done ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0.3)" }}>{item}</span>
        </motion.div>
      ))}
      <motion.div className="mt-3 h-1 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.06)" }}>
        <motion.div className="h-full rounded-full" style={{ background: AMBER }}
          animate={{ width: `${(done / items.length) * 100}%` }} transition={{ duration: 0.5, ease: [0.16,1,0.3,1] }} />
      </motion.div>
      <div className="flex justify-between text-[9px] font-mono" style={{ color: "rgba(255,255,255,0.3)" }}>
        <span>Discovery phase</span><span style={{ color: AMBER }}>{done}/{items.length} complete</span>
      </div>
    </div>
  );
}

// 02 Design — animated UI component grid
function DesignPreview() {
  const components = [
    { label: "Button", w: "full", h: 8 },
    { label: "Input", w: "full", h: 8 },
    { label: "Card", w: "1/2", h: 16 },
    { label: "Modal", w: "1/2", h: 16 },
    { label: "Nav", w: "full", h: 8 },
  ];
  return (
    <div className="space-y-1.5">
      {/* colour swatches */}
      <div className="flex gap-1.5 mb-2">
        {[VIOLET, CYAN, PINK, AMBER, GREEN, "#fff"].map((c, i) => (
          <motion.div key={c} className="w-4 h-4 rounded-full" style={{ background: c }}
            initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: i * 0.06, type: "spring", stiffness: 400 }} />
        ))}
        <span className="text-[9px] font-mono ml-auto" style={{ color: "rgba(255,255,255,0.3)" }}>Design tokens</span>
      </div>
      {/* component wireframes */}
      {components.map((c, i) => (
        <motion.div key={c.label} className="rounded-lg flex items-center px-2 gap-2 overflow-hidden"
          style={{ height: c.h * 4, background: `${VIOLET}10`, border: `1px solid ${VIOLET}25`, width: "100%" }}
          initial={{ scaleX: 0, opacity: 0 }} animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.1 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}>
          <div className="w-1 h-full" style={{ background: `${VIOLET}50` }} />
          <span className="text-[9px] font-mono" style={{ color: `${VIOLET}cc` }}>{c.label}</span>
          <div className="ml-auto flex gap-1">
            {[VIOLET, CYAN].map(col => <div key={col} className="w-1.5 h-1.5 rounded-full" style={{ background: col, opacity: 0.5 }} />)}
          </div>
        </motion.div>
      ))}
      <div className="flex items-center gap-2 mt-2">
        <motion.div className="text-[9px] font-mono px-2 py-0.5 rounded-full" style={{ background: `${VIOLET}20`, color: VIOLET, border: `1px solid ${VIOLET}40` }}
          animate={{ opacity: [1, 0.5, 1] }} transition={{ duration: 1.5, repeat: Infinity }}>
          ● Figma synced
        </motion.div>
        <span className="text-[9px] font-mono" style={{ color: "rgba(255,255,255,0.25)" }}>12 components ready</span>
      </div>
    </div>
  );
}

// 03 Build — live code editor
const CODE = [
  { t: `import { useLive } from '@appvix/sdk'`, c: CYAN },
  { t: `import { Dashboard } from './components'`, c: "rgba(255,255,255,0.5)" },
  { t: ``, c: "" },
  { t: `export const App = () => {`, c: "rgba(255,255,255,0.85)" },
  { t: `  const { data, status } = useLive()`, c: VIOLET },
  { t: `  const metrics = useMetrics(data)`, c: VIOLET },
  { t: ``, c: "" },
  { t: `  return (`, c: "rgba(255,255,255,0.85)" },
  { t: `    <Dashboard`, c: CYAN },
  { t: `      data={data}`, c: AMBER },
  { t: `      realtime={true}`, c: GREEN },
  { t: `    />`, c: CYAN },
  { t: `  )`, c: "rgba(255,255,255,0.85)" },
  { t: `}`, c: "rgba(255,255,255,0.85)" },
];
function BuildPreview() {
  const [lines, setLines] = useState(0);
  useEffect(() => {
    setLines(0);
    const id = setInterval(() => setLines(l => l >= CODE.length ? l : l + 1), 200);
    return () => clearInterval(id);
  }, []);
  return (
    <div>
      <div className="flex items-center gap-1.5 mb-2 pb-2" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        {[PINK, AMBER, GREEN].map(c => <div key={c} className="w-2 h-2 rounded-full" style={{ background: c }} />)}
        <span className="text-[9px] font-mono ml-2" style={{ color: "rgba(255,255,255,0.3)" }}>app.tsx</span>
        <motion.div className="ml-auto flex items-center gap-1" animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.5, repeat: Infinity }}>
          <div className="w-1.5 h-1.5 rounded-full" style={{ background: GREEN }} />
          <span className="text-[8px] font-mono" style={{ color: GREEN }}>compiling</span>
        </motion.div>
      </div>
      <div className="space-y-0.5 font-mono text-[10px] leading-[1.6]">
        {CODE.map((line, i) => (
          <div key={i} className="flex gap-2" style={{ opacity: i < lines ? 1 : 0.08 }}>
            <span className="w-3.5 text-right flex-shrink-0" style={{ color: "rgba(255,255,255,0.15)", fontSize: 9 }}>{line.t ? i+1 : ""}</span>
            <span style={{ color: line.c }} className="whitespace-pre">
              {line.t}
              {i === lines - 1 && <motion.span className="inline-block w-[5px] h-[11px] ml-0.5 align-text-bottom rounded-[1px]" style={{ background: CYAN }}
                animate={{ opacity: [1, 0, 1] }} transition={{ duration: 0.5, repeat: Infinity }} />}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// 04 Test — animated test suite
const TESTS = [
  { name: "Auth › login flow",       ms: 42,  pass: true  },
  { name: "API › endpoints (38)",    ms: 128, pass: true  },
  { name: "UI › component render",   ms: 67,  pass: true  },
  { name: "Perf › Lighthouse score", ms: 0,   pass: true, score: 98 },
  { name: "E2E › checkout flow",     ms: 340, pass: true  },
];
function TestPreview() {
  const [done, setDone] = useState(0);
  useEffect(() => {
    setDone(0);
    const id = setInterval(() => setDone(d => { if (d >= TESTS.length) { clearInterval(id); return d; } return d + 1; }), 450);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="space-y-1.5">
      {TESTS.map((t, i) => (
        <motion.div key={t.name} className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg"
          style={{ background: i < done ? `${GREEN}08` : "rgba(255,255,255,0.03)", border: `1px solid ${i < done ? GREEN + "30" : "rgba(255,255,255,0.06)"}` }}
          initial={{ opacity: 0 }} animate={{ opacity: i < done ? 1 : 0.3 }} transition={{ duration: 0.3 }}>
          <motion.div className="w-3.5 h-3.5 rounded-full flex items-center justify-center flex-shrink-0"
            style={{ background: i < done ? `${GREEN}30` : "rgba(255,255,255,0.05)" }}
            animate={i === done - 1 ? { scale: [1, 1.4, 1] } : {}} transition={{ duration: 0.3 }}>
            {i < done && <Check size={7} style={{ color: GREEN }} />}
          </motion.div>
          <span className="text-[10px] font-mono flex-1 truncate" style={{ color: i < done ? "rgba(255,255,255,0.8)" : "rgba(255,255,255,0.25)" }}>{t.name}</span>
          {i < done && (
            <span className="text-[9px] font-mono flex-shrink-0" style={{ color: `${GREEN}aa` }}>
              {t.score ? `${t.score}/100` : `${t.ms}ms`}
            </span>
          )}
        </motion.div>
      ))}
      {done === TESTS.length && (
        <motion.div className="flex items-center justify-center gap-2 py-1.5 rounded-lg mt-1"
          style={{ background: `${GREEN}12`, border: `1px solid ${GREEN}35` }}
          initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
          <Check size={11} style={{ color: GREEN }} />
          <span className="text-[10px] font-mono font-semibold" style={{ color: GREEN }}>All {TESTS.length} suites passed</span>
        </motion.div>
      )}
    </div>
  );
}

// 05 Ship — deployment dashboard
function ShipPreview() {
  const [pct, setPct]     = useState(0);
  const [users, setUsers] = useState(0);
  const [step, setStep]   = useState(0);
  const steps = ["Building image", "Running migrations", "CDN invalidated", "Health checks", "✓ Live on prod"];

  useEffect(() => {
    setPct(0); setUsers(0); setStep(0);
    const p = setInterval(() => setPct(v => { if (v >= 100) { clearInterval(p); return 100; } return v + 2; }), 60);
    const u = setInterval(() => setUsers(v => { if (v >= 12480) { clearInterval(u); return 12480; } return v + 248; }), 80);
    const s = setInterval(() => setStep(v => { if (v >= steps.length - 1) { clearInterval(s); return v; } return v + 1; }), 700);
    return () => { clearInterval(p); clearInterval(u); clearInterval(s); };
  }, []);

  return (
    <div className="space-y-2.5">
      <div className="flex items-center justify-between mb-1">
        <span className="text-[10px] font-mono" style={{ color: "rgba(255,255,255,0.45)" }}>Deploying v2.4.1</span>
        <motion.span className="text-[10px] font-mono font-bold" style={{ color: PINK }} animate={{ opacity: pct < 100 ? [1, 0.3, 1] : 1 }} transition={{ duration: 1, repeat: pct < 100 ? Infinity : 0 }}>
          {pct < 100 ? `${pct}%` : "✓ LIVE"}
        </motion.span>
      </div>
      <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.06)" }}>
        <motion.div className="h-full rounded-full" style={{ background: `linear-gradient(to right, ${VIOLET}, ${PINK})`, boxShadow: `0 0 12px ${PINK}80` }}
          animate={{ width: `${pct}%` }} transition={{ duration: 0.1 }} />
      </div>
      <div className="space-y-1">
        {steps.map((s, i) => (
          <motion.div key={s} className="flex items-center gap-2" animate={{ opacity: i <= step ? 1 : 0.2 }}>
            <div className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: i <= step ? PINK : "rgba(255,255,255,0.2)" }} />
            <span className="text-[10px] font-mono" style={{ color: i <= step ? "rgba(255,255,255,0.75)" : "rgba(255,255,255,0.2)" }}>{s}</span>
          </motion.div>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-2 mt-1 pt-2" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        {[
          { label: "Active users", val: users.toLocaleString(), icon: <Globe size={10} />, color: PINK },
          { label: "Uptime", val: "99.98%", icon: <Zap size={10} />, color: GREEN },
        ].map(m => (
          <div key={m.label} className="flex flex-col gap-0.5 px-2 py-1.5 rounded-lg" style={{ background: `${m.color}0a`, border: `1px solid ${m.color}20` }}>
            <div className="flex items-center gap-1" style={{ color: m.color }}>{m.icon}<span className="text-[8px] font-mono uppercase tracking-wider">{m.label}</span></div>
            <span className="text-sm font-bold" style={{ color: m.color }}>{m.val}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Process Visualizer — right panel
// ─────────────────────────────────────────────────────────────────────────────
const PREVIEWS = [DiscoverPreview, DesignPreview, BuildPreview, TestPreview, ShipPreview];

function ProcessVisualizer() {
  const [active, setActive] = useState(2); // start on "Build"
  const [hovered, setHovered] = useState<number | null>(null);

  // auto-advance
  useEffect(() => {
    const id = setInterval(() => {
      if (hovered === null) setActive(a => (a + 1) % STAGES.length);
    }, 4000);
    return () => clearInterval(id);
  }, [hovered]);

  const stage = STAGES[active];
  const Preview = PREVIEWS[active];

  return (
    <motion.div
      className="relative w-full h-full flex flex-col gap-3"
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.9, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* ── Stage tabs — horizontal row ── */}
      <div className="flex items-stretch gap-2">
        {STAGES.map((s, i) => {
          const isActive = i === active;
          return (
            <motion.button
              key={s.id}
              onClick={() => setActive(i)}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              className="relative flex-1 flex flex-col items-center gap-1 py-2.5 px-1 rounded-xl cursor-pointer transition-all duration-300 outline-none"
              style={{
                background: isActive ? `${s.color}18` : "rgba(255,255,255,0.03)",
                border: `1px solid ${isActive ? s.color + "50" : "rgba(255,255,255,0.07)"}`,
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
            >
              {/* active glow */}
              {isActive && (
                <motion.div
                  className="absolute inset-0 rounded-xl pointer-events-none"
                  style={{ boxShadow: `0 0 20px ${s.color}25, inset 0 1px 0 ${s.color}25` }}
                  layoutId="stageGlow"
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                />
              )}
              <span className="text-[8px] font-mono" style={{ color: isActive ? s.color : "rgba(255,255,255,0.25)" }}>{s.num}</span>
              <span className="text-[10px] font-semibold tracking-tight hidden sm:block" style={{ color: isActive ? "#fff" : "rgba(255,255,255,0.4)" }}>{s.label}</span>
              {/* active dot */}
              {isActive && <motion.div className="w-1 h-1 rounded-full" style={{ background: s.color, boxShadow: `0 0 6px ${s.color}` }}
                animate={{ scale: [1, 1.6, 1] }} transition={{ duration: 1.2, repeat: Infinity }} />}
            </motion.button>
          );
        })}
      </div>

      {/* ── Connector: animated data flow ── */}
      <div className="relative h-px w-full overflow-hidden rounded-full" style={{ background: "rgba(255,255,255,0.06)" }}>
        <motion.div
          className="absolute top-0 h-full rounded-full"
          style={{ background: `linear-gradient(to right, transparent, ${stage.color}, transparent)`, width: "30%" }}
          animate={{ left: ["-30%", "130%"] }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        />
      </div>

      {/* ── Main preview card ── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={stage.id}
          className="flex-1 rounded-2xl overflow-hidden"
          style={{
            background: "linear-gradient(160deg, rgba(15,22,50,0.95) 0%, rgba(8,12,30,0.98) 100%)",
            border: `1px solid ${stage.color}30`,
            boxShadow: `0 0 40px ${stage.color}12, inset 0 1px 0 rgba(255,255,255,0.05)`,
          }}
          initial={{ opacity: 0, y: 12, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -8, scale: 0.98 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* card header */}
          <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: `1px solid ${stage.color}18` }}>
            <div className="flex items-center gap-3">
              <motion.div
                className="w-8 h-8 rounded-xl flex items-center justify-center text-base"
                style={{ background: `${stage.color}18`, border: `1px solid ${stage.color}40`, color: stage.color }}
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >{stage.icon}</motion.div>
              <div>
                <div className="text-sm font-bold text-white tracking-tight">{stage.label}</div>
                <div className="text-[10px] font-mono" style={{ color: "rgba(255,255,255,0.35)" }}>{stage.sub}</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[9px] font-mono px-2 py-0.5 rounded-full" style={{ background: `${stage.color}15`, color: stage.color, border: `1px solid ${stage.color}30` }}>
                {stage.duration}
              </span>
              <motion.div className="w-1.5 h-1.5 rounded-full" style={{ background: stage.color, boxShadow: `0 0 8px ${stage.color}` }}
                animate={{ opacity: [1, 0.2, 1] }} transition={{ duration: 1.5, repeat: Infinity }} />
            </div>
          </div>

          {/* animated preview content */}
          <div className="px-5 py-4 overflow-hidden">
            <Preview />
          </div>
        </motion.div>
      </AnimatePresence>

      {/* ── Progress indicator + stage navigation ── */}
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-1.5">
          {STAGES.map((s, i) => (
            <button key={s.id} onClick={() => setActive(i)}
              className="rounded-full transition-all duration-300"
              style={{ width: i === active ? 20 : 5, height: 5, background: i === active ? stage.color : "rgba(255,255,255,0.15)", boxShadow: i === active ? `0 0 8px ${stage.color}` : "none" }} />
          ))}
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => setActive(a => Math.max(0, a - 1))}
            className="w-7 h-7 rounded-full flex items-center justify-center text-xs transition-all duration-200 hover:scale-110"
            style={{ background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.5)", border: "1px solid rgba(255,255,255,0.08)" }}>‹</button>
          <span className="text-[9px] font-mono" style={{ color: "rgba(255,255,255,0.25)" }}>{active + 1} / {STAGES.length}</span>
          <button onClick={() => setActive(a => Math.min(STAGES.length - 1, a + 1))}
            className="w-7 h-7 rounded-full flex items-center justify-center text-xs transition-all duration-200 hover:scale-110"
            style={{ background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.5)", border: "1px solid rgba(255,255,255,0.08)" }}>›</button>
        </div>
      </div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Main Hero
// ─────────────────────────────────────────────────────────────────────────────
export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const mouseX = useMotionValue<number>(0.5);
  const mouseY = useMotionValue<number>(0.5);
  const springX = useSpring(mouseX, { stiffness: 35, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 35, damping: 20 });
  const px = useTransform(springX, [0, 1], [-8, 8]);
  const py = useTransform(springY, [0, 1], [-5, 5]);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const heroY       = useTransform(scrollYProgress, [0, 1],   [0, -50]);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - r.left) / r.width);
    mouseY.set((e.clientY - r.top) / r.height);
  }, [mouseX, mouseY]);

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex flex-col overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      <LightTrails />

      {/* Left fade — only covers the text column, trails are fully exposed right of 55% */}
      <div className="absolute inset-0 pointer-events-none z-[1]"
        style={{ background: `linear-gradient(to right, ${BG} 0%, ${BG}f2 10%, ${BG}cc 22%, ${BG}80 36%, ${BG}30 48%, transparent 58%)` }} />
      <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none z-[1]"
        style={{ background: `linear-gradient(to top, ${BG}, transparent)` }} />

      <motion.div
        className="relative z-10 flex flex-1 max-w-[1380px] mx-auto w-full px-8 md:px-14 lg:px-20 items-center py-32"
        style={{ y: heroY, opacity: heroOpacity }}
      >
        {/* ════════════ FULL-WIDTH LEFT TEXT ════════════ */}
        <div className="flex flex-col w-full max-w-[62%]">

          {/* badge */}
          <motion.div className="inline-flex items-center gap-2 mb-8 self-start"
            initial={{ opacity: 0, x: -14 }} animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}>
            <motion.span className="w-1.5 h-1.5 rounded-full"
              style={{ background: CYAN, boxShadow: `0 0 8px ${CYAN}` }}
              animate={{ opacity: [1, 0.2, 1] }} transition={{ duration: 1.8, repeat: Infinity }} />
            <span className="text-[11px] font-mono tracking-[0.35em] uppercase" style={{ color: CYAN }}>
              Software Development Agency
            </span>
          </motion.div>

          {/* headline — larger, full-width */}
          <motion.div style={{ x: px, y: py }}>
            <h1 className="font-black uppercase leading-[0.88] tracking-[-0.04em] select-none mb-4">
              <LineReveal delay={0.18}>
                <span className="block text-white text-[clamp(2.2rem,4.6vw,5rem)]">WE ENGINEER</span>
              </LineReveal>
              <LineReveal delay={0.28}>
                <span className="block text-white text-[clamp(2.2rem,4.6vw,5rem)]">DIGITAL</span>
              </LineReveal>
              <LineReveal delay={0.38}>
                <span className="block text-[clamp(2.2rem,4.6vw,5rem)]"><CyclingWord /></span>
              </LineReveal>
              <LineReveal delay={0.46}>
                <span className="block text-[clamp(1.6rem,3.2vw,3.4rem)]"
                  style={{ color: CYAN }}>
                  THAT SCALE AT SPEED.
                </span>
              </LineReveal>
            </h1>
          </motion.div>

          {/* description */}
          <motion.p className="text-base leading-relaxed mb-9 max-w-lg"
            style={{ color: "rgba(255,255,255,0.42)" }}
            initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.72 }}>
            From concept to cloud-deployed software — apps, AI platforms and
            web products engineered in a proven 5-stage process.
          </motion.p>

          {/* CTAs */}
          <motion.div className="flex items-center gap-5"
            initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.88 }}>
            <a href="#contact"
              className="group inline-flex items-center gap-2.5 rounded-full px-7 py-4 text-sm font-semibold text-white transition-all duration-300"
              style={{ background: "rgba(255,255,255,0.09)", border: "1px solid rgba(255,255,255,0.16)", backdropFilter: "blur(10px)" }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = `linear-gradient(135deg,${CYAN}28,${VIOLET}1a)`; el.style.borderColor = `${CYAN}55`; el.style.boxShadow = `0 0 24px ${CYAN}18`; }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = "rgba(255,255,255,0.09)"; el.style.borderColor = "rgba(255,255,255,0.16)"; el.style.boxShadow = "none"; }}>
              Start your project
              <ArrowUpRight size={15} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <a href="#portfolio"
              className="group inline-flex items-center gap-2 text-sm font-medium transition-colors duration-300"
              style={{ color: "rgba(255,255,255,0.40)" }}
              onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.85)")}
              onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.40)")}>
              View our work
              <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </motion.div>

        </div>

      </motion.div>

      {/* scroll cue */}
      <motion.div className="absolute bottom-7 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1.5"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.8 }}>
        <span className="text-[9px] font-mono tracking-[0.3em] uppercase" style={{ color: "rgba(255,255,255,0.15)" }}>scroll</span>
        <motion.div className="w-px h-8 rounded-full"
          style={{ background: `linear-gradient(to bottom, ${CYAN}55, transparent)` }}
          animate={{ scaleY: [1, 0.3, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }} />
      </motion.div>
    </section>
  );
}
