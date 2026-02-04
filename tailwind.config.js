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
                // Colores corporativos MC
                "primary": "#1e40af",       // Azul principal
                "secondary": "#10b981",     // Verde contable
                "accent": "#3b82f6",        // Azul claro
                "accent-green": "#34d399",  // Verde claro

                // Fondos
                "background-light": "#f9fafb",
                "background-dark": "#111827",

                // Textos
                "text-primary": "#1f2937",
                "text-secondary": "#4b5563",
            },
            fontFamily: {
                "display": ["Poppins", "sans-serif"],
                "body": ["Inter", "sans-serif"],
                "serif": ["Merriweather", "serif"], // Para títulos formales
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