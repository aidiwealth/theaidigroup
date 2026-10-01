<script setup lang="ts">
const props = defineProps<{ src: string }>()
const el = ref<HTMLVideoElement | null>(null)
const load = ref(false)

onMounted(() => {
  const v = el.value
  if (!v) return
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  const io = new IntersectionObserver(([e]) => {
    if (e.isIntersecting && !load.value) {
      load.value = true
      nextTick(() => { v.load(); playOnly(v) })
    } else if (e.isIntersecting) {
      playOnly(v)
    } else {
      v.pause()
    }
  }, { threshold: 0.25 })
  io.observe(v)
  onBeforeUnmount(() => io.disconnect())
})
</script>

<template>
  <video ref="el" class="lazy-video" muted loop playsinline preload="none" aria-hidden="true">
    <source v-if="load" :src="props.src" type="video/mp4">
  </video>
</template>

<style scoped>
.lazy-video { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
</style>
