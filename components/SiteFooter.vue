<script setup lang="ts">
const site = useAppConfig().site
const year = new Date().getFullYear()
const videoEl = ref<HTMLVideoElement | null>(null)
onMounted(() => {
  const v = videoEl.value
  if (!v) return
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { v.pause(); return }
  if (v.readyState >= 2) v.classList.add('loaded')
  else v.addEventListener('loadeddata', () => v.classList.add('loaded'), { once: true })
})
</script>

<template>
  <footer>
    <div class="footer-video" aria-hidden="true">
      <video ref="videoEl" autoplay loop muted playsinline>
        <source src="https://videos.pexels.com/video-files/856356/856356-hd_1280_720_25fps.mp4" type="video/mp4">
      </video>
    </div>
    <div class="wrap footer-wrap">
      <div class="footer-brand"><AidiWordmark /></div>
      <div class="footer-statement">Building across the US and Africa, for the next generation.</div>
      <div class="footer-meta">
        <a :href="'mailto:' + site.email" class="footer-contact">{{ site.email }}</a>
        <div class="footer-offices">
          <div v-for="o in site.offices" :key="o.city" class="footer-address">
            <strong>{{ o.city }}</strong><br><template v-for="(l, i) in o.lines" :key="i">{{ l }}<br></template>
          </div>
        </div>
        <nav class="footer-links" aria-label="Footer">
          <NuxtLink to="/services">Services</NuxtLink>
          <NuxtLink to="/legal/privacy">Privacy</NuxtLink>
          <NuxtLink to="/legal/terms">Terms</NuxtLink>
          <NuxtLink to="/legal/disclaimer">Disclaimer</NuxtLink>
        </nav>
      </div>
    </div>
    <div class="wrap footer-wrap">
      <div class="footer-legal"><div>© {{ year }} {{ site.legalName }} · All rights reserved.</div></div>
      <div class="footer-disclaimer">
        <p>Nothing on this site is an offer to sell or a solicitation of an offer to buy any security or investment advisory service.</p>
        <p>Companies named on this site are independent businesses run by their own management teams. Aidi Wealth's services and disclosures are on its own website.</p>
      </div>
    </div>
  </footer>
</template>

<style scoped>
footer { background: var(--c-navy); }
footer::before { background: radial-gradient(ellipse at center, rgba(12,26,46,.45) 0%, var(--c-navy) 78%),
  linear-gradient(180deg, rgba(12,26,46,.6) 0%, rgba(12,26,46,.88) 100%); }
.footer-brand { width: 90px; height: 36px; margin: 0 auto 36px; color: #fff; }
.footer-offices { display: flex; gap: 48px; justify-content: center; flex-wrap: wrap; }
.footer-address { font-family: var(--font-body); color: rgba(255,255,255,.72); }
.footer-address strong { color: #fff; font-weight: 500; }
.footer-legal { font-family: var(--font-body); color: rgba(255,255,255,.72); }
.footer-disclaimer p { font-family: var(--font-body); font-size: 13px; line-height: 1.6; color: rgba(255,255,255,.75); }
.footer-links { display: flex; gap: 20px; flex-wrap: wrap; justify-content: center; font-size: 13px; }
.footer-links a { color: rgba(255,255,255,.75); }
.footer-links a:hover { color: #fff; }
a:focus-visible { outline: 2px solid var(--c-cyan); outline-offset: 3px; }
</style>
