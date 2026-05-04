"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useCursor } from "@/context/CursorContext";
import Magnetic from "@/components/motion/Magnetic";
import Image from "next/image";

const navLinks = [
  { name: "Work", href: "#work" },
  { name: "About", href: "#about" },
];

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { setVariant } = useCursor();

  return (
    <>
      <motion.header
        className="fixed bottom-6 md:bottom-10 left-1/2 z-[100] w-max max-w-[90vw]"
        initial={{ x: "-50%", y: 100, opacity: 0 }}
        animate={{ x: "-50%", y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 1.2 }}
      >
        <div className="flex items-center rounded-full border border-white/10 bg-white/5 backdrop-blur-xl shadow-[0_20px_40px_rgba(0,0,0,0.4)] px-4 py-2 md:px-6 md:py-3">
          
          {/* Left Side: Logo */}
          <div className="flex-1 flex justify-start items-center pr-4 md:pr-6 border-r border-white/10">
            <Link href="/" className="relative z-50 flex items-center" onMouseEnter={() => setVariant("ENTER")} onMouseLeave={() => setVariant("default")}>
              <Image src="/logo/favicon.svg" alt="INKDABBA Logo" width={24} height={24} className="opacity-90" />
            </Link>
          </div>

          {/* Center: Nav Links */}
          <nav className="hidden md:flex items-center justify-center gap-8 px-6 md:px-12">
            {navLinks.map((link) => (
              <Magnetic key={link.name} strength={0.15}>
                <Link
                  href={link.href}
                  className="font-body text-[0.65rem] font-bold uppercase tracking-[0.2em] text-warm-white/80 hover:text-warm-white transition-colors duration-300 whitespace-nowrap"
                  onMouseEnter={() => setVariant("ENTER")}
                  onMouseLeave={() => setVariant("default")}
                >
                  {link.name}
                </Link>
              </Magnetic>
            ))}
          </nav>

          {/* Right Side: Button & Mobile Menu */}
          <div className="flex-1 flex justify-end items-center gap-2 pl-4 md:pl-0">
            <Magnetic strength={0.2}>
              <Link
                href="#contact"
                className="relative inline-flex items-center justify-center px-6 py-3 overflow-hidden font-body text-[0.65rem] font-bold uppercase tracking-[0.2em] text-ink-black bg-vermilion rounded-full group whitespace-nowrap"
                onMouseEnter={() => setVariant("ENTER")}
                onMouseLeave={() => setVariant("default")}
              >
                <span className="relative z-10 transition-transform duration-300 group-hover:-translate-y-[150%]">START PROJECT</span>
                <span className="absolute inset-0 flex items-center justify-center translate-y-[150%] transition-transform duration-300 group-hover:translate-y-0 text-warm-white bg-ink-black z-10">
                  START PROJECT
                </span>
              </Link>
            </Magnetic>

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden relative z-50 p-3 rounded-full bg-white/10"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <div className="w-4 flex flex-col gap-1">
                <span className={`block h-[1px] bg-warm-white transition-all duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-[5px]' : ''}`} />
                <span className={`block h-[1px] bg-warm-white transition-all duration-300 ${mobileMenuOpen ? 'opacity-0' : ''}`} />
                <span className={`block h-[1px] bg-warm-white transition-all duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-[5px]' : ''}`} />
              </div>
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-[90] bg-ink-black/95 backdrop-blur-lg flex flex-col justify-center items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <nav className="flex flex-col items-center gap-8 mb-12">
              {[...navLinks, { name: "Contact", href: "#contact" }].map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                >
                  <Link
                    href={link.href}
                    className="font-display text-5xl tracking-tight text-warm-white uppercase"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
