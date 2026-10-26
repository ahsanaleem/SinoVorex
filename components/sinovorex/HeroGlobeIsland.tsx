"use client";

import dynamic from "next/dynamic";

// Decorative canvas globe: loaded after the page, never part of the server HTML or the LCP.
const HeroGlobe = dynamic(() => import("./HeroGlobe").then((m) => m.HeroGlobe), { ssr: false });

export function HeroGlobeIsland() {
  return <HeroGlobe ready />;
}
