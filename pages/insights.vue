<script setup lang="ts">
const title = 'Insights — The Aidi Group'
const description = 'Perspectives on startups, investing, AI and building wealth across borders.'
useHead({
  title,
  link: [{ rel: 'canonical', href: 'https://theaidigroup.com/insights' }],
  meta: [{ name: 'description', content: description }, { property: 'og:title', content: title }, { property: 'og:description', content: description }]
})
</script>

<template>
  <div class="in-page">
    <InsightsPress />
  </div>
</template>

<style scoped>
.in-page { padding-top: 64px; }
.in-page :deep(.press) { border-top: 0; }
</style>
