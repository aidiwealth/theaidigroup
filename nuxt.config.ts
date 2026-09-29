// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-23',
  devtools: { enabled: false },

  // Global CSS — preserves the existing institutional design system
  css: [
    '@fontsource/cormorant-garamond/400.css',
    '@fontsource/cormorant-garamond/400-italic.css',
    '@fontsource/cormorant-garamond/500.css',
    '@fontsource/cormorant-garamond/600.css',
    '@fontsource/instrument-sans/400.css',
    '@fontsource/instrument-sans/500.css',
    '@fontsource/instrument-sans/600.css',
    '~/assets/css/tokens.css',
    '~/assets/css/main.css',
    '~/assets/css/site.css',
    '~/assets/css/page.css'
  ],

  // Static site generation by default — deploy to Vercel / Netlify / Cloudflare Pages
  ssr: true,

  modules: ['@nuxt/content'],
  content: { markdown: { anchorLinks: false } },

  runtimeConfig: { public: { portalLive: 'false', turnstileSiteKey: '' } },

  nitro: { prerender: { crawlLinks: true, failOnError: true, routes: ['/', '/about', '/about/values', '/about/leadership', '/what-we-do', '/companies', '/back', '/host', '/services', '/insights', '/careers', '/contact', '/legal/privacy', '/legal/terms', '/legal/disclaimer'] } },

  app: {
    head: {
      htmlAttrs: { lang: 'en' },
      title: 'The Aidi Group — Operator-led family office',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: "An operator-led family office that builds and backs technology, financial and hospitality businesses connecting the US and Africa, and turns them into lasting wealth for the next generation." },
        { name: 'robots', content: "index, follow" },
        { name: 'theme-color', content: "#0c1a2e" },
        { property: 'og:type', content: "website" },
        { property: 'og:site_name', content: "The Aidi Group" },
        { property: 'og:title', content: "The Aidi Group" },
        { property: 'og:description', content: "An operator-led family office that builds and backs technology, financial and hospitality businesses connecting the US and Africa, and turns them into lasting wealth for the next generation." },
        { property: 'og:url', content: "https://theaidigroup.com/" },
        { property: 'og:image', content: "https://theaidigroup.com/og-image.png" },
        { name: 'twitter:card', content: "summary_large_image" },
        { name: 'twitter:image', content: "https://theaidigroup.com/og-image.png" },
      ],
      link: [
        { rel: 'canonical', href: 'https://theaidigroup.com/' },
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
        { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/favicon-180x180.png' },
        { rel: 'manifest', href: '/site.webmanifest' }
      ]
    }
  }
})
