import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg:       "#0A0A0A",
        "bg-2":   "#0F0F0F",
        blue:     "#00F0FF",
        purple:   "#7B2FF7",
        orange:   "#FF6B35",
        red:      "#FF2D55",
        white:    "#EAEAEA",
        muted:    "#888888",
        surface:  "rgba(255,255,255,0.04)",
      },
      fontFamily: {
        display: ["Space Grotesk", "sans-serif"],
        body:    ["Inter", "sans-serif"],
      },
      fontSize: {
        "display-xl": ["clamp(3.5rem, 10vw, 8.5rem)", { lineHeight: "1", letterSpacing: "-0.03em" }],
        "display-lg": ["clamp(2.5rem, 6vw, 5.25rem)", { lineHeight: "1.05", letterSpacing: "-0.025em" }],
        "display-md": ["clamp(1.5rem, 3vw, 2rem)",    { lineHeight: "1.2",  letterSpacing: "-0.02em"  }],
      },
      animation: {
        "float":        "float 6s ease-in-out infinite",
        "pulse-glow":   "pulse-glow 2s ease-in-out infinite",
        "spin-slow":    "spin-slow 20s linear infinite",
        "gradient":     "gradient-shift 4s ease infinite",
        "shimmer":      "shimmer 2s infinite",
      },
      backdropBlur: {
        xs: "2px",
      },
      screens: {
        xs: "375px",
      },
    },
  },
  plugins: [],
};

export default config;
