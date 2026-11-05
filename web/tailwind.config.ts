import type { Config } from "tailwindcss";

const config: Config = {
  content: {
    relative: true,
    files: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  },
  theme: {
    extend: {
      colors: {
        wine: {
          DEFAULT: "#121F3E",
          deep: "#121F3E",
          soft: "#E8EDF5",
        },
        gold: {
          DEFAULT: "#F4C430",
          deep: "#8a6808",
        },
        ink: "#121F3E",
        muted: "#5f6470",
        line: "#dce2ed",
        tint: "#f4f6fa",
        forest: "#1e6b3f",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "Georgia", "serif"],
      },
      maxWidth: {
        site: "1180px",
      },
      boxShadow: {
        card: "0 1px 2px rgba(18,31,62,.06), 0 18px 40px -18px rgba(18,31,62,.2)",
      },
    },
  },
  plugins: [],
};

export default config;
