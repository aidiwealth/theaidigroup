<script setup lang="ts">
// Organization structured data for search engines
const ORG = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'The Aidi Group',
  url: 'https://theaidigroup.com',
  logo: 'https://theaidigroup.com/og-image.png',
  description: 'An operator-led family office that builds and backs businesses in fintech, AI and telecoms, investment and real estate, connecting the US and Africa.',
  address: { '@type': 'PostalAddress', streetAddress: '6472 Camden Ave, Suite 204', addressLocality: 'San Jose', addressRegion: 'CA', postalCode: '95120', addressCountry: 'US' },
  subOrganization: [
    { '@type': 'Organization', name: 'Aidi Wealth', url: 'https://joinaidi.com' },
    { '@type': 'Organization', name: 'Aidi Ventures', url: 'https://aidiventures.com' },
    { '@type': 'Organization', name: 'Aidi Haven', url: 'https://aidihaven.com' },
    { '@type': 'Organization', name: 'Telroi', url: 'https://telroi.ai' }
  ]
}
useHead({ script: [{ type: 'application/ld+json', innerHTML: JSON.stringify(ORG) }] })
</script>

<template>
  <div class="site">
    <a class="skip-link" href="#main">Skip to content</a>
    <SiteNav />
    <main id="main">
      <slot />
    </main>
    <SiteFooter />
    <TheBackToTop />
  </div>
</template>
