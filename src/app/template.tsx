"use client";

import { motion, useReducedMotion } from "framer-motion";

export default function Template({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion();

  if (reduce) {
    return <main>{children}</main>;
  }

  return (
    <>
      <motion.div
        className="fixed inset-0 z-[9999] bg-ink-black flex flex-col items-center justify-center pointer-events-none will-change-transform transform-gpu"
        initial={{ y: "0%" }}
        animate={{ y: "-100%" }}
        transition={{ duration: 1.05, delay: 1.35, ease: [0.76, 0, 0.24, 1] }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 18 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center justify-center relative w-full will-change-transform transform-gpu"
        >
          {/* Advanced Preloader Logo Reveal */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
            className="mb-4 font-display text-4xl uppercase leading-none tracking-normal text-warm-white md:text-6xl"
          >
            We are
          </motion.p>

          <div className="relative w-64 h-24 md:w-80 md:h-32 mb-6 overflow-hidden perspective-1000">
            <motion.img
              src="/logo/inkdabba-white-pre.svg"
              alt="INK DABBA"
              className="w-full h-full object-contain origin-bottom will-change-transform transform-gpu"
              initial={{ y: "96%", rotateX: 72, opacity: 0 }}
              animate={{ y: "0%", rotateX: 0, opacity: 1 }}
              transition={{ duration: 1, ease: [0.76, 0, 0.24, 1], delay: 0.16 }}
            />
          </div>
        </motion.div>
      </motion.div>

      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.75, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.main>
    </>
  );
}
