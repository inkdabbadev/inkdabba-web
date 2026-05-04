"use client";

import React, { useRef } from "react";
import { motion, MotionValue, useScroll, useTransform } from "framer-motion";

interface InterludeSectionProps {
  texts: string[];
}

export default function InterludeSection({ texts }: InterludeSectionProps) {
  const containerRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <section ref={containerRef} className="relative w-full bg-ink-black" style={{ height: `${texts.length * 100}vh` }}>
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden">
        
        {/* Subtle Breathing Glow */}
        <motion.div 
          className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_0%,transparent_60%)] pointer-events-none"
          animate={{ scale: [0.9, 1.1, 0.9], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="relative w-full max-w-7xl px-4 flex items-center justify-center">
          {texts.map((text, index) => (
            <InterludeText
              key={index}
              text={text}
              index={index}
              total={texts.length}
              scrollYProgress={scrollYProgress}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function InterludeText({
  text,
  index,
  total,
  scrollYProgress,
}: {
  text: string;
  index: number;
  total: number;
  scrollYProgress: MotionValue<number>;
}) {
  const start = index / total;
  const peak = start + (0.5 / total);
  const end = start + (1 / total);

  // Map scroll to dramatic Smash Cut Effect
  const opacity = useTransform(scrollYProgress, [start, peak, end], [0, 1, 0]);
  const scale = useTransform(scrollYProgress, [start, peak, end], [2, 1, 0.8]);
  const blur = useTransform(scrollYProgress, [start, peak, end], ["blur(20px)", "blur(0px)", "blur(10px)"]);

  return (
    <motion.h3
      className={`absolute text-center font-display uppercase tracking-tight w-full ${
        index === total - 1
          ? "text-vermilion text-[8vw] md:text-[8rem] lg:text-[10rem] leading-[0.85]"
          : "text-warm-white text-[6vw] md:text-[6rem] lg:text-[8rem] leading-[0.85]"
      }`}
      style={{
        opacity,
        scale,
        filter: blur,
        transformOrigin: "center center",
      }}
    >
      {text}
    </motion.h3>
  );
}
