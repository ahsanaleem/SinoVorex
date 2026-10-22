"use client";

import { useCallback, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { MotionConfig } from "framer-motion";
import { SmoothScroll, useScrollTo } from "./sinovorex/primitives";
import { CustomCursor, ScrollProgress } from "./sinovorex/chrome";
import { Nav } from "./sinovorex/Nav";
import { Hero, MarqueeBands } from "./sinovorex/Hero";
import { HowItWorks, Services } from "./sinovorex/Services";
import { FeesAndFaq, Products, QualityControl, Shipping } from "./sinovorex/Trade";
import { About } from "./sinovorex/About";
import { GlobalReach } from "./sinovorex/GlobalReach";
import { CTA, Footer } from "./sinovorex/Closing";
import { FloatingChat } from "./sinovorex/FloatingChat";

// Only needed once someone opens the quote form; keeps it out of the initial bundle.
const ContactModal = dynamic(() => import("./sinovorex/ContactModal").then((m) => m.ContactModal), { ssr: false });

/** Scrolls to #section from a shared link once the page is ready. */
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
  const [modalMounted, setModalMounted] = useState(false);

  // Entrance animations start once the page is interactive. The hero text never waits for them.
  useEffect(() => setLoaded(true), []);
  const openContact = useCallback(() => { setModalMounted(true); setModalOpen(true); }, []);
  const closeContact = useCallback(() => setModalOpen(false), []);

  return (
    <MotionConfig reducedMotion="user">
      <SmoothScroll>
        <HashScroll ready={loaded} />
        <CustomCursor />
        <ScrollProgress />
        {modalMounted && <ContactModal open={modalOpen} onClose={closeContact} />}
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
