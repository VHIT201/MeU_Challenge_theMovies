import plugin from 'tailwindcss/plugin';

/** @type {import('tailwindcss').Config} */
const customClass = plugin(function ({ addUtilities }) {
    addUtilities({
        '.rotate-y-180': {
            transform: 'rotateY(180deg)',
        },
        '.preserve-3d': {
            transformStyle: 'preserve-3d',
        },
        '.perspective': {
            perspective: '1000px',
        },
        '.backface-hidden': {
            backfaceVisibility: 'hidden',
        },
    });
});

export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                'red-main': 'rgb(229, 9, 20)',
                'black-main': '#0f0f0f',
                'white-main': '#f2f2f2',
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
    darkMode: 'selector',
    plugins: [customClass],
};
