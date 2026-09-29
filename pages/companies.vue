<script setup lang="ts">
import { COMPANIES, PILLARS } from '~/composables/useCompanies'
const groups = PILLARS.map((pillar) => ({ pillar, companies: COMPANIES.filter((c) => c.pillar === pillar) }))
  .filter((g) => g.companies.length > 0)
const title = 'Our companies — The Aidi Group'
const description = 'The companies of The Aidi Group, grouped by pillar: Build, Back, Bridge and Host.'
useHead({
  title,
  link: [{ rel: 'canonical', href: 'https://theaidigroup.com/companies' }],
  meta: [{ name: 'description', content: description }, { property: 'og:title', content: title }, { property: 'og:description', content: description }]
})
</script>

<template>
  <div>
    <header class="page-hero">
      <div class="wrap">
        <p class="page-eyebrow">Companies</p>
        <h1>Our companies</h1>
        <p class="page-lead">Independent businesses run by their own management teams, held for the long term.</p>
      </div>
    </header>
    <section class="cp">
      <div class="wrap">
        <div v-for="g in groups" :id="g.pillar.toLowerCase()" :key="g.pillar" class="cp-group">
          <h2 class="cp-pillar">{{ g.pillar }}</h2>
          <CompanyGrid :companies="g.companies" />
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.cp { background: var(--c-navy); padding: 8px 0 110px; border-top: 1px solid rgba(255,255,255,.08); }
.cp-group { padding-top: 56px; }
.cp-pillar { font-weight: 500; font-size: clamp(30px, 3vw, 42px); color: #fff; margin-bottom: 24px; }
</style>
