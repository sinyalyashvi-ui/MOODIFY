module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      boxShadow: {
        soft: '0 20px 45px -20px rgba(15, 23, 42, 0.35)'
      },
      colors: {
        accent: {
          50: '#eef7ff',
          100: '#d8edff',
          200: '#b9e0ff',
          300: '#85c6ff',
          400: '#4ea8ff',
          500: '#2487ff',
          600: '#176ae6',
          700: '#1454bb',
          800: '#17489a',
          900: '#183f7d'
        }
      }
    }
  },
  plugins: []
};
