<script setup lang="ts">
// TheWhatWeDo.vue
// Section 2 — the institutional triptych: Operate & Hold · Build & Acquire · Partner

const stageEl = ref<HTMLElement | null>(null)
const videoEl = ref<HTMLVideoElement | null>(null)

onMounted(() => {
  const v = videoEl.value
  if (v) {
    const markLoaded = () => v.classList.add('loaded')
    if (v.readyState >= 2) markLoaded()
    else v.addEventListener('loadeddata', markLoaded, { once: true })
  }

  // Parallax
  let ticking = false
  function update() {
    const stage = stageEl.value
    if (!stage) return
    const rect = stage.getBoundingClientRect()
    const vh = window.innerHeight
    if (rect.bottom < -vh || rect.top > vh * 2) return
    const elCenter = rect.top + rect.height / 2
    const rawOffset = (elCenter - vh / 2) * -0.18
    // Clamp so the video edge never pulls out of the wrapper when scrolled
    // far past the section — without this the masked text appears empty.
    const maxOffset = rect.height * 0.10
    const offset = Math.max(-maxOffset, Math.min(maxOffset, rawOffset))
    const v2 = stage.querySelector('video') as HTMLVideoElement | null
    if (v2) v2.style.transform = `translate3d(0, ${offset}px, 0) scale(1.25)`
    ticking = false
  }
  window.addEventListener('scroll', () => {
    if (!ticking) { requestAnimationFrame(update); ticking = true }
  }, { passive: true })
  update()
})
</script>

<template>
  <section class="block paper" id="what">
    <div class="wrap">
      <div class="reveal">
        <h2 ref="stageEl" class="video-headline tall" aria-label="We build infrastructure where it matters most.">
          <div class="vh-video">
            <video ref="videoEl" autoplay loop muted playsinline>
              <source src="https://pub-f138f42d66b748108ebf7432c7314665.r2.dev/iStock-1702872444.mp4" type="video/mp4">
            </video>
          </div>
          <div class="vh-mask">
            <svg viewBox="0 0 1900 290" preserveAspectRatio="xMinYMid meet" xmlns="http://www.w3.org/2000/svg" style="overflow: visible;">
              <defs>
                <mask id="mask-build" x="-50" y="-50" width="2000" height="390">
                  <rect x="-50" y="-50" width="2000" height="390" fill="white" />
                  <text text-anchor="start" font-family="Bricolage Grotesque, Helvetica Neue, sans-serif" font-weight="400" font-size="115" letter-spacing="-4" fill="black">
                    <tspan x="0" y="115">We build infrastructure</tspan>
                    <tspan x="0" y="245">where it matters most.</tspan>
                  </text>
                </mask>
              </defs>
              <rect x="-50" y="-50" width="2000" height="390" fill="#fafafa" mask="url(#mask-build)" />
            </svg>
          </div>
        </h2>
      </div>

      <div class="what">
        <div class="what-item reveal reveal-d-1">
          <div class="icon-wrap">
            <svg viewBox="0 0 56 56" fill="none" stroke="#111" stroke-width="1" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="28" cy="28" r="6" />
              <circle cx="28" cy="28" r="14" />
              <circle cx="28" cy="28" r="22" />
            </svg>
          </div>
          <h3>Operate &amp; Hold</h3>
          <p>We own and operate Telroi.ai — our wholly-owned voice and AI communications business — and hold strategic interests in independent telecommunications, connectivity, technology, and AI companies, backing them with long-term capital.</p>
        </div>

        <div class="what-item reveal reveal-d-2">
          <div class="icon-wrap">
            <svg viewBox="0 0 56 56" fill="none" stroke="#111" stroke-width="1" stroke-linecap="round" stroke-linejoin="round">
              <rect x="8" y="8" width="16" height="16" />
              <rect x="32" y="8" width="16" height="16" />
              <rect x="8" y="32" width="16" height="16" />
              <rect x="32" y="32" width="16" height="16" />
            </svg>
          </div>
          <h3>Build &amp; Acquire</h3>
          <p>We build new infrastructure ventures and acquire established operating businesses — folding them into the Group's portfolio under their existing brands and management teams, with patient capital and long-term alignment.</p>
        </div>

        <div class="what-item reveal reveal-d-3">
          <div class="icon-wrap">
            <svg viewBox="0 0 56 56" fill="none" stroke="#111" stroke-width="1" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="18" cy="28" r="8" />
              <circle cx="38" cy="28" r="8" />
              <path d="M22 28h12" />
            </svg>
          </div>
          <h3>Partner</h3>
          <p>The Group maintains commercial relationships with licensed carriers, VAS aggregators, and infrastructure operators globally — supporting the operational depth of its portfolio across telecom corridors and enterprise networks.</p>
        </div>
      </div>
    </div>
  </section>
</template>
