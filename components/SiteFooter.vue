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
        <nav class="footer-links" aria-label="Footer">
          <NuxtLink to="/about">About</NuxtLink>
          <NuxtLink to="/ethos">Ethos</NuxtLink>
          <NuxtLink to="/insights">Insights</NuxtLink>
          <NuxtLink to="/careers">Careers</NuxtLink>
          <NuxtLink to="/legal">Legal</NuxtLink>
          <NuxtLink to="/aml-policy">AML Policy</NuxtLink>
        </nav>
      </div>
    </div>
    <div class="wrap footer-wrap">
      <div class="footer-disclaimer">
        <p><strong>Disclaimer:</strong> The Aidi Group is a family office. It builds, owns and backs businesses for its own account and does not manage money for outside clients. The Aidi Group is not a broker-dealer, custodian or registered investment adviser.</p>
        <p>Nothing on this site is an offer to sell, or a solicitation of an offer to buy, any security, fund interest or investment advisory service, and nothing on this site is investment, legal or tax advice.</p>
        <p>The companies named on this site, including Aidi Wealth, the Telroi Group, Aidi Ventures and Aidi Haven, are separate legal entities run by their own management teams. Each is responsible for its own products, services and regulatory obligations. References to them are for information only.</p>
        <p>Aidi Wealth's services, and the regulatory disclosures that apply to them, are provided on aidiwealth.com.</p>
        <p>Figures on this site describe the group's companies in aggregate, are unaudited and may change. Past performance is not a guide to future results.</p>
        <p>Information on this site is for general information only. It may include material from third parties that we have not verified and may not be complete or current. Trademarks and logos belong to their respective owners.</p>
      </div>
      <div class="footer-bottom">Corporate Headquarters: 6472 Camden Ave, Suite 204, San Jose, CA 95120, US&nbsp;&nbsp;·&nbsp;&nbsp;© {{ year }} The Aidi Group. All rights reserved.</div>
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
.footer-disclaimer { max-width: none; text-align: left; margin-top: 48px; padding-top: 28px; border-top: 1px solid rgba(255,255,255,.1); display: flex; flex-direction: column; gap: 10px; }
.footer-disclaimer p { font-family: var(--font-body); font-size: .75rem; font-weight: 300; line-height: 1.8; color: rgba(255,255,255,.5); margin: 0; }
.footer-disclaimer p strong { font-weight: 500; color: rgba(255,255,255,.75); text-transform: uppercase; letter-spacing: .05em; font-size: .72rem; }
.footer-bottom { font-family: var(--font-body); font-size: .68rem; font-weight: 300; color: rgba(255,255,255,.5); text-align: center; padding: 16px 0 8px; margin-top: 16px; border-top: 1px solid rgba(255,255,255,.06); }
</style>
