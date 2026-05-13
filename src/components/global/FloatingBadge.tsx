"use client";

import { useId } from "react";
import { motion, useReducedMotion } from "framer-motion";

const BADGE_TEXT = "INK DABBA / DESIGN-LED STUDIO / ONE STRONG MARK / ";

export default function FloatingBadge() {
  const reduceMotion = useReducedMotion();
  const pathId = useId();

  return (
    <motion.div
      initial={reduceMotion ? undefined : { opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="pointer-events-none fixed bottom-3 right-3 z-40 h-[4.8rem] w-[4.8rem] opacity-90 mix-blend-screen will-change-transform transform-gpu sm:bottom-4 sm:right-4 sm:h-[5.4rem] sm:w-[5.4rem] md:bottom-6 md:right-6 md:h-28 md:w-28"
      aria-hidden
    >
      <motion.svg
        viewBox="0 0 100 100"
        className="absolute inset-0 h-full w-full overflow-visible will-change-transform transform-gpu"
        animate={reduceMotion ? undefined : { rotate: 360 }}
        transition={{ duration: 18, ease: "linear", repeat: Infinity }}
      >
        <defs>
          <path
            id={pathId}
            d="M 50,50 m -39,0 a 39,39 0 1,1 78,0 a 39,39 0 1,1 -78,0"
          />
        </defs>
        <text className="fill-warm-white font-body text-[8px] font-bold uppercase tracking-[0.24em]">
          <textPath href={`#${pathId}`} startOffset="0%">
            {BADGE_TEXT}
          </textPath>
        </text>
      </motion.svg>

      <div className="absolute inset-[18%] rounded-full border border-cmyk-cyan/70" />
      <div className="absolute inset-[27%] rounded-full border border-cmyk-magenta/75" />
      <div className="absolute inset-[36%] rounded-full border border-cmyk-yellow/80" />

      <motion.div
        className="absolute inset-[24%] will-change-transform transform-gpu"
        animate={reduceMotion ? undefined : { rotate: -360 }}
        transition={{ duration: 9, ease: "linear", repeat: Infinity }}
      >
        <span className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cmyk-yellow ring-2 ring-cmyk-key md:h-2.5 md:w-2.5" />
        <span className="absolute right-0 top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-cmyk-cyan md:h-2 md:w-2" />
        <span className="absolute bottom-0 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-cmyk-magenta md:h-2 md:w-2" />
      </motion.div>
    </motion.div>
  );
}
