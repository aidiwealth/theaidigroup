<script setup lang="ts">
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
const about = [
  { to: '/about', label: 'Our story' },
  { to: '/about/values', label: 'Values and philosophy' },
  { to: '/about/leadership', label: 'Leadership' }
]
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
    <nav v-if="path.startsWith('/about')" class="wrap page-subnav" aria-label="About">
      <NuxtLink v-for="l in about" :key="l.to" :to="l.to" exact-active-class="on">{{ l.label }}</NuxtLink>
    </nav>
    <div class="wrap page-body prose">
      <ContentRenderer :value="page" />
    </div>
  </article>
</template>
