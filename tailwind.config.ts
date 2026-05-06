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
        primary: "#0a0a0f",
        secondary: "#111118",
        accent: {
          purple: "#6C63FF",
          cyan: "#00D4FF",
          gold: "#F5A623",
        },
        text: {
          primary: "#FFFFFF",
          secondary: "#A0A0B0",
          muted: "#5A5A6A",
        },
        glass: "rgba(255, 255, 255, 0.04)",
        border: "rgba(255, 255, 255, 0.08)",
      },
      fontFamily: {
        space: ["var(--font-space-grotesk)", "sans-serif"],
        inter: ["var(--font-inter)", "sans-serif"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
