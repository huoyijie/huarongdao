/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      width: {
        '64': '64px',
        '128': '128px',
        '256': '256px',
        '512': '512px',
      },
      height: {
        '64': '64px',
        '128': '128px',
        '256': '256px',
        '320': '320px',
        '640': '640px',
      },
      inset: {
        '64': '64px',
        '128': '128px',
        '192': '192px',
        '256': '256px',
        '384': '384px',
        '512': '512px',
      },
    },
  },
  safelist: [
    {
      pattern: /(w|h|top|left)-(64|128|256|192|320|384|512|640)/,
      variants: ['md'],
    },
  ],
  plugins: [],
}
