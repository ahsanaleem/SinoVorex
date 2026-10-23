import type { Metadata } from "next";
import Script from "next/script";
import { Instrument_Serif, Inter_Tight, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { SITE_URL } from "@/lib/site";
import { JsonLd, graph, orgLd, pageMeta, websiteLd } from "@/lib/seo";

const DESCRIPTION =
  "Sino Vorex is a China sourcing agent in Suzhou. We find factories, audit suppliers, inspect goods before shipment and arrange freight worldwide.";

const GSC_TOKEN = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION;
const BING_TOKEN = process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  ...pageMeta({ title: "China Sourcing Agent for Global Buyers | Sino Vorex", description: DESCRIPTION, path: "/" }),
  ...((GSC_TOKEN || BING_TOKEN) && {
    verification: { ...(GSC_TOKEN && { google: GSC_TOKEN }), ...(BING_TOKEN && { other: { "msvalidate.01": BING_TOKEN } }) },
  }),
};

// Fonts are downloaded at build time and served from this site (Google Fonts is blocked in mainland China).
const interTight = Inter_Tight({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700"], variable: "--font-display", display: "swap" });
const instrumentSerif = Instrument_Serif({ subsets: ["latin"], weight: "400", style: ["normal", "italic"], variable: "--font-serif", display: "swap" });
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-mono", display: "swap" });

// Google Analytics 4. Set NEXT_PUBLIC_GA_ID to override; set it to "off" to disable.
const GA_ID = (process.env.NEXT_PUBLIC_GA_ID || "G-TNW1DPPKP5").replace(/^off$/i, "");
const PLAUSIBLE_DOMAIN = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${interTight.variable} ${instrumentSerif.variable} ${jetbrainsMono.variable}`}>
      <head>
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
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
            <Script id="ga" strategy="afterInteractive">
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;gtag('js',new Date());gtag('config','${GA_ID}');`}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}
