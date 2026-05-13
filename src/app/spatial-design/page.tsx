import React from 'react';
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Spatial Design | INK DABBA",
  description: "Immersive environments that transform physical spaces into brand experiences.",
  path: "/spatial-design",
});

export default function SpatialDesignPage() {
  return (
    <main className="min-h-screen bg-ink-black text-warm-white flex flex-col items-center justify-center pt-24 px-4">
      <h1 className="font-display text-5xl md:text-7xl tracking-tighter mb-6 text-center uppercase">Spatial Design.</h1>
      <p className="text-white/60 font-sans text-xl md:text-2xl max-w-2xl text-center">
        This section is being curated. Stay tuned for our spatial design portfolio.
      </p>
    </main>
  );
}
