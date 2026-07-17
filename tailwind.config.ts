import type { Config } from 'tailwindcss'

export default <Partial<Config>>{
  theme: {
    extend: {
      colors: {
        'surface-linen': '#DCD0B8',
        'surface-white': '#FFFFFF',
        'surface-dark': '#242220',
        'surface-brick': '#B8402A',
        'surface-card': '#EFE6D3',
        'text-primary': '#1C1A17',
        'text-secondary': '#5C5548',
        'text-inverse': '#F7F2E9',
        'text-inverse-muted': '#C9C2B4',
        'accent-brick': '#B8402A',
        'border-subtle': '#B8AD96',
        'border-inverse': '#4A4642'
      },
      fontFamily: {
        heading: ['"Playfair Display"', 'serif'],
        body: ['Newsreader', 'serif'],
        caption: ['Inter', 'sans-serif']
      }
    }
  }
}
