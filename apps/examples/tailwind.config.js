/** @type {import('tailwindcss').Config} */
module.exports = {
  safelist: [
    {
      pattern: /./, // the "." means "everything"
    },
  ],
  content: ["./documents/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
};
