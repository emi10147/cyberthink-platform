/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'inter': ['var(--font-inter)'],
        'orbitron': ['var(--font-orbitron)'],
        'jetbrains-mono': ['var(--font-jetbrains-mono)'],
        'exo2': ['var(--font-exo2)'],
        'rajdhani': ['var(--font-rajdhani)'],
      },
    },
  },
  plugins: [],
}