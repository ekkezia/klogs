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
      padding: {
        line2: "27px",
        "line2-sm": "36px",
        line1: "36px",
        "line1-sm": "48px",
      },
      height: {
        line2: "27px",
        "line2-sm": "36px",
        line1: "36px",
        "line1-sm": "48px",
        "iframe": `calc(27 * 4 * 4)`,
        "iframe-sm": `calc(36 * 4 * 4)`,
      },
      width: {
        line2: "27px",
        "line2-sm": "36px",
        line1: "36px",
        "line1-sm": "48px",
        "content": `calc(100% - (36px * 2))`,
        "content-sm": `calc(100% - (48px * 2))`,
        "iframe": `calc(27 * 6 * 4)`,
        "iframe-sm": `calc(36 * 6 * 4)`,
      },
      colors: {
        primary: {
          DEFAULT: "var(--primary-default)", // corporate blue
        },
        secondary: {
          DEFAULT: "var(--secondary-default)", // cream yellow
        },
        tertiary: {
          DEFAULT: "var(--tertiary-default)", // cream yellow
        },
        text: {
          primary: "var(--text-primary)", // Off Black
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
          fontSize: "32px",
          fontWeight: "400",
          lineHeight: "48px",
          color: "var(--text-primary)",
          "@media (max-width: 640px)": {
            fontSize: "24px",
            lineHeight: "36px",
          },
        },

        ".body2": {
          fontFamily: "var(--font-monoton)",
          fontSize: "24px",
          fontWeight: "400",
          lineHeight: "36px", // must be the same as notes' line height
          color: "var(--text-primary)",
          "@media (max-width: 640px)": {
            fontSize: "18px",
            lineHeight: "27px",
          },
        },

        ".body3": {
          fontFamily: "var(--font-monoton)",
          fontSize: "16px",
          fontWeight: "400",
          color: "var(--text-primary)",
          "@media (max-width: 640px)": {
            fontSize: "14px",
          },
        },

        ".body4": {
          fontFamily: "var(--font-monoton)",
          fontSize: "12px",
          fontWeight: "400",
          color: "var(--text-primary)",
          "@media (max-width: 640px)": {
            fontSize: "10px",
          },
        },

        ".h1": {
          fontFamily: "var(--font-bricolage-grotesque)",
          fontSize: "12rem",
          fontWeight: "700",
        },

        ".h2": {
          fontFamily: "var(--font-bricolage-grotesque)",
          fontSize: "36px",
          fontWeight: "700",
        },

        ".h3": {
          fontFamily: "var(--font-bricolage-grotesque)",
          fontSize: "28px",
          fontWeight: "700",
        },

        ".h4": {
          fontFamily: "var(--font-bricolage-grotesque)",
          fontSize: "24px",
          fontWeight: "700",
          lineHeight: "36px",
        },
      })
    }),
  ],
}
export default config
