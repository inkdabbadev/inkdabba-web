import type { Config } from "tailwindcss";

/**
 * Ink Dabba — design tokens
 * Poster-first creative studio. Editorial, cinematic, restrained.
 */
const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "ink-black": "#0B0A09",
        "warm-paper": "#F2E8D8",
        "warm-white": "#FFF4E6",
        "pure-black": "#11100E",
        vermilion: "#FF4D1D",
        acid: "#C7FF3D",
        "hot-pink": "#FF2DAA",

        // Existing tokens
        paper: "#F2EFE7",
        "paper-soft": "#F7F3EB",
        ink: "#0E0E0C",
        bone: "#E9E4D6",
        mute: "#8A867A",
        rule: "#1C1B17",
        ember: "#E25A27",
        coal: "#08090C",
        porcelain: "#F2EBDF",
        sand: "#D2C4B4",
        sun: "#F2C94C",
        signal: "#F59E67",

        // Preserved legacy tokens so the rest of the app does not break mid-migration
        ss: {
          orange: "#E25A27",
          cream:  "#F2EFE7",
          light:  "#E9E4D6",
          pink:   "#E25A27",
          black:  "#0E0E0C",
          white:  "#FFFFFF",
          gray:   "#8A867A",
          border: "#1C1B17",
        },
      },
      fontFamily: {
        sans: ["var(--font-fredoka)", "system-ui", "sans-serif"],
        display: ["var(--font-fredoka)", "Arial Narrow", "sans-serif"],
        body: ["var(--font-fredoka)", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        label:  "0.22em",
        micro:  "0.32em",
        tight2: "-0.03em",
        tight3: "-0.045em",
      },
      fontSize: {
        "display-xs": ["2.25rem", { lineHeight: "0.95" }],
        "display-sm": ["3rem",    { lineHeight: "0.95" }],
        "display-md": ["4.5rem",  { lineHeight: "0.92" }],
        "display-lg": ["6.5rem",  { lineHeight: "0.88" }],
        "display-xl": ["9rem",    { lineHeight: "0.85" }],
      },
      animation: {
        marquee:        "marquee 60s linear infinite",
        "marquee-slow": "marquee 120s linear infinite",
        grain:          "grain 6s steps(5) infinite",
      },
      keyframes: {
        marquee: {
          "0%":   { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        grain: {
          "0%,100%": { transform: "translate(0,0)" },
          "20%":     { transform: "translate(-2%,1%)" },
          "40%":     { transform: "translate(1%,-1%)" },
          "60%":     { transform: "translate(-1%,2%)" },
          "80%":     { transform: "translate(2%,-2%)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
