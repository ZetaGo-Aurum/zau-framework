import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        zau: {
          gold: '#f59e0b',
          'gold-light': '#fbbf24',
          'gold-dark': '#d97706',
          obsidian: '#09090b',
          surface: '#121316',
          card: '#18191e',
          border: 'rgba(245, 158, 11, 0.18)',
        },
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'gold-glow': '0 0 25px rgba(245, 158, 11, 0.25)',
        'gold-glow-lg': '0 0 50px rgba(245, 158, 11, 0.35)',
      },
    },
  },
  plugins: [],
}
export default config
