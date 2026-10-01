<script setup lang="ts">
import { SECTORS } from '~/composables/useSectors'
const sets = [0, 1, 2]
</script>

<template>
  <section class="section sm">
    <div class="wrap">
      <span class="eyebrow reveal">Our sectors</span>
      <h2 class="t-display reveal reveal-d-1">Four sectors.<br><em>One long view.</em></h2>
    </div>
    <div class="sm-outer reveal reveal-d-2">
      <div class="sm-track">
        <div v-for="s in sets" :key="s" class="sm-set" :aria-hidden="s > 0 ? 'true' : undefined">
          <a v-for="x in SECTORS" :key="x.key + s" :href="x.href || '/#sectors'" :target="x.href ? '_blank' : undefined" :rel="x.href ? 'noopener' : undefined" class="sm-pill" :tabindex="s > 0 ? -1 : undefined">
            <span class="sm-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" v-html="x.icon" /></span>
            <span class="sm-tag">{{ x.company }}</span>
            <span class="sm-name">{{ x.sector }}</span>
            <span class="sm-desc">{{ x.pill }}</span>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.sm { padding-bottom: 40px; }
.sm-outer { position: relative; overflow: hidden; margin-top: 56px;
  -webkit-mask-image: linear-gradient(to right, transparent 0, #000 7%, #000 93%, transparent 100%);
  mask-image: linear-gradient(to right, transparent 0, #000 7%, #000 93%, transparent 100%); }
.sm-track { display: flex; width: max-content; animation: sm-scroll 40s linear infinite; }
.sm-track:hover, .sm-track:focus-within { animation-play-state: paused; }
.sm-set { display: flex; gap: 16px; padding-right: 16px; }
.sm-pill { flex-shrink: 0; width: 290px; padding: 36px 32px; border-radius: 28px; background: var(--c-paper-2); border: 1px solid rgba(12,26,46,.07); display: flex; flex-direction: column; transition: all .3s ease; color: var(--c-navy); }
.sm-pill:hover, .sm-pill:focus-visible { background: var(--c-navy); transform: translateY(-4px); box-shadow: var(--sh-lg); outline: none; }
.sm-icon { width: 44px; height: 44px; border-radius: 12px; background: rgba(12,26,46,.06); display: flex; align-items: center; justify-content: center; margin-bottom: 24px; transition: background .3s; }
.sm-icon svg { width: 20px; height: 20px; }
.sm-tag { align-self: flex-start; font-size: .65rem; font-weight: 600; letter-spacing: .1em; text-transform: uppercase; padding: 3px 10px; border-radius: 100px; background: rgba(12,26,46,.06); color: var(--c-muted); margin-bottom: 16px; transition: all .3s; }
.sm-name { font-family: var(--font-heading); font-size: 1.5rem; margin-bottom: 10px; line-height: 1.2; transition: color .3s; }
.sm-desc { font-size: .86rem; line-height: 1.65; color: var(--c-ink-soft); transition: color .3s; }
.sm-pill:hover .sm-name, .sm-pill:hover .sm-desc, .sm-pill:hover .sm-icon, .sm-pill:focus-visible .sm-name, .sm-pill:focus-visible .sm-desc, .sm-pill:focus-visible .sm-icon { color: #fff; }
.sm-pill:hover .sm-icon, .sm-pill:focus-visible .sm-icon { background: rgba(255,255,255,.1); }
.sm-pill:hover .sm-tag, .sm-pill:focus-visible .sm-tag { background: rgba(255,255,255,.12); color: rgba(255,255,255,.75); }
@keyframes sm-scroll { from { transform: translateX(0); } to { transform: translateX(-33.333%); } }
@media (prefers-reduced-motion: reduce) {
  .sm-track { animation: none; }
  .sm-outer { overflow-x: auto; -webkit-mask-image: none; mask-image: none; }
  .sm-set[aria-hidden] { display: none; }
}
</style>
