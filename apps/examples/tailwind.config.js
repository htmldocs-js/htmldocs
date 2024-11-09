/** @type {import('tailwindcss').Config} */
console.log(require('@tailwindcss/typography'))
module.exports = {
  content: ["./documents/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
