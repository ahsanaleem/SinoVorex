import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sino Vorex — Global Trade Consulting | Suzhou, China",
  description:
    "Sino Vorex connects Chinese enterprises with global markets and the world with China. Precision trade consulting, market entry, compliance, and supply chain advisory.",
  keywords: ["China trade consulting", "Sino Vorex", "market entry China", "export consulting", "trade compliance", "Suzhou consulting", "supply chain advisory"],
  openGraph: {
    title: "Sino Vorex — The Force Behind Global Trade",
    description: "Specialist trade consulting firm based in Suzhou, Jiangsu. Serving both Chinese enterprises and foreign businesses.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;600;700;800;900&family=Barlow:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body style={{ margin: 0, padding: 0, background: "#F9F8F5" }}>
        {children}
      </body>
    </html>
  );
}
