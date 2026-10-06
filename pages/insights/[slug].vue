<script setup lang="ts">
// An Insights article, written and published in Aidi (Blog).
const API = 'https://app.theaidigroup.com'
const slug = useRoute().params.slug as string
interface Post { slug: string; title: string; description: string | null; tag: string | null; html: string; cover: string | null; author_name: string | null; published_at: string; readingTime: number; seo_title: string | null; seo_description: string | null }
const { data: post, error } = await useAsyncData('insight-' + slug, () => $fetch<Post>(API + '/api/public/blog/' + slug))
if (error.value) throw createError({ statusCode: 404, statusMessage: 'Article not found', fatal: true })
const title = computed(() => (post.value?.seo_title || post.value?.title || 'Insights') + ' — The Aidi Group')
const desc = computed(() => post.value?.seo_description || post.value?.description || '')
useHead({ title, link: [{ rel: 'canonical', href: 'https://theaidigroup.com/insights/' + slug }],
  meta: [{ name: 'description', content: desc }, { property: 'og:title', content: title }, { property: 'og:description', content: desc }, { property: 'og:type', content: 'article' }, ...(post.value?.cover ? [{ property: 'og:image', content: post.value.cover }] : [])] })
const date = computed(() => post.value ? new Date(post.value.published_at + 'T00:00:00Z').toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }) : '')
</script>

<template>
  <article v-if="post">
    <header class="ar-hero">
      <div class="wrap ar-hero-in">
        <NuxtLink to="/insights" class="ar-back">← All insights</NuxtLink>
        <span class="eyebrow light">{{ post.tag || 'Insights' }}</span>
        <h1 class="t-display ar-title">{{ post.title }}</h1>
        <p v-if="post.description" class="t-subhead ar-dek">{{ post.description }}</p>
        <p class="ar-meta">{{ [post.author_name, date, post.readingTime + ' min read'].filter(Boolean).join(' · ') }}</p>
      </div>
    </header>
    <div v-if="post.cover" class="wrap ar-cover"><img :src="post.cover" :alt="post.title"></div>
    <div class="wrap page-body prose ar-body" v-html="post.html" />
    <div class="wrap ar-foot"><NuxtLink to="/insights" class="ar-back dark">← All insights</NuxtLink></div>
  </article>
</template>

<style scoped>
.ar-hero { background: var(--c-navy); padding: 160px 0 70px; }
.ar-hero-in { max-width: 860px; }
.ar-back { display: inline-block; color: rgba(255,255,255,.7); text-decoration: none; font-size: 14px; margin-bottom: 22px; }
.ar-back.dark { color: var(--c-blue-deep); }
.ar-title { color: #fff; margin: 12px 0 16px; }
.ar-dek { color: rgba(255,255,255,.75); }
.ar-meta { color: rgba(255,255,255,.6); font-size: 14px; margin-top: 18px; }
.ar-cover { max-width: 980px; margin-top: -40px; }
.ar-cover img { width: 100%; max-height: 520px; object-fit: cover; display: block; }
.ar-body { max-width: 760px; padding-top: 48px; padding-bottom: 32px; font-size: 18px; line-height: 1.7; }
.ar-body :deep(img) { max-width: 100%; height: auto; margin: 24px 0; }
.ar-body :deep(h3) { margin: 36px 0 12px; }
.ar-foot { max-width: 760px; padding-bottom: 80px; }
@media (max-width: 880px) { .ar-hero { padding: 120px 0 56px; } }
</style>
