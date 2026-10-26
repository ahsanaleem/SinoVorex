import type { Metadata } from "next";
import Script from "next/script";
import { Instrument_Serif, Inter_Tight } from "next/font/google";
import "./globals.css";
import { SITE_URL } from "@/lib/site";
import { JsonLd, graph, orgLd, pageMeta, websiteLd } from "@/lib/seo";

const DESCRIPTION =
  "SinoVorex is a China sourcing agent in Suzhou. We find factories, audit suppliers, inspect goods before shipment and arrange freight worldwide.";

// Also watches for elements added later (client-side navigation back to the homepage).
const REVEAL_JS = `document.documentElement.classList.add("js");
(function(){var io,q=0;
function scan(){q=0;document.querySelectorAll(".rv:not(.in),.sw:not(.in)").forEach(function(e){io?io.observe(e):e.classList.add("in")})}
function start(){if("IntersectionObserver"in window)io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add("in");io.unobserve(e.target)}})},{rootMargin:"0px 0px -8% 0px"});
scan();new MutationObserver(function(){if(!q){q=1;requestAnimationFrame(scan)}}).observe(document.body,{childList:true,subtree:true})}
if(document.readyState==="loading")addEventListener("DOMContentLoaded",start);else start()})();`;

const GSC_TOKEN =process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION;
const BING_TOKEN = process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  ...pageMeta({ title: "China Sourcing Agent for Global Buyers | SinoVorex", description: DESCRIPTION, path: "/" }),
  ...((GSC_TOKEN || BING_TOKEN) && {
    verification: { ...(GSC_TOKEN && { google: GSC_TOKEN }), ...(BING_TOKEN && { other: { "msvalidate.01": BING_TOKEN } }) },
  }),
};

// Fonts are downloaded at build time and served from this site (Google Fonts is blocked in mainland China).
const interTight = Inter_Tight({ subsets: ["latin"], variable: "--font-display", display: "swap" }); // variable font: all weights in one file
const instrumentSerif = Instrument_Serif({ subsets: ["latin"], weight: "400", style: ["normal", "italic"], variable: "--font-serif", display: "swap" });
// Small uppercase labels use the system monospace font (one less web font to download).

// Google Analytics 4. Set NEXT_PUBLIC_GA_ID to override; set it to "off" to disable.
const GA_ID = (process.env.NEXT_PUBLIC_GA_ID || "G-TNW1DPPKP5").replace(/^off$/i, "");
const PLAUSIBLE_DOMAIN = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${interTight.variable} ${instrumentSerif.variable}`}>
      <head>
        {/* Scroll reveals: plain JS, no framework. Marks <html class="js">, then adds "in" to .rv/.sw as they appear. */}
        <script dangerouslySetInnerHTML={{ __html: REVEAL_JS }} />
        <JsonLd data={graph(orgLd(DESCRIPTION), websiteLd())} />
      </head>
      <body>
        {children}
        {PLAUSIBLE_DOMAIN && (
          <>
            <Script src="https://plausible.io/js/script.js" data-domain={PLAUSIBLE_DOMAIN} strategy="afterInteractive" />
            <Script id="plausible-queue" strategy="afterInteractive">
              {`window.plausible=window.plausible||function(){(window.plausible.q=window.plausible.q||[]).push(arguments)}`}
            </Script>
          </>
        )}
        {GA_ID && (
          <>
            {/* gtag() queues events straight away; the large gtag.js library loads on the first scroll, tap or key press,
                or 1.5 seconds after the page has loaded. GA only counts engagement time once gtag.js runs, so a long
                delay makes real 10-second visits look like bounces. Speed-test robots (Lighthouse, PageSpeed Insights,
                headless browsers) are not tracked: each test run would otherwise be recorded as a bounced visit. */}
            <Script id="ga" strategy="afterInteractive">
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;
(function(){if(/Chrome-Lighthouse|HeadlessChrome|PTST|Google Page Speed/i.test(navigator.userAgent)||navigator.webdriver)return;
gtag('js',new Date());gtag('config','${GA_ID}');
var d=0;function l(){if(d)return;d=1;var s=document.createElement('script');s.async=true;s.src='https://www.googletagmanager.com/gtag/js?id=${GA_ID}';document.head.appendChild(s);}
['scroll','pointerdown','keydown','touchstart'].forEach(function(e){addEventListener(e,l,{once:true,passive:true});});
if(document.readyState==='complete')setTimeout(l,1500);else addEventListener('load',function(){setTimeout(l,1500);});})();`}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}
