// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-23',
  devtools: { enabled: true },

  // Global CSS — preserves the existing institutional design system
  css: ['~/assets/css/main.css'],

  // Static site generation by default — deploy to Vercel / Netlify / Cloudflare Pages
  ssr: true,

  app: {
    head: {
      script: [
        {
        src: "https://app.telroi.ai/widget/v1.js",
        "data-telroi-key": "wgt_ec9ae0fdd28f1a2a4a73b0a65dde9437",
      }
      ],
      htmlAttrs: { lang: 'en' },
      title: 'The Telroi Group — Strategic Holdings',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },

        // Primary
        {
          name: 'description',
          content:
            'A strategic holding company that wholly owns Telroi.ai and holds strategic interests in independent communications, connectivity, technology, and AI businesses globally.'
        },
        {
          name: 'keywords',
          content:
            'The Telroi Group, Telroi, Telroi.ai, Termii, Sotel, Siu Telecoms, strategic holdings, US holding company, telecommunications, AI infrastructure, voice infrastructure, communications, connectivity, emerging markets, The Aidi Group, Delaware holding entity, portfolio company'
        },
        { name: 'author', content: 'The Telroi Group' },
        { name: 'robots', content: 'index, follow' },
        { name: 'theme-color', content: '#0c1a2e' },

        // Open Graph
        { property: 'og:type', content: 'website' },
        { property: 'og:site_name', content: 'The Telroi Group' },
        { property: 'og:title', content: 'The Telroi Group — Strategic Holdings' },
        {
          property: 'og:description',
          content:
            'A strategic holding company that wholly owns Telroi.ai and holds strategic interests in independent communications, connectivity, technology, and AI businesses globally.'
        },
        { property: 'og:url', content: 'https://telroi.com/' },
        { property: 'og:image', content: 'https://telroi.com/favicon-512x512.png' },
        { property: 'og:image:width', content: '512' },
        { property: 'og:image:height', content: '512' },
        { property: 'og:locale', content: 'en_US' },

        // Twitter / X
        { name: 'twitter:card', content: 'summary' },
        { name: 'twitter:title', content: 'The Telroi Group — Strategic Holdings' },
        {
          name: 'twitter:description',
          content:
            'A strategic holding company that wholly owns Telroi.ai and holds strategic interests in independent communications, connectivity, technology, and AI businesses globally.'
        },
        { name: 'twitter:image', content: 'https://telroi.com/favicon-512x512.png' }
      ],
      link: [
        // Canonical
        { rel: 'canonical', href: 'https://telroi.com/' },

        // Favicons
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
        { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/favicon-180x180.png' },
        { rel: 'manifest', href: '/site.webmanifest' },

        // Fonts
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wdth,wght@12..96,75..125,300..800&family=Geist+Mono:wght@400;500&family=Geist:wght@400;500;600&display=swap'
        }
      ]
    }
  }
})
