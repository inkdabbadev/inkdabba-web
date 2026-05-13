"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";

const stats = [
  { value: 100, label: "Posters", suffix: "+" },
  { value: 40, label: "Logos", suffix: "+" },
  { value: 25, label: "Brands", suffix: "+" },
];

export default function ImpactSection() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [100, -150]);
  const y2 = useTransform(scrollYProgress, [0, 1], [-100, 150]);

  return (
    <section ref={containerRef} className="relative py-40 min-h-[120vh] bg-ink-black overflow-hidden flex flex-col items-center justify-center border-t border-white/5">

      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(249,102,91,0.08)_0%,transparent_50%)] z-0" />

      <div className="relative z-10 w-full flex flex-col items-center gap-20 md:gap-32">
        <motion.div style={{ y: y1 }} className="text-center w-full px-4 mix-blend-difference pointer-events-none">
          <h2 className="font-display text-[12vw] md:text-[8vw] text-warm-white leading-[0.8] uppercase tracking-tighter">
            WE DON&apos;T DO
          </h2>
          <h2 className="font-display text-[20vw] md:text-[14vw] text-cmyk-magenta leading-[0.8] uppercase tracking-tighter md:ml-24">
            QUIET.
          </h2>
        </motion.div>

        <div className="w-full flex flex-col relative z-20">
          {stats.map((stat, i) => (
            <motion.div 
              key={i} 
              style={{ y: i % 2 === 0 ? y1 : y2 }} 
              className={`flex items-baseline ${i % 2 === 0 ? "justify-start pl-[5%] md:pl-[10%]" : "justify-end pr-[5%] md:pr-[10%]"}`}
            >
              <StatCounter stat={stat} index={i} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function StatCounter({ stat, index }: { stat: any, index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    
    let startTimestamp: number | null = null;
    const duration = 2500; // 2.5 seconds

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      
      const easeOutCubic = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(easeOutCubic * stat.value));

      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        setCount(stat.value);
      }
    };

    window.requestAnimationFrame(step);
  }, [isInView, stat.value]);

  return (
    <div ref={ref} className="relative group cursor-crosshair">
      <div className="font-display text-[30vw] md:text-[22vw] text-warm-white leading-[0.75] tracking-tighter group-hover:opacity-20 transition-opacity duration-500">
        {count}
        <span className="text-[15vw] md:text-[10vw] text-transparent" style={{ WebkitTextStroke: "2px #F2E8D8" }}>{stat.suffix}</span>
      </div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-display text-[10vw] md:text-[6vw] uppercase tracking-tighter text-cmyk-yellow opacity-0 group-hover:opacity-100 transition-all duration-500 scale-50 group-hover:scale-100 pointer-events-none">
        {stat.label}
      </div>
    </div>
  );
}
