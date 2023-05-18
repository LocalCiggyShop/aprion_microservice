/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',
        success: 'var(--color-success)',
        danger: 'var(--color-danger)',
        warning: 'var(--color-warning)',

        primaryHover: 'var(--color-primary-hover)',
        secondaryHover: 'var(--color-secondary-hover)',
        successHover: 'var(--color-success-hover)',
        dangerHover: 'var(--color-danger-hover)',
        warningHover: 'var(--color-warning-hover)',
      }
    }
    // extend: {
    //   "--primary-colour": "var(--primary-colour)"
    // },
  },
  plugins: []
}

