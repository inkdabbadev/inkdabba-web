"use client";

import { useSpring, useMotionValue, useReducedMotion } from "framer-motion";
import type { MouseEvent as ReactMouseEvent } from "react";

interface PointerFieldOptions {
  stiffness?: number;
  damping?: number;
  mass?: number;
}

export default function usePointerField({
  stiffness = 64,
  damping = 18,
  mass = 0.7,
}: PointerFieldOptions = {}) {
  const reduceMotion = useReducedMotion();
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  const x = useSpring(rawX, { stiffness, damping, mass });
  const y = useSpring(rawY, { stiffness, damping, mass });

  function handleMove<T extends HTMLElement>(event: ReactMouseEvent<T>) {
    if (reduceMotion) return;

    const rect = event.currentTarget.getBoundingClientRect();
    const nextX = (event.clientX - rect.left) / rect.width - 0.5;
    const nextY = (event.clientY - rect.top) / rect.height - 0.5;

    rawX.set(nextX);
    rawY.set(nextY);
  }

  function handleLeave() {
    rawX.set(0);
    rawY.set(0);
  }

  return {
    x,
    y,
    handleMove,
    handleLeave,
    reduceMotion,
  };
}
