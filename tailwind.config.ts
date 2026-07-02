import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "var(--bg-primary)",
        secondary: "var(--bg-secondary)",
        sulu: {
          DEFAULT: "#9FE870",
          50: "#f5fdf0",
          100: "#e7fad9",
          200: "#d0f5b6",
          300: "#aee987",
          400: "#9FE870",
          500: "#6dc933",
          600: "#52a322",
          700: "#3f7c1d",
          800: "#35621c",
          900: "#2d521a",
        },
        deepfir: {
          DEFAULT: "#163300",
          50: "#edfce0",
          100: "#d6f7b3",
          200: "#bcef82",
          300: "#a2e551",
          400: "#8dd82c",
          500: "#70bc10",
          600: "#559409",
          700: "#406e0a",
          800: "#34570d",
          900: "#163300",
        },
        accent: {
          primary: "#9FE870",
          secondary: "#163300",
        },
        text: {
          primary: "var(--text-primary)",
          secondary: "var(--text-secondary)",
          muted: "var(--text-muted)",
        },
        glass: "var(--bg-card)",
        border: "var(--border)",
      },
      fontFamily: {
        space: ["var(--font-space-grotesk)", "sans-serif"],
        inter: ["var(--font-inter)", "sans-serif"],
      },
      animation: {
        "float-slow": "float 8s ease-in-out infinite",
        "float-medium": "float 6s ease-in-out infinite",
        "float-fast": "float 4s ease-in-out infinite",
        "pulse-glow": "pulseGlow 3s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "50%": { transform: "translateY(-15px) rotate(3deg)" },
        },
        pulseGlow: {
          "0%, 100%": { opacity: "0.5", transform: "scale(1)" },
          "50%": { opacity: "0.8", transform: "scale(1.05)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
