/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          950: '#03080F',
          900: '#060E1A',
          800: '#0A1828',
          700: '#0F2240',
          600: '#162E58',
          400: '#2A4A80',
          200: '#5A7AAA',
        },
        gold: {
          200: '#F9E4A8',
          300: '#F5D070',
          400: '#E8B84B',
          500: '#C99A2E',
          600: '#A07820',
        },
        cream: '#F2EBD9',
        ink: '#D8E4F0',
        muted: '#5A7A9E',
        border: '#1A2D4A',
      },
      fontFamily: {
        display: ['Cormorant Garamond', 'Georgia', 'serif'],
        sans: ['Sora', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'dot-grid': 'radial-gradient(circle at 1px 1px, rgba(90,122,158,0.18) 1px, transparent 0)',
        'gold-glow': 'radial-gradient(ellipse at center, rgba(232,184,75,0.12) 0%, transparent 70%)',
      },
      backgroundSize: {
        'dot-md': '28px 28px',
      },
      animation: {
        'fade-up': 'fadeUp 0.7s ease forwards',
        'fade-in': 'fadeIn 0.6s ease forwards',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};
