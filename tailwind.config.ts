import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        theme: ({ opacityValue }: { opacityValue?: string }) =>
          opacityValue !== undefined
            ? `rgba(var(--color-theme-rgb), ${opacityValue})`
            : `rgb(var(--color-theme-rgb))`,
        'theme-dark': ({ opacityValue }: { opacityValue?: string }) =>
          opacityValue !== undefined
            ? `rgba(var(--color-theme-dark-rgb), ${opacityValue})`
            : `rgb(var(--color-theme-dark-rgb))`,
        night: '#0b0b0b',
        metal: '#141414',
        'grey-dark': '#1e1e1e',
        'grey-dark-200': '#282828',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        'glow': '0 0 20px rgba(var(--color-theme-rgb), 0.25)',
        'glow-sm': '0 0 10px rgba(var(--color-theme-rgb), 0.2)',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease forwards',
        'slide-up': 'slideUp 0.6s ease forwards',
        'spin-slow': 'spin 8s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}

export default config
