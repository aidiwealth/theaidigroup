// Plays one card video; on phones, pauses any other card video first to save data.
let current: HTMLVideoElement | null = null
export function playOnly(v: HTMLVideoElement): void {
  if (current && current !== v && window.matchMedia('(max-width: 880px)').matches) current.pause()
  current = v
  v.play().catch((err: unknown) => console.warn('Card video did not start', err))
}
