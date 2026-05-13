"use client";

import React from "react";
import { motion } from "framer-motion";

export default function DifferenceSection() {
  return (
    <section className="relative min-h-screen w-full bg-ink-black flex flex-col justify-center items-center py-24 border-t border-white/5 overflow-hidden">
      
      {/* Subtle Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cmyk-magenta/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 lg:px-12 w-full relative z-10 text-center">
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-sans text-cmyk-yellow text-sm uppercase tracking-[0.3em] font-bold mb-12"
        >
          What makes us different
        </motion.p>

        <motion.h2 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-5xl md:text-7xl lg:text-[6rem] leading-[1.1] tracking-tighter text-warm-white"
        >
          WE DON&apos;T JUST DESIGN.<br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cmyk-cyan via-warm-white to-cmyk-magenta">WE ENGINEER VISUAL</span><br className="hidden md:block" />
          <span className="italic font-light opacity-90">SYSTEMS THAT</span> LEAVE A MARK.
        </motion.h2>

        <motion.p
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ delay: 0.4, duration: 0.8 }}
           className="mt-12 font-sans text-white/50 text-xl md:text-2xl max-w-2xl mx-auto font-light leading-relaxed"
        >
          Not every design needs explanation. Some brands whisper. We make them loud. At InkDabba, we strip away the unnecessary until only impact remains.
        </motion.p>
      </div>
    </section>
  );
}
