import { NextResponse, type NextRequest } from "next/server";

const SITE = (process.env.NEXT_PUBLIC_SITE_URL || "https://sinovorex.com").replace(/\/$/, "");

// Indexable page routes. Each gets an HTTP canonical (Link header) matching its <link rel="canonical">.
const PAGE = /^\/(?:$|(?:services|guides|sourcing-for)(?:\/[a-z0-9-]+)?$|(?:about|quote|privacy|terms)$)/;

/**
 * Next.js fetches pages as data at `?_rsc=…` URLs during client-side navigation. Those responses carry no
 * <head>, so Google can see them as canonical-less duplicates. Every page response therefore declares its clean
 * canonical in a `Link` header. (The `?_rsc=` variants are also marked noindex, in next.config.mjs: Next.js hides
 * `_rsc` from middleware.)
 */
export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (!PAGE.test(pathname)) return NextResponse.next();

  const res = NextResponse.next();
  res.headers.set("Link", `<${SITE}${pathname === "/" ? "" : pathname}>; rel="canonical"`);
  return res;
}

export const config = {
  // Skip static files, images, the API and metadata files (sitemap, robots, icons, llms.txt).
  matcher: ["/((?!_next/|api/|.*\\.[a-z0-9]+$).*)"],
};
