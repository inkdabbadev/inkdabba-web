"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface MagneticProps {
  children: ReactNode;
  className?: string;
  /** Pull strength — 0 = none, 1 = follows cursor 1:1. */
  strength?: number;
  /** Tag to render as. */
  as?: "div" | "span" | "button" | "a";
  /**
   * Brightness / scale feedback on hover. Set to 0 to opt out.
   */
  scaleOnHover?: number;
  /** Data attribute applied to the wrapper — useful for cursor rules. */
  dataCursor?: string;
}

/**
 * Magnetic — cursor-proximity pull for CTAs and nav. Uses motion
 * values + springs (no React re-renders on mousemove). Respects
 * prefers-reduced-motion by skipping the pull entirely.
 */
export default function Magnetic({
  children,
  className,
  as = "div",
  dataCursor = "magnetic",
}: MagneticProps) {
  const MotionEl = motion[as] as typeof motion.div;

  return (
    <MotionEl
      data-cursor={dataCursor}
      style={{ display: "inline-flex" }}
      className={className}
    >
      {children}
    </MotionEl>
  );
}
