<script setup lang="ts">
// TheBackToTop.vue
// Fixed-position circular button appearing past the hero.

const visible = ref(false)
const btnEl = ref<HTMLButtonElement | null>(null)

function scrollTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(() => {
  let ticking = false
  function update() {
    visible.value = window.scrollY > window.innerHeight * 0.8
    ticking = false
  }
  window.addEventListener('scroll', () => {
    if (!ticking) { requestAnimationFrame(update); ticking = true }
  }, { passive: true })
  update()
})
</script>

<template>
  <button
    ref="btnEl"
    type="button"
    class="back-to-top"
    :class="{ visible }"
    aria-label="Back to top"
    @click="scrollTop"
  >
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 14V2 M3 7L8 2L13 7" />
    </svg>
  </button>
</template>
