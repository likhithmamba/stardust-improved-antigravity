/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                primary: "#3b82f6",
                "background-light": "#f1f5f9",
                "background-dark": "#020617",
                orbital: {
                    ring: "rgba(59, 130, 246, 0.2)",
                    active: "rgba(59, 130, 246, 0.4)",
                }
            },
            fontFamily: {
                sans: ["Inter", "sans-serif"],
                serif: ["Cinzel", "serif"],
                mono: ["JetBrains Mono", "monospace"],
            },
            animation: {
                'pulse-slow': 'pulse 8s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'spin-slow': 'spin 120s linear infinite',
            }
        },
    },
    plugins: [],
}
