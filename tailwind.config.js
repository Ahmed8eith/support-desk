module.exports = {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}", // Make sure Tailwind scans your files
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('daisyui'), // Add DaisyUI here
  ],
}
