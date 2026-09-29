<script setup lang="ts">
// TheCompanies.vue
// Three operating brand cells: Telroi · Termii · Sotel.
// Each cell is a button that opens the side modal for its brand.

import { useBrandModal } from '~/composables/useBrandData'
import type { BrandKey } from '~/composables/useBrandData'

const { open } = useBrandModal()

function handleOpen(brand: BrandKey) {
  open(brand)
}

// Parallax on the section's video headline
const stageEl = ref<HTMLElement | null>(null)

onMounted(() => {
  const stage = stageEl.value
  if (!stage) return
  const v = stage.querySelector('video') as HTMLVideoElement | null
  if (v) {
    const markLoaded = () => v.classList.add('loaded')
    if (v.readyState >= 2) markLoaded()
    else v.addEventListener('loadeddata', markLoaded, { once: true })
  }
  let ticking = false
  function update() {
    if (!stageEl.value) return
    const rect = stageEl.value.getBoundingClientRect()
    const vh = window.innerHeight
    if (rect.bottom < -vh || rect.top > vh * 2) return
    const elCenter = rect.top + rect.height / 2
    const rawOffset = (elCenter - vh / 2) * -0.18
    const maxOffset = rect.height * 0.10
    const offset = Math.max(-maxOffset, Math.min(maxOffset, rawOffset))
    const vid = stageEl.value.querySelector('video') as HTMLVideoElement | null
    if (vid) vid.style.transform = `translate3d(0, ${offset}px, 0) scale(1.25)`
    ticking = false
  }
  window.addEventListener('scroll', () => {
    if (!ticking) { requestAnimationFrame(update); ticking = true }
  }, { passive: true })
  update()
})
</script>

<template>
  <section class="block companies-section" id="companies">
    <div class="wrap">
      <div class="reveal">
        <h2 ref="stageEl" class="video-headline" aria-label="Strategic positions.">
          <div class="vh-video">
            <video autoplay loop muted playsinline>
              <source src="https://pub-f138f42d66b748108ebf7432c7314665.r2.dev/iStock-1702872444.mp4" type="video/mp4">
            </video>
          </div>
          <div class="vh-mask">
            <svg viewBox="0 0 1900 160" preserveAspectRatio="xMinYMid meet" xmlns="http://www.w3.org/2000/svg" style="overflow: visible;">
              <defs>
                <mask id="mask-one" x="-50" y="-50" width="2000" height="260">
                  <rect x="-50" y="-50" width="2000" height="260" fill="white" />
                  <text text-anchor="start" font-family="Bricolage Grotesque, Helvetica Neue, sans-serif" font-weight="400" font-size="115" letter-spacing="-4" fill="black">
                    <tspan x="0" y="120">Strategic positions.</tspan>
                  </text>
                </mask>
              </defs>
              <rect x="-50" y="-50" width="2000" height="260" fill="#ffffff" mask="url(#mask-one)" />
            </svg>
          </div>
        </h2>
        <p class="body-lg">
          Telroi.ai is wholly-owned and operated by the Group. Termii and Sotel are independent companies operated by their own founders and leadership teams — the Group holds strategic interests, backing them with long-term capital and aligned conviction.
        </p>
      </div>

      <div class="companies-row reveal reveal-d-1">
        <button type="button" data-brand="telroi" class="company-cell cell-telroi" @click="handleOpen('telroi')">
          <div class="company-mark"><BrandLogoTelroi /></div>
          <div class="company-name">Telroi</div>
          <div class="company-cat">Voice</div>
        </button>

        <button type="button" data-brand="termii" class="company-cell cell-termii" @click="handleOpen('termii')">
          <div class="company-mark"><BrandLogoTermii /></div>
          <div class="company-name">Termii</div>
          <div class="company-cat">Messaging</div>
        </button>

        <button type="button" data-brand="sotel" class="company-cell cell-siu" @click="handleOpen('sotel')">
          <div class="company-mark"><BrandLogoSotel /></div>
          <div class="company-name">Sotel</div>
          <div class="company-cat">Data &amp; Infrastructure</div>
        </button>
      </div>
    </div>
  </section>
</template>
