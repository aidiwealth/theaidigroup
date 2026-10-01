<script setup lang="ts">
// Underlined serif link with a ↗ arrow, used for every call to action on the site.
const props = withDefaults(defineProps<{ to?: string; label: string; light?: boolean; editorial?: boolean; as?: 'link' | 'span' }>(),
  { to: '', light: false, editorial: false, as: 'link' })
const external = computed(() => props.to.startsWith('http'))
</script>

<template>
  <span v-if="as === 'span'" class="cta-arrow" :class="{ light, editorial }">{{ label }}<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 12L12 4 M5 4h7v7" /></svg></span>
  <NuxtLink v-else :to="to" class="cta-arrow" :class="{ light, editorial }" :target="external ? '_blank' : undefined" :rel="external ? 'noopener' : undefined">{{ label }}<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 12L12 4 M5 4h7v7" /></svg></NuxtLink>
</template>
