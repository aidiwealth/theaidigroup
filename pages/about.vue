<script setup lang="ts">
definePageMeta({ darkHero: true })
const title = 'About — The Aidi Group'
const description = 'How The Aidi Group began, what we believe and the people behind it.'
useHead({
  title,
  link: [{ rel: 'canonical', href: 'https://theaidigroup.com/about' }],
  meta: [{ name: 'description', content: description }, { property: 'og:title', content: title }, { property: 'og:description', content: description }]
})
const VALUES = [
  { title: 'Build what lasts', desc: 'We start and run companies that others can depend on, and we build them to outlast us.',
    icon: '<polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/>' },
  { title: 'Back people early', desc: 'We invest in talented founders before the rest of the market sees them.',
    icon: '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>' },
  { title: 'Global by design', desc: 'We connect the US and Africa in both directions: capital, talent and customers.',
    icon: '<circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>' },
  { title: 'Earn trust', desc: 'We say what we do, do what we say, and keep our partners\' information private.',
    icon: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>' },
  { title: 'Operators first', desc: 'We have built and run companies ourselves, and we back others the same way.',
    icon: '<line x1="3" y1="22" x2="21" y2="22"/><line x1="6" y1="18" x2="6" y2="11"/><line x1="10" y1="18" x2="10" y2="11"/><line x1="14" y1="18" x2="14" y2="11"/><line x1="18" y1="18" x2="18" y2="11"/><polygon points="12 2 20 7 4 7"/>' },
  { title: 'Long-term thinking', desc: 'We make decisions we would be proud to explain to the next generation.',
    icon: '<path d="M12 22V7"/><path d="M5 3a7 7 0 0 0 7 7"/><path d="M19 3a7 7 0 0 1-7 7"/>' }
]
</script>

<template>
  <div class="about">
    <header class="ab-hero">
      <div class="wrap ab-hero-center">
        <span class="eyebrow light">Our story</span>
        <h1 class="t-display">We're building a family office<br><em>held for generations.</em></h1>
        <p class="t-subhead">The Aidi Group began with operators. We build and back businesses across the US and Africa, and hold them for the long term.</p>
      </div>
    </header>

    <section class="section">
      <div class="wrap">
        <div class="ab-body">
          <h2 class="ab-h">Why we built The Aidi Group.</h2>
          <p class="ab-p">The Aidi Group began with operators. Our founder built Termii, a communications platform for businesses across Africa, from the ground up. Building it taught us what it takes to create infrastructure that others rely on every day.</p>
          <p class="ab-p">Today we work across four sectors: fintech through Aidi Wealth, AI and telecoms through the Telroi Group, investment through Aidi Ventures, and real estate through Aidi Haven. We work from San Jose and Lagos.</p>
          <p class="ab-p">We are building for decades, not quarters. We hold our companies for the long term, grow them with patient capital, and intend to hand a stronger group to the next generation.</p>
          <blockquote class="ab-quote">
            <p>"We build and back businesses we would be proud to hand to the next generation."</p>
            <p class="ab-cite">— The Aidi Group philosophy</p>
          </blockquote>
        </div>

        <div class="ab-body ab-values">
          <span class="eyebrow reveal">Our values</span>
          <h2 class="t-display reveal reveal-d-1">What we believe.</h2>
          <div class="ab-grid">
            <div v-for="(v, i) in VALUES" :key="v.title" class="ab-card reveal" :class="'reveal-d-' + ((i % 3) + 1)">
              <div class="ab-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" v-html="v.icon" /></div>
              <h3 class="ab-card-title">{{ v.title }}</h3>
              <p class="ab-card-desc">{{ v.desc }}</p>
            </div>
          </div>
          <p class="ab-note">We are not a multi-family office: Aidi Wealth serves its own clients separately, under its own regulation. We are not a trading desk: we hold businesses for the long term.</p>
        </div>
      </div>
    </section>

    <TeamSection id="team" />
  </div>
</template>

<style scoped>
.ab-hero { background: var(--c-navy); padding: 170px 0 90px; }
.ab-hero-center { text-align: center; max-width: 880px; }
.ab-hero .t-display { color: #fff; margin-bottom: 20px; }
.ab-hero .t-display em { color: var(--c-cyan); }
.ab-hero .t-subhead { color: rgba(255,255,255,.72); margin: 0 auto; }
.ab-body { max-width: 800px; margin: 0 auto; }
.ab-h { max-width: none; font-family: var(--font-body); font-size: .78rem; font-weight: 600; letter-spacing: .1em; text-transform: uppercase; color: var(--c-navy); margin-bottom: 14px; }
.ab-p { font-size: 1rem; line-height: 1.85; color: var(--c-ink-soft); margin-bottom: 16px; }
.ab-quote { background: var(--c-paper-2); border-radius: 20px; padding: 48px; margin: 40px 0 0; }
.ab-quote p { font-family: var(--font-heading); font-size: 1.7rem; font-style: italic; line-height: 1.5; color: var(--c-navy); }
.ab-quote .ab-cite { font-family: var(--font-body); font-style: normal; font-size: .85rem; color: var(--c-muted); margin-top: 16px; }
.ab-values { margin-top: 96px; }
.ab-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; margin-top: 56px; }
.ab-card { background: var(--c-paper-2); border-radius: 20px; padding: 36px; }
.ab-icon { width: 44px; height: 44px; border-radius: 12px; background: rgba(12,26,46,.06); display: flex; align-items: center; justify-content: center; margin-bottom: 20px; color: var(--c-navy); }
.ab-icon svg { width: 18px; height: 18px; }
.ab-card-title { font-family: var(--font-heading); font-size: 1.35rem; font-weight: 400; color: var(--c-navy); margin-bottom: 10px; }
.ab-card-desc { font-size: .9rem; line-height: 1.7; color: var(--c-ink-soft); }
.ab-note { margin-top: 40px; font-size: .95rem; line-height: 1.8; color: var(--c-ink-soft); }
@media (max-width: 880px) {
  .ab-hero { padding: 130px 0 70px; }
  .ab-grid { grid-template-columns: 1fr; }
  .ab-quote { padding: 32px; }
  .ab-quote p { font-size: 1.35rem; }
}
</style>
