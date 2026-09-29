<script setup lang="ts">
// TheWhatWeDo.vue
// Home: the five pillars

const pillars = [
  { name: 'Build', to: '/companies', link: 'Our companies', icon: '<rect x="8" y="8" width="16" height="16"/><rect x="32" y="8" width="16" height="16"/><rect x="8" y="32" width="16" height="16"/><rect x="32" y="32" width="16" height="16"/>',
    text: 'We found and own infrastructure companies in communications, AI and payments: Termii, Telroi and Sotel.' },
  { name: 'Back', to: '/back', link: 'Aidi Ventures', icon: '<circle cx="28" cy="28" r="6"/><circle cx="28" cy="28" r="14"/><circle cx="28" cy="28" r="22"/>',
    text: 'Through Aidi Ventures, we invest in exceptional African and diaspora founders building for the world.' },
  { name: 'Bridge', to: 'https://joinaidi.com', link: 'Aidi Wealth', icon: '<circle cx="18" cy="28" r="8"/><circle cx="38" cy="28" r="8"/><path d="M22 28h12"/>',
    text: 'Through Aidi Wealth, we give the diaspora and Nigerians access to cross-border wealth.' },
  { name: 'Host', to: '/host', link: 'Aidi Haven', icon: '<path d="M8 26L28 10l20 16"/><path d="M13 22v24h30V22"/><path d="M24 46V34h8v12"/>',
    text: 'Through Aidi Haven, we operate short-stay homes for professionals, founders and diaspora travellers.' },
  { name: 'Protect', to: '/about/values', link: 'Our philosophy', icon: '<path d="M28 8l16 6v12c0 10-7 18-16 22-9-4-16-12-16-22V14z"/><path d="M21 28l5 5 9-10"/>',
    text: 'We keep control, liquidity and succession secure, so our companies are held for generations.' }
]
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
        <h2 ref="stageEl" class="video-headline tall" aria-label="Five pillars. One long view.">
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
                  <text text-anchor="start" font-family="Cormorant Garamond, Georgia, serif" font-weight="500" font-size="130" letter-spacing="-2" fill="black">
                    <tspan x="0" y="115">Five pillars.</tspan>
                    <tspan x="0" y="245">One long view.</tspan>
                  </text>
                </mask>
              </defs>
              <rect x="-50" y="-50" width="2000" height="390" fill="#fafafa" mask="url(#mask-build)" />
            </svg>
          </div>
        </h2>
      </div>
      <div class="what">
        <div v-for="(p, i) in pillars" :key="p.name" class="what-item reveal" :class="'reveal-d-' + ((i % 3) + 1)">
          <div class="icon-wrap" aria-hidden="true">
            <svg viewBox="0 0 56 56" fill="none" stroke="#0c1a2e" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" v-html="p.icon" />
          </div>
          <h3>{{ p.name }}</h3>
          <p>{{ p.text }}</p>
          <NuxtLink :to="p.to" class="what-link">{{ p.link }} ›</NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.what-link { display: inline-block; margin-top: 14px; font-size: 14px; color: var(--c-blue-deep); text-decoration: underline; text-underline-offset: 3px; }
.what-link:hover { color: var(--c-navy); }
</style>
