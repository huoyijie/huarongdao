const plugin = require('tailwindcss/plugin')

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
      textShadow: {
        sm: '0 1px 2px var(--tw-shadow-color)',
        DEFAULT: '0 2px 4px var(--tw-shadow-color)',
        lg: '0 8px 16px var(--tw-shadow-color)',
      },
    },
  },
  safelist: [
    {
      pattern: /(w|h|top|left)-(64|128|256|192|320|384|512|640)/,
      variants: ['md'],
    },
  ],
  plugins: [
    plugin(function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          'text-shadow': (value) => ({
            textShadow: value,
          }),
        },
        { values: theme('textShadow') }
      )
    }),
  ],
}
