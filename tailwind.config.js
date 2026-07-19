/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Ink + warm gold system (gold = accent only, never body copy)
        ink: '#0a0a0b',
        'ink-soft': '#141416',
        paper: '#f7f4ef',
        'paper-soft': '#ebe6dc',
        chalk: '#e8e4dc',
        'chalk-muted': '#9a958c',

        // Accent — use for borders, underlines, small labels; not long body text
        'accent-gold': '#d4a017',
        'accent-gold-bright': '#f0c14d',
        'accent-orange': '#c47a3a',
        'muted-green': '#3d6b5a',

        // Legacy aliases mapped into ink/gold system
        'brand-blue': '#0a0a0b',
        'brand-blue-light': '#d4a017',
        'brand-blue-dark': '#050506',

        'bg-light': '#f7f4ef',
        'bg-dark': '#0a0a0b',
        'card-light': '#ffffff',
        'card-dark': '#141416',

        'text-light-main': '#0a0a0b',
        'text-light-muted': '#5c574f',
        'text-dark-main': '#e8e4dc',
        'text-dark-muted': '#9a958c',

        'text-main': '#e8e4dc',
        'text-muted': '#9a958c',
        'deep-blue': '#0a0a0b',
        'deep-blue-soft': '#141416',
      },
      fontFamily: {
        display: ['"Cabinet Grotesk"', 'system-ui', 'sans-serif'],
        body: ['"Satoshi"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'soft-glow': '0 24px 60px rgba(10, 10, 11, 0.45)',
        lift: '0 20px 40px -20px rgba(10, 10, 11, 0.35)',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
