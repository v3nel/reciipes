/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./app/**/*.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
    presets: [require('nativewind/preset')],
    theme: {
        extend: {
            fontFamily: {
                itim: ['Itim'],
                sora: ['Sora-Regular', 'sans-serif']
            },
            colors: {
                primary: '#244E61',
                secondary: "#9BB5CF",
                background: '#E2E2E2',
                success: '#00FF6A',
                error: '#FF4F6D',
                warning: '#FFB65C',
                secondarytext: 'rgba(0,0,0,0.48)'
            }
        },
    },
    plugins: [],
};
