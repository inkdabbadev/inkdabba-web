"use client";

import React, { useRef, useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
  useAnimation,
  AnimationControls,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import Image from "next/image";
import InfiniteGridBackground from "@/components/ui/infinite-grid-integration";

const curiousPhrases = [
  "What happens when you break the frame?",
  "Culture is shaped by those who dare.",
  "We make the ordinary impossible to ignore.",
  "Are you ready to see what's next?"
];

interface InteractiveEyeProps {
  top: string;
  left: string;
  size: string;
  containerColor?: string;
  irisColor?: string;
  irisSize?: string;
  pupilColor?: string;
  pupilSize?: string;
  blinkControls: AnimationControls;
}

// Custom component for an interactive eye
function InteractiveEye({
  top,
  left,
  size,
  containerColor = "#111111",
  irisColor = "#ffffff",
  irisSize = "45%",
  pupilColor = "#111111",
  pupilSize = "35%",
  blinkControls
}: InteractiveEyeProps) {
  const eyeRef = useRef<HTMLDivElement>(null);
  const boundsRef = useRef<DOMRect | null>(null);
  const reduceMotion = useReducedMotion();
  const targetX = useMotionValue(0);
  const targetY = useMotionValue(0);
  const x = useSpring(targetX, { stiffness: 320, damping: 28, mass: 0.45 });
  const y = useSpring(targetY, { stiffness: 320, damping: 28, mass: 0.45 });
  const pupilX = useTransform(x, (latest) => latest * 0.4);
  const pupilY = useTransform(y, (latest) => latest * 0.4);

  useEffect(() => {
    if (reduceMotion) {
      return;
    }

    const updateBounds = () => {
      boundsRef.current = eyeRef.current?.getBoundingClientRect() ?? null;
    };

    const handlePointerMove = (event: PointerEvent) => {
      const rect = boundsRef.current;
      if (!rect) {
        return;
      }

      const eyeCenterX = rect.left + rect.width / 2;
      const eyeCenterY = rect.top + rect.height / 2;
      const angle = Math.atan2(event.clientY - eyeCenterY, event.clientX - eyeCenterX);
      const maxDistance = rect.width * 0.25;
      const distance = Math.min(
        maxDistance,
        Math.hypot(event.clientX - eyeCenterX, event.clientY - eyeCenterY) / 25
      );

      targetX.set(Math.cos(angle) * distance);
      targetY.set(Math.sin(angle) * distance);
    };

    updateBounds();
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("resize", updateBounds, { passive: true });
    window.addEventListener("scroll", updateBounds, { passive: true });

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("resize", updateBounds);
      window.removeEventListener("scroll", updateBounds);
    };
  }, [reduceMotion, targetX, targetY]);

  return (
    <div
      className="absolute z-20"
      style={{
        top,
        left,
        width: size,
        aspectRatio: '1/1',
        transform: 'translate(-50%, -50%)',
      }}
    >
      {/* The Eye Container */}
      <motion.div
        ref={eyeRef}
        className="relative w-full h-full rounded-full flex items-center justify-center overflow-hidden will-change-transform transform-gpu"
        style={{ backgroundColor: containerColor, originY: 0.5 }}
        animate={blinkControls}
        initial={{ scaleY: 1 }}
      >
        {/* The Iris (moving part) */}
        <motion.div
          className="rounded-full flex items-center justify-center"
          style={{ width: irisSize, height: irisSize, backgroundColor: irisColor, x, y }}
        >
          {/* The Pupil (moves dynamically inside the iris) */}
          <motion.div 
            className="rounded-full" 
            style={{ width: pupilSize, height: pupilSize, backgroundColor: pupilColor, x: pupilX, y: pupilY }} 
          />
        </motion.div>
      </motion.div>
    </div>
  );
}

export default function HeroSection() {
  const containerRef = useRef<HTMLElement>(null);
  const [phraseIndex, setPhraseIndex] = useState(0);
  const blinkControls = useAnimation();
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion) {
      return;
    }

    let isActive = true;

    const blinkRoutine = async () => {
      while (isActive) {
        // Wait for a random duration between 2s and 6s
        const waitTime = Math.random() * 4000 + 2000;
        await new Promise(r => setTimeout(r, waitTime));

        if (!isActive) break;

        // Perform the blink (scaleY down to 0.05 and back to 1)
        await blinkControls.start({
          scaleY: [1, 0.05, 1],
          transition: { duration: 0.15, times: [0, 0.5, 1], ease: "easeInOut" }
        });

        // 20% chance for a quick double blink
        if (Math.random() > 0.8) {
          await new Promise(r => setTimeout(r, 100));
          if (!isActive) break;
          await blinkControls.start({
            scaleY: [1, 0.05, 1],
            transition: { duration: 0.15, times: [0, 0.5, 1], ease: "easeInOut" }
          });
        }
      }
    };

    blinkRoutine();

    return () => { isActive = false; };
  }, [blinkControls, reduceMotion]);

  useEffect(() => {
    if (reduceMotion) {
      return;
    }

    const interval = setInterval(() => {
      setPhraseIndex((prev) => (prev + 1) % curiousPhrases.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [reduceMotion]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);

  return (
    <section ref={containerRef} className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-ink-black pt-20 perspective-1000">
      <InfiniteGridBackground className="z-0" />

      <motion.div
        className="relative z-10 flex flex-col items-center text-center px-4 max-w-5xl mx-auto w-full will-change-transform transform-gpu"
        style={{ y: heroY, opacity: heroOpacity, scale: heroScale }}
      >
        <motion.div
          className="relative w-[85vw] md:w-[60vw] max-w-[800px] aspect-[4/1] mb-12 flex justify-center items-center will-change-transform transform-gpu"
          initial={{ opacity: 0, y: 26, scale: 0.985 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.05, ease: [0.16, 1, 0.3, 1], delay: 0.18 }}
        >
          <Image
            src="/logo/inkdabba-white.svg"
            alt="INKDABBA Logo"
            fill
            className="object-contain drop-shadow-[0_0_40px_rgba(255,255,255,0.15)] pointer-events-none"
            priority
          />
          {/* INTERACTIVE BOTTLE EYES */}
          {/* Tweak these values to customize the look of each eye! */}
          <InteractiveEye
            left="29.5%"
            top="59.4%"
            size="5%"
            containerColor="#111111"
            irisColor="#ffffff"
            irisSize="70%"
            pupilColor="#111111"
            pupilSize="55%"
            blinkControls={blinkControls}
          />
          <InteractiveEye
            left="36%"
            top="59.4%"
            size="5%"
            containerColor="#111111"
            irisColor="#ffffff"
            irisSize="70%"
            pupilColor="#111111"
            pupilSize="55%"
            blinkControls={blinkControls}
          />
        </motion.div>

        <motion.p
          className="font-body text-warm-paper/70 text-sm md:text-lg max-w-md mx-auto mb-14 leading-relaxed"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.95, ease: [0.16, 1, 0.3, 1] }}
        >
          Posters, logos, campaigns and brand systems built to grab attention instantly.
        </motion.p>

        <motion.div
          className="mt-12 flex flex-col items-center justify-center gap-4 h-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.75, delay: 1.35 }}
        >
          <AnimatePresence mode="wait">
            <motion.p
              key={phraseIndex}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className="font-body text-xs md:text-sm font-medium tracking-[0.2em] uppercase text-warm-white/60 text-center"
            >
              {curiousPhrases[phraseIndex]}
            </motion.p>
          </AnimatePresence>
        </motion.div>
      </motion.div>

    </section>
  );
}
