<script setup lang="ts">
import { SECTORS, GROUPS } from '~/composables/useSectors'
withDefaults(defineProps<{ intro?: boolean }>(), { intro: true })
const INITIAL = 3
const active = ref<string>('all')
const expanded = ref(false)
const filtered = computed(() => active.value === 'all' ? SECTORS : SECTORS.filter((s) => s.group === active.value))
const shown = computed(() => (expanded.value || active.value !== 'all') ? filtered.value : filtered.value.slice(0, INITIAL))
const extra = computed(() => filtered.value.length - INITIAL)
const groups = GROUPS.filter((g) => g.key === 'all' || SECTORS.some((s) => s.group === g.key))
function pick(key: string): void { active.value = key; expanded.value = false }
</script>

<template>
  <section class="section sf" id="sectors">
    <div class="wrap">
      <template v-if="intro">
        <span class="eyebrow reveal">What we do</span>
        <h2 class="t-display reveal reveal-d-1">Built by operators.<br><em>Backed with conviction.</em></h2>
      </template>
      <div class="sf-filters" role="group" aria-label="Filter by sector">
        <button v-for="g in groups" :key="g.key" type="button" class="sf-filter" :class="{ on: active === g.key }" :aria-pressed="active === g.key" @click="pick(g.key)">{{ g.label }}</button>
      </div>
      <div v-for="(s, i) in shown" :id="s.key" :key="s.key" class="sf-row" :class="{ reverse: i % 2 === 1 }">
        <div class="sf-visual" :class="'sf-' + s.group">
          <AutoVideo v-if="s.video" :src="s.video" />
          <div class="sf-tint" />
        </div>
        <div class="sf-copy">
          <span class="eyebrow">{{ s.sector }} · {{ s.company }}<template v-if="s.affiliated"> · Affiliated company</template></span>
          <h3 class="t-headline">{{ s.headline }}</h3>
          <p class="t-subhead">{{ s.body }}</p>
          <div v-if="s.href" class="sf-actions">
            <ArrowLink v-if="s.href" :to="s.href" :label="s.cta" />
          </div>
        </div>
      </div>
      <div v-if="active === 'all' && extra > 0" class="sf-more">
        <button type="button" class="cta-arrow" :aria-expanded="expanded" @click="expanded = !expanded">
          {{ expanded ? 'View less' : 'View more (' + extra + ')' }}
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path :d="expanded ? 'M4 10l4-4 4 4' : 'M4 6l4 4 4-4'" /></svg>
        </button>
      </div>
    </div>
  </section>
</template>

<style scoped>
.sf-filters { display: flex; gap: 8px; flex-wrap: wrap; margin-top: 40px; }
.sf-filter { font: inherit; font-family: var(--font-body); font-size: 13px; padding: 9px 16px; background: transparent; color: var(--c-navy); border: 1px solid rgba(12,26,46,.18); cursor: pointer; transition: background .2s, color .2s, border-color .2s; }
.sf-filter:hover { border-color: var(--c-navy); }
.sf-filter.on { background: var(--c-navy); color: #fff; border-color: var(--c-navy); }
.sf-filter:focus-visible { outline: 2px solid var(--c-blue); outline-offset: 2px; }
.sf-row { display: grid; grid-template-columns: 1fr 1fr; gap: 64px; align-items: center; margin: 32px 0; padding: 72px 0; border-top: 1px solid var(--c-rule); }
.sf-row:last-of-type { border-bottom: 1px solid var(--c-rule); }
.sf-row.reverse .sf-visual { order: 2; }
.sf-visual { position: relative; aspect-ratio: 16 / 10; overflow: hidden; background: linear-gradient(135deg, var(--c-blue-deep), var(--c-navy)); }
.sf-tint { position: absolute; inset: 0; }
.sf-fintech .sf-tint { background: linear-gradient(135deg, rgba(38,117,176,.35), rgba(12,26,46,.45)); }
.sf-telecoms .sf-tint { background: linear-gradient(135deg, rgba(45,167,195,.3), rgba(12,26,46,.5)); }
.sf-investment .sf-tint { background: linear-gradient(135deg, rgba(52,168,115,.28), rgba(12,26,46,.5)); }
.sf-realestate .sf-tint { background: linear-gradient(135deg, rgba(28,84,125,.3), rgba(12,26,46,.45)); }
.sf-markets .sf-tint { background: linear-gradient(135deg, rgba(19,177,164,.25), rgba(12,26,46,.55)); }
.sf-copy .eyebrow { margin-bottom: 14px; }
.sf-copy .t-headline { margin-bottom: 16px; }
.sf-actions { display: flex; align-items: center; gap: 32px; flex-wrap: wrap; margin-top: 28px; }
.sf-more { margin-top: 56px; display: flex; justify-content: center; }
.sf-more button { background: none; border: 0; padding: 0; }
@media (max-width: 880px) {
  .sf-filters { flex-wrap: nowrap; overflow-x: auto; padding-bottom: 4px; }
  .sf-filter { flex-shrink: 0; }
  .sf-row { grid-template-columns: 1fr; gap: 28px; margin: 16px 0; padding: 48px 0; }
  .sf-row.reverse .sf-visual { order: 0; }
}
</style>
