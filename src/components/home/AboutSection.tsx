"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";

const aboutText = "WE DON'T DO QUIET. WE ENGINEER VISUAL SYSTEMS THAT LEAVE A MARK.";

export default function AboutSection() {
  const containerRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const words = aboutText.split(" ");

  return (
    <section 
      ref={containerRef} 
      className="relative min-h-[200vh] w-full bg-ink-black flex flex-col border-t border-white/5"
    >
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center max-w-7xl mx-auto px-4 lg:px-12 perspective-[2000px]">
        <p className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-[7rem] leading-[0.95] text-center flex flex-wrap justify-center gap-x-4 sm:gap-x-6 tracking-tighter">
          {words.map((word, i) => {
            const start = i / words.length * 0.8;
            const end = start + (1 / words.length);
            
            return (
              <Word 
                key={i} 
                word={word} 
                progress={scrollYProgress} 
                range={[start, end]} 
              />
            );
          })}
        </p>
      </div>
    </section>
  );
}

interface WordProps {
  word: string;
  progress: MotionValue<number>;
  range: [number, number];
}

function Word({ word, progress, range }: WordProps) {
  // Extreme Liquid / 3D Reveal
  const opacity = useTransform(progress, range, [0, 1]);
  const y = useTransform(progress, range, [150, 0]);
  const rotateX = useTransform(progress, range, [100, 0]);
  const rotateY = useTransform(progress, range, [40, 0]);
  const scale = useTransform(progress, range, [2.5, 1]);
  const blur = useTransform(progress, range, ["blur(30px)", "blur(0px)"]);

  return (
    <span className="relative mt-2 md:mt-4 inline-block" style={{ perspective: 2000 }}>
      {/* Ghost text for trailing effect */}
      <span className="absolute inset-0 opacity-10 text-cmyk-magenta blur-md mix-blend-screen">{word}</span>
      
      <motion.span 
        style={{ 
          WebkitTextStroke: "2px rgba(255, 244, 230, 0.95)",
          opacity, 
          y, 
          rotateX,
          rotateY,
          filter: blur,
          scale,
          transformOrigin: "center center"
        } as any} 
        className="text-transparent inline-block drop-shadow-[0_0_20px_rgba(255,255,255,0.15)] transition-all duration-300 hover:text-cmyk-yellow hover:[-webkit-text-stroke:0px] cursor-crosshair"
      >
        {word}
      </motion.span>
    </span>
  );
}
