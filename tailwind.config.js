/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                'red-main': 'rgb(229, 9, 20)',
            },
            keyframes: {
                fallDown: {
                    '0%': { transform: 'translateY(-100px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                },
                scaleUp: {
                    '0%': { transform: 'scale(0.5)', opacity: '0' },
                    '100%': { transform: 'scale(1)', opacity: '1' },
                },
            },
            animation: {
                fallDown: 'fallDown 0.7s ease-out forwards',
                scaleUp: 'scaleUp 0.7s ease-out forwards', // Thêm animation scale-up
            },
        },
    },
    plugins: [],
};
