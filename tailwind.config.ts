import type { Config } from "tailwindcss";

const light = "#d8d7ed";
const primary = "#f056c7";
const secondary = "#58e6d9";
const links = "#8b87ea";
const dark = "#141127";
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        body: "Inter, sans-serif",
        heading: "Inconsolata, monospace",
      },
      fontWeight: {
        body: "400",
        heading: "bold",
        bold: "700",
      },
      maxWidth: {
        content: "850px",
        site: "1440px",
      },
      colors: {
        dark: {
          25: "#262539",
          50: "#18162c",
          100: dark,
        },
        light,
        primary,
        secondary,
        links,
        outline: "rgba(255, 255, 255, 0.5)",
      },
      typography: {
        DEFAULT: {
          css: {
            color: light,
            a: {
              color: links,
              "&:hover": {
                color: secondary,
              },
            },
            p: {
              fontSize: "18px",
            },
          },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/forms"), require("@tailwindcss/typography")],
} satisfies Config;
