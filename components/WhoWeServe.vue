<script setup lang="ts">
import { AUDIENCES } from '~/composables/useAudiences'
</script>

<template>
  <section class="section tint ws">
    <div class="wrap">
      <span class="eyebrow reveal">Who we work with</span>
      <h2 class="t-display reveal reveal-d-1">Built for people<br><em>building across borders.</em></h2>
      <div class="ws-grid reveal reveal-d-1">
        <NuxtLink v-for="a in AUDIENCES" :key="a.title" :to="a.href" :target="a.href.startsWith('http') ? '_blank' : undefined" class="ws-card">
          <div class="ws-media"><AutoVideo :src="a.video" /></div>
          <div class="ws-shade" />
          <div class="ws-body">
            <span class="ws-tag">{{ a.tag }}</span>
            <span class="ws-title">{{ a.title }}</span>
            <ArrowLink as="span" light :label="a.link" class="ws-link" />
          </div>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<style scoped>
.ws-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2px; margin-top: 64px; border-radius: 28px; overflow: hidden; }
.ws-card { position: relative; height: 440px; overflow: hidden; display: block; color: #fff; background: linear-gradient(160deg, var(--c-blue-deep), var(--c-navy)); }
.ws-media { position: absolute; inset: 0; transition: transform .7s cubic-bezier(.22,1,.36,1); }
.ws-card:hover .ws-media { transform: scale(1.04); }
.ws-shade { position: absolute; inset: 0; background: linear-gradient(to top, rgba(12,26,46,.9) 0%, rgba(12,26,46,.35) 50%, rgba(12,26,46,.05) 100%); }
.ws-body { position: absolute; left: 0; right: 0; bottom: 0; padding: 30px; display: flex; flex-direction: column; }
.ws-tag { font-size: .7rem; font-weight: 500; letter-spacing: .12em; text-transform: uppercase; color: rgba(255,255,255,.8); margin-bottom: 8px; }
.ws-title { font-family: var(--font-heading); font-size: 1.65rem; line-height: 1.2; margin-bottom: 8px; }
.ws-desc { font-size: .88rem; line-height: 1.6; color: rgba(255,255,255,.8); }
.ws-link { align-self: flex-start; margin-top: 16px; }
.ws-card:focus-visible { outline: 3px solid var(--c-cyan); outline-offset: -3px; }
@media (max-width: 880px) { .ws-grid { grid-template-columns: 1fr; } .ws-card { height: 360px; } }
@media (prefers-reduced-motion: reduce) { .ws-card:hover .ws-media { transform: none; } }
</style>
