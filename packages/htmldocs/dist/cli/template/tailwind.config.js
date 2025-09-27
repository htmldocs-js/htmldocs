/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./documents/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        serif: ['Palatino', 'Palatino Linotype', 'serif'],
      },
      typography: {
        DEFAULT: {
          css: {
            fontSize: '12pt',
            lineHeight: 1.5,
            color: '#000000',
            p: {
              marginTop: '0.5em',
              marginBottom: '0.5em',
              color: '#000000',
              textIndent: '1em',
            },
            h1: {
              fontSize: '16pt',
              marginTop: '1em',
              marginBottom: '0.5em',
              fontWeight: '600',
              color: '#000000',
            },
            h2: {
              fontSize: '14pt', 
              marginTop: '1em',
              marginBottom: '0.5em',
              fontWeight: '600',
              color: '#000000',
            },
            h3: {
              fontSize: '12pt',
              marginTop: '1em',
              marginBottom: '0.5em',
              fontWeight: '600',
              color: '#000000',
            },
            h4: {
              fontSize: '12pt',
              marginTop: '0.8em',
              marginBottom: '0.4em',
              fontWeight: '600',
              fontStyle: 'italic',
              color: '#000000',
            },
            ul: {
              marginTop: '0.5em',
              marginBottom: '0.5em',
              color: '#000000',
            },
            ol: {
              marginTop: '0.5em',
              marginBottom: '0.5em',
              color: '#000000',
            },
            li: {
              marginTop: '0.2em',
              marginBottom: '0.2em',
              color: '#000000',
            },
            a: {
              color: '#000000',
              textDecoration: 'underline',
            },
            strong: {
              color: '#000000',
              fontWeight: '600',
            },
            code: {
              color: '#000000',
            },
            pre: {
              color: '#000000',
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
