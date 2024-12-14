/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      animation: {
        'carousel-right': 'carousel-right 60s linear infinite',
        'carousel-left': 'carousel-left 60s linear infinite',
      },
      keyframes: {
        'carousel-right': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'carousel-left': {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0)' },
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}

