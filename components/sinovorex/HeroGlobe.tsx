"use client";

import { useEffect, useRef } from "react";
import { CHINA, LAND } from "./globeData";

/* Interactive trade globe (ported from tradevorex-hero.html).
   Drag to spin, click to launch shipments. Pauses when off-screen. */

type V3 = [number, number, number];
type Origin = { lat: number; lon: number; v?: V3; flash: number };
type Route = {
  from: string; name: string; lat: number; lon: number; mode: string;
  o: Origin; v: V3; w: number; h: number; path: V3[]; glow: number; label: number;
};

const HUB = { lat: 34.5, lon: 104.5 };
const ORIGIN_DATA: Record<string, { lat: number; lon: number }> = {
  Shanghai: { lat: 31.23, lon: 121.47 }, Shenzhen: { lat: 22.54, lon: 114.06 }, Guangzhou: { lat: 23.13, lon: 113.26 },
  Ningbo: { lat: 29.87, lon: 121.54 }, Qingdao: { lat: 36.07, lon: 120.38 }, Tianjin: { lat: 39.08, lon: 117.2 },
  Xiamen: { lat: 24.48, lon: 118.09 }, Beijing: { lat: 39.9, lon: 116.4 }, Chongqing: { lat: 29.56, lon: 106.55 },
  "Xi'an": { lat: 34.34, lon: 108.94 }, Yiwu: { lat: 29.31, lon: 120.08 },
};
const ROUTE_DATA = [
  { from: "Shenzhen", name: "Dubai", lat: 25.2, lon: 55.27, mode: "Sea" },
  { from: "Ningbo", name: "Jeddah", lat: 21.49, lon: 39.19, mode: "Sea" },
  { from: "Guangzhou", name: "Karachi", lat: 24.86, lon: 67.01, mode: "Sea" },
  { from: "Beijing", name: "Riyadh", lat: 24.71, lon: 46.68, mode: "Air" },
  { from: "Xiamen", name: "Singapore", lat: 1.35, lon: 103.82, mode: "Sea" },
  { from: "Shanghai", name: "Rotterdam", lat: 51.92, lon: 4.48, mode: "Sea" },
  { from: "Guangzhou", name: "Sydney", lat: -33.87, lon: 151.21, mode: "Sea" },
  { from: "Ningbo", name: "Lagos", lat: 6.52, lon: 3.38, mode: "Sea" },
  { from: "Shenzhen", name: "Mombasa", lat: -4.04, lon: 39.67, mode: "Sea" },
  { from: "Tianjin", name: "Tokyo", lat: 35.68, lon: 139.69, mode: "Sea" },
  { from: "Xi'an", name: "Moscow", lat: 55.76, lon: 37.62, mode: "Rail" },
  { from: "Shanghai", name: "Doha", lat: 25.29, lon: 51.53, mode: "Air" },
  { from: "Shenzhen", name: "Los Angeles", lat: 34.05, lon: -118.24, mode: "Sea" },
  { from: "Beijing", name: "New York", lat: 40.71, lon: -74.01, mode: "Air" },
  { from: "Shanghai", name: "São Paulo", lat: -23.55, lon: -46.63, mode: "Sea" },
  { from: "Qingdao", name: "Vancouver", lat: 49.28, lon: -123.12, mode: "Sea" },
  { from: "Chongqing", name: "Hamburg", lat: 53.55, lon: 9.99, mode: "Rail" },
  { from: "Yiwu", name: "Madrid", lat: 40.42, lon: -3.7, mode: "Rail" },
  { from: "Xiamen", name: "Cape Town", lat: -33.92, lon: 18.42, mode: "Sea" },
  { from: "Guangzhou", name: "Jakarta", lat: -6.21, lon: 106.85, mode: "Sea" },
];

const D = Math.PI / 180;
const FONT_FALLBACK = "ui-monospace, monospace";
const toV = (lat: number, lon: number): V3 => [Math.cos(lat * D) * Math.cos(lon * D), Math.sin(lat * D), Math.cos(lat * D) * Math.sin(lon * D)];
function slerp(a: V3, b: V3, t: number, w: number): V3 {
  const s = Math.sin(w), k1 = Math.sin((1 - t) * w) / s, k2 = Math.sin(t * w) / s;
  return [a[0] * k1 + b[0] * k2, a[1] * k1 + b[1] * k2, a[2] * k1 + b[2] * k2];
}

export function HeroGlobe({ ready }: { ready: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!ready) return;
    const cv = canvasRef.current!;
    const host = cv.parentElement!;
    const ctx = cv.getContext("2d")!;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    // Canvas can't read CSS variables: resolve the self-hosted mono font family once.
    const monoVar = getComputedStyle(document.documentElement).getPropertyValue("--font-mono").trim();
    const FONT = monoVar ? `${monoVar}, ${FONT_FALLBACK}` : FONT_FALLBACK;

    /* geometry */
    const pts: V3[] = [];
    for (let i = 0; i < LAND.length; i += 2) pts.push(toV(LAND[i], LAND[i + 1]));
    const isCN = new Uint8Array(pts.length);
    CHINA.forEach((i) => (isCN[i] = 1));
    const HV = toV(HUB.lat, HUB.lon);
    const ORIGINS: Record<string, Origin> = {};
    for (const k in ORIGIN_DATA) ORIGINS[k] = { ...ORIGIN_DATA[k], v: toV(ORIGIN_DATA[k].lat, ORIGIN_DATA[k].lon), flash: 0 };
    const ROUTES: Route[] = ROUTE_DATA.map((d) => {
      const o = ORIGINS[d.from], O = o.v!, v = toV(d.lat, d.lon);
      const w = Math.acos(Math.min(1, O[0] * v[0] + O[1] * v[1] + O[2] * v[2]));
      const h = 0.05 + 0.22 * (w / Math.PI);
      const path: V3[] = [];
      for (let i = 0; i <= 64; i++) {
        const t = i / 64, p = slerp(O, v, t, w), a = 1 + h * Math.sin(Math.PI * t);
        path.push([p[0] * a, p[1] * a, p[2] * a]);
      }
      return { ...d, o, v, w, h, path, glow: 0, label: 0 };
    });

    /* state */
    let W = 0, H = 0, R = 0, cx = 0, cy = 0, S = 1, raf = 0, running = false;
    let t0 = performance.now(), last = t0;
    let yaw = 96, pitch = 22, yawVel = 0, spin = 0, intro = 0;
    const SPIN = 7;
    let drag: { x: number; y: number; yaw: number; pitch: number; moved: number } | null = null;
    let tmx = 0, tmy = 0;
    const ships: { r: Route; t: number; speed: number }[] = [];
    const pulses: { v: V3; t: number }[] = [];
    let nextLaunch = 1.6, routeIdx = 0;
    let cyw = 1, syw = 0, cp = 1, sp = 0;

    function size() {
      const dpr = Math.min(devicePixelRatio || 1, 2);
      W = host.clientWidth; H = host.clientHeight;
      cv.width = W * dpr; cv.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (W > 1024) { R = Math.min(H * 0.34, W * 0.24); cx = W * 0.73; cy = H * 0.5; }
      // Small screens: globe sits under the nav; Hero offsets its copy by the same 96px + 2.1R
      else { R = Math.min(W * 0.4, innerHeight * 0.19); cx = W * 0.5; cy = 96 + R * 1.1; }
    }
    function setRot() {
      const y = (yaw + tmx * 8) * D, p = (pitch - tmy * 6) * D;
      cyw = Math.cos(y); syw = Math.sin(y); cp = Math.cos(p); sp = Math.sin(p);
    }
    function proj(v: V3): V3 {
      const x = v[2] * cyw - v[0] * syw, z0 = v[0] * cyw + v[2] * syw, y = v[1] * cp - z0 * sp, z = v[1] * sp + z0 * cp;
      return [cx + x * R * S, cy - y * R * S, z];
    }
    const visible = (p: V3) => p[2] > 0 || Math.hypot(p[0] - cx, p[1] - cy) > R * S * 1.003;

    function launch() {
      setRot();
      const busy = new Set(ships.map((s) => s.r));
      const c = ROUTES.filter((r) => !busy.has(r))
        .map((r) => ({ r, s: proj(r.path[32])[2] + proj(r.v)[2] + proj(r.o.v!)[2] * 0.5 + Math.random() * 0.6 }))
        .sort((a, b) => b.s - a.s);
      const r = c[0]?.r ?? ROUTES[routeIdx++ % ROUTES.length];
      r.o.flash = 1;
      ships.push({ r, t: 0, speed: 0.16 + 0.1 * (1 - r.w / Math.PI) });
    }

    function drawArc(path: V3[], a: number, b: number, col: string | null, w: number) {
      const n = path.length - 1, i0 = Math.floor(a * n), i1 = Math.ceil(b * n);
      let prev: V3 | null = null, pv = false;
      for (let i = i0; i <= i1; i++) {
        const p = proj(path[i]), vis = visible(p);
        if (prev && vis && pv) {
          ctx.lineWidth = w;
          if (col) ctx.strokeStyle = col;
          else {
            const k = (i - i0) / Math.max(1, i1 - i0);
            ctx.strokeStyle = `rgba(255,${Math.round(107 + 100 * k)},${Math.round(43 + 120 * k)},${0.15 + 0.85 * k})`;
          }
          ctx.beginPath(); ctx.moveTo(prev[0], prev[1]); ctx.lineTo(p[0], p[1]); ctx.stroke();
        }
        prev = p; pv = vis;
      }
    }

    /* Labels placed this frame: a label that would overlap one (or repeat a name) is skipped. */
    let placed: { x: number; y: number; w: number; h: number; txt: string }[] = [];
    function label(x: number, y: number, txt: string, a: number, hub = false, port = false) {
      if (a <= 0) return;
      ctx.save();
      ctx.font = `600 ${hub ? 12 : port ? 10 : 11}px ${FONT}`;
      const w = ctx.measureText(txt).width + (hub ? 20 : 14);
      const lx = hub ? x - w - 14 : port ? x - w - 10 : x + 12, ly = hub ? y - 34 : port ? y + 8 : y - 26;
      const pad = 4;
      if (placed.some((r) => r.txt === txt || (lx < r.x + r.w + pad && lx + w + pad > r.x && ly < r.y + r.h + pad && ly + 18 + pad > r.y))) {
        ctx.restore();
        return;
      }
      placed.push({ x: lx, y: ly, w, h: 18, txt });
      ctx.globalAlpha = a;
      ctx.strokeStyle = hub ? "rgba(255,107,43,.9)" : "rgba(245,245,245,.45)";
      ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(hub || port ? lx + w : lx, ly + 9); ctx.stroke();
      ctx.fillStyle = hub ? "#FF6B2B" : "rgba(14,14,22,.88)";
      roundRect(lx, ly, w, 18, 9); ctx.fill();
      ctx.fillStyle = hub ? "#0E0E16" : "#F5F5F5";
      ctx.textBaseline = "middle";
      ctx.fillText(txt, lx + (hub ? 10 : 7), ly + 9.5);
      ctx.restore();
    }
    function roundRect(x: number, y: number, w: number, h: number, r: number) {
      ctx.beginPath();
      ctx.moveTo(x + r, y); ctx.arcTo(x + w, y, x + w, y + h, r); ctx.arcTo(x + w, y + h, x, y + h, r);
      ctx.arcTo(x, y + h, x, y, r); ctx.arcTo(x, y, x + w, y, r); ctx.closePath();
    }

    function frame(now: number) {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      const T = (now - t0) / 1000;
      intro = Math.min(1, T / 2.2);
      const e = 1 - Math.pow(1 - intro, 3);
      S = 0.55 + 0.45 * e;
      if (!drag) { yawVel *= 0.95; yaw += yawVel * dt * 60; spin += (SPIN - spin) * 0.02; yaw += spin * dt; pitch += (22 - pitch) * 0.01; }
      setRot();
      ctx.clearRect(0, 0, W, H);
      const r = R * S;

      /* atmosphere + sphere */
      let g = ctx.createRadialGradient(cx, cy, r * 0.98, cx, cy, r * 1.35);
      g.addColorStop(0, "rgba(255,140,90,.38)"); g.addColorStop(0.12, "rgba(255,107,43,.16)");
      g.addColorStop(0.5, "rgba(255,107,43,.04)"); g.addColorStop(1, "rgba(255,107,43,0)");
      ctx.globalAlpha = e; ctx.fillStyle = g;
      ctx.beginPath(); ctx.arc(cx, cy, r * 1.45, 0, 7); ctx.fill();
      g = ctx.createRadialGradient(cx - r * 0.35, cy - r * 0.4, 0, cx, cy, r);
      g.addColorStop(0, "#2B2B3D"); g.addColorStop(1, "#0E0E16");
      ctx.fillStyle = g; ctx.beginPath(); ctx.arc(cx, cy, r, 0, 7); ctx.fill();
      ctx.strokeStyle = "rgba(255,255,255,.10)"; ctx.lineWidth = 1; ctx.stroke();

      /* orbit rings */
      for (let k = 0; k < 3; k++) {
        ctx.save(); ctx.translate(cx, cy);
        ctx.rotate(-0.35 + k * 0.9 + T * (0.05 + k * 0.02) * (k % 2 ? -1 : 1));
        ctx.scale(1, 0.28 + k * 0.06);
        ctx.setLineDash(k === 1 ? [2, 10] : [60 + k * 30, 200]);
        ctx.lineDashOffset = -T * (30 + k * 15);
        ctx.strokeStyle = k === 0 ? `rgba(255,107,43,${0.7 * e})` : `rgba(14,14,22,${0.22 * e})`;
        ctx.lineWidth = k === 0 ? 1.6 : 1;
        ctx.beginPath(); ctx.arc(0, 0, r * (1.22 + k * 0.14), 0, 7); ctx.stroke();
        ctx.restore();
      }
      ctx.setLineDash([]);

      /* land dots */
      const ds = Math.max(1.2, R / 170);
      for (let i = 0; i < pts.length; i++) {
        if (i / pts.length > intro * 1.15) continue;
        const p = proj(pts[i]), z = p[2];
        if (z < 0) {
          if (z > -0.98) { ctx.fillStyle = "rgba(245,245,245,.05)"; ctx.fillRect(p[0], p[1], ds * 0.7, ds * 0.7); }
          continue;
        }
        if (isCN[i]) {
          const pul = 0.75 + 0.25 * Math.sin(T * 2.2 + pts[i][0] * 9);
          ctx.fillStyle = `rgba(255,${Math.round(95 + 40 * z)},43,${(0.5 + 0.5 * z) * pul})`;
          ctx.fillRect(p[0] - ds * 0.6, p[1] - ds * 0.6, ds * 1.2, ds * 1.2);
          continue;
        }
        ctx.fillStyle = `rgba(${Math.round(170 + 85 * z)},${Math.round(165 + 80 * z)},${Math.round(160 + 75 * z)},${0.18 + 0.62 * z})`;
        ctx.fillRect(p[0] - ds / 2, p[1] - ds / 2, ds, ds);
      }

      /* routes */
      ctx.lineCap = "round";
      for (const rt of ROUTES) {
        rt.glow = Math.max(0, rt.glow - dt * 0.35);
        drawArc(rt.path, 0, 1, `rgba(255,107,43,${(0.22 + rt.glow * 0.6) * e})`, 1);
      }

      /* China glow, port hubs, label */
      placed = [];
      const portLabels: [number, number, string, number][] = [];
      const hp = proj(HV);
      if (hp[2] > -0.05) {
        const ha = Math.min(1, (hp[2] + 0.05) * 4) * e;
        const gg = ctx.createRadialGradient(hp[0], hp[1], 0, hp[0], hp[1], r * 0.42);
        gg.addColorStop(0, `rgba(255,107,43,${0.22 * ha})`); gg.addColorStop(1, "rgba(255,107,43,0)");
        ctx.fillStyle = gg; ctx.beginPath(); ctx.arc(hp[0], hp[1], r * 0.42, 0, 7); ctx.fill();
        for (const k in ORIGINS) {
          const o = ORIGINS[k];
          o.flash = Math.max(0, o.flash - dt * 0.5);
          const p = proj(o.v!);
          if (p[2] <= 0) continue;
          const pu = ((T + o.lat) % 2.4) / 2.4;
          ctx.globalAlpha = ha * (1 - pu) * 0.7; ctx.strokeStyle = "#FF6B2B"; ctx.lineWidth = 1.2;
          ctx.beginPath(); ctx.arc(p[0], p[1], 2 + pu * 12, 0, 7); ctx.stroke();
          ctx.globalAlpha = ha; ctx.fillStyle = "#fff";
          ctx.beginPath(); ctx.arc(p[0], p[1], 1.8 + o.flash * 1.5, 0, 7); ctx.fill();
          if (o.flash > 0) portLabels.push([p[0], p[1], k.toUpperCase(), ha * Math.min(1, o.flash * 2)]);
        }
        ctx.globalAlpha = e;
        label(hp[0], hp[1], "CHINA", ha, true); // placed first so it always wins
        for (const [x, y, txt, a] of portLabels) label(x, y, txt, a, false, true);
      }

      /* ships */
      if (T > nextLaunch && !reduce) { launch(); nextLaunch = T + 1.1 + Math.random() * 0.9; }
      for (let i = ships.length - 1; i >= 0; i--) {
        const s = ships[i];
        s.t += dt * s.speed;
        const t = Math.min(1, s.t), ee = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
        drawArc(s.r.path, Math.max(0, ee - 0.28), ee, null, 2.2);
        const n = s.r.path.length - 1, fi = ee * n, i0 = Math.floor(fi), f = fi - i0;
        const a = s.r.path[i0], b = s.r.path[Math.min(n, i0 + 1)];
        const p = proj([a[0] + (b[0] - a[0]) * f, a[1] + (b[1] - a[1]) * f, a[2] + (b[2] - a[2]) * f]);
        if (visible(p)) {
          ctx.save(); ctx.translate(p[0], p[1]);
          const nx = proj(b);
          ctx.rotate(Math.atan2(nx[1] - p[1], nx[0] - p[0]));
          ctx.shadowColor = "#FF6B2B"; ctx.shadowBlur = 14; ctx.fillStyle = "#FF6B2B"; ctx.fillRect(-6, -3, 12, 6);
          ctx.shadowBlur = 0; ctx.fillStyle = "rgba(14,14,22,.55)";
          for (let k = -4; k <= 4; k += 2.6) ctx.fillRect(k, -3, 0.8, 6);
          ctx.restore();
        }
        if (s.t >= 1) { s.r.glow = 1; s.r.label = 1; pulses.push({ v: s.r.v, t: 0 }); ships.splice(i, 1); }
      }

      /* arrival pulses + destination labels */
      for (let i = pulses.length - 1; i >= 0; i--) {
        const q = pulses[i];
        q.t += dt;
        const p = proj(q.v);
        if (p[2] > 0) {
          const k = q.t / 1.4;
          ctx.strokeStyle = `rgba(255,107,43,${Math.max(0, 1 - k)})`; ctx.lineWidth = 1.5;
          ctx.beginPath(); ctx.arc(p[0], p[1], 3 + k * 26, 0, 7); ctx.stroke();
        }
        if (q.t > 1.4) pulses.splice(i, 1);
      }
      for (const rt of ROUTES) {
        const p = proj(rt.v);
        if (p[2] <= 0) continue;
        ctx.fillStyle = `rgba(255,${Math.round(107 + 148 * (1 - rt.glow))},${Math.round(43 + 212 * (1 - rt.glow))},${(0.55 + 0.45 * rt.glow) * e * Math.min(1, p[2] * 3)})`;
        ctx.beginPath(); ctx.arc(p[0], p[1], 2.6 + rt.glow * 1.4, 0, 7); ctx.fill();
        rt.label = Math.max(0, rt.label - dt * 0.3);
        if (rt.label > 0) label(p[0], p[1], rt.name.toUpperCase(), Math.min(1, rt.label * 1.6) * Math.min(1, p[2] * 4));
      }
      ctx.globalAlpha = 1;
      if (running) raf = requestAnimationFrame(frame);
    }

    /* interaction: drag to spin, mouse parallax, click to launch */
    const onDown = (e: PointerEvent) => { drag = { x: e.clientX, y: e.clientY, yaw, pitch, moved: 0 }; spin = 0; cv.setPointerCapture(e.pointerId); };
    const onMove = (e: PointerEvent) => {
      const rc = host.getBoundingClientRect();
      tmx = ((e.clientX - rc.left) / rc.width - 0.5) * 2;
      tmy = ((e.clientY - rc.top) / rc.height - 0.5) * 2;
      if (drag) {
        const dx = e.clientX - drag.x, dy = e.clientY - drag.y;
        drag.moved = Math.max(drag.moved, Math.abs(dx) + Math.abs(dy));
        const ny = drag.yaw - dx * 0.3;
        yawVel = (ny - yaw) * 0.5; yaw = ny;
        pitch = Math.max(-35, Math.min(60, drag.pitch + dy * 0.2));
      }
    };
    const onUp = () => { if (drag && drag.moved < 4) { launch(); launch(); } drag = null; };
    const onLeave = () => { tmx = tmy = 0; };
    cv.addEventListener("pointerdown", onDown);
    cv.addEventListener("pointermove", onMove);
    cv.addEventListener("pointerup", onUp);
    cv.addEventListener("pointercancel", onUp);
    cv.addEventListener("pointerleave", onLeave);

    const play = () => { if (running) return; running = true; last = performance.now(); raf = requestAnimationFrame(frame); };
    const pause = () => { running = false; cancelAnimationFrame(raf); };
    const onResize = () => { size(); if (!running) frame(performance.now()); };
    const onVis = () => (document.hidden ? pause() : play());

    size();
    addEventListener("resize", onResize);
    let io: IntersectionObserver | null = null;
    if (reduce) {
      t0 = performance.now() - 4000;
      ROUTES.forEach((rt) => (rt.glow = 0.6));
      frame(performance.now());
    } else {
      io = new IntersectionObserver((es) => (es[0].isIntersecting ? play() : pause()), { threshold: 0.05 });
      io.observe(host);
      document.addEventListener("visibilitychange", onVis);
    }

    return () => {
      pause();
      io?.disconnect();
      removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVis);
      cv.removeEventListener("pointerdown", onDown);
      cv.removeEventListener("pointermove", onMove);
      cv.removeEventListener("pointerup", onUp);
      cv.removeEventListener("pointercancel", onUp);
      cv.removeEventListener("pointerleave", onLeave);
    };
  }, [ready]);

  return (
    <canvas
      ref={canvasRef}
      aria-label="Interactive globe showing trade routes from China. Drag to spin, click to launch shipments."
      role="img"
      className="absolute inset-0 block h-full w-full cursor-grab touch-pan-y active:cursor-grabbing"
    />
  );
}
