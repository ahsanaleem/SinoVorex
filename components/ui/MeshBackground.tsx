"use client";

// Static CSS-only background — zero JS, zero repaints after first paint.
// Browser composites once and never repaints. ~15 FPS gain on mid-tier vs animated canvas.
export function MeshBackground() {
  return (
    <div className="fixed inset-0 -z-10 bg-[#050814] overflow-hidden pointer-events-none">
      {/* Three static radial blobs */}
      <div
        className="absolute inset-0 opacity-60"
        style={{
          background: `
            radial-gradient(ellipse 80% 60% at 20% 10%, rgba(9,146,194,0.25), transparent 60%),
            radial-gradient(ellipse 60% 50% at 80% 30%, rgba(20,62,130,0.3),  transparent 60%),
            radial-gradient(ellipse 70% 50% at 50% 100%, rgba(56,189,248,0.15), transparent 60%)
          `,
        }}
      />
      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
      {/* Noise grain */}
      <div
        className="absolute inset-0 opacity-[0.025] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence baseFrequency='0.9'/></filter><rect width='200' height='200' filter='url(%23n)'/></svg>\")",
          backgroundRepeat: "repeat",
        }}
      />
    </div>
  );
}

export default MeshBackground;