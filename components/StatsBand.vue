<script setup lang="ts">
// Group-wide numbers across our companies. Update them here when they change.
const STATS = [
  { to: 16, decimals: 0, unit: 'M+', label: 'End customers reached monthly by our companies' },
  { to: 3.5, decimals: 1, unit: 'B+', label: 'Transactions processed across the group' },
  { to: 20, decimals: 0, unit: '', label: 'Startups backed by Aidi Ventures' },
  { to: 70, decimals: 0, unit: '+', label: 'People across the group' }
]
const sectionEl = ref<HTMLElement | null>(null)
const shown = ref(STATS.map(() => '0'))
const final = (i: number): string => STATS[i].to.toFixed(STATS[i].decimals)

onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) {
    shown.value = STATS.map((_, i) => final(i)); return
  }
  const io = new IntersectionObserver(([e]) => {
    if (!e.isIntersecting) return
    io.disconnect()
    const start = performance.now()
    const tick = (now: number): void => {
      const t = Math.min((now - start) / 1500, 1)
      const eased = 1 - Math.pow(1 - t, 3)
      shown.value = STATS.map((s, i) => t < 1 ? (s.to * eased).toFixed(s.decimals) : final(i))
      if (t < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, { threshold: 0.4 })
  if (sectionEl.value) io.observe(sectionEl.value)
  onBeforeUnmount(() => io.disconnect())
})
</script>

<template>
  <section ref="sectionEl" class="block tint-aidi stats-band">
    <div class="wrap">
      <div class="reveal">
        <h2 class="big-headline">Measured in decades,<br>not quarters.</h2>
        <p class="body-lg">
          We build and hold for the long term. We measure what lasts: the customers our companies serve, the founders we back and the teams we grow across the US and Africa.
        </p>
      </div>
      <div class="stats">
        <div v-for="(s, i) in STATS" :key="s.label" class="stat reveal" :class="'reveal-d-' + Math.min(i + 1, 3)">
          <div class="stat-v"><span>{{ shown[i] }}</span><span v-if="s.unit" class="unit">{{ s.unit }}</span></div>
          <div class="stat-k">{{ s.label }}</div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
section.block.stats-band .stat-k { font-family: var(--font-body); font-size: 13px; letter-spacing: .02em; }
</style>
