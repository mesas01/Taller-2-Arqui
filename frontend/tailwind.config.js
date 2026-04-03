/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx}',
    './components/**/*.{js,jsx}'
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f4fbf8',
          100: '#dff3ea',
          500: '#1f8f6a',
          700: '#136649',
          900: '#0c3e2d'
        }
      }
    }
  },
  plugins: []
};
