const isDev = process.env.NODE_ENV !== "production";
// Vercel preview tooling (toolbar, comments) is only allowed outside the live site.
const isLive = process.env.VERCEL_ENV === "production";
const preview = isLive ? "" : " https://vercel.live";

// Allow-list for the optional Plausible / GA4 scripts (app/layout.tsx).
// 'unsafe-inline' is needed for Next.js inline bootstrap scripts and the JSON-LD blocks.
const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""} https://plausible.io https://www.googletagmanager.com${preview}`,
  "style-src 'self' 'unsafe-inline'",
  `img-src 'self' data: blob: https://www.googletagmanager.com https://*.google-analytics.com${isLive ? "" : " https://vercel.com https://vercel.live"}`,
  `font-src 'self' data:${preview}`,
  `connect-src 'self' https://plausible.io https://*.google-analytics.com https://*.analytics.google.com https://www.googletagmanager.com${isLive ? "" : " https://vercel.live wss://ws-us3.pusher.com"}`,
  "media-src 'self'",
  `frame-src 'self'${preview}`,
  "frame-ancestors 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  ...(isDev ? [] : ["upgrade-insecure-requests"]),
].join("; ");

// Public files keep the same URL when they change, so cache for a week and revalidate in the background.
const assetCache = { key: "Cache-Control", value: "public, max-age=604800, stale-while-revalidate=86400" };

/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "Content-Security-Policy", value: csp },
          { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()" },
        ],
      },
      { source: "/brand/:file*", headers: [assetCache] },
      { source: "/products/:file*", headers: [assetCache] },
      { source: "/world-dots.svg", headers: [assetCache] },
      { source: "/opengraph-image.png", headers: [assetCache] },
      { source: "/twitter-image.png", headers: [assetCache] },
    ];
  },
  // Backup for www → apex. Best set in Vercel → Domains (www.sinovorex.com → Redirect to sinovorex.com) so http://www is one hop.
  async redirects() {
    return [{
      source: "/:path*",
      has: [{ type: "host", value: "www.sinovorex.com" }],
      destination: "https://sinovorex.com/:path*",
      permanent: true,
    }];
  },
};

export default nextConfig;
