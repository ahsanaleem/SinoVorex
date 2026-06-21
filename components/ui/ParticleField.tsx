"use client";
import { useEffect, useRef } from "react";
import { useScroll } from "framer-motion";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  baseY: number;
}

const COUNT_DESKTOP = 90;
const COUNT_MOBILE = 36;

export default function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const scrollRef = useRef(0);
  const { scrollY } = useScroll();

  useEffect(() => {
    return scrollY.on("change", (v) => {
      scrollRef.current = v;
    });
  }, [scrollY]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const isMobile = window.innerWidth < 768;
    const COUNT = isMobile ? COUNT_MOBILE : COUNT_DESKTOP;

    let W = window.innerWidth;
    let H = window.innerHeight;
    let animId: number;
    let particles: Particle[] = [];

    function resize() {
      if (!canvas) return;
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width = W;
      canvas.height = H;
    }
    resize();
    window.addEventListener("resize", resize);

    function initParticles() {
      particles = Array.from({ length: COUNT }, () => {
        const y = Math.random() * H * 2;
        return {
          x: Math.random() * W,
          y,
          baseY: y,
          vx: (Math.random() - 0.5) * 0.15,
          vy: (Math.random() - 0.5) * 0.1,
          size: Math.random() * 1.5 + 0.5,
          opacity: Math.random() * 0.4 + 0.1,
        };
      });
    }
    initParticles();

    function draw() {
      if (!canvas || !ctx) return;
      ctx.clearRect(0, 0, W, H);

      const scrollOffset = scrollRef.current * 0.08;

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = W;
        if (p.x > W) p.x = 0;
        if (p.y < -100) p.y = H + 100;
        if (p.y > H + 100) p.y = -100;

        const displayY = p.y - scrollOffset;

        ctx.beginPath();
        ctx.arc(p.x, displayY, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(6,229,255,${p.opacity})`;
        ctx.fill();
      }

      animId = requestAnimationFrame(draw);
    }

    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      aria-hidden="true"
    />
  );
}
