<script setup lang="ts">
// TheFooter.vue
// The closing — earth video background, manifesto sentence, contact + address,
// quiet legal lines, and disclaimer paragraphs.

const videoEl = ref<HTMLVideoElement | null>(null)

onMounted(() => {
  const v = videoEl.value
  if (!v) return
  const markLoaded = () => v.classList.add('loaded')
  if (v.readyState >= 2) markLoaded()
  else v.addEventListener('loadeddata', markLoaded, { once: true })
})
</script>

<template>
  <footer>
    <div class="footer-video" aria-hidden="true">
      <video ref="videoEl" autoplay loop muted playsinline>
        <source src="https://videos.pexels.com/video-files/856356/856356-hd_1280_720_25fps.mp4" type="video/mp4">
      </video>
    </div>
    <div class="wrap footer-wrap">
      <div class="footer-statement">
        Building infrastructure where it matters most.
      </div>
      <div class="footer-meta">
        <a href="mailto:partners@telroigroup.com" class="footer-contact">partners@telroigroup.com</a>
        <div class="footer-address">
          6472 Camden Ave, Suite 204<br>
          San Jose, CA 95120, US
        </div>
        <div class="footer-locs">
          <span>San Jose</span>
          <span class="dot">·</span>
          <span>Lagos</span>
          <span class="dot">·</span>
          <span>Abidjan</span>
        </div>
      </div>
    </div>
    <div class="wrap footer-wrap">
      <div class="footer-legal">
        <div>© 2026 Telroi LLC · All rights reserved.</div>
        <div class="footer-affiliate-quiet">A Telroi LLC company. A member of The Aidi Group.</div>
      </div>
      <div class="footer-disclaimer">
        <p>
          The Telroi Group is the trading name of Telroi LLC, a California-domiciled holding entity. Information presented on this site is for informational purposes only and does not constitute an offer to sell or a solicitation of any security or interest.
        </p>
        <p>
          Portfolio companies referenced on this site are independent entities operated by their own management teams. The Telroi Group holds strategic interests in certain portfolio companies; references to such companies do not imply control, operational authority, or endorsement. Each company maintains its own corporate governance, financial reporting, and customer relationships.
        </p>
      </div>
    </div>
  </footer>
</template>
