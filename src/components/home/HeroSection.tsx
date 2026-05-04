"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence, useAnimation, AnimationControls } from "framer-motion";
import Image from "next/image";

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
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const eyeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const calculatePupilTransform = () => {
    if (!eyeRef.current) return { x: 0, y: 0 };
    const rect = eyeRef.current.getBoundingClientRect();
    const eyeCenterX = rect.left + rect.width / 2;
    const eyeCenterY = rect.top + rect.height / 2;

    const angle = Math.atan2(mousePosition.y - eyeCenterY, mousePosition.x - eyeCenterX);

    // Calculate max distance based on container size
    const maxDistance = rect.width * 0.25;
    const distance = Math.min(
      maxDistance,
      Math.hypot(mousePosition.x - eyeCenterX, mousePosition.y - eyeCenterY) / 25
    );

    const x = Math.cos(angle) * distance;
    const y = Math.sin(angle) * distance;
    return { x, y };
  };

  const { x, y } = calculatePupilTransform();

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
        className="relative w-full h-full rounded-full flex items-center justify-center overflow-hidden"
        style={{ backgroundColor: containerColor, originY: 0.5 }}
        animate={blinkControls}
        initial={{ scaleY: 1 }}
      >
        {/* The Iris (moving part) */}
        <motion.div
          className="rounded-full flex items-center justify-center"
          style={{ width: irisSize, height: irisSize, backgroundColor: irisColor }}
          animate={{ x, y }}
          transition={{ type: "spring", stiffness: 300, damping: 20, mass: 1 }}
        >
          {/* The Pupil (moves dynamically inside the iris) */}
          <motion.div 
            className="rounded-full" 
            style={{ width: pupilSize, height: pupilSize, backgroundColor: pupilColor }} 
            animate={{ x: x * 0.4, y: y * 0.4 }}
            transition={{ type: "spring", stiffness: 400, damping: 25, mass: 0.5 }}
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

  useEffect(() => {
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
  }, [blinkControls]);

  useEffect(() => {
    const interval = setInterval(() => {
      setPhraseIndex((prev) => (prev + 1) % curiousPhrases.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);

  return (
    <section ref={containerRef} className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-ink-black pt-20 perspective-1000">
      <motion.div
        className="relative z-10 flex flex-col items-center text-center px-4 max-w-5xl mx-auto w-full"
        style={{ y: heroY, opacity: heroOpacity, scale: heroScale }}
      >
        <motion.div
          className="relative w-[85vw] md:w-[60vw] max-w-[800px] aspect-[4/1] mb-12 flex justify-center items-center"
          initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
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
          transition={{ duration: 1.2, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          Posters, logos, campaigns and brand systems built to grab attention instantly.
        </motion.p>

        <motion.div
          className="mt-12 flex flex-col items-center justify-center gap-4 h-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 1.8 }}
        >
          <AnimatePresence mode="wait">
            <motion.p
              key={phraseIndex}
              initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
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
