import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        ink: "#0E0E16",
        paper: "#F7F5F0",
        flame: { DEFAULT: "#FF6B2B", deep: "#E8501A" },
        brand: {
          cyan: "var(--brand-cyan)",
          "cyan-light": "var(--brand-cyan-light)",
          "cyan-dim": "var(--brand-cyan-dim)",
          blue: "var(--brand-blue)",
          violet: "var(--brand-violet)",
          navy: "var(--brand-navy)",
          "navy-light": "var(--brand-navy-light)",
          muted: "var(--brand-muted)",
          border: "var(--brand-border)",
        },
      },
      fontFamily: {
        sans: ["var(--font-display)", "Inter", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "Inter", "system-ui", "sans-serif"],
        serif: ["var(--font-serif)", "Georgia", "serif"],
        mono: ["ui-monospace", "SFMono-Regular", "Menlo", "Consolas", "Liberation Mono", "monospace"],
      },
      fontSize: {
        "display-2xl": ["clamp(3rem,8vw,8rem)", { lineHeight: "1", letterSpacing: "-0.04em" }],
        "display-xl": ["clamp(2.5rem,6vw,6rem)", { lineHeight: "1.05", letterSpacing: "-0.03em" }],
        "display-lg": ["clamp(2rem,4vw,4rem)", { lineHeight: "1.1", letterSpacing: "-0.025em" }],
        "display-md": ["clamp(1.5rem,3vw,2.5rem)", { lineHeight: "1.2", letterSpacing: "-0.02em" }],
      },
      spacing: {
        section: "8rem",
        "section-sm": "5rem",
      },
      backdropBlur: {
        xs: "2px",
      },
      animation: {
        "gradient-rotate": "gradientRotate 8s linear infinite",
        "float-slow": "floatY 6s ease-in-out infinite",
        "float-medium": "floatY 4s ease-in-out infinite",
        "pulse-glow": "pulseGlow 2.5s ease-in-out infinite",
        marquee: "marquee 40s linear infinite",
        "marquee-reverse": "marquee 40s linear infinite reverse",
        blob: "blob 16s ease-in-out infinite",
        "blob-slow": "blob 22s ease-in-out infinite reverse",
        "scroll-cue": "scrollCue 1.8s cubic-bezier(0.65,0,0.35,1) infinite",
        "spin-slow": "spin 20s linear infinite",
        "dash-offset": "dashOffset 3s linear infinite",
      },
      keyframes: {
        gradientRotate: {
          "0%": { "--gradient-angle": "0deg" } as Record<string, string>,
          "100%": { "--gradient-angle": "360deg" } as Record<string, string>,
        },
        floatY: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        pulseGlow: {
          "0%, 100%": { boxShadow: "0 0 20px 4px var(--brand-cyan-dim)" },
          "50%": { boxShadow: "0 0 40px 12px var(--brand-cyan-dim)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        blob: {
          "0%, 100%": { transform: "translate(0,0) scale(1)" },
          "33%": { transform: "translate(6%,-8%) scale(1.1)" },
          "66%": { transform: "translate(-6%,5%) scale(0.92)" },
        },
        scrollCue: {
          "0%": { transform: "translateY(0)", opacity: "0" },
          "30%": { opacity: "1" },
          "100%": { transform: "translateY(18px)", opacity: "0" },
        },
        dashOffset: {
          "0%": { strokeDashoffset: "100" },
          "100%": { strokeDashoffset: "0" },
        },
      },
      transitionTimingFunction: {
        apple: "cubic-bezier(0.22, 1, 0.36, 1)",
        spring: "cubic-bezier(0.34, 1.56, 0.64, 1)",
      },
      boxShadow: {
        "glow-cyan": "0 0 30px 6px var(--brand-cyan-dim)",
        "glow-blue": "0 0 30px 6px rgba(59,130,246,0.2)",
        "glow-violet": "0 0 30px 6px rgba(139,92,246,0.2)",
        glass: "inset 0 1px 0 0 rgba(255,255,255,0.06), 0 4px 32px rgba(0,0,0,0.3)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
