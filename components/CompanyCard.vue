<script setup lang="ts">
import type { Company } from '~/composables/useCompanies'
import { companyMedia } from '~/composables/useCompanies'

const props = defineProps<{ company: Company }>()
const media = companyMedia(props.company.slug)
const hasVideo = !!(media.mp4 || media.webm)
const external = props.company.href.startsWith('http')
const root = ref<HTMLElement | null>(null)
const video = ref<HTMLVideoElement | null>(null)
const showVideo = ref(false)

onMounted(() => {
  if (!hasVideo || !root.value) return
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  const io = new IntersectionObserver(([e]) => {
    if (e.isIntersecting) {
      showVideo.value = true
      nextTick(() => { if (video.value) playOnly(video.value) })
    } else if (video.value) {
      video.value.pause()
    }
  }, { threshold: 0.5 })
  io.observe(root.value)
  onBeforeUnmount(() => io.disconnect())
})
</script>

<template>
  <article ref="root" class="cc">
    <div class="cc-media">
      <img v-if="media.poster" :src="media.poster" :alt="company.alt" width="1600" height="1000" loading="lazy" decoding="async">
      <div v-else class="cc-placeholder" aria-hidden="true"><span>{{ company.pillar }}</span></div>
      <video v-if="showVideo" ref="video" muted loop playsinline preload="none" :poster="media.poster || undefined" aria-hidden="true">
        <source v-if="media.webm" :src="media.webm" type="video/webm">
        <source v-if="media.mp4" :src="media.mp4" type="video/mp4">
      </video>
    </div>
    <div class="cc-body">
      <div class="cc-logo">
        <span class="cc-mark" aria-hidden="true">
          <BrandLogoTermii v-if="company.mark === 'termii'" />
          <BrandLogoTelroi v-else-if="company.mark === 'telroi'" />
          <BrandLogoSotel v-else-if="company.mark === 'sotel'" />
          <img v-else src="/brand/aidi-icon.svg" alt="" width="28" height="26">
        </span>
        <h3 class="cc-name">{{ company.name }}</h3>
      </div>
      <p class="cc-blurb">{{ company.blurb }}</p>
      <NuxtLink v-if="company.href" :to="company.href" class="cc-link" :target="external ? '_blank' : undefined" :rel="external ? 'noopener' : undefined">
        Read more<span class="sr-only"> about {{ company.name }}</span> ›
      </NuxtLink>
    </div>
  </article>
</template>

<style scoped>
.cc { position: relative; display: flex; flex-direction: column; background: #fff; color: var(--c-ink); border-radius: var(--r-lg); overflow: hidden; box-shadow: var(--sh-md); transition: transform var(--dur) var(--ease), box-shadow var(--dur) var(--ease); }
.cc:hover { transform: translateY(-3px); box-shadow: var(--sh-lg); }
.cc-media { position: relative; aspect-ratio: 16 / 10; background: var(--c-navy-2); overflow: hidden; }
.cc-media img, .cc-media video { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
.cc-placeholder { position: absolute; inset: 0; display: flex; align-items: flex-end; padding: 18px 22px;
  background: radial-gradient(120% 90% at 85% 10%, var(--c-blue-deep) 0%, var(--c-navy) 70%); }
.cc-placeholder span { font-family: var(--font-heading); font-size: 30px; color: rgba(255,255,255,.9); }
.cc-body { display: flex; flex-direction: column; gap: 12px; padding: 22px 24px 26px; flex: 1; }
.cc-logo { display: flex; align-items: center; gap: 10px; }
.cc-mark { display: inline-flex; width: 28px; height: 28px; }
.cc-mark :deep(svg), .cc-mark img { width: 100%; height: 100%; object-fit: contain; }
.cc-name { font-family: var(--font-body); font-weight: 600; font-size: 19px; color: var(--c-navy); }
.cc-blurb { font-size: 15px; line-height: 1.55; color: var(--c-ink-soft); display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; }
.cc-link { margin-top: auto; align-self: flex-start; font-size: 14px; font-weight: 500; color: var(--c-blue-deep); text-decoration: underline; text-underline-offset: 3px; }
.cc-link::after { content: ''; position: absolute; inset: 0; }
.cc-link:focus-visible { outline: none; }
.cc:focus-within { outline: 2px solid var(--c-cyan); outline-offset: 3px; }
@media (prefers-reduced-motion: reduce) { .cc, .cc:hover { transition: none; transform: none; } }
</style>
