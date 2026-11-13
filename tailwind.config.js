// Tailwind theme: brand colours come from CSS variables defined in index.css.
const c = (n) => `rgb(var(--${n}) / <alpha-value>)`;

export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        black: c('black'), 'black-soft': c('black-soft'), charcoal: c('charcoal'),
        gold: c('gold'), 'gold-light': c('gold-light'), 'gold-deep': c('gold-deep'),
        ash: c('ash'), 'ash-light': c('ash-light'), 'ash-dark': c('ash-dark'), bone: c('bone'),
      },
      fontFamily: {
        display: ['Archivo', 'Arial Narrow', 'system-ui', 'sans-serif'],
        body: ['Manrope', 'system-ui', 'Segoe UI', 'sans-serif'],
        brand: ['Cinzel', 'Georgia', 'serif'],
      },
      borderRadius: { DEFAULT: '2px', sm: '1px', md: '2px', lg: '2px' },
    },
  },
  plugins: [],
};
