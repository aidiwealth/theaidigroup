<script setup lang="ts">
import { HERO_VIDEOS } from '~/composables/useSectors'
</script>

<template>
  <section class="hh">
    <div class="wrap hh-top">
      <div>
        <h1 class="t-hero">Built by operators.<br><em>Held for generations.</em></h1>
        <div class="hh-ctas">
          <ArrowLink to="/#sectors" label="Our sectors" />
        </div>
      </div>
      <div class="hh-right">
        <p>The Aidi Group builds and backs businesses in fintech, AI and telecoms, investment and real estate, connecting the US and Africa, and holds them for the long term.</p>
        <dl class="hh-stats">
          <div><dt>4</dt><dd>Countries</dd></div>
          <div><dt>$750M+</dt><dd>Raised by portfolio from investors</dd></div>
        </dl>
      </div>
    </div>
    <div class="wrap hh-media">
      <div v-for="v in HERO_VIDEOS" :key="v.src" class="hh-panel">
        <AutoVideo :src="v.src" />
        <div class="hh-shade" />
        <span class="hh-cap">{{ v.caption }}</span>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hh { background: #fff; padding-top: 150px; overflow: hidden; min-height: 100vh; min-height: 100svh; display: flex; flex-direction: column; }
.hh-top, .hh-media { width: 100%; }
.hh-top { display: grid; grid-template-columns: 1.3fr 1fr; gap: 60px; align-items: end; padding-bottom: 60px; }
.hh-badge { display: inline-flex; align-items: center; gap: 8px; padding: 7px 16px; border-radius: 100px; border: 1px solid rgba(12,26,46,.12); font-size: .78rem; font-weight: 500; color: var(--c-ink-soft); margin-bottom: 32px; background: #fff; }
.hh-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--c-blue); animation: hh-pulse 2.5s infinite; }
@keyframes hh-pulse { 0%, 100% { opacity: 1 } 50% { opacity: .3 } }
.t-hero { font-family: var(--font-heading); font-size: clamp(2.8rem, 5.4vw, 4.6rem); font-weight: 400; line-height: 1.04; letter-spacing: -.02em; color: var(--c-navy); }
.hh-ctas { display: flex; align-items: center; gap: 36px; margin-top: 40px; flex-wrap: wrap; }
.hh-right p { font-size: 1.05rem; line-height: 1.8; color: var(--c-ink-soft); max-width: 440px; margin-bottom: 32px; }
.hh-stats { display: grid; grid-template-columns: auto auto; justify-content: start; gap: 56px; }
.hh-stats dt { font-family: var(--font-heading); font-size: 2.2rem; line-height: 1; color: var(--c-navy); }
.hh-stats dd { font-size: .78rem; color: var(--c-muted); margin-top: 8px; white-space: nowrap; }
@media (max-width: 880px) { .hh-stats dd { white-space: normal; } }
.hh-media { display: grid; grid-template-columns: 1.4fr .9fr .9fr; gap: 12px; flex: 1 1 auto; min-height: 340px; }
.hh-panel { position: relative; border-radius: 16px 16px 0 0; overflow: hidden; background: linear-gradient(160deg, var(--c-blue-deep), var(--c-navy)); }
.hh-shade { position: absolute; inset: 0; background: linear-gradient(to top, rgba(12,26,46,.8) 0%, rgba(12,26,46,.45) 55%, rgba(12,26,46,.3) 100%); }
.hh-cap { position: absolute; left: 18px; bottom: 16px; font-size: .85rem; color: #fff; letter-spacing: .03em; }
@media (max-width: 880px) {
  .hh { padding-top: 110px; }
  .hh-top { grid-template-columns: 1fr; gap: 36px; padding-bottom: 40px; }
  .hh-media { grid-template-columns: 1fr; min-height: 260px; }
  .hh-panel:not(:first-child) { display: none; }
  .hh-stats { gap: 28px; }
}
@media (prefers-reduced-motion: reduce) { .hh-dot { animation: none; } }
</style>
