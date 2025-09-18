import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./features/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#E6FFF2", // Muito claro
          100: "#CCFFDF",
          200: "#99FFBF",
          300: "#66FF9F",
          400: "#33FF80",
          500: "#00FF6A",
          600: "#00D959",
          700: "#00B34A",
          800: "#008D3B",
          900: "#00672C",
        },
        secondary: {
          50: "#FFFAE5",
          100: "#FFF3CC",
          200: "#FFE799",
          300: "#FFDB66",
          400: "#FFCF33",
          500: "#FACC15",
          600: "#D4AA12",
          700: "#AE890F",
          800: "#88680C",
          900: "#625609",
        },
        alert: "#EF4444", // Red
        support: "#00BFFF", // Cyan Blue
        theme: {
          gray: {
            50: '#E0E0E0',
            100: '#9CA3AF',
            200: '#374151',
            300: '#2C2C2C',
            400: '#161B22',
            500: '#121212',
            600: '#0D1117',
            700: '#1E1E1E'
        }},
        background: {
          heavy: {
            50: "#3A3D42", // Muito claro
            100: "#323538",
            200: "#2A2D31",
            300: "#222529",
            400: "#1A1D21",
            500: "#121519", // Base heavy
            600: "#0E1114",
            700: "#0B0D10",
            800: "#08090C",
            900: "#050607", // Mais escuro
            950: "#121519",
          },
          medium: {
            50: "#4B4F54", // Muito claro
            100: "#43474C",
            200: "#3B3F44",
            300: "#33373C",
            400: "#2B2F34",
            500: "#23272D", // Base medium
            600: "#1C2024",
            700: "#15191C",
            800: "#0E1215",
            900: "#080A0D", // Mais escuro
            950: "#23272D",
          },
          light: {
            50: "#5C6167", // Muito claro
            100: "#53585F",
            200: "#4A4F56",
            300: "#41464D",
            400: "#383D44",
            500: "#30343C", // Base light
            600: "#282B32",
            700: "#202228",
            800: "#18191F",
            900: "#101116", // Mais escuro
            950: "#30343C",
          },
        },
      },
      fontFamily: {
        sans: ["var(--font-nunito)"],
      },
    },
  },
};
export default config;
export const tailwindColors = config.theme?.extend?.colors || {};
