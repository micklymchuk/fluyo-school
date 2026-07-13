<script setup lang="ts">
useSeo('/')
</script>

<template>
  <div class="index-shell-anchor" aria-hidden="true" />
</template>

<style scoped>
@reference "~/assets/css/tailwind.css";

.index-shell-anchor {
  @apply min-h-64 bg-page;
}
</style>
