/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#ae3200',
          light: '#ff5a1f',
          dark: '#852400',
          container: '#ffdbd0',
        },
        surface: {
          DEFAULT: '#f9f9ff',
          dim: '#d3daea',
          bright: '#f9f9ff',
          lowest: '#ffffff',
          low: '#f0f3ff',
          DEFAULT2: '#e7eefe',
          high: '#e2e8f8',
          highest: '#dce2f3',
        },
        outline: {
          DEFAULT: '#8f7067',
          variant: '#e4beb3',
        },
        on: {
          surface: '#151c27',
          'surface-variant': '#5b4038',
          primary: '#ffffff',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      borderRadius: {
        sm: '0.25rem',
        DEFAULT: '0.5rem',
        md: '0.75rem',
        lg: '1rem',
        xl: '1.5rem',
        '2xl': '1rem',
        full: '9999px',
      },
      boxShadow: {
        sm: '0 1px 3px rgba(0,0,0,0.08)',
        DEFAULT: '0 2px 8px rgba(0,0,0,0.10)',
        lg: '0 8px 24px rgba(0,0,0,0.12)',
        xl: '0 20px 60px rgba(0,0,0,0.18)',
      },
      maxWidth: {
        container: '1280px',
      },
    },
  },
  plugins: [],
}
