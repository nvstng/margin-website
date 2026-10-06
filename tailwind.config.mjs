const themed = (name) => `rgb(var(--${name}) / <alpha-value>)`;
const shades = (name, steps) => Object.fromEntries(steps.map((step) => [step, themed(`${name}-${step}`)]));

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: shades('navy', [950, 900, 800, 700, 600, 400, 200]),
        gold: shades('gold', [200, 300, 400, 500, 600]),
        emerald: shades('emerald', [400, 500]),
        amber: shades('amber', [400]),
        red: shades('red', [400]),
        cream: themed('cream'),
        ink: themed('ink'),
        muted: themed('muted'),
        border: themed('border'),
      },
      fontFamily: {
        display: ['Cormorant Garamond', 'Georgia', 'serif'],
        sans: ['Sora', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'dot-grid': 'radial-gradient(circle at 1px 1px, rgb(var(--muted) / 0.18) 1px, transparent 0)',
        'gold-glow': 'radial-gradient(ellipse at center, rgb(var(--gold-400) / 0.12) 0%, transparent 70%)',
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
