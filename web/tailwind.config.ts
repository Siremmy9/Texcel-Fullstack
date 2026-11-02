import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        wine: {
          DEFAULT: "#0B2545",
          deep: "#081A30",
          soft: "#E8EEF6",
        },
        gold: {
          DEFAULT: "#1788d4",
          deep: "#8a6808",
        },
        ink: "#26181e",
        muted: "#5f5158",
        line: "#e8dfe3",
        tint: "#f7f2f4",
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
        card: "0 1px 2px rgba(60,10,25,.06), 0 18px 40px -18px rgba(60,10,25,.28)",
      },
    },
  },
  plugins: [],
};

export default config;
