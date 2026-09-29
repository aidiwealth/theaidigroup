<script setup lang="ts">
const email = useAppConfig().site.email
</script>

<template>
  <a :href="'mailto:' + email">{{ email }}</a>
</template>
