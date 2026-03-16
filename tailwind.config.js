/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        display: ['Syne', 'sans-serif'],
        body: ['DM Sans', 'system-ui', 'sans-serif'],
      },
      colors: {
        brand: {
          purple: '#7c3aed',
          pink:   '#ec4899',
          orange: '#f97316',
        },
      },
      animation: {
        'fade-up':    'fadeUp 0.6s ease both',
        'scale-in':   'scaleIn 0.4s ease both',
        float:        'float 3s ease-in-out infinite',
        'pulse-ring': 'pulseRing 2s ease-out infinite',
      },
      keyframes: {
        fadeUp:    { from: { opacity:'0', transform:'translateY(28px)' }, to: { opacity:'1', transform:'translateY(0)' } },
        scaleIn:   { from: { opacity:'0', transform:'scale(0.92)' },      to: { opacity:'1', transform:'scale(1)' } },
        float:     { '0%,100%': { transform:'translateY(0)' },            '50%': { transform:'translateY(-8px)' } },
        pulseRing: { '0%': { transform:'scale(1)', opacity:'0.6' },       '70%,100%': { transform:'scale(1.3)', opacity:'0' } },
      },
      opacity: {
        '3': '0.03',
        '4': '0.04',
        '6': '0.06',
        '8': '0.08',
        '12': '0.12',
        '15': '0.15',
      },
    },
  },
  plugins: [],
}
