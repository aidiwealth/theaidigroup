<script setup>
// Cookie notice: all cookies on by default; visitors can accept or adjust. Choice kept for a year.
import { ref, reactive, onMounted } from 'vue'
const props = defineProps({ site: { type: String, default: 'this site' }, privacy: { type: String, default: 'https://theaidigroup.com/legal' } })
const KEY = 'aidi_consent'
const show = ref(false), open = ref(false)
const c = reactive({ preferences: true, analytics: true })
onMounted(() => {
  try { const v = localStorage.getItem(KEY) || (document.cookie.match(/(?:^|; )aidi_consent=([^;]+)/) || [])[1]; if (!v) setTimeout(() => (show.value = true), 900) } catch (e) { show.value = true }
})
function save(all) {
  if (all) { c.preferences = true; c.analytics = true }
  const v = JSON.stringify({ essential: true, preferences: c.preferences, analytics: c.analytics, at: new Date().toISOString() })
  try { localStorage.setItem(KEY, v) } catch (e) { /* storage off */ }
  document.cookie = 'aidi_consent=' + encodeURIComponent(v) + '; Max-Age=31536000; Path=/; SameSite=Lax; Secure'
  show.value = false; open.value = false
}
</script>
<template>
  <Transition name="aidicc">
    <div v-if="show" class="aidicc" role="dialog" aria-label="Cookie settings">
      <p><b>We use cookies</b> to make {{ props.site }} work, remember your preferences and understand how it is used. <a :href="props.privacy" target="_blank" rel="noopener">Privacy</a></p>
      <div v-if="open" class="aidicc-o">
        <label><span><b>Essential</b><em>Needed for the site to work. Always on.</em></span><input type="checkbox" checked disabled></label>
        <label><span><b>Preferences</b><em>Remember choices such as this one.</em></span><input v-model="c.preferences" type="checkbox"></label>
        <label><span><b>Analytics</b><em>Help us understand which pages are useful.</em></span><input v-model="c.analytics" type="checkbox"></label>
      </div>
      <div class="aidicc-a"><button type="button" class="aidicc-l" @click="open ? save(false) : (open = true)">{{ open ? 'Save choices' : 'Cookie settings' }}</button><button type="button" class="aidicc-k" @click="save(true)">Accept all</button></div>
    </div>
  </Transition>
</template>
<style scoped>
.aidicc { position: fixed; left: 20px; bottom: 20px; z-index: 9999; width: min(420px, calc(100vw - 40px)); background: #fff; border: 1px solid #e2e6ec; box-shadow: 0 18px 48px rgba(12,26,46,.18); padding: 18px 20px; font-size: 14px; line-height: 1.55; color: #3b4658; font-family: inherit; border-radius: 0; }
.aidicc p { margin: 0 0 14px; } .aidicc a { color: #1c547d; }
.aidicc-o { border-top: 1px solid #e2e6ec; margin: 0 0 14px; } .aidicc-o label { display: flex; justify-content: space-between; align-items: center; gap: 14px; padding: 10px 0; border-bottom: 1px solid #e2e6ec; cursor: pointer; }
.aidicc-o span { display: flex; flex-direction: column; } .aidicc-o b { color: #0c1a2e; font-weight: 600; } .aidicc-o em { font-style: normal; font-size: 12.5px; color: #6b7686; } .aidicc-o input { width: 16px; height: 16px; accent-color: #0c1a2e; }
.aidicc-a { display: flex; justify-content: flex-end; gap: 8px; } .aidicc-a button { font: inherit; font-size: 13.5px; cursor: pointer; border-radius: 0; }
.aidicc-l { background: none; border: 1px solid #e2e6ec; padding: 9px 14px; color: #0c1a2e; } .aidicc-k { background: #0c1a2e; color: #fff; border: 0; padding: 9px 16px; font-weight: 600; }
.aidicc-enter-active, .aidicc-leave-active { transition: opacity .3s, transform .3s; } .aidicc-enter-from, .aidicc-leave-to { opacity: 0; transform: translateY(10px); }
@media print { .aidicc { display: none; } }
</style>
