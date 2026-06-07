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
        // WayGood brand theme
        'brand-blue': '#074782',
        'brand-blue-light': '#0d5ca3',
        'brand-blue-dark': '#042d54',

        // Base theme backgrounds
        'bg-light': '#f8fafc',
        'bg-dark': '#030712',
        'card-light': '#ffffff',
        'card-dark': '#0f172a',

        // Accent accents
        'accent-gold': '#f4b41a',
        'accent-orange': '#fb923c',
        'muted-green': '#16a085',

        // Base theme text colors
        'text-light-main': '#0f172a',
        'text-light-muted': '#475569',
        'text-dark-main': '#f3f4f6',
        'text-dark-muted': '#94a3b8',
        
        // Legacy fallbacks for compatibility
        'text-main': '#e5e7eb',
        'text-muted': '#9ca3af',
        'deep-blue': '#0f172a',
        'deep-blue-soft': '#0f172a',
      },
      fontFamily: {
        display: ['"Plus Jakarta Sans"', 'sans-serif'],
        body: ['"Plus Jakarta Sans"', 'sans-serif'],
      },
      boxShadow: {
        'soft-glow': '0 25px 60px rgba(3,7,18,0.9)',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
