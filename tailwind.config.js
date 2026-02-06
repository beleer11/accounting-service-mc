/** @type {import('tailwindcss').Config} */
export default {
    darkMode: "class",
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                "primary": "#1e40af",
                "secondary": "#10b981",
                "accent": "#3b82f6",
                "accent-green": "#34d399",

                "background-light": "#f9fafb",
                "background-dark": "#111827",

                "text-primary": "#1f2937",
                "text-secondary": "#4b5563",
            },
            fontFamily: {
                "display": ["Poppins", "sans-serif"],
                "body": ["Inter", "sans-serif"],
                "serif": ["Merriweather", "serif"],
            },
            animation: {
                'gradient': 'gradient 3s ease infinite',
                'float': 'float 6s ease-in-out infinite',
            },
            keyframes: {
                gradient: {
                    '0%, 100%': { backgroundPosition: '0% 50%' },
                    '50%': { backgroundPosition: '100% 50%' },
                },
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-10px)' },
                },
            },
        },
    },
    plugins: [],
}