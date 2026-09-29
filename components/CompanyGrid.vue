<script setup lang="ts">
import type { Company } from '~/composables/useCompanies'
defineProps<{ companies: Company[] }>()
</script>

<template>
  <div class="cg">
    <CompanyCard v-for="c in companies" :key="c.slug" :company="c" />
  </div>
</template>

<style scoped>
.cg { display: grid; grid-template-columns: repeat(3, 1fr); gap: 28px; }
@media (max-width: 1024px) { .cg { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 640px) { .cg { grid-template-columns: 1fr; gap: 20px; } }
</style>
