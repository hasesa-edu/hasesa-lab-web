import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#0f766e",
          dark: "#134e4a",
          light: "#5eead4",
        },
        sun: "#f59e0b",
      },
      fontFamily: {
        sans: ["system-ui", "-apple-system", "Segoe UI", "Roboto", "Noto Sans Ethiopic", "sans-serif"],
      },
    },
  },
  plugins: [],
} satisfies Config;
