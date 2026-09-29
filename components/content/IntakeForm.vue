<script setup lang="ts">
declare global {
  interface Window { turnstile?: { render: (el: HTMLElement, o: Record<string, unknown>) => string; reset: (id: string) => void } }
}
const props = defineProps<{ kind: WebsiteForm }>()
const fields = FORM_FIELDS[props.kind]
const copy = FORM_COPY[props.kind]
const siteKey = useRuntimeConfig().public.turnstileSiteKey as string
const route = useRoute()
const values = reactive<Record<string, string>>(Object.fromEntries(fields.map((f) => [f.name, ''])))
const hp = ref('')
const token = ref('')
const state = ref<'idle' | 'sending' | 'done' | 'error'>('idle')
const message = ref('')
const bad = ref<string[]>([])
const box = ref<HTMLElement | null>(null)
let widgetId = ''

function renderWidget(): void {
  if (!box.value || !window.turnstile) return
  widgetId = window.turnstile.render(box.value, {
    sitekey: siteKey, theme: 'light',
    callback: (t: string) => { token.value = t },
    'expired-callback': () => { token.value = '' }
  })
}
onMounted(() => {
  if (!siteKey) { state.value = 'error'; message.value = 'This form is not configured yet. Please email us instead.'; return }
  if (window.turnstile) return renderWidget()
  const id = 'cf-turnstile-script'
  let s = document.getElementById(id) as HTMLScriptElement | null
  if (!s) {
    s = document.createElement('script'); s.id = id; s.async = true
    s.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit'
    document.head.appendChild(s)
  }
  s.addEventListener('load', renderWidget, { once: true })
})

async function submit(): Promise<void> {
  if (!token.value) { state.value = 'error'; message.value = 'Please complete the security check.'; return }
  state.value = 'sending'; message.value = ''; bad.value = []
  try {
    await $fetch('/api/forms/' + props.kind, {
      method: 'POST',
      body: { ...values, turnstile: token.value, website_hp: hp.value, source: route.path }
    })
    state.value = 'done'
  } catch (err: unknown) {
    const e = err as { data?: { statusMessage?: string; data?: { fields?: string[] } } }
    state.value = 'error'
    message.value = e.data?.statusMessage || 'Something went wrong. Please try again or email us.'
    bad.value = e.data?.data?.fields || []
    token.value = ''
    if (window.turnstile && widgetId) window.turnstile.reset(widgetId)
  }
}
</script>

<template>
  <div class="intake not-prose">
    <p v-if="state === 'done'" class="intake-done" role="status">{{ copy.done }}</p>
    <form v-else :class="['intake-form', 'intake-' + kind]" novalidate @submit.prevent="submit">
      <div v-for="f in fields" :key="f.name" class="intake-field" :class="{ wide: f.type === 'textarea', bad: bad.includes(f.name) }">
        <label :for="kind + '-' + f.name">{{ f.label }}<span v-if="!f.required" class="opt"> (optional)</span></label>
        <select v-if="f.type === 'select'" :id="kind + '-' + f.name" v-model="values[f.name]" :required="f.required" :aria-invalid="bad.includes(f.name)">
          <option value="" disabled>Choose one</option>
          <option v-for="o in f.options" :key="o" :value="o">{{ o }}</option>
        </select>
        <textarea v-else-if="f.type === 'textarea'" :id="kind + '-' + f.name" v-model="values[f.name]" :required="f.required" rows="5" maxlength="3000" :aria-invalid="bad.includes(f.name)" />
        <input v-else :id="kind + '-' + f.name" v-model="values[f.name]" :type="f.type" :required="f.required" :autocomplete="f.autocomplete" maxlength="400" :aria-invalid="bad.includes(f.name)">
        <small v-if="f.hint">{{ f.hint }}</small>
      </div>
      <div class="intake-hp" aria-hidden="true">
        <label>Leave this empty <input v-model="hp" tabindex="-1" autocomplete="off"></label>
      </div>
      <div ref="box" class="intake-turnstile" />
      <div class="intake-actions">
        <button type="submit" :disabled="state === 'sending'">{{ state === 'sending' ? 'Sending…' : copy.submit }}</button>
        <p v-if="state === 'error'" class="intake-error" role="alert">{{ message }}</p>
      </div>
    </form>
  </div>
</template>

<style scoped>
.intake { margin: 28px 0 8px; max-width: 720px; }
.intake-form { display: grid; grid-template-columns: 1fr 1fr; gap: 18px 20px; }
.intake-signup { grid-template-columns: 1fr; max-width: 420px; }
.intake-field { display: flex; flex-direction: column; gap: 6px; }
.intake-field.wide, .intake-turnstile, .intake-actions { grid-column: 1 / -1; }
label { font-size: 14px; font-weight: 500; color: var(--c-navy); }
.opt { font-weight: 400; color: var(--c-muted); }
input, select, textarea { font: inherit; font-size: 16px; padding: 12px 14px; border: 1px solid var(--c-rule-strong); border-radius: var(--r-md); background: #fff; color: var(--c-ink); width: 100%; }
input, select { min-height: 50px; }
textarea { resize: vertical; min-height: 130px; }
input:focus-visible, select:focus-visible, textarea:focus-visible, button:focus-visible { outline: 2px solid var(--c-blue); outline-offset: 2px; }
.bad input, .bad select, .bad textarea { border-color: #b42318; }
small { font-size: 13px; color: var(--c-muted); }
.intake-hp { position: absolute; left: -10000px; width: 1px; height: 1px; overflow: hidden; }
.intake-actions { display: flex; align-items: center; gap: 18px; flex-wrap: wrap; }
button { font: inherit; font-weight: 600; font-size: 15px; padding: 13px 24px; border: 0; border-radius: var(--r-pill); background: var(--c-navy); color: #fff; cursor: pointer; }
button:hover { background: var(--c-blue-deep); }
button:disabled { opacity: .6; cursor: progress; }
.intake-error { color: #b42318; font-size: 14px; margin: 0; }
.intake-done { padding: 18px 20px; border-left: 3px solid var(--c-green); background: var(--c-paper-2); color: var(--c-navy); }
@media (max-width: 640px) { .intake-form { grid-template-columns: 1fr; } }
</style>
