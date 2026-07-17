// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite"
import { getGatedPages, parseAvailablePages } from "./app/utils/pages"

// Resolve the public page allowlist ONCE at build time (see story DD-001.6.1).
// Unset NUXT_PUBLIC_AVAILABLE_PAGES ⇒ every page available (dev default). The
// resolved list feeds BOTH the edge redirect route rules and the client/server
// render (via runtimeConfig.public.pages) from the same value, so the SSR nav
// and the hydrated client nav can never disagree (no hydration mismatch).
const availablePages = parseAvailablePages(process.env.NUXT_PUBLIC_AVAILABLE_PAGES)

// Every gated (non-available) page redirects (302) to '/' at the Cloudflare
// edge before any render. Status code is explicit — Nitro defaults a redirect
// rule to 307; D1/AC-2 call for 302.
const gatedRouteRules = Object.fromEntries(
  getGatedPages(availablePages).map((path) => [
    path,
    { redirect: { to: "/", statusCode: 302 } }
  ])
)

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ["~/assets/css/tailwind.css", "~/assets/scss/main.scss"],

  app: {
    head: {
      link: [
        { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
        { rel: "icon", type: "image/png", sizes: "16x16", href: "/favicon-16x16.png" },
        { rel: "icon", type: "image/png", sizes: "32x32", href: "/favicon-32x32.png" },
        { rel: "icon", type: "image/png", sizes: "96x96", href: "/favicon-96x96.png" },
        { rel: "apple-touch-icon", sizes: "180x180", href: "/apple-touch-icon.png" },
        { rel: "manifest", href: "/site.webmanifest" }
      ],
      meta: [
        { name: "theme-color", content: "#7a1e2b" }
      ]
    }
  },

  // Key is `pages`, NOT `availablePages`: Nuxt would auto-map the env var
  // NUXT_PUBLIC_AVAILABLE_PAGES onto runtimeConfig.public.availablePages at
  // server runtime and overwrite it with the raw comma-string, corrupting the
  // baked array. Storing under `pages` sidesteps that auto-override entirely.
  runtimeConfig: {
    public: {
      pages: availablePages
    }
  },

  routeRules: gatedRouteRules,

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
