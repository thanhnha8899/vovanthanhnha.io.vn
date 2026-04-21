/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#060b1a',
        surface: '#0f172f',
        primary: '#2563eb',
        accent: '#22d3ee',
        text: '#dbe7ff',
        muted: '#94a3b8',
      },
      fontFamily: {
        heading: ['Manrope', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      maxWidth: {
        content: '1200px',
      },
      boxShadow: {
        soft: '0 10px 30px rgba(15, 23, 42, 0.25)',
      },
      backgroundImage: {
        'hero-grid':
          'radial-gradient(circle at 20% 20%, rgba(34, 211, 238, 0.12), transparent 32%), radial-gradient(circle at 80% 0%, rgba(37, 99, 235, 0.16), transparent 36%)',
      },
    },
  },
  plugins: [],
}

