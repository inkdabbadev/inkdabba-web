import React from 'react';
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Visuals | INK DABBA",
  description: "Striking visual systems that define your brand and capture attention.",
  path: "/visuals",
});

export default function VisualsPage() {
  return (
    <main className="min-h-screen bg-ink-black text-warm-white flex flex-col items-center justify-center pt-24 px-4">
      <h1 className="font-display text-6xl md:text-8xl tracking-tighter mb-6 text-center">VISUALS.</h1>
      <p className="text-white/60 font-sans text-xl md:text-2xl max-w-2xl text-center">
        This section is being curated. Stay tuned for our visual portfolio.
      </p>
    </main>
  );
}
