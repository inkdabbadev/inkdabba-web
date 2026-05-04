"use client";

import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useCursor } from "@/context/CursorContext";

export default function CustomCursor() {
  const { variant } = useCursor();
  const [isMobile, setIsMobile] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 400, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Check if device is touch or coarse pointer
    const checkMobile = () => {
      setIsMobile(window.matchMedia("(pointer: coarse)").matches);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    window.addEventListener("mousemove", moveCursor);

    return () => {
      window.removeEventListener("resize", checkMobile);
      window.removeEventListener("mousemove", moveCursor);
    };
  }, [cursorX, cursorY]);

  if (isMobile) return null;

  const variants = {
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
      backgroundColor: "#FF4D1D", // vermilion
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
      backgroundColor: "#C7FF3D", // acid
      mixBlendMode: "normal" as const,
      opacity: 1,
    },
    START: {
      width: 80,
      height: 80,
      backgroundColor: "#FF2DAA", // hot pink
      mixBlendMode: "normal" as const,
      opacity: 1,
    },
  };

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
      className="fixed top-0 left-0 z-[9999] flex items-center justify-center rounded-full pointer-events-none overflow-hidden origin-center"
      variants={variants}
      animate={variant}
      transition={{ type: "spring", stiffness: 300, damping: 28 }}
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
