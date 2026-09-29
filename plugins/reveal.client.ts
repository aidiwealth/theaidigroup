// Adds .visible to .reveal elements as they scroll into view, on every page.
// Content stays visible if IntersectionObserver is missing or reduced motion is set.
export default defineNuxtPlugin((nuxtApp) => {
  const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
  if (reduce || !('IntersectionObserver' in window)) return
  document.documentElement.classList.add('js-reveal-ready')
  const io = new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target) }
    }
  }, { threshold: 0.15, rootMargin: '0px 0px -10% 0px' })
  const scan = () => document.querySelectorAll<HTMLElement>('.reveal:not(.visible)').forEach((el) => io.observe(el))
  nuxtApp.hook('page:finish', () => { requestAnimationFrame(scan) })
  nuxtApp.hook('app:mounted', () => { requestAnimationFrame(scan) })
})
