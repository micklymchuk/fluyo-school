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
  @apply relative flex flex-col gap-micro-gap pb-2;
}

/* The brand underline gesture: items carry owner+facts pairs, not UiUnderlineList strings. */
.credential-strip__item::after {
  content: '';

  @apply absolute bottom-0 left-0 h-0.5 w-10 bg-accent-burgundy;
}

.credential-strip__owner {
  @apply text-small font-bold text-text;
}

.credential-strip__facts {
  @apply text-small text-text-muted;
}
</style>
