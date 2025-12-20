/** @type {import('tailwindcss').Config} */
export default {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './data/**/*.{ts,tsx}', './site.config.ts'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Manrope"', 'Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        brand: {
          50: '#eef7ff',
          100: '#ddebff',
          200: '#c2dcff',
          300: '#9cc6ff',
          400: '#76acff',
          500: '#4d8aff',
          600: '#2e6ce6',
          700: '#2355b4',
          800: '#1f468f',
          900: '#1c3c76',
        },
        surface: '#f8fbff',
        ink: '#0c1626',
      },
      boxShadow: {
        soft: '0 20px 60px -25px rgba(12,22,38,0.2)',
        card: '0 15px 50px -30px rgba(12,22,38,0.25)',
      },
      borderRadius: {
        xl: '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        marquee: 'marquee 26s linear infinite',
      },
    },
  },
  plugins: [],
}
