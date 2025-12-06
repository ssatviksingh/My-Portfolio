/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // IMPORTANT for toggle-based dark mode
  content: [
    './index.html',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Base theme
        'bg-light': '#0B1020',
        'bg-dark': '#020617',
        'accent-gold': '#f4b41a',
        'accent-orange': '#fb923c',

        // Deep blues & muted greens
        'deep-blue': '#0f172a',
        'deep-blue-soft': '#111827',
        'muted-green': '#16a085',

        // Text colors
        'text-main': '#e5e7eb',
        'text-muted': '#9ca3af',
      },
      fontFamily: {
        // Use your own fonts via @import in CSS if you want specific ones
        display: ['"Playfair Display"', 'ui-serif', 'Georgia', 'serif'], // headings
        body: ['"Inter"', 'system-ui', 'ui-sans-serif', 'sans-serif'],   // body
      },
      boxShadow: {
        'soft-glow': '0 25px 60px rgba(15,23,42,0.9)',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
