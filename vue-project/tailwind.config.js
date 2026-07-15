/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js}'],
  corePlugins: {
    // El landing público tiene su propio CSS global; sin preflight no se pisa.
    preflight: false
  },
  theme: {
    extend: {
      colors: {
        background: '#f7f9fb',
        'on-background': '#191c1e',
        primary: '#031632',
        'on-primary': '#ffffff',
        'primary-container': '#1a2b48',
        'on-primary-container': '#8293b5',
        'primary-fixed': '#d7e2ff',
        'primary-fixed-dim': '#b6c7eb',
        'on-primary-fixed': '#081b38',
        'on-primary-fixed-variant': '#374765',
        'inverse-primary': '#b6c7eb',
        secondary: '#3b6934',
        'on-secondary': '#ffffff',
        'secondary-container': '#b9eeab',
        'on-secondary-container': '#3f6d38',
        'secondary-fixed': '#bcf0ae',
        'secondary-fixed-dim': '#a1d494',
        'on-secondary-fixed': '#002201',
        'on-secondary-fixed-variant': '#23501e',
        tertiary: '#2e0c00',
        'on-tertiary': '#ffffff',
        'tertiary-container': '#4f1a00',
        'on-tertiary-container': '#e5713a',
        'tertiary-fixed': '#ffdbcd',
        'tertiary-fixed-dim': '#ffb596',
        'on-tertiary-fixed': '#360f00',
        'on-tertiary-fixed-variant': '#7d2d00',
        error: '#ba1a1a',
        'on-error': '#ffffff',
        'error-container': '#ffdad6',
        'on-error-container': '#93000a',
        surface: '#f7f9fb',
        'on-surface': '#191c1e',
        'surface-variant': '#e0e3e5',
        'on-surface-variant': '#44474d',
        'surface-dim': '#d8dadc',
        'surface-bright': '#f7f9fb',
        'surface-container-lowest': '#ffffff',
        'surface-container-low': '#f2f4f6',
        'surface-container': '#eceef0',
        'surface-container-high': '#e6e8ea',
        'surface-container-highest': '#e0e3e5',
        'surface-tint': '#4e5f7e',
        outline: '#75777e',
        'outline-variant': '#c5c6ce',
        'inverse-surface': '#2d3133',
        'inverse-on-surface': '#eff1f3'
      },
      borderRadius: {
        DEFAULT: '0.125rem',
        lg: '0.25rem',
        xl: '0.5rem',
        full: '9999px'
      },
      spacing: {
        base: '4px',
        xs: '4px',
        sm: '8px',
        md: '16px',
        lg: '24px',
        xl: '32px',
        gutter: '24px',
        'container-max': '1440px'
      },
      fontFamily: {
        'body-md': ['Inter', 'sans-serif'],
        'body-lg': ['Inter', 'sans-serif'],
        'label-md': ['Inter', 'sans-serif'],
        'headline-md': ['Inter', 'sans-serif'],
        'headline-lg': ['Inter', 'sans-serif'],
        'headline-lg-mobile': ['Inter', 'sans-serif'],
        display: ['Inter', 'sans-serif']
      },
      fontSize: {
        'body-md': ['14px', { lineHeight: '20px', fontWeight: '400' }],
        'body-lg': ['16px', { lineHeight: '24px', fontWeight: '400' }],
        'label-md': ['12px', { lineHeight: '16px', letterSpacing: '0.05em', fontWeight: '600' }],
        'headline-md': ['20px', { lineHeight: '28px', fontWeight: '600' }],
        'headline-lg': ['28px', { lineHeight: '36px', letterSpacing: '-0.01em', fontWeight: '600' }],
        'headline-lg-mobile': ['24px', { lineHeight: '32px', fontWeight: '600' }],
        display: ['36px', { lineHeight: '44px', letterSpacing: '-0.02em', fontWeight: '700' }]
      }
    }
  },
  plugins: []
}
