module.exports = {
  content: [
    "./screens/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        whale: {
          50: '#f5f5f5',
          100: '#dcdcdf',
          200: '#c3c4c9',
          300: '#abadb4',
          400: '#93969f',
          500: '#7c808b',
          600: '#666a77',
          700: '#505564',
          800: '#3b4151',
          900: '#272e3f',
        },
      }
    },
  },
};