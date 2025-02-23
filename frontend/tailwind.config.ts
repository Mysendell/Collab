import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        violet: "var(--violet-jtc)",
        detail: "var(--detail)",
        palePurple: "var(--pale-purple)",
      },
    },
  },
  plugins: [],
} satisfies Config;
