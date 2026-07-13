// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite"

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ["~/assets/css/tailwind.css", "~/assets/scss/main.scss"],

  nitro: {
    preset: "cloudflare-pages",

    cloudflare: {
      deployConfig: true,
      nodeCompat: true
    }
  },

  vite: {
    plugins: [tailwindcss()]
  },

  modules: ["@nuxtjs/i18n", "nitro-cloudflare-dev"],

  i18n: {
    defaultLocale: 'uk',
    strategy: 'no_prefix',
    detectBrowserLanguage: false,
    restructureDir: 'app/i18n',
    langDir: 'locales',
    vueI18n: './i18n.config.ts',
    locales: [
      {
        code: 'uk',
        name: 'Українська',
        language: 'uk-UA',
        file: 'uk.json'
      },
      {
        code: 'en',
        name: 'English',
        language: 'en',
        file: 'en.json'
      }
    ]
  }
})
