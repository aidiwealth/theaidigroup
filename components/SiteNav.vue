<script setup lang="ts">
const links = [
  { to: '/about', label: 'About' },
  { to: '/what-we-do', label: 'What we do' },
  { to: '/companies', label: 'Companies' },
  { to: '/insights', label: 'Insights' },
  { to: '/careers', label: 'Careers' },
  { to: '/contact', label: 'Contact' }
]
const portalLive = useRuntimeConfig().public.portalLive === 'true'
const open = ref(false)
const route = useRoute()
watch(() => route.fullPath, () => { open.value = false })
onMounted(() => {
  window.addEventListener('keydown', (e) => { if (e.key === 'Escape') open.value = false })
})
</script>

<template>
  <header class="site-nav" :class="{ open }">
    <div class="wrap site-nav-inner">
      <NuxtLink to="/" class="site-nav-logo" aria-label="The Aidi Group — home"><AidiWordmark /></NuxtLink>
      <button class="site-nav-toggle" type="button" :aria-expanded="open" aria-controls="site-menu" @click="open = !open">
        <span class="sr-only">Menu</span><span aria-hidden="true" class="bars" />
      </button>
      <nav id="site-menu" class="site-nav-links" aria-label="Main">
        <NuxtLink v-for="l in links" :key="l.to" :to="l.to">{{ l.label }}</NuxtLink>
        <a v-if="portalLive" href="https://os.theaidigroup.com" class="site-nav-portal">Portal login</a>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.site-nav { position: fixed; inset: 0 0 auto; z-index: 50; background: rgba(255,255,255,.97);
  backdrop-filter: saturate(1.4) blur(10px); border-bottom: 1px solid var(--c-rule); }
.site-nav-inner { display: flex; align-items: center; justify-content: space-between; height: 64px; }
.site-nav-logo { display: block; height: 26px; width: 66px; color: var(--c-navy); }
.site-nav-links { display: flex; gap: 28px; font-size: 14px; }
.site-nav-links a { color: var(--c-ink-soft); padding: 6px 0; border-bottom: 1px solid transparent; }
.site-nav-links a:hover, .site-nav-links a.router-link-active { color: var(--c-navy); border-bottom-color: var(--c-blue); }
.site-nav-portal { font-weight: 600; }
.site-nav-toggle { display: none; background: none; border: 0; width: 44px; height: 44px; cursor: pointer; }
.bars, .bars::before, .bars::after { display: block; width: 22px; height: 1.5px; background: var(--c-navy); position: relative; margin: auto; transition: transform var(--dur, .24s); }
.bars::before, .bars::after { content: ''; position: absolute; left: 0; }
.bars::before { top: -7px; } .bars::after { top: 7px; }
.open .bars { background: transparent; }
.open .bars::before { transform: translateY(7px) rotate(45deg); }
.open .bars::after { transform: translateY(-7px) rotate(-45deg); }
a:focus-visible, button:focus-visible { outline: 2px solid var(--c-blue); outline-offset: 3px; }
@media (max-width: 880px) {
  .site-nav-toggle { display: block; }
  .site-nav-links { display: none; position: absolute; top: 64px; left: 0; right: 0; flex-direction: column; gap: 0;
    background: #fff; border-bottom: 1px solid var(--c-rule); padding: 8px max(28px, 5vw) 20px; }
  .open .site-nav-links { display: flex; }
  .site-nav-links a { padding: 14px 0; font-size: 17px; border-bottom: 1px solid var(--c-rule); }
}
</style>
