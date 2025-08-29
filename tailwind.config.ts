import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#0b0f14",      // optional brand color
        soft: "#f7f9fc",
        line: "#e9eef5",
      },
      borderRadius: {
        "2xl": "1.25rem",
      },
      boxShadow: {
        burrito: "0 24px 80px rgba(11,15,20,.08)",
      },
    },
  },
  plugins: [],
};

export default config;
