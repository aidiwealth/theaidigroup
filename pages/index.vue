<script setup lang="ts">
// pages/index.vue — composes the institutional single-page narrative.

// Scroll-reveal observer for any .reveal element. Adds .visible when intersected.
// Only opts into the hide-then-animate behavior if IntersectionObserver is supported
// AND the user hasn't asked for reduced motion. Otherwise content stays visible by default.
onMounted(() => {
  const prefersReducedMotion = typeof window.matchMedia === 'function'
    && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const supportsReveal = 'IntersectionObserver' in window && !prefersReducedMotion

  if (!supportsReveal) return // content already visible via CSS default

  document.documentElement.classList.add('js-reveal-ready')

  const reveals = document.querySelectorAll<HTMLElement>('.reveal')
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
          io.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.15, rootMargin: '0px 0px -10% 0px' }
  )
  reveals.forEach((el) => io.observe(el))
})
</script>

<template>
  <main>
    <TheHero />
    <TheWhatWeDo />
    <TheCompanies />
    <ThePlatform />
    <ThePress />
    <TheQuote />
    <TheFooter />
    <TheBackToTop />
    <BrandModal />
  </main>
</template>
