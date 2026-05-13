"use client";

import React, { ReactNode } from "react";
import Magnetic from "@/components/motion/Magnetic";

interface ButtonProps {
  children: ReactNode;
  href?: string;
  variant?: "dark" | "light" | "accent";
  onClick?: () => void;
  className?: string;
}

export default function Button({ children, href, variant = "dark", onClick, className = "" }: ButtonProps) {
  const baseClasses = "relative inline-flex items-center justify-center px-8 py-4 overflow-hidden font-body text-xs font-bold uppercase tracking-widest rounded-full group transition-colors duration-300";
  
  const variants = {
    dark: "text-warm-white bg-ink-black border border-white/10 hover:border-transparent",
    light: "text-ink-black bg-warm-white border border-black/10 hover:border-transparent",
    accent: "text-cmyk-key bg-cmyk-yellow border border-cmyk-yellow hover:border-transparent",
  };

  const hoverFills = {
    dark: "bg-warm-white",
    light: "bg-cmyk-cyan",
    accent: "bg-cmyk-magenta",
  };

  const textHoverColors = {
    dark: "group-hover:text-ink-black",
    light: "group-hover:text-warm-white",
    accent: "group-hover:text-warm-white",
  };

  const content = (
    <>
      <span className={`absolute inset-0 translate-y-[120%] transition-transform duration-500 ease-out group-hover:translate-y-0 ${hoverFills[variant]} rounded-full`} />
      <span className={`relative z-10 flex items-center gap-3 transition-transform duration-300 group-hover:-translate-y-0.5 ${textHoverColors[variant]}`}>
        {children}
        <span className="relative flex items-center justify-center overflow-hidden w-4 h-4 transition-transform duration-300 group-hover:rotate-[-45deg]">
          <span className="block transition-transform duration-300 group-hover:translate-x-4 group-hover:opacity-0">&rarr;</span>
          <span className="absolute -translate-x-4 opacity-0 transition-transform duration-300 group-hover:translate-x-0 group-hover:opacity-100">&rarr;</span>
        </span>
      </span>
    </>
  );

  const buttonClasses = `${baseClasses} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <Magnetic strength={0.3}>
        <a href={href} className={buttonClasses} onClick={onClick}>
          {content}
        </a>
      </Magnetic>
    );
  }

  return (
    <Magnetic strength={0.3}>
      <button className={buttonClasses} onClick={onClick}>
        {content}
      </button>
    </Magnetic>
  );
}
