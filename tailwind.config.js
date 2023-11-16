/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      width: {
        '128': '128px',
        '256': '256px',
        '512': '512px',
      },
      height: {
        '128': '128px',
        '256': '256px',
        '640': '640px',
      },
      inset: {
        '128': '128px',
        '256': '256px',
        '384': '384px',
        '512': '512px',
      },
    },
  },
  safelist: [
    {
      pattern: /(w|h|top|left)-(128|256|384|512|640)/,
    },
  ],
  plugins: [],
}
