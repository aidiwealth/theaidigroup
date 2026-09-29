# The Telroi Group — Nuxt 3 site

A single-page institutional site for The Telroi Group, built with **Nuxt 3 + TypeScript** and statically deployable to any host.

## ⚡ Quick start — already-built static site

The `dist/` folder contains a **prebuilt, production-ready static site** — no `npm install` required.

To preview locally:
```bash
cd dist
python3 -m http.server 8000
# Open http://localhost:8000
```

To deploy: upload the contents of `dist/` to any static host (S3, Cloudflare Pages, Netlify drop, GitHub Pages, your existing web server).

**Important:** Don't open `dist/index.html` directly via `file://` — the JS bundle uses absolute paths (`/_nuxt/…`) which only resolve over HTTP(S). Serve it via any web server (even `python3 -m http.server` works) or upload it to a host.

---

## Source — edit and rebuild

## Stack

- **Nuxt 3** (Vue 3 + Vite) — SSR + SSG
- **TypeScript** — for `composables/` and `<script setup lang="ts">`
- **Static-generated** by default (no server needed at runtime)
- **Vanilla CSS** — your existing design system preserved in `assets/css/main.css`
- **Google Fonts** — Bricolage Grotesque, Geist, Geist Mono

## Project structure

```
telroi-nuxt/
├── assets/css/main.css        # Full design system — preserved from the original HTML
├── components/
│   ├── TheHero.vue            # Hero: "The Telroi Group." with video-mask
│   ├── TheWhatWeDo.vue        # Operate & Hold · Build & Acquire · Partner
│   ├── TheCompanies.vue       # Three brand cells (Telroi · Termii · Sotel)
│   ├── ThePlatform.vue        # Aidi-navy stats section
│   ├── ThePress.vue           # Featured FT card + tabular press list
│   ├── TheQuote.vue           # Green manifesto pull-quote
│   ├── TheFooter.vue          # Earth-video footer with full address + disclaimers
│   ├── TheBackToTop.vue       # Scroll-to-top button
│   ├── BrandModal.vue         # Side panel that opens for each brand cell
│   ├── BrandLogoTelroi.vue    # Brand SVG logos — auto-imported
│   ├── BrandLogoTermii.vue
│   ├── BrandLogoSotel.vue
│   └── VideoHeadline.vue      # (Reusable) generic video-mask headline
├── composables/
│   ├── useBrandData.ts        # Brand modal data + reactive open/close state
│   └── usePress.ts            # Featured + list press items
├── pages/index.vue            # Composes the single-page narrative
├── app.vue                    # Root layout
├── nuxt.config.ts             # Nuxt config (meta tags, fonts, CSS)
├── package.json
└── tsconfig.json
```

## Getting started

### Prerequisites
- **Node.js 18.x or 20.x** (recommend latest LTS)
- **pnpm** (or npm / yarn)

### Install

```bash
pnpm install
# or: npm install
# or: yarn install
```

### Develop

```bash
pnpm dev
```

Opens at `http://localhost:3000`. Hot-reloads on edits.

### Build for static deployment

```bash
pnpm generate
```

Outputs a fully-static site to `.output/public/` — drop into any static host (Vercel, Netlify, Cloudflare Pages, S3, GitHub Pages).

### Build for server-rendered (SSR) deployment

```bash
pnpm build
```

For when you later add API routes or dynamic features. Output in `.output/`.

### Preview the production build locally

```bash
pnpm preview
```

## Deployment

### Vercel (recommended for SSR)
- Connect the GitHub repo at [vercel.com](https://vercel.com).
- Framework preset: **Nuxt.js**.
- Build command: `nuxt build` (auto-detected).
- Output directory: `.output` (auto-detected).
- Done.

### Netlify (static)
- Connect GitHub repo at [netlify.com](https://netlify.com).
- Build command: `pnpm generate`.
- Publish directory: `.output/public`.

### Cloudflare Pages (static)
- Connect GitHub repo.
- Build command: `pnpm generate`.
- Output directory: `.output/public`.

## Editing content

### Updating press items
Edit `composables/usePress.ts`. The `FEATURED_PRESS` constant drives the highlighted card; `PRESS_LIST` drives the tabular list below.

### Updating brand modal copy
Edit `composables/useBrandData.ts`. Each brand (`telroi`, `termii`, `sotel`) has `color`, `eyebrow`, `name`, `tagline`, `metrics`, `sections`, `link`, and `signature` fields.

### Updating hero / section copy
Edit the corresponding `components/The*.vue` file. Each component is self-contained and the copy sits in the `<template>`.

### Updating stats (16M+, 3B+, etc.)
Edit `components/ThePlatform.vue` — change the `data-to` values on the `<span data-counter>` elements.

### Adding a new portfolio company
1. Add a `BrandLogo[Name].vue` component with the SVG
2. Add a new entry in `BRAND_DATA` in `composables/useBrandData.ts`
3. Add a `<button>` cell in `components/TheCompanies.vue`
4. Update the cell border-gradient in `assets/css/main.css` if you want a brand-specific hover color
5. Update the `BrandKey` type union in `useBrandData.ts`

### Updating styles
All CSS lives in `assets/css/main.css`. CSS variables at the top of the file control colors, fonts, spacing. Edit there; no Tailwind config needed.

## Notes

- **Brand modals**: each modal pulls its logo from the matching `BrandLogo*.vue` component automatically — they stay in sync with the cell.
- **Video parallax**: Hero, section headlines, brand modal names, and footer video all use video parallax (offset = scroll × 0.15–0.18).
- **Reveal animations**: Any element with `.reveal` class fades in on scroll via IntersectionObserver. Add `.reveal-d-1` through `.reveal-d-3` for staggered delays.
- **Mobile**: All sections are responsive. The Companies row stacks to 1 column under 720px.
- **TypeScript strictness**: relaxed by default. Tighten in `tsconfig.json` if desired.

## License

Proprietary — all rights reserved. Telroi LLC, 2026.
