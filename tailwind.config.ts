import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "#0a0c10",
                foreground: "#f0f2f5",
                primary: {
                    500: "#3d7e9a",
                    600: "#2d637c",
                },
                card: "#12151c",
            },
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "gradient-cinematic": "linear-gradient(to top, rgba(10, 12, 16, 1) 0%, rgba(10, 12, 16, 0.4) 50%, rgba(10, 12, 16, 0.1) 100%)",
            },
            fontFamily: {
                sans: ['var(--font-inter)'],
                serif: ['var(--font-playfair)'],
            }
        },
    },
    plugins: [],
};
export default config;
