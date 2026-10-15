import type { Metadata } from "next";
import Script from "next/script";
import { Instrument_Serif, Inter_Tight, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { COMPANY } from "@/components/sinovorex/data";
import { SITE_URL } from "@/lib/site";

const DESCRIPTION =
  "Sino Vorex helps buyers worldwide source, check and ship products from factories across China: product sourcing, factory vetting, quality inspection and shipping coordination.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Sino Vorex — China Sourcing & Export Partner",
  description: DESCRIPTION,
  keywords: ["China sourcing agent", "sourcing from China", "factory audit China", "quality inspection China", "China export", "Sino Vorex", "freight from China"],
  alternates: { canonical: "/" },
  openGraph: {
    title: "Sino Vorex — From factory floor to your port",
    description: DESCRIPTION,
    url: "/",
    siteName: "Sino Vorex",
    type: "website",
    locale: "en_US",
  },
  twitter: { card: "summary_large_image", title: "Sino Vorex — China Sourcing & Export Partner", description: DESCRIPTION },
};

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Sino Vorex",
  legalName: COMPANY.legalNameZh,
  alternateName: COMPANY.legalNameEn,
  url: SITE_URL,
  logo: `${SITE_URL}/brand/sinovorex-app-icon.svg`,
  email: COMPANY.email,
  telephone: COMPANY.phoneDisplay.replace(/\s/g, ""),
  description: DESCRIPTION,
  address: { "@type": "PostalAddress", addressLocality: "Suzhou", addressRegion: "Jiangsu", addressCountry: "CN" },
  areaServed: "Worldwide",
  contactPoint: [{ "@type": "ContactPoint", contactType: "sales", email: COMPANY.email, telephone: COMPANY.phoneDisplay.replace(/\s/g, ""), availableLanguage: ["English", "Chinese"] }],
  ...(COMPANY.licenceNo ? { taxID: COMPANY.licenceNo } : {}),
};

// Fonts are downloaded at build time and served from this site (Google Fonts is blocked in mainland China).
const interTight = Inter_Tight({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700"], variable: "--font-display", display: "swap" });
const instrumentSerif = Instrument_Serif({ subsets: ["latin"], weight: "400", style: ["normal", "italic"], variable: "--font-serif", display: "swap" });
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-mono", display: "swap" });

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
const PLAUSIBLE_DOMAIN = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${interTight.variable} ${instrumentSerif.variable} ${jetbrainsMono.variable}`}>
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }} />
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
