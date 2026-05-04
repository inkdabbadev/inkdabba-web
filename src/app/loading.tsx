"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

const loadingWords = ["CUT", "ROLL", "WAIT", "PLAY"];
const loadingLines = [
  "Splicing the next scene",
  "Giving the transition a personality",
  "Keeping the pixels dramatic but employed",
  "Pretending this was always the plan",
];

function SprocketRow() {
  return (
    <div className="flex items-center justify-between gap-2 px-4">
      {Array.from({ length: 16 }).map((_, index) => (
        <span
          key={index}
          className="block h-3 w-5 rounded-[0.35rem] bg-[#efe5d8]"
        />
      ))}
    </div>
  );
}

export default function Loading() {
  const reduce = useReducedMotion();
  const [wordIndex, setWordIndex] = useState(0);
  const [lineIndex, setLineIndex] = useState(0);

  useEffect(() => {
    if (reduce) return;

    const wordTimer = window.setInterval(() => {
      setWordIndex((current) => (current + 1) % loadingWords.length);
    }, 1050);
    const lineTimer = window.setInterval(() => {
      setLineIndex((current) => (current + 1) % loadingLines.length);
    }, 1700);

    return () => {
      window.clearInterval(wordTimer);
      window.clearInterval(lineTimer);
    };
  }, [reduce]);

  const frames = useMemo(
    () => [
      { id: "logo", type: "logo" as const },
      { id: "line", type: "line" as const, text: loadingLines[lineIndex] },
      { id: "word", type: "word" as const, text: loadingWords[wordIndex] },
      { id: "mark", type: "mark" as const },
      { id: "loop", type: "line" as const, text: loadingLines[(lineIndex + 2) % loadingLines.length] },
      { id: "loop-word", type: "word" as const, text: loadingWords[(wordIndex + 2) % loadingWords.length] },
    ],
    [lineIndex, wordIndex],
  );

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#f4eee3] text-ink">
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        animate={
          reduce
            ? undefined
            : {
                background: [
                  "radial-gradient(circle at 18% 20%, rgba(249,102,91,0.16), transparent 22%), radial-gradient(circle at 78% 18%, rgba(255,255,255,0.84), transparent 18%), linear-gradient(180deg, #f7f3eb 0%, #f0e8db 100%)",
                  "radial-gradient(circle at 22% 26%, rgba(249,102,91,0.24), transparent 26%), radial-gradient(circle at 70% 20%, rgba(255,255,255,0.92), transparent 18%), linear-gradient(180deg, #f7f3eb 0%, #ede3d4 100%)",
                  "radial-gradient(circle at 18% 20%, rgba(249,102,91,0.16), transparent 22%), radial-gradient(circle at 78% 18%, rgba(255,255,255,0.84), transparent 18%), linear-gradient(180deg, #f7f3eb 0%, #f0e8db 100%)",
                ],
              }
        }
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="pointer-events-none absolute inset-0 noise opacity-[0.04] mix-blend-multiply" />

      <motion.div
        aria-hidden
        className="pointer-events-none absolute left-[-10rem] top-[-8rem] h-[24rem] w-[24rem] rounded-full bg-[#F9665B]/18 blur-[100px]"
        animate={reduce ? undefined : { x: [0, 34, 0], y: [0, 24, 0] }}
        transition={{ duration: 8.2, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute bottom-[-9rem] right-[-7rem] h-[20rem] w-[20rem] rounded-full bg-black/10 blur-[76px]"
        animate={reduce ? undefined : { x: [0, -26, 0], y: [0, -18, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative z-10 flex min-h-screen items-center justify-center px-4 py-10 md:px-6">
        <div className="w-full max-w-[92rem]">
          <div className="mb-10 flex items-end justify-between gap-6">
            <p className="brand-kicker text-ink/42">Loading</p>
            <div className="overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.p
                  key={loadingLines[lineIndex]}
                  initial={reduce ? undefined : { opacity: 0, y: 14, filter: "blur(8px)" }}
                  animate={reduce ? undefined : { opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={reduce ? undefined : { opacity: 0, y: -14, filter: "blur(8px)" }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.32, 1] }}
                  className="brand-body-copy max-w-[20rem] text-right text-[0.98rem] text-ink/58"
                >
                  {loadingLines[lineIndex]}
                </motion.p>
              </AnimatePresence>
            </div>
          </div>

          <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:items-center">
            <div className="space-y-5">
              <div className="relative w-fit overflow-hidden rounded-[1.4rem] border border-black/8 bg-[#111214] px-4 py-3 text-paper shadow-[0_24px_60px_-32px_rgba(17,18,20,0.34)]">
                <div className="absolute inset-x-0 top-1/2 h-px bg-white/10" />
                <AnimatePresence mode="wait">
                  <motion.div
                    key={loadingWords[wordIndex]}
                    initial={reduce ? undefined : { rotateX: -90, opacity: 0 }}
                    animate={reduce ? undefined : { rotateX: 0, opacity: 1 }}
                    exit={reduce ? undefined : { rotateX: 90, opacity: 0 }}
                    transition={{ duration: 0.46, ease: [0.22, 1, 0.32, 1] }}
                    style={{ transformOrigin: "center center", transformStyle: "preserve-3d" }}
                    className="brand-display-tight text-[clamp(3rem,8vw,6rem)] leading-[0.8]"
                  >
                    {loadingWords[wordIndex]}
                  </motion.div>
                </AnimatePresence>
              </div>

              <h1 className="brand-display text-[clamp(3.4rem,10vw,7rem)] leading-[0.8] text-ink">
                Film
                <span className="block text-[#F9665B]">still</span>
                <span className="block">rolling.</span>
              </h1>
            </div>

            <div className="relative min-h-[24rem] md:min-h-[28rem]">
              <motion.div
                animate={reduce ? undefined : { rotate: [-5, -2, -5] }}
                transition={{ duration: 6.4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute left-1/2 top-1/2 z-10 w-[118%] max-w-[68rem] -translate-x-1/2 -translate-y-1/2"
              >
                <div className="rounded-[2rem] border border-black/14 bg-[#111214] px-4 py-4 shadow-[0_34px_100px_-40px_rgba(17,18,20,0.42)]">
                  <div className="space-y-4">
                    <SprocketRow />

                    <div className="overflow-hidden rounded-[1.2rem] border border-white/8 bg-[#0c0d10] px-3 py-3">
                      <motion.div
                        className="flex min-w-max gap-3"
                        animate={reduce ? undefined : { x: ["0%", "-50%"] }}
                        transition={reduce ? undefined : { duration: 12.5, repeat: Infinity, ease: "linear" }}
                      >
                        {[...frames, ...frames].map((frame, index) => (
                          <div
                            key={`${frame.id}-${index}`}
                            className="relative flex h-[12rem] w-[13rem] shrink-0 items-center justify-center overflow-hidden rounded-[1rem] border border-white/8 bg-[linear-gradient(180deg,#f7f3eb_0%,#efe5d7_100%)] shadow-[inset_0_1px_0_rgba(255,255,255,0.55)]"
                          >
                            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.3),transparent_38%,rgba(8,9,12,0.06)_100%)]" />
                            {frame.type === "logo" ? (
                              <div className="relative h-14 w-[80%]">
                                <Image
                                  src="/logo/inkdabba.svg"
                                  alt="INK DABBA"
                                  fill
                                  sizes="208px"
                                  className="object-contain"
                                  priority
                                  draggable={false}
                                />
                              </div>
                            ) : null}
                            {frame.type === "line" ? (
                              <p className="brand-body-copy relative max-w-[9rem] text-center text-[0.95rem] text-ink/62">
                                {frame.text}
                              </p>
                            ) : null}
                            {frame.type === "word" ? (
                              <p className="brand-display-tight relative text-[3.8rem] leading-[0.84] text-ink">
                                {frame.text}
                              </p>
                            ) : null}
                            {frame.type === "mark" ? (
                              <div className="relative flex items-center gap-2">
                                <span className="h-3 w-3 rounded-full bg-[#F9665B]" />
                                <span className="h-3 w-3 rounded-full bg-black/16" />
                                <span className="h-3 w-3 rounded-full bg-black/10" />
                              </div>
                            ) : null}
                          </div>
                        ))}
                      </motion.div>
                    </div>

                    <SprocketRow />
                  </div>
                </div>
              </motion.div>

              <motion.div
                animate={reduce ? undefined : { y: [0, -12, 0], rotate: [6, 8, 6] }}
                transition={{ duration: 5.2, repeat: Infinity, ease: "easeInOut" }}
                className="absolute right-[10%] top-[12%] z-20 rounded-full border border-black/8 bg-white/72 px-4 py-2 shadow-[0_16px_32px_-24px_rgba(17,18,20,0.18)] backdrop-blur-md"
              >
                <span className="brand-chip text-ink/44">Tiny Drama</span>
              </motion.div>

              <motion.div
                animate={reduce ? undefined : { y: [0, 10, 0], rotate: [-7, -5, -7] }}
                transition={{ duration: 5.8, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-[8%] left-[6%] z-20 rounded-full border border-black/8 bg-white/72 px-4 py-2 shadow-[0_16px_32px_-24px_rgba(17,18,20,0.18)] backdrop-blur-md"
              >
                <span className="brand-chip text-ink/44">Still Worth It</span>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
