import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'migra': ['Migra', 'serif'],
        'sans': ['var(--font-sans)', 'Inter', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
      colors: {
        'cream': '#FAFBF9',
        'cream-dark': '#F0F2EE',
        'charcoal': '#2C2C2C',
        'charcoal-light': '#4A4A4A',
        'accent': '#9DB4A0',
        'accent-light': '#C2D4C5',
        'accent-dark': '#7A9A7E',
        'gold': '#C4A962',
        'rose': '#C49B9B',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s var(--ease-prestige) forwards',
        'fade-in-up': 'fadeInUp 0.6s var(--ease-prestige) forwards',
        'fade-in-down': 'fadeInDown 0.5s var(--ease-prestige) forwards',
        'slide-in-left': 'slideInLeft 0.5s var(--ease-prestige) forwards',
        'slide-in-right': 'slideInRight 0.5s var(--ease-prestige) forwards',
        'scale-in': 'scaleIn 0.4s var(--ease-prestige) forwards',
        'float': 'float 6s ease-in-out infinite',
        'pulse-soft': 'pulseSoft 3s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'gradient-shift': 'gradientShift 8s ease-in-out infinite',
        'text-reveal': 'textReveal 0.8s var(--ease-prestige) forwards',
        'line-grow': 'lineGrow 0.8s var(--ease-prestige) forwards',
        'bounce-subtle': 'bounceSubtle 2s ease-in-out infinite',
        'spin-slow': 'spin 20s linear infinite',
        'marquee': 'marquee 25s linear infinite',
        // Staggered fadeIn animations
        'stagger-1': 'fadeInUp 0.6s var(--ease-prestige) 0.1s forwards',
        'stagger-2': 'fadeInUp 0.6s var(--ease-prestige) 0.2s forwards',
        'stagger-3': 'fadeInUp 0.6s var(--ease-prestige) 0.3s forwards',
        'stagger-4': 'fadeInUp 0.6s var(--ease-prestige) 0.4s forwards',
        'stagger-5': 'fadeInUp 0.6s var(--ease-prestige) 0.5s forwards',
        'stagger-6': 'fadeInUp 0.6s var(--ease-prestige) 0.6s forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInDown: {
          '0%': { opacity: '0', transform: 'translateY(-20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.98)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        gradientShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        textReveal: {
          '0%': { opacity: '0', transform: 'translateY(100%)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        lineGrow: {
          '0%': { transform: 'scaleX(0)' },
          '100%': { transform: 'scaleX(1)' },
        },
        bounceSubtle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      transitionTimingFunction: {
        'prestige': 'cubic-bezier(0.4, 0, 0.2, 1)',
        'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'out-quint': 'cubic-bezier(0.22, 1, 0.36, 1)',
        'in-out-circ': 'cubic-bezier(0.85, 0, 0.15, 1)',
      },
      transitionDuration: {
        '400': '400ms',
        '600': '600ms',
        '800': '800ms',
        '1000': '1000ms',
      },
      backdropBlur: {
        'xs': '2px',
      },
      boxShadow: {
        'glow': '0 0 40px -10px rgba(157, 180, 160, 0.35)',
        'glow-lg': '0 0 60px -10px rgba(157, 180, 160, 0.45)',
        'inner-glow': 'inset 0 0 30px rgba(157, 180, 160, 0.12)',
        'elegant': '0 4px 30px rgba(0, 0, 0, 0.08)',
        'elegant-lg': '0 10px 60px rgba(0, 0, 0, 0.12)',
      },
      scale: {
        '102': '1.02',
      },
    },
  },
  plugins: [],
}
export default config
