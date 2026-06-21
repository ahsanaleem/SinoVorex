import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Tradevorex — Global Trade Consulting | Suzhou, China",
  description:
    "Suzhou Tradevorex connects Chinese enterprises with global markets and the world with China. Precision trade consulting, market entry, compliance, and supply chain advisory.",
  keywords: [
    "China trade consulting",
    "market entry China",
    "export consulting",
    "trade compliance",
    "Suzhou consulting",
    "supply chain advisory",
  ],
  openGraph: {
    title: "Tradevorex — The Force Behind Global Trade",
    description:
      "Specialist trade consulting firm based in Suzhou, Jiangsu. Serving both Chinese enterprises and foreign businesses.",
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
      <body style={{ margin: 0, padding: 0, background: "#0A0F1E" }}>
        {children}
      </body>
    </html>
  );
}
