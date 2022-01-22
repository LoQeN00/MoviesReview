module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "var(--primary)",
        secondary: "var(--secondary)",
        accent: "var(--accent)"
      },
      backgroundImage: {
        'tlo': 'linear-gradient(135deg, rgba(2,28,119,1) 0%, rgba(7,50,239,1) 23%, rgba(7,50,239,1) 76%, rgba(62,18,221,1) 100%)'
      }
    },
  },
  plugins: [],
}
