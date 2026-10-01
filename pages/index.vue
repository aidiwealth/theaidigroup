<script setup lang="ts">
useHead({ title: 'The Aidi Group — Operator-led family office' })
</script>

<template>
  <div>
    <HomeHero />
    <SectorMarquee />
    <LogoWall />
    <WhoWeServe />
    <SectorFeatures />
    <StatsBand />
    <InsightsPress :limit="6" more />
    <FaqSection />
  </div>
</template>
