<script setup lang="ts">
// VideoHeadline.vue
// Reusable SVG-mask-over-video headline used across the site for the
// signature typographic gesture. Pass two lines of text and a cover color.
//
// Usage:
//   <VideoHeadline
//     :lines="['Strategic positions.']"
//     cover="#ffffff"
//     :variant="'single'"
//     :aria-label="'Strategic positions.'"
//   />

interface Props {
  lines: string[]
  /** Color of the rectangle that masks over the video — match section bg */
  cover?: string
  /** 'single' = one short line, 'tall' = two stacked lines */
  variant?: 'single' | 'tall'
  /** Accessibility label */
  ariaLabel: string
  /** R2 video URL — override only when needed */
  videoSrc?: string
}

const props = withDefaults(defineProps<Props>(), {
  cover: '#ffffff',
  variant: 'single',
  videoSrc:
    'https://pub-f138f42d66b748108ebf7432c7314665.r2.dev/iStock-1702872444.mp4'
})

const maskId = `mask-${Math.random().toString(36).slice(2, 11)}`

const viewBox = computed(() =>
  props.variant === 'tall' ? '0 0 1900 290' : '0 0 1900 160'
)
const rectHeight = computed(() => (props.variant === 'tall' ? 390 : 260))

const videoEl = ref<HTMLVideoElement | null>(null)

onMounted(() => {
  const v = videoEl.value
  if (!v) return
  const markLoaded = () => v.classList.add('loaded')
  if (v.readyState >= 2) markLoaded()
  else v.addEventListener('loadeddata', markLoaded, { once: true })

  // Force SVG <text> repaint once Bricolage Grotesque is ready —
  // SVG text doesn't always re-measure with newly-loaded webfonts.
  if (document.fonts?.ready) {
    document.fonts.ready.then(() => {
      const svg = (videoEl.value?.closest('.vh-stage') as HTMLElement | null)
        ?.querySelector<SVGSVGElement>('.vh-mask svg')
      if (svg) {
        const orig = svg.style.display
        svg.style.display = 'none'
        // Force reflow
        void svg.getBoundingClientRect()
        svg.style.display = orig || ''
      }
    })
  }
})
</script>

<template>
  <h2 class="video-headline vh-stage" :aria-label="ariaLabel">
    <div class="vh-video">
      <video ref="videoEl" autoplay loop muted playsinline>
        <source :src="videoSrc" type="video/mp4">
      </video>
    </div>
    <div class="vh-mask">
      <svg
        :viewBox="viewBox"
        preserveAspectRatio="xMinYMid meet"
        xmlns="http://www.w3.org/2000/svg"
        style="overflow: visible;"
      >
        <defs>
          <mask :id="maskId" x="-50" y="-50" width="2000" :height="rectHeight">
            <rect x="-50" y="-50" width="2000" :height="rectHeight" fill="white" />
            <text
              text-anchor="start"
              font-family="Bricolage Grotesque, Helvetica Neue, sans-serif"
              font-weight="400"
              font-size="115"
              letter-spacing="-4"
              fill="black"
            >
              <tspan
                v-for="(line, i) in lines"
                :key="i"
                x="0"
                :y="variant === 'tall' ? (i === 0 ? 120 : 260) : 120"
              >{{ line }}</tspan>
            </text>
          </mask>
        </defs>
        <rect
          x="-50"
          y="-50"
          width="2000"
          :height="rectHeight"
          :fill="cover"
          :mask="`url(#${maskId})`"
        />
      </svg>
    </div>
  </h2>
</template>
