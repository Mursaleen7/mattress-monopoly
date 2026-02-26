/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          bg: '#0e100f',
          text: '#fffce4'
        },
        accent: {
          purple: '#a374ff',
          yellow: '#ffd074',
          teal: '#16f0d1',
          green: '#10B981'
        }
      },
      fontFamily: {
        'sans': ['Satoshi', 'Inter', 'system-ui', 'sans-serif'],
        'heading': ['General Sans', 'Poppins', 'system-ui', 'sans-serif']
      },
      animation: {
        'marquee': 'marquee 25s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'pulse-green': 'pulse-green 2s ease-in-out infinite'
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' }
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' }
        },
        'pulse-green': {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.5 }
        }
      }
    },
  },
  plugins: [],
} 