"use client";

/**
 * FadeIn — legacy wrapper retained for existing call sites.
 * Now routes through the motion system so it respects reduced
 * motion and uses the shared premium ease.
 */

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { easePremium } from "@/lib/motion";

export const ease = easePremium;

export default function FadeIn({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduce = useReducedMotion();

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-6%" }}
      transition={{ duration: 0.72, delay, ease: easePremium }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
