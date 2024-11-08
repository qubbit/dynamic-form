const purgecss = require('@fullhuman/postcss-purgecss');

module.exports = {
  plugins: [
    require('tailwindcss'),
    require('autoprefixer'),
    ...(process.env.NODE_ENV === 'production' ? [purgecss({
      content: ['./src/**/*.{js,jsx,ts,tsx}'], // Ensure it matches your component files
      defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || [],
    })] : []),
  ],
};
