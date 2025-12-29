/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "#030303",
                surface: "#0a0a0a",
                border: "#1a1a1a",
                primary: {
                    50: '#f5f3ff',
                    100: '#ede9fe',
                    200: '#ddd6fe',
                    300: '#c4b5fd',
                    400: '#a78bfa',
                    500: '#8b5cf6',
                    600: '#7c3aed',
                    700: '#6d28d9',
                    800: '#5b21b6',
                    900: '#4c1d95',
                },
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'mesh': 'radial-gradient(at 0% 0%, rgba(139, 92, 246, 0.1) 0, transparent 50%), radial-gradient(at 100% 100%, rgba(59, 130, 246, 0.1) 0, transparent 50%)',
            }
        },
    },
    plugins: [],
}
