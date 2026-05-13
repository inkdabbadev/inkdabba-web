"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

const services = [
  {
    title: "VISUALS",
    href: "/visuals",
    subtypes: ["Brand Identity", "Campaign Creatives", "Poster Design", "Banner Systems"],
    description: "Striking visual systems that define your brand and capture attention."
  },
  {
    title: "SPATIAL DESIGN",
    href: "/spatial-design",
    subtypes: ["Exhibition Design", "Store Layouts", "Installation Art", "Pop-up Experiences"],
    description: "Immersive environments that transform physical spaces into brand experiences."
  }
];

export default function ServicesSection() {
  return (
    <section className="relative min-h-screen w-full bg-ink-black text-warm-white py-24 flex flex-col justify-center border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 lg:px-12 w-full">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display text-4xl md:text-6xl lg:text-7xl mb-16 tracking-tighter"
        >
          WHAT WE <span className="text-cmyk-yellow">OFFER.</span>
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {services.map((service, idx) => (
            <Link key={idx} href={service.href} className="group block">
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
                className="h-[500px] border border-white/10 p-8 flex flex-col justify-between hover:bg-white/5 transition-all duration-500 relative overflow-hidden"
              >
                {/* Background Hover Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-cmyk-cyan/0 via-cmyk-magenta/0 to-cmyk-yellow/0 group-hover:from-cmyk-cyan/10 group-hover:via-cmyk-magenta/10 group-hover:to-cmyk-yellow/10 transition-all duration-700 pointer-events-none" />
                
                <div className="z-10 relative">
                  <h3 className="font-display text-4xl lg:text-5xl tracking-tighter mb-4 group-hover:text-cmyk-cyan transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-white/60 font-sans text-lg max-w-sm mb-8">
                    {service.description}
                  </p>
                </div>

                <div className="z-10 relative">
                  <ul className="space-y-3">
                    {service.subtypes.map((subtype, sIdx) => (
                      <li key={sIdx} className="font-sans text-sm uppercase tracking-widest text-white/80 flex items-center gap-3">
                        <span className="w-1.5 h-1.5 bg-cmyk-yellow rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-[0.1s]" />
                        {subtype}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-12 flex items-center gap-2 text-cmyk-magenta opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                    <span className="text-sm font-bold tracking-widest uppercase">Explore</span>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
