/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            screens: {
                'md': '768px',   // Tablet
                'lg': '1280px',  // Desktop
                'xl': '1920px',  // Wide / 4K
            },
            colors: {
                // Primitivas
                gray: {
                    50: '#F9FAFB',
                    100: '#F3F4F6',
                    200: '#E5E7EB',
                    300: '#D1D5DB',
                    400: '#9CA3AF',
                    500: '#6B7280',
                    600: '#4B5563',
                    700: '#374151',
                    800: '#1F2937',
                    900: '#111827',
                },
                lime: {
                    400: '#A3E635',
                    500: '#84CC16',
                    600: '#65A30D',
                },
                // Semânticas
                primary: '#84CC16', // lime-500
                'bg-default': '#F5F6F8',
                'surface-default': '#FFFFFF',
                'text-primary': '#1F2937',
                'text-secondary': '#6B7280',
                'border-default': '#E5E7EB',
            },
            spacing: {
                'container': '32px',
            },
        },
    },
    plugins: [],
}
