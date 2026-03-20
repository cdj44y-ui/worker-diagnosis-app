/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        apple: {
          bg: '#f5f5f7',
          text: '#1d1d1f',
          secondary: '#86868b',
          tertiary: '#aeaeb2',
          border: '#d2d2d7',
          blue: '#0071e3',
          'blue-hover': '#0077ed',
          surface: '#ffffff',
          elevated: '#fafafa',
        },
        navy: {
          DEFAULT: '#1d1d1f',
          light: '#424245',
          600: '#2d2d2f',
        },
        brand: {
          blue: '#0071e3',
          'blue-dark': '#006edb',
          'blue-light': '#42a1ff',
        },
      },
      fontFamily: {
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          'SF Pro Display',
          'SF Pro Text',
          'Apple SD Gothic Neo',
          'Noto Sans KR',
          'Malgun Gothic',
          'sans-serif',
        ],
      },
      boxShadow: {
        apple: '0 2px 8px rgba(0, 0, 0, 0.04), 0 1px 2px rgba(0, 0, 0, 0.04)',
        'apple-md': '0 4px 16px rgba(0, 0, 0, 0.06), 0 1px 3px rgba(0, 0, 0, 0.04)',
      },
      borderRadius: {
        apple: '12px',
        'apple-lg': '18px',
      },
      animation: {
        'slide-up': 'slideUp 0.45s cubic-bezier(0.25, 0.1, 0.25, 1)',
        'fade-in': 'fadeIn 0.35s ease',
      },
      keyframes: {
        slideUp: {
          from: { opacity: '0', transform: 'translateY(12px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
