module.exports = {
  content: [
        "./pages/**/*.{js,jsx}",
        "./components/**/*.{js,jsx}",
        "./pages/agents/**/*.{js,jsx}",
        "./pages/posts/**/*.{js,jsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
         require('@tailwindcss/forms'),
         require('@tailwindcss/typography')
  ],
}
