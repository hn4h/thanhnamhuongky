/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    screens: {
      sm: { raw: '(min-width: 999999px)' },
      md: { raw: '(min-width: 999999px)' },
      lg: { raw: '(min-width: 999999px)' },
      xl: { raw: '(min-width: 999999px)' },
      '2xl': { raw: '(min-width: 999999px)' },
    },
    extend: {
      colors: {
        lacquer: '#4A2D1E',
        gold: '#C0965A',
        parchment: '#F7EBDD',
        betel: '#214D35',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
