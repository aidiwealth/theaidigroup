<script setup lang="ts">
// ThePlatform.vue
// The stats section on the Aidi-navy background. Counters animate when scrolled into view.

const sectionEl = ref<HTMLElement | null>(null)

onMounted(() => {
  // Animate counters when they enter the viewport
  const counters = sectionEl.value?.querySelectorAll<HTMLElement>('[data-counter]') || []
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        const el = entry.target as HTMLElement
        if (el.dataset.animated === 'true') return
        el.dataset.animated = 'true'

        const target = parseFloat(el.dataset.to || '0')
        const decimals = parseInt(el.dataset.decimals || '0', 10)
        const duration = 1500
        const start = performance.now()

        function tick(now: number) {
          const t = Math.min((now - start) / duration, 1)
          // easeOutCubic
          const eased = 1 - Math.pow(1 - t, 3)
          const val = target * eased
          el.textContent = decimals > 0 ? val.toFixed(decimals) : Math.floor(val).toString()
          if (t < 1) requestAnimationFrame(tick)
          else el.textContent = decimals > 0 ? target.toFixed(decimals) : String(target)
        }
        requestAnimationFrame(tick)
        observer.unobserve(entry.target)
      })
    },
    { threshold: 0.4 }
  )
  counters.forEach((c) => observer.observe(c))
})
</script>

<template>
  <section ref="sectionEl" class="block tint-aidi" id="investors">
    <div class="wrap">
      <div class="reveal">
        <h2 class="big-headline">The infrastructure layer<br>for the next decade.</h2>
        <p class="body-lg">
          We back companies for the long term. We measure what matters: scale, depth, and operational reach across markets — not features or short-term wins.
        </p>
      </div>

      <div class="stats">
        <div class="stat reveal reveal-d-1">
          <div class="stat-v"><span data-counter data-to="16">0</span><span class="unit">M+</span></div>
          <div class="stat-k">End Customers Monthly</div>
        </div>
        <div class="stat reveal reveal-d-2">
          <div class="stat-v"><span data-counter data-to="3.5">0</span><span class="unit">B+</span></div>
          <div class="stat-k">Transactions Processed</div>
        </div>
        <div class="stat reveal reveal-d-3">
          <div class="stat-v"><span data-counter data-to="70">0</span><span class="unit">+</span></div>
          <div class="stat-k">Employees Across the Group</div>
        </div>
        <div class="stat reveal reveal-d-3">
          <div class="stat-v"><span data-counter data-to="3">0</span></div>
          <div class="stat-k">Portfolio Companies</div>
        </div>
      </div>
    </div>
  </section>
</template>
