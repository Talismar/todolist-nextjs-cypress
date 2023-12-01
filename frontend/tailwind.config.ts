import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        blue: "#4EA8DE",
        blueDark: "#1E6F9F",
        purple: "#8284FA",
        purpleDark: "#5E60CE",
        dangler: "#E25858",
        gray: {
          100: "#F2F2F2",
          200: "#D9D9D9",
          300: "#808080",
          400: "#333333",
          500: "#262626",
          600: "#1A1A1A",
          700: "#0D0D0D",
        },
      },
    },
  },
  plugins: [],
};
export default config;
