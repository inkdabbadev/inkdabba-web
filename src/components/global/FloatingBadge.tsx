"use client";

import { motion, useReducedMotion } from "framer-motion";

const BADGE_TEXT = "INK DABBA / DESIGN-LED STUDIO / ONE STRONG MARK / ";

export default function FloatingBadge() {
  const reduceMotion = useReducedMotion();
  const chars = BADGE_TEXT.split("");

  return (
    <motion.div
      initial={reduceMotion ? undefined : { opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="pointer-events-none fixed bottom-2 right-2 z-40 flex scale-[0.84] items-center justify-center opacity-82 mix-blend-difference sm:bottom-3 sm:right-3 sm:scale-[0.9] md:bottom-6 md:right-6 md:scale-100 md:opacity-100"
      aria-hidden
    >
      <div className="relative h-[4.35rem] w-[4.35rem] sm:h-[4.8rem] sm:w-[4.8rem] md:h-28 md:w-28">
        <motion.div
          className="absolute inset-0"
          animate={reduceMotion ? undefined : { rotate: 360 }}
          transition={{ duration: 12, ease: "linear", repeat: Infinity }}
        >
          {chars.map((char, index) => (
            <span
              key={`${char}-${index}`}
              className="absolute left-1/2 top-0 -ml-[2px] origin-[0_34px] font-body text-[5.5px] font-bold uppercase tracking-[0.16em] text-white sm:-ml-[3px] sm:origin-[0_38px] sm:text-[6.5px] sm:tracking-[0.18em] md:-ml-[4px] md:origin-[0_56px] md:text-[10px] md:tracking-[0.28em]"
              style={{ transform: `rotate(${index * (360 / chars.length)}deg)` }}
            >
              {char}
            </span>
          ))}
        </motion.div>

        <div className="absolute inset-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white sm:h-2 sm:w-2 md:h-2.5 md:w-2.5" />
      </div>
    </motion.div>
  );
}
