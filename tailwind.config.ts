import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    borderWidth: {
      DEFAULT: '0.2px',
    },
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2B648D', // corporate blue
          lighter: '#3CADFF',
        },
        secondary: {
          DEFAULT: '#EBC67E', // cream yellow
        },
        tertiary: {
          DEFAULT: '#D9D9D9', // for Background Lines
        },
        error: {
          DEFAULT: '#D82D38',
        },
        success: {
          DEFAULT: '#19867F',
        },
        brand: {
          blue: '#2B648D',
          green: '#19867F', // Celadon green
          turquoise: '#10BEB3',
          orange: '#FE600E', // Calamansi orange
          fuschia: '#CD2DD8',
        },
        neutral: {
          black: '#404040',
          white: '#FAFAFA',
          grey: '#7A7A7A',
        },
        background: {
          primary: '#fafafa', // Off White
          secondary: '#f0f0f0',
          contrast: '#404040', // Off Blacks
          pure: '#ffffff', // Pure White
          transparent: 'rgba(250, 250, 250, 0.9)',
        },
        text: {
          primary: '#404040', // Off Black
          secondary: '#7A7A7A', // Sonic Silver
          contrast: '#fafafa', // White
          lighter: '#D9D9D9',
          link: '#3CADFF',
        },
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
