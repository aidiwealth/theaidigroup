<script setup lang="ts">
interface Item { _path: string; title: string; description: string; tag: string; readingTime: number }
const props = withDefaults(defineProps<{ limit?: number; eyebrow?: string; title?: string; subtitle?: string; more?: boolean }>(), {
  limit: 0, eyebrow: 'Selected writing', title: 'Insights.', more: false,
  subtitle: 'Perspectives on startups, investing, AI and building wealth across borders — from the Group and its founders.'
})
const API = 'https://app.theaidigroup.com'
const { data } = await useAsyncData('insights-list', () =>
  $fetch<{ posts: { path: string; title: string; description: string | null; tag: string | null; readingTime: number }[] }>(API + '/api/public/blog')
    .then((r) => r.posts.map((x) => ({ _path: x.path, title: x.title, description: x.description ?? '', tag: x.tag ?? 'Insights', readingTime: x.readingTime })))
    .catch(() => []))
const items = computed<Item[]>(() => (data.value || []) as unknown as Item[])
const featured = computed(() => items.value[0])
const list = computed(() => props.limit ? items.value.slice(1, props.limit) : items.value.slice(1))
</script>

<template>
  <section v-if="featured" class="press" id="insights">
    <div class="wrap">
      <div class="press-head reveal">
        <div><div class="press-eyebrow">{{ eyebrow }}</div></div>
        <div>
          <h2 class="press-title">{{ title }}</h2>
          <p class="press-subtitle">{{ subtitle }}</p>
        </div>
      </div>

      <NuxtLink :to="featured._path" class="press-featured reveal">
        <div class="press-featured-header">
          <div class="press-featured-outlet">{{ featured.tag }}</div>
          <div class="press-featured-meta"><span>Featured</span><span class="dot">·</span><span>{{ featured.readingTime }} min read</span></div>
        </div>
        <h3 class="press-featured-headline">{{ featured.title }}</h3>
        <p class="press-featured-excerpt">{{ featured.description }}</p>
        <span class="press-featured-cta">Read the article
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 12L12 4 M5 4h7v7" /></svg>
        </span>
      </NuxtLink>

      <div class="press-list">
        <NuxtLink v-for="item in list" :key="item._path" :to="item._path" class="press-item reveal">
          <div class="press-date">{{ item.tag }}</div>
          <div class="press-headline">{{ item.title }}</div>
          <div class="press-outlet">{{ item.readingTime }} min read</div>
          <div class="press-arrow" aria-hidden="true">
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12L12 4 M5 4h7v7" /></svg>
          </div>
        </NuxtLink>
      </div>
      <div v-if="more" class="press-more"><ArrowLink to="/insights" label="See all insights" editorial /></div>
    </div>
  </section>
</template>

<style scoped>
.press-subtitle, .press-featured-excerpt, .press-outlet, .press-date { font-family: var(--font-body); font-style: normal; }
.press-featured-excerpt { font-size: 15px; color: var(--c-ink-soft); }
.press-date, .press-outlet { font-size: 13px; color: var(--c-muted); }
.press-more { margin-top: 36px; }
.press-featured:focus-visible, .press-item:focus-visible, .press-more:focus-visible { outline: 2px solid var(--c-blue); outline-offset: 3px; }
</style>
