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
