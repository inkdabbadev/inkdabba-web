"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useVelocity, useSpring } from "framer-motion";
import Image from "next/image";

const words1 = ["WE", "SHAPE", "BRANDS", "WITH", "CRAFT", "AND", "CHAOS", "WE", "SHAPE", "BRANDS", "WITH", "CRAFT", "AND", "CHAOS"];
const words2 = ["IMPOSSIBLE", "TO", "IGNORE", "IMPOSSIBLE", "TO", "IGNORE", "IMPOSSIBLE", "TO", "IGNORE"];

const thumbnails = [
  "/image/poster/Poster (8).jpeg",
  "/image/poster/Poster (9).jpeg",
  "/image/poster/Poster (10).jpeg"
];

export default function SignatureBand() {
  const containerRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress, scrollY } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400
  });

  // Skew and Scale effect based on velocity for hyper-dynamic feel
  const skewVelocity = useTransform(smoothVelocity, [-2000, 2000], [-10, 10]);
  const scaleVelocity = useTransform(smoothVelocity, [-2000, 0, 2000], [1.05, 1, 1.05]);

  // Movement
  const x1 = useTransform(scrollYProgress, [0, 1], ["0%", "-40%"]);
  const x2 = useTransform(scrollYProgress, [0, 1], ["-40%", "0%"]);
  
  // Background Layer Movement (slower for parallax depth)
  const xBg1 = useTransform(scrollYProgress, [0, 1], ["-10%", "-30%"]);
  const xBg2 = useTransform(scrollYProgress, [0, 1], ["-30%", "-10%"]);

  return (
    <section ref={containerRef} className="relative py-32 md:py-48 bg-ink-black overflow-hidden flex flex-col justify-center border-t border-white/5">
      
      {/* Edge Gradients to fade out the sides smoothly */}
      <div className="absolute left-0 top-0 w-24 md:w-48 h-full bg-gradient-to-r from-ink-black via-ink-black/80 to-transparent z-20 pointer-events-none" />
      <div className="absolute right-0 top-0 w-24 md:w-48 h-full bg-gradient-to-l from-ink-black via-ink-black/80 to-transparent z-20 pointer-events-none" />

      {/* BACKGROUND LAYER: Massive, Blurred, Ghostly Parallax */}
      <div className="absolute inset-0 flex flex-col justify-center gap-16 opacity-20 blur-[8px] pointer-events-none z-0 select-none">
        <motion.div style={{ x: xBg1, skewX: skewVelocity }} className="flex whitespace-nowrap">
          <div className="flex items-center">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="flex items-center">
                {words1.map((word, j) => (
                  <span key={`${i}-${j}`} className="font-display text-8xl md:text-[14rem] px-8 text-warm-paper uppercase leading-none tracking-tight">
                    {word}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </motion.div>
        <motion.div style={{ x: xBg2, skewX: skewVelocity }} className="flex whitespace-nowrap">
          <div className="flex items-center">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="flex items-center">
                {words2.map((word, j) => (
                  <span key={`${i}-${j}`} className="font-display text-8xl md:text-[14rem] px-8 text-warm-paper uppercase leading-none tracking-tight">
                    {word}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* FOREGROUND LAYER: Sharp, Reactive, Interactive */}
      <div className="relative z-10 flex flex-col gap-6 md:gap-12">
        <motion.div style={{ x: x1, skewX: skewVelocity, scale: scaleVelocity }} className="flex whitespace-nowrap origin-center">
          <div className="flex items-center">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex items-center">
                {words1.map((word, j) => (
                  <div key={`${i}-${j}`} className="flex items-center group cursor-crosshair">
                    <span className="font-display text-6xl md:text-[8rem] px-4 md:px-8 text-warm-paper uppercase leading-[0.8] tracking-tighter transition-all duration-500 group-hover:text-transparent group-hover:[-webkit-text-stroke:2px_#F2E8D8] group-hover:scale-110 drop-shadow-[0_0_15px_rgba(255,255,255,0.05)]">
                      {word}
                    </span>
                    {j % 4 === 0 && (
                      <div className="relative w-24 h-16 md:w-48 md:h-32 rounded-full overflow-hidden mx-4 md:mx-6 grayscale hover:grayscale-0 transition-all duration-700 hover:scale-[1.3] hover:rotate-6 shadow-2xl bg-ink-black z-30">
                        <Image 
                          src={thumbnails[(i + j) % thumbnails.length]} 
                          alt="Thumbnail" 
                          fill 
                          className="object-cover" 
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div style={{ x: x2, skewX: skewVelocity, scale: scaleVelocity }} className="flex whitespace-nowrap origin-center mt-2 md:mt-4">
          <div className="flex items-center">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex items-center">
                {words2.map((word, j) => (
                  <span key={`${i}-${j}`} className="font-display text-6xl md:text-[8rem] px-4 md:px-8 text-transparent uppercase leading-[0.8] tracking-tighter hover:text-vermilion hover:[-webkit-text-stroke:0px] transition-all duration-500 cursor-crosshair hover:scale-110 drop-shadow-[0_0_15px_rgba(249,102,91,0.05)]" style={{ WebkitTextStroke: "2px #F2E8D8" }}>
                    {word}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
      
    </section>
  );
}
