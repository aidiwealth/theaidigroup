<script setup lang="ts">
// Companies built and backed across the group. A logo with no src shows its name instead.
const R2 = 'https://pub-f138f42d66b748108ebf7432c7314665.r2.dev/'
const LOGOS: { name: string; src?: string; h?: number; tag?: string }[] = [
  { name: 'Termii', src: R2 + 'termii-new%20(1).png' },
  { name: 'Telroi', src: R2 + 'telroi-ll.png', h: 24 },
  { name: 'Sotel', src: '/logos/sotel.svg', h: 24 },
  { name: 'Formal', src: R2 + 'formal-x.png', tag: 'Exited' },
  { name: 'Mercury', src: R2 + 'mercury.png' },
  { name: 'Grey', src: '/logos/grey.svg', h: 20 },
  { name: 'CreditChek', src: '/logos/creditcheck.svg' },
  { name: 'Rayda', src: '/logos/rayda.svg' }
]
</script>

<template>
  <section class="lw">
    <div class="wrap lw-inner">
      <div class="lw-copy reveal">
        <span class="eyebrow">Our portfolio</span>
        <h2 class="t-headline">Built and backed<br><em>by our group.</em></h2>
        <p class="t-subhead">Companies we have built, and founders we have backed across the US and Africa.</p>
        <ArrowLink to="/#sectors" label="Our sectors" />
      </div>
      <ul class="lw-grid reveal reveal-d-1">
        <li v-for="l in LOGOS" :key="l.name" class="lw-cell">
          <img v-if="l.src" :src="l.src" :alt="l.name" loading="lazy" decoding="async" :style="{ maxHeight: (l.h || 34) + 'px' }">
          <span v-else class="lw-name">{{ l.name }}</span>
          <span v-if="l.tag" class="lw-tag">{{ l.tag }}</span>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.lw { padding: 96px 0; border-bottom: 1px solid var(--c-rule); }
.lw-inner { display: grid; grid-template-columns: 1fr 1.8fr; gap: 56px; align-items: center; }
.lw-copy .t-headline { margin-bottom: 16px; }
.lw-copy .t-subhead { margin-bottom: 28px; }
.lw-grid { list-style: none; margin: 0; padding: 0; display: grid; grid-template-columns: repeat(4, 1fr); border-top: 1px solid var(--c-rule); border-left: 1px solid var(--c-rule); }
.lw-cell { display: flex; flex-direction: column; gap: 10px; align-items: center; justify-content: center; height: 128px; padding: 20px; border-right: 1px solid var(--c-rule); border-bottom: 1px solid var(--c-rule); background: #fff; }
.lw-cell img { max-width: 72%; max-height: 34px; width: auto; height: auto; object-fit: contain; }
.lw-name { font-family: var(--font-body); font-weight: 600; font-size: 20px; color: var(--c-navy); letter-spacing: -.01em; }
@media (max-width: 880px) {
  .lw { padding: 72px 0; }
  .lw-inner { grid-template-columns: 1fr; gap: 36px; }
  .lw-grid { grid-template-columns: repeat(2, 1fr); }
  .lw-cell { height: 104px; }
}
.lw-cell { position: relative; }
.lw-tag { position: absolute; left: 50%; bottom: 16px; transform: translateX(-50%); font-family: var(--font-body); font-size: 8px; font-weight: 500; letter-spacing: .12em; text-transform: uppercase; color: var(--c-muted); background: var(--c-paper-2); padding: 2px 6px; }
</style>
