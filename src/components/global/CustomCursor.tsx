"use client";

import React, { useEffect, useMemo, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useCursor } from "@/context/CursorContext";

export default function CustomCursor() {
  const { variant } = useCursor();
  const [isMobile, setIsMobile] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = useMemo(() => ({ damping: 30, stiffness: 520, mass: 0.45 }), []);
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Check if device is touch or coarse pointer
    const pointerQuery = window.matchMedia("(pointer: coarse)");
    const checkMobile = () => setIsMobile(pointerQuery.matches);

    checkMobile();
    pointerQuery.addEventListener("change", checkMobile);

    const moveCursor = (event: PointerEvent) => {
      cursorX.set(event.clientX);
      cursorY.set(event.clientY);
    };

    window.addEventListener("pointermove", moveCursor, { passive: true });

    return () => {
      pointerQuery.removeEventListener("change", checkMobile);
      window.removeEventListener("pointermove", moveCursor);
    };
  }, [cursorX, cursorY]);

  const variants = useMemo(
    () => ({
      default: {
        width: 12,
        height: 12,
        backgroundColor: "#FFF4E6",
        mixBlendMode: "difference" as const,
        opacity: 1,
      },
      VIEW: {
        width: 80,
        height: 80,
        backgroundColor: "#FFF4E6",
        mixBlendMode: "normal" as const,
        opacity: 1,
      },
      ENTER: {
        width: 80,
        height: 80,
        backgroundColor: "#00AEEF",
        mixBlendMode: "normal" as const,
        opacity: 1,
      },
      DRAG: {
        width: 80,
        height: 80,
        backgroundColor: "#11100E",
        border: "1px solid #FFF4E6",
        mixBlendMode: "normal" as const,
        opacity: 1,
      },
      BRAND: {
        width: 80,
        height: 80,
        backgroundColor: "#FFF200",
        mixBlendMode: "normal" as const,
        opacity: 1,
      },
      START: {
        width: 80,
        height: 80,
        backgroundColor: "#EC0080",
        mixBlendMode: "normal" as const,
        opacity: 1,
      },
    }),
    [],
  );

  if (isMobile) return null;

  const getCursorText = () => {
    switch (variant) {
      case "VIEW": return "VIEW";
      case "ENTER": return "ENTER";
      case "DRAG": return "DRAG";
      case "BRAND": return "BRAND";
      case "START": return "START";
      default: return "";
    }
  };

  return (
    <motion.div
      className="fixed top-0 left-0 z-[9999] flex items-center justify-center rounded-full pointer-events-none overflow-hidden origin-center will-change-transform transform-gpu"
      variants={variants}
      animate={variant}
      transition={{ type: "spring", stiffness: 360, damping: 32, mass: 0.5 }}
      style={{
        x: cursorXSpring,
        y: cursorYSpring,
        translateX: "-50%",
        translateY: "-50%"
      }}
    >
      <motion.span
        className="text-ink-black font-body text-[10px] font-bold tracking-widest pointer-events-none"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: variant === "default" ? 0 : 1, scale: variant === "default" ? 0.5 : 1 }}
        transition={{ duration: 0.2 }}
      >
        {getCursorText()}
      </motion.span>
    </motion.div>
  );
}
