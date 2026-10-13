/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        bg: 'var(--bg)',
        text: 'var(--text)',
        muted: 'var(--muted)',
        border: 'var(--border)',
        'accent-from': 'var(--accent-from)',
        'accent-via': 'var(--accent-via)',
        'accent-to': 'var(--accent-to)',
        available: 'var(--available)',
      },
      fontFamily: {
        accent: ['"Playfair Display"', 'Georgia', 'serif'],
        body: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'fluid-hero': 'clamp(2.5rem, 5vw + 1rem, 4.5rem)',
        'section': 'clamp(1.75rem, 3vw + 0.5rem, 2.25rem)',
      },
      maxWidth: {
        container: '1100px',
        blog: '680px',
      },
      spacing: {
        'section-y': 'clamp(4rem, 8vw, 10rem)',
        'section-y-sm': 'clamp(3rem, 6vw, 6rem)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'pulse-dot': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.5s ease-out forwards',
        'pulse-dot': 'pulse-dot 2s ease-in-out infinite',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
