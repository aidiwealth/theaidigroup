<script setup lang="ts">
// BrandModal.vue
// Side-drawer detail panel for each portfolio brand. Slides in from the right
// when opened from a brand cell click. Reactive to the useBrandModal composable.

import { useBrandModal, BRAND_DATA } from '~/composables/useBrandData'
import type { BrandKey } from '~/composables/useBrandData'

const { isOpen, current, close } = useBrandModal()

const panelEl = ref<HTMLElement | null>(null)
const videoEl = ref<HTMLVideoElement | null>(null)

// Used to instance per-modal-open the mask id so multiple opens don't collide
const maskId = computed(() =>
  current.value ? `brandNameMask-${current.value.key}` : 'brandNameMask'
)

// Sizing for the video-mask brand name — consistent across brands so they align
const NAME_FONT_SIZE = 92
const VB_HEIGHT = Math.round(NAME_FONT_SIZE * 1.3)
const NAME_BASELINE_Y = Math.round(VB_HEIGHT * 0.78)

// Returns the logo component name dynamically resolved by Nuxt auto-imports
function logoComponent(key: BrandKey): string {
  return 'BrandLogo' + key.charAt(0).toUpperCase() + key.slice(1)
}

// Parallax on the modal's brand-name video (driven by panel scroll)
function attachParallax() {
  const panel = panelEl.value
  const video = videoEl.value
  if (!panel || !video) return
  let ticking = false
  function update() {
    if (!videoEl.value) return
    const wrap = videoEl.value.closest('.brand-modal-name-video') as HTMLElement | null
    if (!wrap) return
    const rect = wrap.getBoundingClientRect()
    const vh = window.innerHeight
    if (rect.bottom < -vh || rect.top > vh * 2) return
    const elCenter = rect.top + rect.height / 2
    const offset = (elCenter - vh / 2) * -0.15
    videoEl.value.style.transform = `translate3d(0, ${offset}px, 0) scale(1.15)`
    ticking = false
  }
  panel.addEventListener('scroll', () => {
    if (!ticking) { requestAnimationFrame(update); ticking = true }
  }, { passive: true })
  update()
}

// When the modal opens, wire up the video and parallax
watch(isOpen, async (open) => {
  if (!open) return
  await nextTick()
  const v = videoEl.value
  if (v) {
    const markLoaded = () => v.classList.add('loaded')
    if (v.readyState >= 2) markLoaded()
    else v.addEventListener('loadeddata', markLoaded, { once: true })
  }
  // Scroll panel to top on every fresh open
  if (panelEl.value) panelEl.value.scrollTop = 0
  attachParallax()
  // Repaint SVG text after webfont loads (Bricolage)
  if (document.fonts?.ready) {
    document.fonts.ready.then(() => {
      const svg = panelEl.value?.querySelector('.brand-modal-name-mask svg') as SVGSVGElement | null
      if (svg) {
        const orig = svg.style.display
        svg.style.display = 'none'
        void svg.getBoundingClientRect()
        svg.style.display = orig || ''
      }
    })
  }
})

// ESC closes
onMounted(() => {
  function onKey(e: KeyboardEvent) {
    if (e.key === 'Escape' && isOpen.value) close()
  }
  window.addEventListener('keydown', onKey)
  onBeforeUnmount(() => window.removeEventListener('keydown', onKey))
})
</script>

<template>
  <div
    class="brand-modal"
    :class="{ open: isOpen }"
    :aria-hidden="!isOpen"
    role="dialog"
    aria-labelledby="brandModalName"
  >
    <div class="brand-modal-backdrop" @click="close"></div>
    <div
      ref="panelEl"
      class="brand-modal-panel"
      role="document"
      :style="{ '--brand-color': current?.color || '#111' }"
    >
      <div class="brand-modal-accent" :style="{ background: current?.color || '#111' }"></div>
      <button type="button" class="brand-modal-close" aria-label="Close" @click="close">
        <svg viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round">
          <path d="M3 3L15 15 M15 3L3 15" />
        </svg>
      </button>

      <div v-if="current" class="brand-modal-content">
        <!-- Brand mark — same logo as the cell, via dynamic component -->
        <div class="brand-modal-mark">
          <component :is="logoComponent(current.key)" />
        </div>

        <div class="brand-modal-eyebrow">{{ current.eyebrow }}</div>

        <!-- Video-parallax brand name -->
        <div class="brand-modal-name-stage" :style="`aspect-ratio: 1200 / ${VB_HEIGHT};`">
          <div class="brand-modal-name-video">
            <video ref="videoEl" autoplay loop muted playsinline>
              <source src="https://pub-f138f42d66b748108ebf7432c7314665.r2.dev/iStock-1702872444.mp4" type="video/mp4">
            </video>
          </div>
          <div class="brand-modal-name-mask">
            <svg
              :viewBox="`0 0 1200 ${VB_HEIGHT}`"
              preserveAspectRatio="xMinYMid meet"
              xmlns="http://www.w3.org/2000/svg"
              style="overflow: visible;"
            >
              <defs>
                <mask :id="maskId" x="-50" y="-50" width="1300" :height="VB_HEIGHT + 100">
                  <rect x="-50" y="-50" width="1300" :height="VB_HEIGHT + 100" fill="white" />
                  <text
                    x="0"
                    :y="NAME_BASELINE_Y"
                    text-anchor="start"
                    font-family="Cormorant Garamond, Georgia, serif"
                    font-weight="500"
                    :font-size="NAME_FONT_SIZE"
                    letter-spacing="-6"
                    fill="black"
                  >{{ current.name }}</text>
                </mask>
              </defs>
              <rect
                x="-50"
                y="-50"
                width="1300"
                :height="VB_HEIGHT + 100"
                fill="#ffffff"
                :mask="`url(#${maskId})`"
              />
            </svg>
          </div>
          <h2 id="brandModalName" class="brand-modal-name-sr">{{ current.name }}</h2>
        </div>

        <p class="brand-modal-tagline">{{ current.tagline }}</p>

        <div class="brand-modal-metrics">
          <div
            v-for="(m, i) in current.metrics"
            :key="i"
            class="brand-modal-metric"
            :class="{ full: current.metrics.length % 2 === 1 && i === current.metrics.length - 1 }"
          >
            <div
              class="brand-modal-metric-value"
              :class="{ accent: m.featured }"
            >{{ m.value }}</div>
            <div class="brand-modal-metric-label">{{ m.label }}</div>
          </div>
        </div>

        <div
          v-for="(s, i) in current.sections"
          :key="i"
          class="brand-modal-section"
        >
          <h4>{{ s.title }}</h4>
          <p>{{ s.body }}</p>
        </div>

        <a
          v-if="current.link"
          class="brand-modal-link"
          :href="current.link.url"
          target="_blank"
          rel="noopener"
        >
          <span>{{ current.link.label }}</span>
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round">
            <path d="M4 12L12 4 M5 4h7v7" />
          </svg>
        </a>

        <!-- v-html is acceptable here because content is from our trusted composable, never user input -->
        <div class="brand-modal-signature" v-html="current.signature"></div>
      </div>
    </div>
  </div>
</template>
