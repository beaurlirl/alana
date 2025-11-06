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
        'cream': '#FAF8F3',
        'charcoal': '#2C2C2C',
        'accent': '#8B9B8A',
      },
    },
  },
  plugins: [],
}
export default config

