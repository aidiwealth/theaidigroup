<script setup lang="ts">
definePageMeta({ darkHero: true })
const title = 'Our ethos — The Aidi Group'
const description = 'What we believe, and the kind of people we build with.'
useHead({
  title,
  link: [{ rel: 'canonical', href: 'https://theaidigroup.com/ethos' }],
  meta: [{ name: 'description', content: description }, { property: 'og:title', content: title }, { property: 'og:description', content: description }]
})
const PRINCIPLES = [
  { title: 'We start as operators.', body: 'Before we backed anyone, we built companies ourselves, and we still do. We know what it takes to ship, sell and hire when no one is watching.' },
  { title: 'We bridge markets.', body: 'Talent, capital and customers should move freely between the US and Africa, in both directions. We build the rails that let them.' },
  { title: 'We are direct.', body: 'We say what we think, early, and we expect the same in return. Not everyone likes that. Most who work with us come to rely on it.' },
  { title: 'We keep our circle small and our standards high.', body: 'Every company in the group is run by its own team, and every one of them is held to the same bar.' },
  { title: 'We think in generations.', body: 'We hold what we build. We measure ourselves by what we hand on, not by what we sell.' }
]
</script>

<template>
  <div class="ethos">
    <header class="et-hero">
      <div class="wrap et-center">
        <span class="eyebrow light">The Aidi Group</span>
        <h1 class="t-display">Our ethos</h1>
      </div>
    </header>

    <section class="section et-open">
      <div class="wrap et-center">
        <p class="et-statement reveal">The builders. The operators. The ones who fix it themselves. The founders who build for the world from wherever they start.</p>
        <p class="et-sub reveal reveal-d-1">These are the people we work with, and the people we try to be.</p>
      </div>
    </section>

    <section class="section tint et-principles">
      <div class="wrap">
        <ol class="et-list">
          <li v-for="(p, i) in PRINCIPLES" :key="p.title" class="et-item reveal">
            <span class="et-num">{{ String(i + 1).padStart(2, '0') }}</span>
            <h2 class="et-title">{{ p.title }}</h2>
            <p class="et-body">{{ p.body }}</p>
          </li>
        </ol>
      </div>
    </section>

    <section class="et-close">
      <div class="wrap et-center">
        <p class="et-close-text reveal">We are called investors, owners, a family office. We think of ourselves as builders for the long term.</p>
        <p class="et-motto reveal reveal-d-1">Built by operators. Backed with conviction. Held for generations.</p>
      </div>
    </section>
  </div>
</template>

<style scoped>
.et-center { text-align: center; max-width: 860px; }
.et-hero { background: var(--c-navy); padding: 170px 0 90px; }
.et-hero .t-display { color: #fff; }
.et-open { padding: 120px 0; }
.et-statement { font-family: var(--font-heading); font-size: clamp(24px, 3vw, 38px); line-height: 1.3; color: var(--c-navy); }
.et-sub { margin-top: 28px; font-family: var(--font-heading); font-style: italic; font-size: clamp(18px, 1.8vw, 22px); color: var(--c-blue-deep); }
.et-list { list-style: none; padding: 0; margin: 0 auto; max-width: 960px; }
.et-item { display: grid; grid-template-columns: 80px 1fr 1.2fr; gap: 32px; align-items: baseline; padding: 44px 0; border-top: 1px solid var(--c-rule); }
.et-item:last-child { border-bottom: 1px solid var(--c-rule); }
.et-num { font-family: var(--font-body); font-size: 12px; letter-spacing: .14em; color: var(--c-blue); }
.et-title { font-family: var(--font-heading); font-weight: 500; font-size: clamp(20px, 2vw, 26px); line-height: 1.2; color: var(--c-navy); }
.et-body { font-size: 15px; line-height: 1.75; color: var(--c-ink-soft); }
.et-close { background: var(--c-navy); padding: 120px 0; }
.et-close-text { font-family: var(--font-heading); font-size: clamp(22px, 2.6vw, 32px); line-height: 1.35; color: #fff; }
.et-motto { margin-top: 32px; font-family: var(--font-heading); font-style: italic; font-size: clamp(18px, 1.8vw, 22px); color: var(--c-cyan); }
@media (max-width: 880px) {
  .et-hero { padding: 130px 0 70px; }
  .et-open, .et-close { padding: 80px 0; }
  .et-item { grid-template-columns: 1fr; gap: 10px; padding: 32px 0; }
}
</style>
