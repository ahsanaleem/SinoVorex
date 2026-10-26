import { CustomCursor } from "./sinovorex/chrome";
import { Nav } from "./sinovorex/Nav";
import { Hero, MarqueeBands } from "./sinovorex/Hero";
import { HowItWorks, Services } from "./sinovorex/Services";
import { FeesAndFaq, Products, QualityControl, Shipping } from "./sinovorex/Trade";
import { About } from "./sinovorex/About";
import { GlobalReach } from "./sinovorex/GlobalReach";
import { CTA, Footer } from "./sinovorex/Closing";
import { IdleFloatingChat, LenisInit, QuoteModalHost } from "./sinovorex/islands";

/*
 * The homepage is server-rendered HTML. Scroll reveals are CSS (see lite.tsx and the script in app/layout.tsx),
 * and only small "islands" run JavaScript: the nav, the globe, the map, the Incoterm tabs and the buttons.
 */
export default function TradevorexHome() {
  return (
    <>
      <LenisInit />
      <CustomCursor />
      <div aria-hidden className="scroll-progress fixed inset-x-0 top-0 z-[200] h-[3px] bg-gradient-to-r from-flame via-[#FF9A5C] to-flame" />
      <QuoteModalHost />
      <Nav />

      <main className="overflow-x-clip bg-paper font-display text-ink">
        <Hero />
        <MarqueeBands />
        <HowItWorks />
        <Services />
        <Products />
        <QualityControl />
        <Shipping />
        <About />
        <GlobalReach />
        <FeesAndFaq />
        <CTA />
      </main>
      <Footer />
      <IdleFloatingChat />
    </>
  );
}
