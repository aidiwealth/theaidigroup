<script setup lang="ts">
import { TEAM, type Member } from '~/composables/useTeam'
withDefaults(defineProps<{ embedded?: boolean }>(), { embedded: false })
const open = ref<Member | null>(null)
const closeBtn = ref<HTMLButtonElement | null>(null)
let opener: HTMLElement | null = null
function show(m: Member, e: Event): void {
  opener = e.currentTarget as HTMLElement
  open.value = m
  nextTick(() => closeBtn.value?.focus())
}
function close(): void { open.value = null; opener?.focus() }
const onKey = (e: KeyboardEvent): void => { if (e.key === 'Escape' && open.value) close() }
onMounted(() => window.addEventListener('keydown', onKey))
onBeforeUnmount(() => window.removeEventListener('keydown', onKey))
</script>

<template>
  <component :is="embedded ? 'div' : 'section'" :class="[embedded ? 'not-prose' : 'section tint', 'tm']">
    <div :class="{ wrap: !embedded }">
      <template v-if="!embedded">
        <span class="eyebrow reveal">Our team</span>
        <h2 class="t-display reveal reveal-d-1">The people behind <em>Aidi.</em></h2>
        <p class="t-subhead reveal reveal-d-2">Operators, advisers and builders working across the US and Africa.</p>
      </template>
      <div class="tm-grid">
        <button v-for="m in TEAM" :key="m.id" type="button" class="tm-card" @click="show(m, $event)">
          <img :src="m.photo" :alt="m.name" loading="lazy" decoding="async" width="400" height="300">
          <span class="tm-name">{{ m.name }}</span>
          <span class="tm-role">{{ m.role }}</span>
        </button>
      </div>
    </div>
    <Teleport to="body">
      <div v-if="open" class="tm-backdrop" @click="close" />
      <aside v-if="open" class="tm-panel" role="dialog" aria-modal="true" :aria-label="open.name">
        <button ref="closeBtn" type="button" class="tm-close" aria-label="Close" @click="close">✕</button>
        <img :src="open.photo" :alt="open.name" class="tm-photo">
        <div class="tm-body">
          <div class="tm-panel-role">{{ open.role }}</div>
          <h2 class="tm-panel-name">{{ open.name }}</h2>
          <p class="tm-bio">{{ open.bio }}</p>
          <div class="tm-focus"><span>Focus</span>{{ open.focus }}</div>
        </div>
      </aside>
    </Teleport>
  </component>
</template>

<style scoped>
.tm .t-subhead { margin-bottom: 48px; }
.tm > .wrap { max-width: 1000px; }
.tm-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }
.tm-card { text-align: left; background: #fff; border: 1px solid rgba(12,26,46,.08); border-radius: 20px; overflow: hidden; padding: 0 0 12px; cursor: pointer; font: inherit; color: inherit; display: flex; flex-direction: column; transition: all .25s ease; }
.tm-card:hover, .tm-card:focus-visible { border-color: rgba(12,26,46,.2); box-shadow: 0 8px 32px rgba(12,26,46,.1); transform: translateY(-3px); outline: none; }
.tm-card img { width: 100%; height: auto; aspect-ratio: 3 / 2; object-fit: cover; object-position: center 20%; background: var(--c-paper-2); margin-bottom: 10px; }
.tm-name { font-family: var(--font-heading); color: var(--c-navy); padding: 0 12px; }
.tm-role { padding: 2px 12px 0; }
.tm-more { align-self: flex-start; margin: 12px 18px 0; font-size: 1rem; }
.tm-backdrop { position: fixed; inset: 0; background: rgba(12,26,46,.4); backdrop-filter: blur(4px); z-index: 90; }
.tm-panel { position: fixed; top: 0; right: 0; bottom: 0; width: 440px; max-width: 100vw; background: #fff; z-index: 100; overflow-y: auto; box-shadow: -16px 0 48px rgba(12,26,46,.15); animation: tm-in .3s ease; }
@keyframes tm-in { from { transform: translateX(100%); } to { transform: none; } }
.tm-close { position: absolute; top: 18px; left: 18px; width: 38px; height: 38px; border-radius: 50%; border: 1px solid rgba(12,26,46,.12); background: #fff; cursor: pointer; font-size: 14px; }
.tm-close:focus-visible { outline: 2px solid var(--c-blue); outline-offset: 2px; }
.tm-photo { width: 100%; height: 320px; object-fit: cover; object-position: center top; background: var(--c-paper-2); }
.tm-body { padding: 28px; }
.tm-panel-role { font-size: .7rem; font-weight: 500; letter-spacing: .1em; text-transform: uppercase; color: var(--c-blue); margin-bottom: 8px; }
.tm-panel-name { font-family: var(--font-heading); font-size: 2rem; font-weight: 400; color: var(--c-navy); margin-bottom: 16px; }
.tm-bio { font-size: .92rem; line-height: 1.75; color: var(--c-ink-soft); margin-bottom: 24px; }
.tm-focus { padding: 18px 0; border-top: 1px solid rgba(12,26,46,.08); border-bottom: 1px solid rgba(12,26,46,.08); font-size: .88rem; color: var(--c-navy); }
.tm-focus span { display: block; font-size: .68rem; letter-spacing: .08em; text-transform: uppercase; color: var(--c-muted); margin-bottom: 4px; }
@media (max-width: 1024px) { .tm-grid { grid-template-columns: repeat(3, 1fr); } }
@media (max-width: 760px) { .tm-grid { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 440px) { .tm-grid { grid-template-columns: 1fr; } }
@media (prefers-reduced-motion: reduce) { .tm-panel { animation: none; } .tm-card:hover { transform: none; } }
</style>
