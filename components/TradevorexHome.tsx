"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, MotionConfig } from "framer-motion";
import { SmoothScroll, useScrollTo } from "./sinovorex/primitives";
import { CustomCursor, PageLoader, ScrollProgress } from "./sinovorex/chrome";
import { Nav } from "./sinovorex/Nav";
import { Hero, MarqueeBands } from "./sinovorex/Hero";
import { HowItWorks, Services } from "./sinovorex/Services";
import { FeesAndFaq, Products, QualityControl, Shipping } from "./sinovorex/Trade";
import { About } from "./sinovorex/About";
import { GlobalReach } from "./sinovorex/GlobalReach";
import { CTA, Footer } from "./sinovorex/Closing";
import { ContactModal } from "./sinovorex/ContactModal";
import { FloatingChat } from "./sinovorex/ChatButtons";

/** Scrolls to #section from a shared link once the intro has finished. */
function HashScroll({ ready }: { ready: boolean }) {
  const scrollTo = useScrollTo();
  useEffect(() => {
    if (!ready) return;
    const id = decodeURIComponent(location.hash.slice(1));
    if (id && document.getElementById(id)) setTimeout(() => scrollTo(id), 50);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready]);
  return null;
}

export default function TradevorexHome() {
  const [loaded, setLoaded] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const openContact = useCallback(() => setModalOpen(true), []);
  const closeContact = useCallback(() => setModalOpen(false), []);

  return (
    <MotionConfig reducedMotion="user">
      <SmoothScroll>
        <AnimatePresence>{!loaded && <PageLoader key="loader" onDone={() => setLoaded(true)} />}</AnimatePresence>
        <HashScroll ready={loaded} />
        <CustomCursor />
        <ScrollProgress />
        <ContactModal open={modalOpen} onClose={closeContact} />
        <Nav ready={loaded} onContact={openContact} />

        <main className="overflow-x-clip bg-paper font-display text-ink">
          <Hero ready={loaded} onContact={openContact} />
          <MarqueeBands />
          <HowItWorks />
          <Services />
          <Products onQuote={openContact} />
          <QualityControl />
          <Shipping />
          <About />
          <GlobalReach onQuote={openContact} />
          <FeesAndFaq />
          <CTA onContact={openContact} />
        </main>
        <Footer onContact={openContact} />
        <FloatingChat ready={loaded} />
      </SmoothScroll>
    </MotionConfig>
  );
}
