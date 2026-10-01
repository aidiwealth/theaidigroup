<script setup lang="ts">
import { FAQ } from '~/composables/useFaq'
const openIdx = ref<number | null>(null)
const toggle = (i: number): void => { openIdx.value = openIdx.value === i ? null : i }
</script>

<template>
  <section class="section faq not-prose">
    <div class="wrap">
      <div class="faq-head">
        <span class="eyebrow reveal">FAQ</span>
        <h2 class="t-display reveal reveal-d-1">Common questions.</h2>
      </div>
      <div class="faq-list">
        <div v-for="(f, i) in FAQ" :key="f.q" class="faq-item" :class="{ open: openIdx === i }">
          <h3>
            <button :id="'faq-q-' + i" type="button" class="faq-q" :aria-expanded="openIdx === i" :aria-controls="'faq-a-' + i" @click="toggle(i)">
              <span>{{ f.q }}</span><span class="faq-toggle" aria-hidden="true">+</span>
            </button>
          </h3>
          <div v-show="openIdx === i" :id="'faq-a-' + i" class="faq-a" role="region" :aria-labelledby="'faq-q-' + i">{{ f.a }}</div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.faq-head { text-align: center; max-width: 560px; margin: 0 auto; }
.faq-list { max-width: 760px; margin: 56px auto 0; border-top: 1px solid rgba(12,26,46,.1); }
.faq-item { border-bottom: 1px solid rgba(12,26,46,.1); }
.faq-item h3 { font: inherit; margin: 0; }
.faq-q { width: 100%; display: flex; justify-content: space-between; align-items: center; gap: 20px; padding: 24px 0; background: none; border: 0; cursor: pointer; text-align: left; font-family: var(--font-body); font-size: 1rem; font-weight: 500; color: var(--c-navy); }
.faq-q:focus-visible { outline: 2px solid var(--c-blue); outline-offset: 4px; }
.faq-toggle { width: 30px; height: 30px; flex-shrink: 0; border-radius: 50%; border: 1px solid rgba(12,26,46,.15); display: flex; align-items: center; justify-content: center; font-size: 1.1rem; transition: all .25s; }
.open .faq-toggle { background: var(--c-navy); border-color: var(--c-navy); color: #fff; transform: rotate(45deg); }
.faq-a { padding: 0 0 24px; font-size: .95rem; line-height: 1.8; color: var(--c-ink-soft); max-width: 680px; }
</style>
