import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      backgroundImage: {
        "zikriyon-gradient": "linear-gradient(135deg, #4F46E5 0%, #7C3AED 50%, #06B6D4 100%)",
      },
    },
  },
  plugins: [],
};
export default config;
