<script setup lang="ts">
// Home: a single row of featured companies. Full list lives on /companies.
import { COMPANIES } from '~/composables/useCompanies'
const featured = COMPANIES.filter((c) => c.featured)
</script>

<template>
  <section class="block home-companies" id="companies">
    <div class="wrap">
      <div class="reveal hc-head">
        <h2 class="hc-title">Our companies.</h2>
        <p class="hc-lead">
          We build and hold infrastructure companies, and back founders through Aidi Ventures. Each company is run by its own leadership team.
        </p>
      </div>
      <CompanyGrid :companies="featured" class="reveal reveal-d-1" />
      <NuxtLink to="/companies" class="hc-all">See all our companies ›</NuxtLink>
    </div>
  </section>
</template>

<style scoped>
.home-companies { background: var(--c-navy); color: #fff; }
.hc-head { display: grid; grid-template-columns: 1fr 1fr; gap: 40px; align-items: end; margin-bottom: 56px; }
.hc-title { color: #fff; font-weight: 500; font-size: clamp(44px, 6vw, 88px); line-height: 1; letter-spacing: -.01em; }
.hc-lead { font-size: 17px; line-height: 1.6; color: rgba(255,255,255,.8); max-width: 48ch; }
.hc-all { display: inline-block; margin-top: 40px; font-size: 15px; color: #fff; text-decoration: underline; text-underline-offset: 4px; }
.hc-all:focus-visible { outline: 2px solid var(--c-cyan); outline-offset: 3px; }
@media (max-width: 880px) { .hc-head { grid-template-columns: 1fr; gap: 20px; } }
</style>
