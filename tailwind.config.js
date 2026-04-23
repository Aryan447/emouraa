/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Bodoni Moda"', 'serif'],
        sans: ['"Jost"', 'sans-serif'],
      },
      colors: {
        black: '#000000',
        offwhite: '#f5f5f5',
        accent: '#ff3333',
      },
      height: {
        'screen-90': '90vh',
      },
    },
  },
  plugins: [],
}