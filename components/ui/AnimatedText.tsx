"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { wordReveal, staggerContainer } from "@/lib/motion";

interface Props {
  text: string;
  className?: string;
  highlight?: string;
  delay?: number;
  as?: "h1" | "h2" | "h3" | "p";
}

export function AnimatedText({ text, className, highlight, delay = 0, as = "h1" }: Props) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const Tag = motion[as];
  const words = text.split(" ");

  return (
    <Tag
      ref={ref}
      variants={staggerContainer(0.08, delay)}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className={className}
      style={{ perspective: 1000 }}
    >
      {words.map((word, i) => {
        const isHighlight =
          highlight && word.toLowerCase().includes(highlight.toLowerCase());
        return (
          <span key={i} className="inline-block overflow-hidden pb-2 mr-[0.3em]">
            <motion.span
              variants={wordReveal}
              className={`inline-block ${
                isHighlight
                  ? "bg-gradient-to-r from-[#0992C2] via-[#38BDF8] to-[#143E82] bg-clip-text text-transparent"
                  : ""
              }`}
            >
              {word}
            </motion.span>
          </span>
        );
      })}
    </Tag>
  );
}

export default AnimatedText;
