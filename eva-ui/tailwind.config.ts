import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#eef9ff",
          100: "#d6f0ff",
          500: "#2491ff",
          600: "#0f73d6",
          700: "#0b5aa8"
        }
      }
    }
  },
  plugins: []
} satisfies Config;