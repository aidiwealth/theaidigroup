<script setup lang="ts">
// ThePress.vue
// Selected coverage — one featured card + tabular list.
// Press items are loaded from the usePress composable.

const { featured, list } = usePress()
</script>

<template>
  <section class="press" id="press">
    <div class="wrap">
      <div class="press-head reveal">
        <div>
          <div class="press-eyebrow">Selected coverage</div>
        </div>
        <div>
          <h2 class="press-title">In the press.</h2>
          <p class="press-subtitle">External recognition of the Group and its portfolio companies — from the Financial Times to operator and industry coverage.</p>
        </div>
      </div>

      <a :href="featured.url" target="_blank" rel="noopener" class="press-featured reveal">
        <div class="press-featured-header">
          <div class="press-featured-outlet">{{ featured.outlet }}</div>
          <div class="press-featured-meta">
            <span>{{ featured.date }}</span>
            <span class="dot">·</span>
            <span>{{ featured.meta }}</span>
          </div>
        </div>
        <h3 class="press-featured-headline">{{ featured.headline }}</h3>
        <p class="press-featured-excerpt">{{ featured.excerpt }}</p>
        <span class="press-featured-cta">
          Read the coverage
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round">
            <path d="M4 12L12 4 M5 4h7v7" />
          </svg>
        </span>
      </a>

      <div class="press-list">
        <a v-for="item in list" :key="item.url" :href="item.url" target="_blank" rel="noopener" class="press-item reveal">
          <div class="press-date">{{ item.date }}</div>
          <div class="press-headline">{{ item.headline }}</div>
          <div class="press-outlet">{{ item.outlet }}</div>
          <div class="press-arrow">
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round">
              <path d="M4 12L12 4 M5 4h7v7" />
            </svg>
          </div>
        </a>
      </div>
    </div>
  </section>
</template>
