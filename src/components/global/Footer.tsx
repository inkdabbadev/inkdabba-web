"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Button from "@/components/ui/Button";

const quickLinks = ["Work", "About", "Contact"];
const socialLinks = ["Instagram", "Twitter", "Behance", "LinkedIn"];

export default function Footer() {
  return (
    <footer className="relative bg-ink-black pt-24 pb-12 overflow-hidden border-t border-warm-white/10">

      <div className="relative z-10 max-w-[92%] mx-auto">
        {/* Headline removed as it's redundant with ContactSection */}

        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 border-t border-warm-white/20 pt-12">

          {/* Studio Info */}
          <div className="md:col-span-2">
            <Link href="/" className="block mb-6 w-48">
              <img src="/logo/inkdabba-white-pre.svg" alt="INKDABBA Logo" className="h-10 w-auto object-contain" />
            </Link>
            <p className="font-body text-warm-paper/60 text-sm max-w-sm">
              Chennai-based visual studio specializing in posters, branding, and campaigns that make noise.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-body text-xs font-bold tracking-[0.2em] uppercase text-warm-paper/40 mb-6">Explore</h4>
            <ul className="flex flex-col gap-3">
              {quickLinks.map(link => (
                <li key={link}>
                  <Link href={`#${link.toLowerCase()}`} className="font-body text-warm-white hover:text-vermilion transition-colors uppercase text-sm tracking-wider">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Socials */}
          <div>
            <h4 className="font-body text-xs font-bold tracking-[0.2em] uppercase text-warm-paper/40 mb-6">Connect</h4>
            <ul className="flex flex-col gap-3">
              {socialLinks.map(link => (
                <li key={link}>
                  <a href="#" className="font-body text-warm-white hover:text-vermilion transition-colors uppercase text-sm tracking-wider">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

        </div>

        <div className="mt-24 flex flex-col md:flex-row items-center justify-between pt-8 border-t border-warm-white/10">
          <p className="font-body text-xs text-warm-paper/40 uppercase tracking-widest">
            &copy; {new Date().getFullYear()} INKDABBA STUDIO. ALL RIGHTS RESERVED.
          </p>
          <div className="flex items-center gap-4 mt-4 md:mt-0">
            <span className="font-body text-[0.65rem] font-bold tracking-[0.3em] text-warm-paper/80 uppercase">CHENNAI VISUAL STUDIO</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
