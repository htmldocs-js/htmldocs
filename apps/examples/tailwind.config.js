/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./documents/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            h1: {
              fontSize: '1.875em',
              marginTop: '1.5em',
              marginBottom: '0.8em',
            },
            h2: {
              fontSize: '1.5em',
              marginTop: '1.4em',
              marginBottom: '0.8em',
            },
            h3: {
              fontSize: '1.25em',
              marginTop: '1.3em',
              marginBottom: '0.6em',
            },
            h4: {
              fontSize: '1.125em',
              marginTop: '1.2em',
              marginBottom: '0.6em',
            },
          },
        },
        lg: {
          css: {
            h1: {
              fontSize: '2em',
              marginTop: '1.5em',
              marginBottom: '0.8em',
            },
            h2: {
              fontSize: '1.75em',
              marginTop: '1.4em',
              marginBottom: '0.8em',
            },
            h3: {
              fontSize: '1.5em',
              marginTop: '1.3em',
              marginBottom: '0.6em',
            },
            h4: {
              fontSize: '1.25em',
              marginTop: '1.2em',
              marginBottom: '0.6em',
            },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
