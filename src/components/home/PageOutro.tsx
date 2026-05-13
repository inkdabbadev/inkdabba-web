"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

export default function PageOutro({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    // Start animation when top of container hits bottom of viewport
    // End animation when top of container hits top of viewport
    offset: ["start end", "start start"] 
  });

  const smoothProgress = useSpring(scrollYProgress, {
    damping: 20,
    stiffness: 100,
    mass: 0.5
  });

  // Scale up from 0 to 1
  const scale = useTransform(smoothProgress, [0, 1], [0.001, 1]);
  // Fade in
  const opacity = useTransform(smoothProgress, [0, 0.5], [0, 1]);
  
  // Pin the element to the center of the screen while it's scrolling up by 100vh
  // When smoothProgress = 0, it's at 100vh in viewport. We translate by -100vh to place it at 0vh.
  // When smoothProgress = 1, it's at 0vh in viewport. We translate by 0vh to leave it at 0vh.
  const y = useTransform(smoothProgress, [0, 1], ["-100vh", "0vh"]);

  return (
    <div 
      ref={containerRef} 
      // The container starts exactly after the 700vh section, so it enters the viewport
      // during the last 100vh of the section's scroll.
      className="relative z-50 bg-transparent"
    >
      <motion.div 
        className="h-screen w-full origin-center flex flex-col justify-start"
        style={{ scale, y, opacity }}
      >
        <div className="w-full bg-ink-black shadow-[0_0_150px_rgba(0,0,0,1)]">
           {children}
        </div>
      </motion.div>
    </div>
  );
}
