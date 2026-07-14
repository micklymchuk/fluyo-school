<script setup lang="ts">
defineProps<{
  owner: string
  facts: string
}>()
</script>

<template>
  <li class="credential-strip__item">
    <span class="credential-strip__owner">{{ owner }}</span>
    <span class="credential-strip__facts">{{ facts }}</span>
  </li>
</template>

<style scoped>
@reference "~/assets/css/tailwind.css";

.credential-strip__item {
  @apply flex flex-col gap-1 border-l-2 border-accent-subdued pl-control-compact;
}

.credential-strip__owner {
  @apply text-small font-bold text-text;
}

.credential-strip__facts {
  @apply text-small text-text-muted;
}
</style>
