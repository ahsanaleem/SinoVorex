"use client";
import { useState, useEffect } from "react";
import { motion, useScroll, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { slideDownVariants, EASE_APPLE } from "@/lib/motion";
import MagneticButton from "./MagneticButton";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
  { label: "Services", href: "#services" },
  { label: "Work", href: "#portfolio" },
  { label: "Tech", href: "#tech" },
  { label: "Process", href: "#process" },
  { label: "About", href: "#about" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeLink, setActiveLink] = useState<string | null>(null);
  const { scrollY } = useScroll();

  useEffect(() => {
    return scrollY.on("change", (v) => setScrolled(v > 50));
  }, [scrollY]);

  return (
    <motion.header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        scrolled
          ? "backdrop-blur-2xl bg-white/[0.02] border-b border-white/[0.04] shadow-[0_4px_32px_rgba(0,0,0,0.3)]"
          : "bg-transparent"
      )}
      variants={slideDownVariants}
      initial="hidden"
      animate="visible"
    >
      <nav
        className={cn(
          "max-w-7xl mx-auto flex items-center justify-between px-6 transition-all duration-300",
          scrolled ? "py-3" : "py-6"
        )}
      >
        {/* Logo */}
        <motion.a
          href="/"
          className="flex items-center group"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 150, damping: 15 }}
        >
          <Image
            src="/logo.svg"
            alt="APPVIX"
            width={140}
            height={38}
            className="h-9 w-auto"
            priority
          />
        </motion.a>

        {/* Desktop nav links */}
        <ul className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <motion.a
                href={link.href}
                className="relative px-4 py-2 text-sm text-foreground/60 hover:text-foreground transition-colors duration-200 block"
                onHoverStart={() => setActiveLink(link.href)}
                onHoverEnd={() => setActiveLink(null)}
                whileHover={{ y: -1 }}
                transition={{ type: "spring", stiffness: 150, damping: 15 }}
              >
                {link.label}
                <AnimatePresence>
                  {activeLink === link.href && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute bottom-0 left-4 right-4 h-px bg-brand-cyan"
                      initial={{ opacity: 0, scaleX: 0 }}
                      animate={{ opacity: 1, scaleX: 1 }}
                      exit={{ opacity: 0, scaleX: 0 }}
                      transition={{ duration: 0.2, ease: EASE_APPLE }}
                    />
                  )}
                </AnimatePresence>
              </motion.a>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <MagneticButton variant="primary" href="#contact">
            Book a Call
          </MagneticButton>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden p-2 text-foreground/70 hover:text-brand-cyan transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="md:hidden glass border-t border-white/[0.05]"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: EASE_APPLE }}
          >
            <ul className="px-6 py-4 flex flex-col gap-2">
              {NAV_LINKS.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06, ease: EASE_APPLE, duration: 0.4 }}
                >
                  <a
                    href={link.href}
                    className="block py-2 text-foreground/70 hover:text-brand-cyan transition-colors"
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
              <motion.li
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: NAV_LINKS.length * 0.06, ease: EASE_APPLE, duration: 0.4 }}
                className="pt-2"
              >
                <MagneticButton variant="primary" href="#contact" className="w-full justify-center">
                  Book a Call
                </MagneticButton>
              </motion.li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
