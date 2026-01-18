/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                // Design System: MyCash+
                primary: {
                    DEFAULT: '#BDFF00', // Lime oficial
                    dark: '#A3DB00',
                },
                background: '#000000',
                surface: '#121212',
                border: '#2A2A2A',
            },
            screens: {
                'md': '768px',   // Tablet
                'lg': '1280px',  // Desktop
                'xl': '1920px',  // Wide / 4K
            },
            maxWidth: {
                'dashboard': '1400px',
                'wide': '1600px',
            }
        },
    },
    plugins: [],
}
