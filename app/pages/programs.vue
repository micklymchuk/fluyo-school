<script setup lang="ts">
useSeo('/programs')
</script>

<template>
  <div class="route-shell-anchor" aria-hidden="true" />
</template>

<style scoped>
@reference "~/assets/css/tailwind.css";

.route-shell-anchor {
  @apply min-h-64 bg-page;
}
</style>
