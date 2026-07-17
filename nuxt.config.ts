// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', '@nuxt/eslint', '@pinia/nuxt', '@nuxt/fonts'],
  tailwindcss: {
    cssPath: '~/assets/css/main.css'
  },
  fonts: {
    families: [
      { name: 'Playfair Display', provider: 'google' },
      { name: 'Newsreader', provider: 'google' },
      { name: 'Inter', provider: 'google' }
    ]
  }
})
