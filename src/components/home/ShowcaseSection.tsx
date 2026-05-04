"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useVelocity, useSpring } from "framer-motion";
import { useCursor } from "@/context/CursorContext";
import Image from "next/image";

const portfolioItems = [
  { id: 1, title: "Agni Masala", category: "Posters", src: "/image/poster/Poster (105).jpeg" },
  { id: 2, title: "Chennai Music", category: "Events", src: "/image/poster/Poster (102).jpeg" },
  { id: 3, title: "Seyon Studio", category: "Branding", src: "/image/poster/Poster (99).jpeg" },
  { id: 4, title: "Urban Eats", category: "Food", src: "/image/poster/Poster (96).jpeg" },
  { id: 5, title: "Future Fest", category: "Campaigns", src: "/image/poster/Poster (88).jpeg" },
  { id: 6, title: "Neon Nights", category: "Posters", src: "/image/poster/Poster (81).jpeg" },
];

export default function ShowcaseSection() {
  const containerRef = useRef<HTMLElement>(null);
  const { setVariant } = useCursor();
  
  const { scrollYProgress, scrollY } = useScroll({
    target: containerRef,
  });

  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400
  });

  // Advanced Physics: Cards lean aggressively into the scroll
  const skewX = useTransform(smoothVelocity, [-2000, 2000], [25, -25]);
  const rotateY = useTransform(smoothVelocity, [-2000, 2000], [15, -15]);

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-85%"]);
  
  // Extreme Internal Image Parallax
  const imageX = useTransform(scrollYProgress, [0, 1], ["-30%", "30%"]);

  return (
    <section ref={containerRef} id="archive" className="relative h-[400vh] bg-ink-black border-t border-white/5 perspective-[2000px]">
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-center">
        
        <div className="absolute top-10 left-[4%] md:top-20 z-10 text-warm-white mix-blend-difference pointer-events-none">
          <h2 className="font-display text-[15vw] md:text-9xl uppercase leading-[0.8] tracking-tighter opacity-90">
            The <br /> <span className="text-transparent" style={{ WebkitTextStroke: "3px #F2E8D8" }}>Archive</span>
          </h2>
        </div>

        <motion.div style={{ x }} className="flex gap-8 md:gap-24 px-[4%] md:px-[20vw] mt-16 md:mt-0 items-center h-full">
          {portfolioItems.map((item) => (
            <motion.div 
              key={item.id}
              style={{ skewX, rotateY }}
              className="relative shrink-0 w-[85vw] md:w-[45vw] h-[65vh] md:h-[75vh] group overflow-hidden cursor-none rounded-2xl border border-white/10 shadow-[0_0_80px_rgba(0,0,0,0.9)] transform-style-3d"
              onMouseEnter={() => setVariant("VIEW")}
              onMouseLeave={() => setVariant("default")}
            >
              <motion.div className="absolute inset-0 w-[160%] h-[120%] -top-[10%] origin-center transition-transform duration-[1.5s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110 group-hover:rotate-3" style={{ x: imageX }}>
                <Image 
                  src={item.src} 
                  alt={item.title} 
                  fill 
                  className="object-cover transition-all duration-[1.5s] ease-[cubic-bezier(0.16,1,0.3,1)] grayscale opacity-40 mix-blend-luminosity group-hover:mix-blend-normal group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110" 
                />
              </motion.div>
              <div className="absolute inset-0 bg-gradient-to-t from-ink-black/95 via-ink-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-700" />
              
              <div className="absolute bottom-0 left-0 p-8 md:p-12 translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]">
                <span className="font-body text-[0.7rem] md:text-sm font-bold tracking-[0.4em] text-vermilion uppercase block mb-4">{item.category}</span>
                <h3 className="font-display text-5xl md:text-7xl text-warm-white uppercase tracking-tight leading-none drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)]">{item.title}</h3>
              </div>
            </motion.div>
          ))}
          <div className="shrink-0 w-[20vw]" /> {/* padding at end */}
        </motion.div>

      </div>
    </section>
  );
}
