<script setup lang="ts">
definePageMeta({ darkHero: true })
const route = useRoute()
const path = route.path.replace(/\/+$/, '') || '/'
const { data: page } = await useAsyncData('page:' + path, () => queryContent().where({ _path: path }).findOne())
if (!page.value) throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
const title = page.value.title + ' — The Aidi Group'
useHead({
  title,
  link: [{ rel: 'canonical', href: 'https://theaidigroup.com' + path }],
  meta: [
    { name: 'description', content: page.value.description },
    { property: 'og:title', content: title },
    { property: 'og:description', content: page.value.description },
    { property: 'og:url', content: 'https://theaidigroup.com' + path }
  ]
})
</script>

<template>
  <article v-if="page" class="page">
    <header class="page-hero">
      <div class="wrap">
        <p v-if="page.eyebrow" class="page-eyebrow">{{ page.eyebrow }}</p>
        <h1>{{ page.title }}</h1>
        <p v-if="page.lead" class="page-lead">{{ page.lead }}</p>
      </div>
    </header>
    <div class="wrap page-body prose" :class="{ manifesto: page.manifesto }">
      <p v-if="path.startsWith('/insights/')" class="page-back"><NuxtLink to="/insights">← All insights</NuxtLink></p>
      <ContentRenderer :value="page" />
      <p v-if="path.startsWith('/insights/')" class="page-note">For general information only. Not investment, legal or tax advice.</p>
    </div>
  </article>
</template>
