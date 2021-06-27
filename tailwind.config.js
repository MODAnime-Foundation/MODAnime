module.exports = {
  purge: {
    enabled: true,
    content: ['./src/*.svelte', './src/**/*.svelte', './public/**/*.html'],
    css: ['./public/**/*.css'],
    options: {
      defaultExtractor: (content) => [
        ...(content.match(/[^<>"'`\s]*[^<>"'`\s:]/g) || []),
        ...(content.match(/(?<=class:)[^=>\/\s]*/g) || []),
      ],
    },
  },
  darkMode: 'class',
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
