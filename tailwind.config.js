/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        kanit: ['Kanit', 'system-ui', 'sans-serif'],
      },
      colors: {
        ink: '#0C0C0C',
        paper: '#FFFFFF',
        soft: '#B0B0B0',
        muted: '#777777',
      },
      borderColor: {
        line: 'rgba(255, 255, 255, 0.15)',
      },
      screens: {
        '3xl': '1920px',
      },
    },
  },
  plugins: [],
}
