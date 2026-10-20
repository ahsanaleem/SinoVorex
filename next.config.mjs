const isDev = process.env.NODE_ENV !== "production";

// Allow-list for the optional Plausible / GA4 scripts (app/layout.tsx) and Vercel preview tooling.
// 'unsafe-inline' is needed for Next.js inline bootstrap scripts and the JSON-LD blocks.
const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""} https://plausible.io https://www.googletagmanager.com https://vercel.live`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://www.googletagmanager.com https://*.google-analytics.com https://vercel.com https://vercel.live",
  "font-src 'self' data: https://vercel.live",
  "connect-src 'self' https://plausible.io https://*.google-analytics.com https://*.analytics.google.com https://www.googletagmanager.com https://vercel.live wss://ws-us3.pusher.com",
  "media-src 'self'",
  "frame-src 'self' https://vercel.live",
  "frame-ancestors 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  ...(isDev ? [] : ["upgrade-insecure-requests"]),
].join("; ");

/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async headers() {
    return [{
      source: "/:path*",
      headers: [
        { key: "Content-Security-Policy", value: csp },
        { key: "X-Content-Type-Options", value: "nosniff" },
        { key: "X-Frame-Options", value: "SAMEORIGIN" },
        { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()" },
      ],
    }];
  },
  // Takes effect once www.sinovorex.com has a DNS record and is added to the Vercel project.
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
