import type { Config } from "tailwindcss"
const plugin = require("tailwindcss/plugin")

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    borderWidth: {
      DEFAULT: "0.2px",
    },
    extend: {
      colors: {
        primary: {
          DEFAULT: "#CD2DD8", // corporate blue
          lighter: "#3CADFF",
        },
        secondary: {
          DEFAULT: "#000000", // cream yellow
        },
        tertiary: {
          DEFAULT: "#D9D9D9", // for Background Lines
        },
        error: {
          DEFAULT: "#D82D38",
        },
        success: {
          DEFAULT: "#19867F",
        },
        neutral: {
          black: "#404040",
          white: "#FAFAFA",
          grey: "#7A7A7A",
        },
        background: {
          primary: "#fafafa", // Off White
          secondary: "#f0f0f0",
          contrast: "#404040", // Off Blacks
          pure: "#ffffff", // Pure White
          transparent: "rgba(250, 250, 250, 0.9)",
        },
        text: {
          primary: "#404040", // Off Black
          secondary: "#7A7A7A", // Sonic Silver
          contrast: "#fafafa", // White
          lighter: "#D9D9D9",
          link: "#3CADFF",
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [
    plugin(function ({ addComponents }) {
      addComponents({
        ".body1": {
          fontFamily: "var(--font-monoton)",
          fontSize: '32px',
          fontWeight: '400',
          lineHeight: '48px'
        },

        ".body2": {
          fontFamily: "var(--font-monoton)",
          fontSize: '24px',
          fontWeight: '400',
          lineHeight: '36px',
        },

        ".body3": {
          fontFamily: "var(--font-monoton)",
          fontSize: '16px',
          fontWeight: '400',
        },

        ".body4": {
          fontFamily: "var(--font-monoton)",
          fontSize: '12px',
          fontWeight: '400',
        },

        ".h1": {
          fontFamily: "var(--font-bricolage-grotesque)",
          fontSize: '12rem',
          fontWeight: '700',
        },

        ".h2": {
          fontFamily: "var(--font-bricolage-grotesque)",
          fontSize: '36px',
          fontWeight: '700',
        },

        ".h3": {
          fontFamily: "var(--font-bricolage-grotesque)",
          fontSize: '28px',
          fontWeight: '700',
        },

        ".h4": {
          fontFamily: "var(--font-bricolage-grotesque)",
          fontSize: '24px',
          fontWeight: '700',
          lineHeight: '36px',
        },
      })
    }),
  ],
}
export default config
