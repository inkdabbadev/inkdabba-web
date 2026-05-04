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
        className="fixed inset-0 z-[9999] bg-ink-black flex flex-col items-center justify-center pointer-events-none"
        initial={{ y: "0%" }}
        animate={{ y: "-100%" }}
        transition={{ duration: 1.2, delay: 1.5, ease: [0.76, 0, 0.24, 1] }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8, filter: "blur(20px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center justify-center relative w-full"
        >
          {/* Advanced Preloader Logo Reveal */}
          <div className="relative w-64 h-24 md:w-80 md:h-32 mb-6 overflow-hidden perspective-1000">
            <motion.img
              src="/logo/inkdabba-white-pre.svg"
              alt="INK DABBA"
              className="w-full h-full object-contain origin-bottom"
              initial={{ y: "100%", rotateX: 90, opacity: 0 }}
              animate={{ y: "0%", rotateX: 0, opacity: 1 }}
              transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1], delay: 0.2 }}
            />
          </div>

          {/* Premium Progress Line */}
          <div className="h-[1px] w-32 md:w-48 bg-white/10 overflow-hidden relative rounded-full">
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: "100%" }}
              transition={{ duration: 1.5, ease: [0.76, 0, 0.24, 1] }}
              className="h-full w-full bg-vermilion"
            />
          </div>
        </motion.div>
      </motion.div>

      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.main>
    </>
  );
}
