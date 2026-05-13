"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { useCursor } from "@/context/CursorContext";
import Button from "@/components/ui/Button";
import Image from "next/image";

const selectedProjects = [
  {
    id: "01",
    title: "NEO CHENNAI",
    line: "A CYBERPUNK REIMAGINING OF THE CITY",
    type: "CAMPAIGN",
    year: "2024",
    deliverables: "POSTERS, MOTION, BRANDING",
    mood: "AGGRESSIVE, NEON, DARK",
    src: "/image/poster/Poster (100).jpeg"
  },
  {
    id: "02",
    title: "AGNI SPICES",
    line: "REBRANDING TRADITION WITH FIRE",
    type: "BRAND IDENTITY",
    year: "2023",
    deliverables: "PACKAGING, LOGO, TYPOGRAPHY",
    mood: "WARM, TRADITIONAL, BOLD",
    src: "/image/label/Agni Masala Branding-12.jpg"
  },
  {
    id: "03",
    title: "SOUND SCAPE",
    line: "VISUALIZING NOISE",
    type: "EVENT",
    year: "2023",
    deliverables: "STAGE DESIGN, POSTERS",
    mood: "LOUD, CHAOTIC, VIBRANT",
    src: "/image/poster/Poster (111).jpeg"
  }
];

export default function SelectedWorkSection() {
  const containerRef = useRef<HTMLElement>(null);
  const { setVariant } = useCursor();
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <section ref={containerRef} className="relative bg-ink-black text-warm-paper pb-32">
      {selectedProjects.map((project, index) => {
        const targetScale = 1 - ((selectedProjects.length - index) * 0.05);
        return (
          <ProjectCard 
            key={project.id} 
            i={index} 
            project={project} 
            progress={scrollYProgress} 
            range={[index * 0.33, 1]} 
            targetScale={targetScale}
            setVariant={setVariant}
          />
        );
      })}
    </section>
  );
}

function ProjectCard({ i, project, progress, range, targetScale, setVariant }: any) {
  const containerRef = useRef<HTMLDivElement>(null);
  const scale = useTransform(progress, range, [1, targetScale]);
  
  // Advanced Internal Image Parallax
  const imageY = useTransform(progress, [0, 1], ["0%", "30%"]);
  
  // 3D Tilt Physics
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothX = useSpring(mouseX, { damping: 30, stiffness: 300 });
  const smoothY = useSpring(mouseY, { damping: 30, stiffness: 300 });

  const rotateX = useTransform(smoothY, [-0.5, 0.5], [5, -5]);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-5, 5]);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const x = (e.clientX - rect.left) / width - 0.5;
    const y = (e.clientY - rect.top) / height - 0.5;
    
    mouseX.set(x);
    mouseY.set(y);
  }

  function handleMouseLeave() {
    mouseX.set(0);
    mouseY.set(0);
  }
  
  return (
    <div className="h-screen flex items-center justify-center sticky top-0 pt-24 pb-12 perspective-[2000px]">
      <motion.div 
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ scale, top: `${i * 35}px`, rotateX, rotateY }} 
        className="relative flex flex-col md:flex-row w-[95%] md:w-[90vw] h-[80vh] max-h-[900px] bg-warm-paper text-ink-black overflow-hidden origin-top shadow-[0_30px_80px_rgba(0,0,0,0.8)] border border-white/10 rounded-xl"
      >
        <div className="w-full md:w-[45%] p-10 md:p-16 flex flex-col justify-between z-10 bg-warm-paper/95 backdrop-blur-3xl relative">
          
          <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
             <span className="font-display text-[12rem] leading-none">{project.id}</span>
          </div>

          <div className="relative z-10">
            <h2 className="font-display text-5xl md:text-7xl lg:text-[7rem] mt-4 leading-[0.85] tracking-tighter mix-blend-difference text-white">{project.title}</h2>
            <p className="font-body text-xl md:text-2xl font-bold mt-8 tracking-wide text-ink-black/80 leading-snug">{project.line}</p>
          </div>
          
          <div className="mt-12 flex flex-col gap-8 relative z-10">
            <div className="grid grid-cols-2 gap-y-8 gap-x-4 border-t-2 border-ink-black/20 pt-8">
              <div>
                <span className="font-body text-[0.6rem] font-bold tracking-[0.3em] uppercase text-cmyk-cyan mb-2 block">Type</span>
                <p className="font-body text-sm font-bold uppercase">{project.type}</p>
              </div>
              <div>
                <span className="font-body text-[0.6rem] font-bold tracking-[0.3em] uppercase text-cmyk-cyan mb-2 block">Year</span>
                <p className="font-body text-sm font-bold uppercase">{project.year}</p>
              </div>
              <div className="col-span-2">
                <span className="font-body text-[0.6rem] font-bold tracking-[0.3em] uppercase text-cmyk-cyan mb-2 block">Deliverables</span>
                <p className="font-body text-sm font-bold uppercase">{project.deliverables}</p>
              </div>
            </div>
            
            <div className="pt-8">
              <Button variant="dark">OPEN CASE STUDY</Button>
            </div>
          </div>
        </div>
        
        <div 
          className="w-full md:w-[55%] h-full relative overflow-hidden bg-ink-black"
          onMouseEnter={() => setVariant("VIEW")}
          onMouseLeave={() => setVariant("default")}
        >
          {/* Parallax Container with deep blur scale effect */}
          <motion.div className="absolute inset-0 h-[140%] w-full origin-bottom" style={{ y: imageY }}>
            <Image 
              src={project.src} 
              alt={project.title} 
              fill 
              className="object-cover transition-all duration-[1.5s] ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-125 hover:brightness-110" 
            />
          </motion.div>
          <div className="absolute inset-0 bg-ink-black/10 pointer-events-none mix-blend-overlay" />
        </div>
      </motion.div>
    </div>
  );
}
