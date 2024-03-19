/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./blog/**/*.{js,jsx,ts,tsx,md,mdx}",
    "./docs/**/*.{js,jsx,ts,tsx,md,mdx}",
    "./pages/**/*.{js,jsx,ts,tsx,md,mdx}",
    "./docusaurus.config.*"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

