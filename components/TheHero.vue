<script setup lang="ts">
// TheHero.vue
// The opening — "The Telroi Group." cut from a rotating earth video,
// centered both vertically and horizontally in a full-viewport hero.

const videoEl = ref<HTMLVideoElement | null>(null)
const stageEl = ref<HTMLDivElement | null>(null)

onMounted(() => {
  const v = videoEl.value
  if (!v) return

  // Fade in once loaded
  const markLoaded = () => v.classList.add('loaded')
  if (v.readyState >= 2) markLoaded()
  else v.addEventListener('loadeddata', markLoaded, { once: true })

  // Parallax — video drifts at 0.18x the scroll, clamped so it never pulls
  // out of its wrapper (which would leave the masked text empty)
  let ticking = false
  function update() {
    const stage = stageEl.value
    if (!stage) return
    const rect = stage.getBoundingClientRect()
    const vh = window.innerHeight
    const elCenter = rect.top + rect.height / 2
    const rawOffset = (elCenter - vh / 2) * -0.18
    const maxOffset = rect.height * 0.10
    const offset = Math.max(-maxOffset, Math.min(maxOffset, rawOffset))
    if (videoEl.value) {
      videoEl.value.style.transform = `translate3d(0, ${offset}px, 0) scale(1.25)`
    }
    ticking = false
  }
  window.addEventListener(
    'scroll',
    () => {
      if (!ticking) {
        requestAnimationFrame(update)
        ticking = true
      }
    },
    { passive: true }
  )
  update()

  // Repaint SVG text after webfont loads
  if (document.fonts?.ready) {
    document.fonts.ready.then(() => {
      const svg = stageEl.value?.querySelector('.name-mask svg') as SVGSVGElement | null
      if (svg) {
        const orig = svg.style.display
        svg.style.display = 'none'
        void svg.getBoundingClientRect()
        svg.style.display = orig || ''
      }
    })
  }
})
</script>

<template>
  <section class="hero">
    <div class="wrap hero-content">
      <h1 class="name-heading" aria-label="The Telroi Group.">
        <div ref="stageEl" class="name-stage">
          <div class="name-video">
            <video ref="videoEl" autoplay loop muted playsinline>
              <source
                src="https://pub-f138f42d66b748108ebf7432c7314665.r2.dev/iStock-1702872444.mp4"
                type="video/mp4"
              >
            </video>
          </div>
          <div class="name-mask">
            <svg
              viewBox="0 0 1200 280"
              preserveAspectRatio="xMidYMid meet"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <mask id="textCutout" x="0" y="0" width="1200" height="280">
                  <rect x="0" y="0" width="1200" height="280" fill="white" />
                  <text
                    x="600"
                    y="200"
                    text-anchor="middle"
                    font-family="Cormorant Garamond, Georgia, serif"
                    font-weight="500"
                    font-size="160"
                    letter-spacing="-6"
                    fill="black"
                  >The Telroi Group.</text>
                </mask>
              </defs>
              <rect x="0" y="0" width="1200" height="280" fill="#ffffff" mask="url(#textCutout)" />
            </svg>
          </div>
        </div>
      </h1>
      <p class="statement hero-fade">
        Building AI-native infrastructure for an intelligent world.
      </p>
      <p class="lead hero-fade">
        The Telroi Group is a strategic holding company that wholly owns Telroi.ai and holds strategic interests in independent communications, connectivity, technology, and AI businesses globally.
      </p>
      <a href="#what" class="signpost hero-fade">What we do</a>
    </div>
  </section>
</template>
